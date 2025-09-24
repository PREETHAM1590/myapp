import React, { useState, useRef } from 'react';
import { Camera, Upload, ArrowLeft, Lightbulb, Award, Recycle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import axios from 'axios';

const WasteScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    await processImage(file);
  };

  const processImage = async (file) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('user_id', currentUser?.uid || 'demo-user');

      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/scan-waste`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResult(response.data);
      toast.success(`Great! You earned ${response.data.eco_points_earned} eco-points!`);
    } catch (error) {
      console.error('Scanning error:', error);
      toast.error('Failed to scan waste. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNewScan = () => {
    setResult(null);
    setIsScanning(false);
  };

  const getWasteTypeColor = (type) => {
    const colors = {
      plastic: 'bg-blue-100 text-blue-800',
      glass: 'bg-green-100 text-green-800',
      paper: 'bg-yellow-100 text-yellow-800',
      metal: 'bg-gray-100 text-gray-800',
      organic: 'bg-orange-100 text-orange-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getWasteTypeIcon = (type) => {
    // In a real app, you'd use specific icons for each waste type
    return <Recycle className="w-5 h-5" />;
  };

  if (result) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm px-4 py-4">
          <div className="flex items-center max-w-md mx-auto">
            <button 
              onClick={() => navigate('/dashboard')}
              className="p-2 -ml-2 text-gray-500 hover:text-primary-600"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-bold text-gray-900 ml-2">Scan Results</h1>
          </div>
        </header>

        <div className="px-4 py-6 max-w-md mx-auto space-y-6">
          {/* Success Animation */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4 mx-auto">
              <Award className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Great Job!</h2>
            <p className="text-gray-600">You've successfully recycled an item</p>
          </div>

          {/* Detected Item */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Detected Item</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${getWasteTypeColor(result.detected_type)}`}>
                {getWasteTypeIcon(result.detected_type)}
                <span className="capitalize">{result.detected_type}</span>
              </span>
            </div>
          </div>

          {/* Points Earned */}
          <div className="card bg-gradient-to-r from-primary-500 to-primary-600 text-white">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Points Earned</h3>
              <p className="text-4xl font-bold mb-2">+{result.eco_points_earned}</p>
              <p className="text-primary-100">Eco-Points</p>
            </div>
          </div>

          {/* Disposal Instructions */}
          <div className="card">
            <div className="flex items-center space-x-2 mb-3">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-semibold text-gray-900">How to Recycle</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">{result.disposal_method}</p>
          </div>

          {/* Environmental Impact */}
          <div className="card bg-green-50 border-green-200">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <h3 className="text-lg font-semibold text-green-800">Environmental Impact</h3>
            </div>
            <p className="text-green-700">{result.environmental_impact}</p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleNewScan}
              className="w-full btn-primary"
            >
              Scan Another Item
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full btn-secondary"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm px-4 py-4">
        <div className="flex items-center max-w-md mx-auto">
          <button 
            onClick={() => navigate('/dashboard')}
            className="p-2 -ml-2 text-gray-500 hover:text-primary-600"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold text-gray-900 ml-2">Scan Waste</h1>
        </div>
      </header>

      <div className="px-4 py-6 max-w-md mx-auto space-y-6">
        {/* Instructions */}
        <div className="card text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4 mx-auto">
            <Camera className="w-8 h-8 text-primary-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Scan Your Waste</h2>
          <p className="text-gray-600 mb-6">
            Take a photo of your waste item to get recycling tips and earn eco-points!
          </p>

          {/* Scanning Options */}
          <div className="space-y-4">
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={loading}
              className="w-full btn-primary py-4 disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              <Upload className="w-5 h-5" />
              <span>{loading ? 'Processing...' : 'Upload Photo'}</span>
            </button>
            
            <div className="text-sm text-gray-500">
              <p>• Point camera at waste item</p>
              <p>• Ensure good lighting</p>
              <p>• Keep item centered in frame</p>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Scanning Tips</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-gray-900">Good Lighting</h4>
                <p className="text-sm text-gray-600">Make sure your item is well-lit for better recognition</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-gray-900">Clean Items</h4>
                <p className="text-sm text-gray-600">Clean items are easier to identify and better for recycling</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-gray-900">Single Items</h4>
                <p className="text-sm text-gray-600">Scan one item at a time for accurate results</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Scans */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Recycle className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Plastic Bottle</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <span className="text-sm font-medium text-green-600">+15 pts</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Recycle className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Glass Jar</p>
                  <p className="text-xs text-gray-500">Yesterday</p>
                </div>
              </div>
              <span className="text-sm font-medium text-green-600">+12 pts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
};

export default WasteScanner;