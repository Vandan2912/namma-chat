import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;

  const publicPaths = ["/login", "/register", "/forgot-password"];

  const pathIsPublic = publicPaths.some((path) => request.nextUrl.pathname.startsWith(path));

  if (pathIsPublic && accessToken) {
    try {
      const decoded = jwt.decode(accessToken) as { exp: number } | null;

      if (decoded && decoded.exp * 1000 > Date.now()) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch (err) {
      // if invalid token, do nothing → allow them to login
      console.error("Token decoding error", err);
      // return NextResponse.redirect(new URL("/login", request.url));
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

// Tell Next which paths to match
export const config = {
  matcher: ["/login", "/register", "/forgot-password"],
};
