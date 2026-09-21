import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Premium furniture/interior photography for the storefront.
    // Swap these for your own CDN / uploaded assets later.
    remotePatterns: [new URL("https://images.unsplash.com/**")],
  },
};

export default nextConfig;
