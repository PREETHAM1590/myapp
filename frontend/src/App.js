import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { WalletProvider } from './contexts/WalletContext';
import Layout from './components/Layout/Layout';
import LoginScreen from './pages/Auth/LoginScreen';
import Dashboard from './pages/Dashboard/Dashboard';
import WasteScanner from './pages/WasteScanner/WasteScanner';
import Stats from './pages/Stats/Stats';
import Community from './pages/Community/Community';
import Profile from './pages/Profile/Profile';
import Marketplace from './pages/Marketplace/Marketplace';
import Challenges from './pages/Challenges/Challenges';
import Wallet from './pages/Wallet/Wallet';
import Chatbot from './pages/Chatbot/Chatbot';
import ProtectedRoute from './components/Auth/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <WalletProvider>
        <Router>
          <div className="App min-h-screen bg-gray-50">
            <Toaster position="top-right" />
            <Routes>
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/*" element={
                <ProtectedRoute>
                  <Layout>
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/scan" element={<WasteScanner />} />
                      <Route path="/stats" element={<Stats />} />
                      <Route path="/community" element={<Community />} />
                      <Route path="/marketplace" element={<Marketplace />} />
                      <Route path="/challenges" element={<Challenges />} />
                      <Route path="/wallet" element={<Wallet />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/chat" element={<Chatbot />} />
                    </Routes>
                  </Layout>
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </Router>
      </WalletProvider>
    </AuthProvider>
  );
}

export default App;