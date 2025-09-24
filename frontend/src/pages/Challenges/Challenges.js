import React, { useState, useEffect } from 'react';
import { ArrowLeft, Target, Trophy, Users, Clock, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const Challenges = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('active');

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/challenges`);
      setChallenges(response.data);
    } catch (error) {
      console.error('Error fetching challenges:', error);
      // Use mock data for demo
      setChallenges([
        {
          id: '1',
          title: 'Plastic Free Week',
          description: 'Recycle 20 plastic items this week and help reduce plastic waste',
          target_count: 20,
          reward_points: 300,
          start_date: new Date('2024-09-20'),
          end_date: new Date('2024-09-27'),
          participants: ['user1', 'user2', 'user3'],
          progress: 12,
          category: 'plastic',
          difficulty: 'medium'
        },
        {
          id: '2',
          title: 'Glass Guardian',
          description: 'Collect and recycle 50 glass items to become a Glass Guardian',
          target_count: 50,
          reward_points: 500,
          start_date: new Date('2024-09-15'),
          end_date: new Date('2024-10-15'),
          participants: ['user1', 'user4', 'user5'],
          progress: 8,
          category: 'glass',
          difficulty: 'hard'
        },
        {
          id: '3',
          title: 'Paper Trail',
          description: 'Recycle 15 paper items and learn about sustainable forestry',
          target_count: 15,
          reward_points: 200,
          start_date: new Date('2024-09-22'),
          end_date: new Date('2024-09-29'),
          participants: ['user1'],
          progress: 5,
          category: 'paper',
          difficulty: 'easy'
        },
        {
          id: '4',
          title: 'Metal Detector',
          description: 'Find and recycle 10 metal items to complete this challenge',
          target_count: 10,
          reward_points: 250,
          start_date: new Date('2024-09-10'),
          end_date: new Date('2024-09-25'),
          participants: [],
          progress: 0,
          category: 'metal',
          difficulty: 'medium'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const joinChallenge = async (challengeId) => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/challenges/${challengeId}/join`, {
        user_id: currentUser?.uid || 'demo-user'
      });
      
      // Update local state
      setChallenges(challenges.map(challenge => 
        challenge.id === challengeId 
          ? { ...challenge, participants: [...challenge.participants, currentUser?.uid || 'demo-user'] }
          : challenge
      ));
      
      toast.success('Successfully joined challenge!');
    } catch (error) {
      console.error('Error joining challenge:', error);
      toast.error('Failed to join challenge');
    }
  };

  const getDaysRemaining = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const diffTime = end - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const getChallengeIcon = (category) => {
    const icons = {
      plastic: '🔵',
      glass: '🥃',
      paper: '📄',
      metal: '🔧',
      organic: '🌱'
    };
    return icons[category] || '♻️';
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      easy: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      hard: 'bg-red-100 text-red-800'
    };
    return colors[difficulty] || 'bg-gray-100 text-gray-800';
  };

  const isParticipating = (challenge) => {
    return challenge.participants.includes(currentUser?.uid || 'demo-user');
  };

  const isCompleted = (challenge) => {
    return challenge.progress >= challenge.target_count;
  };

  const filteredChallenges = challenges.filter(challenge => {
    const daysLeft = getDaysRemaining(challenge.end_date);
    const participating = isParticipating(challenge);
    const completed = isCompleted(challenge);

    if (activeTab === 'active') {
      return daysLeft > 0 && !completed;
    } else if (activeTab === 'joined') {
      return participating && daysLeft > 0 && !completed;
    } else if (activeTab === 'completed') {
      return completed && participating;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm px-4 py-4">
        <div className="flex items-center max-w-md mx-auto">
          <button 
            onClick={() => navigate('/community')}
            className="p-2 -ml-2 text-gray-500 hover:text-primary-600"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold text-gray-900 ml-2">Challenges</h1>
        </div>
      </header>

      <div className="px-4 py-6 max-w-md mx-auto space-y-6">
        {/* Challenge Stats */}
        <div className="card bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <div className="text-center mb-4">
            <Target className="w-8 h-8 mx-auto mb-2" />
            <h2 className="text-xl font-bold">Community Challenges</h2>
            <p className="text-purple-100">Join challenges to earn extra rewards!</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{challenges.filter(c => isParticipating(c)).length}</p>
              <p className="text-xs text-purple-100">Joined</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{challenges.filter(c => isCompleted(c) && isParticipating(c)).length}</p>
              <p className="text-xs text-purple-100">Completed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{challenges.reduce((sum, c) => sum + (isParticipating(c) && isCompleted(c) ? c.reward_points : 0), 0)}</p>
              <p className="text-xs text-purple-100">Points Earned</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="card">
          <div className="flex bg-gray-100 rounded-lg p-1">
            {[
              { key: 'active', label: 'Active' },
              { key: 'joined', label: 'Joined' },
              { key: 'completed', label: 'Completed' }
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  activeTab === key
                    ? 'bg-white text-purple-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Challenges List */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="bg-gray-300 h-6 rounded mb-2"></div>
                <div className="bg-gray-300 h-4 rounded mb-4"></div>
                <div className="bg-gray-300 h-4 rounded w-20"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredChallenges.map((challenge) => {
              const daysLeft = getDaysRemaining(challenge.end_date);
              const participating = isParticipating(challenge);
              const completed = isCompleted(challenge);
              const progressPercentage = (challenge.progress / challenge.target_count) * 100;

              return (
                <div key={challenge.id} className={`card hover:shadow-lg transition-shadow ${completed && participating ? 'bg-green-50 border-green-200' : ''}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{getChallengeIcon(challenge.category)}</span>
                      <div>
                        <h3 className="font-semibold text-gray-900">{challenge.title}</h3>
                        <p className="text-sm text-gray-600">{challenge.description}</p>
                      </div>
                    </div>
                    {completed && participating && (
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    )}
                  </div>

                  {/* Challenge Badges */}
                  <div className="flex items-center space-x-2 mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                      {challenge.difficulty}
                    </span>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Users className="w-3 h-3" />
                      <span>{challenge.participants.length} joined</span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{daysLeft} days left</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {participating && (
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">{challenge.progress}/{challenge.target_count}</span>
                      </div>
                      <div className="bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${
                            completed ? 'bg-green-500' : 'bg-purple-500'
                          }`}
                          style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Reward and Action */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Trophy className="w-4 h-4 text-yellow-500" />
                      <span className="font-medium text-gray-900">{challenge.reward_points} points</span>
                    </div>
                    
                    {completed && participating ? (
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-lg text-sm font-medium">
                        Completed! 🎉
                      </span>
                    ) : participating ? (
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-lg text-sm font-medium">
                        In Progress
                      </span>
                    ) : daysLeft > 0 ? (
                      <button
                        onClick={() => joinChallenge(challenge.id)}
                        className="px-3 py-1 bg-purple-500 text-white rounded-lg text-sm font-medium hover:bg-purple-600 transition-colors"
                      >
                        Join Challenge
                      </button>
                    ) : (
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium">
                        Expired
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {filteredChallenges.length === 0 && !loading && (
          <div className="text-center py-12">
            <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {activeTab === 'active' && 'No active challenges'}
              {activeTab === 'joined' && "You haven't joined any challenges yet"}
              {activeTab === 'completed' && "No completed challenges yet"}
            </h3>
            <p className="text-gray-600">
              {activeTab === 'active' && 'Check back later for new challenges!'}
              {activeTab === 'joined' && 'Browse active challenges to get started.'}
              {activeTab === 'completed' && 'Complete challenges to see them here.'}
            </p>
            {activeTab !== 'active' && (
              <button 
                onClick={() => setActiveTab('active')}
                className="mt-4 btn-primary"
              >
                View Active Challenges
              </button>
            )}
          </div>
        )}

        {/* How Challenges Work */}
        <div className="card bg-blue-50 border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">How Challenges Work</h3>
          <div className="space-y-2 text-sm text-blue-700">
            <p>• Join challenges to earn bonus eco-points</p>
            <p>• Scan items that match the challenge category</p>
            <p>• Complete before the deadline to win rewards</p>
            <p>• Compete with other community members</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Challenges;