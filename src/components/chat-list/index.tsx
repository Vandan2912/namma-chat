import React, { useState } from "react";
import ChatItem from "./chat-item";
import { IChatList } from "@/types/chat-list.interface";
import FullScreenLoader from "../loader/FullScreenLoader";

// const chatData = [
//   {
//     id: "1",
//     name: "Angel Curtis",
//     message: "Please help me find a good monitor for t...",
//     time: "02:11",
//     unreadCount: 2,
//     imageUrl:
//       "https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//   },
//   {
//     id: "2",
//     name: "Zaire Dorwart",
//     message: "✓ Gacor pisan kang",
//     time: "02:11",
//     imageUrl:
//       "https://images.pexels.com/photos/1267335/pexels-photo-1267335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//   },
//   {
//     id: "3",
//     name: "Kelas Malam",
//     message: "Bima : No one can come today?",
//     time: "02:11",
//     unreadCount: 2,
//     imageUrl:
//       "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//   },
//   {
//     id: "4",
//     name: "Jocelyn Gouse",
//     message: "You're now an admin",
//     time: "02:11",
//     imageUrl:
//       "https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//   },
//   {
//     id: "5",
//     name: "Jaylon Dias",
//     message: "✓ Buy back 10k gallons, top up credit, b...",
//     time: "02:11",
//     imageUrl:
//       "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//   },
//   {
//     id: "6",
//     name: "Chance Rhiel Madsen",
//     message: "Thank you mate!",
//     time: "02:11",
//     unreadCount: 2,
//     imageUrl:
//       "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//   },
//   {
//     id: "7",
//     name: "Livia Dias",
//     message: "Last message from Livia",
//     time: "02:11",
//     imageUrl:
//       "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//   },
//   {
//     id: "8",
//     name: "Jaylon Dias",
//     message: "✓ Buy back 10k gallons, top up credit, b...",
//     time: "02:11",
//     imageUrl:
//       "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//   },
//   {
//     id: "9",
//     name: "Chance Rhiel Madsen",
//     message: "Thank you mate!",
//     time: "02:11",
//     unreadCount: 2,
//     imageUrl:
//       "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//   },
//   {
//     id: "10",
//     name: "Livia Dias",
//     message: "Last message from Livia",
//     time: "02:11",
//     imageUrl:
//       "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//   },
// ];

export default function ChatList() {
  const [chatList, setChatList] = useState<IChatList[]>([]);
  const [loader, setLoader] = useState(false);

  return (
    <div className="flex-1 overflow-y-auto">
      {loader && <FullScreenLoader opacity={0.8} />}
      {chatList.map((chat, index) => (
        <ChatItem key={chat.id} {...chat} index={index} />
      ))}
    </div>
  );
}
