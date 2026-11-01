"use client";

import * as React from "react";
import { motion } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { cn } from "@/lib/utils";

export function Tab({
  text,
  icon,
  selected,
  setSelected,
  layoutId = "tab",
  outlined = false,
  ...props
}) {
  return (
    <button
      type="button"
      onClick={() => setSelected(text)}
      className={cn(
        "relative w-fit py-3 rounded-full -outline-offset-4 text-sm font-semibold capitalize",
        "text-foreground transition-[color,scale] motion-safe:active:scale-95 flex items-center gap-2 cursor-pointer",
        outlined
          ? "shrink-0 px-3.5 md:inline-flex md:align-top md:mx-1"
          : "-my-1 px-4",
        !selected &&
          "hover:text-light before:absolute before:inset-x-0 before:inset-y-1 before:rounded-full",
        !selected &&
          (outlined
            ? "before:border before:border-white/20 before:bg-white/5 before:transition-colors hover:before:bg-white/10"
            : "before:bg-white/5 before:opacity-0 before:transition-opacity hover:before:opacity-100"),
      )}
      {...props}
    >
      {icon && (
        <span className="w-4 h-4 relative z-10 flex items-center justify-center">
          <FontAwesomeIcon
            icon={icon}
            className="w-full h-full"
            style={{ width: "1rem", height: "1rem" }}
          />
        </span>
      )}
      <span className="relative z-10">{text}</span>
      {selected && (
        <motion.span
          layoutId={layoutId}
          transition={{ type: "spring", duration: 0.4 }}
          className="absolute inset-x-0 inset-y-1 z-0 rounded-full bg-accent/20 border border-accent/60 shadow-sm"
        />
      )}
    </button>
  );
}
