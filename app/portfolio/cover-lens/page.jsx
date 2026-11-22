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
  title: "CoverLens",
  description:
    "AI document pipeline and wording-based requirement matching for an insurance compliance platform, built on LlamaCloud extraction, pgvector retrieval and deterministic grading.",
  path: "/portfolio/cover-lens/",
  image: {
    url: "/portfolio/previews/cover-lens.jpg",
    alt: "CoverLens - AI document pipeline for insurance compliance",
  },
});

const HIGHLIGHTS_ITEMS = [
  {
    icon: faSearch,
    label: "Situation",
    text: "A broker for contractors checks the insurance of the subcontractors that general contractors hire. It has about 40 such clients and over 9,000 subcontractor records, and a gap can mean denied claims or delays.",
  },
  {
    icon: faBullseye,
    label: "Task",
    text: "Build the document AI for a compliance platform: turn certificates, policies and endorsements into structured data, and check wording requirements such as an endorsement clause, with a fixed rule deciding pass or fail.",
  },
  {
    icon: faCogs,
    label: "Action",
    text: "Built a pipeline on LlamaCloud Parse, Split and Extract that types each segment, and matched wording by vector and full-text search over pgvector behind a two-signal gate.",
  },
  {
    icon: faChartLine,
    label: "Result",
    text: "The pipeline reads uploaded bundles into structured records that a deterministic grader checks, and the wording gate was calibrated on 17 cases from two vendors' policy bundles, replacing manual document review.",
  },
];

const TEAM_MEMBERS = [
  {
    name: "Viacheslav Danilov",
    role: "Lead AI/ML Engineer",
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
    name: "Aleksandr Nasstrom",
    role: "Lead Software Engineer",
    organization: "Symfa",
    location: "Barcelona · Spain 🇪🇸",
    photo: "/people/aleksandr-nasstrom.webp",
    links: {
      linkedin: "https://www.linkedin.com/in/a-nasstrom",
      github: "https://github.com/a-nasstrom",
      email: "a.nasstrom@symfa.com",
    },
  },
  {
    name: "Nathan Y",
    role: "Compliance Specialist",
    organization: "GNP Brokerage",
    location: "New York · United States 🇺🇸",
    photo: "/people/john-doe.webp",
    links: {
      email: "nathany@gnpbrokerage.com",
    },
  },
  {
    name: "Tzipi Gelbart",
    role: "Chief Technology Officer",
    organization: "GNP Brokerage",
    location: "New York · United States 🇺🇸",
    photo: "/people/tzipi-gelbart.webp",
    links: {
      linkedin: "https://www.linkedin.com/in/tzipi-gelbart-74542027/",
      email: "tzipig@gnpbrokerage.com",
    },
  },
];

const RESOURCES = [];

const TECH_STACK = [
  "Python",
  "FastAPI",
  "LlamaCloud",
  "LlamaIndex",
  "OpenAI",
  "pgvector",
  "RabbitMQ",
  "Redis",
];

