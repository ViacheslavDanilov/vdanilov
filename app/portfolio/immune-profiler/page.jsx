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
  title: "Immune Profiler",
  description:
    "ML-driven workflow for tumor immune phenotype classification using HoVer-Net and AutoML on histopathology images.",
  path: "/portfolio/immune-profiler/",
  image: {
    url: "/portfolio/previews/immune-profiler.jpg",
    alt: "Immune Profiler - Tumor immune phenotype classification",
  },
});

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
      linkedin: "https://www.linkedin.com/in/yury-popov/",
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

export default function ProjectPage() {
  return (
    <div className="min-h-screen pt-24">
      <div className="w-full max-w-5xl mx-auto px-6 py-12 md:py-24">
        <ProjectHeader
          title="Immune Profiler"
          subtitle="Tumor immune phenotype classification for personalized cancer treatment"
          banner={{
            image: "/portfolio/previews/immune-profiler.jpg",
            alt: "Immune Profiler - Tissue immune cell profiling from histopathology",
          }}
          client={{
            name: "Boehringer Ingelheim",
            url: "https://www.boehringer-ingelheim.com/",
            location: "Ingelheim · Germany 🇩🇪",
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
                This project focuses on developing an end-to-end ML-driven
                workflow to classify the immunological phenotype of human solid
                tumors based on whole slide images (WSIs). The immunological
                phenotypes (immune inflamed, immune excluded, and immune desert)
                are essential for understanding tumor biology, predicting
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
          </Section>

          {/* Data */}
          <Section title="Data">
            <p className="text-gray-300 leading-relaxed mb-6 text-justify">
              Tumor immune phenotypes (immune inflamed, excluded, and desert)
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
              The dataset comprised 76 WSIs of human solid tumors, including
              rectal, colorectal, and lung adenocarcinomas:
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
          </Section>

          {/* Methods */}
          <Section title="Methods">
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
                width={2560}
                height={410}
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
                width={2560}
                height={750}
                maxWidth="full"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 2.</span> Custom slicing
                algorithm dividing whole slide images into high-resolution
                patches for analysis.
              </figcaption>
            </figure>
          </Section>

          {/* Results */}
          <Section title="Results">
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
                width={2560}
                height={1240}
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
          </Section>

          {/* Conclusion */}
          <Section title="Conclusion">
            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              The hybrid deep and machine learning workflow successfully
              classified tumor immune phenotypes (immune inflamed, excluded, and
              desert) using whole slide images. This classification aids in
              predicting cancer progression and tailoring immunotherapy
              strategies.
            </p>
            <p className="text-gray-300 leading-relaxed text-justify">
              The methodology showcased high accuracy and adaptability across
              different tumor types. Future enhancements could involve
              integrating multi-modal data such as gene expression profiles or
              leveraging foundation models to refine classification further.
            </p>
          </Section>
        </div>
      </div>
      {/* Bottom spacing before footer */}
      <div className="pb-24" />
    </div>
  );
}
