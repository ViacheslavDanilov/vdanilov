import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faSearch,
  faBullseye,
  faCogs,
  faChartLine,
  faExternalLinkAlt,
  faGlobe,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faResearchgate,
  faGoogleScholar,
  faOrcid,
} from "@fortawesome/free-brands-svg-icons";
import ImageLightbox from "@/components/ImageLightbox";
import { GlowCard } from "@/components/ui/glow-card";
import ProjectBanner from "@/components/ProjectBanner";

export const metadata = {
  title: "Claim Assistant",
  description:
    "AI-powered insurance claim intake automation using Azure Document Intelligence and GPT-5 to extract, validate, and map claim data with per-field confidence scoring.",
  openGraph: {
    title: "Claim Assistant | Viacheslav Danilov",
    description:
      "AI-powered insurance claim intake automation using Azure Document Intelligence and GPT-5 to extract, validate, and map claim data with per-field confidence scoring.",
    images: [
      {
        url: "/portfolio/previews/claim-assistant.jpg",
        width: 1200,
        height: 630,
        alt: "Claim Assistant - AI-powered insurance claim automation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Claim Assistant | Viacheslav Danilov",
    description:
      "AI-powered insurance claim intake automation using Azure Document Intelligence and GPT-5 to extract, validate, and map claim data with per-field confidence scoring.",
    images: ["/portfolio/previews/claim-assistant.jpg"],
  },
};

const HIGHLIGHTS_ITEMS = [
  {
    icon: faSearch,
    label: "Situation",
    text: "A large insurer processed ~107K claims per year across phone, email, fax, and portal — with 30 staff manually re-keying data into ASC, limited to 12h/day on weekdays.",
  },
  {
    icon: faBullseye,
    label: "Task",
    text: "Build an automation solution to extract claim data from PDFs, faxes, and handwritten forms, score per-field confidence, and map fields to ASC for 24/7 processing.",
  },
  {
    icon: faCogs,
    label: "Action",
    text: "Designed a two-stage pipeline pairing Azure Document Intelligence OCR with GPT-5 mapping and validation, plus a review UI with bounding-box highlights and confidence-gated export.",
  },
  {
    icon: faChartLine,
    label: "Result",
    text: "Cut processing to ~1 minute per form with 24/7 pre-processing that eliminates backlog, focusing staff on low-confidence exceptions and reducing data-entry errors.",
  },
];

const TEAM_MEMBERS = [
  {
    name: "Viacheslav Danilov",
    role: "R&D Lead",
    organization: "Symfa",
    location: "Barcelona · Spain 🇪🇸",
    photo: "/people/viacheslav-danilov.webp",
    links: {
      linkedin: "https://www.linkedin.com/in/viacheslav-danilov/",
      github: "https://github.com/ViacheslavDanilov",
      researchgate: "https://www.researchgate.net/profile/Viacheslav-Danilov-2",
      google: "https://scholar.google.com/citations?user=SJidGZkAAAAJ&hl=en",
      email: "viacheslav.v.danilov@gmail.com",
    },
  },
  {
    name: "Anton Makoveev",
    role: "ML Engineer",
    organization: "Symfa",
    location: "Prague · Czechia 🇨🇿",
    photo: "/people/anton-makoveev.webp",
    links: {
      linkedin: "https://www.linkedin.com/in/anton-makoveev/",
      github: "https://github.com/mak-en",
      orcid: "https://orcid.org/0000-0002-1819-3942",
      google: "https://scholar.google.com/citations?user=fOscab0AAAAJ",
      email: "makoveev90@gmail.com",
    },
  },
  {
    name: "Mikhail Vinogradov",
    role: "Data Scientist",
    organization: "Symfa",
    location: "Barcelona · Spain 🇪🇸",
    photo: "/people/mikhail-vinogradov.webp",
    links: {
      linkedin: "https://www.linkedin.com/in/michaelvin1322",
      github: "https://github.com/michaelvin1322",
      email: "mikhail.vinogradov@symfa.com",
    },
  },
];

const RESOURCES = [
  {
    label: "Live Demo",
    url: "https://claim-assistant.symfa.ai/",
  },
  {
    label: "GitHub",
    url: "https://github.com/Symfa-Inc/claim-assistant",
  },
  {
    label: "Solution",
    url: "https://insurtech-intelligence.symfa.ai/solutions/claim-assistant",
  },
];

const TECH_STACK = [
  "Python",
  "FastAPI",
  "OpenAI GPT-5",
  "Azure Doc Intelligence",
  "Next.js",
  "React",
  "TypeScript",
];

function TeamMemberCard({ member }) {
  const iconMap = {
    linkedin: faLinkedin,
    github: faGithub,
    researchgate: faResearchgate,
    google: faGoogleScholar,
    orcid: faOrcid,
    globe: faGlobe,
    email: faEnvelope,
  };

  return (
    <GlowCard
      glowColor="blue"
      customSize={true}
      className="w-full h-full p-5"
      enableSpotlight={true}
      enableBorderGlow={true}
      spotlightSize={240}
    >
      {/* Centered vertical layout */}
      <div className="flex flex-col items-center text-center h-full">
        {/* Photo */}
        <div className="relative w-24 h-24 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-accent/20 shadow-lg bg-dark mb-4">
          <Image
            src={member.photo}
            alt={member.name}
            fill
            sizes="(max-width: 768px) 80px, 96px"
            quality={90}
            className="object-cover"
          />
        </div>
        {/* Info */}
        <h4 className="text-base font-bold text-light mb-1.5">{member.name}</h4>
        <p className="text-sm font-medium text-accent mb-2">{member.role}</p>
        <p className="text-sm text-gray-300 mb-2">{member.organization}</p>
        <p className="text-sm text-gray-500 mb-4">{member.location}</p>
        {/* Social Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-auto">
          {Object.entries(member.links).map(([key, url]) => (
            <a
              key={key}
              href={key === "email" ? `mailto:${url}` : url}
              target={key === "email" ? undefined : "_blank"}
              rel={key === "email" ? undefined : "noopener noreferrer"}
              className="text-gray-400 hover:text-light transition-all duration-300 transform hover:scale-110"
              aria-label={key}
            >
              <FontAwesomeIcon
                icon={iconMap[key]}
                className="w-4 h-4"
                style={{
                  width: "1rem",
                  height: "1rem",
                  display: "block",
                }}
              />
            </a>
          ))}
        </div>
      </div>
    </GlowCard>
  );
}

export default function ProjectPage() {
  return (
    <main className="min-h-screen pt-24">
      <div className="w-full max-w-5xl mx-auto px-6 py-12 md:py-24">
        {/* Back Navigation */}
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-accent
                     transition-colors mb-8 group"
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="w-4 h-4 transition-transform group-hover:-translate-x-1"
          />
          <span>Back to Portfolio</span>
        </Link>

        {/* Project Banner */}
        <ProjectBanner
          image="/portfolio/previews/claim-assistant.jpg"
          alt="Claim Assistant - AI-powered insurance claim automation platform"
        />

        {/* Project Header */}
        <header className="mb-16 p-6 rounded-2xl bg-light/[0.03]">
          <h1 className="text-3xl md:text-4xl font-bold text-light mb-3">
            Claim Assistant
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            AI-powered automation that streamlines insurance claim intake with
            LLM-based PDF processing, policy matching, and coverage analysis
          </p>

          {/* Divider */}
          <div className="h-px bg-light/10 my-8" />

          {/* Client */}
          <div className="text-sm text-gray-400">
            <span className="text-gray-400 font-medium">Client: </span>
            <a
              href="https://amtrustfinancial.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              AmTrust
            </a>
            <span className="text-gray-400">
              {" "}
              · New York · United States 🇺🇸
            </span>
          </div>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {TECH_STACK.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-0.5 text-[11px] rounded-full bg-white/5 border border-white/10 text-gray-400"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-light/10 my-8" />

          {/* Resources */}
          <div className="flex flex-wrap gap-2">
            {RESOURCES.map((resource) => (
              <a
                key={resource.label}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium
                           rounded-lg bg-accent/10 text-accent border border-accent/30
                           hover:bg-accent/20 transition-colors"
              >
                {resource.label}
                <FontAwesomeIcon
                  icon={faExternalLinkAlt}
                  className="w-2.5 h-2.5"
                />
              </a>
            ))}
          </div>
        </header>

        {/* Content Sections */}
        <div className="space-y-16">
          {/* Highlights - STAR Section */}
          <section>
            <h2 className="text-xl font-semibold text-light mb-6 flex items-center gap-3">
              <span className="w-1 h-6 bg-accent rounded-full"></span>
              Highlights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {HIGHLIGHTS_ITEMS.map((item) => (
                <GlowCard
                  key={item.label}
                  glowColor="blue"
                  customSize={true}
                  className="group w-full h-full p-5"
                  enableSpotlight={true}
                  enableBorderGlow={true}
                  spotlightSize={240}
                >
                  <div className="flex flex-col gap-3">
                    {/* Icon + Label row */}
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon
                        icon={item.icon}
                        className="w-3.5 h-3.5 text-white/70 transition-colors duration-300 group-hover:text-accent"
                        style={{
                          width: "0.875rem",
                          height: "0.875rem",
                          display: "inline-block",
                        }}
                      />
                      <span className="text-xs uppercase tracking-wider text-light transition-colors duration-300 group-hover:text-accent font-semibold">
                        {item.label}
                      </span>
                    </div>
                    {/* Description */}
                    <p className="text-sm text-light/80 leading-relaxed text-justify">
                      {item.text}
                    </p>
                  </div>
                </GlowCard>
              ))}
            </div>
          </section>

          {/* Core Team */}
          <section>
            <h2 className="text-xl font-semibold text-light mb-6 flex items-center gap-3">
              <span className="w-1 h-6 bg-accent rounded-full"></span>
              Core Team
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {TEAM_MEMBERS.map((member) => (
                <TeamMemberCard key={member.name} member={member} />
              ))}
            </div>
          </section>

          {/* Overview */}
          <section>
            <h2 className="text-xl font-semibold text-light mb-4 flex items-center gap-3">
              <span className="w-1 h-6 bg-accent rounded-full"></span>
              Overview
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed mb-4 text-justify">
                Claim Assistant is an AI-powered solution that automates
                insurance claim intake and processing, transforming a slow,
                manual workflow into a fast, scalable, and accurate one. It
                converts filled insurance claim forms — including scanned and
                handwritten documents — into structured, validated data ready
                for downstream systems.
              </p>
              <p className="text-gray-300 leading-relaxed text-justify">
                The platform pairs specialized document intelligence with
                LLM-based reasoning. Azure Document Intelligence extracts
                key-value pairs, layout, and per-field confidence, while OpenAI
                GPT-5 maps the results to the target schema, resolves field
                aliases, and generates a coverage summary. A review interface
                with side-by-side PDF previews and bounding-box highlights lets
                adjusters verify, edit, and approve fields — with a
                confidence-driven queue that focuses attention only on the
                exceptions that need a human.
              </p>
            </div>
          </section>

          {/* Data */}
          <section>
            <h2 className="text-xl font-semibold text-light mb-4 flex items-center gap-3">
              <span className="w-1 h-6 bg-accent rounded-full"></span>
              Data
            </h2>

            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              The solution targets a high-volume claims operation handling
              roughly 107,000 claims per year (~9,000 per month) arriving
              through multiple channels:
            </p>
            <ul className="space-y-2 text-gray-300 mb-6 text-justify">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">ASC System (75%):</strong>{" "}
                  ~6.8K claims/month from phone (37%), email (45%), and fax
                  (18%) channels.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">
                    External Portal (25%):
                  </strong>{" "}
                  ~2.5K claims/month submitted directly by insureds through
                  partner portals.
                </span>
              </li>
            </ul>

            <p className="text-gray-300 leading-relaxed mb-6 text-justify">
              Inputs span PDFs, faxes, and emails — both digital and handwritten
              — across claim forms from eight US states (Florida, New Hampshire,
              Minnesota, Iowa, Kansas, New York, Ohio, and Wisconsin). The
              pipeline is form-agnostic, handling arbitrary layouts without
              per-form training, and flags any field extracted below 80%
              confidence for human review.
            </p>
          </section>

          {/* Methods */}
          <section>
            <h2 className="text-xl font-semibold text-light mb-4 flex items-center gap-3">
              <span className="w-1 h-6 bg-accent rounded-full"></span>
              Methods
            </h2>

            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              Claim Assistant uses a two-stage pipeline that combines
              specialized document intelligence with LLM-based mapping and
              validation:
            </p>

            <ul className="space-y-4 text-gray-300 mb-6 text-justify">
              <li>
                <strong className="text-gray-200">
                  Stage 1 — Document Intelligence:
                </strong>{" "}
                Azure Document Intelligence (Form Recognizer v3.x) extracts
                key-value pairs, bounding boxes, layout structure, and per-field
                confidence scores from each document.
              </li>
              <li>
                <strong className="text-gray-200">
                  Stage 2 — LLM Mapping &amp; Validation:
                </strong>
                <ul className="mt-2 ml-4 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>
                      <strong className="text-gray-300">Field Mapping:</strong>{" "}
                      GPT-5 aligns extracted values to target schema fields
                      while preserving evidence links to the source document.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>
                      <strong className="text-gray-300">
                        Alias Resolution:
                      </strong>{" "}
                      Normalizes inconsistent labels and synonyms across form
                      variants into a single canonical schema.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>
                      <strong className="text-gray-300">
                        Policy Matching:
                      </strong>{" "}
                      Maps extracted identifiers to policy records using
                      weighted Levenshtein similarity and date validation.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>
                      <strong className="text-gray-300">
                        Summary Generation:
                      </strong>{" "}
                      Produces a coverage analysis (covered / not covered /
                      uncertain) with transparent reasoning and confidence
                      metrics.
                    </span>
                  </li>
                </ul>
              </li>
              <li>
                <strong className="text-gray-200">Review Workflow:</strong> A
                side-by-side review UI highlights each field on the source PDF,
                supports inline editing and approval, surfaces a dedicated
                low-confidence queue (&lt;80%), and gates export to ASC until
                all fields are approved.
              </li>
            </ul>
          </section>

          {/* Results */}
          <section>
            <h2 className="text-xl font-semibold text-light mb-4 flex items-center gap-3">
              <span className="w-1 h-6 bg-accent rounded-full"></span>
              Results
            </h2>

            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              By shifting intake from full manual data entry to AI-driven
              pre-processing, the solution delivers measurable operational
              gains:
            </p>

            <ul className="space-y-2 text-gray-300 mb-6 text-justify">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Processing Speed:</strong>{" "}
                  ~1 minute per form (parallelizable), down from longer, fully
                  manual data entry.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Coverage Hours:</strong>{" "}
                  24/7 automated pre-processing replaces 12h/day weekday-only
                  coverage, eliminating overnight and weekend backlog.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Staff Productivity:</strong>{" "}
                  The confidence-driven queue lets staff focus only on
                  exceptions and low-confidence cases instead of re-keying every
                  claim.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Error Rate:</strong> Reduced
                  through automated validation and visual bounding-box
                  verification.
                </span>
              </li>
            </ul>

            <p className="text-gray-300 leading-relaxed mb-6 text-justify">
              Being form-agnostic, the pipeline generalizes across layouts and
              input quality — from clean digital PDFs to noisy handwritten
              submissions — without per-form training:
            </p>

            {/* Figure 1: Wisconsin (digital) */}
            <figure id="figure-1" className="scroll-mt-24 mb-8">
              <ImageLightbox
                src="/portfolio/claim-assistant/wisconsin_digital.webp"
                alt="Claim Assistant review interface processing a digital Wisconsin claim form"
                width={4118}
                height={2146}
                maxWidth="2xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 1.</span> Claim Assistant
                review interface on a digital Wisconsin form — side-by-side PDF
                preview with extracted key fields, confidence scores, and
                per-field approval.
              </figcaption>
            </figure>

            {/* Figure 2: New Hampshire (handwritten) */}
            <figure id="figure-2" className="scroll-mt-24 mb-8">
              <ImageLightbox
                src="/portfolio/claim-assistant/new-hampshire_handwritten.webp"
                alt="Claim Assistant processing a handwritten New Hampshire claim form"
                width={4118}
                height={2146}
                maxWidth="2xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 2.</span> Handwritten New
                Hampshire form — fields extracted and validated despite
                free-form handwriting, with low-confidence values surfaced for
                review.
              </figcaption>
            </figure>

            {/* Figure 3: New Hampshire (digital) */}
            <figure id="figure-3" className="scroll-mt-24">
              <ImageLightbox
                src="/portfolio/claim-assistant/new-hampshire_digital.webp"
                alt="Claim Assistant processing a digital New Hampshire claim form"
                width={4118}
                height={2146}
                maxWidth="2xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 3.</span> Digital New
                Hampshire form — high-confidence extraction across key fields
                with an auto-generated coverage summary.
              </figcaption>
            </figure>
          </section>

          {/* Conclusion */}
          <section>
            <h2 className="text-xl font-semibold text-light mb-4 flex items-center gap-3">
              <span className="w-1 h-6 bg-accent rounded-full"></span>
              Conclusion
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              Claim Assistant shows how pairing document intelligence with LLM
              reasoning can turn a manual, bottlenecked claims operation into a
              scalable, 24/7 pipeline. Its hybrid approach — Azure for accurate
              extraction, GPT-5 for mapping and validation — combined with a
              confidence-driven, evidence-linked review workflow, keeps humans
              in the loop exactly where it matters while automating the rest.
            </p>
            <p className="text-gray-300 leading-relaxed text-justify">
              The architecture is ready for enterprise integration. Roadmap
              items include a document classification pre-filter to route
              incoming messages (FNOL, billing, misrouted), direct email-body
              parsing, and full ASC export integration for end-to-end
              straight-through processing.
            </p>
          </section>
        </div>
      </div>
      {/* Bottom spacing before footer */}
      <div className="pb-24" />
    </main>
  );
}
