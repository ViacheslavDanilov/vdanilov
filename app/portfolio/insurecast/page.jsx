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
  title: "InsureCast",
  description:
    "Time-series forecasting dashboard for monthly insurance claims and costs using SARIMAX seasonal models, scenario stress-testing, and AI-generated summaries.",
  openGraph: {
    title: "InsureCast | Viacheslav Danilov",
    description:
      "Time-series forecasting dashboard for monthly insurance claims and costs using SARIMAX seasonal models, scenario stress-testing, and AI-generated summaries.",
    images: [
      {
        url: "/portfolio/previews/insurecast.jpg",
        width: 1200,
        height: 630,
        alt: "InsureCast - time-series forecasting for insurance claims and costs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "InsureCast | Viacheslav Danilov",
    description:
      "Time-series forecasting dashboard for monthly insurance claims and costs using SARIMAX seasonal models, scenario stress-testing, and AI-generated summaries.",
    images: ["/portfolio/previews/insurecast.jpg"],
  },
};

const HIGHLIGHTS_ITEMS = [
  {
    icon: faSearch,
    label: "Situation",
    text: "Teams planning reserves and operations need consistent forward views of claim frequency and cost — but spreadsheets and one-off models are hard to reproduce, segment, and stress-test.",
  },
  {
    icon: faBullseye,
    label: "Task",
    text: "Build a forecasting prototype that predicts monthly claims and costs with uncertainty bands, supports what-if scenarios, and ships an aligned natural-language summary in an interactive UI.",
  },
  {
    icon: faCogs,
    label: "Action",
    text: "Built per-segment SARIMAX seasonal models with ARIMA/seasonal-naive fallbacks, a scenario API for severity and frequency shocks, and OpenAI summaries tied to the same rows the charts use.",
  },
  {
    icon: faChartLine,
    label: "Result",
    text: "Replaced ad-hoc spreadsheets with one API and a single definition of “forecast” — refresh by segment and horizon, apply shocks, and read a chart-aligned narrative, all in one dashboard.",
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
];

const RESOURCES = [
  {
    label: "Live Demo",
    url: "https://insurecast.symfa.ai/",
  },
  {
    label: "GitHub",
    url: "https://github.com/Symfa-Inc/insurecast",
  },
  {
    label: "Solution",
    url: "https://insurtech-intelligence.symfa.ai/solutions/insurecast",
  },
];

const TECH_STACK = [
  "Python",
  "FastAPI",
  "statsmodels",
  "SARIMAX",
  "OpenAI",
  "Next.js",
  "React",
  "Recharts",
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
          image="/portfolio/previews/insurecast.jpg"
          alt="InsureCast - time-series forecasting dashboard for insurance claims and costs"
        />

        {/* Project Header */}
        <header className="mb-16 p-6 rounded-2xl bg-light/[0.03]">
          <h1 className="text-3xl md:text-4xl font-bold text-light mb-3">
            InsureCast
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Time-series forecasting dashboard for monthly insurance claims and
            costs, with scenario stress-testing and AI-generated summaries
          </p>

          {/* Divider */}
          <div className="h-px bg-light/10 my-8" />

          {/* Client */}
          <div className="text-sm text-gray-400">
            <span className="text-gray-400 font-medium">Client: </span>
            <a
              href="https://symfa.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Symfa
            </a>
            <span className="text-gray-400"> · Miami · United States 🇺🇸</span>
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
                InsureCast is a time-series forecasting dashboard that projects
                monthly insurance claims and paid amounts, giving teams that
                plan reserves and operations a consistent, reproducible forward
                view rather than static history. Users pick a segment and
                horizon, and the system returns point forecasts with
                confidence-style bands, a monthly data table, and a short
                narrative aligned to the very same numbers shown on the charts.
              </p>
              <p className="text-gray-300 leading-relaxed text-justify">
                Built as a FastAPI backend and Next.js frontend over shared demo
                data, it fits per-segment SARIMAX seasonal models with automatic
                fallbacks, and exposes a scenario API for stress-testing. A
                what-if panel lets analysts apply severity-inflation and
                frequency-shock adjustments and immediately see the forecast
                charts and table update — turning ad-hoc spreadsheet work into a
                single, API-first definition of "forecast."
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
              The demo is built on public OSHA Severe Injury Report (SIR) data,
              normalized into monthly aggregates the dashboard can serve
              directly:
            </p>
            <ul className="space-y-2 text-gray-300 mb-6 text-justify">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">OSHA SIR (demo):</strong>{" "}
                  Public severe-injury reports ingested and normalized to the
                  dashboard schema via dedicated ingest scripts.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Merged demo table:</strong>{" "}
                  A single CSV of all segments × months — month, state,
                  industry, claim type, counts, and baseline average cost —
                  loaded by the API at startup.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Synthetic fill:</strong> An
                  optional step completes coverage for demo segments when a
                  series has gaps.
                </span>
              </li>
            </ul>

            <p className="text-gray-300 leading-relaxed mb-6 text-justify">
              Segments are defined by state, industry, and claim type, each
              modeled as its own monthly time series.
            </p>
          </section>

          {/* Methods */}
          <section>
            <h2 className="text-xl font-semibold text-light mb-4 flex items-center gap-3">
              <span className="w-1 h-6 bg-accent rounded-full"></span>
              Methods
            </h2>

            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              The pipeline fits a seasonal model per segment and serves
              forecasts, scenarios, and summaries from the same underlying rows:
            </p>

            <ul className="space-y-4 text-gray-300 mb-6 text-justify">
              <li>
                <strong className="text-gray-200">Seasonal Modeling:</strong>{" "}
                Each segment&apos;s monthly series is fit with a SARIMAX
                (1,1,1)×(1,1,1,12) model, capturing trend and 12-month
                seasonality.
              </li>
              <li>
                <strong className="text-gray-200">Robust Fallbacks:</strong>{" "}
                When a series is too short or noisy for SARIMAX to fit, the
                system automatically falls back to ARIMA or a seasonal-naive
                method.
              </li>
              <li>
                <strong className="text-gray-200">
                  Forecasts with Uncertainty:
                </strong>{" "}
                Point forecasts are produced with 95% prediction intervals and a
                clear historical-vs-forecast split for both claims and average
                cost per claim.
              </li>
              <li>
                <strong className="text-gray-200">
                  Scenario Recalculation:
                </strong>{" "}
                A scenario endpoint applies severity-inflation and
                frequency-shock adjustments, refreshing the forecast segment on
                demand.
              </li>
              <li>
                <strong className="text-gray-200">Aligned AI Summary:</strong>{" "}
                An OpenAI-generated narrative (with a deterministic fallback
                when no key is configured) describes the selected window using
                the exact rows the charts consume.
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
              By unifying forecasting, scenarios, and reporting behind one API,
              InsureCast streamlines the planning loop:
            </p>

            <ul className="space-y-2 text-gray-300 mb-6 text-justify">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Planning Cycle:</strong>{" "}
                  Refresh views by segment and horizon in one UI instead of
                  manually rebuilding them per question.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Consistency:</strong> One
                  API and one merged definition of "forecast" replace scattered
                  spreadsheets and divergent assumptions.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Scenarios:</strong> Severity
                  and frequency shocks update the charts and table immediately,
                  making side-by-side comparison easy.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Communication:</strong>{" "}
                  Chart-aligned summary text replaces static slides, keeping the
                  narrative tied to the numbers.
                </span>
              </li>
            </ul>

            {/* Figure 1: Dashboard */}
            <figure id="figure-1" className="scroll-mt-24">
              <ImageLightbox
                src="/portfolio/insurecast/dashboard.webp"
                alt="InsureCast forecasting dashboard with claims and cost forecasts, scenario sliders, and monthly table"
                width={3456}
                height={2896}
                maxWidth="2xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 1.</span> InsureCast
                dashboard — segment and scenario controls,
                historical-vs-forecast charts with prediction bands for claims
                and average cost, an aligned AI summary, and the monthly values
                table.
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
              InsureCast shows how classical time-series modeling, an
              interactive scenario loop, and an aligned AI narrative can come
              together into a single, reproducible forecasting tool. Its
              time-series-first design — monthly frequency and seasonality with
              robust fallbacks — and API-first architecture make claims and cost
              projections consistent, segmentable, and easy to stress-test.
            </p>
            <p className="text-gray-300 leading-relaxed text-justify">
              As a prototype, it is positioned to grow toward production:
              roadmap items include live production data feeds and
              authentication, per-tenant configurable models and horizons, and
              monitoring with CI hardening.
            </p>
          </section>
        </div>
      </div>
      {/* Bottom spacing before footer */}
      <div className="pb-24" />
    </main>
  );
}
