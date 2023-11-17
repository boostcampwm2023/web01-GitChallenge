const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");

const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // react-toastify toast 두 번 렌더링되는 문제
};

module.exports = withVanillaExtract(nextConfig);
