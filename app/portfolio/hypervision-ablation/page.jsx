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

export const metadata = pageMetadata({
  title: "HyperVision Ablation",
  description:
    "ML workflow for tissue ablation assessment in hyperspectral imaging using PCA, Faster R-CNN, and Mean Shift clustering.",
  path: "/portfolio/hypervision-ablation/",
  image: {
    url: "/portfolio/previews/hypervision-ablation.jpg",
    alt: "HyperVision Ablation - Hyperspectral tissue analysis",
  },
});

const HIGHLIGHTS_ITEMS = [
  {
    icon: faSearch,
    label: "Situation",
    text: "The Institute for Image-Guided Surgery in Strasbourg needed to automate evaluation of laser-induced tissue damage from hyperspectral imaging during surgical procedures.",
  },
  {
    icon: faBullseye,
    label: "Task",
    text: "Build an ML workflow to detect and segment ablation zones in hyperspectral imaging data.",
  },
  {
    icon: faCogs,
    label: "Action",
    text: "Used PCA and t-SNE for feature reduction, Faster R-CNN for detection, and Mean Shift for unsupervised segmentation.",
  },
  {
    icon: faChartLine,
    label: "Result",
    text: "Delivered a robust pipeline enhancing diagnostic accuracy and reproducibility across organs, aiding cancer therapy research.",
  },
];

const TEAM_MEMBERS = [
  {
    name: "Viacheslav Danilov",
    role: "Research Scientist",
    organization: "Politecnico di Milano",
    location: "Milan · Italy 🇮🇹",
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
    name: "Martina De Landro",
    role: "Research Scientist",
    organization: "Politecnico di Milano",
    location: "Milan · Italy 🇮🇹",
    photo: "/people/martina-de-landro.webp",
    links: {
      globe: "https://sciprofiles.com/profile/1293523",
      linkedin: "https://www.linkedin.com/in/martina-de-landro-9144b184/",
      researchgate: "https://www.researchgate.net/profile/Martina-De-Landro",
      google: "https://scholar.google.com/citations?user=5cbbF1UAAAAJ",
      email: "martina.delandro@polimi.it",
    },
  },
  {
    name: "Manuel Barberio",
    role: "Digestive Surgeon",
    organization: "Cardinale Panico Hospital",
    location: "Tricase · Italy 🇮🇹",
    photo: "/people/manuel-barberio.webp",
    links: {
      globe: "https://sciprofiles.com/profile/1245061",
      linkedin: "https://www.linkedin.com/in/manuel-barberio-0977a2186/",
      researchgate: "https://www.researchgate.net/profile/Manuel-Barberio",
      google: "https://scholar.google.fr/citations?user=I3rcUv0AAAAJ",
      email: "manuel.barberio@ircad.fr",
    },
  },
  {
    name: "Michele Diana",
    role: "Scientific Director",
    organization: "IRCAD",
    location: "Strasbourg · France 🇫🇷",
    photo: "/people/michael-diana.webp",
    links: {
      globe: "https://sciprofiles.com/profile/1373035",
      linkedin: "https://www.linkedin.com/in/michele-diana-b972382a/",
      researchgate: "https://www.researchgate.net/profile/Michele-Diana",
      google: "https://scholar.google.fr/citations?user=1HYUb68AAAAJ",
      email: "michele.diana@ircad.fr",
    },
  },
  {
    name: "Paola Saccomandi",
    role: "Principal Investigator",
    organization: "Politecnico di Milano",
    location: "Milan · Italy 🇮🇹",
    photo: "/people/paola-saccomandi.webp",
    links: {
      globe: "https://www.mecc.polimi.it/en/staff/paola.saccomandi",
      linkedin: "https://www.linkedin.com/in/paola-saccomandi-92759561",
      researchgate: "https://www.researchgate.net/profile/Paola-Saccomandi",
      google: "https://scholar.google.it/citations?user=VBOinLAAAAAJ&hl=en",
      email: "paola.saccomandi@polimi.it",
    },
  },
];

const RESOURCES = [
  {
    label: "Journal Paper",
    url: "https://www.sciencedirect.com/science/article/pii/S001048252400934X",
  },
  {
    label: "GitHub",
    url: "https://github.com/ViacheslavDanilov/hsi_analysis",
  },
  {
    label: "Models",
    url: "https://doi.org/10.5281/zenodo.10444269",
  },
  {
    label: "Dataset",
    url: "https://doi.org/10.5281/zenodo.10444212",
  },
];

