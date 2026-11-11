/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: false,
  partialPrefetching: false,

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.API_ORIGIN}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;