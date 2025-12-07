import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Friend } from '@/types';
import { storage } from '@/utils/storage';
import { useToast } from '@/hooks/use-toast';

interface FriendsTabProps {
  onOpenChat: (friend: Friend) => void;
}

const FriendsTab = ({ onOpenChat }: FriendsTabProps) => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    setFriends(storage.getFriends());
  }, []);

  const generateInviteLink = () => {
    const user = storage.getUser();
    if (!user) return;

    const inviteCode = `INV${Date.now().toString(36).toUpperCase()}`;
    storage.saveInviteLink(user.userId, inviteCode);
    const link = `${window.location.origin}?invite=${inviteCode}`;
    
    navigator.clipboard.writeText(link);
    toast({
      title: 'Ссылка скопирована',
      description: 'Отправьте её другу для добавления в чат',
    });
  };

  return (
    <div className="p-4 space-y-4 animate-fade-in">
      <Button
        onClick={generateInviteLink}
        className="w-full bg-gradient-to-r from-gaming-neon-purple to-gaming-neon-cyan hover:opacity-90 text-white font-semibold h-12"
      >
        <Icon name="UserPlus" size={20} className="mr-2" />
        Пригласить друга
      </Button>

      {friends.length === 0 ? (
        <div className="text-center py-16">
          <Icon name="Users" size={64} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">Пока нет друзей</h3>
          <p className="text-muted-foreground mb-6">Пригласите друзей по ссылке</p>
        </div>
      ) : (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground px-2">
            Все друзья ({friends.length})
          </h3>
          {friends.map((friend) => (
            <div
              key={friend.id}
              onClick={() => onOpenChat(friend)}
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
                  <h3 className="font-semibold text-foreground truncate">{friend.name}</h3>
                  <p className="text-sm text-muted-foreground truncate">
                    {friend.online ? 'В сети' : `Был(а) ${friend.lastSeen}`}
                  </p>
                </div>

                <Icon
                  name="MessageSquare"
                  size={20}
                  className="text-muted-foreground group-hover:text-gaming-neon-purple transition-colors"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendsTab;
