import React from 'react';
import { ArrowLeft, Settings, QrCode, Award, Coins, User, LogOut, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useWallet } from '../../contexts/WalletContext';
import toast from 'react-hot-toast';

const Profile = () => {
  const navigate = useNavigate();
  const { currentUser, userData, logout } = useAuth();
  const { wallet, ecoTokens } = useWallet();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  const achievements = [
    { id: 1, title: 'First Scan', description: 'Scanned your first waste item', icon: '🎯', unlocked: true },
    { id: 2, title: 'Eco Warrior', description: 'Recycled 10 items', icon: '⚔️', unlocked: true },
    { id: 3, title: 'Green Thumb', description: 'Earned 500 eco-points', icon: '🌱', unlocked: true },
    { id: 4, title: 'Plastic Hero', description: 'Recycled 20 plastic items', icon: '♻️', unlocked: false },
    { id: 5, title: 'Glass Master', description: 'Recycled 15 glass items', icon: '🥃', unlocked: false },
    { id: 6, title: 'Metal Collector', description: 'Recycled 10 metal items', icon: '🔧', unlocked: false }
  ];

  const stats = [
    { label: 'Items Recycled', value: '47', icon: '♻️' },
    { label: 'Eco Points', value: userData?.eco_points?.toLocaleString() || '1,250', icon: '🏆' },
    { label: 'ECO Tokens', value: ecoTokens || '0', icon: '🪙' },
    { label: 'Days Active', value: '23', icon: '📅' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm px-4 py-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/dashboard')}
              className="p-2 -ml-2 text-gray-500 hover:text-primary-600"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-bold text-gray-900 ml-2">Profile</h1>
          </div>
          <button 
            onClick={() => navigate('/settings')}
            className="p-2 text-gray-500 hover:text-primary-600"
          >
            <Settings size={20} />
          </button>
        </div>
      </header>

      <div className="px-4 py-6 max-w-md mx-auto space-y-6">
        {/* Profile Card */}
        <div className="card text-center">
          <div className="relative inline-block mb-4">
            <div className="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center mx-auto">
              <User className="w-10 h-10 text-white" />
            </div>
            <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
              <Edit className="w-3 h-3 text-white" />
            </button>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            {userData?.name || currentUser?.displayName || 'Demo User'}
          </h2>
          <p className="text-gray-600 mb-4">{currentUser?.email || 'demo@wastewise.com'}</p>
          
          {/* QR Code Section */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-center mb-2">
              <QrCode className="w-8 h-8 text-gray-600" />
            </div>
            <p className="text-sm font-medium text-gray-900 mb-1">Your QR Code</p>
            <p className="text-xs text-gray-500">Share for proof-of-drop verification</p>
          </div>

          <button 
            onClick={() => navigate('/wallet')}
            className="btn-primary w-full"
          >
            Manage Wallet
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="card text-center">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
          <div className="grid grid-cols-3 gap-3">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-3 rounded-lg border-2 text-center transition-all ${
                  achievement.unlocked
                    ? 'border-primary-200 bg-primary-50'
                    : 'border-gray-200 bg-gray-50 opacity-60'
                }`}
              >
                <div className="text-2xl mb-2">{achievement.icon}</div>
                <p className={`text-xs font-medium mb-1 ${
                  achievement.unlocked ? 'text-primary-900' : 'text-gray-500'
                }`}>
                  {achievement.title}
                </p>
                <p className={`text-xs ${
                  achievement.unlocked ? 'text-primary-600' : 'text-gray-400'
                }`}>
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 text-primary-600 hover:text-primary-700 text-sm font-medium">
            View All Achievements
          </button>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm">♻️</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Recycled plastic bottle</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <span className="text-sm font-medium text-green-600">+15 pts</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-sm">🥃</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Recycled glass jar</p>
                  <p className="text-xs text-gray-500">Yesterday</p>
                </div>
              </div>
              <span className="text-sm font-medium text-green-600">+12 pts</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Award className="w-4 h-4 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Unlocked Green Thumb badge</p>
                  <p className="text-xs text-gray-500">2 days ago</p>
                </div>
              </div>
              <span className="text-sm font-medium text-yellow-600">+100 pts</span>
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div className="space-y-3">
          <button 
            onClick={() => navigate('/settings')}
            className="w-full flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <Settings className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-900">Settings</span>
            </div>
            <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180" />
          </button>

          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 p-4 bg-red-50 text-red-600 rounded-xl border border-red-200 hover:bg-red-100 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;