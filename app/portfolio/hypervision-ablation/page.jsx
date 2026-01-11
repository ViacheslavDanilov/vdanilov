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

export const metadata = {
  title: "HyperVision Ablation",
  description:
    "ML workflow for tissue ablation assessment in hyperspectral imaging using PCA, Faster R-CNN, and Mean Shift clustering.",
  openGraph: {
    title: "HyperVision Ablation | Viacheslav Danilov",
    description:
      "ML workflow for tissue ablation assessment in hyperspectral imaging using PCA, Faster R-CNN, and Mean Shift clustering.",
    images: [
      {
        url: "/portfolio/previews/hypervision-ablation.jpg",
        width: 1200,
        height: 630,
        alt: "HyperVision Ablation - Hyperspectral tissue analysis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HyperVision Ablation | Viacheslav Danilov",
    description:
      "ML workflow for tissue ablation assessment in hyperspectral imaging using PCA, Faster R-CNN, and Mean Shift clustering.",
    images: ["/portfolio/previews/hypervision-ablation.jpg"],
  },
};

const HIGHLIGHTS_ITEMS = [
  {
    icon: faSearch,
    label: "Situation",
    text: "The Institute for Image Guided Surgery in Strasbourg needed to automate evaluation of laser-induced tissue damage from hyperspectral imaging during surgical procedures.",
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
      globe:
        "https://www.mecc.polimi.it/dottorato/i-nostri-dottorandi/xxxiv-ciclo/martina-de-landro",
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

        {/* Project Header */}
        <header className="mb-16 p-6 rounded-2xl bg-light/[0.03]">
          <h1 className="text-3xl md:text-4xl font-bold text-light mb-3">
            HyperVision Ablation
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Harnessing ML for laser ablation assessment in hyperspectral imaging
          </p>

          {/* Divider */}
          <div className="h-px bg-light/10 my-8" />

          {/* Client */}
          <div className="text-sm text-gray-400">
            <span className="text-gray-400 font-medium">Client: </span>
            <a
              href="https://www.ihu-strasbourg.eu/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Institute for Image Guided Surgery
            </a>
            <span className="text-gray-400"> · Strasbourg · France 🇫🇷</span>
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
          </section>

          {/* Data */}
          <section>
            <h2 className="text-xl font-semibold text-light mb-4 flex items-center gap-3">
              <span className="w-1 h-6 bg-accent rounded-full"></span>
              Data
            </h2>

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
                <video
                  src="/portfolio/hypervision-ablation/input_data_abs.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  className="w-full rounded-lg"
                />
                <figcaption className="text-center text-sm text-gray-400 mt-2">
                  Absorbance modality
                </figcaption>
              </figure>
              <figure>
                <video
                  src="/portfolio/hypervision-ablation/input_data_hsv.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  className="w-full rounded-lg"
                />
                <figcaption className="text-center text-sm text-gray-400 mt-2">
                  HSV modality
                </figcaption>
              </figure>
              <figure>
                <video
                  src="/portfolio/hypervision-ablation/input_data_ref.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  className="w-full rounded-lg"
                />
                <figcaption className="text-center text-sm text-gray-400 mt-2">
                  Reflectance modality
                </figcaption>
              </figure>
            </div>
          </section>

          {/* Methods */}
          <section>
            <h2 className="text-xl font-semibold text-light mb-4 flex items-center gap-3">
              <span className="w-1 h-6 bg-accent rounded-full"></span>
              Methods
            </h2>

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
                width={1920}
                height={1080}
                maxWidth="full"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 1.</span> HSI analysis
                workflow integrating dimensionality reduction, object detection,
                and clustering for tissue ablation assessment.
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
                width={1920}
                height={1080}
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
                src="/portfolio/hypervision-ablation/сluster-number-comparison.webp"
                alt="Cluster Number Comparison"
                width={1920}
                height={1080}
                maxWidth="2xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 3.</span> Cluster number
                comparison between reflectance and absorbance imaging modes.
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
          </section>
        </div>
      </div>
      {/* Bottom spacing before footer */}
      <div className="pb-24" />
    </main>
  );
}
