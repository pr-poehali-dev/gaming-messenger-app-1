import { useState, useRef } from 'react';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User } from '@/types';
import { storage } from '@/utils/storage';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface ProfileTabProps {
  userData: User;
  onUpdateUser: (user: User) => void;
}

const ProfileTab = ({ userData, onUpdateUser }: ProfileTabProps) => {
  const [username, setUsername] = useState(userData.username || '');
  const [isEditingName, setIsEditingName] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (
    file: File,
    type: 'avatar' | 'cover'
  ) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Ошибка',
        description: 'Выберите файл изображения',
        variant: 'destructive',
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      const updates = type === 'avatar' ? { avatar: base64 } : { coverImage: base64 };
      const updatedUser = storage.updateUser(updates);
      if (updatedUser) {
        onUpdateUser(updatedUser);
        toast({
          title: 'Успешно',
          description: type === 'avatar' ? 'Аватар обновлен' : 'Обложка обновлена',
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveName = () => {
    const updatedUser = storage.updateUser({ username });
    if (updatedUser) {
      onUpdateUser(updatedUser);
      setIsEditingName(false);
      toast({
        title: 'Успешно',
        description: 'Имя пользователя обновлено',
      });
    }
  };

  const generateInviteLink = () => {
    const inviteCode = `INV${Date.now().toString(36).toUpperCase()}`;
    storage.saveInviteLink(userData.userId, inviteCode);
    const link = `${window.location.origin}?invite=${inviteCode}`;
    
    navigator.clipboard.writeText(link);
    toast({
      title: 'Ссылка скопирована',
      description: 'Отправьте её другу для добавления в чат',
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('rilmas_user');
    window.location.reload();
  };

  return (
    <div className="animate-fade-in">
      <div className="relative h-48 bg-gaming-card border-b border-gaming-border overflow-hidden group">
        {userData.coverImage ? (
          <img
            src={userData.coverImage}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gaming-neon-purple via-gaming-neon-pink to-gaming-neon-cyan opacity-50"></div>
        )}
        
        <button
          onClick={() => coverInputRef.current?.click()}
          className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
        >
          <div className="text-center">
            <Icon name="Camera" size={32} className="text-white mx-auto mb-2" />
            <p className="text-white font-medium">Изменить обложку</p>
          </div>
        </button>
        <input
          ref={coverInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'cover')}
        />
      </div>

      <div className="px-4 pb-4">
        <div className="relative -mt-16 mb-4">
          <div className="inline-block group/avatar">
            <Avatar className="w-32 h-32 border-4 border-gaming-dark">
              <AvatarImage src={userData.avatar} />
              <AvatarFallback className="bg-gaming-neon-purple text-white text-4xl font-bold">
                {userData.username?.[0] || userData.phone.slice(-2)}
              </AvatarFallback>
            </Avatar>
            <button
              onClick={() => avatarInputRef.current?.click()}
              className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center"
            >
              <Icon name="Camera" size={24} className="text-white" />
            </button>
            <input
              ref={avatarInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'avatar')}
            />
          </div>
        </div>

        <div className="mb-6">
          {isEditingName ? (
            <div className="flex gap-2 mb-2">
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Введите имя"
                className="bg-gaming-card border-gaming-border text-foreground"
              />
              <Button
                onClick={handleSaveName}
                className="bg-gaming-neon-purple hover:opacity-90"
              >
                <Icon name="Check" size={20} />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-2xl font-heading font-bold text-foreground">
                {userData.username || userData.phone}
              </h2>
              <button
                onClick={() => setIsEditingName(true)}
                className="p-1 hover:bg-gaming-card rounded"
              >
                <Icon name="Edit" size={16} className="text-muted-foreground" />
              </button>
            </div>
          )}
          <p className="text-muted-foreground">@{userData.userId}</p>
        </div>

        <div className="space-y-2">
          <Dialog>
            <DialogTrigger asChild>
              <button className="w-full bg-gaming-card border border-gaming-border rounded-xl p-4 hover:border-gaming-neon-cyan transition-all text-left flex items-center gap-3">
                <Icon name="UserPlus" size={20} className="text-gaming-neon-cyan" />
                <span className="text-foreground font-medium">Пригласить друга</span>
              </button>
            </DialogTrigger>
            <DialogContent className="bg-gaming-card border-gaming-border">
              <DialogHeader>
                <DialogTitle className="text-foreground">Пригласить друга</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Отправьте эту ссылку другу. После регистрации он автоматически появится у вас в чатах
                </DialogDescription>
              </DialogHeader>
              <Button
                onClick={generateInviteLink}
                className="bg-gradient-to-r from-gaming-neon-purple to-gaming-neon-cyan hover:opacity-90 text-white"
              >
                <Icon name="Copy" size={20} className="mr-2" />
                Скопировать ссылку-приглашение
              </Button>
            </DialogContent>
          </Dialog>

          <button className="w-full bg-gaming-card border border-gaming-border rounded-xl p-4 hover:border-gaming-neon-purple transition-all text-left flex items-center gap-3">
            <Icon name="Settings" size={20} className="text-gaming-neon-purple" />
            <span className="text-foreground font-medium">Настройки</span>
          </button>

          <button className="w-full bg-gaming-card border border-gaming-border rounded-xl p-4 hover:border-gaming-neon-cyan transition-all text-left flex items-center gap-3">
            <Icon name="Crown" size={20} className="text-gaming-neon-cyan" />
            <span className="text-foreground font-medium">Premium подписка</span>
          </button>

          <button className="w-full bg-gaming-card border border-gaming-border rounded-xl p-4 hover:border-gaming-neon-pink transition-all text-left flex items-center gap-3">
            <Icon name="Sticker" size={20} className="text-gaming-neon-pink" />
            <span className="text-foreground font-medium">Мои стикеры</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full bg-gaming-card border border-destructive/50 rounded-xl p-4 hover:border-destructive transition-all text-left flex items-center gap-3"
          >
            <Icon name="LogOut" size={20} className="text-destructive" />
            <span className="text-destructive font-medium">Выйти</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
