"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/header";
import ChatList from "@/components/chat-list";
import BottomNavigation from "@/components/bottom-navigation";
import { useTopBarColour } from "@/hooks/useTopBarColour";

export default function Home() {
  useTopBarColour("#ffffff");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <motion.div
      className="app-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.5 }}>
      {/* <Stories /> */}
      <ChatList />
    </motion.div>
  );
}
