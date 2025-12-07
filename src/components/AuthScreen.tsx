import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface AuthScreenProps {
  onAuth: () => void;
}

const AuthScreen = ({ onAuth }: AuthScreenProps) => {
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 10) {
      onAuth();
    }
  };

  return (
    <div className="min-h-screen bg-gaming-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <div className="inline-block relative mb-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gaming-neon-purple to-gaming-neon-cyan flex items-center justify-center shadow-2xl animate-glow">
              <div className="w-16 h-16 rounded-xl bg-gaming-dark flex items-center justify-center">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gaming-neon-purple via-gaming-neon-pink to-gaming-neon-cyan"></div>
              </div>
            </div>
            <div className="absolute -top-2 -right-2 w-10 h-10 bg-gaming-neon-purple rounded-lg flex items-center justify-center shadow-xl">
              <span className="text-2xl font-heading font-bold text-white">R</span>
            </div>
          </div>
          
          <h1 className="text-4xl font-heading font-bold text-white mb-2">
            Добро пожаловать в <span className="text-gaming-neon-purple">Rilmas</span>
          </h1>
          <p className="text-muted-foreground">Игровой мессенджер для геймеров</p>
        </div>

        <div className="bg-gaming-card border border-gaming-border rounded-2xl p-6 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Номер телефона
              </label>
              <div className="relative">
                <Icon name="Phone" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  type="tel"
                  placeholder="+7 (999) 123-45-67"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-12 bg-gaming-darker border-gaming-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-gaming-neon-purple to-gaming-neon-cyan hover:opacity-90 text-white font-semibold h-12 rounded-xl shadow-lg"
              disabled={phone.length < 10}
            >
              Продолжить
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-gaming-border">
            <p className="text-xs text-muted-foreground text-center">
              Продолжая, вы принимаете условия использования и политику конфиденциальности
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Есть приглашение от друга?{' '}
            <button className="text-gaming-neon-cyan hover:underline font-medium">
              Ввести код
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
