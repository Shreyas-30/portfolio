import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project (a parent lockfile exists in
  // the home dir, which would otherwise be inferred as the root).
  turbopack: {
    root: __dirname,
  },
  images: {
    // Remote patterns are listed here so the loader can be swapped from
    // /public to a CDN (e.g. Cloudinary) later without touching components.
    remotePatterns: [],
  },
  async redirects() {
    return [
      {
        source: "/work/amtrak-rebooked",
        destination: "/work/amtrak",
        permanent: true,
      },
      {
        source: "/projects/:slug",
        destination: "/work/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
