// src/socket/handler.ts
import { addMessage, setMessages, setTyping, setUsers, updateMessage, updateUserStatus } from "@/store/chat-slice";
import { Message, User } from "@/store/chat-slice/module/initial-state";
import store from "@/store/store";
import { Socket } from "socket.io-client";

export const setupSocketHandlers = (socket: Socket) => {
  socket.on("receive-message", (message: Message) => {
    store.dispatch(addMessage(message));
  });

  socket.on("unread-messages", (messages: Message[]) => {
    store.dispatch(setMessages(messages));
  });

  socket.on("user-online", (userId: string) => {
    store.dispatch(updateUserStatus({ userId, online: true }));
  });

  socket.on("user-offline", (userId: string) => {
    store.dispatch(updateUserStatus({ userId, online: false }));
  });

  socket.on("typing", (userId: string) => {
    store.dispatch(setTyping({ userId, typing: true }));
  });

  socket.on("stop-typing", (userId: string) => {
    store.dispatch(setTyping({ userId, typing: false }));
  });

  socket.on("message-delivered", (data: { id: string }) => {
    store.dispatch(updateMessage({ id: data.id, delivered: true }));
  });

  socket.on("message-read", (data: { id: string }) => {
    store.dispatch(updateMessage({ id: data.id, read: true }));
  });

  socket.on("message-read-success", (data: { id: string }) => {
    store.dispatch(updateMessage({ id: data.id, read: true }));
  });
};
