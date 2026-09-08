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

  // Browser caching for static assets (filenames are unhashed, so not immutable).
  // Skips /_next, whose filenames are hashed and already served as immutable.
  async headers() {
    return [
      {
        source:
          "/:path((?!_next/).*)\\.:ext(svg|webp|png|jpg|jpeg|gif|mp4|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
