import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Premium furniture/interior photography for the storefront.
    // Swap these for your own CDN / uploaded assets later.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
    // Serve every image exactly as uploaded — no re-encoding, no resizing,
    // no quality change in either direction. Next's built-in optimizer always
    // re-compresses (even at quality:100 it's a lossy re-encode), which is
    // not what a photography-led interior site wants. Cloudinary already
    // stores uploads at their original quality, so this guarantees pixel-for-
    // pixel identical delivery. Trade-off: no automatic responsive srcset,
    // so the full asset downloads regardless of the rendered size — upload
    // sensibly-sized images.
    unoptimized: true,
  },
};

export default nextConfig;
