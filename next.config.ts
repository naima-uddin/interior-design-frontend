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
    ],
    // Next 16 requires the set of allowed quality values to be declared.
    // The hero uses 45 (blurred surround) and 100 (sharp window); 75 is default.
    qualities: [45, 75, 100],
  },
};

export default nextConfig;
