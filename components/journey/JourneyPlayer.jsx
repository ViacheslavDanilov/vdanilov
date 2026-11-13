"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import {
  JOURNEY_END_MS,
  JOURNEY_START_MS,
  PLACES,
  REMOTE,
  STOPS,
  journeyAt,
  progressOfDate,
  stopPeriod,
  toMs,
  formatMonth,
} from "@/lib/journey";

const DURATION_MS = 60000;
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";
const MIN_LABEL_GAP_PX = 36;
const EASE_OUT = [0.23, 1, 0.32, 1];

// The scale is calendar time; playback pace is story time, so short visits still get screen time
const SPAN_MS = JOURNEY_END_MS - JOURNEY_START_MS;
const calendarAt = (ms) => (ms - JOURNEY_START_MS) / SPAN_MS;
const SLIDER_STEPS = 4000;

const YEARS = Array.from({ length: 11 }, (_, i) => 2016 + i).map((year) => ({
  year,
  at: calendarAt(Date.UTC(year, 0, 1)),
}));

const SHORT_ORG = { "Intelerad Medical Systems": "Intelerad" };
const LANES = REMOTE.map((role) => {
  const { city, country } = PLACES[role.place];
  return {
    org: role.org,
    name: SHORT_ORG[role.org] ?? role.org,
    where: country === "United States" ? `${city}, US` : city,
    period: stopPeriod(role),
    from: calendarAt(toMs(role.from)),
    to: calendarAt(toMs(role.to)),
  };
});

const RANGE =
  "relative h-5 w-full cursor-pointer appearance-none bg-transparent focus-visible:outline-none " +
  "[&::-webkit-slider-runnable-track]:h-5 [&::-webkit-slider-runnable-track]:bg-transparent " +
  "[&::-webkit-slider-thumb]:mt-[3px] [&::-webkit-slider-thumb]:size-3.5 [&::-webkit-slider-thumb]:appearance-none " +
  "[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-0 [&::-webkit-slider-thumb]:bg-[var(--accent-text,#03b1fb)] " +
  "[&::-moz-range-track]:bg-transparent [&::-moz-range-thumb]:size-3.5 [&::-moz-range-thumb]:rounded-full " +
  "[&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-[var(--accent-text,#03b1fb)] " +
  "[&:focus-visible::-webkit-slider-thumb]:outline-2 [&:focus-visible::-webkit-slider-thumb]:outline-offset-2 " +
  "[&:focus-visible::-webkit-slider-thumb]:outline-[var(--accent-text,#03b1fb)] " +
  "[&:focus-visible::-moz-range-thumb]:outline-2 [&:focus-visible::-moz-range-thumb]:outline-offset-2 " +
  "[&:focus-visible::-moz-range-thumb]:outline-[var(--accent-text,#03b1fb)]";

const BAR =
  "absolute inset-y-1.5 rounded-md border transition-[background-color,border-color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none";
const BAR_IDLE =
  "border-[color-mix(in_srgb,var(--accent-text,#03b1fb)_40%,transparent)] bg-[color-mix(in_srgb,var(--accent-text,#03b1fb)_14%,transparent)]";
const BAR_LIVE =
  "border-[var(--accent-text,#03b1fb)] bg-[color-mix(in_srgb,var(--accent-text,#03b1fb)_65%,transparent)]";

const useReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia(REDUCED_QUERY);
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return reduced;
};

