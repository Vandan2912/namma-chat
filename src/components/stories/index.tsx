"use client";

import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

interface StoryProps {
  name: string;
  imageUrl: string;
  isAddStory?: boolean;
  index: number;
}

const storyData = [
  {
    name: "Add story",
    imageUrl: "",
    isAddStory: true,
  },
  {
    name: "Terry",
    imageUrl:
      "https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "Craig",
    imageUrl:
      "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "Roger",
    imageUrl:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "Nolan",
    imageUrl:
      "https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

const StoryItem = ({ name, imageUrl, isAddStory = false, index }: StoryProps) => {
  return (
    <motion.div
      className="story-item"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
    >
      {isAddStory ? (
        <div className="add-story-circle">
          <Plus color="#8E8E93" size={24} strokeWidth={1.5} />
        </div>
      ) : (
        <div className="story-circle">
          <Image src={imageUrl} alt={name} width={64} height={64} className="story-image" />
        </div>
      )}
      <p className="story-name">{name}</p>
    </motion.div>
  );
};

export default function Stories() {
  return (
    <div className="stories-container">
      <div className="stories-scroll">
        {storyData.map((story, index) => (
          <StoryItem
            key={index}
            name={story.name}
            imageUrl={story.imageUrl}
            isAddStory={story.isAddStory}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
