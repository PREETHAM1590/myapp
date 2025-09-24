import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, BarChart3, Users, User } from 'lucide-react';

const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    {
      id: 'dashboard',
      path: '/dashboard',
      label: 'Home',
      icon: Home
    },
    {
      id: 'stats',
      path: '/stats',
      label: 'Stats',
      icon: BarChart3
    },
    {
      id: 'community',
      path: '/community',
      label: 'Community',
      icon: Users
    },
    {
      id: 'profile',
      path: '/profile',
      label: 'Profile',
      icon: User
    }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-40">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors ${
                active 
                  ? 'text-primary-600 bg-primary-50' 
                  : 'text-gray-500 hover:text-primary-600'
              }`}
            >
              <Icon size={20} className={`mb-1 ${active ? 'text-primary-600' : 'text-gray-500'}`} />
              <span className={`text-xs font-medium ${active ? 'text-primary-600' : 'text-gray-500'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;