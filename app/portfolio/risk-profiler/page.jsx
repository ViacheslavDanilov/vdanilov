import {
  faSearch,
  faBullseye,
  faCogs,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import ImageLightbox from "@/components/ImageLightbox";
import { pageMetadata } from "@/lib/metadata";
import ProjectHeader from "@/components/project/ProjectHeader";
import Highlights from "@/components/project/Highlights";
import CoreTeam from "@/components/project/CoreTeam";
import Section from "@/components/project/Section";

export const metadata = pageMetadata({
  title: "Risk Profiler",
  description:
    "Machine learning prototype for insurance claim fraud risk profiling using AutoGluon ensembles, SHAP explainability, and LLM-generated assessment summaries.",
  path: "/portfolio/risk-profiler/",
  image: {
    url: "/portfolio/previews/risk-profiler.jpg",
    alt: "Risk Profiler - AI-powered insurance claim fraud detection",
  },
});

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

export default function ProjectPage() {
  return (
    <div className="min-h-screen pt-24">
      <div className="w-full max-w-5xl mx-auto px-6 py-12 md:py-24">
        <ProjectHeader
          title="Risk Profiler"
          subtitle="Machine learning prototype that profiles fraud risk in insurance claims with explainable, auditable predictions"
          banner={{
            image: "/portfolio/previews/risk-profiler.jpg",
            alt: "Risk Profiler - AI-powered insurance claim fraud detection platform",
          }}
          client={{
            name: "Symfa",
            url: "https://symfa.com/",
            location: "Miami · United States 🇺🇸",
          }}
          techStack={TECH_STACK}
          resources={RESOURCES}
        />

        {/* Content Sections */}
        <div className="space-y-16">
          <Highlights items={HIGHLIGHTS_ITEMS} />

          <CoreTeam members={TEAM_MEMBERS} />

          {/* Overview */}
          <Section title="Overview">
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
          </Section>

          {/* Data */}
          <Section title="Data">
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
          </Section>

          {/* Methods */}
          <Section title="Methods">
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
          </Section>

          {/* Results */}
          <Section title="Results">
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
          </Section>

          {/* Conclusion */}
          <Section title="Conclusion">
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
          </Section>
        </div>
      </div>
      {/* Bottom spacing before footer */}
      <div className="pb-24" />
    </div>
  );
}
