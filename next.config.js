/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["ssl.pstatic.net"]
  }
}

module.exports = nextConfig
