"use client";

import * as React from "react";
import { motion } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { cn } from "@/lib/utils";

export function Tab({ text, icon, selected, setSelected, layoutId = "tab" }) {
  return (
    <button
      onClick={() => setSelected(text)}
      className={cn(
        "relative w-fit px-4 py-2 text-sm font-semibold capitalize",
        "text-foreground transition-colors flex items-center gap-2 cursor-pointer",
        !selected && "hover:text-light hover:bg-white/5 rounded-full",
      )}
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
          className="absolute inset-0 z-0 rounded-full bg-accent/20 border border-accent/30 shadow-sm"
        />
      )}
    </button>
  );
}
