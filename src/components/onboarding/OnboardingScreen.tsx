"use client";
import { AppDispatch } from "@/store/store";
import { updateThemeReducer } from "@/store/theme-slice";
import { OnboardingSlide } from "@/types/onboarding";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaLock } from "react-icons/fa";
import { GiSoundWaves } from "react-icons/gi";
import { IoCloudDoneSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";

const slides: OnboardingSlide[] = [
  {
    id: 1,
    title: "Cloud based messaging",
    description:
      "All your conversations and files are securely stored in the cloud, which means you can access them from any device, anytime, anywhere.",
    image: "images/onboarding/1.svg",
    icon: "IoCloudDoneSharp",
  },
  {
    id: 2,
    title: "Seamless Experience",
    description:
      "Stay connected with your loved ones no matter where you are in the world. You can even make group calls with up to 10 people at once.",
    image: "images/onboarding/2.svg",
    icon: "GiSoundWaves",
  },
  {
    id: 3,
    title: "Stay Connected",
    description:
      "We prioritize your privacy and safety.\nEnsuring only you and the recipient can read your messages. We don't access or store any of your data, so you can chat with peace.",
    image: "images/onboarding/3.svg",
    icon: "FaLock",
  },
];

const OnboardingScreen = ({ onFinish }: { onFinish: () => void }) => {
  const [step, setStep] = useState(1);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(updateThemeReducer("#E2E5E6"));
  }, [dispatch]);

  return (
    <div className="bg-[#E2E5E6] font-noto">
      <div className="flex justify-end items-center mr-6">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${step === index + 1 ? "bg-blue-500" : "bg-gray-300"} mx-1`}
          ></div>
        ))}
      </div>

      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-5xl font-[900] mb-10 mx-6">{slides[step - 1].title}</h2>
        <div className="relative w-full h-full flex justify-center items-center mb-4">
          <Image src={slides[step - 1].image} alt={slides[step - 1].title} className="w-1/2 mb-4" layout="fill" />
          <div className="absolute -top-5 right-6 w-8 h-8 p-12 flex justify-center items-center bg-white rounded-full shadow-md">
            {slides[step - 1].icon === "IoCloudDoneSharp" ? (
              <IoCloudDoneSharp className="text-3xl shrink-0 text-primary" />
            ) : slides[step - 1].icon === "GiSoundWaves" ? (
              <GiSoundWaves className="text-3xl shrink-0 text-primary" />
            ) : slides[step - 1].icon === "FaLock" ? (
              <FaLock className="text-3xl shrink-0 text-primary" />
            ) : null}
          </div>
        </div>
        <div className="fixed bottom-0 rounded-t-3xl w-full p-8 bg-white rounded-lg shadow-md">
          <p className="text-center mb-4 font-noto text-sm text-gray-500">{slides[step - 1].description}</p>
          <hr className="text-gray-200 my-5" />
          <div className="flex justify-between items-center">
            <button
              onClick={() => {
                onFinish();
              }}
              className="text-gray-600 px-4 py-2 rounded mr-2"
            >
              Skip
            </button>
            <button
              onClick={() => {
                if (step === slides.length) {
                  onFinish();
                } else {
                  setStep(step + 1);
                }
              }}
              className="bg-primary text-white px-8 py-4 rounded-full"
            >
              {step === slides.length ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingScreen;
