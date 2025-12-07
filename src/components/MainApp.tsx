import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { User, Friend } from '@/types';
import { storage } from '@/utils/storage';
import ChatView from './ChatView';
import GamesTab from './GamesTab';
import ProfileTab from './ProfileTab';
import FriendsTab from './FriendsTab';

type Tab = 'chats' | 'groups' | 'friends' | 'games' | 'profile';

interface MainAppProps {
  userData: User | null;
}

const MainApp = ({ userData: initialUserData }: MainAppProps) => {
  const [activeTab, setActiveTab] = useState<Tab>('chats');
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [userData, setUserData] = useState<User | null>(initialUserData);
  const [chats, setChats] = useState<Record<string, any>>({});

  useEffect(() => {
    setFriends(storage.getFriends());
    setChats(storage.getChats());
  }, []);

  const handleOpenChat = (friend: Friend) => {
    setSelectedFriend(friend);
  };

  const handleBackToChats = () => {
    setSelectedFriend(null);
    setChats(storage.getChats());
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUserData(updatedUser);
  };

  const tabs = [
    { id: 'chats' as Tab, icon: 'MessageSquare', label: 'Чаты' },
    { id: 'groups' as Tab, icon: 'Users', label: 'Группы' },
    { id: 'friends' as Tab, icon: 'UserPlus', label: 'Друзья' },
    { id: 'games' as Tab, icon: 'Gamepad2', label: 'Игры' },
    { id: 'profile' as Tab, icon: 'User', label: 'Профиль' },
  ];

  const totalUnread = Object.values(chats).reduce(
    (sum: number, chat: any) => sum + (chat.unreadCount || 0),
    0
  );

  if (selectedFriend && userData) {
    return <ChatView friend={selectedFriend} currentUserId={userData.userId} onBack={handleBackToChats} />;
  }

  return (
    <div className="min-h-screen bg-gaming-dark flex flex-col">
      <header className="bg-gaming-card border-b border-gaming-border p-4 shadow-lg">
        <div className="flex items-center justify-between max-w-screen-xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gaming-neon-purple to-gaming-neon-cyan flex items-center justify-center shadow-lg">
                <div className="w-8 h-8 rounded-md bg-gaming-dark flex items-center justify-center">
                  <div className="w-6 h-6 rounded bg-gradient-to-br from-gaming-neon-purple via-gaming-neon-pink to-gaming-neon-cyan"></div>
                </div>
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gaming-neon-purple rounded flex items-center justify-center">
                <span className="text-xs font-heading font-bold text-white">R</span>
              </div>
            </div>
            <h1 className="text-xl font-heading font-bold text-white">Rilmas</h1>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gaming-darker rounded-lg transition-colors relative">
              <Icon name="Bell" size={20} className="text-muted-foreground" />
              {totalUnread > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-gaming-neon-pink rounded-full"></span>
              )}
            </button>
            <button className="p-2 hover:bg-gaming-darker rounded-lg transition-colors">
              <Icon name="Search" size={20} className="text-muted-foreground" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col max-w-screen-xl w-full mx-auto overflow-hidden">
        <ScrollArea className="flex-1">
          {activeTab === 'chats' && (
            <div className="p-4 space-y-2 animate-fade-in">
              {friends.length === 0 ? (
                <div className="text-center py-16">
                  <Icon name="MessageSquare" size={64} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Пока нет чатов</h3>
                  <p className="text-muted-foreground mb-6">Пригласите друзей, чтобы начать общение</p>
                </div>
              ) : (
                friends.map((friend) => {
                  const chat = chats[friend.id];
                  const lastMessage = chat?.messages?.[chat.messages.length - 1];
                  
                  return (
                    <div
                      key={friend.id}
                      onClick={() => handleOpenChat(friend)}
                      className="bg-gaming-card border border-gaming-border rounded-xl p-4 hover:border-gaming-neon-purple transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="w-12 h-12 border-2 border-gaming-neon-purple/30">
                            <AvatarImage src={friend.avatar} />
                            <AvatarFallback className="bg-gaming-neon-purple text-white font-semibold">
                              {friend.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          {friend.online && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-gaming-neon-green rounded-full border-2 border-gaming-card"></div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-foreground truncate">{friend.name}</h3>
                            {lastMessage && (
                              <span className="text-xs text-muted-foreground">
                                {new Date(lastMessage.timestamp).toLocaleTimeString('ru-RU', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            {lastMessage?.text || 'Начните общение'}
                          </p>
                        </div>

                        {chat?.unreadCount > 0 && (
                          <Badge className="bg-gaming-neon-purple hover:bg-gaming-neon-purple text-white">
                            {chat.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {activeTab === 'groups' && (
            <div className="text-center py-16 px-4 animate-fade-in">
              <Icon name="Users" size={64} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Группы</h3>
              <p className="text-muted-foreground mb-6">Создавайте группы до 200к человек</p>
              <button className="px-6 py-3 bg-gradient-to-r from-gaming-neon-purple to-gaming-neon-cyan rounded-xl text-white font-semibold hover:opacity-90 transition-opacity">
                Создать группу
              </button>
            </div>
          )}

          {activeTab === 'friends' && <FriendsTab onOpenChat={handleOpenChat} />}

          {activeTab === 'games' && <GamesTab />}

          {activeTab === 'profile' && userData && (
            <ProfileTab userData={userData} onUpdateUser={handleUpdateUser} />
          )}
        </ScrollArea>

        <nav className="bg-gaming-card border-t border-gaming-border p-2 shadow-lg">
          <div className="flex justify-around max-w-screen-xl mx-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${
                  activeTab === tab.id
                    ? 'bg-gaming-neon-purple/20 text-gaming-neon-purple'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab.icon as any} size={22} />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MainApp;