const TECH_STACK = [
  "PyTorch",
  "MMDetection",
  "scikit-learn",
  "Hydra",
  "DVC",
  "OpenCV",
  "MLflow",
];

export default function ProjectPage() {
  return (
    <div className="min-h-screen pt-24">
      <div className="w-full max-w-5xl mx-auto px-6 py-12 md:py-24">
        <ProjectHeader
          title="HyperVision Ablation"
          subtitle="Harnessing ML for laser ablation assessment in hyperspectral imaging"
          banner={{
            image: "/portfolio/previews/hypervision-ablation.jpg",
            alt: "HyperVision Ablation - Hyperspectral imaging for tissue ablation",
          }}
          client={{
            name: "Institute for Image-Guided Surgery",
            url: "https://www.ihu-strasbourg.eu/",
            location: "Strasbourg · France 🇫🇷",
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
                This project advances the application of{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Hyperspectral_imaging"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  hyperspectral imaging
                </a>{" "}
                (HSI) in medical diagnostics by focusing on tissue ablation
                assessment during laser treatments. Leveraging machine learning
                techniques, the workflow integrates dimensionality reduction,
                object detection, and clustering for efficient analysis of
                high-dimensional HSI data.
              </p>
              <p className="text-gray-300 leading-relaxed text-justify">
                Principal Component Analysis (PCA) and t-distributed stochastic
                neighbour embedding (t-SNE) reveal critical spectral features,
                while Faster R-CNN accurately detects ablated regions. Mean
                Shift clustering is employed for precise segmentation of thermal
                damage zones. The workflow demonstrates robust performance
                across different organs, enabling automated, reproducible tissue
                analysis, and offers potential applications in laser cancer
                therapy and beyond.
              </p>
            </div>
          </Section>

          {/* Data */}
          <Section title="Data">
            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              The dataset consists of 233 hyperspectral cubes (dimensions: 640 ×
              480 × 100 voxels) captured during laser ablation experiments on
              porcine liver, pancreas, and stomach tissues. These hypercubes
              were acquired using a{" "}
              <a
                href="https://protexhealthcare.com/products/tivita/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                TIVITA hyperspectral camera
              </a>{" "}
              with a spectral range of 500–995 nm, encompassing 100 spectral
              bands for each image.
            </p>

            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              Data collection was carried out under controlled experimental
              conditions across three distinct phases:
            </p>

            <ul className="space-y-2 text-gray-300 mb-6 text-justify">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Pre-laparotomy:</strong>{" "}
                  Baseline measurements before laser application.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">
                    Temperature escalation:
                  </strong>{" "}
                  Imaging during laser-induced heating, with recorded
                  temperature thresholds ranging from 60°C to 110°C.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Post-ablation:</strong>{" "}
                  Imaging of tissue post-treatment to assess residual thermal
                  damage.
                </span>
              </li>
            </ul>

            <p className="text-gray-300 leading-relaxed mb-6 text-justify">
              To ensure spectral accuracy and spatial consistency, the camera
              was positioned 40 cm vertically above the surgical field, with
              lighting provided by a 20 W halogen lamp. For spatial referencing,
              polyurethane markers were placed around the target area.
              Reflectance and absorbance imaging modes were utilized, providing
              complementary insights into tissue properties.
            </p>

            {/* Video demonstrations */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <figure>
                <AutoplayVideo
                  aspectRatio="1 / 1"
                  src="/portfolio/hypervision-ablation/input-data-abs.mp4"
                  controls
                  className="w-full rounded-lg"
                />
                <figcaption className="text-center text-sm text-gray-400 mt-2">
                  Absorbance modality
                </figcaption>
              </figure>
              <figure>
                <AutoplayVideo
                  aspectRatio="1 / 1"
                  src="/portfolio/hypervision-ablation/input-data-hsv.mp4"
                  controls
                  className="w-full rounded-lg"
                />
                <figcaption className="text-center text-sm text-gray-400 mt-2">
                  HSV modality
                </figcaption>
              </figure>
              <figure>
                <AutoplayVideo
                  aspectRatio="1 / 1"
                  src="/portfolio/hypervision-ablation/input-data-ref.mp4"
                  controls
                  className="w-full rounded-lg"
                />
                <figcaption className="text-center text-sm text-gray-400 mt-2">
                  Reflectance modality
                </figcaption>
              </figure>
            </div>
          </Section>

          {/* Methods */}
          <Section title="Methods">
            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              This methodology employed a structured machine learning workflow
              to analyze hyperspectral imaging data for tissue ablation
              assessment. The workflow integrated dimensionality reduction for
              spectral simplification, object detection for ablation
              localization, and clustering techniques for segmentation of
              thermal damage zones (
              <a href="#figure-1" className="text-accent hover:underline">
                Figure 1
              </a>
              ):
            </p>

            <ul className="space-y-4 text-gray-300 mb-6 text-justify">
              <li>
                <strong className="text-gray-200">
                  Dimensionality Reduction:
                </strong>{" "}
                PCA and t-SNE were used to reduce the complexity of
                hyperspectral data, preserving key spectral features.
              </li>
              <li>
                <strong className="text-gray-200">Object Detection:</strong> A
                Faster R-CNN model was trained to detect and localize ablation
                regions in reflectance and absorbance images.
              </li>
              <li>
                <strong className="text-gray-200">Segmentation:</strong> To
                segment thermal damage zones in hyperspectral images, multiple
                clustering algorithms were evaluated, including k-means, DBSCAN,
                OPTICS, BIRCH, Mean Shift and others. These algorithms were
                chosen for their ability to handle high-dimensional data and
                varying cluster characteristics.
              </li>
            </ul>

            {/* Figure 1: Workflow */}
            <figure id="figure-1" className="scroll-mt-24">
              <ImageLightbox
                src="/portfolio/hypervision-ablation/hsi-analysis-workflow.webp"
                alt="HSI Analysis Workflow"
                width={2500}
                height={568}
                maxWidth="full"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 1.</span> HSI analysis
                workflow integrating dimensionality reduction, object detection,
                and clustering for tissue ablation assessment.
              </figcaption>
            </figure>
          </Section>

          {/* Results */}
          <Section title="Results">
            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              The proposed workflow demonstrated strong performance in detecting
              and segmenting laser-induced ablation regions in hyperspectral
              images:
            </p>

            <ul className="space-y-2 text-gray-300 mb-6 text-justify">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">
                    Dimensionality Reduction:
                  </strong>{" "}
                  PCA and t-SNE preserved critical spectral features while
                  simplifying high-dimensional data, improving processing
                  efficiency.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Object Detection:</strong>{" "}
                  Faster R-CNN achieved a mean Average Precision of{" "}
                  <span className="font-semibold">0.744</span> on
                  PCA-transformed reflectance data, accurately localizing
                  ablation regions.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">
                    Segmentation Evaluation:
                  </strong>{" "}
                  Mean Shift provided the best results, delivering high-quality
                  segmentation without manual input, thanks to its adaptability
                  and noise resilience (
                  <a href="#figure-2" className="text-accent hover:underline">
                    Figure 2
                  </a>
                  ).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Spectral Insights:</strong>{" "}
                  Cluster numbers varied significantly between reflectance and
                  absorbance modes (
                  <a href="#figure-3" className="text-accent hover:underline">
                    Figure 3
                  </a>
                  ) due to tissue-specific spectral characteristics and
                  temperature-dependent changes.
                </span>
              </li>
            </ul>

            {/* Figure 2: Clustering */}
            <figure id="figure-2" className="mb-6 scroll-mt-24">
              <ImageLightbox
                src="/portfolio/hypervision-ablation/clustering.webp"
                alt="Clustering Comparison"
                width={1626}
                height={2500}
                maxWidth="lg"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 2.</span> Comparison of
                clustering algorithms for thermal damage zone segmentation.
              </figcaption>
            </figure>

            {/* Figure 3: Cluster Number Comparison */}
            <figure id="figure-3" className="scroll-mt-24">
              <ImageLightbox
                src="/portfolio/hypervision-ablation/cluster-number-comparison.webp"
                alt="Cluster Number Comparison"
                width={2500}
                height={1250}
                maxWidth="2xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 3.</span> Cluster number
                comparison between reflectance and absorbance imaging modes.
              </figcaption>
            </figure>
          </Section>

          {/* Conclusion */}
          <Section title="Conclusion">
            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              This project introduced a robust pipeline for analyzing
              hyperspectral imaging data to detect and segment laser-induced
              tissue ablation. Combining dimensionality reduction, object
              detection, and clustering techniques, the workflow achieved
              high-quality and automated segmentation.
            </p>
            <p className="text-gray-300 leading-relaxed text-justify">
              These advancements have significant implications for medical
              diagnostics, particularly in laser cancer therapy. Future work
              could involve refining the pipeline for real-time applications and
              extending its use to other medical imaging modalities.
            </p>
          </Section>
        </div>
      </div>
      {/* Bottom spacing before footer */}
      <div className="pb-24" />
    </div>
  );
}
