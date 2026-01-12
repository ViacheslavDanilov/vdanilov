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
  title: "Immune Profiler",
  description:
    "ML-driven workflow for tumor immune phenotype classification using HoVer-Net and AutoML on histopathology images.",
  openGraph: {
    title: "Immune Profiler | Viacheslav Danilov",
    description:
      "ML-driven workflow for tumor immune phenotype classification using HoVer-Net and AutoML on histopathology images.",
    images: [
      {
        url: "/portfolio/previews/immune-profiler.jpg",
        width: 1200,
        height: 630,
        alt: "Immune Profiler - Tumor immune phenotype classification",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Immune Profiler | Viacheslav Danilov",
    description:
      "ML-driven workflow for tumor immune phenotype classification using HoVer-Net and AutoML on histopathology images.",
    images: ["/portfolio/previews/immune-profiler.jpg"],
  },
};

const HIGHLIGHTS_ITEMS = [
  {
    icon: faSearch,
    label: "Situation",
    text: "Boehringer Ingelheim needed to automate tumor immune phenotype classification from histopathology images to support personalized cancer treatment.",
  },
  {
    icon: faBullseye,
    label: "Task",
    text: "Lead the ML efforts to build a scalable, accurate AI solution for phenotype detection.",
  },
  {
    icon: faCogs,
    label: "Action",
    text: "Integrated HoVer-Net for nucleus segmentation, extracted image features, and applied AutoML for cell classification and immune archetype assignment.",
  },
  {
    icon: faChartLine,
    label: "Result",
    text: "Achieved 89% F1-score, reduced manual workload, and improved diagnostic precision.",
  },
];

const TEAM_MEMBERS = [
  {
    name: "Viacheslav Danilov",
    role: "Lead ML Engineer",
    organization: "Quantori",
    location: "Cambridge · United States 🇺🇸",
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
    name: "Maxim Kazanskiy",
    role: "Senior CV Engineer",
    organization: "Quantori",
    location: "Cambridge · United States 🇺🇸",
    photo: "/people/maxim-kazanskiy.webp",
    links: {
      linkedin: "https://www.linkedin.com/in/maksim-kazanskii-16658930/",
      email: "mkazanskii@googlemail.com",
    },
  },
  {
    name: "Anton Makoveev",
    role: "CV Engineer",
    organization: "Quantori",
    location: "Cambridge · United States 🇺🇸",
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
    name: "Yuriy Popov",
    role: "Histopathologist",
    organization: "AstraZeneca",
    location: "Munich · Germany 🇩🇪",
    photo: "/people/yuriy-popov.webp",
    links: {
      linkedin: "https://www.linkedin.com/in/yury-popov-170298222/",
      email: "popow.yu.a@gmail.com",
    },
  },
  {
    name: "Di Feng",
    role: "Lead Bioinformatics Scientist",
    organization: "Boehringer Ingelheim",
    location: "Ridgefield · United States 🇺🇸",
    photo: "/people/di-feng.webp",
    links: {
      globe: "https://rocketreach.co/di-feng-email_7695000",
      linkedin: "https://www.linkedin.com/in/di-feng-23310810/",
      researchgate: "https://www.researchgate.net/profile/Di-Feng-10",
      email: "di.feng@boehringer-ingelheim.com",
    },
  },
];

const RESOURCES = [
  {
    label: "Blog Post",
    url: "https://quantori.com/blog/harnessing-ai-for-histopathology-a-leap-towards-precision-medicine",
  },
];

const TECH_STACK = [
  "PyTorch",
  "HoVer-Net",
  "scikit-learn",
  "OpenSlide",
  "HDBSCAN",
  "AutoML",
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
      <div className="flex flex-col items-center text-center h-full">
        <div className="relative w-24 h-24 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-accent/20 shadow-lg bg-dark mb-4">
          <Image
            src={member.photo}
            alt={member.name}
            fill
            sizes="(max-width: 768px) 80px, 96px"
            className="object-cover"
          />
        </div>
        <h4 className="text-base font-bold text-light mb-1.5">{member.name}</h4>
        <p className="text-sm font-medium text-accent mb-2">{member.role}</p>
        <p className="text-sm text-gray-300 mb-2">{member.organization}</p>
        <p className="text-sm text-gray-500 mb-4">{member.location}</p>
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
          image="/portfolio/previews/immune-profiler.jpg"
          alt="Immune Profiler - Tissue immune cell profiling from histopathology"
        />

        {/* Project Header */}
        <header className="mb-16 p-6 rounded-2xl bg-light/[0.03]">
          <h1 className="text-3xl md:text-4xl font-bold text-light mb-3">
            Immune Profiler
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Tumor immune phenotype classification for personalized cancer
            treatment
          </p>

          {/* Divider */}
          <div className="h-px bg-light/10 my-8" />

          {/* Client */}
          <div className="text-sm text-gray-400">
            <span className="text-gray-400 font-medium">Client: </span>
            <a
              href="https://www.boehringer-ingelheim.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Boehringer Ingelheim
            </a>
            <span className="text-gray-400"> · Ingelheim · Germany 🇩🇪</span>
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
              {HIGHLIGHTS_ITEMS.map((item, index) => (
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
                This project focuses on developing an end-to-end ML-driven
                workflow to classify the immunological phenotype of human solid
                tumors based on whole slide images (WSIs). The immunological
                phenotypes — immune inflamed, immune excluded, and immune desert
                — are essential for understanding tumor biology, predicting
                disease progression, and tailoring immunotherapy.
              </p>
              <p className="text-gray-300 leading-relaxed text-justify">
                The workflow integrates advanced machine learning and deep
                learning methods for nucleus segmentation, feature extraction,
                and classification to identify stromal, lymphocyte, and cancer
                cells. The automated solution reduces manual effort, enhances
                diagnostic precision, and facilitates personalized treatment
                strategies.
              </p>
            </div>
          </section>

          {/* Data */}
          <section>
            <h2 className="text-xl font-semibold text-light mb-4 flex items-center gap-3">
              <span className="w-1 h-6 bg-accent rounded-full"></span>
              Data
            </h2>

            <p className="text-gray-300 leading-relaxed mb-6 text-justify">
              Tumor immune phenotypes — immune inflamed, excluded, and desert —
              are essential for advancing oncology and directly influence how
              well a patient may respond to immunotherapy. Inflamed tumors often
              have a better prognosis as immune cells are actively infiltrating
              the tumor, while excluded and desert phenotypes present greater
              challenges. By automating the analysis of these phenotypes, we aim
              to support oncologists in tailoring treatments to each patient.
            </p>

            {/* Phenotype Examples */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <ImageLightbox
                  src="/portfolio/immune-profiler/immune-inflamed.webp"
                  alt="Immune Inflamed Phenotype"
                  width={800}
                  height={800}
                  maxWidth="full"
                />
                <p className="text-center text-sm text-gray-400 mt-2">
                  Immune Inflamed
                </p>
              </div>
              <div>
                <ImageLightbox
                  src="/portfolio/immune-profiler/immune-excluded.webp"
                  alt="Immune Excluded Phenotype"
                  width={800}
                  height={800}
                  maxWidth="full"
                />
                <p className="text-center text-sm text-gray-400 mt-2">
                  Immune Excluded
                </p>
              </div>
              <div>
                <ImageLightbox
                  src="/portfolio/immune-profiler/immune-desert.webp"
                  alt="Immune Desert Phenotype"
                  width={800}
                  height={800}
                  maxWidth="full"
                />
                <p className="text-center text-sm text-gray-400 mt-2">
                  Immune Desert
                </p>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              The dataset comprised 76 whole slide images (WSIs) of human solid
              tumors, including rectal, colorectal, and lung adenocarcinomas:
            </p>

            <ul className="space-y-2 text-gray-300 mb-6 text-justify">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Patches:</strong> 5.7
                  million patches generated, 2.7 million tissue-rich patches
                  selected for analysis
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Annotations:</strong> 527
                  tissue-rich patches manually annotated with 7,318 nuclei
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Cell Types:</strong>{" "}
                  Tumor-infiltrating lymphocytes (TIL), tumor cells, and stromal
                  cells
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Labeling:</strong> Weakly
                  supervised methods were employed to ensure high-quality
                  labeling of TIL, tumor, and stromal cell populations.
                </span>
              </li>
            </ul>
          </section>

          {/* Methods */}
          <section>
            <h2 className="text-xl font-semibold text-light mb-4 flex items-center gap-3">
              <span className="w-1 h-6 bg-accent rounded-full"></span>
              Methods
            </h2>

            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              The proposed solution comprises five main stages (
              <a href="#figure-1" className="text-accent hover:underline">
                Figure 1
              </a>
              ):
            </p>

            <ul className="space-y-4 text-gray-300 mb-6 text-justify">
              <li>
                <strong className="text-gray-200">WSI Slicing:</strong> Whole
                slide images were divided into smaller high-resolution patches
                using a custom slicing algorithm (
                <a href="#figure-2" className="text-accent hover:underline">
                  Figure 2
                </a>
                ).
              </li>
              <li>
                <strong className="text-gray-200">Nucleus Segmentation:</strong>{" "}
                HoVer-Net, a state-of-the-art deep learning model, was used to
                segment nuclei.
              </li>
              <li>
                <strong className="text-gray-200">Feature Extraction:</strong>{" "}
                Detailed features such as shape, texture, and intensity were
                extracted from segmented nuclei for downstream analysis.
              </li>
              <li>
                <strong className="text-gray-200">
                  Nucleus Classification:
                </strong>{" "}
                An AutoML-based approach using the{" "}
                <a
                  href="https://mljar.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  mljar
                </a>{" "}
                framework classified nuclei into cancer cells, lymphocytes,
                stromal cells, or others.
              </li>
              <li>
                <strong className="text-gray-200">
                  Immune Archetype Assignment:
                </strong>{" "}
                Cells were clustered based on type and spatial arrangement to
                estimate density distributions, assigning tumors as immune
                inflamed, excluded, or desert.
              </li>
            </ul>

            {/* Figure 1: Workflow */}
            <figure id="figure-1" className="mb-6 scroll-mt-24">
              <ImageLightbox
                src="/portfolio/immune-profiler/histopathology-workflow.webp"
                alt="Histopathology Classification Workflow"
                width={1920}
                height={1080}
                maxWidth="full"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 1.</span> End-to-end ML
                workflow for tumor immune phenotype classification from whole
                slide images.
              </figcaption>
            </figure>

            {/* Figure 2: Slicing Workflow */}
            <figure id="figure-2" className="scroll-mt-24">
              <ImageLightbox
                src="/portfolio/immune-profiler/slicing-workflow.webp"
                alt="WSI Slicing Workflow"
                width={1920}
                height={1080}
                maxWidth="full"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 2.</span> Custom slicing
                algorithm dividing whole slide images into high-resolution
                patches for analysis.
              </figcaption>
            </figure>
          </section>

          {/* Results */}
          <section>
            <h2 className="text-xl font-semibold text-light mb-4 flex items-center gap-3">
              <span className="w-1 h-6 bg-accent rounded-full"></span>
              Results
            </h2>

            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              The results highlight the performance and scalability of the
              developed pipeline across segmentation, classification, and immune
              archetype determination:
            </p>

            <ul className="space-y-2 text-gray-300 mb-6 text-justify">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">WSI Slicing:</strong> From
                  5.7 million patches generated, only 2.7 million containing
                  tissue were retained, ensuring efficient downstream
                  processing.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">
                    Nucleus Segmentation:
                  </strong>{" "}
                  HoVer-Net achieved a Dice Similarity Coefficient of{" "}
                  <span className="font-semibold">90%</span> on validation and{" "}
                  <span className="font-semibold">75%</span> on test subset.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">
                    Nucleus Classification:
                  </strong>{" "}
                  The AutoML classifier achieved a weighted F1-score of{" "}
                  <span className="text-light font-semibold">89%</span>, with
                  high precision for lymphocytes (F1-score: 0.74).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">
                    Immune Archetype Determination:
                  </strong>{" "}
                  The pipeline assigned archetypes with high reproducibility,
                  enabling consistent classification into immune inflamed,
                  excluded, or desert categories (
                  <a href="#figure-3" className="text-accent hover:underline">
                    Figure 3
                  </a>
                  ).
                </span>
              </li>
            </ul>

            {/* Figure 3: Workflow Output */}
            <figure id="figure-3" className="scroll-mt-24">
              <ImageLightbox
                src="/portfolio/immune-profiler/histopathology-workflow-output.webp"
                alt="Workflow Output Visualization"
                width={1920}
                height={1080}
                maxWidth="full"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 3.</span> Visualization
                of the pipeline output showing segmented cells and predicted
                archetypes on a whole slide image. The source WSI is available
                for detailed viewing at the{" "}
                <a
                  href="https://portal.gdc.cancer.gov/image-viewer/MultipleImageViewerPage?caseId=34040b83-7e8a-4264-a551-b16621843e28"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  GDC Data Portal
                </a>
                .
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
              The hybrid deep and machine learning workflow successfully
              classified tumor immune phenotypes — immune inflamed, excluded,
              and desert — using whole slide images. This classification aids in
              predicting cancer progression and tailoring immunotherapy
              strategies.
            </p>
            <p className="text-gray-300 leading-relaxed text-justify">
              The methodology showcased high accuracy and adaptability across
              different tumor types. Future enhancements could involve
              integrating multi-modal data such as gene expression profiles or
              leveraging foundation models to refine classification further.
            </p>
          </section>
        </div>
      </div>
      {/* Bottom spacing before footer */}
      <div className="pb-24" />
    </main>
  );
}
