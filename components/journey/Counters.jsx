"use client";

import { AnimatePresence, motion } from "motion/react";
import { TOTALS } from "@/lib/journey";

const EASE_OUT = [0.23, 1, 0.32, 1];

const LIVE = [
  { key: "countries", label: "Countries" },
  { key: "cities", label: "Cities" },
  { key: "universities", label: "Universities" },
  { key: "remote", label: "Remote teams" },
];

// Counters that follow the story; compact sits on the map, the default stands alone
export default function Counters({
  counts = TOTALS,
  animate = true,
  compact = false,
}) {
  const items = LIVE.map(({ key, label }) => ({ label, value: counts[key] }));
  return (
    <dl
      className={
        compact
          ? "flex gap-8"
          : "grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-4"
      }
    >
      {items.map(({ label, value }) => (
        <div
          key={label}
          className={`flex flex-col ${compact ? "items-end text-right" : "items-center text-center"}`}
        >
          <dt className="order-2 text-xs text-[var(--text-muted,#9ca3af)]">
            {label}
          </dt>
          <dd
            className={`relative order-1 overflow-hidden font-bold tabular-nums text-[var(--ink,#fff)] ${compact ? "h-8 text-2xl" : "h-9 text-3xl"}`}
          >
            {animate ? (
              <AnimatePresence initial={false} mode="popLayout">
                <motion.span
                  key={value}
                  className="block"
                  initial={{ y: "60%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-60%", opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                >
                  {value}
                </motion.span>
              </AnimatePresence>
            ) : (
              <span className="block">{value}</span>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
