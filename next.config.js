/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true
      }
    ];
  },
  exportPathMap: () => {
    return {
      "/": { page: "/home" }
    };
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com"
      },
      {
        protocol: "https",
        hostname: "static-cdn.jtvnw.net"
      }
    ]
  }
};

module.exports = nextConfig;
