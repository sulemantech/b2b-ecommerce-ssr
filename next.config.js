/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'devcares.com',
          port: '',
        },
      ],
    },
  };
  
  module.exports = nextConfig;
  