"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";
import FullScreenLoader from "@/components/loader/FullScreenLoader";

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
      {(loading || !user || true) && <FullScreenLoader />}
      {children}
    </>
  );
}
