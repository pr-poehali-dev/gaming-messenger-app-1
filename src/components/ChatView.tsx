import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Friend, Message } from '@/types';
import { storage } from '@/utils/storage';

interface ChatViewProps {
  friend: Friend;
  currentUserId: string;
  onBack: () => void;
}

const ChatView = ({ friend, currentUserId, onBack }: ChatViewProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chats = storage.getChats();
    const chat = chats[friend.id];
    if (chat) {
      setMessages(chat.messages);
      storage.markAsRead(friend.id);
    }
  }, [friend.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: `msg_${Date.now()}`,
      senderId: currentUserId,
      text: newMessage,
      timestamp: Date.now(),
      read: false,
    };

    storage.addMessage(friend.id, message);
    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-full bg-gaming-dark">
      <div className="bg-gaming-card border-b border-gaming-border p-4 flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gaming-darker rounded-lg transition-colors"
        >
          <Icon name="ArrowLeft" size={20} className="text-foreground" />
        </button>

        <div className="relative">
          <Avatar className="w-10 h-10 border-2 border-gaming-neon-purple/30">
            <AvatarImage src={friend.avatar} />
            <AvatarFallback className="bg-gaming-neon-purple text-white font-semibold">
              {friend.name[0]}
            </AvatarFallback>
          </Avatar>
          {friend.online && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-gaming-neon-green rounded-full border-2 border-gaming-card"></div>
          )}
        </div>

        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{friend.name}</h3>
          <p className="text-xs text-muted-foreground">
            {friend.online ? 'В сети' : `Был(а) ${friend.lastSeen}`}
          </p>
        </div>

        <button className="p-2 hover:bg-gaming-darker rounded-lg transition-colors">
          <Icon name="Phone" size={20} className="text-muted-foreground" />
        </button>
        <button className="p-2 hover:bg-gaming-darker rounded-lg transition-colors">
          <Icon name="Video" size={20} className="text-muted-foreground" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">Начните общение с {friend.name}</p>
          </div>
        ) : (
          messages.map((message) => {
            const isOwn = message.senderId === currentUserId;
            return (
              <div
                key={message.id}
                className={`flex ${isOwn ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                    isOwn
                      ? 'bg-gradient-to-r from-gaming-neon-purple to-gaming-neon-cyan text-white'
                      : 'bg-gaming-card border border-gaming-border text-foreground'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      isOwn ? 'text-white/70' : 'text-muted-foreground'
                    }`}
                  >
                    {new Date(message.timestamp).toLocaleTimeString('ru-RU', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-gaming-card border-t border-gaming-border p-4">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <button
            type="button"
            className="p-3 hover:bg-gaming-darker rounded-xl transition-colors"
          >
            <Icon name="Paperclip" size={20} className="text-muted-foreground" />
          </button>
          <button
            type="button"
            className="p-3 hover:bg-gaming-darker rounded-xl transition-colors"
          >
            <Icon name="Smile" size={20} className="text-muted-foreground" />
          </button>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Введите сообщение..."
            className="flex-1 bg-gaming-darker border-gaming-border text-foreground"
          />
          <Button
            type="submit"
            disabled={!newMessage.trim()}
            className="bg-gradient-to-r from-gaming-neon-purple to-gaming-neon-cyan hover:opacity-90 text-white px-6"
          >
            <Icon name="Send" size={20} />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatView;
