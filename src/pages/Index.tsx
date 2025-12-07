import { useState, useEffect } from 'react';
import SplashScreen from '@/components/SplashScreen';
import AuthScreen from '@/components/AuthScreen';
import MainApp from '@/components/MainApp';

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<{ phone: string; userId: string } | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem('rilmas_user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUserData(user);
      setIsAuthenticated(true);
    }
  }, []);

  const handleAuth = (user: { phone: string; userId: string }) => {
    setUserData(user);
    setIsAuthenticated(true);
  };

  if (showSplash) {
    return <SplashScreen />;
  }

  if (!isAuthenticated) {
    return <AuthScreen onAuth={handleAuth} />;
  }

  return <MainApp userData={userData} />;
};

export default Index;