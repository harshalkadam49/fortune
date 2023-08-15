/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");
const nextConfig = {
  swcMinify: true,
  reactStrictMode: false,
  devIndicators: {
    buildActivity: false,
  }
};

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    swSrc: 'service-worker.js'
  },
});

module.exports = nextConfig;




