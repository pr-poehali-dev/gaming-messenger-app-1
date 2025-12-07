import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

type Tab = 'chats' | 'groups' | 'friends' | 'games' | 'profile';

const MainApp = () => {
  const [activeTab, setActiveTab] = useState<Tab>('chats');

  const mockChats = [
    { id: 1, name: 'ProGamer2024', avatar: '', message: 'Го катку в Valorant?', time: '14:32', unread: 3, online: true },
    { id: 2, name: 'StreamKing', avatar: '', message: 'Смотри что я нашел', time: '13:15', unread: 0, online: true },
    { id: 3, name: 'NinjaWarrior', avatar: '', message: 'GG wp', time: '12:05', unread: 1, online: false },
    { id: 4, name: 'GameMaster', avatar: '', message: 'Завтра турнир, готов?', time: '11:20', unread: 0, online: true },
  ];

  const tabs = [
    { id: 'chats' as Tab, icon: 'MessageSquare', label: 'Чаты' },
    { id: 'groups' as Tab, icon: 'Users', label: 'Группы' },
    { id: 'friends' as Tab, icon: 'UserPlus', label: 'Друзья' },
    { id: 'games' as Tab, icon: 'Gamepad2', label: 'Игры' },
    { id: 'profile' as Tab, icon: 'User', label: 'Профиль' },
  ];

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
              <span className="absolute top-1 right-1 w-2 h-2 bg-gaming-neon-pink rounded-full"></span>
            </button>
            <button className="p-2 hover:bg-gaming-darker rounded-lg transition-colors">
              <Icon name="Search" size={20} className="text-muted-foreground" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col max-w-screen-xl w-full mx-auto">
        <ScrollArea className="flex-1 p-4">
          {activeTab === 'chats' && (
            <div className="space-y-2 animate-fade-in">
              {mockChats.map((chat) => (
                <div
                  key={chat.id}
                  className="bg-gaming-card border border-gaming-border rounded-xl p-4 hover:border-gaming-neon-purple transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="w-12 h-12 border-2 border-gaming-neon-purple/30">
                        <AvatarImage src={chat.avatar} />
                        <AvatarFallback className="bg-gaming-neon-purple text-white font-semibold">
                          {chat.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      {chat.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-gaming-neon-green rounded-full border-2 border-gaming-card"></div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-foreground truncate">{chat.name}</h3>
                        <span className="text-xs text-muted-foreground">{chat.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{chat.message}</p>
                    </div>

                    {chat.unread > 0 && (
                      <Badge className="bg-gaming-neon-purple hover:bg-gaming-neon-purple text-white">
                        {chat.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'groups' && (
            <div className="text-center py-16 animate-fade-in">
              <Icon name="Users" size={64} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Группы</h3>
              <p className="text-muted-foreground mb-6">Создавайте группы до 200к человек</p>
              <button className="px-6 py-3 bg-gradient-to-r from-gaming-neon-purple to-gaming-neon-cyan rounded-xl text-white font-semibold hover:opacity-90 transition-opacity">
                Создать группу
              </button>
            </div>
          )}

          {activeTab === 'friends' && (
            <div className="text-center py-16 animate-fade-in">
              <Icon name="UserPlus" size={64} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Друзья</h3>
              <p className="text-muted-foreground mb-6">Пригласите друзей по ссылке</p>
              <button className="px-6 py-3 bg-gradient-to-r from-gaming-neon-purple to-gaming-neon-cyan rounded-xl text-white font-semibold hover:opacity-90 transition-opacity">
                Пригласить друга
              </button>
            </div>
          )}

          {activeTab === 'games' && (
            <div className="text-center py-16 animate-fade-in">
              <Icon name="Gamepad2" size={64} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Игры</h3>
              <p className="text-muted-foreground mb-6">Интеграция с Roblox и другими играми</p>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="max-w-md mx-auto py-8 animate-fade-in">
              <div className="text-center mb-8">
                <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-gaming-neon-purple">
                  <AvatarFallback className="bg-gaming-neon-purple text-white text-3xl font-bold">U</AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-1">Гость</h2>
                <p className="text-muted-foreground">@user_123</p>
              </div>

              <div className="space-y-2">
                <button className="w-full bg-gaming-card border border-gaming-border rounded-xl p-4 hover:border-gaming-neon-purple transition-all text-left flex items-center gap-3">
                  <Icon name="User" size={20} className="text-gaming-neon-purple" />
                  <span className="text-foreground font-medium">Редактировать профиль</span>
                </button>
                <button className="w-full bg-gaming-card border border-gaming-border rounded-xl p-4 hover:border-gaming-neon-cyan transition-all text-left flex items-center gap-3">
                  <Icon name="Crown" size={20} className="text-gaming-neon-cyan" />
                  <span className="text-foreground font-medium">Premium подписка</span>
                </button>
                <button className="w-full bg-gaming-card border border-gaming-border rounded-xl p-4 hover:border-gaming-neon-pink transition-all text-left flex items-center gap-3">
                  <Icon name="Sticker" size={20} className="text-gaming-neon-pink" />
                  <span className="text-foreground font-medium">Мои стикеры</span>
                </button>
              </div>
            </div>
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
