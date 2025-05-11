"use client";

import { Home, Plus, User } from "lucide-react";
import { motion } from "framer-motion";

export default function BottomNavigation() {
  return (
    <motion.div
      className="bottom-nav"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
    >
      <div className="nav-button">
        <Home size={24} />
      </div>
      <div className="new-chat-button">
        <Plus size={20} className="mr-2" /> New Chat
      </div>
      <div className="nav-button">
        <User size={24} />
      </div>
    </motion.div>
  );
}
