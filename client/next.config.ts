import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/image/**",
      },
    ],
  },
  env: {
    customKey: "novaraTo",
    local: "http://localhost:5000/api",
    img: "http://localhost:5000",
  },
};

export default nextConfig;
