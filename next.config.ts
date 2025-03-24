import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    DATA_TAXI_URL: process.env.DATA_TAXI_URL,
    DATA_KEY: process.env.DATA_KEY,
  },
};

export default nextConfig;
