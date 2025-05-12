"use client";

import { Home, Plus, User } from "lucide-react";
import { motion } from "framer-motion";

export default function BottomNavigation() {
  return (
    <motion.div
      className="h-[60px] fixed w-full bottom-0 z-10 border-t border-[#f5f5f5] bg-white flex items-center justify-between px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}>
      <div className="flex flex-col items-center justify-center">
        <Home size={24} />
      </div>
      <div className="bg-black text-white h-10 flex items-center justify-center rounded-[20px] px-5 font-medium">
        <Plus size={20} className="mr-2" /> New Chat
      </div>
      <div className="nav-button">
        <User size={24} />
      </div>
    </motion.div>
  );
}
