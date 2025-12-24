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
  title: "AI Dissects Arterial Risk – Viacheslav Danilov",
  description:
    "Deep learning pipeline for OCT plaque segmentation and cardiovascular risk assessment. Achieved 88.2% weighted Dice score using hybrid ensemble of neural networks.",
};

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
    photo: "/portfolio/team/viacheslav-danilov.webp",
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
    photo: "/portfolio/team/vladislav-laptev.webp",
    links: {
      globe: "https://loop.frontiersin.org/people/2713564/overview",
      github: "https://github.com/vladislavml",
      orcid: "https://orcid.org/0000-0001-8639-8889",
      email: "lptwlad1@gmail.com",
    },
  },
  {
    name: "Kirill Klyshnikov",
    role: "Middle Data Engineer",
    organization: "Kemerovo Cardiac Center",
    location: "Kemerovo · Russia 🇷🇺",
    photo: "/portfolio/team/kirill-klyshnikov.webp",
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
    role: "Senior Researcher",
    organization: "Kemerovo Cardiac Center",
    location: "Kemerovo · Russia 🇷🇺",
    photo: "/portfolio/team/evgeny-ovcharenko.webp",
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
    role: "Cardiothoracic Surgeon",
    organization: "Kemerovo Cardiac Center",
    location: "Kemerovo · Russia 🇷🇺",
    photo: "/portfolio/team/nikita-kochergin.webp",
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

const TECH_STACK = ["Python", "PyTorch", "DVC", "Streamlit", "Docker", "CI/CD"];

const MODEL_ARCHITECTURES = [
  "U-Net",
  "U-Net++",
  "DeepLabV3",
  "DeepLabV3+",
  "FPN",
  "LinkNet",
  "PSPNet",
  "PAN",
  "MA-Net",
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

        {/* Hero Image */}
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-8 border border-white/10">
          <Image
            src="/portfolio/previews/ai-dissects-arterial-risk.webp"
            alt="AI Dissects Arterial Risk - OCT Plaque Segmentation"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Project Header */}
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-light mb-4">
            AI Dissects Arterial Risk
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            OCT plaque segmentation with deep learning for cardiovascular risk
            assessment
          </p>

          {/* Client */}
          <div className="mt-6 text-sm text-gray-400">
            <span className="text-gray-500">Client: </span>
            <a
              href="https://eng.kemcardio.ru/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent"
            >
              Kemerovo Cardiology Center
            </a>
            <span className="text-gray-500">, Kemerovo · Russia 🇷🇺</span>
          </div>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-2 mt-4">
            {TECH_STACK.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs rounded-full bg-card border border-white/10 text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Resources */}
          <div className="flex flex-wrap gap-3 mt-6">
            {RESOURCES.map((resource) => (
              <a
                key={resource.label}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium 
                           rounded-lg bg-accent/10 text-accent border border-accent/30 
                           hover:bg-accent/20 transition-colors"
              >
                {resource.label}
                <FontAwesomeIcon icon={faExternalLinkAlt} className="w-3 h-3" />
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
              <p className="text-gray-400 leading-relaxed mb-4">
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
              <p className="text-gray-400 leading-relaxed">
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
          </section>

          {/* Data */}
          <section>
            <h2 className="text-xl font-semibold text-light mb-4 flex items-center gap-3">
              <span className="w-1 h-6 bg-accent rounded-full"></span>
              Data
            </h2>

            {/* Annotation Methodology Image - 2520x900 */}
            <ImageLightbox
              src="/portfolio/ai-dissects-arterial-risk/oct-annotation-methodology.webp"
              alt="OCT Annotation Methodology"
              width={2520}
              height={900}
              maxWidth="full"
              className="mb-6"
            />

            <p className="text-gray-400 leading-relaxed mb-4">
              This project utilized a diverse and clinically representative
              multi-center, multi-scanner OCT dataset:
            </p>
            <ul className="space-y-2 text-gray-400">
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
          </section>

          {/* Methods */}
          <section>
            <h2 className="text-xl font-semibold text-light mb-4 flex items-center gap-3">
              <span className="w-1 h-6 bg-accent rounded-full"></span>
              Methods
            </h2>

            {/* Loss and DSC Evolution - 2480x2320 */}
            <ImageLightbox
              src="/portfolio/ai-dissects-arterial-risk/loss-and-dsc-evolution.webp"
              alt="Loss and DSC Evolution during training"
              width={2480}
              height={2320}
              maxWidth="3xl"
              className="mb-6"
            />

            <p className="text-gray-400 leading-relaxed mb-4">
              The project&apos;s methodology addressed both architectural
              optimization and class-specific learning strategies:
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h4 className="text-light font-medium mb-2">
                  Model Architectures
                </h4>
                <p className="text-gray-400 text-sm mb-3">
                  Nine state-of-the-art segmentation networks were tested:
                </p>
                <div className="flex flex-wrap gap-2">
                  {MODEL_ARCHITECTURES.map((arch) => (
                    <span
                      key={arch}
                      className="px-3 py-1 text-xs rounded-full bg-accent/10 text-accent border border-accent/20"
                    >
                      {arch}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h4 className="text-light font-medium mb-2">Hybrid Strategy</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>
                      <strong className="text-gray-300">
                        Lumen and vasa vasorum:
                      </strong>{" "}
                      Trained using single-class models due to their dominance
                      (lumen) or rarity (vasa vasorum)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>
                      <strong className="text-gray-300">
                        Fibrous cap and lipid core:
                      </strong>{" "}
                      Trained with a two-class model due to overlapping
                      morphology
                    </span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h4 className="text-light font-medium mb-2">
                  Hyperparameter Tuning
                </h4>
                <p className="text-gray-400 text-sm">
                  Over 1,000 configurations were tested using Bayesian
                  Optimization and HyperBand early stopping, focusing on encoder
                  type, input size, optimizer, and learning rate. This tuning
                  was performed on a representative subset of 40 patients to
                  save compute time.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h4 className="text-light font-medium mb-2">
                  Data Augmentation
                </h4>
                <p className="text-gray-400 text-sm">
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
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h4 className="text-light font-medium mb-2">
                  Explainability Tools
                </h4>
                <p className="text-gray-400 text-sm">
                  Class activation maps (CAM) like GradCAM, LayerCAM, and
                  HiResCAM were used to visualize model attention, especially
                  for the fibrous cap and vasa vasorum features.
                </p>
              </div>
            </div>
          </section>

          {/* Results */}
          <section>
            <h2 className="text-xl font-semibold text-light mb-4 flex items-center gap-3">
              <span className="w-1 h-6 bg-accent rounded-full"></span>
              Results
            </h2>

            {/* Comparison Ground Truth and Predictions - 2256x2550 */}
            <ImageLightbox
              src="/portfolio/ai-dissects-arterial-risk/comparison-ground-truth-and-predictions.webp"
              alt="Comparison of Ground Truth and Model Predictions"
              width={2256}
              height={2550}
              maxWidth="2xl"
              className="mb-6"
            />

            <p className="text-gray-400 leading-relaxed mb-6">
              The hybrid deep learning framework showed consistent, high
              performance in accurately segmenting plaque components:
            </p>

            {/* Results Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { label: "Lumen", dsc: "0.987", color: "text-green-400" },
                {
                  label: "Fibrous Cap",
                  dsc: "0.736",
                  color: "text-yellow-400",
                },
                { label: "Lipid Core", dsc: "0.751", color: "text-yellow-400" },
                {
                  label: "Vasa Vasorum",
                  dsc: "0.610",
                  color: "text-orange-400",
                },
              ].map((result) => (
                <div
                  key={result.label}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 text-center"
                >
                  <p className={`text-2xl font-bold ${result.color}`}>
                    {result.dsc}
                  </p>
                  <p className="text-gray-400 text-sm mt-1">{result.label}</p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-accent/10 border border-accent/30 mb-6">
              <p className="text-center">
                <span className="text-accent font-bold text-2xl">0.882</span>
                <span className="text-gray-300 ml-2">
                  Ensemble Weighted Dice Score
                </span>
              </p>
            </div>

            {/* Activation Maps - 2256x2256 */}
            <ImageLightbox
              src="/portfolio/ai-dissects-arterial-risk/activation-maps-for-lumen.webp"
              alt="Activation Maps for Lumen Segmentation"
              width={2256}
              height={2256}
              maxWidth="2xl"
              className="mb-6"
            />

            <p className="text-gray-400 leading-relaxed">
              Visual evaluation of model predictions shows a high overlap with
              ground truth, particularly for the lumen and lipid core.
              Challenges remained for the fibrous cap due to its thin and
              diffuse boundaries. Further analysis with class activation maps
              confirmed that the best-performing models focused on anatomically
              relevant areas.
            </p>
          </section>

          {/* Conclusion */}
          <section>
            <h2 className="text-xl font-semibold text-light mb-4 flex items-center gap-3">
              <span className="w-1 h-6 bg-accent rounded-full"></span>
              Conclusion
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              This project delivers a powerful ML framework for automating
              atherosclerotic plaque segmentation in OCT scans. The hybrid
              segmentation design, coupled with rigorous tuning and an ensemble
              model, achieved high accuracy across both common and rare plaque
              features. The use of explainability techniques reinforces clinical
              trust in predictions.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Future enhancements will explore multimodal data fusion (e.g., OCT
              + IVUS), real-time deployment with lightweight models, and
              application across diverse populations through expanded datasets.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
