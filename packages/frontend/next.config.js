const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");

const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // react-toastify toast 두 번 렌더링되는 문제
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: `https://git-challenge.com/api/v1/:path*`,
      },
    ];
  },
};

module.exports = withVanillaExtract(nextConfig);
