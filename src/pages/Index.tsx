import { useState, useEffect } from 'react';
import SplashScreen from '@/components/SplashScreen';
import AuthScreen from '@/components/AuthScreen';
import MainApp from '@/components/MainApp';
import { storage } from '@/utils/storage';
import { User, Friend } from '@/types';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const savedUser = storage.getUser();
    if (savedUser) {
      setUserData(savedUser);
      setIsAuthenticated(true);
    }

    const urlParams = new URLSearchParams(window.location.search);
    const inviteCode = urlParams.get('invite');
    
    if (inviteCode && savedUser) {
      const inviterId = storage.getUserByInviteCode(inviteCode);
      if (inviterId && inviterId !== savedUser.userId) {
        const newFriend: Friend = {
          id: inviterId,
          name: `User ${inviterId.slice(-4)}`,
          phone: '',
          online: Math.random() > 0.5,
          lastSeen: 'недавно',
        };
        
        const existingFriends = storage.getFriends();
        if (!existingFriends.find(f => f.id === inviterId)) {
          storage.addFriend(newFriend);
          toast({
            title: 'Друг добавлен!',
            description: `${newFriend.name} теперь в вашем списке друзей`,
          });
        }
      }
      
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [toast]);

  const handleAuth = (user: { phone: string; userId: string }) => {
    const fullUser: User = {
      ...user,
      username: undefined,
      avatar: undefined,
      coverImage: undefined,
    };
    
    storage.setUser(fullUser);
    setUserData(fullUser);
    setIsAuthenticated(true);

    const urlParams = new URLSearchParams(window.location.search);
    const inviteCode = urlParams.get('invite');
    
    if (inviteCode) {
      const inviterId = storage.getUserByInviteCode(inviteCode);
      if (inviterId && inviterId !== user.userId) {
        const newFriend: Friend = {
          id: inviterId,
          name: `User ${inviterId.slice(-4)}`,
          phone: '',
          online: Math.random() > 0.5,
          lastSeen: 'недавно',
        };
        
        storage.addFriend(newFriend);
        
        setTimeout(() => {
          toast({
            title: 'Добро пожаловать!',
            description: 'Вы автоматически добавлены в чат друга',
          });
        }, 1000);
      }
      
      window.history.replaceState({}, document.title, window.location.pathname);
    }
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