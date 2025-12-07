"use client";
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const CyberneticCard = ({ className, children }) => {
  const itemRef = useRef(null);

  useEffect(() => {
    const item = itemRef.current;
    if (!item) return;

    const handleMouseMove = (e) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      item.style.setProperty("--mouse-x", `${x}px`);
      item.style.setProperty("--mouse-y", `${y}px`);
    };

    item.addEventListener("mousemove", handleMouseMove);

    return () => {
      item.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={itemRef}
      className={cn(
        "cybernetic-card relative overflow-hidden rounded-xl bg-card border border-light/10 p-6 group transition-all duration-500 ease-out",
        className,
      )}
    >
      <div className="cybernetic-card-glow absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

export default CyberneticCard;
