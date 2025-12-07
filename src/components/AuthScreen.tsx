import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface AuthScreenProps {
  onAuth: (userData: { phone: string; userId: string }) => void;
}

const AuthScreen = ({ onAuth }: AuthScreenProps) => {
  const [step, setStep] = useState<'phone' | 'code'>('phone');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState(['', '', '', '', '']);
  const [generatedCode, setGeneratedCode] = useState('');
  const { toast } = useToast();

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 10) {
      const randomCode = Math.floor(10000 + Math.random() * 90000).toString();
      setGeneratedCode(randomCode);
      setStep('code');
      
      toast({
        title: 'Код отправлен',
        description: `Код подтверждения: ${randomCode}`,
      });
    }
  };

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^[0-9]*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 4) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredCode = code.join('');
    
    if (enteredCode === generatedCode) {
      const userId = `user_${Date.now()}`;
      const userData = { phone, userId };
      
      localStorage.setItem('rilmas_user', JSON.stringify(userData));
      
      onAuth(userData);
      
      toast({
        title: 'Добро пожаловать!',
        description: 'Вы успешно вошли в Rilmas',
      });
    } else {
      toast({
        title: 'Неверный код',
        description: 'Проверьте введенный код и попробуйте снова',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    if (code.every(digit => digit !== '')) {
      handleCodeSubmit({ preventDefault: () => {} } as React.FormEvent);
    }
  }, [code]);

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
          {step === 'phone' ? (
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
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
          ) : (
            <form onSubmit={handleCodeSubmit} className="space-y-4">
              <div>
                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors"
                >
                  <Icon name="ChevronLeft" size={20} />
                  <span className="text-sm">Изменить номер</span>
                </button>
                
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Введите код из SMS
                </label>
                <p className="text-xs text-muted-foreground mb-4">
                  Мы отправили код на номер {phone}
                </p>
                
                <div className="flex gap-3 justify-center">
                  {code.map((digit, index) => (
                    <Input
                      key={index}
                      id={`code-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      className="w-14 h-14 text-center text-2xl font-bold bg-gaming-darker border-gaming-border text-foreground focus:border-gaming-neon-purple"
                    />
                  ))}
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-gaming-neon-purple to-gaming-neon-cyan hover:opacity-90 text-white font-semibold h-12 rounded-xl shadow-lg"
                disabled={code.some(digit => !digit)}
              >
                Подтвердить
              </Button>
              
              <button
                type="button"
                onClick={handlePhoneSubmit}
                className="w-full text-sm text-gaming-neon-cyan hover:underline font-medium"
              >
                Отправить код повторно
              </button>
            </form>
          )}

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