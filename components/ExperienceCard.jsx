"use client";

import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from "react";
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

// --- CONFIGURATION CONSTANTS ---
const COMPANY_URLS = {
  Symfa: "https://symfa.com/",
  "Pompeu Fabra University": "https://www.upf.edu/en/",
  Quantori: "https://quantori.com/",
  "Politecnico di Milano": "https://www.polimi.it/en",
};

// --- COMPONENTS ---
// Shared bullet point component
const BulletPoint = () => (
  <div
    className="flex-shrink-0 w-2 h-2 rounded-full bg-accent mt-2"
    aria-hidden="true"
  />
);

// Centralized highlight config (simplified)
const HIGHLIGHT_KEYWORDS = [
  "Institute of Photonic Sciences",
  "Vall d'Hebron Hospital",
  "AmTrust",
  "CNA",
  "Plateau Group",
  "Symfa",
  "SafeICP",
  "Pompeu Fabra University",
  "Quantori",
  "Boehringer Ingelheim",
  "Volastra Therapeutics",
  "Beth Israel Deaconess Medical Center",
  "Politecnico di Milano",
  "Institute for Image-Guided Surgery",
  "HyperSIGHT",
  "LASER OPTIMAL",
];

const HIGHLIGHT_CLASS =
  "inline-block bg-accent/10 text-accent font-semibold px-2 py-0.75 rounded-xl";

// Helper to highlight keywords in a string
function highlightKeywords(text) {
  if (typeof text !== "string") return text;
  let result = [text];
  HIGHLIGHT_KEYWORDS.forEach((word) => {
    result = result.flatMap((part) =>
      typeof part === "string" && part.includes(word)
        ? part.split(word).flatMap((seg, i, arr) =>
            i < arr.length - 1
              ? [
                  seg,
                  <span key={word + i} className={HIGHLIGHT_CLASS}>
                    {word}
                  </span>,
                ]
              : [seg],
          )
        : [part],
    );
  });
  return result;
}

// Responsibilities list component
const ResponsibilitiesList = ({ items }) => (
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
const CompanyLogo = ({ basePath, logo, company, url, className = "" }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className={`relative w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden border border-light/10 bg-card/50 cursor-pointer ${className}`}
    aria-label={`${company} website`}
  >
    <Image
      src={`${basePath}${logo}`}
      alt={`${company} logo`}
      fill
      className="object-contain p-2 rounded-2xl"
      sizes="128px"
      priority
    />
  </a>
);

// Job info component
const JobInfo = ({
  title,
  company,
  url,
  period,
  duration,
  location,
  className = "",
  centered = false,
}) => (
  <div className={className}>
    <h3 className="text-lg font-bold uppercase tracking-wider text-light mb-2">
      {title}
    </h3>
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm font-medium text-accent uppercase cursor-pointer mb-2 inline-block"
      aria-label={`${company} website`}
    >
      {company}
    </a>
    <div
      className={`flex flex-wrap gap-2 text-xs md:text-sm text-gray-400 mb-2 ${centered ? "justify-center" : ""}`}
    >
      <time dateTime={period.split(" - ")[0]}>{period}</time>
      <span aria-hidden="true">•</span>
      <span>{duration}</span>
    </div>
    <p className="text-sm text-gray-400 mb-0">{location}</p>
  </div>
);

const ExperienceCard = ({ experience }) => {
  const [activeTab, setActiveTab] = useState(null);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
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
      ref={cardRef}
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
            url={COMPANY_URLS[experience.company]}
          />
          <JobInfo
            title={experience.title}
            company={experience.company}
            url={COMPANY_URLS[experience.company]}
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
            url={COMPANY_URLS[experience.company]}
          />
          <JobInfo
            title={experience.title}
            company={experience.company}
            url={COMPANY_URLS[experience.company]}
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
