import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import { axiosInstance } from "./axiosInstance";

interface JwtPayload {
  exp: number;
  userId: string;
}

export async function fetchUser() {
  const accessToken = Cookies.get("accessToken");

  if (!accessToken) {
    throw new Error("No access token");
  }

  let decoded: JwtPayload;
  try {
    decoded = jwt.decode(accessToken) as JwtPayload;
    if (!decoded) {
      throw new Error("Failed to decode token");
    }
  } catch (error) {
    console.error("Token decoding error", error);
    throw new Error("Invalid token");
  }

  const isExpired = decoded.exp * 1000 < Date.now();

  if (!isExpired) {
    return { userId: decoded.userId };
  }

  // Token expired, try to refresh
  try {
    const res = await axiosInstance.post("/auth/refresh-token");
    const { accessToken: newAccessToken } = res.data;

    if (newAccessToken) {
      Cookies.set("accessToken", newAccessToken, { secure: true, sameSite: "lax" });
      const newDecoded = jwt.decode(newAccessToken) as JwtPayload;
      return { userId: newDecoded.userId };
    } else {
      throw new Error("No new access token");
    }
  } catch (error) {
    console.error("Token refresh error", error);
    throw new Error("Refresh token failed");
  }
}

export async function logout() {
  try {
    await axiosInstance.post("/auth/logout");
  } catch (e) {
    console.error("Logout error", e);
  }
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  window.location.href = "/login";
}
