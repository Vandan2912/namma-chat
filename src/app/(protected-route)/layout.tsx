"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";
import FullScreenLoader from "@/components/loader/FullScreenLoader";
import Header from "@/components/header";
import BottomNavigation from "@/components/bottom-navigation";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login"); // Redirect to login
    }
  }, [loading, user, router]);

  return (
    <>
      {(loading || !user) && <FullScreenLoader />}
      <Header />
      <main className="py-[60px]">{children}</main>
      <BottomNavigation />
    </>
  );
}
