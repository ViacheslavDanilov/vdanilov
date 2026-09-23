"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

// One pointer listener for every card; only cards on screen are updated
const visibleCards = new Set();
const pointer = { x: -9999, y: -9999 };
let trackedCount = 0;
let observer = null;
let frame = 0;

const syncCard = (card) => {
  card.style.setProperty("--x", pointer.x.toFixed(2));
  card.style.setProperty("--y", pointer.y.toFixed(2));
};

const syncVisibleCards = () => {
  frame = 0;
  visibleCards.forEach(syncCard);
};

const handlePointerMove = (e) => {
  pointer.x = e.clientX;
  pointer.y = e.clientY;
  if (!frame) frame = requestAnimationFrame(syncVisibleCards);
};

const trackCard = (card) => {
  if (trackedCount++ === 0) {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visibleCards.add(entry.target);
          syncCard(entry.target);
        } else {
          visibleCards.delete(entry.target);
        }
      });
    });
    document.addEventListener("pointermove", handlePointerMove);
  }
  observer.observe(card);

  return () => {
    observer.unobserve(card);
    visibleCards.delete(card);
    if (--trackedCount === 0) {
      observer.disconnect();
      document.removeEventListener("pointermove", handlePointerMove);
    }
  };
};

const GlowCard = ({ children, className = "", spotlightSize = 180 }) => {
  const cardRef = useRef(null);

  useEffect(() => trackCard(cardRef.current), []);

  return (
    <div
      ref={cardRef}
      data-glow
      style={{
        "--hue": "220",
        "--radius": "14",
        "--border": "1.5",
        "--x": "-9999",
        "--y": "-9999",
        "--backdrop": "hsl(0 0% 60% / 0.06)",
        "--backup-border": "var(--backdrop)",
        "--size": spotlightSize.toString(),
        "--outer": "1",
        "--border-size": "calc(var(--border, 2) * 1px)",
        "--spotlight-size": "calc(var(--size, 150) * 1px)",
        "--bg-spot-opacity": "0.03",
        "--border-spot-opacity": "0.3",
        "--border-light-opacity": "0.2",
        backgroundImage: `radial-gradient(
          var(--spotlight-size) var(--spotlight-size) at
          calc(var(--x, 0) * 1px)
          calc(var(--y, 0) * 1px),
          hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 70) * 1%) / var(--bg-spot-opacity, 0.03)), transparent
        )`,
        backgroundColor: "var(--backdrop, transparent)",
        backgroundSize:
          "calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))",
        backgroundPosition: "50% 50%",
        backgroundAttachment: "fixed",
        border: "var(--border-size) solid var(--backup-border)",
        position: "relative",
        touchAction: "pan-y",
      }}
      className={cn(
        "rounded-2xl relative grid grid-rows-[1fr_auto] shadow-[0_0.5rem_1rem_-0.5rem_rgba(0,0,0,0.3)] p-4 gap-4 backdrop-blur-[2px]",
        className,
      )}
    >
      <div data-glow></div>
      {children}
    </div>
  );
};

export { GlowCard };
