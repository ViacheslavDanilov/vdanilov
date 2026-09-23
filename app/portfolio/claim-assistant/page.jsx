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
  title: "Claim Assistant",
  description:
    "AI-powered insurance claim intake automation using Azure Document Intelligence and GPT-5 to extract, validate, and map claim data with per-field confidence scoring.",
  path: "/portfolio/claim-assistant/",
  image: {
    url: "/portfolio/previews/claim-assistant.jpg",
    alt: "Claim Assistant - AI-powered insurance claim automation",
  },
});

const HIGHLIGHTS_ITEMS = [
  {
    icon: faSearch,
    label: "Situation",
    text: "A large insurer processed ~107K claims per year across phone, email, fax, and portal, with 30 staff manually re-keying data into ASC, limited to 12h/day on weekdays.",
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

export default function ProjectPage() {
  return (
    <div className="min-h-screen pt-24">
      <div className="w-full max-w-5xl mx-auto px-6 py-12 md:py-24">
        <ProjectHeader
          title="Claim Assistant"
          subtitle="AI-powered automation that streamlines insurance claim intake with LLM-based PDF processing, policy matching, and coverage analysis"
          banner={{
            image: "/portfolio/previews/claim-assistant.jpg",
            alt: "Claim Assistant - AI-powered insurance claim automation platform",
          }}
          client={{
            name: "AmTrust",
            url: "https://amtrustfinancial.com/",
            location: "New York · United States 🇺🇸",
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
                Claim Assistant is an AI-powered solution that automates
                insurance claim intake and processing, transforming a slow,
                manual workflow into a fast, scalable, and accurate one. It
                converts filled insurance claim forms, including scanned and
                handwritten documents, into structured, validated data ready for
                downstream systems.
              </p>
              <p className="text-gray-300 leading-relaxed text-justify">
                The platform pairs specialized document intelligence with
                LLM-based reasoning. Azure Document Intelligence extracts
                key-value pairs, layout, and per-field confidence, while OpenAI
                GPT-5 maps the results to the target schema, resolves field
                aliases, and generates a coverage summary. A review interface
                with side-by-side PDF previews and bounding-box highlights lets
                adjusters verify, edit, and approve fields, with a
                confidence-driven queue that focuses attention only on the
                exceptions that need a human.
              </p>
            </div>
          </Section>

          {/* Data */}
          <Section title="Data">
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
              Inputs span PDFs, faxes, and emails, both digital and handwritten,
              across claim forms from eight US states (Florida, New Hampshire,
              Minnesota, Iowa, Kansas, New York, Ohio, and Wisconsin). The
              pipeline is form-agnostic, handling arbitrary layouts without
              per-form training, and flags any field extracted below 80%
              confidence for human review.
            </p>
          </Section>

          {/* Methods */}
          <Section title="Methods">
            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              Claim Assistant uses a two-stage pipeline that combines
              specialized document intelligence with LLM-based mapping and
              validation:
            </p>

            <ul className="space-y-4 text-gray-300 mb-6 text-justify">
              <li>
                <strong className="text-gray-200">
                  Stage 1 (Document Intelligence):
                </strong>{" "}
                Azure Document Intelligence (Form Recognizer v3.x) extracts
                key-value pairs, bounding boxes, layout structure, and per-field
                confidence scores from each document.
              </li>
              <li>
                <strong className="text-gray-200">
                  Stage 2 (LLM Mapping &amp; Validation):
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
          </Section>

          {/* Results */}
          <Section title="Results">
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
              input quality, from clean digital PDFs to noisy handwritten
              submissions, without per-form training:
            </p>

            {/* Figure 1: Wisconsin (digital) */}
            <figure id="figure-1" className="scroll-mt-24 mb-8">
              <ImageLightbox
                src="/portfolio/claim-assistant/wisconsin-digital.webp"
                alt="Claim Assistant review interface processing a digital Wisconsin claim form"
                width={4118}
                height={2146}
                maxWidth="2xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 1.</span> Claim Assistant
                review interface on a digital Wisconsin form: side-by-side PDF
                preview with extracted key fields, confidence scores, and
                per-field approval.
              </figcaption>
            </figure>

            {/* Figure 2: New Hampshire (handwritten) */}
            <figure id="figure-2" className="scroll-mt-24 mb-8">
              <ImageLightbox
                src="/portfolio/claim-assistant/new-hampshire-handwritten.webp"
                alt="Claim Assistant processing a handwritten New Hampshire claim form"
                width={4118}
                height={2146}
                maxWidth="2xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 2.</span> Handwritten New
                Hampshire form: fields extracted and validated despite free-form
                handwriting, with low-confidence values surfaced for review.
              </figcaption>
            </figure>

            {/* Figure 3: New Hampshire (digital) */}
            <figure id="figure-3" className="scroll-mt-24">
              <ImageLightbox
                src="/portfolio/claim-assistant/new-hampshire-digital.webp"
                alt="Claim Assistant processing a digital New Hampshire claim form"
                width={4118}
                height={2146}
                maxWidth="2xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 3.</span> Digital New
                Hampshire form: high-confidence extraction across key fields
                with an auto-generated coverage summary.
              </figcaption>
            </figure>
          </Section>

          {/* Conclusion */}
          <Section title="Conclusion">
            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              Claim Assistant shows how pairing document intelligence with LLM
              reasoning can turn a manual, bottlenecked claims operation into a
              scalable, 24/7 pipeline. Its hybrid approach (Azure for accurate
              extraction, GPT-5 for mapping and validation) combined with a
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
          </Section>
        </div>
      </div>
      {/* Bottom spacing before footer */}
      <div className="pb-24" />
    </div>
  );
}
