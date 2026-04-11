import type { NextConfig } from "next";

import "./src/env";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // domains: [
    //   // "res.cloudinary.com",
    //   "https://res.cloudinary.com/dgbw2vj2s/image/upload/q_auto/f_auto/v1775803727/napaOne_dsrz7h.webp",
    // ],
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
