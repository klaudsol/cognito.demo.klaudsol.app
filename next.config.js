/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    MY_AWS_ACCESS_KEY_ID: process.env.MY_AWS_ACCESS_KEY_ID,
    MY_AWS_ACCESS_SECRET: process.env.MY_AWS_ACCESS_SECRET,
    MY_AWS_REGION: process.env.MY_AWS_REGION,
    MY_AWS_USER_POOL_ID: process.env.MY_AWS_USER_POOL_ID
  }
}

module.exports = nextConfig
