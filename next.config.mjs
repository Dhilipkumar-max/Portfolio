const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Only apply basePath in production (GitHub Pages)
  basePath: isProd ? '/Portfolio' : '',
  // Ensure images work without a server
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
}

export default nextConfig
