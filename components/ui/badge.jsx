"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cn } from "@/lib/utils";

/**
 * Badge color variants
 * Each variant defines background, border, and text colors
 */
const VARIANTS = {
  blue: "bg-blue-600/20 text-blue-400 border-blue-600/40 light:bg-blue-500/14 light:text-blue-700 light:border-blue-500/45",
  violet:
    "bg-violet-600/20 text-violet-400 border-violet-600/40 light:bg-violet-500/14 light:text-violet-700 light:border-violet-500/45",
  teal: "bg-teal-600/20 text-teal-400 border-teal-600/40 light:bg-teal-500/14 light:text-[oklch(48.1%_0.13_186.4)] light:border-teal-500/45",
  cyan: "bg-cyan-600/20 text-cyan-400 border-cyan-600/40 light:bg-cyan-500/14 light:text-[oklch(49%_0.142_223.1)] light:border-cyan-500/45",
  sky: "bg-sky-500/20 text-sky-400 border-sky-500/40 light:bg-sky-500/14 light:text-[oklch(47%_0.181_242.7)] light:border-sky-500/45",

  "teal-blur": "bg-page/30 backdrop-blur-sm text-teal-400 border-teal-500/30",
};

/**
 * Reusable Badge component for consistent styling across the site
 *
 * @param {string} variant - Color variant: 'blue' | 'violet' | 'teal' | 'cyan' | 'sky' | 'teal-blur'
 * @param {object} icon - FontAwesome icon object (optional)
 * @param {string} className - Additional CSS classes (optional)
 * @param {React.ReactNode} children - Badge text content
 */
export function Badge({ variant = "blue", icon, className, children }) {
  return (
    <span
      data-theme={variant === "teal-blur" ? "dark" : undefined}
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
