import React, { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import axios from 'axios';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

// Initialize Firebase only if config is available
let app, auth;
if (firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
}

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  // Mock user for development if Firebase is not configured
  const createMockUser = () => ({
    uid: 'mock-user-123',
    email: 'demo@wastewise.com',
    displayName: 'Demo User'
  });

  const signup = async (email, password, name) => {
    if (!auth) {
      // Mock signup for development
      const mockUser = createMockUser();
      setCurrentUser(mockUser);
      await createUserInBackend(mockUser, name);
      return mockUser;
    }
    
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await createUserInBackend(userCredential.user, name);
    return userCredential.user;
  };

  const login = async (email, password) => {
    if (!auth) {
      // Mock login for development
      const mockUser = createMockUser();
      setCurrentUser(mockUser);
      return mockUser;
    }
    
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  };

  const loginWithGoogle = async () => {
    if (!auth) {
      // Mock Google login for development
      const mockUser = createMockUser();
      setCurrentUser(mockUser);
      await createUserInBackend(mockUser, mockUser.displayName);
      return mockUser;
    }
    
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    await createUserInBackend(userCredential.user, userCredential.user.displayName);
    return userCredential.user;
  };

  const logout = async () => {
    if (auth) {
      await signOut(auth);
    }
    setCurrentUser(null);
    setUserData(null);
  };

  const createUserInBackend = async (firebaseUser, name) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users`, {
        id: firebaseUser.uid,
        email: firebaseUser.email,
        name: name || firebaseUser.displayName || 'User',
        eco_points: 0,
        achievements: []
      });
      setUserData(response.data);
    } catch (error) {
      console.error('Error creating user in backend:', error);
    }
  };

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users/${userId}`);
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    if (!auth) {
      // For development without Firebase
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await fetchUserData(user.uid);
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userData,
    signup,
    login,
    loginWithGoogle,
    logout,
    fetchUserData
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};