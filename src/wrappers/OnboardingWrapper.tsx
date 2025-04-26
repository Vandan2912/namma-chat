"use client";

import OnboardingScreen from "@/components/onboarding/OnboardingScreen";
import { FC, ReactNode, useEffect, useState } from "react";

interface OnboardingWrapperProps {
  children: ReactNode;
}

const OnboardingWrapper: FC<OnboardingWrapperProps> = ({ children }) => {
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // Check if onboarding has been seen
    if (typeof window !== "undefined") {
      const hasSeen = localStorage.getItem("hasSeenOnboarding");
      setShowOnboarding(!hasSeen);
    }
  }, []);

  const handleFinishOnboarding = () => {
    localStorage.setItem("hasSeenOnboarding", "true");
    setShowOnboarding(false);
  };

  if (showOnboarding) {
    return <OnboardingScreen onFinish={handleFinishOnboarding} />;
  }

  return children;
};

export default OnboardingWrapper;
