/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  compress: true,

  images: {
    unoptimized: true, // 🚫 Disable Next.js image processing
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
  },

  output: "standalone",

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "origin-when-cross-origin" },
        ],
      },
    ];
  },

  sassOptions: {
    silenceDeprecations: [
      "legacy-js-api",
      "mixed-decls",
      "color-functions",
      "import",
      "global-builtin",
    ],
  },

  experimental: {
    workerThreads: false,
    cpus: 1,
  },
};

module.exports = nextConfig;
