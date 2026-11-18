"use client";

import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { GlowCard } from "@/components/ui/glow-card";
import { Badge } from "@/components/ui/badge";
import NowrapTail from "@/components/ui/nowrap-tail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/lib/utils";

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
  "University of Trento": "https://www.unitn.it/",
  "University of Groningen": "https://www.rug.nl/",
  "Sapienza University of Rome": "https://www.uniroma1.it/en",
  "University of Pretoria": "https://www.up.ac.za/",
};

// --- COMPONENTS ---
// Shared bullet point component
export const BulletPoint = () => (
  <div
    className="flex-shrink-0 w-2 h-2 rounded-full bg-accent mt-2"
    aria-hidden="true"
  />
);

// Centralized highlight config (simplified)
const HIGHLIGHT_KEYWORDS = [
  "Institute of Photonic Sciences",
  "Vall d'Hebron",
  "Huawei's",
  "Huawei",
  "AmTrust",
  "CNA",
  "Lumos Insurance",
  "GNP",
  "AutoGluon",
  "SHAP",
  "FastAPI",
  "SafeICP",
  "Pompeu Fabra University",
  "Quantori",
  "Boehringer Ingelheim",
  "Volastra Therapeutics",
  "Beth Israel Deaconess",
  "Beth Israel",
  "Politecnico di Milano",
  "Institute of Image-Guided Surgery",
  "Cardinale Panico Hospital",
  "HyperSIGHT",
  "LASER OPTIMAL",
  "Intelerad Medical Systems",
  "Biospective",
  "Bristol Myers Squibb",
  "CLOVA OCR",
  "CRAFT",
  "Tomsk Polytechnic University",
  "Boston Children's Hospital",
  "Kemerovo Cardiology Center",
  "SIBUR",
  "Siemens S300/400",
  "Yokogawa Centum",
  "Numerik PS2000",
  "Remicont",
  "Sorbonne University",
  "Laboratory of Biomedical Imaging",
  "Prof. Dmitrii Todorov",
  "Prof. Lori Bridal",
  "University of Leeds",
  "Prof. Alejandro Frangi",
  "VAEs",
  "GANs",
  "Technical University of Madrid",
  "Prof. Maria Ledesma-Carbayo",
  "University of Trento",
  "Prof. Farid Melgani",
  "Prof. Olawande Daramola",
  "Prof. George Azzopardi",
  "Bernoulli Institute",
  "House of Connections",
  "Sapienza University of Rome",
  "Prof. Irene Amerini",
  "ALCOR Lab",
  "BCN MedTech",
];

const HIGHLIGHT_CLASS =
  "inline-block bg-accent/10 text-accent font-semibold px-2 py-0.75 rounded-xl";
const SOFT_HIGHLIGHT_CLASS = "text-accent font-semibold";

