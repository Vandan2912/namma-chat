// src/types/index.ts
export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: number;
  delivered: boolean;
  read: boolean;
}

export interface User {
  id: string;
  name: string;
  online: boolean;
}

export interface IChatInitialState {
  users: User[];
  messages: Message[];
  typingUsers: string[];
}

export const ChatInitialState: IChatInitialState = {
  users: [],
  messages: [],
  typingUsers: [],
};
