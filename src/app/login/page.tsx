"use client";

import { AuthService } from "@/api/auth.service";
import { MobileInput } from "@/components/MobileInput";
import OnboardingScreen from "@/components/onboarding/OnboardingScreen";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { useTopBarColour } from "@/hooks/useTopBarColour";
import { axiosInstance } from "@/lib/axiosInstance";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthProvider";

export default function LoginPage() {
  useTopBarColour("#96498d");
  const route = useRouter();
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [loader, setLoader] = useState(false);
  const [timer, setTimer] = useState(30);
  const [resendDisabled, setResendDisabled] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const { login } = useAuth();

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
          login(res?.token);
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

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current as NodeJS.Timeout);
          }
          setResendDisabled(false);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current !== null) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current as NodeJS.Timeout);
        }
      }
    };
  }, []);

  const handleResend = () => {
    if (!resendDisabled) {
      requestOtp();
      setTimer(30);
      setResendDisabled(true);
      intervalRef.current = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current as NodeJS.Timeout);
            }
            setResendDisabled(false);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
  };

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
                  }}
                >
                  {loader ? <Loader2 className="animate-spin mr-2" /> : ""}
                  {loader ? "Sending..." : "Send OTP"}
                </button>
              </>
            )}
            {step === 2 && (
              <>
                {/* phone number display with wrong number ?  */}
                <div className="text-sm text-gray-500 mb-4 text-center">
                  <span className="font-bold">+91 {phoneNumber}</span>.{" "}
                  <button onClick={() => setStep(1)} className="text-sm text-primary">
                    Wrong number?
                  </button>
                </div>
                <InputOTP
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS}
                  value={otp}
                  onChange={(value) => setOtp(value)}
                  containerClassName="!my-4 !flex !justify-center !items-center"
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="h-12 w-12" />
                    <InputOTPSlot index={1} className="h-12 w-12" />
                    <InputOTPSlot index={2} className="h-12 w-12" />
                    <InputOTPSlot index={3} className="h-12 w-12" />
                    <InputOTPSlot index={4} className="h-12 w-12" />
                    <InputOTPSlot index={5} className="h-12 w-12" />
                  </InputOTPGroup>
                </InputOTP>

                {/* resend with timer of 30sec */}
                <div className="text-sm text-gray-500 mb-4 text-center">
                  {resendDisabled ? (
                    <p>Resend OTP in {timer} seconds</p>
                  ) : (
                    <>
                      Didn&apos;t receive the OTP?{" "}
                      <button onClick={handleResend} className="text-sm text-primary" disabled={loader}>
                        Resend OTP
                      </button>
                    </>
                  )}
                </div>

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
                  }}
                >
                  {loader ? <Loader2 className="animate-spin mr-2" /> : ""}
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
