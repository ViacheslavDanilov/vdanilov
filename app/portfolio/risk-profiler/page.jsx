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
  title: "Risk Profiler",
  description:
    "Machine learning prototype for insurance claim fraud risk profiling using AutoGluon ensembles, SHAP explainability, and LLM-generated assessment summaries.",
  openGraph: {
    title: "Risk Profiler | Viacheslav Danilov",
    description:
      "Machine learning prototype for insurance claim fraud risk profiling using AutoGluon ensembles, SHAP explainability, and LLM-generated assessment summaries.",
    images: [
      {
        url: "/portfolio/previews/risk-profiler.jpg",
        width: 1200,
        height: 630,
        alt: "Risk Profiler - AI-powered insurance claim fraud detection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Risk Profiler | Viacheslav Danilov",
    description:
      "Machine learning prototype for insurance claim fraud risk profiling using AutoGluon ensembles, SHAP explainability, and LLM-generated assessment summaries.",
    images: ["/portfolio/previews/risk-profiler.jpg"],
  },
};

const HIGHLIGHTS_ITEMS = [
  {
    icon: faSearch,
    label: "Situation",
    text: "Insurers face heavy financial exposure from fraudulent claims. Manually reviewing every claim is costly and impractical, while blanket approvals risk paying out fraud.",
  },
  {
    icon: faBullseye,
    label: "Task",
    text: "Build an ML prototype that scores fraud risk per claim with a configurable threshold, explains each prediction transparently, and supports investigation workflows.",
  },
  {
    icon: faCogs,
    label: "Action",
    text: "Trained an AutoGluon ensemble on the Travelers NESS Statathon dataset, added SHAP per-feature contributions and GPT-4o-mini summaries, surfaced via an interactive dashboard.",
  },
  {
    icon: faChartLine,
    label: "Result",
    text: "Instant fraud probability with auditable, additive reasoning, letting analysts focus on high-risk and edge cases instead of scoring every claim by hand.",
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
    url: "https://risk-profiler.symfa.ai/",
  },
  {
    label: "GitHub",
    url: "https://github.com/Symfa-Inc/risk-profiler",
  },
  {
    label: "Solution",
    url: "https://insurtech-intelligence.symfa.ai/solutions/risk-profiler",
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
          image="/portfolio/previews/risk-profiler.jpg"
          alt="Risk Profiler - AI-powered insurance claim fraud detection platform"
        />

        {/* Project Header */}
        <header className="mb-16 p-6 rounded-2xl bg-light/[0.03]">
          <h1 className="text-3xl md:text-4xl font-bold text-light mb-3">
            Risk Profiler
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Machine learning prototype that profiles fraud risk in insurance
            claims with explainable, auditable predictions
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
                Risk Profiler is a machine learning prototype that helps claims
                analysts identify potentially fraudulent insurance claims,
                prioritize investigations, and reduce financial losses. Rather
                than reviewing every claim by hand, analysts get an instant
                fraud probability for each case along with clear reasoning that
                supports their decisions and regulatory compliance.
              </p>
              <p className="text-gray-300 leading-relaxed text-justify">
                The system pairs a trained AutoGluon ensemble with SHAP
                explainability and optional LLM-generated summaries. Every
                prediction is fully transparent: SHAP contributions show exactly
                how each feature pushed the risk score up or down, following a
                simple additive form: baseline plus feature impacts equals the
                final risk score. An interactive dashboard lets analysts adjust
                claim signals and explore &quot;what-if&quot; scenarios in real
                time.
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
              The model is trained on the 2023 Travelers NESS Statathon dataset
              of synthetic insurance claim records with fraud labels, covering
              driver demographics, claim details, and vehicle information:
            </p>
            <ul className="space-y-2 text-gray-300 mb-6 text-justify">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">
                    Travelers NESS Statathon:
                  </strong>{" "}
                  Open 2023 Kaggle competition data with labeled fraudulent and
                  legitimate claims, making the prototype reproducible and
                  auditable.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Claim Features:</strong> The
                  10 most impactful signals by SHAP: annual income, age of
                  driver, claim day of week, higher education, past number of
                  claims, safety rating, witness present, gender, estimated
                  payout, and living status.
                </span>
              </li>
            </ul>

            <p className="text-gray-300 leading-relaxed mb-6 text-justify">
              Claims exceeding a configurable 65% fraud-probability threshold
              are flagged as high risk, focusing analyst attention where it
              matters most.
            </p>
          </section>

          {/* Methods */}
          <section>
            <h2 className="text-xl font-semibold text-light mb-4 flex items-center gap-3">
              <span className="w-1 h-6 bg-accent rounded-full"></span>
              Methods
            </h2>

            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              Risk Profiler runs a prediction pipeline that combines a trained
              AutoGluon model with SHAP explainability and optional LLM
              summaries:
            </p>

            <ul className="space-y-4 text-gray-300 mb-6 text-justify">
              <li>
                <strong className="text-gray-200">Stage 1 (Prediction):</strong>{" "}
                An AutoGluon TabularPredictor (NeuralNetTorch ensemble) outputs
                a fraud probability and a binary decision against the
                configurable threshold.
              </li>
              <li>
                <strong className="text-gray-200">
                  Stage 2 (Explainability):
                </strong>
                <ul className="mt-2 ml-4 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>
                      <strong className="text-gray-300">
                        SHAP Contributions:
                      </strong>{" "}
                      A KernelExplainer with a 25-sample background computes
                      per-instance feature contributions.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>
                      <strong className="text-gray-300">
                        Additive Scoring:
                      </strong>{" "}
                      Baseline plus the sum of feature impacts reconstructs the
                      risk score, so each input&apos;s push up or down is
                      explicit.
                    </span>
                  </li>
                </ul>
              </li>
              <li>
                <strong className="text-gray-200">
                  Stage 3 (Summary &amp; UI):
                </strong>{" "}
                An OpenAI model (GPT-4o-mini, configurable) generates a natural
                language assessment, with a template fallback when no API key is
                set, and the dashboard renders the risk score, summary, and an
                explainability panel with the additive contributions.
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
              By replacing manual scoring with explainable, on-demand
              predictions, the prototype delivers practical gains for fraud
              investigation workflows:
            </p>

            <ul className="space-y-2 text-gray-300 mb-6 text-justify">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Review Speed:</strong>{" "}
                  Instant fraud probability and explanations replace full manual
                  scoring and analysis.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Analyst Focus:</strong>{" "}
                  Reviewers concentrate on high-risk and edge cases instead of
                  examining every claim.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Consistency:</strong>{" "}
                  Standardized scoring and reasoning remove reviewer-to-reviewer
                  variance.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Explainability:</strong>{" "}
                  SHAP contributions and an LLM summary replace hand-written
                  notes with auditable reasoning.
                </span>
              </li>
            </ul>

            {/* Figure 1: Dashboard */}
            <figure id="figure-1" className="scroll-mt-24">
              <ImageLightbox
                src="/portfolio/risk-profiler/dashboard.webp"
                alt="Risk Profiler interactive dashboard with fraud risk score and SHAP feature effects"
                width={2149}
                height={2745}
                maxWidth="lg"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 1.</span> Risk Profiler
                dashboard: adjustable claim features, a risk-score gauge with
                threshold, and a SHAP explainability panel showing each
                feature&apos;s additive impact alongside an AI-generated
                summary.
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
              Risk Profiler shows how explainable machine learning can support,
              rather than replace, human fraud analysts. By pairing accurate
              AutoGluon predictions with transparent SHAP contributions and
              concise LLM summaries, it turns opaque risk scores into auditable,
              defensible decisions while keeping a human firmly in the loop.
            </p>
            <p className="text-gray-300 leading-relaxed text-justify">
              As a prototype, it is built for extension: the decision threshold
              and the OpenAI summary model are both configurable, and the
              batch-ready API is positioned for integration into existing claims
              platforms and larger fraud-detection workflows.
            </p>
          </section>
        </div>
      </div>
      {/* Bottom spacing before footer */}
      <div className="pb-24" />
    </main>
  );
}
