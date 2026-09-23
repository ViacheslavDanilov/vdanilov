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
  title: "Coronary Insight",
  description:
    "Deep learning pipeline for OCT plaque segmentation, enabling precise arterial risk assessment in cardiovascular imaging.",
  path: "/portfolio/coronary-insight/",
  image: {
    url: "/portfolio/previews/coronary-insight.jpg",
    alt: "Coronary Insight - OCT plaque segmentation",
  },
});

const HIGHLIGHTS_ITEMS = [
  {
    icon: faSearch,
    label: "Situation",
    text: "Cardiologists at the Kemerovo Cardiology Center needed a faster, more accurate way to analyze OCT scans for plaque vulnerability, as manual annotation was labor-intensive and prone to variability.",
  },
  {
    icon: faBullseye,
    label: "Task",
    text: "Develop a deep learning pipeline to automate segmentation of key plaque features and improve cardiovascular risk assessment.",
  },
  {
    icon: faCogs,
    label: "Action",
    text: "Designed a hybrid ensemble of 9 neural networks with task-specific models, Bayesian hyperparameter tuning, and explainable AI.",
  },
  {
    icon: faChartLine,
    label: "Result",
    text: "Achieved a weighted Dice score of 88.2% across all classes, enabling fast, accurate, and interpretable plaque quantification at scale.",
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
    name: "Nikita Kochergin",
    role: "Cardiovascular Surgeon",
    organization: "Kemerovo Cardiology Center",
    location: "Kemerovo · Russia 🇷🇺",
    photo: "/people/nikita-kochergin.webp",
    links: {
      globe:
        "https://kemcardio.ru/news/molodye-uchenye-nii-kpssz-vyigrali-tri-granta-rossijskogo-nauchnogo-fonda/",
      orcid: "https://orcid.org/0000-0002-1534-264X",
      researchgate:
        "https://www.researchgate.net/scientific-contributions/Nikita-Kochergin-2072471213",
      email: "nikotwin@mail.ru",
    },
  },
];

const RESOURCES = [
  {
    label: "Live Demo",
    url: "https://plaque-risk-explorer.vercel.app/",
  },
  {
    label: "Journal Paper",
    url: "https://doi.org/10.1016/j.compbiomed.2025.111061",
  },
  {
    label: "GitHub",
    url: "https://github.com/ViacheslavDanilov/oct_segmentation",
  },
  { label: "Models", url: "https://doi.org/10.5281/zenodo.14481678" },
  { label: "Dataset", url: "https://doi.org/10.5281/zenodo.14478209" },
];

const TECH_STACK = [
  "Python",
  "PyTorch",
  "DVC",
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Docker",
  "CI/CD",
];

