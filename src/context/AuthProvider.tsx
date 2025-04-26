"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { axiosInstance } from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";

interface User {
  userId: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (accessToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const silentRefreshTimeout = 5 * 60 * 1000; // 5 minutes before expiry

  const decodeToken = (token: string) => {
    try {
      return jwt.decode(token) as { exp: number; userId: string } | null;
    } catch {
      return null;
    }
  };

  const scheduleSilentRefresh = (token: string) => {
    const decoded = decodeToken(token);
    if (!decoded?.exp) return;

    const expiresInMs = decoded.exp * 1000 - Date.now();
    const refreshTime = expiresInMs - silentRefreshTimeout;

    if (refreshTime > 0) {
      setTimeout(refreshToken, refreshTime);
    }
  };

  const refreshToken = async () => {
    try {
      const res = await axiosInstance.post("/auth/refresh-token");
      const { accessToken: newAccessToken } = res.data;

      if (newAccessToken) {
        Cookies.set("accessToken", newAccessToken, { secure: true, sameSite: "lax" });
        const newDecoded = decodeToken(newAccessToken);
        if (newDecoded) {
          setUser({ userId: newDecoded.userId });
          scheduleSilentRefresh(newAccessToken);
        }
      } else {
        logout();
      }
    } catch (error) {
      console.error("Token refresh error", error);
      logout();
    }
  };

  const fetchUser = async () => {
    const accessToken = Cookies.get("accessToken");
    if (!accessToken) {
      setLoading(false);
      return;
    }

    const decoded = decodeToken(accessToken);

    if (!decoded) {
      logout();
      return;
    }

    if (decoded.exp * 1000 < Date.now()) {
      await refreshToken();
    } else {
      setUser({ userId: decoded.userId });
      scheduleSilentRefresh(accessToken);
    }

    setLoading(false);
  };

  const login = (accessToken: string) => {
    Cookies.set("accessToken", accessToken, { secure: true, sameSite: "lax" });
    const decoded = decodeToken(accessToken);
    if (decoded) {
      setUser({ userId: decoded.userId });
      scheduleSilentRefresh(accessToken);
    }
  };

  const logout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setUser(null);
    router.push("/login");
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
