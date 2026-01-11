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
  title: "OncoCell Vision",
  description:
    "AI-powered microscopy pipeline for detecting and counting cancer cell biomarkers using EfficientDet, achieving 85% mAP for nuclei detection.",
  openGraph: {
    title: "OncoCell Vision | Viacheslav Danilov",
    description:
      "AI-powered microscopy pipeline for detecting and counting cancer cell biomarkers using EfficientDet, achieving 85% mAP for nuclei detection.",
    images: [
      {
        url: "/portfolio/previews/oncocell-vision.jpg",
        width: 1200,
        height: 630,
        alt: "OncoCell Vision - Cancer cell biomarker detection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OncoCell Vision | Viacheslav Danilov",
    description:
      "AI-powered microscopy pipeline for detecting and counting cancer cell biomarkers using EfficientDet, achieving 85% mAP for nuclei detection.",
    images: ["/portfolio/previews/oncocell-vision.jpg"],
  },
};

const HIGHLIGHTS_ITEMS = [
  {
    icon: faSearch,
    label: "Situation",
    text: "Cancer biologists at Volastra Therapeutics needed a scalable, accurate solution to detect and count cellular biomarkers—such as micronuclei and mitotic bodies—in microscopy images to evaluate early cancer progression and treatment response.",
  },
  {
    icon: faBullseye,
    label: "Task",
    text: "Lead the development of an object detection pipeline to identify primary nuclei, micronuclei, mitosis, and apoptosis across diverse cancer cell lines.",
  },
  {
    icon: faCogs,
    label: "Action",
    text: "Used the EfficientDet architecture with BiFPN, applied advanced tiling strategies for high-resolution images, and trained on 1,664 annotated samples from internal and public datasets.",
  },
  {
    icon: faChartLine,
    label: "Result",
    text: "Achieved 85% mAP for primary nuclei and 66% for micronuclei, enabling automated, high-throughput cellular analysis critical for cancer research and drug development.",
  },
];

const TEAM_MEMBERS = [
  {
    name: "Viacheslav Danilov",
    role: "Senior Data Scientist",
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
    name: "Oleg Talalov",
    role: "Senior ML Engineer",
    organization: "Quantori",
    location: "Cambridge · United States 🇺🇸",
    photo: "/people/oleg-talalov.webp",
    links: {
      linkedin: "https://www.linkedin.com/in/olegtalalov/",
      github: "https://github.com/olegtalalov",
      email: "talalovoleg@gmail.com",
    },
  },
  {
    name: "Vladislav Laptev",
    role: "Data Scientist",
    organization: "Quantori",
    location: "Cambridge · United States 🇺🇸",
    photo: "/people/vladislav-laptev.webp",
    links: {
      globe: "https://loop.frontiersin.org/people/2713564/overview",
      github: "https://github.com/vladislavml",
      orcid: "https://orcid.org/0000-0001-8639-8889",
      email: "lptwlad1@gmail.com",
    },
  },
  {
    name: "Akanksha Verma",
    role: "Senior Bioinformatician",
    organization: "Volastra Therapeutics",
    location: "New York · United States 🇺🇸",
    photo: "/people/akanksha-verma.webp",
    links: {
      globe: "https://www.statnews.com/wunderkinds-2021/akanksha-verma/",
      linkedin: "https://www.linkedin.com/in/akanksha-verma-49752160/",
      researchgate: "https://www.researchgate.net/profile/Akanksha-Verma-6",
      google: "https://scholar.google.com/citations?user=oq68oKAAAAAJ&hl=en",
      email: "akanksha.verma@volastratx.com",
    },
  },
  {
    name: "Christina Eng",
    role: "Lead Bioinformatician",
    organization: "Volastra Therapeutics",
    location: "New York · United States 🇺🇸",
    photo: "/people/christina-eng.webp",
    links: {
      globe: "https://www.volastratx.com/our-team/christina-eng/",
      linkedin: "https://www.linkedin.com/in/christina-eng-4840546/",
      researchgate: "https://www.researchgate.net/profile/Christina-Eng-2",
      email: "christina.eng@volastratx.com",
    },
  },
];

const RESOURCES = [
  {
    label: "Model testing on different cell lines",
    url: "https://drive.google.com/drive/folders/1a6YKjSlpJ6TDZT-z-9KfcGL_EFMxEjQz",
  },
];

const TECH_STACK = [
  "TensorFlow",
  "Python",
  "EfficientDet",
  "scikit-learn",
  "Weights & Biases",
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

        {/* Project Banner */}
        <ProjectBanner
          image="/portfolio/previews/oncocell-vision.jpg"
          alt="OncoCell Vision - Automated cell detection in histopathology"
        />

        {/* Project Header */}
        <header className="mb-16 p-6 rounded-2xl bg-light/[0.03]">
          <h1 className="text-3xl md:text-4xl font-bold text-light mb-3">
            OncoCell Vision
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            AI-powered microscopy for detecting and counting cancer cell
            biomarkers
          </p>

          {/* Divider */}
          <div className="h-px bg-light/10 my-8" />

          {/* Client */}
          <div className="text-sm text-gray-400">
            <span className="text-gray-400 font-medium">Client: </span>
            <a
              href="https://www.volastratx.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Volastra Therapeutics
            </a>
            <span className="text-gray-400">
              {" "}
              · New York · United States 🇺🇸
            </span>
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
                In collaboration with{" "}
                <a
                  href="https://www.volastratx.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  Volastra Therapeutics
                </a>
                , this project aimed to prevent cancer progression by accurately
                detecting and quantifying key cellular structures – primary
                nuclei, micronuclei, mitosis, and apoptosis – in microscopy
                images. These structures serve as biomarkers for cancer
                diagnosis and treatment efficacy.
              </p>
              <p className="text-gray-300 leading-relaxed text-justify">
                Utilizing the{" "}
                <a
                  href="https://doi.org/10.1109/CVPR42600.2020.01079"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  EfficientDet
                </a>{" "}
                object detection architecture, pre-trained on the{" "}
                <a
                  href="https://www.image-net.org/index.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  ImageNet
                </a>{" "}
                dataset, we developed a pipeline capable of localizing and
                counting these cellular components across diverse cell lines.
                The model achieved a mean average precision (mAP) of 85% for
                primary nuclei and 66% for micronuclei, demonstrating its
                effectiveness in complex biological imaging scenarios.
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
              The dataset comprised 1,664 microscopy images from 36 different
              cancer cell lines, sourced from:
            </p>
            <ul className="space-y-2 text-gray-300 mb-6 text-justify">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>Volastra&apos;s internal database</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <a
                    href="https://idr.openmicroscopy.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    Image Data Resource
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <a
                    href="https://lincs.hms.harvard.edu/_static/db/index.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    HMS LINCS database
                  </a>
                </span>
              </li>
            </ul>

            <p className="text-gray-300 leading-relaxed text-justify">
              The data was split into 1,004 images for training, 460 for
              validation, and 200 for testing. Pre-processing steps included
              image tiling with various strategies, such as regular window
              shift, padding, and unfixed-size windows, to handle
              high-resolution images and enhance model performance.
            </p>
          </section>

          {/* Methods */}
          <section>
            <h2 className="text-xl font-semibold text-light mb-4 flex items-center gap-3">
              <span className="w-1 h-6 bg-accent rounded-full"></span>
              Methods
            </h2>

            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              To detect and count various types of cell nuclei in microscopy
              images, we adopted an object detection approach centered on the
              EfficientDet architecture (
              <a href="#figure-1" className="text-accent hover:underline">
                Figure 1
              </a>
              ). EfficientDet is a state-of-the-art detection network that
              strikes a balance between accuracy and computational efficiency,
              making it suitable for high-throughput biomedical imaging tasks.
            </p>

            <p className="text-gray-300 leading-relaxed mb-6 text-justify">
              The backbone of the architecture is EfficientNet, a family of
              convolutional neural networks that scales depth, width, and
              resolution in a compound manner for improved performance. On top
              of this, we employed a Bi-directional Feature Pyramid Network
              (BiFPN), which enhances feature extraction at multiple scales by
              allowing bidirectional flow of information through top-down and
              bottom-up paths. This is particularly critical in microscopy
              images where cellular structures vary in size and location.
            </p>

            {/* Figure 1: EfficientDet Architecture */}
            <figure id="figure-1" className="mb-6 scroll-mt-24">
              <ImageLightbox
                src="/portfolio/oncocell-vision/efficientdet-architecture.webp"
                alt="EfficientDet Architecture"
                width={1200}
                height={600}
                maxWidth="2xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 1.</span> EfficientDet
                architecture with EfficientNet backbone and Bi-directional
                Feature Pyramid Network (BiFPN) for multi-scale feature
                extraction.
              </figcaption>
            </figure>

            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              To optimize performance on high-resolution microscopy images, we
              implemented a tiling strategy. Large images were divided into
              smaller overlapping or non-overlapping tiles to enable manageable
              input sizes for the model and to preserve context at the borders.
              Three strategies were evaluated:
            </p>

            <ul className="space-y-2 text-gray-300 mb-6 text-justify">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">
                    Regular window shift:
                  </strong>{" "}
                  Divides the image into uniform tiles
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Window padding:</strong>{" "}
                  Adds zero-padding to retain context
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">
                    Unfixed-size windows:
                  </strong>{" "}
                  Adapts to cell density variations
                </span>
              </li>
            </ul>

            {/* Figure 2: Tiling Strategies */}
            <figure id="figure-2" className="mb-6 scroll-mt-24">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-xl overflow-hidden border border-white/10">
                  <video
                    src="/portfolio/oncocell-vision/tiling-with-regular-window-shift.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                    className="w-full h-auto"
                    preload="metadata"
                  >
                    Your browser does not support the video tag.
                  </video>
                  <p className="text-center text-xs text-gray-400 py-2 bg-dark/50">
                    (a) Regular window shift
                  </p>
                </div>
                <div className="rounded-xl overflow-hidden border border-white/10">
                  <video
                    src="/portfolio/oncocell-vision/tiling-with-padding.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                    className="w-full h-auto"
                    preload="metadata"
                  >
                    Your browser does not support the video tag.
                  </video>
                  <p className="text-center text-xs text-gray-400 py-2 bg-dark/50">
                    (b) Window padding
                  </p>
                </div>
                <div className="rounded-xl overflow-hidden border border-white/10">
                  <video
                    src="/portfolio/oncocell-vision/tiling-with-unfixed-size-window.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                    className="w-full h-auto"
                    preload="metadata"
                  >
                    Your browser does not support the video tag.
                  </video>
                  <p className="text-center text-xs text-gray-400 py-2 bg-dark/50">
                    (c) Unfixed-size windows
                  </p>
                </div>
              </div>
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 2.</span> Comparison of
                tiling strategies for processing high-resolution microscopy
                images: (a) regular window shift, (b) window padding, and (c)
                unfixed-size windows.
              </figcaption>
            </figure>

            <p className="text-gray-300 leading-relaxed text-justify">
              The model was trained on 1,004 images, validated on 460, and
              tested on 200 from a dataset comprising 36 cell lines. Labeling
              included annotations for primary nuclei, micronuclei, mitotic
              cells, and apoptotic bodies, allowing the model to learn to
              discriminate among these biologically significant substructures.
              To evaluate the model, we calculated mean Average Precision (mAP)
              across object classes using the standard intersection-over-union
              (IoU) metric.
            </p>
          </section>

          {/* Results */}
          <section>
            <h2 className="text-xl font-semibold text-light mb-4 flex items-center gap-3">
              <span className="w-1 h-6 bg-accent rounded-full"></span>
              Results
            </h2>

            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              The trained EfficientDet model demonstrated high accuracy in
              detecting and localizing cancer cell substructures across a range
              of cell lines and magnifications. The model achieved:
            </p>

            <ul className="space-y-2 text-gray-300 mb-4">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">85% mAP</strong> for primary
                  nuclei, indicating excellent capability in identifying and
                  counting these dominant and morphologically clear structures
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">66% mAP</strong> for
                  micronuclei, a more challenging target due to their small
                  size, lower contrast, and morphological variability
                </span>
              </li>
            </ul>

            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              These results show a strong performance relative to the complexity
              of the task, particularly for detecting micronuclei, which are
              critical indicators of genomic instability – a hallmark of cancer
              progression. The lower, yet still meaningful, performance on
              micronuclei reflects both the difficulty of the task and the
              potential for further model refinement.
            </p>

            <p className="text-gray-300 leading-relaxed mb-6 text-justify">
              Visual inspections of predictions across cell lines – MB-231
              (63X), HeLa, and CAL51 – demonstrated that the model generalizes
              well to different imaging resolutions and biological conditions (
              <a href="#figure-3" className="text-accent hover:underline">
                Figures 3-5
              </a>
              ). Additionally, the comparison of different tiling strategies
              during preprocessing revealed that unfixed-size tiling preserved
              biological context more effectively in dense cellular
              environments, slightly boosting detection performance in certain
              cell lines.
            </p>

            {/* Figure 3: Detection Comparison MB-231 */}
            <figure id="figure-3" className="mb-6 scroll-mt-24">
              <ImageLightbox
                src="/portfolio/oncocell-vision/detection-comparison-mb-231-63x.webp"
                alt="Detection comparison MB-231 63X"
                width={800}
                height={600}
                maxWidth="3xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 3.</span> Detection
                results on MB-231 cell line (63X magnification) showing
                identification of primary nuclei and micronuclei.
              </figcaption>
            </figure>

            {/* Figure 4: Detection Comparison HeLa */}
            <figure id="figure-4" className="mb-6 scroll-mt-24">
              <ImageLightbox
                src="/portfolio/oncocell-vision/detection-comparison-hela.webp"
                alt="Detection comparison HeLa"
                width={800}
                height={600}
                maxWidth="3xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 4.</span> Detection
                results on HeLa cell line showing identification of primary
                nuclei and micronuclei.
              </figcaption>
            </figure>

            {/* Figure 5: Detection Comparison CAL51 */}
            <figure id="figure-5" className="scroll-mt-24">
              <ImageLightbox
                src="/portfolio/oncocell-vision/detection-comparison-cal51.webp"
                alt="Detection comparison CAL51"
                width={800}
                height={600}
                maxWidth="3xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 5.</span> Detection
                results on CAL51 cell line showing identification of primary
                nuclei and micronuclei.
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
              This project successfully developed a deep learning pipeline for
              detecting and quantifying key cancer cell structures in microscopy
              images. The high accuracy achieved underscores the potential of AI
              in enhancing cancer diagnostics and treatment monitoring.
            </p>
            <p className="text-gray-300 leading-relaxed text-justify">
              Future work may involve expanding the dataset to include more
              diverse cell lines and further refining the model to improve
              detection of less prevalent structures like micronuclei. The
              results validate the use of deep learning – particularly
              EfficientDet with BiFPN – for high-resolution biomedical image
              analysis, holding promise for scalable implementation in clinical
              research settings.
            </p>
          </section>
        </div>
      </div>
      {/* Bottom spacing before footer */}
      <div className="pb-24" />
    </main>
  );
}
