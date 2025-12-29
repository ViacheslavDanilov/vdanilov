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
  title: "Histo Scanner – Viacheslav Danilov",
  description:
    "Deep learning pipeline for segmenting microvascular features in tissue-engineered vascular grafts. Achieved 89% Dice score using an ensemble of optimized neural networks.",
};

const HIGHLIGHTS_ITEMS = [
  {
    icon: faSearch,
    label: "Situation",
    text: "Clinical biologists at the Kemerovo Cardiology Center needed accurate segmentation of microvascular features in TEVG histology images to assess vascular regeneration in sheep models.",
  },
  {
    icon: faBullseye,
    label: "Task",
    text: "Lead model development and deliver a robust segmentation pipeline for nine histological features.",
  },
  {
    icon: faCogs,
    label: "Action",
    text: "Optimized six deep learning architectures and created an ensemble model using cross-validation, augmentation, and Bayesian tuning.",
  },
  {
    icon: faChartLine,
    label: "Result",
    text: "Achieved a mean Dice score of 89%, enabling precise tissue analysis and accelerating biomedical research.",
  },
];

const TEAM_MEMBERS = [
  {
    name: "Viacheslav Danilov",
    role: "Lead Data Scientist",
    organization: "Pompeu Fabra University",
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
    name: "Vladislav Laptev",
    role: "Senior Data Scientist",
    organization: "Siberian Medical University",
    location: "Tomsk · Russia 🇷🇺",
    photo: "/people/vladislav-laptev.webp",
    links: {
      globe: "https://loop.frontiersin.org/people/2713564/overview",
      github: "https://github.com/vladislavml",
      orcid: "https://orcid.org/0000-0001-8639-8889",
      email: "lptwlad1@gmail.com",
    },
  },
  {
    name: "Kirill Klyshnikov",
    role: "Biomedical Scientist",
    organization: "Kemerovo Cardiology Center",
    location: "Kemerovo · Russia 🇷🇺",
    photo: "/people/kirill-klyshnikov.webp",
    links: {
      globe: "https://loop.frontiersin.org/people/1380790/overview",
      linkedin: "https://www.linkedin.com/in/kirill-klyshnikov-83304b78/",
      researchgate: "https://www.researchgate.net/profile/Kirill-Klyshnikov",
      google: "https://scholar.google.com/citations?user=K2r_PIQAAAAJ&hl=en",
      email: "klyshnikovk@gmail.com",
    },
  },
  {
    name: "Evgeny Ovcharenko",
    role: "Biomedical Engineer",
    organization: "Kemerovo Cardiology Center",
    location: "Kemerovo · Russia 🇷🇺",
    photo: "/people/evgeny-ovcharenko.webp",
    links: {
      globe: "https://loop.frontiersin.org/people/355364/overview",
      linkedin: "https://ru.linkedin.com/in/evgeny-ovcharenko-89098722",
      researchgate: "https://www.researchgate.net/profile/Evgeny-Ovcharenko",
      google: "https://scholar.google.ru/citations?user=taoklzsAAAAJ&hl=en",
      email: "ov.eugene@gmail.com",
    },
  },
  {
    name: "Anton Kutikhin",
    role: "Pathologist",
    organization: "Kemerovo Cardiology Center",
    location: "Kemerovo · Russia 🇷🇺",
    photo: "/people/anton-kutikhin.webp",
    links: {
      globe: "https://loop.frontiersin.org/people/98953/overview",
      researchgate: "https://www.researchgate.net/profile/Anton-Kutikhin",
      google: "https://scholar.google.com/citations?user=Ni7zoiYAAAAJ&hl=en",
      email: "antonkutikhin@gmail.com",
    },
  },
];

const RESOURCES = [
  {
    label: "Journal Paper",
    url: "https://doi.org/10.3389/fbioe.2024.1411680",
  },
  {
    label: "GitHub",
    url: "https://github.com/ViacheslavDanilov/histology_segmentation",
  },
  { label: "Models", url: "https://doi.org/10.5281/zenodo.10838431" },
  { label: "Dataset", url: "https://doi.org/10.5281/zenodo.10838383" },
];

