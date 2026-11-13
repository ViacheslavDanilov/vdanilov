"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  PLACES,
  STOPS,
  journeyAt,
  progressOfDate,
  stopPeriod,
} from "@/lib/journey";

const DURATION_MS = 45000;
const MIN_TICK_GAP = 0.04;
const YEAR_TICKS = (() => {
  let last = -1;
  return Array.from({ length: 11 }, (_, i) => 2016 + i)
    .map((year) => ({ year, at: progressOfDate(Date.UTC(year, 0, 1)) }))
    .filter(({ at }) => {
      if (at - last < MIN_TICK_GAP) return false;
      last = at;
      return true;
    });
})();

const formatDate = (ms) =>
  new Date(ms).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

const useReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return reduced;
};

// View is the visual: it receives progress (0 to 1) and reducedMotion, and fills its parent
export default function JourneyPlayer({ View, label }) {
  const reducedMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(false);
  const progressRef = useRef(0);
  const containerRef = useRef(null);
  const startedRef = useRef(false);

  const update = useCallback((value) => {
    progressRef.current = value;
    setProgress(value);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setPlaying(false);
      update(1);
    }
  }, [reducedMotion, update]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || reducedMotion) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          setPlaying(true);
        }
        if (!entry.isIntersecting) setPlaying(false);
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion]);

  useEffect(() => {
    if (!playing) return;
    let frame;
    let last = performance.now();
    const tick = (now) => {
      const next = progressRef.current + (now - last) / DURATION_MS;
      last = now;
      if (next >= 1) {
        update(1);
        setPlaying(false);
        return;
      }
      update(next);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing, update]);

  const state = journeyAt(progress);
  const stop = STOPS[state.stopIndex];
  const place = PLACES[stop.place];
  const dateLabel = formatDate(state.dateMs);

  const togglePlay = () => {
    if (progressRef.current >= 1) update(0);
    setPlaying((value) => !value);
  };

  return (
    <section
      ref={containerRef}
      aria-label={label}
      className="hidden w-full max-w-6xl flex-col gap-4 px-6 md:flex"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10 bg-card">
        <View progress={progress} reducedMotion={reducedMotion} />
        <div className="pointer-events-none absolute left-4 top-4 text-xs uppercase tracking-widest text-gray-400">
          {label}
        </div>
        <div className="absolute bottom-4 left-4 max-w-sm rounded-xl border border-white/10 bg-dark/80 p-4 backdrop-blur">
          <div className="text-xs text-gray-400">{stopPeriod(stop)}</div>
          <div className="text-lg font-semibold">
            {place.city}, {place.country}
          </div>
          <div className="text-sm text-gray-300">{stop.role}</div>
          <div className="text-sm text-gray-400">{stop.org}</div>
          <Link
            href="/experience"
            className="mt-2 inline-block text-sm text-accent hover:underline"
          >
            See on Experience
          </Link>
        </div>
        {state.remote.length > 0 && (
          <div className="absolute right-4 top-4 rounded-xl border border-white/10 bg-dark/80 p-3 text-xs text-gray-300 backdrop-blur">
            <div className="mb-1 uppercase tracking-widest text-gray-400">
              Remote
            </div>
            {state.remote.map((r) => (
              <div key={r.org}>
                {r.org}, {PLACES[r.place].city}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? "Pause" : "Play"}
          className="h-10 w-10 shrink-0 rounded-full border border-white/20 text-sm hover:border-accent"
        >
          {playing ? "❚❚" : "▶"}
        </button>
        <div className="flex-1">
          <input
            type="range"
            min={0}
            max={1000}
            value={Math.round(progress * 1000)}
            onChange={(event) => {
              setPlaying(false);
              update(Number(event.target.value) / 1000);
            }}
            aria-label="Journey timeline"
            aria-valuetext={dateLabel}
            className="w-full accent-accent"
          />
          <div className="relative mt-1 h-4 text-[10px] text-gray-400">
            {YEAR_TICKS.map(({ year, at }) => (
              <span
                key={year}
                className="absolute -translate-x-1/2"
                style={{ left: `${at * 100}%` }}
              >
                {year}
              </span>
            ))}
          </div>
        </div>
        <div className="w-24 shrink-0 text-right text-sm tabular-nums">
          {dateLabel}
        </div>
      </div>
    </section>
  );
}
