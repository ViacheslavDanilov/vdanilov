/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static site generation for GitHub Pages
  output: "export",

  // Base path for GitHub Pages deployment (repository name)
  // Only applied when GITHUB_ACTIONS environment variable is set
  basePath: process.env.GITHUB_ACTIONS ? "/vdanilov" : "",

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
