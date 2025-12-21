"use client";

import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { GlowCard } from "@/components/ui/glow-card";
import { Tab } from "@/components/ui/tab";
import {
  faBook,
  faGraduationCap,
  faAward,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  CompanyLogo,
  highlightKeywords,
  BulletPoint,
} from "@/components/ExperienceCard";

// Content List Component
const ContentList = ({ items }) => (
  <ul className="space-y-3" role="list">
    {items.map((item, index) => (
      <li key={index} className="flex items-start gap-3">
        <BulletPoint />
        <p className="text-sm text-gray-300 leading-relaxed text-justify">
          {highlightKeywords(item)}
        </p>
      </li>
    ))}
  </ul>
);

const EducationCard = ({
  education,
  enableSpotlight = true,
  enableBorderGlow = true,
  glowColor = "blue",
  spotlightSize = 300,
}) => {
  const [activeTab, setActiveTab] = useState(null);
  const cardRef = useRef(null);

  // Close tab on outside click
  useEffect(() => {
    if (!activeTab) return;
    function handleClick(event) {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setActiveTab(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [activeTab]);

  // Determine tabs based on available data
  const tabs = useMemo(() => {
    const t = [];
    if (education.coreCourses && education.coreCourses.length > 0) {
      t.push({
        id: "coreCourses",
        label: "Core Courses",
        icon: faBook,
      });
    }
    if (education.thesis) {
      t.push({
        id: "thesis",
        label: "Thesis",
        icon: faGraduationCap,
      });
    }
    // Generic fallback or other sections can be added here
    return t;
  }, [education]);

  // Optimized tab click handler
  const handleTabClick = useCallback((tabId) => {
    setActiveTab((current) => (current === tabId ? null : tabId));
  }, []);

  // Memoize tab content
  const tabContent = useMemo(() => {
    if (!activeTab) return null;

    switch (activeTab) {
      case "coreCourses":
        return <ContentList items={education.coreCourses} />;
      case "thesis":
        return (
          <div className="flex items-start gap-3">
            <BulletPoint />
            <p className="text-sm text-gray-300 leading-relaxed text-justify">
              <span className="font-semibold text-accent">Thesis: </span>
              {highlightKeywords(education.thesis)}
            </p>
          </div>
        );
      default:
        return null;
    }
  }, [activeTab, education.coreCourses, education.thesis]);

  return (
    <article
      ref={cardRef}
      className="self-start w-full"
      aria-labelledby={`edu-title-${education.id}`}
    >
      <GlowCard
        glowColor={glowColor}
        customSize={true}
        className="w-full h-full p-5"
        enableSpotlight={enableSpotlight}
        enableBorderGlow={enableBorderGlow}
        spotlightSize={spotlightSize}
      >
        {/* Mobile Layout */}
        <div className="flex flex-col md:hidden mb-4 space-y-3 relative">
          {/* Honors Badge - Mobile (absolute positioning) */}
          {education.honors && (
            <span className="absolute top-0 right-0 px-3 py-1 text-xs font-medium rounded-full border inline-flex items-center gap-1.5 bg-teal-600/20 text-teal-400 border-teal-600/40">
              <FontAwesomeIcon
                icon={faAward}
                className="w-3 h-3"
                style={{ width: "0.75rem", height: "0.75rem" }}
              />
              {education.honors}
            </span>
          )}
          <div className="flex justify-center">
            <CompanyLogo
              logo={education.logo}
              company={education.institution}
              url={education.url}
              brightness={education.logoBrightness}
            />
          </div>

          <div className="text-center flex flex-col items-center gap-2">
            {/* Degree Only (Badge is absolute) */}
            <h3 className="text-md font-bold uppercase tracking-wider text-light">
              {education.degree}
            </h3>

            {/* University */}
            <a
              href={education.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-light md:hover:text-accent uppercase cursor-pointer transition-colors"
              aria-label={`${education.institution} website`}
            >
              {education.institution}
            </a>

            {/* Field */}
            {education.field && (
              <div className="text-sm text-gray-400 font-medium normal-case">
                {education.field}
              </div>
            )}

            {/* Metadata */}
            <div className="flex flex-wrap gap-2 text-sm text-gray-400 justify-center">
              <time dateTime={education.period.split(" - ")[0]}>
                {education.period}
              </time>
            </div>
            <p className="text-sm text-gray-400 mb-0">{education.location}</p>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex flex-row gap-6 mb-4 items-start relative">
          {/* Honors Badge - Desktop (absolute positioning) */}
          {education.honors && (
            <span className="absolute top-0 right-0 px-3 py-1 text-xs font-medium rounded-full border inline-flex items-center gap-1.5 bg-teal-600/20 text-teal-400 border-teal-600/40">
              <FontAwesomeIcon
                icon={faAward}
                className="w-3 h-3"
                style={{ width: "0.75rem", height: "0.75rem" }}
              />
              {education.honors}
            </span>
          )}
          <CompanyLogo
            logo={education.logo}
            company={education.institution}
            url={education.url}
            brightness={education.logoBrightness}
          />
          <div className="flex-1 flex flex-col gap-2">
            {/* Row 1: Degree */}
            <h3 className="text-md font-bold uppercase tracking-wider text-light">
              {education.degree}
            </h3>

            {/* Row 2: University */}
            <a
              href={education.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-light md:hover:text-accent uppercase cursor-pointer transition-colors"
              aria-label={`${education.institution} website`}
            >
              {education.institution}
            </a>

            {/* Row 3: Field */}
            {education.field && (
              <div className="text-sm text-gray-400 font-medium normal-case">
                {education.field}
              </div>
            )}

            {/* Row 4: Metadata */}
            <div className="flex flex-wrap gap-2 text-sm text-gray-400">
              <time dateTime={education.period.split(" - ")[0]}>
                {education.period}
              </time>
            </div>
            <p className="text-sm text-gray-400 mb-0">{education.location}</p>
          </div>
        </div>

        {/* Tabs - Only show if there are tabs */}
        {tabs.length > 0 && (
          <>
            <nav
              className="flex items-center justify-center gap-1 mb-4 bg-card/30 rounded-full p-1 border border-light/10"
              role="tablist"
              aria-label="Education information tabs"
            >
              {tabs.map((tab) => (
                <Tab
                  key={tab.id}
                  text={tab.label}
                  icon={tab.icon}
                  selected={activeTab === tab.id}
                  setSelected={() => handleTabClick(tab.id)}
                  layoutId={`tab-${education.id}`}
                />
              ))}
            </nav>

            {/* Tab Content with Accordion Animation */}
            <AnimatePresence initial={false}>
              {activeTab && (
                <motion.div
                  key={`content-${education.id}-${activeTab}`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                  role="tabpanel"
                  aria-labelledby={`tab-${activeTab}`}
                >
                  <div className="py-2">{tabContent}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </GlowCard>
    </article>
  );
};

export default EducationCard;
