import React from 'react';
import { ArrowLeft, Trophy, Store, Target, BookOpen, Users, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Community = () => {
  const navigate = useNavigate();

  const communityFeatures = [
    {
      title: 'Wallet',
      description: 'Manage your ECO tokens and Solana wallet',
      icon: Store,
      color: 'bg-yellow-500',
      path: '/wallet',
      stats: '1,250 ECO'
    },
    {
      title: 'Marketplace',
      description: 'Buy eco-friendly items with your tokens',
      icon: Store,
      color: 'bg-blue-500',
      path: '/marketplace',
      stats: '50+ items'
    },
    {
      title: 'Challenges',
      description: 'Join community recycling challenges',
      icon: Target,
      color: 'bg-purple-500',
      path: '/challenges',
      stats: '3 active'
    },
    {
      title: 'Learn',
      description: 'Discover recycling tips and facts',
      icon: BookOpen,
      color: 'bg-green-500',
      path: '/learn',
      stats: 'New articles'
    }
  ];

  const leaderboard = [
    { rank: 1, name: 'EcoWarrior23', points: 2850, avatar: '🌟' },
    { rank: 2, name: 'GreenThumb', points: 2650, avatar: '🌱' },
    { rank: 3, name: 'RecycleKing', points: 2400, avatar: '♻️' },
    { rank: 4, name: 'You', points: 1250, avatar: '👤', isCurrentUser: true },
    { rank: 5, name: 'PlasticFree', points: 1100, avatar: '🌍' },
  ];

  const recentActivities = [
    {
      user: 'EcoWarrior23',
      action: 'completed the "Plastic Free Week" challenge',
      time: '2 hours ago',
      points: '+150 points'
    },
    {
      user: 'GreenThumb',
      action: 'recycled 15 glass bottles',
      time: '4 hours ago',
      points: '+75 points'
    },
    {
      user: 'RecycleKing',
      action: 'unlocked "Metal Master" achievement',
      time: '6 hours ago',
      points: '+200 points'
    }
  ];

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
          <h1 className="text-xl font-bold text-gray-900 ml-2">Community Hub</h1>
        </div>
      </header>

      <div className="px-4 py-6 max-w-md mx-auto space-y-6">
        {/* Community Stats */}
        <div className="card bg-gradient-to-r from-primary-500 to-primary-600 text-white">
          <div className="text-center">
            <Users className="w-8 h-8 mx-auto mb-2" />
            <h2 className="text-xl font-bold mb-1">Join 50,000+ Eco Warriors</h2>
            <p className="text-primary-100">Making a difference together</p>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-primary-400">
            <div className="text-center">
              <p className="text-2xl font-bold">2.5M</p>
              <p className="text-xs text-primary-100">Items Recycled</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">150K</p>
              <p className="text-xs text-primary-100">Trees Saved</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">75K</p>
              <p className="text-xs text-primary-100">CO₂ Reduced</p>
            </div>
          </div>
        </div>

        {/* Community Features */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Explore</h3>
          <div className="grid grid-cols-2 gap-4">
            {communityFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <button
                  key={index}
                  onClick={() => navigate(feature.path)}
                  className="card hover:shadow-lg transition-all text-left"
                >
                  <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-3`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">{feature.title}</h4>
                  <p className="text-xs text-gray-600 mb-2">{feature.description}</p>
                  <p className="text-xs font-medium text-primary-600">{feature.stats}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Leaderboard */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Leaderboard</h3>
            <Trophy className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="space-y-3">
            {leaderboard.map((user) => (
              <div 
                key={user.rank}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  user.isCurrentUser ? 'bg-primary-50 border border-primary-200' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    user.rank === 1 ? 'bg-yellow-100 text-yellow-800' :
                    user.rank === 2 ? 'bg-gray-100 text-gray-700' :
                    user.rank === 3 ? 'bg-orange-100 text-orange-800' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {user.rank <= 3 ? (
                      user.rank === 1 ? '🥇' :
                      user.rank === 2 ? '🥈' : '🥉'
                    ) : user.rank}
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${user.isCurrentUser ? 'text-primary-900' : 'text-gray-900'}`}>
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500">{user.points.toLocaleString()} points</p>
                  </div>
                </div>
                <span className="text-lg">{user.avatar}</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 text-primary-600 hover:text-primary-700 text-sm font-medium">
            View Full Leaderboard
          </button>
        </div>

        {/* Recent Community Activity */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Award className="w-4 h-4 text-primary-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{activity.user}</span> {activity.action}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-gray-500">{activity.time}</p>
                    <span className="text-xs font-medium text-green-600">{activity.points}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Challenges Preview */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Active Challenges</h3>
            <button 
              onClick={() => navigate('/challenges')}
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-purple-900">Plastic Free Week</h4>
                <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">5 days left</span>
              </div>
              <p className="text-sm text-purple-700 mb-2">Recycle 20 plastic items this week</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-purple-600">Progress: 12/20</span>
                <span className="font-medium text-purple-900">+300 points</span>
              </div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-green-900">Glass Guardian</h4>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">2 weeks left</span>
              </div>
              <p className="text-sm text-green-700 mb-2">Collect and recycle 50 glass items</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-green-600">Progress: 8/50</span>
                <span className="font-medium text-green-900">+500 points</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;