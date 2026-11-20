import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/itkannadigaru",
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