export default function ProjectPage() {
  return (
    <div className="min-h-screen pt-24">
      <div className="w-full max-w-5xl mx-auto px-6 py-12 md:py-24">
        <ProjectHeader
          title="CoverLens"
          subtitle="AI document pipeline and requirement matching for a platform that checks subcontractor insurance against project requirements"
          banner={{
            image: "/portfolio/previews/cover-lens.jpg",
            alt: "CoverLens - AI document pipeline for insurance compliance",
          }}
          client={{
            name: "GNP Brokerage",
            url: "https://gnpbrokerage.com/",
            location: "New York · United States 🇺🇸",
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
                GNP Brokerage is an insurance broker for contractors. It manages
                insurance compliance for the subcontractors that general
                contractors (GCs) hire: certificates of insurance (COIs),
                policies, endorsements, limits and expiry dates. The business
                has about 40 GC clients and over 9,000 subcontractor records. A
                subcontractor that falls out of compliance can lead to denied
                claims, contract breaches and project delays.
              </p>
              <p className="text-body leading-relaxed mb-4 text-justify">
                CoverLens is the AI part of the compliance platform that Symfa
                built for GNP. The platform is multi-tenant, with an admin
                portal, a GC portal, a central login, a vendor landing page, a
                FastAPI backend and a document worker. The worker turns each
                uploaded file into structured records, and a grader checks those
                records against the requirements of a project.
              </p>
              <p className="text-body leading-relaxed text-justify">
                The AI work covers the document pipeline, its AI integration,
                the retrieval and the semantic matching. The grading, the
                form-read, the operations read and the portals were team work.
              </p>
            </div>
          </Section>

          <Section title="Data">
            <p className="text-body leading-relaxed mb-4 text-justify">
              The inputs are uploaded files and the requirements that they are
              checked against:
            </p>
            <ul className="space-y-2 text-body mb-6 text-justify">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-strong">Files:</strong> PDFs and
                  raster images, born-digital or scanned. One upload can be a
                  scanned bundle that holds several documents.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-strong">Segments:</strong> Each
                  document in an upload is typed as a COI, a policy, an
                  endorsement or other.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-strong">Requirements:</strong> Limits,
                  dates and checkboxes grade from extracted fields. Wording
                  requirements, such as an endorsement clause, grade by
                  retrieval.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-strong">Calibration set:</strong> 17
                  cases from the policy bundles of two vendors, 8 from one and 9
                  from the other, used to set the thresholds of the wording
                  match.
                </span>
              </li>
            </ul>
          </Section>

          <Section title="Methods">
            <p className="text-body leading-relaxed mb-4 text-justify">
              The document worker takes each upload through four stages, shown
              in{" "}
              <a href="#figure-1" className="text-accent hover:underline">
                Figure 1
              </a>
              :
            </p>
            <ul className="space-y-4 text-body mb-6 text-justify">
              <li>
                <strong className="text-strong">Stage 1 (Intake):</strong> The
                backend queues a job in RabbitMQ, and the worker picks it up,
                with up to five jobs at once by default. Raster images become
                PDFs. The file is hashed with SHA-256, and a Redis cache holds
                the LlamaCloud file id, so a retry does not upload it again. The
                worker also has retries, timeouts and health checks.
              </li>
              <li>
                <strong className="text-strong">Stage 2 (Read):</strong>
                <ul className="mt-2 ml-4 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>
                      <strong className="text-body">Parse and Split:</strong>{" "}
                      LlamaCloud Parse and Split run in parallel and type each
                      segment. A deterministic safety net splits repeated ACORD
                      25 face pages of one scanned bundle.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>
                      <strong className="text-body">Extract:</strong> LlamaCloud
                      Extract runs on each segment, four at a time per job, with
                      schemas generated from one shared compliance field schema.
                      The Parse and Extract versions are pinned. This pipeline
                      replaced an earlier optical character recognition (OCR)
                      path.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>
                      <strong className="text-body">Form-read:</strong> On a
                      born-digital ACORD 25, the checkbox columns and the
                      carrier are read again from the PDF content.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>
                      <strong className="text-body">Operations read:</strong> A
                      small OpenAI model reads the Description of Operations and
                      the certificate holder box again. A field is kept only if
                      its quote appears verbatim in the parsed text.
                    </span>
                  </li>
                </ul>
              </li>
              <li>
                <strong className="text-strong">Stage 3 (Index):</strong>{" "}
                Policy, endorsement and other segments are split by meaning with
                the LlamaIndex semantic splitter and embedded with OpenAI
                text-embedding-3-small, at 1536 dimensions, into pgvector. The
                table has a Hierarchical Navigable Small World (HNSW) index and
                a full-text index. The worker then reports completed or error,
                and the backend stores the result and fires a trigger event.
              </li>
              <li>
                <strong className="text-strong">Stage 4 (Grade):</strong> A
                deterministic coverage-graph grader walks the holder, the
                certificate, the line of coverage, the policy and the supporting
                pages, and writes a status for each requirement. A language
                model never decides pass or fail, which keeps results auditable.
                An operator&apos;s waiver or override outranks the engine
                verdict.
              </li>
            </ul>

            {/* Figure 1: Pipeline */}
            <figure id="figure-1" className="scroll-mt-24 mb-8">
              <ImageLightbox
                src="/portfolio/cover-lens/cover-lens-pipeline.webp"
                alt="CoverLens pipeline in four stages: intake with a queue and a worker, read with LlamaCloud Parse, Split and Extract, index into pgvector, and grade with a coverage-graph grader and a wording match"
                width={2400}
                height={1458}
                maxWidth="full"
              />
              <figcaption className="text-center text-sm text-muted mt-3">
                <span className="text-body">Figure 1.</span> The CoverLens
                pipeline in four stages. Violet boxes are model steps, pink
                boxes are fixed-rule steps, and blue boxes are queue and
                storage.
              </figcaption>
            </figure>

            <p className="text-body leading-relaxed mb-4 text-justify">
              A wording requirement, such as an endorsement clause, has no field
              to compare. The operator&apos;s wording is embedded and searched
              by vector and by full text, and the best sentence of each
              candidate is scored for how much of the wording it covers. A
              two-signal gate accepts a hit when wording coverage is at least
              0.90, or when cosine similarity is at least 0.60 together with
              wording coverage of at least 0.60. The match is retrieval, not
              generation, and it does not check negation.
            </p>
          </Section>

          <Section title="Results">
            <p className="text-body leading-relaxed mb-4 text-justify">
              The pipeline replaces reading each document by hand with
              structured records and a status for each requirement.{" "}
              <a href="#figure-2" className="text-accent hover:underline">
                Figure 2
              </a>{" "}
              shows the flow in the admin portal, on fictional demo data.
            </p>

            {/* Figure 2: Demo */}
            <figure id="figure-2" className="scroll-mt-24 mb-8">
              <div className="mx-auto w-full max-w-2xl rounded-xl overflow-hidden border border-line">
                <AutoplayVideo
                  aspectRatio="16 / 9"
                  poster="/portfolio/cover-lens/demo-cover-lens-poster.webp"
                  soundHint
                  controls
                  aria-label="CoverLens admin portal walkthrough: certificate upload, extraction, Document Review checks and the project compliance list"
                  className="block w-full h-auto"
                >
                  <source
                    src="/portfolio/cover-lens/demo-cover-lens.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </AutoplayVideo>
              </div>
              <figcaption className="text-center text-sm text-muted mt-3">
                <span className="text-body">Figure 2.</span> Walkthrough of the
                admin portal on fictional data: certificate extraction,
                requirement checks, and bundle splitting.
              </figcaption>
            </figure>

            <ul className="space-y-2 text-body mb-6 text-justify">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-strong">Documents:</strong> A bundle
                  is split into typed segments, and each segment is read into
                  the fields of its schema. Images are converted to PDFs before
                  parsing.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-strong">Verdicts:</strong> Pass or
                  fail comes from a deterministic grader, never from a language
                  model, and an operator can waive or override a status.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-strong">Wording match:</strong> The
                  gate thresholds of 0.90 and 0.60 come from calibration on 17
                  cases from two vendors' policy bundles. In that calibration, a
                  look-alike clause scored a higher cosine (0.7015) than the
                  true hit (0.4950), so cosine alone cannot decide. Wording
                  coverage corrects it.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-strong">Embedding width:</strong> A
                  check re-embedded 739 chunks and 17 requirements at 3072 and
                  1536 dimensions. It found no verdict difference across 85
                  combinations, so the index uses 1536.
                </span>
              </li>
            </ul>
          </Section>

          <Section title="Conclusion">
            <p className="text-body leading-relaxed mb-4 text-justify">
              CoverLens splits the work the way compliance needs it. Models read
              the documents and find the wording, and a fixed grader decides
              pass or fail, so every result can be audited. Operator waivers and
              overrides stay above the engine verdict.
            </p>
            <p className="text-body leading-relaxed text-justify">
              The wording match is retrieval and does not check negation. Its
              thresholds rest on 17 calibration cases from two vendors' policy
              bundles, which is a small set.
            </p>
          </Section>

          <NextProject id="cover-lens" />
        </div>
      </div>
      <div className="pb-24" />
    </div>
  );
}
