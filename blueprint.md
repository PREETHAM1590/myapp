# Waste Wise Application Blueprint

## 1. Overview

Waste Wise is a comprehensive Flutter application designed to encourage and facilitate effective recycling through education, gamification, and tangible rewards. By leveraging modern mobile technology, camera-based AI, and Web3 integration with the Solana blockchain, the app aims to build an engaged community of eco-conscious individuals.

## 2. Style and Design (Material 3)

The application will strictly adhere to Material 3 UI guidelines to ensure a modern, intuitive, and visually pleasing user experience.

- **Color Palette**:
  - **Primary**: Green (`#4CAF50`) - Represents eco-friendliness and positive action.
  - **Secondary**: Light Green (`#81C784`) - Used for accents and secondary elements.
  - **Accent/Highlight**: Orange/Yellow - For achievements and gamified elements.
  - **Neutral**: Light Gray (`#F5F5F5`) for backgrounds, with darker grays for text and dividers.
- **Typography**: `GoogleFonts.poppins` will be used for all text to maintain a clean and modern look.
- **Components**:
  - **Corners**: All cards, buttons, and containers will feature prominent rounded corners (12-20px).
  - **Shadows**: Soft, subtle shadows will be used to create depth and elevate interactive elements.
  - **Animations**: Page transitions and user interactions will be smooth and fluid.
- **Theme**: The app will support both Light and Dark modes.

## 3. Core Features & Implementation Plan

### A. Authentication & User Profiles
- **Technology**: Firebase Authentication.
- **Methods**: Google Sign-In and Email + Password.
- **Profile**:
  - User details (name, email, bio).
  - Wallet address linked to the profile.
  - **QR Code for Proof-of-Drop**: A unique, scannable QR code for each user.

### B. Waste Scanning & Recycling Tips
- **Technology**: `camera` package for image capture. A backend or on-device model (e.g., TensorFlow Lite) will be used for image classification.
- **Flow**:
  1. User opens the scan feature via the central FAB.
  2. A camera interface allows the user to capture an image of a waste item.
  3. The image is analyzed to identify the material (plastic, glass, etc.).
  4. The app displays the item type, disposal instructions, and environmental impact.

### C. Solana Web3 Wallet Integration
- **Technology**: `solana` Dart package.
- **Functionality**:
  - **Wallet Management**: Create a new Solana wallet or connect an existing one. Keys will be stored securely.
  - **Token Rewards**: A custom Solana token (devnet) named "ECO" will be awarded for recycling actions.
  - **Transactions**: View balance, transaction history, and send/receive ECO tokens.

### D. Garbage Truck Live Tracking
- **Technology**: `google_maps_flutter` and Firebase Realtime Database or WebSockets.
- **Functionality**:
  - A real-time map view showing the location of garbage trucks.
  - Display truck routes and ETAs.
  - Send push notifications to users when a truck is nearby.

### E. Main Screens & Navigation
- **Navigation**: `go_router` with a `ShellRoute` for a persistent bottom navigation bar.
- **Bottom Navigation**:
  - Home (Dashboard)
  - Stats (Progress Report)
  - Scan (Floating Action Button)
  - Community
  - Profile
- **Dashboard**: The central hub displaying summary cards for Eco-Points, Achievements, and quick access to other features.
- **Stats Screen**: Visualizes user progress with charts for waste breakdown and points earned.
- **Community Hub**: A gateway to social and interactive features.
- **Profile Screen**: Manages user information, settings, and the Proof-of-Drop QR code.

### F. Interactive Features
- **Marketplace**:
  - Users can list and buy eco-friendly or recycled items using ECO tokens.
  - UI will feature a search bar, category filters, and a product grid.
- **Chatbot (WiseBot)**:
  - An in-app AI assistant powered by an LLM (e.g., Google's Gemini API via `firebase_ai`).
  - Provides instant answers to recycling questions.
- **Gamification & Leaderboards**:
  - **Leaderboards**: Rank users based on points and items recycled.
  - **Challenges**: Timed community goals (e.g., "Recycle 20 bottles this week").
  - **Achievements**: Award badges for milestones.

---
## Current Task: Full UI Redesign

The immediate goal is to implement the complete UI overhaul based on the provided screenshots. This involves creating and styling all the screens listed above with placeholder data to establish the look and feel before wiring up the backend logic.

**Steps for Current Task:**
1.  **DONE**: Establish `ThemeData` based on Material 3.
2.  **DONE**: Implement the main navigation shell with `BottomAppBar` and central FAB.
3.  **DONE**: Build the new Home/Dashboard screen UI.
4.  **IN PROGRESS**: Build the remaining screens:
    - Profile & Settings
    - Stats/Progress Report
    - Community Hub & its sub-pages (Wallet, Marketplace, Challenges, Learn)
    - Waste Scanning
    - Chatbot
5.  Link all screens together with correct navigation.
