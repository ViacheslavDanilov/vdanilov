"use client";
import React, { useEffect, useRef } from "react";

const BentoItem = ({ className, children }) => {
  const itemRef = useRef(null);
  const MAX_ROTATION = 3;

  useEffect(() => {
    const item = itemRef.current;
    if (!item) return;

    const handleMouseMove = (e) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateY = ((x - centerX) / centerX) * MAX_ROTATION;
      const rotateX = (-(y - centerY) / centerY) * MAX_ROTATION;
      item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015,1.015,1.015)`;
    };

    const handleMouseLeave = () => {
      item.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    };

    item.addEventListener("mousemove", handleMouseMove);
    item.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      item.removeEventListener("mousemove", handleMouseMove);
      item.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={itemRef}
      className={`relative overflow-hidden rounded-xl bg-light/5 border border-light/10 p-6 transition-all duration-300 ease-out hover:shadow-xl hover:shadow-accent/20 ${className || ""}`}
    >
      {children}
    </div>
  );
};

export default BentoItem;
