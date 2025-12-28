"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cn } from "@/lib/utils";

/**
 * Badge color variants
 * Each variant defines background, border, and text colors
 */
const VARIANTS = {
  // Original colored variants
  blue: "bg-blue-600/20 text-blue-400 border-blue-600/40",
  violet: "bg-violet-600/20 text-violet-400 border-violet-600/40",
  teal: "bg-teal-600/20 text-teal-400 border-teal-600/40",
  cyan: "bg-cyan-600/20 text-cyan-400 border-cyan-600/40",

  // High contrast variants for image overlays
  glass: "bg-dark/90 border-white/20 text-white",
  "teal-contrast": "bg-dark/60 text-teal-400 border-teal-500/40",
  "teal-solid": "bg-dark text-teal-400 border-teal-500/50 shadow-lg",
  "teal-blur": "bg-dark/30 backdrop-blur-sm text-teal-400 border-teal-500/30",
  "teal-glow":
    "bg-dark/80 text-teal-400 border-teal-400/60 shadow-[0_0_10px_rgba(20,184,166,0.3)]",
  "dark-minimal": "bg-dark/80 text-gray-200 border-white/10",
  "dark-border": "bg-dark/70 text-white border-white/30",
  frosted: "bg-white/10 backdrop-blur-md text-white border-white/20",
  outlined:
    "bg-transparent text-teal-400 border-teal-400/80 shadow-[0_2px_8px_rgba(0,0,0,0.5)]",
};

/**
 * Reusable Badge component for consistent styling across the site
 *
 * @param {string} variant - Color variant: 'blue' | 'violet' | 'teal' | 'cyan'
 * @param {object} icon - FontAwesome icon object (optional)
 * @param {string} className - Additional CSS classes (optional)
 * @param {React.ReactNode} children - Badge text content
 */
export function Badge({ variant = "blue", icon, className, children }) {
  return (
    <span
      className={cn(
        "px-3 py-1 text-xs font-medium rounded-full border inline-flex items-center gap-1.5",
        VARIANTS[variant] || VARIANTS.blue,
        className,
      )}
    >
      {icon && (
        <FontAwesomeIcon
          icon={icon}
          className="w-3 h-3"
          style={{ width: "0.75rem", height: "0.75rem" }}
        />
      )}
      {children}
    </span>
  );
}
