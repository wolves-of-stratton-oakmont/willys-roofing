import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // All site imagery is downloaded by Beacon into /public/images/** and
    // referenced as local string paths (e.g. "/images/hero/main.jpg").
    // No remotePatterns are needed because we never optimise remote URLs.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