// Helper to highlight keywords in a string; soft drops the chip
export function highlightKeywords(text, soft = false) {
  if (typeof text !== "string") return text;
  let result = [text];
  HIGHLIGHT_KEYWORDS.forEach((word) => {
    result = result.flatMap((part) =>
      typeof part === "string" && part.includes(word)
        ? part.split(word).flatMap((seg, i, arr) =>
            i < arr.length - 1
              ? [
                  seg,
                  <span
                    key={word + i}
                    className={soft ? SOFT_HIGHLIGHT_CLASS : HIGHLIGHT_CLASS}
                  >
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
        <p className="text-sm text-body leading-relaxed text-justify">
          {highlightKeywords(item, true)}
        </p>
      </li>
    ))}
  </ul>
);

// Pages of this site open in place; documents and other sites open in a new tab
const isSitePage = (url) => url.startsWith("/") && !url.endsWith(".pdf");

// Links list component
const LinksList = ({ links }) => (
  <ul className="space-y-3" role="list">
    {links.map((pub) => (
      <li key={pub.url ?? pub.title} className="flex items-start gap-3">
        <BulletPoint />
        <div className="flex-1">
          {pub.type && (
            <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-ink/5 text-body border border-line mr-2 align-top">
              {pub.type}
            </span>
          )}
          {/* An entry without a url prints as plain text */}
          {!pub.url ? (
            <span className="text-sm text-body leading-relaxed break-words align-top">
              {pub.title}
            </span>
          ) : isSitePage(pub.url) ? (
            <Link
              href={pub.url}
              className="text-sm text-accent hover:text-strong transition-colors inline gap-2 group align-top"
              aria-label={`${pub.type}: ${pub.title}`}
            >
              <span className="leading-relaxed break-words">{pub.title}</span>
            </Link>
          ) : (
            <a
              href={pub.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-accent hover:text-strong transition-colors inline gap-2 group align-top"
              aria-label={`${pub.type}: ${pub.title}`}
            >
              <span className="leading-relaxed break-words">
                <NowrapTail text={pub.title}>
                  <FontAwesomeIcon
                    icon={faExternalLink}
                    className="w-3 h-3 ml-1 opacity-70 group-hover:opacity-100 transition-opacity inline"
                    style={{ width: "0.75rem", height: "0.75rem" }}
                    aria-hidden="true"
                  />
                </NowrapTail>
              </span>
            </a>
          )}
        </div>
      </li>
    ))}
  </ul>
);

// Company logo component
export const CompanyLogo = ({
  logo,
  logoLight,
  company,
  url,
  className = "",
  brightness = 1,
  priority = false,
}) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className={`relative w-16 h-16 flex-shrink-0 rounded-2xl overflow-hidden border border-strong/10 bg-surface/50 cursor-pointer transition-all duration-300 motion-safe:md:hover:scale-[1.03] md:hover:border-accent/30 ${className}`}
    aria-label={`${company} website`}
  >
    <Image
      src={logo}
      alt={`${company} logo`}
      width={512}
      height={512}
      className={`object-contain p-1 rounded-2xl w-full h-full brightness-(--logo-brightness) light:brightness-100 ${logoLight ? "light:hidden" : ""}`}
      style={{ "--logo-brightness": brightness }}
      priority={priority}
    />
    {/* A logo drawn for a dark tile can have a version for the light one */}
    {logoLight && (
      <Image
        src={logoLight}
        alt=""
        aria-hidden="true"
        width={512}
        height={512}
        className="hidden light:block object-contain p-1 rounded-2xl w-full h-full"
        loading={priority ? "eager" : undefined}
      />
    )}
  </a>
);

// Job info: centred on phones, left-aligned from md; the title's cap line meets the logo's top edge
const JobInfo = ({
  title,
  company,
  url,
  period,
  duration,
  location,
  badge,
}) => (
  <div className="flex flex-col items-center text-center md:items-start md:text-left gap-1 md:gap-1.5 md:flex-1 md:-mt-1.5">
    <div className="flex flex-col items-center md:flex-row md:items-baseline md:justify-between md:gap-3 md:self-stretch">
      <h3 className="text-md font-bold uppercase tracking-wider text-strong">
        {title}
      </h3>
      {badge}
    </div>
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="relative after:absolute after:-inset-3 text-sm font-medium text-strong md:hover:text-accent uppercase cursor-pointer transition-colors"
      aria-label={`${company} website`}
    >
      {company}
    </a>
    <div className="flex flex-wrap gap-2 text-sm text-muted justify-center md:justify-start">
      <span>{period}</span>
      <span aria-hidden="true">•</span>
      <span>{duration}</span>
    </div>
    <p className="text-sm text-muted mb-0">{location}</p>
  </div>
);

// A segment: a 44px tap box around a 28px pill
const Segment = ({ label, selected, layoutId, ...props }) => (
  <button
    type="button"
    aria-expanded={selected}
    className={cn(
      "group relative -my-2 flex h-11 cursor-pointer items-center rounded-full px-3.5 text-sm font-semibold outline-none transition-[color,scale] motion-safe:active:scale-95",
      selected
        ? "text-strong light:text-accent"
        : "text-body hover:text-strong",
    )}
    {...props}
  >
    <span
      className={cn(
        "absolute inset-x-0 inset-y-2 rounded-full transition-colors group-focus-visible:outline-2 group-focus-visible:outline-focus",
        !selected && "group-hover:bg-ink/5 light:group-hover:bg-focus/8",
      )}
      aria-hidden="true"
    />
    {selected && (
      <motion.span
        layoutId={layoutId}
        transition={{ type: "spring", duration: 0.4 }}
        className="absolute inset-x-0 inset-y-2 rounded-full border border-accent/40 bg-accent/15 light:border-focus/40 light:bg-focus/10"
      />
    )}
    <span className="relative">{label}</span>
  </button>
);

const ExperienceCard = ({ experience, compact = false }) => {
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

  const tabs = [
    { id: "responsibilities", label: "Responsibilities" },
    ...(experience.links.length > 0 ? [{ id: "links", label: "Links" }] : []),
  ];

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
      case "links":
        return <LinksList links={experience.links} />;
      default:
        return null;
    }
  }, [activeTab, experience.responsibilities, experience.links]);

  const category =
    experience.category === "research"
      ? { variant: "blue", label: "Research" }
      : { variant: "teal", label: "Industry" };

  return (
    <article
      ref={cardRef}
      className="self-start w-full animate-card-in motion-reduce:animate-card-fade-in"
    >
      <GlowCard
        className={cn(
          "w-full h-full",
          compact ? "p-4 gap-3 md:p-5 md:gap-4" : "p-5 gap-4 md:p-6 md:gap-5",
        )}
        spotlightSize={300}
      >
        {/* Header: stacked and centred on phones, a row from md */}
        <div className="max-md:relative flex flex-col gap-3 md:flex-row md:items-start md:gap-5">
          <CompanyLogo
            logo={experience.logo}
            logoLight={experience.logoLight}
            company={experience.company}
            url={COMPANY_URLS[experience.company]}
            brightness={experience.logoBrightness}
            priority={experience.logoPriority}
            className="max-md:z-10 self-center md:self-auto"
          />
          <JobInfo
            title={experience.title}
            company={experience.company}
            url={COMPANY_URLS[experience.company]}
            period={experience.period}
            duration={experience.duration}
            location={experience.location}
            badge={
              // A compact card has no badge: every visit is research
              experience.category &&
              !compact && (
                <Badge
                  variant={category.variant}
                  className="absolute top-0 right-0 md:static md:shrink-0 px-2 py-0.5"
                >
                  {category.label}
                </Badge>
              )
            }
          />
        </div>

        {/* Summary */}
        {experience.summary && (
          <p className="border-l-2 border-accent/40 pl-3 text-sm leading-relaxed text-body">
            {experience.summary}
          </p>
        )}

        {/* Tabs: a segmented control as wide as its two labels */}
        <div
          className={cn(
            "flex w-fit items-center justify-self-center gap-0.5 rounded-full border border-strong/5 bg-ink/5 p-0.5 light:border-line light:bg-transparent",
            compact ? "md:-my-1" : "-my-1 md:-my-2",
          )}
          role="group"
          aria-label="Job information"
        >
          {tabs.map((tab) => (
            <Segment
              key={tab.id}
              label={tab.label}
              selected={activeTab === tab.id}
              layoutId={`tab-${experience.id}`}
              aria-controls={
                activeTab === tab.id
                  ? `${experience.id}-${tab.id}-panel`
                  : undefined
              }
              onClick={() => handleTabClick(tab.id)}
            />
          ))}
        </div>

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
              id={`${experience.id}-${activeTab}-panel`}
            >
              <div className="pb-2">{tabContent}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </GlowCard>
    </article>
  );
};

export default ExperienceCard;
