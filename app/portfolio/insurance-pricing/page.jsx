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
  title: "Insurance Pricing",
  description:
    "End-to-end ML application for predicting annual insurance charges with SHAP-based explainability and LLM-powered interpretation for business and technical users.",
  path: "/portfolio/insurance-pricing/",
  image: {
    url: "/portfolio/previews/insurance-pricing.jpg",
    alt: "Insurance Pricing - explainable ML for insurance charge prediction",
  },
});

const HIGHLIGHTS_ITEMS = [
  {
    icon: faSearch,
    label: "Situation",
    text: "Insurance pricing leans on actuarial models that work well but are opaque (hard for non-technical stakeholders to interpret) and assessed with metrics that aren't translated into business impact.",
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
    text: "Turned a black-box estimate into a transparent quote. Every prediction ships with ranked cost drivers and a readable explanation, closing the gap between model performance and stakeholder trust.",
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

export default function ProjectPage() {
  return (
    <div className="min-h-screen pt-24">
      <div className="w-full max-w-5xl mx-auto px-6 py-12 md:py-24">
        <ProjectHeader
          title="Insurance Pricing"
          subtitle="End-to-end ML system for predicting annual insurance charges with per-prediction explainability and business-readable reports"
          banner={{
            image: "/portfolio/previews/insurance-pricing.jpg",
            alt: "Insurance Pricing - explainable ML for insurance charge prediction",
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
                into a plain-language explanation: a headline, the key cost
                drivers, and caveats about model limitations. Built-in
                extrapolation warnings flag inputs outside the training
                distribution, and automated EDA and evaluation reports are
                rendered directly in the UI.
              </p>
            </div>
          </Section>

          {/* Data */}
          <Section title="Data">
            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              The model is trained on the public US Health Insurance Dataset,
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
              The deployment is databaseless: predictions are served entirely
              from the trained model artifact, with no external data store
              dependency.
            </p>
          </Section>

          {/* Methods */}
          <Section title="Methods">
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
                plain-language explanation: headline, key drivers, and caveats.
              </li>
              <li>
                <strong className="text-gray-200">Evaluation Reporting:</strong>{" "}
                Model quality is summarized with R², MAPE, and SMAPE, with
                LLM-based interpretation that puts those metrics into business
                context.
              </li>
            </ul>
          </Section>

          {/* Results */}
          <Section title="Results">
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
                Pricing dashboard: input panel, estimated annual charge, a
                plain-language interpretation of the main drivers, and the SHAP
                feature-impact chart.
              </figcaption>
            </figure>
          </Section>

          {/* Conclusion */}
          <Section title="Conclusion">
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
          </Section>
        </div>
      </div>
      {/* Bottom spacing before footer */}
      <div className="pb-24" />
    </div>
  );
}
