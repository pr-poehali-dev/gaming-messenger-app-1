import { Game } from '@/types';

export const GAMES_DATABASE: Game[] = [
  { id: '1', name: 'Roblox', icon: '🎮', category: 'Sandbox', players: '200M+' },
  { id: '2', name: 'Minecraft', icon: '⛏️', category: 'Sandbox', players: '150M+' },
  { id: '3', name: 'Fortnite', icon: '🔫', category: 'Battle Royale', players: '80M+' },
  { id: '4', name: 'Valorant', icon: '🎯', category: 'FPS', players: '20M+' },
  { id: '5', name: 'CS:GO', icon: '💣', category: 'FPS', players: '30M+' },
  { id: '6', name: 'Dota 2', icon: '⚔️', category: 'MOBA', players: '12M+' },
  { id: '7', name: 'League of Legends', icon: '🏆', category: 'MOBA', players: '150M+' },
  { id: '8', name: 'Apex Legends', icon: '🚀', category: 'Battle Royale', players: '15M+' },
  { id: '9', name: 'Overwatch 2', icon: '🎪', category: 'FPS', players: '25M+' },
  { id: '10', name: 'PUBG', icon: '🪂', category: 'Battle Royale', players: '30M+' },
  { id: '11', name: 'Among Us', icon: '👾', category: 'Social', players: '10M+' },
  { id: '12', name: 'Fall Guys', icon: '🎉', category: 'Party', players: '8M+' },
  { id: '13', name: 'Genshin Impact', icon: '⚡', category: 'RPG', players: '60M+' },
  { id: '14', name: 'Rocket League', icon: '🚗', category: 'Sports', players: '15M+' },
  { id: '15', name: 'Dead by Daylight', icon: '🔦', category: 'Horror', players: '5M+' },
  { id: '16', name: 'Rainbow Six Siege', icon: '🏢', category: 'FPS', players: '12M+' },
  { id: '17', name: 'World of Warcraft', icon: '🐉', category: 'MMORPG', players: '5M+' },
  { id: '18', name: 'GTA Online', icon: '🚓', category: 'Action', players: '40M+' },
  { id: '19', name: 'Rust', icon: '🔨', category: 'Survival', players: '3M+' },
  { id: '20', name: 'Terraria', icon: '🌍', category: 'Sandbox', players: '8M+' },
  { id: '21', name: 'Stardew Valley', icon: '🌾', category: 'Simulation', players: '5M+' },
  { id: '22', name: 'Phasmophobia', icon: '👻', category: 'Horror', players: '2M+' },
  { id: '23', name: 'The Forest', icon: '🌲', category: 'Survival', players: '1M+' },
  { id: '24', name: 'Warframe', icon: '🤖', category: 'Action', players: '10M+' },
  { id: '25', name: 'Destiny 2', icon: '🌌', category: 'FPS', players: '8M+' },
];

export const searchGames = (query: string): Game[] => {
  if (!query.trim()) return GAMES_DATABASE;
  
  const lowercaseQuery = query.toLowerCase();
  return GAMES_DATABASE.filter(game =>
    game.name.toLowerCase().includes(lowercaseQuery) ||
    game.category.toLowerCase().includes(lowercaseQuery)
  );
};
