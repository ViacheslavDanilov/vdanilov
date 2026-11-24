"use client";

import { Children, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";

// Muted looping video that loads and plays only near the viewport, and never autoplays under reduced motion
export default function AutoplayVideo({
  aspectRatio,
  style,
  soundHint = false,
  captions,
  children,
  ...props
}) {
  const ref = useRef(null);
  const [muted, setMuted] = useState(true);

  // The click is the gesture that lets the browser play with sound
  const turnSoundOn = () => {
    const video = ref.current;
    video.muted = false;
    video.currentTime = 0;
    video.play().catch(() => {});
  };

  useEffect(() => {
    const video = ref.current;
    const handleVolume = () => setMuted(video.muted);
    video.addEventListener("volumechange", handleVolume);

    // Reduced motion: no autoplay, but load enough to show the first frame
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.preload = "metadata";
      return () => video.removeEventListener("volumechange", handleVolume);
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
      video.removeEventListener("volumechange", handleVolume);
    };
  }, []);

  // Sources first, then the track, then the fallback text
  const items = Children.toArray(children);
  const sources = items.filter((item) => item.type === "source");
  const fallback = items.filter((item) => item.type !== "source");

  const video = (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      style={aspectRatio ? { aspectRatio, ...style } : style}
      {...props}
    >
      {sources}
      {/* No default attribute: captions stay off until the viewer turns them on */}
      {captions && (
        <track kind="captions" srcLang="en" label="English" src={captions} />
      )}
      {fallback}
    </video>
  );

  if (!soundHint) return video;

  return (
    <div className="relative">
      {video}
      {muted && (
        <button
          type="button"
          onClick={turnSoundOn}
          className="absolute top-2 right-2 md:top-3 md:right-3 inline-flex items-center gap-1.5 md:gap-2 rounded-full border border-line bg-surface/85 px-2.5 py-1 md:px-3.5 md:py-2 text-xs md:text-sm font-medium text-strong shadow-md backdrop-blur-sm transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
        >
          <FontAwesomeIcon icon={faVolumeHigh} aria-hidden="true" />
          Sound on
        </button>
      )}
    </div>
  );
}
