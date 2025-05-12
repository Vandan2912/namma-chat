import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  images: {
    domains: [
      "images.pexels.com",
      "cdn.pixabay.com",
      "images.unsplash.com",
      "i.pinimg.com",
      "cdn.discordapp.com",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