const useWidth = (ref) => {
  const [width, setWidth] = useState(800);
  useEffect(() => {
    const observer = new ResizeObserver(([entry]) =>
      setWidth(entry.contentRect.width),
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return width;
};

// Year hairlines and the remote bars share the slider's calendar scale
const Lanes = memo(function Lanes({ active, labelled }) {
  return (
    <>
      <div
        className="relative col-start-2 row-start-2 mx-[7px] h-5 text-xs tabular-nums text-[var(--text-muted,#9ca3af)]"
        aria-hidden="true"
      >
        {labelled.map(({ year, at }) => (
          <span
            key={year}
            className="absolute top-0.5 -translate-x-1/2"
            style={{ left: `${at * 100}%` }}
          >
            {year}
          </span>
        ))}
      </div>
      <div
        className="pointer-events-none relative col-start-2 mx-[7px] row-span-3 row-start-3"
        aria-hidden="true"
      >
        {YEARS.map(({ year, at }) => (
          <span
            key={year}
            className="absolute inset-y-0 w-px bg-[var(--line,rgba(255,255,255,0.1))]"
            style={{ left: `${at * 100}%` }}
          />
        ))}
      </div>
      {LANES.map((lane, n) => {
        const live = active.includes(lane.org);
        return (
          <div key={lane.org} className="contents">
            <div
              className="col-start-1 flex flex-col justify-center pr-2 text-right text-xs leading-tight"
              style={{ gridRow: n + 3 }}
            >
              <span
                className={`font-medium transition-colors duration-300 motion-reduce:transition-none ${live ? "text-[var(--ink,#fff)]" : "text-[var(--text,#d1d5db)]"}`}
              >
                {lane.name}
                <span className="font-normal text-[var(--text-muted,#9ca3af)]">
                  {" / "}
                  {lane.where}
                </span>
              </span>
              <span className="text-xs tabular-nums text-[var(--text-muted,#9ca3af)]">
                {lane.period}
              </span>
            </div>
            <div
              className="relative col-start-2 mx-[7px] h-[38px]"
              style={{ gridRow: n + 3 }}
              aria-hidden="true"
            >
              <div
                className={`${BAR} ${live ? BAR_LIVE : BAR_IDLE}`}
                style={{
                  left: `${lane.from * 100}%`,
                  width: `${(lane.to - lane.from) * 100}%`,
                }}
              />
            </div>
          </div>
        );
      })}
    </>
  );
});

// View is the visual: it receives progress (0 to 1) and fills its parent
export default function JourneyPlayer({ View, label }) {
  const reducedMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(false);
  const progressRef = useRef(0);
  const containerRef = useRef(null);
  const scaleRef = useRef(null);
  const startedRef = useRef(false);
  const scaleWidth = useWidth(scaleRef);

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
        if (
          entry.isIntersecting &&
          !startedRef.current &&
          !window.matchMedia(REDUCED_QUERY).matches
        ) {
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
  const dateLabel = formatMonth(state.dateMs);
  const calendar = calendarAt(state.dateMs);
  const active = state.remote.map((role) => role.org).join("|");

  let lastLabelled = -1;
  const labelled = YEARS.filter(({ at }) => {
    if ((at - lastLabelled) * scaleWidth < MIN_LABEL_GAP_PX) return false;
    lastLabelled = at;
    return true;
  });

  const togglePlay = () => {
    if (progressRef.current >= 1) update(0);
    setPlaying((value) => !value);
  };

  return (
    <section
      ref={containerRef}
      aria-label={label}
      className="hidden w-full max-w-6xl flex-col gap-4 px-6 text-[var(--text,#d1d5db)] md:flex"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[var(--line,rgba(255,255,255,0.1))] bg-[var(--surface,#151a1f)]">
        <View progress={progress} />
        <div className="pointer-events-none absolute left-4 top-4 text-xs uppercase tracking-widest text-[var(--text-muted,#9ca3af)]">
          {label}
        </div>
        <div className="absolute bottom-4 left-4 w-[22rem] rounded-xl border border-[var(--line,rgba(255,255,255,0.1))] bg-[color-mix(in_srgb,var(--bg,#0a0e14)_82%,transparent)] backdrop-blur">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              key={state.stopIndex}
              className="p-4"
              initial={{ opacity: 0, y: reducedMotion ? 0 : 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: EASE_OUT }}
            >
              <div className="text-xs text-[var(--text-muted,#9ca3af)]">
                {stopPeriod(stop)}
              </div>
              <div className="text-lg font-semibold text-[var(--ink,#fff)]">
                {place.city}, {place.country}
              </div>
              <div className="text-sm text-[var(--text,#d1d5db)]">
                {stop.role}
              </div>
              <div className="text-sm text-[var(--text-muted,#9ca3af)]">
                {stop.org}
              </div>
              <Link
                href="/experience"
                className="mt-2 inline-block text-sm text-[var(--accent-text,#03b1fb)] hover:underline"
              >
                See on Experience
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="grid grid-cols-[12rem_1fr_6rem] gap-x-4">
        <div className="col-start-1 row-start-1 flex h-10 items-center justify-end">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={playing ? "Pause" : "Play"}
            className="h-10 w-10 shrink-0 rounded-full border border-[var(--line,rgba(255,255,255,0.1))] text-sm text-[var(--ink,#fff)] transition-[transform,border-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-[var(--accent-text,#03b1fb)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-text,#03b1fb)] motion-safe:active:scale-[0.97] motion-reduce:transition-none"
          >
            {playing ? "❚❚" : "▶"}
          </button>
        </div>
        <div
          ref={scaleRef}
          className="relative col-start-2 row-start-1 flex h-10 items-center"
        >
          <div
            className="absolute inset-x-[7px] h-1 overflow-hidden rounded-full bg-[color-mix(in_srgb,var(--text-muted,#9ca3af)_30%,transparent)]"
            aria-hidden="true"
          >
            <div
              className="h-full origin-left bg-[var(--accent-text,#03b1fb)]"
              style={{ transform: `scaleX(${calendar})` }}
            />
          </div>
          <input
            type="range"
            min={0}
            max={SLIDER_STEPS}
            value={Math.round(calendar * SLIDER_STEPS)}
            onChange={(event) => {
              setPlaying(false);
              const at = Number(event.target.value) / SLIDER_STEPS;
              update(progressOfDate(JOURNEY_START_MS + at * SPAN_MS));
            }}
            aria-label="Journey timeline"
            aria-valuetext={dateLabel}
            className={RANGE}
          />
        </div>
        <div className="col-start-3 row-start-1 flex h-10 items-center justify-end text-sm tabular-nums text-[var(--ink,#fff)]">
          {dateLabel}
        </div>

        <Lanes active={active} labelled={labelled} />

        <div
          className="pointer-events-none relative col-start-2 row-span-5 row-start-1"
          aria-hidden="true"
        >
          <div className="absolute inset-x-[7px] bottom-0 top-5">
            <span
              className="absolute inset-y-0 w-0.5 -translate-x-1/2 bg-[var(--ink,#fff)] opacity-70"
              style={{ left: `${calendar * 100}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
