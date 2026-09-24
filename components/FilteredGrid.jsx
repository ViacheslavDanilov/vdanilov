"use client";

import React, { useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Tab } from "@/components/ui/tab";
import FilterParamSync from "@/components/FilterParamSync";
import { useFilterParam } from "@/lib/useFilterParam";

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
 * @param {number} [props.splitAt] - Put the buttons from this index on a second row
 */
export default function FilteredGrid({
  items,
  options,
  label,
  layoutId,
  gridClassName,
  renderItem,
  empty,
  splitAt,
}) {
  const [activeFilter, setActiveFilter] = useFilterParam("featured", options);

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

  const renderTabs = (tabOptions) =>
    tabOptions.map((option) => (
      <Tab
        key={option.id}
        text={`${option.label} (${counts[option.id]})`}
        icon={option.icon}
        selected={activeFilter === option.id}
        aria-pressed={activeFilter === option.id}
        setSelected={() => setActiveFilter(option.id)}
        layoutId={layoutId}
      />
    ));

  return (
    <>
      <FilterParamSync />

      {splitAt ? (
        <div
          className="flex flex-col items-center gap-2 mb-12"
          role="group"
          aria-label={label}
        >
          <div className="flex flex-wrap justify-center gap-2">
            {renderTabs(options.slice(0, splitAt))}
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {renderTabs(options.slice(splitAt))}
          </div>
        </div>
      ) : (
        <div
          className="flex flex-wrap justify-center gap-2 mb-12"
          role="group"
          aria-label={label}
        >
          {renderTabs(options)}
        </div>
      )}

      <div className={gridClassName} role="list">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
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
