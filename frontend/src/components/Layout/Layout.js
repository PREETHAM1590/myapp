import React from 'react';
import BottomNavigation from './BottomNavigation';
import FloatingActionButton from './FloatingActionButton';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <main className="flex-1">
        {children}
      </main>
      <FloatingActionButton />
      <BottomNavigation />
    </div>
  );
};

export default Layout;