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
import { GlowCard } from "@/components/ui/glow-card";
import { Tab } from "@/components/ui/tab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExternalLink,
  faBriefcase,
  faBook,
  faFlask,
} from "@fortawesome/free-solid-svg-icons";

// --- CONFIGURATION CONSTANTS ---
const COMPANY_URLS = {
  Symfa: "https://symfa.com/",
  "Pompeu Fabra University": "https://www.upf.edu/en/",
  Quantori: "https://quantori.com/",
  "Politecnico di Milano": "https://www.polimi.it/en",
  "Intelerad Medical Systems": "https://www.intelerad.com/",
  "Tomsk Polytechnic University": "https://tpu.ru/en/",
  SIBUR: "https://www.sibur.ru/en/",
  "Sorbonne University": "https://www.sorbonne-universite.fr/en",
  "University of Leeds": "https://www.leeds.ac.uk/",
  "Technical University of Madrid": "https://www.upm.es/",
  "University of Trento": "https://www.unitn.it/en",
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
  "Intelerad Medical Systems",
  "Biospective",
  "Bristol Myers Squibb",
  "CLOVA OCR",
  "CRAFT",
  "Tomsk Polytechnic University",
  "Boston Children's Hospital",
  "Incom Group",
  "Kemerovo Cardiology Center",
  "SIBUR",
  "Siemens S300/400",
  "Yokogawa Centum",
  "Numerik PS2000",
  "Remicont",
  "Sorbonne University",
  "Neural Connectivity and Plasticity",
  "Prof. Dmitrii Todorov",
  "Prof. Olivier Couture",
  "Prof. Lori Bridal",
  "University of Leeds",
  "Prof. Alejandro F. Frangi",
  "VAEs",
  "GANs",
  "Technical University of Madrid",
  "Prof. Maria J. Ledesma-Carbayo",
  "University of Trento",
  "Prof. Farid Melgani",
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
    {publications.map((pub) => (
      <li key={pub.url} className="flex items-start gap-3">
        <BulletPoint />
        <div className="flex-1">
          {pub.type && (
            <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-white/5 text-neutral-300 border border-white/10 mr-2 align-top">
              {pub.type}
            </span>
          )}
          <a
            href={pub.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-accent hover:text-light transition-colors inline gap-2 group align-top"
            aria-label={`${pub.type}: ${pub.title}`}
          >
            <span className="leading-relaxed break-words">{pub.title}</span>
            <FontAwesomeIcon
              icon={faExternalLink}
              className="w-3 h-3 ml-1 opacity-70 group-hover:opacity-100 transition-opacity inline"
              style={{ width: "0.75rem", height: "0.75rem" }}
              aria-hidden="true"
            />
          </a>
        </div>
      </li>
    ))}
  </ul>
);

// Company logo component
const CompanyLogo = ({ logo, company, url, className = "" }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className={`relative w-20 h-20 flex-shrink-0 rounded-2xl overflow-hidden border border-light/10 bg-card/50 cursor-pointer ${className}`}
    aria-label={`${company} website`}
  >
    <Image
      src={logo}
      alt={`${company} logo`}
      width={512}
      height={512}
      className="object-contain p-2 rounded-2xl w-full h-full"
      sizes="512px"
      quality={100}
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
    <h3 className="text-md font-bold uppercase tracking-wider text-light mb-2">
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

const ExperienceCard = ({
  experience,
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

  // Category badge styling - soft pastel colors matching mockup
  const getCategoryStyle = (category) => {
    if (category === "research") {
      return "bg-accent/7 text-accent/80 border-accent/10";
    }
    return "bg-accent/7 text-accent/80 border-accent/10";
    // return "bg-blue-400/[0.1] text-blue-400/90 border-blue-500/20";
    // return "bg-emerald-500/[0.125] text-emerald-400/80 border-emerald-500/20";
  };

  const getCategoryLabel = (category) => {
    return category === "research" ? "Research" : "Industry";
  };

  return (
    <article
      ref={cardRef}
      className="self-start w-full"
      aria-labelledby={`job-title-${experience.id}`}
    >
      <GlowCard
        glowColor={glowColor}
        customSize={true}
        className="w-full h-full p-6"
        enableSpotlight={enableSpotlight}
        enableBorderGlow={enableBorderGlow}
        spotlightSize={spotlightSize}
      >
        {/* Mobile Layout */}
        <div className="flex flex-col md:hidden mb-6 space-y-4 relative">
          {/* Category Badge - Mobile (absolute positioning) */}
          {experience.category && (
            <span
              className={`absolute top-0 right-0 px-3 py-1 text-xs font-medium rounded-full border inline-flex items-center gap-1.5 ${getCategoryStyle(experience.category)}`}
            >
              <FontAwesomeIcon
                icon={
                  experience.category === "research" ? faFlask : faBriefcase
                }
                className="w-3 h-3"
                style={{ width: "0.75rem", height: "0.75rem" }}
              />
              {getCategoryLabel(experience.category)}
            </span>
          )}
          <div className="flex justify-center">
            <CompanyLogo
              logo={experience.logo}
              company={experience.company}
              url={COMPANY_URLS[experience.company]}
            />
          </div>
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
            logo={experience.logo}
            company={experience.company}
            url={COMPANY_URLS[experience.company]}
          />
          <div className="flex-1 flex items-start justify-between gap-4">
            <JobInfo
              title={experience.title}
              company={experience.company}
              url={COMPANY_URLS[experience.company]}
              period={experience.period}
              duration={experience.duration}
              location={experience.location}
              className="space-y-2"
            />
            {/* Category Badge - Desktop */}
            {experience.category && (
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full border flex-shrink-0 inline-flex items-center gap-1.5 ${getCategoryStyle(experience.category)}`}
              >
                <FontAwesomeIcon
                  icon={
                    experience.category === "research" ? faFlask : faBriefcase
                  }
                  className="w-3 h-3"
                  style={{ width: "0.75rem", height: "0.75rem" }}
                />
                {getCategoryLabel(experience.category)}
              </span>
            )}
          </div>
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
              transition={{
                duration: 0.25,
                // ease: [0.25, 0.1, 0.25, 1],
                ease: "easeInOut",
              }}
              className="overflow-hidden"
              role="tabpanel"
              aria-labelledby={`tab-${activeTab}`}
            >
              <div className="py-2">{tabContent}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </GlowCard>
    </article>
  );
};

export default ExperienceCard;
