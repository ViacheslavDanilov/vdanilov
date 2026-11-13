"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

const BUTTON_CLASSES =
  "inline-flex items-center transition-colors justify-center cursor-pointer gap-2 whitespace-nowrap rounded-full font-medium transition-[color,box-shadow,transform] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-focus focus-visible:ring-[3px] border border-line bg-transparent motion-safe:active:scale-[0.975] duration-300 transition text-strong h-12 rounded-full px-8 has-[>svg]:px-6";

// Link variant for <a> tags
export function LiquidButtonLink({
  className,
  textClassName,
  hoverClassName = "bg-ink/10",
  href,
  target,
  ariaLabel,
  children,
  ...props
}) {
  const Comp = href.startsWith("/") ? Link : "a";

  return (
    <Comp
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      aria-label={ariaLabel}
      data-slot="button"
      className={cn("group/button relative", BUTTON_CLASSES, className)}
      {...props}
    >
      {/* Light layer that fades in on hover and focus */}
      <div
        aria-hidden="true"
        data-slot="button-hover"
        className={cn(
          "pointer-events-none absolute top-0 left-0 z-0 h-full w-full rounded-full opacity-0 transition-opacity duration-300 group-hover/button:opacity-100 group-focus-visible/button:opacity-100",
          hoverClassName,
        )}
      />

      {/* Glass effect shadow layer */}
      <div
        className="absolute top-0 left-0 z-0 h-full w-full rounded-full 
            shadow-[0_0_8px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.85),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.6),inset_0_0_6px_6px_rgba(255,255,255,0.12),inset_0_0_2px_2px_rgba(255,255,255,0.06),0_0_12px_rgba(0,0,0,0.15)]
        transition-all"
      />

      {/* Glass blur backdrop */}
      <div
        className="absolute top-0 left-0 isolate -z-10 h-full w-full overflow-hidden rounded-full"
        style={{
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      />

      {/* Button content */}
      <div className={cn("pointer-events-none z-10", textClassName)}>
        {children}
      </div>
    </Comp>
  );
}
