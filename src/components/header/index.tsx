"use client";

import { Search } from "lucide-react";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.div
      className="px-4 pb-2 fixed w-full !pt-3 bg-white z-10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}>
      <div className="flex items-center justify-between">
        <h1 className="text-[26px] font-semibold">Namma Chat</h1>
        <Search size={24} />
      </div>
    </motion.div>
  );
}
