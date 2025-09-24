import React, { createContext, useContext, useState, useEffect } from 'react';
import { Connection, PublicKey, Keypair, LAMPORTS_PER_SOL, SystemProgram, Transaction } from '@solana/web3.js';
import { useAuth } from './AuthContext';
import axios from 'axios';

const WalletContext = createContext();

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

export const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState(null);
  const [balance, setBalance] = useState(0);
  const [ecoTokens, setEcoTokens] = useState(0);
  const [loading, setLoading] = useState(false);
  const [connection] = useState(new Connection(process.env.REACT_APP_SOLANA_RPC_URL || 'https://api.devnet.solana.com', 'confirmed'));
  const { currentUser } = useAuth();

  const generateWallet = () => {
    const keypair = Keypair.generate();
    const walletData = {
      publicKey: keypair.publicKey.toString(),
      secretKey: Array.from(keypair.secretKey)
    };
    
    setWallet(walletData);
    localStorage.setItem('waste-wise-wallet', JSON.stringify(walletData));
    
    // Update user's wallet address in backend
    if (currentUser) {
      updateWalletAddress(walletData.publicKey);
    }
    
    return walletData;
  };

  const updateWalletAddress = async (address) => {
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/users/${currentUser.uid}/wallet`, 
        address, 
        { headers: { 'Content-Type': 'application/json' } }
      );
    } catch (error) {
      console.error('Error updating wallet address:', error);
    }
  };

  const loadWallet = () => {
    const savedWallet = localStorage.getItem('waste-wise-wallet');
    if (savedWallet) {
      const walletData = JSON.parse(savedWallet);
      setWallet(walletData);
      return walletData;
    }
    return null;
  };

  const getBalance = async (publicKey) => {
    if (!publicKey) return 0;
    
    try {
      const balance = await connection.getBalance(new PublicKey(publicKey));
      const solBalance = balance / LAMPORTS_PER_SOL;
      setBalance(solBalance);
      return solBalance;
    } catch (error) {
      console.error('Error getting balance:', error);
      return 0;
    }
  };

  const requestAirdrop = async (amount = 1) => {
    if (!wallet?.publicKey) {
      throw new Error('No wallet available');
    }

    setLoading(true);
    try {
      const publicKey = new PublicKey(wallet.publicKey);
      const signature = await connection.requestAirdrop(
        publicKey,
        amount * LAMPORTS_PER_SOL
      );
      
      await connection.confirmTransaction(signature);
      await getBalance(wallet.publicKey);
      
      return signature;
    } catch (error) {
      console.error('Airdrop failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const sendTransaction = async (toAddress, amount) => {
    if (!wallet?.secretKey || !wallet?.publicKey) {
      throw new Error('No wallet available');
    }

    setLoading(true);
    try {
      const fromKeypair = Keypair.fromSecretKey(new Uint8Array(wallet.secretKey));
      const toPublicKey = new PublicKey(toAddress);
      
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: fromKeypair.publicKey,
          toPubkey: toPublicKey,
          lamports: amount * LAMPORTS_PER_SOL,
        })
      );

      const signature = await connection.sendTransaction(transaction, [fromKeypair]);
      await connection.confirmTransaction(signature);
      
      await getBalance(wallet.publicKey);
      
      return signature;
    } catch (error) {
      console.error('Transaction failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Mock ECO token functionality (in real app, this would be a custom token)
  const updateEcoTokens = (amount) => {
    setEcoTokens(prev => prev + amount);
    localStorage.setItem('waste-wise-eco-tokens', JSON.stringify(ecoTokens + amount));
  };

  const loadEcoTokens = () => {
    const saved = localStorage.getItem('waste-wise-eco-tokens');
    if (saved) {
      setEcoTokens(JSON.parse(saved));
    }
  };

  useEffect(() => {
    loadWallet();
    loadEcoTokens();
  }, []);

  useEffect(() => {
    if (wallet?.publicKey) {
      getBalance(wallet.publicKey);
    }
  }, [wallet]);

  const value = {
    wallet,
    balance,
    ecoTokens,
    loading,
    generateWallet,
    getBalance,
    requestAirdrop,
    sendTransaction,
    updateEcoTokens,
    loadWallet
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};