/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // This line
  reactStrictMode: true,
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
}

export default nextConfig
