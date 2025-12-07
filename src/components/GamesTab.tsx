import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { searchGames } from '@/utils/games';
import { Game } from '@/types';

const GamesTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [games, setGames] = useState<Game[]>(searchGames(''));

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setGames(searchGames(query));
  };

  return (
    <div className="p-4 space-y-4 animate-fade-in">
      <div className="relative">
        <Icon
          name="Search"
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          size={20}
        />
        <Input
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Поиск игр..."
          className="pl-12 bg-gaming-card border-gaming-border text-foreground"
        />
      </div>

      <div className="space-y-2">
        {games.map((game) => (
          <div
            key={game.id}
            className="bg-gaming-card border border-gaming-border rounded-xl p-4 hover:border-gaming-neon-purple transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gaming-neon-purple/20 rounded-xl flex items-center justify-center text-3xl">
                {game.icon}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate group-hover:text-gaming-neon-purple transition-colors">
                  {game.name}
                </h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{game.category}</span>
                  <span>•</span>
                  <span>{game.players}</span>
                </div>
              </div>

              <button className="p-2 bg-gradient-to-r from-gaming-neon-purple to-gaming-neon-cyan rounded-lg hover:opacity-90 transition-opacity">
                <Icon name="Play" size={16} className="text-white" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {games.length === 0 && (
        <div className="text-center py-16">
          <Icon name="Gamepad2" size={64} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Игры не найдены</p>
        </div>
      )}
    </div>
  );
};

export default GamesTab;
