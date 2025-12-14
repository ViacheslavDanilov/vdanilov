"use client";

import React from "react";
import { cn } from "@/lib/utils";

export const AnimatedGradientButton = React.forwardRef(
  (
    {
      href,
      target = "_blank",
      className,
      duration,
      ariaLabel,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <span
        className="animated-gradient-button-wrapper relative inline-block overflow-hidden rounded-full"
        style={{ padding: "var(--button-border-width)" }}
      >
        {/* Animated gradient border */}
        <span
          className="absolute inset-[-1000%] animate-spin"
          style={{
            animationDuration: duration || "var(--button-animation-duration)",
            background: "var(--button-border-gradient)",
          }}
          aria-hidden="true"
        />

        {/* Button background and content */}
        <div className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-gray-950 backdrop-blur-3xl">
          <a
            ref={ref}
            href={href}
            target={target}
            rel={target === "_blank" ? "noopener noreferrer" : undefined}
            aria-label={ariaLabel}
            className={cn(
              "inline-flex rounded-full text-center group items-center w-full justify-center",
              "transition-all",
              "sm:w-auto",
              "outline-none focus:outline-none focus-visible:outline-none",
              className,
            )}
            style={{
              paddingTop: "var(--button-padding-y)",
              paddingBottom: "var(--button-padding-y)",
              paddingLeft: "var(--button-padding-x)",
              paddingRight: "var(--button-padding-x)",
              background: `linear-gradient(var(--button-gradient-direction), var(--button-gradient-from), var(--button-gradient-via), var(--button-gradient-to))`,
              color: "var(--button-text-color)",
              border: `1px solid var(--button-border-color)`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `linear-gradient(var(--button-gradient-direction), var(--button-hover-gradient-from), var(--button-hover-gradient-via), var(--button-hover-gradient-to))`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = `linear-gradient(var(--button-gradient-direction), var(--button-gradient-from), var(--button-gradient-via), var(--button-gradient-to))`;
            }}
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
