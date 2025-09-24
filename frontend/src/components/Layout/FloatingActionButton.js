import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Scan } from 'lucide-react';

const FloatingActionButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/scan')}
      className="fixed bottom-24 right-6 w-16 h-16 bg-primary-500 hover:bg-primary-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-50 transform hover:scale-105"
      aria-label="Scan waste"
    >
      <Scan size={24} />
    </button>
  );
};

export default FloatingActionButton;