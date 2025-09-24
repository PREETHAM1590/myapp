import React, { useState, useEffect } from 'react';
import { ArrowLeft, TrendingUp, Award, Recycle, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import axios from 'axios';

const Stats = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeFrame, setTimeFrame] = useState('month');

  useEffect(() => {
    fetchStats();
  }, [currentUser, timeFrame]);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users/${currentUser?.uid || 'demo-user'}/stats`);
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Use mock data for demo
      setStats({
        total_items_recycled: 47,
        eco_points: 1250,
        points_this_month: 320,
        waste_breakdown: {
          plastic: 15,
          glass: 8,
          paper: 12,
          metal: 7,
          organic: 5
        },
        achievements_count: 3,
        streak_days: 7
      });
    } finally {
      setLoading(false);
    }
  };

  const wasteData = stats ? Object.entries(stats.waste_breakdown).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value,
    count: value
  })) : [];

  const monthlyData = [
    { name: 'Jan', items: 12, points: 180 },
    { name: 'Feb', items: 19, points: 285 },
    { name: 'Mar', items: 15, points: 225 },
    { name: 'Apr', items: 22, points: 330 },
    { name: 'May', items: 18, points: 270 },
    { name: 'Jun', items: 25, points: 375 },
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#6B7280', '#EF4444'];

  const StatCard = ({ title, value, subtitle, icon: Icon, color }) => (
    <div className="card">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your stats...</p>
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
          <h1 className="text-xl font-bold text-gray-900 ml-2">Your Progress</h1>
        </div>
      </header>

      <div className="px-4 py-6 max-w-md mx-auto space-y-6">
        {/* Time Frame Selector */}
        <div className="card">
          <div className="flex bg-gray-100 rounded-lg p-1">
            {[
              { key: 'week', label: 'Week' },
              { key: 'month', label: 'Month' },
              { key: 'year', label: 'Year' }
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setTimeFrame(key)}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  timeFrame === key
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard
            title="Total Items"
            value={stats?.total_items_recycled || 0}
            subtitle="recycled this month"
            icon={Recycle}
            color="text-green-500"
          />
          <StatCard
            title="Eco-Points"
            value={stats?.eco_points?.toLocaleString() || '0'}
            subtitle={`+${stats?.points_this_month || 0} this month`}
            icon={Award}
            color="text-yellow-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <StatCard
            title="Current Streak"
            value={`${stats?.streak_days || 0} days`}
            subtitle="Keep it up!"
            icon={Calendar}
            color="text-orange-500"
          />
          <StatCard
            title="Achievements"
            value={stats?.achievements_count || 0}
            subtitle="badges earned"
            icon={TrendingUp}
            color="text-purple-500"
          />
        </div>

        {/* Waste Breakdown Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Waste Type Breakdown</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={wasteData}
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {wasteData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {wasteData.map((item, index) => (
              <div key={item.name} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-sm text-gray-700">{item.name}: {item.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Progress */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Progress</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="items" fill="#22c55e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Environmental Impact */}
        <div className="card bg-green-50 border-green-200">
          <h3 className="text-lg font-semibold text-green-800 mb-4">Environmental Impact</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-green-700">CO₂ Saved</span>
              <span className="font-semibold text-green-800">12.5 kg</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-green-700">Water Saved</span>
              <span className="font-semibold text-green-800">850 L</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-green-700">Energy Saved</span>
              <span className="font-semibold text-green-800">45 kWh</span>
            </div>
          </div>
          <div className="mt-4 p-3 bg-green-100 rounded-lg">
            <p className="text-sm text-green-800">
              🌍 Your recycling efforts have prevented the equivalent of 2.8 trees worth of CO₂ from entering the atmosphere!
            </p>
          </div>
        </div>

        {/* Goals */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Goals</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Items Recycled</span>
                <span className="font-medium">{stats?.total_items_recycled || 0}/50</span>
              </div>
              <div className="bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(((stats?.total_items_recycled || 0) / 50) * 100, 100)}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Eco-Points</span>
                <span className="font-medium">{stats?.points_this_month || 0}/500</span>
              </div>
              <div className="bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(((stats?.points_this_month || 0) / 500) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;