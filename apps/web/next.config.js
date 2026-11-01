/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/sitemaps.xml",
        destination: "/sitemap.xml",
      },
    ];
  },
};

export default nextConfig;
