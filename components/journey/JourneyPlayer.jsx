"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "motion/react";
import Counters from "@/components/journey/Counters";
import {
  JOURNEY_END_MS,
  JOURNEY_START_MS,
  OUTRO_START,
  PLACES,
  STOPS,
  STOP_STARTS,
  TOTALS,
  countsAt,
  journeyAt,
  progressOfDate,
  roleOf,
  stopPeriod,
  formatMonth,
} from "@/lib/journey";
import {
  playLanding,
  playLink,
  playTakeoff,
  playOutro,
  unlockSound,
} from "@/components/journey/sound";

const DURATION_MS = 80000;
const MAX_STEP_MS = 100;
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";
const WIDE_QUERY = "(min-width: 768px)";
const SOUND_KEY = "journey-sound";

const JourneyMap = dynamic(() => import("@/components/journey/JourneyMap"), {
  ssr: false,
});
const MIN_LABEL_GAP_PX = 36;
const EASE_OUT = [0.23, 1, 0.32, 1];
const SLIDER_STEPS = 4000;
// Lands a jump just after the stay starts, once the tail has pulled in
const JUMP_INTO_STAY = 0.004;

const START_YEAR = new Date(JOURNEY_START_MS).getUTCFullYear();
const END_YEAR = new Date(JOURNEY_END_MS).getUTCFullYear();
const YEARS = [
  { year: START_YEAR, at: 0 },
  ...Array.from({ length: END_YEAR - START_YEAR }, (_, i) => {
    const year = START_YEAR + 1 + i;
    return { year, at: progressOfDate(Date.UTC(year, 0, 1)) };
  }),
];
// Arrow keys step from stop to stop, from the very start to the final view
const STEPS = [0, ...STOP_STARTS.slice(1).map((at) => at + JUMP_INTO_STAY), 1];

// The last month of the story reads as today
const dateText = (ms) => (ms >= JOURNEY_END_MS ? "Present" : formatMonth(ms));

const SHORT_ORG = { "Intelerad Medical Systems": "Intelerad" };

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

