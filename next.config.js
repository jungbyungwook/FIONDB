/** @type {import('next').NextConfig} */

const webpack = (config) => {
  config.module.rules.push({
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  });

  return config;
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  reactStrictMode: true,
  // swcMinify: true,
  images: {
    domains: ['ssl.nexon.com', 'fo4.dn.nexoncdn.co.kr'],
  },
  webpack,
};

module.exports = withBundleAnalyzer({});
module.exports = nextConfig;
