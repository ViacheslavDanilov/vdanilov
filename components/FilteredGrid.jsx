"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { Tab } from "@/components/ui/tab";
import FilterParamSync from "@/components/FilterParamSync";
import { useFilterParam } from "@/lib/useFilterParam";

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const matches = (item, filter) =>
  filter === "all" ||
  (filter === "featured" ? item.featured : item.category === filter);

/**
 * Filter buttons with counts over an animated grid of cards; the filter lives in ?filter=
 * @param {Array} props.items - Entries with id, featured and category
 * @param {Array} props.options - Filter buttons: { id, label, icon }; "featured" and "all" are special
 * @param {string} props.label - Accessible name of the button group
 * @param {string} props.layoutId - Shared layout id for the selected-button highlight
 * @param {string} props.gridClassName - Classes for the grid of cards
 * @param {Function} props.renderItem - (item, index) => card
 * @param {React.ReactNode} props.empty - Shown when no entry matches
 */
export default function FilteredGrid({
  items,
  options,
  label,
  layoutId,
  gridClassName,
  renderItem,
  empty,
}) {
  const [activeFilter, setActiveFilter] = useFilterParam("featured", options);

  // Cards mounted in the first 300 ms get the CSS entrance, later ones get Motion's
  const [firstEntrance, setFirstEntrance] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setFirstEntrance(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const filteredItems = useMemo(
    () => items.filter((item) => matches(item, activeFilter)),
    [items, activeFilter],
  );

  const counts = useMemo(
    () =>
      Object.fromEntries(
        options.map((option) => [
          option.id,
          items.filter((item) => matches(item, option.id)).length,
        ]),
      ),
    [items, options],
  );

  // Below md: one scrolling row, a fade at each edge with chips beyond it
  const railRef = useRef(null);
  const picked = useRef(false);
  const [edges, setEdges] = useState({ start: false, end: true });

  const readEdges = useCallback(() => {
    const rail = railRef.current;
    const { firstElementChild: first, lastElementChild: last } = rail;
    const start = rail.scrollLeft > first.offsetLeft + 1;
    const end =
      last.offsetLeft + last.offsetWidth >
      rail.scrollLeft + rail.clientWidth + 1;
    setEdges((prev) =>
      prev.start === start && prev.end === end ? prev : { start, end },
    );
  }, []);

  useEffect(() => {
    readEdges();
    const observer = new ResizeObserver(readEdges);
    observer.observe(railRef.current);
    for (const chip of railRef.current.children) observer.observe(chip);
    return () => observer.disconnect();
  }, [readEdges]);

  // Centre the selected chip in the row, sliding only after a click
  useEffect(() => {
    const smooth = picked.current;
    picked.current = false;
    const rail = railRef.current;
    const chip = rail.querySelector('[aria-pressed="true"]');
    if (!chip || rail.scrollWidth <= rail.clientWidth) return;
    rail.scrollTo({
      left: chip.offsetLeft - (rail.clientWidth - chip.offsetWidth) / 2,
      behavior: smooth && !prefersReducedMotion() ? "smooth" : "auto",
    });
  }, [activeFilter]);

  // Bring a chip reached by keyboard clear of the edge fades
  const revealFocused = (event) => {
    if (event.target.matches(":focus-visible"))
      event.target.scrollIntoView({ block: "nearest", inline: "nearest" });
  };

  const showMore = () =>
    railRef.current.scrollBy({
      left: railRef.current.clientWidth * 0.7,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });

  const edgeFade = (on, width) => (on ? width : "0px");
  // At the end the chips fade out before the arrow and leave its spot clear
  const railMask = `linear-gradient(to right, transparent, #000 ${edgeFade(edges.start, "2rem")}, #000 calc(100% - ${edgeFade(edges.end, "4rem")}), transparent calc(100% - ${edgeFade(edges.end, "2.5rem")}))`;
  // From 50rem the chips wrap, balanced, centred on a 52rem measure

  return (
    <>
      <FilterParamSync />

      <div className="relative -mx-6 mb-12">
        <div
          ref={railRef}
          onScroll={readEdges}
          onFocus={revealFocused}
          style={{ "--rail-mask": railMask }}
          className="flex gap-x-2 px-6 scroll-pl-8 scroll-pr-16 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden max-md:[mask-image:var(--rail-mask)] min-[50rem]:px-[max(0px,calc((100%_-_52rem)/2))] md:block md:text-center md:text-balance md:overflow-visible"
          role="group"
          aria-label={label}
        >
          {options.map((option) => (
            <Tab
              key={option.id}
              outlined
              text={`${option.label} (${counts[option.id]})`}
              icon={option.icon}
              selected={activeFilter === option.id}
              aria-pressed={activeFilter === option.id}
              setSelected={() => {
                picked.current = true;
                setActiveFilter(option.id);
              }}
              layoutId={layoutId}
            />
          ))}
        </div>
        {edges.end && (
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            data-rail-next
            onClick={showMore}
            className="absolute right-0.5 top-0 z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-light transition-[scale] motion-safe:active:scale-95 md:hidden"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-card">
              <svg
                viewBox="0 0 20 20"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 4l6 6-6 6" />
              </svg>
            </span>
          </button>
        )}
      </div>

      <div className={gridClassName} role="list">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              className={
                firstEntrance
                  ? "animate-card-in motion-reduce:animate-card-fade-in"
                  : undefined
              }
              initial={firstEntrance ? false : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              role="listitem"
            >
              {renderItem(item, index)}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredItems.length === 0 && empty}
    </>
  );
}
