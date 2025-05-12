"use client";

import { Search } from "lucide-react";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.div
      className="header fixed w-full !pt-3 bg-white z-10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}>
      <div className="header-content">
        <h1 className="app-title">Namma Chat</h1>
        <Search size={24} />
      </div>
    </motion.div>
  );
}
