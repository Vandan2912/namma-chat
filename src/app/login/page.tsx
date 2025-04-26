"use client";

import OnboardingScreen from "@/components/onboarding/OnboardingScreen";
import { useTopBarColour } from "@/hooks/useTopBarColour";
import { useEffect, useState } from "react";

export default function LoginPage() {
  useTopBarColour("#FFFFFF");
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");

  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  async function requestOtp() {
    await fetch("/api/auth/request-otp", {
      method: "POST",
      body: JSON.stringify({ phoneNumber }),
      headers: { "Content-Type": "application/json" },
    });
    setStep(2);
  }

  async function verifyOtp() {
    const res = await fetch("/api/auth/verify-otp", {
      method: "POST",
      body: JSON.stringify({ phoneNumber, otp }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      window.location.href = "/dashboard";
    } else {
      alert("Invalid OTP");
    }
  }

  useEffect(() => {
    setIsMounted(true);
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
    return <OnboardingScreen onFinish={handleFinishOnboarding} />; // Prevent SSR mismatch
  }

  if (!isMounted) {
    return null; // Prevent SSR mismatch
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {step === 1 && (
        <>
          <input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter phone number"
            className="border p-2 mb-2"
          />
          <button onClick={requestOtp} className="bg-blue-500 text-white p-2 rounded">
            Send OTP
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="border p-2 mb-2"
          />
          <button onClick={verifyOtp} className="bg-green-500 text-white p-2 rounded">
            Verify OTP
          </button>
        </>
      )}
    </div>
  );
}
