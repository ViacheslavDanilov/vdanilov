"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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
 * @param {string} [props.sizes] - Rendered width for srcset; defaults to one derived from maxWidth
 * @param {string} [props.className] - Additional container classes
 */
// Thumbnail widths inside the project page's 976px content column
const THUMBNAIL_SIZES = {
  sm: "(max-width: 432px) 100vw, 384px",
  md: "(max-width: 496px) 100vw, 448px",
  lg: "(max-width: 560px) 100vw, 512px",
  xl: "(max-width: 624px) 100vw, 576px",
  "2xl": "(max-width: 720px) 100vw, 672px",
  "3xl": "(max-width: 816px) 100vw, 768px",
  "4xl": "(max-width: 944px) 100vw, 896px",
  "5xl": "(max-width: 1024px) 100vw, 976px",
  full: "(max-width: 1024px) 100vw, 976px",
};

export default function ImageLightbox({
  src,
  alt,
  width = 1920,
  height = 1080,
  maxWidth = "full",
  sizes = THUMBNAIL_SIZES[maxWidth] ?? THUMBNAIL_SIZES.full,
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const thumbnailRef = useRef(null);
  const closeRef = useRef(null);
  const wasOpen = useRef(false);

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

  // Handle keyboard events; the close button is the only focusable element
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      } else if (e.key === "Tab" && isOpen) {
        e.preventDefault();
        closeRef.current?.focus();
      }
    },
    [isOpen],
  );

  // Move focus into the dialog on open and back to the thumbnail on close
  useEffect(() => {
    if (isOpen) {
      closeRef.current?.focus();
      wasOpen.current = true;
    } else if (wasOpen.current) {
      thumbnailRef.current?.focus({ preventScroll: true });
      wasOpen.current = false;
    }
  }, [isOpen]);

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
      <button
        ref={thumbnailRef}
        type="button"
        className={`relative block w-full rounded-xl overflow-hidden border border-white/10 cursor-zoom-in group mx-auto ${widthClass} ${className}`}
        style={customStyle}
        onClick={() => setIsOpen(true)}
        aria-label={`View ${alt} in full size`}
      >
        {/* Image with specified dimensions for layout stability */}
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          quality={90}
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
      </button>

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
            role="dialog"
            aria-modal="true"
            aria-label={alt}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" />

            {/* Close button */}
            <button
              ref={closeRef}
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
                width={width}
                height={height}
                sizes="95vw"
                quality={90}
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
