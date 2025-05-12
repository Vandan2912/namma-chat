import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface ChatItemProps {
  id: string;
  name: string;
  message: string;
  time: string;
  unreadCount?: number;
  imageUrl: string;
  index: number;
}

const chatData = [
  {
    id: "1",
    name: "Angel Curtis",
    message: "Please help me find a good monitor for t...",
    time: "02:11",
    unreadCount: 2,
    imageUrl:
      "https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "2",
    name: "Zaire Dorwart",
    message: "✓ Gacor pisan kang",
    time: "02:11",
    imageUrl:
      "https://images.pexels.com/photos/1267335/pexels-photo-1267335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "3",
    name: "Kelas Malam",
    message: "Bima : No one can come today?",
    time: "02:11",
    unreadCount: 2,
    imageUrl:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "4",
    name: "Jocelyn Gouse",
    message: "You're now an admin",
    time: "02:11",
    imageUrl:
      "https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "5",
    name: "Jaylon Dias",
    message: "✓ Buy back 10k gallons, top up credit, b...",
    time: "02:11",
    imageUrl:
      "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "6",
    name: "Chance Rhiel Madsen",
    message: "Thank you mate!",
    time: "02:11",
    unreadCount: 2,
    imageUrl:
      "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "7",
    name: "Livia Dias",
    message: "Last message from Livia",
    time: "02:11",
    imageUrl:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "8",
    name: "Jaylon Dias",
    message: "✓ Buy back 10k gallons, top up credit, b...",
    time: "02:11",
    imageUrl:
      "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "9",
    name: "Chance Rhiel Madsen",
    message: "Thank you mate!",
    time: "02:11",
    unreadCount: 2,
    imageUrl:
      "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "10",
    name: "Livia Dias",
    message: "Last message from Livia",
    time: "02:11",
    imageUrl:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

const ChatItem = ({ name, message, time, unreadCount, imageUrl, index }: ChatItemProps) => {
  return (
    <motion.div
      className="flex py-3 px-4 items-center relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}>
      <div className="w-[56px] h-[56px] rounded-full mr-3 overflow-hidden flex-shrink-0">
        <Image src={imageUrl} alt={name} width={56} height={56} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 border-b border-[#f5f5f5] pb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-base font-semibold">{name}</span>
          <span className="text-[#8e8e93] text-sm">{time}</span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-[#8e8e93] text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">{message}</p>
          {unreadCount && (
            <div className="bg-primary text-white text-xs font-medium w-6 h-6 rounded-full flex justify-center items-center ml-2">
              {unreadCount}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default function ChatList() {
  return (
    <div className="flex-1 overflow-y-auto">
      {chatData.map((chat, index) => (
        <ChatItem key={chat.id} {...chat} index={index} />
      ))}
    </div>
  );
}
