"use client";

import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { Badge } from "@/components/ui/badge";
import {
  CompanyLogo,
  highlightKeywords,
  BulletPoint,
  CardToggles,
  BulletList,
} from "@/components/ExperienceCard";

const EducationCard = ({ education }) => {
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
      });
    }
    if (education.thesis) {
      t.push({
        id: "thesis",
        label: "Thesis",
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
        return <BulletList items={education.coreCourses} />;
      case "thesis":
        return (
          <div className="flex items-start gap-3">
            <BulletPoint />
            <p className="text-sm text-body leading-relaxed text-justify">
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
      className="self-start w-full animate-card-in motion-reduce:animate-card-fade-in"
    >
      <GlowCard
        className="w-full h-full p-5 gap-4 md:p-6 md:gap-5"
        spotlightSize={300}
      >
        {/* Header: stacked and centred on phones, a row from md */}
        <div className="relative flex flex-col gap-3 md:flex-row md:items-start md:gap-5">
          {education.honors && (
            <Badge
              variant="teal"
              className="absolute top-0 right-0 px-2 py-0.5"
            >
              {education.honors}
            </Badge>
          )}
          <CompanyLogo
            logo={education.logo}
            logoLight={education.logoLight}
            company={education.institution}
            url={education.url}
            brightness={education.logoBrightness}
            priority={education.logoPriority}
            className="self-center md:self-auto"
          />
          <div className="flex flex-col items-center text-center gap-2 md:gap-1.5 md:flex-1 md:items-stretch md:text-left md:-mt-1.5">
            <h3 className="text-md font-bold uppercase tracking-wider text-strong">
              {education.degree}
            </h3>

            <a
              href={education.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative after:absolute after:-inset-x-3 after:-inset-y-1 focus-visible:after:hidden text-sm font-medium text-strong md:hover:text-accent uppercase cursor-pointer transition-colors max-w-full"
              aria-label={`${education.institution} website`}
            >
              {education.institution}
            </a>

            {education.field && (
              <div className="text-sm text-muted font-medium normal-case">
                {education.field}
              </div>
            )}

            <div className="flex flex-wrap gap-2 text-sm text-muted justify-center md:justify-start">
              <span>{education.period}</span>
            </div>
            <p className="text-sm text-muted mb-0">{education.location}</p>
          </div>
        </div>

        {tabs.length > 0 && (
          <CardToggles
            id={education.id}
            label="Education information"
            tabs={tabs}
            activeTab={activeTab}
            onToggle={handleTabClick}
          >
            {tabContent}
          </CardToggles>
        )}
      </GlowCard>
    </article>
  );
};

export default EducationCard;
