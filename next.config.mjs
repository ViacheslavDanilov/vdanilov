/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add trailing slashes to URLs for clean URLs
  trailingSlash: true,

  // Image optimization configuration
  images: {
    qualities: [100, 90, 75, 60, 50],
  },

  // Disable TypeScript type checking during build (using JSX)
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
