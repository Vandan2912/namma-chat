/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Input } from "@/components/ui/input";
import Image from "next/image";

export function MobileInput({ value, onChange }: { value: string; onChange: (e: any) => void }) {
  // Function to handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow digits and limit to 10 characters
    const cleaned = e.target.value.replace(/\D/g, "").slice(0, 10);
    onChange(cleaned);
  };

  return (
    <div className="flex items-center w-full max-w-sm rounded-full border border-input bg-background ring-offset-background">
      <div className="flex items-center gap-1 px-3 py-3">
        {/* Indian Flag */}
        <Image src="/images/indianflag.svg" width={20} height={20} alt="Indian Flag" className="w-5 h-5 rounded-full" />
        <span className="text-sm font-medium">+91</span>
      </div>

      {/* Vertical divider */}
      <div className="w-px h-6 bg-border mx-1"></div>
      <Input
        type="tel"
        value={value}
        onChange={handleInputChange}
        pattern="\d{10}"
        inputMode="numeric"
        maxLength={10}
        placeholder="Phone number"
        className="!border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  );
}
