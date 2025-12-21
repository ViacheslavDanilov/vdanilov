"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cn } from "@/lib/utils";

/**
 * Badge color variants
 * Each variant defines background, border, and text colors
 */
const VARIANTS = {
  blue: "bg-blue-600/20 text-blue-400 border-blue-600/40",
  violet: "bg-violet-600/20 text-violet-400 border-violet-600/40",
  teal: "bg-teal-600/20 text-teal-400 border-teal-600/40",
  cyan: "bg-cyan-600/20 text-cyan-400 border-cyan-600/40",
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
