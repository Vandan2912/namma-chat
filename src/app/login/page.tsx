"use client";

import { AuthService } from "@/api/auth.service";
import { MobileInput } from "@/components/MobileInput";
import OnboardingScreen from "@/components/onboarding/OnboardingScreen";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { useTopBarColour } from "@/hooks/useTopBarColour";
import { axiosInstance } from "@/lib/axiosInstance";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function LoginPage() {
  useTopBarColour("#96498d");
  const route = useRouter();
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [loader, setLoader] = useState(false);

  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  async function requestOtp() {
    // validate number
    if (phoneNumber.length !== 10) {
      alert("Please enter a valid phone number");
      return;
    }

    setLoader(true);
    await AuthService.getOtp({ phone: phoneNumber })
      .then((res) => {
        if (res) {
          setStep(2);
        }
        setLoader(false);
      })
      .catch((err) => {
        console.error("error : ", err);
        setLoader(false);
      });
  }

  async function verifyOtp() {
    setLoader(true);
    await AuthService.verifyOtp({ phone: phoneNumber, otp })
      .then((res) => {
        if (res && res?.success === false) {
          if (res?.message) alert(res?.message);
          return;
        }
        if (res && res?.token) {
          setStep(2);
          Cookies.set("accessToken", res?.token);
          route.push("/");
        }
        setLoader(false);
      })
      .catch((err) => {
        console.error("error : ", err);
        setLoader(false);
      });
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
        }}>
        <div className="flex-1 flex justify-end items-center">
          <h2 className="text-5xl font-[900] my-10 mx-6 text-white">Welcome to Namma Chat 👋</h2>
        </div>

        <div className="bottom-0 rounded-t-3xl w-full flex-1 p-8 bg-white rounded-lg shadow-md">
          <div className="">
            {step === 1 && <h2 className="text-xl font-[900] mb-10">Enter your phone number</h2>}
            {step === 2 && <h2 className="text-xl font-[900] mb-10">Enter the OTP sent to your phone</h2>}
            {step === 1 && (
              <>
                <MobileInput value={phoneNumber} onChange={(e) => setPhoneNumber(e)} />
                <button
                  onClick={requestOtp}
                  className="bg-primary text-white w-full px-8 py-2 rounded-full mt-3"
                  disabled={loader}
                  style={{
                    width: "100%",
                    height: "50px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  {loader ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-3 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {loader ? "Sending..." : "Send OTP"}
                </button>
              </>
            )}
            {step === 2 && (
              <>
                <InputOTP
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS}
                  value={otp}
                  onChange={(value) => setOtp(value)}
                  containerClassName="!my-4">
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

                <button
                  onClick={verifyOtp}
                  className="bg-primary text-white px-8 py-4 rounded-full"
                  disabled={loader}
                  style={{
                    width: "100%",
                    height: "50px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  {loader ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-3 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {loader ? "Verifying..." : "Verify OTP"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
