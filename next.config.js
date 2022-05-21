/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  images: {
    domains: ['http://localhost:3000/api/products'],
  },
}

module.exports = nextConfig
