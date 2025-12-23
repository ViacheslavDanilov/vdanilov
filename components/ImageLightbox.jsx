"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faExpand } from "@fortawesome/free-solid-svg-icons";

/**
 * Clickable image component with lightbox/zoom functionality
 * @param {Object} props
 * @param {string} props.src - Image source path
 * @param {string} props.alt - Alt text for the image
 * @param {string} [props.aspectRatio="16/9"] - Aspect ratio class (e.g., "16/9", "4/3", "1/1")
 * @param {string} [props.className] - Additional container classes
 */
export default function ImageLightbox({
  src,
  alt,
  aspectRatio = "16/9",
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Thumbnail */}
      <div
        className={`relative aspect-[${aspectRatio}] rounded-xl overflow-hidden border border-white/10 cursor-zoom-in group ${className}`}
        onClick={() => setIsOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setIsOpen(true)}
        aria-label={`View ${alt} in full size`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain bg-black/20"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-12 h-12 rounded-full bg-accent/80 flex items-center justify-center">
              <FontAwesomeIcon icon={faExpand} className="w-5 h-5 text-light" />
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            onClick={() => setIsOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

            {/* Close button */}
            <button
              className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/10 
                         hover:bg-white/20 transition-colors flex items-center justify-center
                         border border-white/20"
              onClick={() => setIsOpen(false)}
              aria-label="Close lightbox"
            >
              <FontAwesomeIcon icon={faXmark} className="w-6 h-6 text-light" />
            </button>

            {/* Image container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full h-full max-w-7xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={src}
                alt={alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </motion.div>

            {/* Caption */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
              <p className="text-gray-300 text-sm bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm">
                {alt}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
