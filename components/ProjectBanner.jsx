"use client";

import Image from "next/image";

/**
 * ProjectBanner - A hero-style banner for portfolio project pages
 *
 * Displays the project preview image at the top of the page with a rounded card aesthetic.
 *
 * @param {Object} props
 * @param {string} props.image - Path to the preview image
 * @param {string} props.alt - Alt text for the image
 * @param {string} [props.aspectRatio="16/9"] - Aspect ratio for the banner
 */
const ProjectBanner = ({ image, alt, aspectRatio = "40/21" }) => {
  return (
    <div className="mb-8">
      <div
        className="relative w-full overflow-hidden rounded-2xl border border-white/10 
                   shadow-lg shadow-accent/5"
        style={{ aspectRatio }}
      >
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 896px"
          className="object-cover"
          priority
        />
        {/* Subtle gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark/30 via-transparent to-transparent pointer-events-none" />
      </div>
    </div>
  );
};

export default ProjectBanner;
