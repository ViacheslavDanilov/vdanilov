"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faExpand } from "@fortawesome/free-solid-svg-icons";

/**
 * Clickable image component with lightbox/zoom functionality
 * @param {Object} props
 * @param {string} props.src - Image source path
 * @param {string} props.alt - Alt text for the image
 * @param {number} [props.width] - Image width for aspect ratio (default: 1920)
 * @param {number} [props.height] - Image height for aspect ratio (default: 1080)
 * @param {string} [props.maxWidth] - Max width: 'sm'|'md'|'lg'|'xl'|'2xl'|'3xl'|'4xl'|'full' or custom CSS value
 * @param {string} [props.className] - Additional container classes
 */
export default function ImageLightbox({
  src,
  alt,
  width = 1920,
  height = 1080,
  maxWidth = "full",
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(false);

  // Map maxWidth prop to Tailwind classes or custom styles
  const maxWidthClasses = {
    sm: "max-w-sm", // 384px
    md: "max-w-md", // 448px
    lg: "max-w-lg", // 512px
    xl: "max-w-xl", // 576px
    "2xl": "max-w-2xl", // 672px
    "3xl": "max-w-3xl", // 768px
    "4xl": "max-w-4xl", // 896px
    "5xl": "max-w-5xl", // 1024px
    full: "w-full", // 100%
  };

  const widthClass = maxWidthClasses[maxWidth] || "";
  const customStyle = !maxWidthClasses[maxWidth] ? { maxWidth } : {};

  // Handle keyboard events
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    },
    [isOpen],
  );

  // Add/remove keyboard listener
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  return (
    <>
      {/* Thumbnail - centered, clean background */}
      <div
        className={`relative rounded-xl overflow-hidden border border-white/10 cursor-zoom-in group mx-auto ${widthClass} ${className}`}
        style={customStyle}
        onClick={() => setIsOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setIsOpen(true)}
        aria-label={`View ${alt} in full size`}
      >
        {/* Image with specified dimensions for layout stability */}
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto"
          style={{ display: "block" }}
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-12 h-12 rounded-full bg-accent/90 flex items-center justify-center shadow-lg">
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 cursor-zoom-out"
            onClick={() => setIsOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" />

            {/* Close button */}
            <button
              className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/10 
                         hover:bg-white/20 transition-colors flex items-center justify-center
                         border border-white/20 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              aria-label="Close (Esc)"
            >
              <FontAwesomeIcon icon={faXmark} className="w-6 h-6 text-light" />
            </button>

            {/* Keyboard hint */}
            <div className="absolute top-4 left-4 z-10">
              <span className="text-gray-500 text-xs bg-black/50 px-3 py-1.5 rounded-md">
                Press <kbd className="text-gray-400 font-mono">Esc</kbd> to
                close
              </span>
            </div>

            {/* Image container - click image does NOT close (natural behavior) */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-[95vw] max-h-[90vh] cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={src}
                alt={alt}
                width={1920}
                height={1080}
                className="max-w-full max-h-[90vh] w-auto h-auto rounded-lg shadow-2xl"
                style={{ objectFit: "contain" }}
                priority
              />
            </motion.div>

            {/* Caption */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center pointer-events-none">
              <p className="text-gray-300 text-sm bg-black/60 px-4 py-2 rounded-lg backdrop-blur-sm">
                {alt}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
