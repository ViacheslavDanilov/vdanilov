"use client";

import { useEffect, useRef } from "react";

// Muted looping video that loads and plays only near the viewport, and never autoplays under reduced motion
export default function AutoplayVideo({ aspectRatio, style, ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    const video = ref.current;

    // Reduced motion: no autoplay, but load enough to show the first frame
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.preload = "metadata";
      return;
    }

    // Resume on scroll only if the viewer did not pause it
    let pausedByViewer = false;
    let pausingOffscreen = false;
    const handlePause = () => {
      if (!pausingOffscreen) pausedByViewer = true;
      pausingOffscreen = false;
    };
    const handlePlay = () => {
      pausedByViewer = false;
    };
    video.addEventListener("pause", handlePause);
    video.addEventListener("play", handlePlay);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!pausedByViewer) video.play().catch(() => {});
        } else if (!video.paused) {
          pausingOffscreen = true;
          video.pause();
        }
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(video);

    return () => {
      observer.disconnect();
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("play", handlePlay);
    };
  }, []);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      style={aspectRatio ? { aspectRatio, ...style } : style}
      {...props}
    />
  );
}
