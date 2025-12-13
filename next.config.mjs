/** @type {import('next').NextConfig} */

// Check if deploying to Vercel
const isVercel = process.env.VERCEL === "1";

const nextConfig = {
  // Enable static site generation for GitHub Pages only
  ...(isVercel ? {} : { output: "export" }),

  // Base path for GitHub Pages deployment (repository name)
  // For Vercel, no basePath needed
  basePath: isVercel
    ? ""
    : process.env.NEXT_PUBLIC_BASE_PATH ||
      (process.env.GITHUB_ACTIONS ? "/vdanilov" : ""),

  // Make basePath available to the app at runtime
  env: {
    NEXT_PUBLIC_BASE_PATH: isVercel
      ? ""
      : process.env.NEXT_PUBLIC_BASE_PATH ||
        (process.env.GITHUB_ACTIONS ? "/vdanilov" : ""),
  },

  // Image optimization: enabled on Vercel, disabled for static export
  images: {
    unoptimized: !isVercel,
  },

  // Add trailing slashes to URLs for compatibility
  trailingSlash: true,

  // Disable TypeScript type checking during build (using JSX)
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
