import { User, Friend, Chat, Message } from '@/types';

const STORAGE_KEYS = {
  USER: 'rilmas_user',
  FRIENDS: 'rilmas_friends',
  CHATS: 'rilmas_chats',
  INVITE_LINKS: 'rilmas_invite_links',
};

export const storage = {
  getUser: (): User | null => {
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    return data ? JSON.parse(data) : null;
  },

  setUser: (user: User) => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  updateUser: (updates: Partial<User>) => {
    const user = storage.getUser();
    if (user) {
      const updated = { ...user, ...updates };
      storage.setUser(updated);
      return updated;
    }
    return null;
  },

  getFriends: (): Friend[] => {
    const data = localStorage.getItem(STORAGE_KEYS.FRIENDS);
    return data ? JSON.parse(data) : [];
  },

  setFriends: (friends: Friend[]) => {
    localStorage.setItem(STORAGE_KEYS.FRIENDS, JSON.stringify(friends));
  },

  addFriend: (friend: Friend) => {
    const friends = storage.getFriends();
    friends.push(friend);
    storage.setFriends(friends);
  },

  getChats: (): Record<string, Chat> => {
    const data = localStorage.getItem(STORAGE_KEYS.CHATS);
    return data ? JSON.parse(data) : {};
  },

  setChats: (chats: Record<string, Chat>) => {
    localStorage.setItem(STORAGE_KEYS.CHATS, JSON.stringify(chats));
  },

  addMessage: (friendId: string, message: Message) => {
    const chats = storage.getChats();
    if (!chats[friendId]) {
      chats[friendId] = { friendId, messages: [], unreadCount: 0 };
    }
    chats[friendId].messages.push(message);
    storage.setChats(chats);
  },

  markAsRead: (friendId: string) => {
    const chats = storage.getChats();
    if (chats[friendId]) {
      chats[friendId].unreadCount = 0;
      chats[friendId].messages.forEach(msg => msg.read = true);
      storage.setChats(chats);
    }
  },

  saveInviteLink: (userId: string, inviteCode: string) => {
    const links = storage.getInviteLinks();
    links[inviteCode] = userId;
    localStorage.setItem(STORAGE_KEYS.INVITE_LINKS, JSON.stringify(links));
  },

  getInviteLinks: (): Record<string, string> => {
    const data = localStorage.getItem(STORAGE_KEYS.INVITE_LINKS);
    return data ? JSON.parse(data) : {};
  },

  getUserByInviteCode: (code: string): string | null => {
    const links = storage.getInviteLinks();
    return links[code] || null;
  },
};
