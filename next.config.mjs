/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add trailing slashes to URLs for clean URLs
  trailingSlash: true,

  // Disable TypeScript type checking during build (using JSX)
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