const ROUND_BUTTON =
  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--line,rgba(255,255,255,0.1))] text-[var(--ink,#fff)] transition-[transform,border-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-[var(--accent-text,#03b1fb)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-text,#03b1fb)] motion-safe:active:scale-[0.97] motion-reduce:transition-none";

const useMediaQuery = (media) => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const query = window.matchMedia(media);
    const update = () => setMatches(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [media]);
  return matches;
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

const readSound = () => {
  try {
    return window.localStorage.getItem(SOUND_KEY) !== "off";
  } catch {
    return true;
  }
};

const writeSound = (on) => {
  try {
    window.localStorage.setItem(SOUND_KEY, on ? "on" : "off");
  } catch {}
};

const SpeakerIcon = ({ on }) => (
  <svg viewBox="0 0 24 24" className="size-4" fill="none" aria-hidden="true">
    <path
      d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {on ? (
      <path
        d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    ) : (
      <path
        d="M16 9.5l5 5M21 9.5l-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    )}
  </svg>
);

const PlayIcon = ({ playing }) =>
  playing ? (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" />
      <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      <path d="M7 4.5v15l12.5-7.5z" fill="currentColor" />
    </svg>
  );

export default function JourneyPlayer({ children }) {
  const reducedMotion = useMediaQuery(REDUCED_QUERY);
  const wide = useMediaQuery(WIDE_QUERY);
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [near, setNear] = useState(false);
  const [sound, setSound] = useState(true);
  const [hover, setHover] = useState(null);
  const [seenOutro, setSeenOutro] = useState(false);
  const progressRef = useRef(0);
  const containerRef = useRef(null);
  const scaleRef = useRef(null);
  const rangeRef = useRef(null);
  const startedRef = useRef(false);
  const previousRef = useRef(null);
  const scaleWidth = useWidth(scaleRef);

  const update = useCallback((value) => {
    progressRef.current = value;
    setProgress(value);
  }, []);

  useEffect(() => setSound(readSound()), []);

  // Browsers keep audio locked until the first click or key press on the page
  useEffect(() => {
    if (!sound || !wide) return;
    const unlock = () => unlockSound();
    const options = { once: true, capture: true };
    document.addEventListener("pointerdown", unlock, options);
    document.addEventListener("keydown", unlock, options);
    return () => {
      document.removeEventListener("pointerdown", unlock, options);
      document.removeEventListener("keydown", unlock, options);
    };
  }, [sound, wide]);

  useEffect(() => {
    if (reducedMotion) {
      setPlaying(false);
      update(1);
    }
  }, [reducedMotion, update]);

  // Fetch the map code a little before the block scrolls into view
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setNear(true),
      { rootMargin: "600px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || reducedMotion) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          !startedRef.current &&
          window.matchMedia(WIDE_QUERY).matches &&
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
      const next =
        progressRef.current + Math.min(now - last, MAX_STEP_MS) / DURATION_MS;
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

  // Cues play only while the story runs on its own, never while scrubbing
  useEffect(() => {
    const previous = previousRef.current;
    previousRef.current = state;
    if (!previous || !playing || !sound) return;
    if (previous.phase === "stay" && state.phase === "fly") playTakeoff();
    if (previous.phase === "fly" && state.phase === "stay") playLanding();
    if (state.reveal && state.reveal !== previous.reveal) playLink();
    if (previous.phase !== "outro" && state.phase === "outro") playOutro();
  });

  const stop = STOPS[state.stopIndex];
  const place = PLACES[stop.place];
  const role = roleOf(stop);
  const outro = state.phase === "outro";
  if (outro && !seenOutro) setSeenOutro(true);
  const dateLabel = dateText(state.dateMs);
  const counts = countsAt(state);

  const labelled = useMemo(() => {
    let lastLabelled = -1;
    return YEARS.filter(({ at }) => {
      if ((at - lastLabelled) * scaleWidth < MIN_LABEL_GAP_PX) return false;
      lastLabelled = at;
      return true;
    });
  }, [scaleWidth]);

  const togglePlay = () => {
    if (progressRef.current >= 1) update(0);
    setPlaying((value) => !value);
  };

  const toggleSound = () => {
    const next = !sound;
    if (next) unlockSound();
    setSound(next);
    writeSound(next);
  };

  const seekTo = (value) => {
    setPlaying(false);
    update(value);
  };

  const jumpTo = (index) => seekTo(STOP_STARTS[index] + JUMP_INTO_STAY);

  const hoverAt = (event) => {
    const box = scaleRef.current.getBoundingClientRect();
    const at = Math.min(1, Math.max(0, (event.clientX - box.left) / box.width));
    const target = journeyAt(at);
    const city = PLACES[STOPS[target.stopIndex].place].city;
    setHover({ at, text: `${city} · ${dateText(target.dateMs)}` });
  };

  return (
    <div ref={containerRef} className="flex w-full flex-col gap-6">
      <div className="md:hidden">
        <Counters animate={false} />
      </div>
      {children}

      <div className="mx-auto hidden w-full max-w-[max(52rem,calc((100svh-19.75rem)*16/9))] flex-col gap-3 md:flex">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[var(--line,rgba(255,255,255,0.1))] bg-[var(--surface,#151a1f)]">
          {wide && near && (
            <JourneyMap
              progress={progress}
              onJump={jumpTo}
              onSeek={seekTo}
              onPicked={() => rangeRef.current?.focus()}
            />
          )}
          <div className="pointer-events-none absolute right-0 top-0 rounded-tr-2xl bg-[radial-gradient(ellipse_at_top_right,var(--surface,#151a1f)_45%,transparent_72%)] pb-12 pl-16 pr-6 pt-5">
            <Counters counts={counts} animate={!reducedMotion} compact />
          </div>
          <div className="absolute bottom-4 left-4 w-[22rem] rounded-xl border border-[var(--line,rgba(255,255,255,0.1))] bg-[color-mix(in_srgb,var(--bg,#0a0e14)_82%,transparent)] backdrop-blur">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                key={outro ? "outro" : state.stopIndex}
                className="px-4 pt-4"
                initial={{ opacity: 0, y: reducedMotion ? 0 : 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22, ease: EASE_OUT }}
              >
                {outro ? (
                  <>
                    <div className="text-xs text-[var(--text-muted,#9ca3af)]">
                      {START_YEAR} – Present
                    </div>
                    <div className="text-lg font-semibold text-[var(--ink,#fff)]">
                      {TOTALS.cities} cities, {TOTALS.countries} countries
                    </div>
                    <div className="text-sm text-[var(--text,#d1d5db)]">
                      Select a city on the map to go back to it
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-xs text-[var(--text-muted,#9ca3af)]">
                      {stopPeriod(stop)}
                    </div>
                    <div className="text-lg font-semibold text-[var(--ink,#fff)]">
                      {place.city}, {place.country}{" "}
                      <span aria-hidden="true">{place.flag}</span>
                    </div>
                    {role && (
                      <>
                        <div className="text-sm text-[var(--text,#d1d5db)]">
                          {role.role}
                        </div>
                        <div className="text-sm text-[var(--text-muted,#9ca3af)]">
                          {role.org}
                        </div>
                      </>
                    )}
                  </>
                )}
              </motion.div>
            </AnimatePresence>
            {state.remote.length > 0 && (
              <ul className="mx-4 mt-3 flex flex-col gap-1 border-t border-[var(--line,rgba(255,255,255,0.1))] pt-3 text-sm">
                {state.remote.map((role) => (
                  <li key={role.org} className="flex items-baseline gap-2">
                    <span className="text-xs uppercase tracking-wider text-[var(--accent-text,#03b1fb)]">
                      Remote
                    </span>
                    <span className="text-[var(--ink,#fff)]">
                      {SHORT_ORG[role.org] ?? role.org}
                    </span>
                    <span className="text-[var(--text-muted,#9ca3af)]">
                      {PLACES[role.place].city}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-2 flex flex-wrap gap-x-4 px-4 pb-4 text-sm">
              <Link
                href="/experience"
                className="text-[var(--accent-text,#03b1fb)] hover:underline"
              >
                {outro ? "Explore experience" : "See on Experience"}
              </Link>
              {seenOutro && !outro && !playing && (
                <button
                  type="button"
                  onClick={() => {
                    seekTo(1);
                    // The button unmounts with the city view, so focus goes to the timeline
                    rangeRef.current?.focus();
                  }}
                  className="text-[var(--accent-text,#03b1fb)] hover:underline"
                >
                  Back to the whole map
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={playing ? "Pause" : "Play"}
            className={ROUND_BUTTON}
          >
            <PlayIcon playing={playing} />
          </button>
          <button
            type="button"
            onClick={toggleSound}
            aria-label="Sound"
            aria-pressed={sound}
            className={ROUND_BUTTON}
          >
            <SpeakerIcon on={sound} />
          </button>
          <div className="relative mx-2 flex-1">
            <div
              ref={scaleRef}
              className="relative flex h-10 items-center"
              onPointerMove={hoverAt}
              onPointerLeave={() => setHover(null)}
            >
              <div
                className="absolute inset-x-[7px] h-1 overflow-hidden rounded-full bg-[color-mix(in_srgb,var(--text-muted,#9ca3af)_30%,transparent)]"
                aria-hidden="true"
              >
                <div
                  className="h-full origin-left bg-[var(--accent-text,#03b1fb)]"
                  style={{ transform: `scaleX(${progress})` }}
                />
              </div>
              <div
                className="pointer-events-none absolute inset-x-[7px] h-1"
                aria-hidden="true"
              >
                {STOPS.map((s, i) => (
                  <span
                    key={i}
                    className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full ${s.kind === "home" ? "size-1.5" : "size-1"} ${STOP_STARTS[i] <= progress ? "bg-[var(--bg,#0a0e14)]" : "bg-[var(--text-muted,#9ca3af)]"}`}
                    style={{ left: `${STOP_STARTS[i] * 100}%` }}
                  />
                ))}
                <span
                  className="absolute top-1/2 h-2.5 w-px -translate-y-1/2 bg-[var(--text-muted,#9ca3af)]"
                  style={{ left: `${OUTRO_START * 100}%` }}
                />
              </div>
              <input
                ref={rangeRef}
                type="range"
                min={0}
                max={SLIDER_STEPS}
                value={Math.round(progress * SLIDER_STEPS)}
                onChange={(event) => {
                  setPlaying(false);
                  update(Number(event.target.value) / SLIDER_STEPS);
                }}
                onKeyDown={(event) => {
                  const forward =
                    event.key === "ArrowRight" || event.key === "ArrowUp";
                  const back =
                    event.key === "ArrowLeft" || event.key === "ArrowDown";
                  if (!forward && !back) return;
                  event.preventDefault();
                  const at = progressRef.current;
                  const next = forward
                    ? STEPS.find((step) => step > at + JUMP_INTO_STAY)
                    : STEPS.findLast((step) => step < at - JUMP_INTO_STAY);
                  seekTo(next ?? (forward ? 1 : 0));
                }}
                aria-label="Journey timeline"
                aria-valuetext={`${dateLabel}, ${place.city}`}
                className={RANGE}
              />
              {hover && (
                <div
                  className="pointer-events-none absolute bottom-full mb-1 -translate-x-1/2 whitespace-nowrap rounded-md border border-[var(--line,rgba(255,255,255,0.1))] bg-[var(--surface,#151a1f)] px-2 py-0.5 text-xs text-[var(--ink,#fff)]"
                  style={{ left: `${hover.at * 100}%` }}
                  aria-hidden="true"
                >
                  {hover.text}
                </div>
              )}
            </div>
            <div
              className="relative mx-[7px] h-5 text-xs tabular-nums text-[var(--text-muted,#9ca3af)]"
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
          </div>
          <div className="flex h-10 w-20 items-center justify-end text-sm tabular-nums text-[var(--ink,#fff)]">
            {dateLabel}
          </div>
        </div>
      </div>
    </div>
  );
}
