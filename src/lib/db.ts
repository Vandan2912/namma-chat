// src/lib/db.ts
import { Message, User } from "@/store/chat-slice/module/initial-state";
import Dexie, { Table } from "dexie";

export class ChatDB extends Dexie {
  messages!: Table<Message, string>;
  users!: Table<User, string>;

  constructor() {
    super("chatDB");
    this.version(1).stores({
      messages: "id, senderId, receiverId, timestamp, delivered, read",
      users: "id, name, online",
    });
  }
}

export const db = new ChatDB();
