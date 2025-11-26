"use client";

import React from "react";
import { cn } from "@/lib/utils";

const gradients = {
  blue: "bg-[conic-gradient(from_90deg_at_50%_50%,#80d0ff_0%,#0284c7_50%,#80d0ff_100%)]",
  purple:
    "bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]",
  pink: "bg-[conic-gradient(from_90deg_at_50%_50%,#FBCFE8_0%,#DB2777_50%,#FBCFE8_100%)]",
};

export const AnimatedGradientButton = React.forwardRef(
  (
    {
      href,
      target = "_blank",
      className,
      gradient = "purple",
      duration = "3s",
      ariaLabel,
      children,
      ...props
    },
    ref,
  ) => {
    const gradientClass = gradients[gradient] || gradients.purple;

    return (
      <span className="relative inline-block overflow-hidden rounded-full p-[1.75px]">
        {/* Animated gradient border */}
        <span
          className={cn(
            "absolute inset-[-1000%] animate-[spin_2s_linear_infinite]",
            gradientClass,
          )}
          style={{ animationDuration: duration }}
          aria-hidden="true"
        />

        {/* Button background and content */}
        <div className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-gray-950 text-xs font-medium backdrop-blur-3xl">
          <a
            ref={ref}
            href={href}
            target={target}
            rel={target === "_blank" ? "noopener noreferrer" : undefined}
            aria-label={ariaLabel}
            className={cn(
              "inline-flex rounded-full text-center group items-center w-full justify-center",
              "bg-gradient-to-tr from-zinc-300/5 via-[#03b1fb]/20 to-transparent",
              "text-white",
              "border-[#262629] border-[1px]",
              "hover:bg-gradient-to-tr hover:from-zinc-300/10 hover:via-[#03b1fb]/30 hover:to-transparent",
              "transition-all",
              "sm:w-auto py-4 px-10",
              "focus:outline-none focus:ring-2 focus:ring-[#03b1fb] focus:ring-offset-2 focus:ring-offset-gray-950",
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
