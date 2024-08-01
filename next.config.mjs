/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["lucide-react"],
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    domains: ["utfs.io"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
      },
    ],
  },
};

export default nextConfig;
