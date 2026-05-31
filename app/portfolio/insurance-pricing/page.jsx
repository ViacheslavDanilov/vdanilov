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
  title: "Insurance Pricing",
  description:
    "End-to-end ML application for predicting annual insurance charges with SHAP-based explainability and LLM-powered interpretation for business and technical users.",
  openGraph: {
    title: "Insurance Pricing | Viacheslav Danilov",
    description:
      "End-to-end ML application for predicting annual insurance charges with SHAP-based explainability and LLM-powered interpretation for business and technical users.",
    images: [
      {
        url: "/portfolio/previews/insurance-pricing.jpg",
        width: 1200,
        height: 630,
        alt: "Insurance Pricing - explainable ML for insurance charge prediction",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Insurance Pricing | Viacheslav Danilov",
    description:
      "End-to-end ML application for predicting annual insurance charges with SHAP-based explainability and LLM-powered interpretation for business and technical users.",
    images: ["/portfolio/previews/insurance-pricing.jpg"],
  },
};

const HIGHLIGHTS_ITEMS = [
  {
    icon: faSearch,
    label: "Situation",
    text: "Insurance pricing leans on actuarial models that work well but are opaque — hard for non-technical stakeholders to interpret and assessed with metrics that aren't translated into business impact.",
  },
  {
    icon: faBullseye,
    label: "Task",
    text: "Build an end-to-end ML system that predicts annual insurance charges, explains each individual prediction, and reports evaluation metrics in language both business and technical teams can trust.",
  },
  {
    icon: faCogs,
    label: "Action",
    text: "Built an AutoGluon tabular regressor with SHAP per-prediction contributions, GPT-4o-mini plain-language interpretation, extrapolation warnings, and Markdown EDA/evaluation reports in an interactive UI.",
  },
  {
    icon: faChartLine,
    label: "Result",
    text: "Turned a black-box estimate into a transparent quote — every prediction ships with ranked cost drivers and a readable explanation, closing the gap between model performance and stakeholder trust.",
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
    url: "https://insurance-pricing.symfa.ai/",
  },
  {
    label: "GitHub",
    url: "https://github.com/Symfa-Inc/insurance-pricing",
  },
  {
    label: "Solution",
    url: "https://insurtech-intelligence.symfa.ai/solutions/insurance-pricing",
  },
];

const TECH_STACK = [
  "Python",
  "FastAPI",
  "AutoGluon",
  "SHAP",
  "OpenAI",
  "Next.js",
  "React",
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
          image="/portfolio/previews/insurance-pricing.jpg"
          alt="Insurance Pricing - explainable ML for insurance charge prediction"
        />

        {/* Project Header */}
        <header className="mb-16 p-6 rounded-2xl bg-light/[0.03]">
          <h1 className="text-3xl md:text-4xl font-bold text-light mb-3">
            Insurance Pricing
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            End-to-end ML system for predicting annual insurance charges with
            per-prediction explainability and business-readable reports
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
                Insurance Pricing is a full-stack machine learning application
                that estimates annual insurance charges from demographic and
                health factors, then explains how it reached each number.
                Designed for mixed business and technical audiences, it closes
                the common gap between strong model performance and stakeholder
                trust by making every prediction transparent and every metric
                interpretable.
              </p>
              <p className="text-gray-300 leading-relaxed text-justify">
                Under the hood, an AutoGluon tabular regressor produces the
                estimate, SHAP computes the per-prediction feature
                contributions, and an OpenAI model turns those contributions
                into a plain-language explanation — a headline, the key cost
                drivers, and caveats about model limitations. Built-in
                extrapolation warnings flag inputs outside the training
                distribution, and automated EDA and evaluation reports are
                rendered directly in the UI.
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
              The model is trained on the public US Health Insurance Dataset —
              1,300 records of individual policy attributes paired with annual
              charges:
            </p>
            <ul className="space-y-2 text-gray-300 mb-6 text-justify">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Features:</strong> Age, sex,
                  BMI, number of children/dependents, smoker status, and US
                  region.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Target:</strong> Annual
                  insurance charges, modeled as a tabular regression problem.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Guardrails:</strong>{" "}
                  Training-distribution bounds are stored so the app can warn
                  when a query extrapolates beyond what the model has seen.
                </span>
              </li>
            </ul>

            <p className="text-gray-300 leading-relaxed mb-6 text-justify">
              The deployment is databaseless — predictions are served entirely
              from the trained model artifact, with no external data store
              dependency.
            </p>
          </section>

          {/* Methods */}
          <section>
            <h2 className="text-xl font-semibold text-light mb-4 flex items-center gap-3">
              <span className="w-1 h-6 bg-accent rounded-full"></span>
              Methods
            </h2>

            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              The system is a modular prediction-and-interpretation pipeline,
              where each stage is independently callable through the API:
            </p>

            <ul className="space-y-4 text-gray-300 mb-6 text-justify">
              <li>
                <strong className="text-gray-200">
                  Feature Input &amp; Preprocessing:
                </strong>{" "}
                User-provided insurance attributes are validated with Pydantic
                and transformed for model consumption.
              </li>
              <li>
                <strong className="text-gray-200">Model Inference:</strong> A
                trained AutoGluon TabularPredictor artifact predicts the annual
                charge and checks the query against training-distribution
                bounds.
              </li>
              <li>
                <strong className="text-gray-200">
                  SHAP Value Computation:
                </strong>{" "}
                A TreeExplainer generates per-prediction feature contributions,
                ranking how each input pushes the estimate up or down.
              </li>
              <li>
                <strong className="text-gray-200">LLM Interpretation:</strong>{" "}
                GPT-4o-mini translates the SHAP output into a structured,
                plain-language explanation — headline, key drivers, and caveats.
              </li>
              <li>
                <strong className="text-gray-200">Evaluation Reporting:</strong>{" "}
                Model quality is summarized with R², MAPE, and SMAPE, with
                LLM-based interpretation that puts those metrics into business
                context.
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
              By pairing accurate predictions with explainability, the
              application reframes insurance pricing from a black box into a
              transparent, auditable quote:
            </p>

            <ul className="space-y-2 text-gray-300 mb-6 text-justify">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Interpretability:</strong>{" "}
                  Every prediction ships with SHAP contributions plus an LLM
                  explanation, replacing a low-transparency black box.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">
                    Per-Prediction Transparency:
                  </strong>{" "}
                  Local SHAP explanations show the cost drivers behind each
                  individual quote.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">
                    Business-Readable Evaluation:
                  </strong>{" "}
                  Static R²/MAPE/SMAPE metrics become a human-interpreted
                  evaluation report.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Stakeholder Trust:</strong>{" "}
                  Explainability and extrapolation warnings make results
                  defensible across technical and non-technical teams.
                </span>
              </li>
            </ul>

            {/* Figure 1: Dashboard */}
            <figure id="figure-1" className="scroll-mt-24">
              <ImageLightbox
                src="/portfolio/insurance-pricing/dashboard.webp"
                alt="Insurance Pricing dashboard with estimated annual charges, LLM interpretation, and SHAP feature impact"
                width={1890}
                height={1835}
                maxWidth="xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 1.</span> Insurance
                Pricing dashboard — input panel, estimated annual charge, a
                plain-language interpretation of the main drivers, and the SHAP
                feature-impact chart.
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
              Insurance Pricing demonstrates an explainability-first approach to
              ML pricing: accurate AutoGluon predictions, SHAP-based local
              explanations, and LLM interpretation combine to make every quote
              understandable to the people who rely on it. The modular,
              databaseless architecture keeps each pipeline stage independently
              callable and simple to deploy.
            </p>
            <p className="text-gray-300 leading-relaxed text-justify">
              As an end-to-end prototype, it is positioned to grow: planned
              extensions include advanced calibration analysis and ongoing model
              monitoring to keep predictions reliable as data shifts over time.
            </p>
          </section>
        </div>
      </div>
      {/* Bottom spacing before footer */}
      <div className="pb-24" />
    </main>
  );
}
