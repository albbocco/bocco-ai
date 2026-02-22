/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.cloudflarestorage.com',
        pathname: '/**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://bocco.org',
  },
}

module.exports = nextConfig
