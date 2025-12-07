const SplashScreen = () => {
  return (
    <div className="fixed inset-0 bg-gaming-darker flex items-center justify-center overflow-hidden">
      <div className="relative">
        <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-gaming-neon-purple to-gaming-neon-cyan animate-splash-logo flex items-center justify-center shadow-2xl">
          <div className="w-24 h-24 rounded-2xl bg-gaming-dark flex items-center justify-center">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-gaming-neon-purple via-gaming-neon-pink to-gaming-neon-cyan"></div>
          </div>
        </div>
        
        <div className="absolute -top-4 -right-4 w-20 h-20 bg-gaming-neon-purple rounded-2xl flex items-center justify-center animate-splash-r shadow-xl">
          <span className="text-5xl font-heading font-bold text-white">R</span>
        </div>
      </div>
      
      <div className="absolute bottom-16">
        <div className="flex gap-2">
          <div className="w-2 h-2 bg-gaming-neon-purple rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-gaming-neon-cyan rounded-full animate-pulse delay-150"></div>
          <div className="w-2 h-2 bg-gaming-neon-pink rounded-full animate-pulse delay-300"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
