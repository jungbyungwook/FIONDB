/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['ssl.nexon.com'],
  },
};

module.exports = nextConfig;
