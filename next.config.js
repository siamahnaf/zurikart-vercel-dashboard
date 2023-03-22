/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["dtlbyhsvr7rjb.cloudfront.net", "lh3.googleusercontent.com", "platform-lookaside.fbsbx.com"]
  }
}

module.exports = nextConfig
