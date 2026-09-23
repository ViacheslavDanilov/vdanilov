"use client";

import { useEffect, useRef } from "react";

// Muted looping video that loads and plays only near the viewport, and never autoplays under reduced motion
export default function AutoplayVideo(props) {
  const ref = useRef(null);

  useEffect(() => {
    const video = ref.current;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return <video ref={ref} muted loop playsInline preload="none" {...props} />;
}
