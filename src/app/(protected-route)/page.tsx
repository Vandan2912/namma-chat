"use client";

import "@/styles/home.css";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/header";
import ChatList from "@/components/chat-list";
import BottomNavigation from "@/components/bottom-navigation";
import { useTopBarColour } from "@/hooks/useTopBarColour";

export default function Home() {
  useTopBarColour("#fffffff");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <motion.div
      className="app-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      {/* <Stories /> */}
      <ChatList />
      <BottomNavigation />
      <div className="home-indicator w-1/3 h-1 mx-auto bg-gray-800 rounded-full absolute bottom-1 left-0 right-0"></div>
    </motion.div>
  );
}
