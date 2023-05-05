/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [{
      hostname: 'avatars.githubusercontent.com',
      protocol: 'https',
    }]
  }
}

module.exports = nextConfig
