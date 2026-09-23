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
  title: "Histo Scanner",
  description:
    "Deep learning pipeline for segmenting microvascular features in tissue-engineered vascular grafts with 89% Dice score.",
  path: "/portfolio/histo-scanner/",
  image: {
    url: "/portfolio/previews/histo-scanner.jpg",
    alt: "Histo Scanner - Microvascular feature segmentation",
  },
});

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

export default function ProjectPage() {
  return (
    <div className="min-h-screen pt-24">
      <div className="w-full max-w-5xl mx-auto px-6 py-12 md:py-24">
        <ProjectHeader
          title="Histo Scanner"
          subtitle="Microvascular feature segmentation in tissue-engineered vascular grafts"
          banner={{
            image: "/portfolio/previews/histo-scanner.jpg",
            alt: "Histo Scanner - Microvascular feature segmentation in TEVG",
          }}
          client={{
            name: "Kemerovo Cardiology Center",
            url: "https://eng.kemcardio.ru/",
            location: "Kemerovo · Russia 🇷🇺",
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
          </Section>

          {/* Data */}
          <Section title="Data">
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
                src="/portfolio/histo-scanner/annotation-methodology.webp"
                alt="Annotation Methodology"
                width={2560}
                height={1700}
                maxWidth="3xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 1.</span> Annotation
                methodology showing the patch generation and manual labeling
                workflow for nine histological features.
              </figcaption>
            </figure>
          </Section>

          {/* Methods */}
          <Section title="Methods">
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
          </Section>

          {/* Results */}
          <Section title="Results">
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
                src="/portfolio/histo-scanner/model-comparison.webp"
                alt="Model Comparison"
                width={2560}
                height={850}
                maxWidth="3xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 2.</span> Performance
                comparison of all models, highlighting MA-Net&apos;s superior
                results.
              </figcaption>
            </figure>

            <p className="text-gray-300 leading-relaxed mb-6 text-justify">
              The ensemble of three models (MA-Net, DeepLabV3, and FPN) provided
              the optimal solution (
              <a href="#figure-3" className="text-accent hover:underline">
                Figure 3
              </a>
              ).
            </p>

            {/* Figure 3: Ensemble Prediction */}
            <figure id="figure-3" className="scroll-mt-24">
              <ImageLightbox
                src="/portfolio/histo-scanner/ensemble-prediction.webp"
                alt="Ensemble Prediction Examples"
                width={2560}
                height={1630}
                maxWidth="3xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 3.</span> Example patches
                showcasing the segmentation of histologic features using the
                ensemble model.
              </figcaption>
            </figure>
          </Section>

          {/* Conclusion */}
          <Section title="Conclusion">
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
          </Section>
        </div>
      </div>
      {/* Bottom spacing before footer */}
      <div className="pb-24" />
    </div>
  );
}
