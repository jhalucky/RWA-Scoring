import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import AuthPage from './components/AuthPage.jsx';
import LandingPage from './components/LandingPage.jsx';
import RwaScoringFrontend from './components/RwaScoringFrontend.jsx';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showApp, setShowApp] = useState(false);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL
        });
      } else {
        setUser(null);
        setShowApp(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAuthSuccess = (userData) => {
    setUser(userData);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setShowApp(false);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-deep-space flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-laser-blue/20 border-t-laser-blue rounded-full animate-spin"></div>
      </div>
    );
  }

  // Show auth page if not authenticated
  if (!user) {
    return <AuthPage onAuthSuccess={handleAuthSuccess} />;
  }

  // Show app if user clicked launch app
  if (showApp) {
    return <RwaScoringFrontend onBackToHome={() => setShowApp(false)} />;
  }

  // Show landing page for authenticated users
  return (
    <LandingPage 
      onLaunchApp={() => setShowApp(true)} 
      user={user}
      onSignOut={handleSignOut}
    />
  );
}

export default App;