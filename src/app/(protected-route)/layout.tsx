"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";
import FullScreenLoader from "@/components/loader/FullScreenLoader";
import Header from "@/components/header";
import BottomNavigation from "@/components/bottom-navigation";
import Cookies from "js-cookie";
import { useSocket } from "@/hooks/useSocket";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { db } from "@/lib/db";
import { setMessages, setUsers } from "@/store/chat-slice";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login"); // Redirect to login
    }
  }, [loading, user, router]);

  const accessToken = Cookies.get("accessToken");

  const token = `Bearer ${accessToken}` || "";
  useSocket(token);

  useEffect(() => {
    // On first load, populate local data
    db.users.toArray().then((users) => {
      if (users.length > 0) {
        dispatch(setUsers(users));
      }
    });
    db.messages.toArray().then((messages) => {
      if (messages.length > 0) {
        dispatch(setMessages(messages));
      }
    });
  }, []);

  return (
    <>
      {(loading || !user) && <FullScreenLoader />}
      <Header />
      <main className="py-[60px]">{children}</main>
      <BottomNavigation />
    </>
  );
}