const TECH_STACK = [
  "PyTorch",
  "PyTorch Lightning",
  "Albumentations",
  "Weights & Biases",
  "OpenSlide",
  "OpenCV",
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

        {/* Project Header */}
        <header className="mb-16 p-6 rounded-2xl bg-light/[0.03]">
          <h1 className="text-3xl md:text-4xl font-bold text-light mb-3">
            Histo Scanner
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Microvascular feature segmentation in tissue-engineered vascular
            grafts
          </p>

          {/* Divider */}
          <div className="h-px bg-light/10 my-8" />

          {/* Client */}
          <div className="text-sm text-gray-400">
            <span className="text-gray-400 font-medium">Client: </span>
            <a
              href="https://eng.kemcardio.ru/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Kemerovo Cardiology Center
            </a>
            <span className="text-gray-400"> · Kemerovo · Russia 🇷🇺</span>
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
                This project focused on developing a deep learning-powered
                pipeline for segmenting and quantifying histological features in{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Tissue_engineering_of_heart_valves"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  tissue-engineered vascular grafts
                </a>{" "}
                (TEVGs). Using advanced deep learning models, the study aimed to
                address challenges in analyzing complex tissue regeneration
                patterns within biodegradable grafts implanted in sheep carotid
                arteries.
              </p>
              <p className="text-gray-300 leading-relaxed text-justify">
                By optimizing six neural networks and creating an ensemble
                model, the project achieved precise segmentation of key
                microvascular features, including arterioles, venules,
                capillaries, immune cells, and nerve trunks. The ensemble model
                demonstrated state-of-the-art accuracy, achieving a mean Dice
                Similarity Coefficient (DSC) of 0.889, offering a robust tool
                for accelerating research in tissue engineering and
                translational medicine.
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
              The study utilized a dataset comprising 104 Whole Slide Images
              (WSIs) obtained from biodegradable TEVGs implanted into the
              carotid arteries of 20 sheep. After six months, the sheep were
              euthanized to assess vascular tissue regeneration patterns.
            </p>

            <ul className="space-y-2 text-gray-300 mb-6 text-justify">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Patches:</strong> WSIs were
                  automatically sliced into 99,831 patches, of which 1,401 were
                  annotated by pathologists (
                  <a href="#figure-1" className="text-accent hover:underline">
                    Figure 1
                  </a>
                  ).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Features:</strong> Nine
                  histological features: arteriole lumen (AL), arteriole media
                  (AM), arteriole adventitia (AA), venule lumen (VL), venule
                  wall (VW), capillary lumen (CL), capillary wall (CW), immune
                  cells (IC), and nerve trunks (NT).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Verification:</strong> A
                  lead pathologist verified all annotations to ensure
                  high-quality ground truth data for model training and
                  evaluation.
                </span>
              </li>
            </ul>

            {/* Figure 1: Annotation Methodology */}
            <figure id="figure-1" className="scroll-mt-24">
              <ImageLightbox
                src="/portfolio/histo-scanner/annotation_methodology.webp"
                alt="Annotation Methodology"
                width={1920}
                height={1080}
                maxWidth="3xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 1.</span> Annotation
                methodology showing the patch generation and manual labeling
                workflow for nine histological features.
              </figcaption>
            </figure>
          </section>

          {/* Methods */}
          <section>
            <h2 className="text-xl font-semibold text-light mb-4 flex items-center gap-3">
              <span className="w-1 h-6 bg-accent rounded-full"></span>
              Methods
            </h2>

            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              The methodology was designed to address the complexity of
              segmenting microvascular features in tissue-engineered vascular
              grafts by combining advanced deep learning techniques with
              rigorous evaluation protocols:
            </p>

            <ul className="space-y-4 text-gray-300 mb-6 text-justify">
              <li>
                <strong className="text-gray-200">Patch Generation:</strong>{" "}
                Whole slide images were divided into smaller, high-resolution
                patches to enable efficient processing.
              </li>
              <li>
                <strong className="text-gray-200">Model Optimization:</strong>{" "}
                Six deep learning models (U-Net, MA-Net, DeepLabV3, PSPNet, FPN,
                LinkNet) were optimized using Bayesian hyperparameter tuning and
                HyperBand early stopping strategies.
              </li>
              <li>
                <strong className="text-gray-200">Cross-Validation:</strong> A
                5-fold cross-validation approach was applied to ensure robust
                evaluation while preventing data leakage.
              </li>
              <li>
                <strong className="text-gray-200">
                  Augmentation Techniques:
                </strong>{" "}
                Training datasets were enhanced using augmentation methods,
                including rotations, flips, and brightness adjustments, to
                improve generalization and mitigate overfitting.
              </li>
              <li>
                <strong className="text-gray-200">Ensemble Model:</strong>{" "}
                Predictions from the top-performing models were combined into an
                ensemble model to maximize segmentation accuracy.
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
              The results demonstrate the effectiveness of the proposed pipeline
              in accurately segmenting microvascular features of TEVGs.
              Individual models performed well across various features, while
              the ensemble model significantly improved overall accuracy:
            </p>

            <ul className="space-y-2 text-gray-300 mb-6 text-justify">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Best Individual:</strong>{" "}
                  MA-Net achieved the highest individual performance with a mean
                  DSC of <span className="font-semibold">0.875</span>, excelling
                  in arteriole segmentation (
                  <a href="#figure-2" className="text-accent hover:underline">
                    Figure 2
                  </a>
                  ).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Ensemble Model:</strong>{" "}
                  Outperformed all individual networks, achieving a mean DSC of{" "}
                  <span className="text-light font-semibold">0.889</span>, with
                  significant improvements in venule, capillary, and immune cell
                  segmentation.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Feature Accuracy:</strong>{" "}
                  High precision for critical elements like arteriole lumen
                  (DSC: 0.939) and nerve trunks (DSC: 0.978).
                </span>
              </li>
            </ul>

            {/* Figure 2: Model Comparison */}
            <figure id="figure-2" className="mb-6 scroll-mt-24">
              <ImageLightbox
                src="/portfolio/histo-scanner/model_comparison.webp"
                alt="Model Comparison"
                width={1200}
                height={800}
                maxWidth="3xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 2.</span> Performance
                comparison of all models, highlighting MA-Net&apos;s superior
                results.
              </figcaption>
            </figure>

            <p className="text-gray-300 leading-relaxed mb-6 text-justify">
              The ensemble of three models — MA-Net, DeepLabV3, and FPN —
              provided the optimal solution (
              <a href="#figure-3" className="text-accent hover:underline">
                Figure 3
              </a>
              ).
            </p>

            {/* Figure 3: Ensemble Prediction */}
            <figure id="figure-3" className="scroll-mt-24">
              <ImageLightbox
                src="/portfolio/histo-scanner/ensemble_prediction.webp"
                alt="Ensemble Prediction Examples"
                width={1920}
                height={1080}
                maxWidth="3xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 3.</span> Example patches
                showcasing the segmentation of histologic features using the
                ensemble model.
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
              This project demonstrated the effectiveness of deep learning
              models in segmenting microvascular structures within
              tissue-engineered vascular grafts. By integrating advanced
              algorithms like MA-Net and DeepLabV3, the workflow achieved high
              precision in analyzing tissue regeneration patterns.
            </p>
            <p className="text-gray-300 leading-relaxed text-justify">
              These findings pave the way for enhanced automation in tissue
              engineering research. Future work could explore extending this
              pipeline to analyze more complex vascular networks or
              incorporating foundation models for broader applicability.
            </p>
          </section>
        </div>
      </div>
      {/* Bottom spacing before footer */}
      <div className="pb-24" />
    </main>
  );
}
