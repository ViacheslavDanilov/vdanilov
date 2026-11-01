"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const INTERVAL = 3000;

// One role at a time, stacked in one grid cell so the slot is as wide as the longest role
export default function RotatingRoles({ roles, className }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(
      () => setActive((i) => (i + 1) % roles.length),
      INTERVAL,
    );
    return () => clearInterval(timer);
  }, [paused, roles.length]);

  return (
    <p
      className={className}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <span className="sr-only">{roles.join(", ")}</span>
      <span aria-hidden="true" className="inline-grid justify-items-center">
        {roles.map((role, i) => (
          <span
            key={role}
            className={cn(
              "col-start-1 row-start-1 whitespace-nowrap transition-opacity duration-500",
              "motion-reduce:row-start-auto motion-reduce:opacity-100 motion-reduce:transition-none",
              i === active ? "opacity-100" : "opacity-0",
            )}
          >
            {role}
          </span>
        ))}
      </span>
    </p>
  );
}
