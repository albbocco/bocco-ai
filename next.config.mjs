/** @type {import('next').NextConfig} */
const nextConfig = {
  // Server mode for Vercel (API routes + static pages)
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
