/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static site generation for GitHub Pages
  output: "export",

  // Base path for GitHub Pages deployment (repository name)
  // Only applied in production
  basePath: process.env.NODE_ENV === "production" ? "/vdanilov" : "",

  // Disable Image Optimization API (required for static export)
  images: {
    unoptimized: true,
  },

  // Add trailing slashes to URLs for compatibility
  trailingSlash: true,

  // Disable TypeScript type checking during build (using JSX)
  typescript: {
    ignoreBuildErrors: true,
  },

  // Disable ESLint during build (handled separately)
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
