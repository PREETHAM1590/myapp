import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useWallet } from '../../contexts/WalletContext';
import { Bell, User, Award, Coins, TrendingUp, Recycle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { currentUser, userData } = useAuth();
  const { ecoTokens } = useWallet();
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Mock stats - replace with actual API call
    setStats({
      totalItemsRecycled: 47,
      ecoPoints: userData?.eco_points || 1250,
      pointsThisMonth: 320,
      wasteBreakdown: {
        plastic: 15,
        glass: 8,
        paper: 12,
        metal: 7,
        organic: 5
      },
      achievementsCount: 3,
      streakDays: 7
    });
  }, [userData]);

  const quickAccessItems = [
    {
      title: 'Wallet',
      description: 'Manage ECO tokens',
      icon: Coins,
      color: 'bg-yellow-500',
      path: '/wallet'
    },
    {
      title: 'Marketplace',
      description: 'Buy eco-friendly items',
      icon: Award,
      color: 'bg-blue-500',
      path: '/marketplace'
    },
    {
      title: 'Challenges',
      description: 'Join community goals',
      icon: TrendingUp,
      color: 'bg-purple-500',
      path: '/challenges'
    },
    {
      title: 'Learn',
      description: 'Recycling tips & facts',
      icon: Recycle,
      color: 'bg-green-500',
      path: '/community'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm px-4 py-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Welcome back, {userData?.name || currentUser?.displayName || 'Demo User'}!
            </h1>
            <p className="text-gray-600 text-sm">Ready to make a difference today?</p>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              className="p-2 text-gray-500 hover:text-primary-600 transition-colors"
              onClick={() => {/* Add notification functionality */}}
            >
              <Bell size={20} />
            </button>
            <button 
              onClick={() => navigate('/profile')}
              className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center"
            >
              <User size={16} className="text-white" />
            </button>
          </div>
        </div>
      </header>

      <div className="px-4 py-6 max-w-md mx-auto space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="card">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Eco-Points</h3>
              <Coins className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {stats?.ecoPoints.toLocaleString() || '0'}
            </p>
            <p className="text-xs text-green-600 mt-1">+{stats?.pointsThisMonth || 0} this month</p>
            <div className="mt-3 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary-500 h-2 rounded-full transition-all duration-500"
                style={{ width: '70%' }}
              />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Achievements</h3>
              <Award className="w-5 h-5 text-orange-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {stats?.achievementsCount || 0}
            </p>
            <p className="text-xs text-gray-500 mt-1">badges unlocked</p>
            <div className="mt-3 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                style={{ width: '30%' }}
              />
            </div>
          </div>
        </div>

        {/* Scan Waste Card */}
        <div className="card text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 rounded-full mb-4 mx-auto">
            <Recycle className="w-10 h-10 text-primary-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Scan Waste Item</h3>
          <p className="text-gray-600 text-sm mb-4">
            Point your camera at waste to get recycling tips and earn points!
          </p>
          <button 
            onClick={() => navigate('/scan')}
            className="btn-primary w-full"
          >
            Start Scanning
          </button>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">This Week's Impact</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Plastic bottles recycled</span>
              </div>
              <span className="text-sm font-medium text-gray-900">15</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Paper items recycled</span>
              </div>
              <span className="text-sm font-medium text-gray-900">12</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Glass containers recycled</span>
              </div>
              <span className="text-sm font-medium text-gray-900">8</span>
            </div>
          </div>
        </div>

        {/* Quick Access */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Access</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickAccessItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  onClick={() => navigate(item.path)}
                  className="card hover:shadow-lg transition-shadow text-left"
                >
                  <div className={`w-10 h-10 ${item.color} rounded-lg flex items-center justify-center mb-3`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-medium text-gray-900 text-sm">{item.title}</h4>
                  <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;