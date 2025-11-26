"use client";

import React from "react";
import { cn } from "@/lib/utils";

const gradients = {
  blue: "bg-[conic-gradient(from_90deg_at_50%_50%,#60a5fa_0%,#3b82f6_50%,#60a5fa_100%)]",
  purple:
    "bg-[conic-gradient(from_90deg_at_50%_50%,#e879f9_0%,#a855f7_50%,#e879f9_100%)]",
  pink: "bg-[conic-gradient(from_90deg_at_50%_50%,#fda4af_0%,#f43f5e_50%,#fda4af_100%)]",
};

export const AnimatedGradientButton = React.forwardRef(
  (
    {
      href,
      target = "_blank",
      className,
      gradient = "purple",
      duration = "2s",
      ariaLabel,
      children,
      ...props
    },
    ref,
  ) => {
    const gradientClass = gradients[gradient] || gradients.purple;

    return (
      <span className="relative inline-block overflow-hidden rounded-full p-[1.5px]">
        {/* Animated gradient border */}
        <span
          className={cn(
            "absolute inset-[-1000%] animate-[spin_2s_linear_infinite]",
            gradientClass,
          )}
          style={{ animationDuration: duration }}
          aria-hidden="true"
        />

        {/* Button background */}
        <div className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white dark:bg-gray-950">
          <a
            ref={ref}
            href={href}
            target={target}
            rel={target === "_blank" ? "noopener noreferrer" : undefined}
            aria-label={ariaLabel}
            className={cn(
              "inline-flex rounded-full text-center group items-center justify-center",
              "bg-gradient-to-tr from-zinc-300/20 via-purple-400/30 to-transparent",
              "dark:from-zinc-300/5 dark:via-purple-400/20",
              "text-gray-900 dark:text-white",
              "border-input border-[1px]",
              "hover:bg-gradient-to-tr hover:from-zinc-300/30 hover:via-purple-400/40 hover:to-transparent",
              "dark:hover:from-zinc-300/10 dark:hover:via-purple-400/30",
              "transition-all duration-300",
              "py-4 px-10",
              "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-gray-950",
              className,
            )}
            {...props}
          >
            {children}
          </a>
        </div>
      </span>
    );
  },
);

AnimatedGradientButton.displayName = "AnimatedGradientButton";