export default function ProjectPage() {
  return (
    <div className="min-h-screen pt-24">
      <div className="w-full max-w-5xl mx-auto px-6 py-12 md:py-24">
        <ProjectHeader
          title="Coronary Insight"
          subtitle="OCT plaque segmentation with deep learning for cardiovascular risk assessment"
          banner={{
            image: "/portfolio/previews/coronary-insight.jpg",
            alt: "Coronary Insight - OCT plaque segmentation for cardiovascular risk assessment",
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
                Cardiovascular disease, often driven by atherosclerosis, remains
                the leading cause of death globally. While{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Optical_coherence_tomography"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  Optical Coherence Tomography
                </a>{" "}
                (OCT) enables detailed imaging of plaque features, manual
                segmentation is time-consuming and prone to human error. This
                project aimed to automate plaque segmentation using a robust
                machine learning framework trained on real-world OCT data from
                103 patients.
              </p>
              <p className="text-gray-300 leading-relaxed text-justify">
                We evaluated nine deep learning architectures and designed a
                hybrid strategy combining single-class and multi-class models to
                account for class imbalance and feature complexity. The
                resulting system used ensemble learning to combine the strengths
                of task-specific models. It achieved a high overall{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Dice-S%C3%B8rensen_coefficient"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  Dice Similarity Coefficient
                </a>{" "}
                (DSC) of 0.882, surpassing prior approaches. The solution not
                only accelerates analysis but supports more consistent diagnosis
                and stratification of cardiovascular risk in clinical practice.
              </p>
            </div>
          </Section>

          {/* Data */}
          <Section title="Data">
            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              This project utilized a diverse and clinically representative
              multi-center, multi-scanner OCT dataset:
            </p>
            <ul className="space-y-2 text-gray-300 mb-6 text-justify">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-300">Patients:</strong> 103
                  individuals with stable coronary artery disease
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-300">Images:</strong> 25,698 RGB
                  slices capturing arterial cross-sections
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-300">Plaque Features:</strong>{" "}
                  Lumen, fibrous cap, lipid core, and vasa vasorum
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-300">Institutions:</strong> Data
                  sourced from two premier Russian cardiovascular centers
                  (Kemerovo and Tyumen)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-300">Scanners:</strong> Two
                  vendors (St. Jude Medical and LightLab Imaging) ensured
                  imaging heterogeneity
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-300">Image Properties:</strong>{" "}
                  Sizes ranged from 704×704 to 1024×1024 pixels; 215–270 slices
                  per image
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-300">
                    Annotation Workflow:
                  </strong>{" "}
                  Two cardiologists annotated all slices using binary
                  segmentation masks via the Supervisely platform, with a third
                  reviewer confirming accuracy
                </span>
              </li>
            </ul>

            <p className="text-gray-300 leading-relaxed mb-6 text-justify">
              These annotations captured key morphological features essential
              for cardiovascular diagnosis and formed the foundation for model
              training and evaluation (
              <a href="#figure-1" className="text-accent hover:underline">
                Figure 1
              </a>
              ).
            </p>

            {/* Figure 1: Annotation Methodology Image */}
            <figure id="figure-1" className="scroll-mt-24">
              <ImageLightbox
                src="/portfolio/coronary-insight/oct-annotation-methodology.webp"
                alt="OCT Annotation Methodology"
                width={2520}
                height={900}
                maxWidth="full"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 1.</span> OCT annotation
                methodology showing the segmentation workflow and plaque feature
                identification. Color legend:{" "}
                <span style={{ color: "#ff17cd" }}>lumen</span>,{" "}
                <span style={{ color: "#5eade6" }}>fibrous cap</span>,{" "}
                <span style={{ color: "#00e379" }}>lipid core</span>,{" "}
                <span style={{ color: "#f20515" }}>vasa vasorum</span>.
              </figcaption>
            </figure>
          </Section>

          {/* Methods */}
          <Section title="Methods">
            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              The project&apos;s methodology addressed both architectural
              optimization and class-specific learning strategies. The following
              techniques were applied to ensure both high performance and
              clinical relevance:
            </p>

            <ul className="space-y-4 text-gray-300 mb-6 text-justify">
              <li>
                <strong className="text-gray-200">Model Architectures:</strong>{" "}
                Nine state-of-the-art segmentation networks were tested,
                including{" "}
                <span className="text-gray-300">
                  U-Net, U-Net++, DeepLabV3, DeepLabV3+, FPN, LinkNet, PSPNet,
                  PAN, and MA-Net
                </span>
                . These were chosen for their strengths in biomedical image
                segmentation and complementary design philosophies.
              </li>
              <li>
                <strong className="text-gray-200">Hybrid Strategy:</strong>{" "}
                Lumen and vasa vasorum were trained using single-class models
                due to their dominance (lumen) or rarity (vasa vasorum). Fibrous
                cap and lipid core were trained with a two-class model due to
                overlapping morphology.
              </li>
              <li>
                <strong className="text-gray-200">
                  Hyperparameter Tuning:
                </strong>{" "}
                Over 1,000 configurations were tested using Bayesian
                Optimization and HyperBand early stopping, focusing on encoder
                type, input size, optimizer, and learning rate. This tuning was
                performed on a representative subset of 40 patients to save
                compute time.
              </li>
              <li>
                <strong className="text-gray-200">Data Augmentation:</strong>{" "}
                Applied using{" "}
                <a
                  href="https://albumentations.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  Albumentations
                </a>
                , including random flipping, cropping, scaling, rotation,
                brightness/contrast adjustment, and Gaussian noise to improve
                generalization.
              </li>
              <li>
                <strong className="text-gray-200">Validation Strategy:</strong>{" "}
                Employed 5-fold cross-validation without patient overlap to
                prevent data leakage. Training and testing progress was
                monitored through loss and DSC evolution (
                <a href="#figure-2" className="text-accent hover:underline">
                  Figure 2
                </a>
                ).
              </li>
              <li>
                <strong className="text-gray-200">Explainability Tools:</strong>{" "}
                Class activation maps (CAM) like GradCAM, LayerCAM, and HiResCAM
                were used to visualize model attention, especially for the
                fibrous cap and vasa vasorum features.
              </li>
            </ul>

            {/* Figure 2: Loss and DSC Evolution */}
            <figure id="figure-2" className="scroll-mt-24">
              <ImageLightbox
                src="/portfolio/coronary-insight/loss-and-dsc-evolution.webp"
                alt="Loss and DSC evolution during training"
                width={2480}
                height={2320}
                maxWidth="2xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 2.</span> Training
                metrics showing loss convergence and DSC evolution across
                epochs.
              </figcaption>
            </figure>
          </Section>

          {/* Results */}
          <Section title="Results">
            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              The hybrid deep learning framework showed consistent, high
              performance in accurately segmenting plaque components. Notable
              outcomes included:
            </p>

            <ul className="space-y-2 text-gray-300 mb-4">
              <li>
                <strong className="text-gray-200">Lumen</strong> (
                <span style={{ color: "#ff17cd" }}>magenta</span>): DSC of{" "}
                <span className="font-semibold">0.987</span>, indicating nearly
                perfect agreement with expert annotations.
              </li>
              <li>
                <strong className="text-gray-200">Fibrous Cap</strong> (
                <span style={{ color: "#5eade6" }}>blue</span>): DSC of{" "}
                <span className="font-semibold">0.736</span>, strong performance
                despite thin, complex structure.
              </li>
              <li>
                <strong className="text-gray-200">Lipid Core</strong> (
                <span style={{ color: "#00e379" }}>green</span>): DSC of{" "}
                <span className="font-semibold">0.751</span>, reliable detection
                despite challenging textures.
              </li>
              <li>
                <strong className="text-gray-200">Vasa Vasorum</strong> (
                <span style={{ color: "#f20515" }}>red</span>): DSC of{" "}
                <span className="font-semibold">0.610</span>, moderate
                performance for a rare, fine-grained feature.
              </li>
              <li>
                <strong className="text-gray-200">
                  Ensemble Weighted DSC:
                </strong>{" "}
                <span className="text-light font-semibold">0.882</span>,
                demonstrating the synergy of combined models.
              </li>
            </ul>

            <p className="text-gray-300 leading-relaxed mb-6 text-justify">
              Visual evaluation of model predictions shows a high overlap with
              ground truth (
              <a href="#figure-3" className="text-accent hover:underline">
                Figure 3
              </a>
              ), particularly for the lumen and lipid core. Challenges remained
              for the fibrous cap due to its thin and diffuse boundaries.
              Further analysis with class activation maps confirmed that the
              best-performing models focused on anatomically relevant areas (
              <a href="#figure-4" className="text-accent hover:underline">
                Figure 4
              </a>
              ). These results establish the reliability of the segmentation
              models and affirm the utility of ensemble and explainable AI
              techniques in high-stakes biomedical imaging tasks.
            </p>

            {/* Figure 3: Comparison Ground Truth and Predictions */}
            <figure id="figure-3" className="mb-6 scroll-mt-24">
              <ImageLightbox
                src="/portfolio/coronary-insight/comparison-ground-truth-and-predictions.webp"
                alt="Comparison of Ground Truth and Model Predictions"
                width={2256}
                height={2550}
                maxWidth="2xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 3.</span> Comparison
                between ground truth annotations and model predictions for
                plaque segmentation.
              </figcaption>
            </figure>

            {/* Figure 4: Activation Maps */}
            <figure id="figure-4" className="scroll-mt-24">
              <ImageLightbox
                src="/portfolio/coronary-insight/activation-maps-for-lumen.webp"
                alt="Activation Maps for Lumen Segmentation"
                width={2256}
                height={2256}
                maxWidth="2xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 4.</span> Class
                activation maps showing model attention focused on anatomically
                relevant areas.
              </figcaption>
            </figure>
          </Section>

          {/* Conclusion */}
          <Section title="Conclusion">
            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              This project delivers a powerful ML framework for automating
              atherosclerotic plaque segmentation in OCT scans. The hybrid
              segmentation design, coupled with rigorous tuning and an ensemble
              model, achieved high accuracy across both common and rare plaque
              features. The use of explainability techniques reinforces clinical
              trust in predictions.
            </p>
            <p className="text-gray-300 leading-relaxed text-justify">
              Future enhancements will explore multimodal data fusion (e.g., OCT
              + IVUS), real-time deployment with lightweight models, and
              application across diverse populations through expanded datasets.
            </p>
          </Section>
        </div>
      </div>
      {/* Bottom spacing before footer */}
      <div className="pb-24" />
    </div>
  );
}
