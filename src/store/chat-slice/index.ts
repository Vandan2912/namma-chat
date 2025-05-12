import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatInitialState } from "./module/initial-state";

const chatSlice = createSlice({
  name: "chatSlice",
  initialState: ChatInitialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    updateMessage: (state, action) => {
      const index = state.messages.findIndex((msg) => msg.id === action.payload.id);
      if (index !== -1) {
        state.messages[index] = action.payload;
      }
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setTyping: (state, action) => {
      const { userId, typing } = action.payload;
      if (typing) {
        state.typingUsers.push(userId);
      } else {
        state.typingUsers = state.typingUsers.filter((id) => id !== userId);
      }
    },
    stopTyping: (state, action) => {
      const userId = action.payload;
      state.typingUsers = state.typingUsers.filter((id) => id !== userId);
    },
    updateUserStatus: (state, action: PayloadAction<{ userId: string; online: boolean }>) => {
      const user = state.users.find((u) => u.id === action.payload.userId);
      if (user) user.online = action.payload.online;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    markAsDelivered: (state, action: PayloadAction<string>) => {
      const msg = state.messages.find((m) => m.id === action.payload);
      if (msg) msg.delivered = true;
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const msg = state.messages.find((m) => m.id === action.payload);
      if (msg) msg.read = true;
    },
  },
});

export const {
  addUser,
  setMessages,
  setTyping,
  setUsers,
  updateMessage,
  addMessage,
  markAsDelivered,
  markAsRead,
  updateUserStatus,
  stopTyping,
} = chatSlice.actions;
export default chatSlice.reducer;
