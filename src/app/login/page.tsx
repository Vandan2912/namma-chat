"use client";

import { MobileInput } from "@/components/MobileInput";
import OnboardingScreen from "@/components/onboarding/OnboardingScreen";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { useTopBarColour } from "@/hooks/useTopBarColour";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useEffect, useState } from "react";

export default function LoginPage() {
  useTopBarColour("#96498d");
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");

  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  async function requestOtp() {
    // validate number
    if (phoneNumber.length !== 10) {
      alert("Please enter a valid phone number");
      return;
    }

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
    <div className="bg-[#E2E5E6] font-noto">
      <div
        className="flex flex-col items-center h-screen"
        style={{
          backgroundImage: "url('/images/login/background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex-1 flex justify-end items-center">
          <h2 className="text-5xl font-[900] my-10 mx-6 text-white">Welcome to Namma Chat 👋</h2>
        </div>

        <div className="bottom-0 rounded-t-3xl w-full flex-1 p-8 bg-white rounded-lg shadow-md">
          <div className="">
            <h2 className="text-xl font-[900] mb-10">Enter your phone number</h2>
            {step === 1 && (
              <>
                <MobileInput value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                <button onClick={requestOtp} className="bg-primary text-white w-full px-8 py-2 rounded-full mt-3">
                  Send OTP
                </button>
              </>
            )}
            {step === 2 && (
              <>
                <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} value={otp} onChange={(value) => setOtp(value)}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>

                <button onClick={verifyOtp} className="bg-primary text-white px-8 py-4 rounded-full">
                  Verify OTP
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
