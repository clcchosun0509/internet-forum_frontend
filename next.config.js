/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["ssl.pstatic.net"]
  }
}

module.exports = nextConfig
