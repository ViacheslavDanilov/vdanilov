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
  title: "Deep Anatomy",
  description:
    "High-precision 3D organ segmentation via V-net architecture with dense skip connections, achieving up to 96% Dice score across 5 anatomical structures.",
  openGraph: {
    title: "Deep Anatomy | Viacheslav Danilov",
    description:
      "High-precision 3D organ segmentation via V-net architecture with dense skip connections, achieving up to 96% Dice score across 5 anatomical structures.",
    images: [
      {
        url: "https://vdanilov.dev/portfolio/deep-anatomy/opengraph-image.jpg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Deep Anatomy | Viacheslav Danilov",
    description:
      "High-precision 3D organ segmentation via V-net architecture with dense skip connections, achieving up to 96% Dice score across 5 anatomical structures.",
    images: ["https://vdanilov.dev/portfolio/deep-anatomy/opengraph-image.jpg"],
  },
};

const HIGHLIGHTS_ITEMS = [
  {
    icon: faSearch,
    label: "Situation",
    text: "Cardiac surgeons at Boston Children's Hospital needed accurate 3D segmentation of anatomical structures from MRI and CT scans to guide minimally invasive procedures and improve preoperative planning.",
  },
  {
    icon: faBullseye,
    label: "Task",
    text: "Lead the development of a deep learning pipeline tailored for multi-organ anatomical segmentation across five clinical datasets.",
  },
  {
    icon: faCogs,
    label: "Action",
    text: "Designed a V-net model with dense skip connections, integrated Test-Time Augmentation, and optimized hyperparameters using a statistical selection algorithm.",
  },
  {
    icon: faChartLine,
    label: "Result",
    text: "Achieved state-of-the-art Dice scores (up to 0.96), outperforming 11 benchmark models in 3 out of 5 tasks, and enabling precise, automated anatomical analysis to support surgical decision-making.",
  },
];

const TEAM_MEMBERS = [
  {
    name: "Viacheslav Danilov",
    role: "Research Scientist",
    organization: "Tomsk Polytechnic University",
    location: "Tomsk · Russia 🇷🇺",
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
    name: "Olga Gerget",
    role: "Professor",
    organization: "Tomsk Polytechnic University",
    location: "Tomsk · Russia 🇷🇺",
    photo: "/people/jane-doe.webp",
    links: {
      globe: "https://ieeexplore.ieee.org/author/37086166435",
      orcid: "https://orcid.org/0000-0002-6242-9502",
      researchgate: "https://www.researchgate.net/profile/Olga-Gerget",
      email: "olgagerget@mail.ru",
    },
  },
  {
    name: "Nikolay Vasilyev",
    role: "Cardiac Surgeon",
    organization: "Boston Children's Hospital",
    location: "Boston · United States 🇺🇸",
    photo: "/people/nikolay-vasilyev.webp",
    links: {
      globe: "https://www.ctsnet.org/home/nvasiliev",
      linkedin: "https://www.linkedin.com/in/nikolayvasilyev/",
      researchgate: "https://www.researchgate.net/profile/Nikolay-Vasilyev-2",
      google: "https://scholar.google.com/citations?user=HnEl5nYAAAAJ&hl=en",
      email: "nikolay.v.vasilyev.md@gmail.com",
    },
  },
  {
    name: "Maria Ledesma",
    role: "Professor",
    organization: "Technical University of Madrid",
    location: "Madrid · Spain 🇪🇸",
    photo: "/people/maria-ledesma.webp",
    links: {
      globe: "https://ieeexplore.ieee.org/author/37327193600",
      linkedin: "https://www.linkedin.com/in/maria-j-ledesma-carbayo-440aa8275",
      orcid: "https://orcid.org/0000-0001-6846-3923",
      google: "https://scholar.google.es/citations?user=jCcBex0AAAAJ&hl=en",
      email: "mj.ledesma@upm.es",
    },
  },
];

const RESOURCES = [
  {
    label: "PhD Thesis",
    url: "https://earchive.tpu.ru/handle/11683/61940?locale=en",
  },
  {
    label: "PhD Abstract",
    url: "https://portal.tpu.ru/council/ad-new?dst_id=1142",
  },
];

const TECH_STACK = ["TensorFlow", "Keras", "Python", "scikit-learn", "OpenCV"];

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
            Deep Anatomy
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            High-precision 3D organ segmentation via V-net architecture with
            dense skip connections
          </p>

          {/* Divider */}
          <div className="h-px bg-light/10 my-8" />

          {/* Client */}
          <div className="text-sm text-gray-400">
            <span className="text-gray-400 font-medium">Client: </span>
            <a
              href="https://www.childrenshospital.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Boston Children&apos;s Hospital
            </a>
            <span className="text-gray-400"> · Boston · United States 🇺🇸</span>
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
                The goal of this project was to develop an advanced machine
                learning system capable of segmenting complex anatomical
                structures in 3D medical imagery to assist in diagnostic and
                surgical applications. Accurate segmentation of structures like
                the left atrium, pancreas, spleen, hippocampus, and liver is
                critical for planning minimally invasive procedures and enabling
                quantitative biomarker extraction.
              </p>
              <p className="text-gray-300 leading-relaxed text-justify">
                A novel V-net architecture was implemented, incorporating dense
                skip connections to address challenges in training deep models,
                especially the vanishing gradient problem. Trained and validated
                on datasets from globally recognized medical institutions, the
                model surpassed 11 leading segmentation solutions in the{" "}
                <a
                  href="http://medicaldecathlon.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  Medical Segmentation Decathlon
                </a>
                . The system demonstrated consistently high Dice similarity
                scores, notably achieving best-in-class performance for three
                organs and near-top accuracy for the remaining two. These
                results underline the model&apos;s robustness, generalization
                power, and real-world clinical applicability.
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
              The training data consisted of de-identified, reformatted 3D
              medical imaging datasets from five prominent research centers:
            </p>
            <ul className="space-y-2 text-gray-300 mb-6 text-justify">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Left Atrium:</strong> 30 MRI
                  scans from{" "}
                  <a
                    href="https://www.kcl.ac.uk/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    King&apos;s College London
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Pancreas:</strong> 420 CT
                  scans from{" "}
                  <a
                    href="https://www.mskcc.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    Memorial Sloan Kettering Cancer Center
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Spleen:</strong> 190 CT
                  scans from{" "}
                  <a
                    href="https://www.mskcc.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    Memorial Sloan Kettering Cancer Center
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Hippocampus:</strong> 394
                  MRI scans from{" "}
                  <a
                    href="https://www.vumc.org/main/home"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    Vanderbilt University Medical Center
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Liver:</strong> 201 CT scans
                  from{" "}
                  <a
                    href="https://www.ircad.fr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    IRCAD
                  </a>
                </span>
              </li>
            </ul>

            <p className="text-gray-300 leading-relaxed text-justify">
              All datasets were converted to{" "}
              <a
                href="https://nifti.nimh.nih.gov/background/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                NIfTI
              </a>{" "}
              format. The images were split into training, validation, and
              testing sets. Preprocessing included spatial normalization and
              augmentation strategies to enhance generalization, especially for
              smaller organs or low-contrast images.
            </p>
          </section>

          {/* Methods */}
          <section>
            <h2 className="text-xl font-semibold text-light mb-4 flex items-center gap-3">
              <span className="w-1 h-6 bg-accent rounded-full"></span>
              Methods
            </h2>

            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              To address the challenges of organ segmentation in noisy 3D data,
              we developed V-net, a fully volumetric convolutional neural
              network based on the U-net architecture, enhanced for depth,
              gradient stability, and feature reuse. The V-net employs a
              symmetric encoder-decoder structure with dense skip-connections
              not only between matching levels but also within the encoder and
              decoder themselves. Each block includes dilated convolutions,
              instance normalization, ELU activations, and dropout, improving
              feature preservation and convergence in deep layers (
              <a href="#figure-1" className="text-accent hover:underline">
                Figure 1
              </a>
              ).
            </p>

            {/* Figure 1: V-net Architecture */}
            <figure id="figure-1" className="mb-6 scroll-mt-24">
              <ImageLightbox
                src="/portfolio/deep-anatomy/v-net-architecture.webp"
                alt="V-net Architecture"
                width={1920}
                height={820}
                maxWidth="2xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 1.</span> V-net
                architecture with symmetric encoder-decoder structure and dense
                skip-connections for multi-organ segmentation.
              </figcaption>
            </figure>

            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              To further mitigate vanishing gradients and preserve low-level
              spatial cues, we introduced intra-block feature concatenation,
              allowing early-layer features to influence deeper representations.
              This mechanism is shown in{" "}
              <a href="#figure-2" className="text-accent hover:underline">
                Figure 2
              </a>
              , which depicts our approach to dense feature transfer during both
              encoding and decoding.
            </p>

            {/* Figure 2: Feature Transfer Animation */}
            <figure id="figure-2" className="mb-6 scroll-mt-24">
              <ImageLightbox
                src="/portfolio/deep-anatomy/v-net-feature-transfer.gif"
                alt="V-net Feature Transfer"
                width={2560}
                height={770}
                maxWidth="2xl"
                unoptimized={true}
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 2.</span> Dense feature
                transfer mechanism showing intra-block concatenation during
                encoding and decoding phases.
              </figcaption>
            </figure>

            <ul className="space-y-4 text-gray-300 mb-6 text-justify">
              <li>
                <strong className="text-gray-200">Training Strategy:</strong>{" "}
                Training used a cyclical learning rate schedule and a variable
                batch size strategy based on the Fibonacci sequence,
                accelerating convergence while avoiding overfitting.
              </li>
              <li>
                <strong className="text-gray-200">
                  Hyperparameter Tuning:
                </strong>{" "}
                We applied a t-test-based selection method, reducing the search
                space from millions of combinations to a few hundred,
                significantly improving efficiency.
              </li>
              <li>
                <strong className="text-gray-200">
                  Test-Time Augmentation:
                </strong>{" "}
                At inference, test-time augmentation was used to enhance
                segmentation stability, averaging predictions over several
                transformed versions of each input.
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
              The proposed V-net model with Test-Time Augmentation (TTA)
              demonstrated consistently high segmentation performance across a
              variety of anatomical structures and imaging modalities, as
              measured by the Dice Similarity Coefficient (DSC). Notably, the
              model surpassed most existing benchmarks from the{" "}
              <a
                href="http://medicaldecathlon.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Medical Segmentation Decathlon
              </a>{" "}
              challenge.
            </p>

            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              Quantitative performance metrics on the test datasets were as
              follows:
            </p>

            <ul className="space-y-2 text-gray-300 mb-6">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Liver:</strong>{" "}
                  <span className="font-semibold">95.9 ± 1.0%</span>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Hippocampus:</strong>{" "}
                  <span className="font-semibold">94.9 ± 1.5%</span>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Spleen:</strong>{" "}
                  <span className="font-semibold">93.6 ± 1.6%</span>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Left Atrium:</strong>{" "}
                  <span className="font-semibold">92.2 ± 2.7%</span>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Pancreas:</strong>{" "}
                  <span className="font-semibold">82.9 ± 5.8%</span>
                </span>
              </li>
            </ul>

            <p className="text-gray-300 leading-relaxed mb-6 text-justify">
              These results are particularly remarkable considering the
              complexity and variability in organ morphology, as well as the
              different imaging modalities (MRI for brain and cardiac
              structures, CT for abdominal structures). Visual comparisons in{" "}
              <a href="#figure-3" className="text-accent hover:underline">
                Figures 3–7
              </a>{" "}
              show the model&apos;s predicted segmentation masks (in white)
              alongside ground truth annotations (in red) across axial,
              sagittal, and coronal views.
            </p>

            {/* Figure 3: Liver Segmentation */}
            <figure id="figure-3" className="mb-6 scroll-mt-24">
              <ImageLightbox
                src="/portfolio/deep-anatomy/segmentation-of-liver.webp"
                alt="Liver Segmentation Results"
                width={2560}
                height={1220}
                maxWidth="2xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 3.</span> Liver
                segmentation results showing predicted masks (white) vs ground
                truth (red) across axial, sagittal, and coronal views. DSC:
                95.9%.
              </figcaption>
            </figure>

            {/* Figure 4: Hippocampus Segmentation */}
            <figure id="figure-4" className="mb-6 scroll-mt-24">
              <ImageLightbox
                src="/portfolio/deep-anatomy/segmentation-of-hippocampus.webp"
                alt="Hippocampus Segmentation Results"
                width={2560}
                height={1220}
                maxWidth="2xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 4.</span> Hippocampus
                segmentation results showing predicted masks (white) vs ground
                truth (red) across axial, sagittal, and coronal views. DSC:
                94.9%.
              </figcaption>
            </figure>

            {/* Figure 5: Spleen Segmentation */}
            <figure id="figure-5" className="mb-6 scroll-mt-24">
              <ImageLightbox
                src="/portfolio/deep-anatomy/segmentation-of-spleen.webp"
                alt="Spleen Segmentation Results"
                width={2560}
                height={1220}
                maxWidth="2xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 5.</span> Spleen
                segmentation results showing predicted masks (white) vs ground
                truth (red) across axial, sagittal, and coronal views. DSC:
                93.6%.
              </figcaption>
            </figure>

            {/* Figure 6: Left Atrium Segmentation */}
            <figure id="figure-6" className="mb-6 scroll-mt-24">
              <ImageLightbox
                src="/portfolio/deep-anatomy/segmentation-of-left-atrium.webp"
                alt="Left Atrium Segmentation Results"
                width={2560}
                height={1220}
                maxWidth="2xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 6.</span> Left atrium
                segmentation results showing predicted masks (white) vs ground
                truth (red) across axial, sagittal, and coronal views. DSC:
                92.2%.
              </figcaption>
            </figure>

            {/* Figure 7: Pancreas Segmentation */}
            <figure id="figure-7" className="mb-6 scroll-mt-24">
              <ImageLightbox
                src="/portfolio/deep-anatomy/segmentation-of-pancreas.webp"
                alt="Pancreas Segmentation Results"
                width={2560}
                height={1220}
                maxWidth="2xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 7.</span> Pancreas
                segmentation results showing predicted masks (white) vs ground
                truth (red) across axial, sagittal, and coronal views. DSC:
                82.9%.
              </figcaption>
            </figure>

            <p className="text-gray-300 leading-relaxed text-justify">
              Even in anatomically challenging cases – such as the pancreas,
              known for its irregular shape and low-contrast boundaries – the
              model achieved strong performance, particularly benefiting from
              TTA, which improved both accuracy and stability.
            </p>
          </section>

          {/* Conclusion */}
          <section>
            <h2 className="text-xl font-semibold text-light mb-4 flex items-center gap-3">
              <span className="w-1 h-6 bg-accent rounded-full"></span>
              Conclusion
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              This project showcases the successful deployment of a robust,
              scalable, and highly accurate deep learning system for 3D
              anatomical segmentation. By leveraging architectural and
              algorithmic innovations – including dense skip connections, custom
              loss functions, and augmentation techniques – the model
              consistently outperformed industry and academic benchmarks. Its
              adaptability across imaging modalities and organ systems suggests
              broad utility in clinical diagnostics and surgical planning.
            </p>
            <p className="text-gray-300 leading-relaxed text-justify">
              Future work could include real-time inference capabilities,
              integration into surgical navigation platforms, and expansion to
              other anatomical structures or multimodal datasets.
            </p>
          </section>
        </div>
      </div>
      {/* Bottom spacing before footer */}
      <div className="pb-24" />
    </main>
  );
}
