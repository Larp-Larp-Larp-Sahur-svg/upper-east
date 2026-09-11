import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // The dev server is reached via 127.0.0.1 as well as localhost. Without this,
  // Next blocks the HMR socket as cross-origin and the page never hydrates.
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  devIndicators: false,
  images: {
    // Photos are set through the CMS, so any https host is allowed; uploads
    // are served from /public/uploads.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
