import React, { useState, useEffect } from 'react';
import { ArrowLeft, Wallet as WalletIcon, Send, Plus, Copy, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../../contexts/WalletContext';
import toast from 'react-hot-toast';

const Wallet = () => {
  const navigate = useNavigate();
  const { wallet, balance, ecoTokens, loading, generateWallet, getBalance, requestAirdrop, sendTransaction } = useWallet();
  const [showSend, setShowSend] = useState(false);
  const [sendAddress, setSendAddress] = useState('');
  const [sendAmount, setSendAmount] = useState('');

  useEffect(() => {
    if (wallet?.publicKey) {
      getBalance(wallet.publicKey);
    }
  }, [wallet]);

  const handleGenerateWallet = async () => {
    try {
      const newWallet = generateWallet();
      toast.success('Wallet created successfully!');
    } catch (error) {
      toast.error('Failed to create wallet');
    }
  };

  const handleAirdrop = async () => {
    try {
      await requestAirdrop(1);
      toast.success('Airdrop successful! 1 SOL added to your wallet');
    } catch (error) {
      toast.error('Airdrop failed');
    }
  };

  const handleSend = async () => {
    if (!sendAddress || !sendAmount) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      await sendTransaction(sendAddress, parseFloat(sendAmount));
      toast.success('Transaction sent successfully!');
      setSendAddress('');
      setSendAmount('');
      setShowSend(false);
    } catch (error) {
      toast.error('Transaction failed');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Address copied to clipboard');
  };

  const transactions = [
    { id: 1, type: 'received', amount: '+1.0 SOL', from: 'Airdrop', time: '2 hours ago', status: 'confirmed' },
    { id: 2, type: 'earned', amount: '+50 ECO', from: 'Plastic Recycling', time: '1 day ago', status: 'confirmed' },
    { id: 3, type: 'spent', amount: '-25 ECO', from: 'Marketplace Purchase', time: '2 days ago', status: 'confirmed' },
  ];

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
          <h1 className="text-xl font-bold text-gray-900 ml-2">Wallet</h1>
        </div>
      </header>

      <div className="px-4 py-6 max-w-md mx-auto space-y-6">
        {!wallet ? (
          /* No Wallet State */
          <div className="card text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <WalletIcon className="w-8 h-8 text-primary-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Create Your Wallet</h2>
            <p className="text-gray-600 mb-6">
              Create a Solana wallet to manage your ECO tokens and participate in the crypto economy.
            </p>
            <button 
              onClick={handleGenerateWallet}
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Wallet'}
            </button>
          </div>
        ) : (
          <>
            {/* Wallet Balance */}
            <div className="card bg-gradient-to-r from-primary-500 to-primary-600 text-white">
              <div className="text-center mb-6">
                <h2 className="text-lg font-semibold mb-4">Wallet Balance</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-3xl font-bold">{balance.toFixed(4)}</p>
                    <p className="text-primary-100">SOL</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold">{ecoTokens}</p>
                    <p className="text-primary-100">ECO Tokens</p>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="grid grid-cols-3 gap-3">
                <button 
                  onClick={() => setShowSend(!showSend)}
                  className="flex flex-col items-center p-3 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
                >
                  <Send className="w-5 h-5 mb-1" />
                  <span className="text-xs">Send</span>
                </button>
                <button 
                  onClick={handleAirdrop}
                  disabled={loading}
                  className="flex flex-col items-center p-3 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors disabled:opacity-50"
                >
                  <Plus className="w-5 h-5 mb-1" />
                  <span className="text-xs">Airdrop</span>
                </button>
                <button 
                  onClick={() => navigate('/marketplace')}
                  className="flex flex-col items-center p-3 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
                >
                  <WalletIcon className="w-5 h-5 mb-1" />
                  <span className="text-xs">Buy</span>
                </button>
              </div>
            </div>

            {/* Send Transaction Form */}
            {showSend && (
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Send SOL</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Recipient Address
                    </label>
                    <input
                      type="text"
                      value={sendAddress}
                      onChange={(e) => setSendAddress(e.target.value)}
                      className="input-field"
                      placeholder="Enter Solana address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount (SOL)
                    </label>
                    <input
                      type="number"
                      value={sendAmount}
                      onChange={(e) => setSendAmount(e.target.value)}
                      className="input-field"
                      placeholder="0.1"
                      step="0.01"
                      max={balance}
                    />
                  </div>
                  <div className="flex space-x-3">
                    <button 
                      onClick={handleSend}
                      disabled={loading || !sendAddress || !sendAmount}
                      className="flex-1 btn-primary disabled:opacity-50"
                    >
                      {loading ? 'Sending...' : 'Send'}
                    </button>
                    <button 
                      onClick={() => setShowSend(false)}
                      className="flex-1 btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Wallet Address */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Your Address</h3>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700 font-mono truncate mr-2">
                  {wallet.publicKey}
                </p>
                <button 
                  onClick={() => copyToClipboard(wallet.publicKey)}
                  className="p-2 text-gray-500 hover:text-primary-600"
                >
                  <Copy size={16} />
                </button>
              </div>
            </div>

            {/* ECO Token Info */}
            <div className="card bg-yellow-50 border-yellow-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-yellow-800">ECO Tokens</h3>
                <span className="text-2xl">🪙</span>
              </div>
              <p className="text-yellow-700 text-sm mb-3">
                ECO tokens are earned by recycling and can be used in the marketplace to buy eco-friendly products.
              </p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-yellow-600">Total Earned:</span>
                <span className="font-semibold text-yellow-800">{ecoTokens} ECO</span>
              </div>
            </div>

            {/* Transaction History */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
                <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  View All
                </button>
              </div>
              <div className="space-y-3">
                {transactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        tx.type === 'received' ? 'bg-green-100' :
                        tx.type === 'earned' ? 'bg-blue-100' : 'bg-red-100'
                      }`}>
                        <span className="text-sm">
                          {tx.type === 'received' ? '📥' :
                           tx.type === 'earned' ? '🏆' : '💸'}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{tx.from}</p>
                        <p className="text-xs text-gray-500">{tx.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-medium ${
                        tx.type === 'spent' ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {tx.amount}
                      </p>
                      <p className="text-xs text-gray-500">{tx.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Solana Network Info */}
            <div className="card">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">Network</h3>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Network:</span>
                  <span className="font-medium text-gray-900">Solana Devnet</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="font-medium text-green-600">Connected</span>
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Wallet;