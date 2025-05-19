import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface ChatItemProps {
  name: string;
  message: string;
  time: string;
  unreadCount?: number;
  imageUrl: string;
  index: number;
}

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

export default ChatItem;
