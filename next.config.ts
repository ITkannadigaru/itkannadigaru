import type { NextConfig } from "next";

// Custom domain www.itkannadigaru.in serves from root — no basePath needed.
const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
