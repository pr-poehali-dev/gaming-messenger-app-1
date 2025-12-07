export interface User {
  phone: string;
  userId: string;
  username?: string;
  avatar?: string;
  coverImage?: string;
}

export interface Friend {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
  online: boolean;
  lastSeen?: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: number;
  read: boolean;
}

export interface Chat {
  friendId: string;
  messages: Message[];
  unreadCount: number;
}

export interface Game {
  id: string;
  name: string;
  icon: string;
  category: string;
  players: string;
}
