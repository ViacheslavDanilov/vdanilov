"use client";

import React, { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import CyberneticCard from "@/components/ui/cybernetic-card";
import { Tab } from "@/components/ui/tab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExternalLink,
  faBriefcase,
  faBook,
} from "@fortawesome/free-solid-svg-icons";

// Shared bullet point component
const BulletPoint = () => (
  <div
    className="flex-shrink-0 w-2 h-2 rounded-full bg-accent mt-2"
    aria-hidden="true"
  />
);

// Responsibilities list component
const ResponsibilitiesList = ({ items }) => (
  <ul className="space-y-3" role="list">
    {items.map((item, index) => (
      <li key={index} className="flex items-start gap-3">
        <BulletPoint />
        <p className="text-sm text-gray-300 leading-relaxed text-justify">
          {item}
        </p>
      </li>
    ))}
  </ul>
);

// Publications list component
const PublicationsList = ({ publications }) => (
  <ul className="space-y-3" role="list">
    {publications.map((pub, index) => (
      <li key={index} className="flex items-start gap-3">
        <BulletPoint />
        <div className="flex-1">
          <div className="flex items-start gap-2 flex-wrap">
            {pub.type && (
              <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-white/5 text-neutral-300 border border-white/10 flex-shrink-0">
                {pub.type}
              </span>
            )}
            <a
              href={pub.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-accent hover:text-light transition-colors inline-flex items-start gap-2 group flex-1 min-w-0"
              aria-label={`${pub.type}: ${pub.title}`}
            >
              <span className="leading-relaxed break-words">{pub.title}</span>
              <FontAwesomeIcon
                icon={faExternalLink}
                className="w-3 h-3 mt-1 flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </li>
    ))}
  </ul>
);

// Company logo component
const CompanyLogo = ({ basePath, logo, company, className = "" }) => (
  <div
    className={`relative w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden border border-light/10 bg-card/50 ${className}`}
  >
    <Image
      src={`${basePath}${logo}`}
      alt={`${company} logo`}
      fill
      className="object-contain p-2 rounded-2xl"
      sizes="128px"
      priority
    />
  </div>
);

// Job info component
const JobInfo = ({
  title,
  company,
  period,
  duration,
  location,
  className = "",
  centered = false,
}) => (
  <div className={className}>
    <h3 className="text-lg font-bold uppercase tracking-wider text-light">
      {title}
    </h3>
    <p className="text-sm font-medium text-accent uppercase">{company}</p>
    <div
      className={`flex flex-wrap gap-2 text-xs md:text-sm text-gray-400 ${centered ? "justify-center" : ""}`}
    >
      <time dateTime={period.split(" - ")[0]}>{period}</time>
      <span aria-hidden="true">•</span>
      <span>{duration}</span>
    </div>
    <p className="text-sm text-gray-400">{location}</p>
  </div>
);

const ExperienceCard = ({ experience }) => {
  const [activeTab, setActiveTab] = useState(null);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  // Memoize tabs configuration
  const tabs = useMemo(
    () => [
      { id: "responsibilities", label: "Responsibilities", icon: faBriefcase },
      { id: "publications", label: "Publications", icon: faBook },
    ],
    [],
  );

  // Optimized tab click handler with useCallback
  const handleTabClick = useCallback((tabId) => {
    setActiveTab((current) => (current === tabId ? null : tabId));
  }, []);

  // Memoize tab content to prevent unnecessary re-renders
  const tabContent = useMemo(() => {
    if (!activeTab) return null;

    switch (activeTab) {
      case "responsibilities":
        return <ResponsibilitiesList items={experience.responsibilities} />;
      case "publications":
        return <PublicationsList publications={experience.publications} />;
      default:
        return null;
    }
  }, [activeTab, experience.responsibilities, experience.publications]);

  return (
    <article
      className="self-start w-full"
      aria-labelledby={`job-title-${experience.id}`}
    >
      <CyberneticCard className="flex flex-col">
        {/* Mobile Layout */}
        <div className="flex flex-col md:hidden items-center mb-6 space-y-4">
          <CompanyLogo
            basePath={basePath}
            logo={experience.logo}
            company={experience.company}
          />
          <JobInfo
            title={experience.title}
            company={experience.company}
            period={experience.period}
            duration={experience.duration}
            location={experience.location}
            className="text-center space-y-2"
            centered={true}
          />
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex flex-row gap-6 mb-6 items-start">
          <CompanyLogo
            basePath={basePath}
            logo={experience.logo}
            company={experience.company}
          />
          <JobInfo
            title={experience.title}
            company={experience.company}
            period={experience.period}
            duration={experience.duration}
            location={experience.location}
            className="flex-1 space-y-2"
          />
        </div>

        {/* Tabs */}
        <nav
          className="flex items-center justify-center gap-1 mb-6 bg-card/30 rounded-full p-1 border border-light/10"
          role="tablist"
          aria-label="Job information tabs"
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              text={tab.label}
              icon={tab.icon}
              selected={activeTab === tab.id}
              setSelected={() => handleTabClick(tab.id)}
              layoutId={`tab-${experience.id}`}
            />
          ))}
        </nav>

        {/* Tab Content with Accordion Animation */}
        <AnimatePresence initial={false}>
          {activeTab && (
            <motion.div
              key={`content-${experience.id}-${activeTab}`}
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
      </CyberneticCard>
    </article>
  );
};

export default ExperienceCard;
