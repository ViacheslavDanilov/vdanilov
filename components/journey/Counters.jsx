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

// Story counters, then the totals that do not depend on the route
export default function Counters({ counts = TOTALS, fixed, animate = true }) {
  const items = [
    ...LIVE.map(({ key, label }) => ({ label, value: counts[key] })),
    ...fixed,
  ];
  return (
    <dl className="grid grid-cols-3 gap-x-4 gap-y-5 md:grid-cols-6">
      {items.map(({ label, value }) => (
        <div key={label} className="flex flex-col items-center text-center">
          <dt className="order-2 text-xs text-[var(--text-muted,#9ca3af)]">
            {label}
          </dt>
          <dd className="relative order-1 h-9 overflow-hidden text-3xl font-bold tabular-nums text-[var(--ink,#fff)]">
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
