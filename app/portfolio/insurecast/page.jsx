import {
  faSearch,
  faBullseye,
  faCogs,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import AutoplayVideo from "@/components/AutoplayVideo";
import ImageLightbox from "@/components/ImageLightbox";
import { pageMetadata } from "@/lib/metadata";
import ProjectHeader from "@/components/project/ProjectHeader";
import Highlights from "@/components/project/Highlights";
import CoreTeam from "@/components/project/CoreTeam";
import Section from "@/components/project/Section";
import NextProject from "@/components/project/NextProject";

export const metadata = pageMetadata({
  title: "InsureCast",
  description:
    "Time-series forecasting dashboard for monthly insurance claims and costs using SARIMAX seasonal models, scenario stress-testing, and AI-generated summaries.",
  path: "/portfolio/insurecast/",
  image: {
    url: "/portfolio/previews/insurecast.jpg",
    alt: "InsureCast - time-series forecasting for insurance claims and costs",
  },
});

const HIGHLIGHTS_ITEMS = [
  {
    icon: faSearch,
    label: "Situation",
    text: "Teams planning reserves and operations need consistent forward views of claim frequency and cost, but spreadsheets and one-off models are hard to reproduce, segment, and stress-test.",
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
    text: "Replaced ad-hoc spreadsheets with one API and a single definition of “forecast”: refresh by segment and horizon, apply shocks, and read a chart-aligned narrative, all in one dashboard.",
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
      googleScholar:
        "https://scholar.google.com/citations?user=SJidGZkAAAAJ&hl=en",
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
      googleScholar: "https://scholar.google.com/citations?user=fOscab0AAAAJ",
      orcid: "https://orcid.org/0000-0002-1819-3942",
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

export default function ProjectPage() {
  return (
    <div className="min-h-screen pt-24">
      <div className="w-full max-w-5xl mx-auto px-6 py-12 md:py-24">
        <ProjectHeader
          title="InsureCast"
          subtitle="Time-series forecasting dashboard for monthly insurance claims and costs, with scenario stress-testing and AI-generated summaries"
          banner={{
            image: "/portfolio/previews/insurecast.jpg",
            alt: "InsureCast - time-series forecasting dashboard for insurance claims and costs",
          }}
          client={{
            name: "Symfa",
            url: "https://symfa.com/",
            location: "Miami · United States 🇺🇸",
          }}
          techStack={TECH_STACK}
          resources={RESOURCES}
        />

        <div className="space-y-16">
          <Highlights items={HIGHLIGHTS_ITEMS} />

          <CoreTeam members={TEAM_MEMBERS} />

          <Section title="Overview">
            <div className="prose prose-invert max-w-none">
              <p className="text-body leading-relaxed mb-4 text-justify">
                InsureCast is a time-series forecasting dashboard that projects
                monthly insurance claims and paid amounts, giving teams that
                plan reserves and operations a consistent, reproducible forward
                view rather than static history. Users pick a segment and
                horizon, and the system returns point forecasts with
                confidence-style bands, a monthly data table, and a short
                narrative aligned to the very same numbers shown on the charts.
              </p>
              <p className="text-body leading-relaxed text-justify">
                Built as a FastAPI backend and Next.js frontend over shared demo
                data, it fits per-segment SARIMAX seasonal models with automatic
                fallbacks, and exposes a scenario API for stress-testing. A
                what-if panel lets analysts apply severity-inflation and
                frequency-shock adjustments and immediately see the forecast
                charts and table update, turning ad-hoc spreadsheet work into a
                single, API-first definition of "forecast."
              </p>
            </div>
          </Section>

          <Section title="Data">
            <p className="text-body leading-relaxed mb-4 text-justify">
              The demo is built on public OSHA Severe Injury Report (SIR) data,
              normalized into monthly aggregates the dashboard can serve
              directly:
            </p>
            <ul className="space-y-2 text-body mb-6 text-justify">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-strong">OSHA SIR (demo):</strong>{" "}
                  Public severe-injury reports ingested and normalized to the
                  dashboard schema via dedicated ingest scripts.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-strong">Merged demo table:</strong> A
                  single CSV of all segments × months (month, state, industry,
                  claim type, counts, and baseline average cost), loaded by the
                  API at startup.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-strong">Synthetic fill:</strong> An
                  optional step completes coverage for demo segments when a
                  series has gaps.
                </span>
              </li>
            </ul>

            <p className="text-body leading-relaxed mb-6 text-justify">
              Segments are defined by state, industry, and claim type, each
              modeled as its own monthly time series.
            </p>
          </Section>

          <Section title="Methods">
            <p className="text-body leading-relaxed mb-4 text-justify">
              The pipeline fits a seasonal model per segment and serves
              forecasts, scenarios, and summaries from the same underlying rows:
            </p>

            <ul className="space-y-4 text-body mb-6 text-justify">
              <li>
                <strong className="text-strong">Seasonal Modeling:</strong> Each
                segment&apos;s monthly series is fit with a SARIMAX
                (1,1,1)×(1,1,1,12) model, capturing trend and 12-month
                seasonality.
              </li>
              <li>
                <strong className="text-strong">Robust Fallbacks:</strong> When
                a series is too short or noisy for SARIMAX to fit, the system
                automatically falls back to ARIMA or a seasonal-naive method.
              </li>
              <li>
                <strong className="text-strong">
                  Forecasts with Uncertainty:
                </strong>{" "}
                Point forecasts are produced with 95% prediction intervals and a
                clear historical-vs-forecast split for both claims and average
                cost per claim.
              </li>
              <li>
                <strong className="text-strong">Scenario Recalculation:</strong>{" "}
                A scenario endpoint applies severity-inflation and
                frequency-shock adjustments, refreshing the forecast segment on
                demand.
              </li>
              <li>
                <strong className="text-strong">Aligned AI Summary:</strong> An
                OpenAI-generated narrative (with a deterministic fallback when
                no key is configured) describes the selected window using the
                exact rows the charts consume.
              </li>
            </ul>
          </Section>

          <Section title="Results">
            <p className="text-body leading-relaxed mb-4 text-justify">
              By unifying forecasting, scenarios, and reporting behind one API,
              InsureCast streamlines the planning loop:
            </p>

            <ul className="space-y-2 text-body mb-6 text-justify">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-strong">Planning Cycle:</strong>{" "}
                  Refresh views by segment and horizon in one UI instead of
                  manually rebuilding them per question.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-strong">Consistency:</strong> One API
                  and one merged definition of "forecast" replace scattered
                  spreadsheets and divergent assumptions.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-strong">Scenarios:</strong> Severity
                  and frequency shocks update the charts and table immediately,
                  making side-by-side comparison easy.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-strong">Communication:</strong>{" "}
                  Chart-aligned summary text replaces static slides, keeping the
                  narrative tied to the numbers.
                </span>
              </li>
            </ul>

            <p className="text-body leading-relaxed mb-6 text-justify">
              A walkthrough of selecting a segment, generating monthly claims
              and cost forecasts with prediction bands, and stress-testing the
              outlook under severity and frequency shocks is shown in{" "}
              <a href="#figure-1" className="text-accent hover:underline">
                Figure 1
              </a>
              , and the full dashboard view is shown in{" "}
              <a href="#figure-2" className="text-accent hover:underline">
                Figure 2
              </a>
              .
            </p>

            {/* Figure 1: Demo Video */}
            <figure id="figure-1" className="scroll-mt-24 mb-8">
              <div className="mx-auto w-full max-w-2xl rounded-xl overflow-hidden border border-line">
                <AutoplayVideo
                  aspectRatio="16 / 9"
                  poster="/portfolio/insurecast/demo-insurecast-poster.webp"
                  controls
                  aria-label="InsureCast segment forecasting and scenario stress-testing walkthrough"
                  className="block w-full h-auto"
                >
                  <source
                    src="/portfolio/insurecast/demo-insurecast.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </AutoplayVideo>
              </div>
              <figcaption className="text-center text-sm text-muted mt-3">
                <span className="text-body">Figure 1.</span> Walkthrough of
                segment selection, SARIMAX claims and cost forecasting with
                prediction intervals, aligned AI summary generation, and what-if
                scenario recalculation.
              </figcaption>
            </figure>

            {/* Figure 2: Dashboard */}
            <figure id="figure-2" className="scroll-mt-24">
              <ImageLightbox
                src="/portfolio/insurecast/dashboard.webp"
                alt="InsureCast forecasting dashboard with claims and cost forecasts, scenario sliders, and monthly table"
                width={3456}
                height={2896}
                maxWidth="2xl"
              />
              <figcaption className="text-center text-sm text-muted mt-3">
                <span className="text-body">Figure 2.</span> InsureCast
                dashboard: segment and scenario controls, historical-vs-forecast
                charts with prediction bands for claims and average cost, an
                aligned AI summary, and the monthly values table.
              </figcaption>
            </figure>
          </Section>

          <Section title="Conclusion">
            <p className="text-body leading-relaxed mb-4 text-justify">
              InsureCast shows how classical time-series modeling, an
              interactive scenario loop, and an aligned AI narrative can come
              together into a single, reproducible forecasting tool. Its
              time-series-first design (monthly frequency and seasonality with
              robust fallbacks) and API-first architecture make claims and cost
              projections consistent, segmentable, and easy to stress-test.
            </p>
            <p className="text-body leading-relaxed text-justify">
              As a prototype, it is positioned to grow toward production:
              roadmap items include live production data feeds and
              authentication, per-tenant configurable models and horizons, and
              monitoring with CI hardening.
            </p>
          </Section>

          <NextProject id="insurecast" />
        </div>
      </div>
      <div className="pb-24" />
    </div>
  );
}
