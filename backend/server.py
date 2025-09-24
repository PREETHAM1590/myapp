from fastapi import FastAPI, HTTPException, Depends, status, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
import os
import uuid
from datetime import datetime, timedelta
import json
import asyncio
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Waste Wise API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017/waste_wise")
client = AsyncIOMotorClient(MONGO_URL)
db = client.waste_wise

# Security
security = HTTPBearer()

# Pydantic models
class User(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    name: str
    wallet_address: Optional[str] = None
    eco_points: int = 0
    achievements: List[str] = []
    created_at: datetime = Field(default_factory=datetime.now)
    qr_code: str = Field(default_factory=lambda: str(uuid.uuid4()))

class WasteItem(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    item_type: str
    disposal_method: str
    eco_points_earned: int
    image_url: Optional[str] = None
    scanned_at: datetime = Field(default_factory=datetime.now)

class EcoTransaction(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    amount: float
    transaction_type: str  # "earned", "spent"
    description: str
    created_at: datetime = Field(default_factory=datetime.now)

class Challenge(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    target_count: int
    reward_points: int
    start_date: datetime
    end_date: datetime
    participants: List[str] = []

class MarketplaceItem(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    seller_id: str
    title: str
    description: str
    price: int  # in eco points
    image_url: Optional[str] = None
    category: str
    is_available: bool = True
    created_at: datetime = Field(default_factory=datetime.now)

# API Routes

@app.get("/")
async def root():
    return {"message": "Waste Wise API", "status": "running"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now()}

# User endpoints
@app.post("/api/users", response_model=User)
async def create_user(user: User):
    try:
        user_dict = user.dict()
        await db.users.insert_one(user_dict)
        return user
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/users/{user_id}", response_model=User)
async def get_user(user_id: str):
    user = await db.users.find_one({"id": user_id})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return User(**user)

@app.put("/api/users/{user_id}/wallet")
async def update_wallet(user_id: str, wallet_address: str):
    result = await db.users.update_one(
        {"id": user_id},
        {"$set": {"wallet_address": wallet_address}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "Wallet updated successfully"}

# Waste scanning endpoints
@app.post("/api/scan-waste")
async def scan_waste(file: UploadFile = File(...), user_id: str = None):
    if not user_id:
        raise HTTPException(status_code=400, detail="User ID required")
    
    # Mock waste classification (replace with actual AI model)
    waste_types = ["plastic", "glass", "paper", "metal", "organic"]
    import random
    detected_type = random.choice(waste_types)
    
    disposal_methods = {
        "plastic": "Clean and place in recycling bin. Check number on bottom.",
        "glass": "Rinse and place in glass recycling container.",
        "paper": "Ensure dry and place in paper recycling bin.",
        "metal": "Clean and place in metal recycling container.",
        "organic": "Compost in organic waste bin or home composter."
    }
    
    eco_points = random.randint(5, 20)
    
    waste_item = WasteItem(
        user_id=user_id,
        item_type=detected_type,
        disposal_method=disposal_methods[detected_type],
        eco_points_earned=eco_points
    )
    
    # Save waste item
    await db.waste_items.insert_one(waste_item.dict())
    
    # Update user points
    await db.users.update_one(
        {"id": user_id},
        {"$inc": {"eco_points": eco_points}}
    )
    
    # Add transaction
    transaction = EcoTransaction(
        user_id=user_id,
        amount=eco_points,
        transaction_type="earned",
        description=f"Recycled {detected_type} item"
    )
    await db.eco_transactions.insert_one(transaction.dict())
    
    return {
        "detected_type": detected_type,
        "disposal_method": disposal_methods[detected_type],
        "eco_points_earned": eco_points,
        "environmental_impact": f"You saved approximately 0.{eco_points} kg of CO2!"
    }

# Stats endpoints
@app.get("/api/users/{user_id}/stats")
async def get_user_stats(user_id: str):
    user = await db.users.find_one({"id": user_id})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Get waste items for the last 30 days
    thirty_days_ago = datetime.now() - timedelta(days=30)
    waste_items = await db.waste_items.find({
        "user_id": user_id,
        "scanned_at": {"$gte": thirty_days_ago}
    }).to_list(length=None)
    
    # Calculate stats
    total_items = len(waste_items)
    waste_breakdown = {}
    for item in waste_items:
        waste_type = item["item_type"]
        waste_breakdown[waste_type] = waste_breakdown.get(waste_type, 0) + 1
    
    total_points_earned = sum(item["eco_points_earned"] for item in waste_items)
    
    return {
        "total_items_recycled": total_items,
        "eco_points": user["eco_points"],
        "points_this_month": total_points_earned,
        "waste_breakdown": waste_breakdown,
        "achievements_count": len(user.get("achievements", [])),
        "streak_days": 7  # Mock data
    }

# Marketplace endpoints
@app.get("/api/marketplace", response_model=List[MarketplaceItem])
async def get_marketplace_items(category: Optional[str] = None):
    filter_query = {"is_available": True}
    if category:
        filter_query["category"] = category
    
    items = await db.marketplace_items.find(filter_query).to_list(length=50)
    return [MarketplaceItem(**item) for item in items]

@app.post("/api/marketplace", response_model=MarketplaceItem)
async def create_marketplace_item(item: MarketplaceItem):
    await db.marketplace_items.insert_one(item.dict())
    return item

# Challenges endpoints
@app.get("/api/challenges", response_model=List[Challenge])
async def get_active_challenges():
    now = datetime.now()
    challenges = await db.challenges.find({
        "start_date": {"$lte": now},
        "end_date": {"$gte": now}
    }).to_list(length=20)
    return [Challenge(**challenge) for challenge in challenges]

@app.post("/api/challenges/{challenge_id}/join")
async def join_challenge(challenge_id: str, user_id: str):
    result = await db.challenges.update_one(
        {"id": challenge_id},
        {"$addToSet": {"participants": user_id}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Challenge not found")
    return {"message": "Successfully joined challenge"}

# Leaderboard endpoint
@app.get("/api/leaderboard")
async def get_leaderboard(limit: int = 10):
    users = await db.users.find().sort("eco_points", -1).limit(limit).to_list(length=limit)
    leaderboard = []
    for i, user in enumerate(users):
        leaderboard.append({
            "rank": i + 1,
            "name": user["name"],
            "eco_points": user["eco_points"],
            "achievements_count": len(user.get("achievements", []))
        })
    return leaderboard

# Chatbot endpoint (mock implementation)
@app.post("/api/chatbot")
async def chat_with_bot(message: str):
    # Mock responses - replace with actual AI integration
    responses = {
        "plastic": "Plastic items should be cleaned before recycling. Check the recycling number on the bottom!",
        "glass": "Glass is 100% recyclable! Make sure to rinse it clean first.",
        "paper": "Paper products are great for recycling, but make sure they're dry and clean.",
        "batteries": "Batteries need special handling! Take them to designated collection points.",
        "electronics": "E-waste should go to certified recycling centers, not regular bins."
    }
    
    message_lower = message.lower()
    response = "I'm here to help with recycling questions! Ask me about specific materials."
    
    for key, value in responses.items():
        if key in message_lower:
            response = value
            break
    
    return {
        "message": response,
        "timestamp": datetime.now()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)