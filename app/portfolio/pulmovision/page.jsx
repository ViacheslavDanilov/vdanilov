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
  title: "PulmoVision",
  description:
    "Explainable AI framework for detecting pulmonary edema features in chest X-rays using deep learning segmentation and object detection.",
  openGraph: {
    title: "PulmoVision | Viacheslav Danilov",
    description:
      "Explainable AI framework for detecting pulmonary edema features in chest X-rays using deep learning segmentation and object detection.",
    images: [
      {
        url: "https://vdanilov.dev/portfolio/pulmovision/opengraph-image.jpg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PulmoVision | Viacheslav Danilov",
    description:
      "Explainable AI framework for detecting pulmonary edema features in chest X-rays using deep learning segmentation and object detection.",
    images: ["https://vdanilov.dev/portfolio/pulmovision/opengraph-image.jpg"],
  },
};

const HIGHLIGHTS_ITEMS = [
  {
    icon: faSearch,
    label: "Situation",
    text: "Radiologists at Beth Israel Deaconess Medical Center lacked an AI tool to reliably detect pulmonary edema in chest X-rays, making diagnosis time-consuming and subjective.",
  },
  {
    icon: faBullseye,
    label: "Task",
    text: "Design and implement segmentation and object detection models to automatically identify and localize edema-related radiographic features.",
  },
  {
    icon: faCogs,
    label: "Action",
    text: "Built an ensemble of eight detection networks with a robust annotation pipeline; optimized inference for real-time deployment using lung segmentation preprocessing.",
  },
  {
    icon: faChartLine,
    label: "Result",
    text: "Achieved mAP of 0.568 with SABL network, enabling real-time clinical support and streamlining radiology workflows with interpretable AI predictions.",
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
    name: "Alex Proutski",
    role: "Research Scientist",
    organization: "Quantori",
    location: "Hague · Netherlands 🇳🇱",
    photo: "/people/alex-proutski.webp",
    links: {
      linkedin: "https://www.linkedin.com/in/alexanderproutski/",
      email: "alex_proutski@hotmail.com",
    },
  },
  {
    name: "Diana Litmanovich",
    role: "Radiologist",
    organization: "BID Medical Center",
    location: "Boston · United States 🇺🇸",
    photo: "/people/diana-litmanovich.webp",
    links: {
      globe:
        "https://findadoc.bidmc.org/details/929/diana-litmanovich-diagnostic_radiology-boston-needham",
      linkedin: "https://www.linkedin.com/in/diana-litmanovich-55577276",
      researchgate: "https://www.researchgate.net/profile/Diana-Litmanovich",
      google: "https://scholar.google.com/citations?user=i3JdQAYAAAAJ&hl=en",
      email: "dlitmano@bidmc.harvard.edu",
    },
  },
  {
    name: "Yuriy Gankin",
    role: "Chief Science Officer",
    organization: "Quantori",
    location: "Cambridge · United States 🇺🇸",
    photo: "/people/yuriy-gankin.webp",
    links: {
      globe: "https://quantori.com/about/yuriy-gankin",
      linkedin: "https://www.linkedin.com/in/yuriygankin/",
      orcid: "https://orcid.org/0000-0003-0046-1037",
      google: "https://scholar.google.com/citations?user=0H_Ty8sAAAAJ",
      email: "yuriy.gankin@quantori.com",
    },
  },
];

const RESOURCES = [
  {
    label: "Journal Paper",
    url: "https://doi.org/10.1093/radadv/umae003",
  },
  {
    label: "GitHub",
    url: "https://github.com/ViacheslavDanilov/edema_quantification",
  },
  { label: "Models", url: "https://doi.org/10.5281/zenodo.8393565" },
  { label: "Dataset", url: "https://doi.org/10.5281/zenodo.8383776" },
];

const TECH_STACK = [
  "PyTorch",
  "MMDetection",
  "MMCV",
  "scikit-learn",
  "Albumentations",
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

        {/* Project Header */}
        <header className="mb-16 p-6 rounded-2xl bg-light/[0.03]">
          <h1 className="text-3xl md:text-4xl font-bold text-light mb-3">
            PulmoVision
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Explainable AI for pulmonary edema detection in chest X-rays
          </p>

          {/* Divider */}
          <div className="h-px bg-light/10 my-8" />

          {/* Client */}
          <div className="text-sm text-gray-400">
            <span className="text-gray-400 font-medium">Client: </span>
            <a
              href="https://www.bidmc.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Beth Israel Deaconess Medical Center
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
                <a
                  href="https://en.wikipedia.org/wiki/Pulmonary_edema"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  Pulmonary edema
                </a>
                , a critical condition often linked to congestive heart failure,
                requires timely and accurate diagnosis for effective treatment
                planning. This project aimed to develop an explainable AI
                solution to assist in the identification and severity assessment
                of pulmonary edema using chest X-rays.
              </p>
              <p className="text-gray-300 leading-relaxed text-justify">
                We implemented a two-stage deep learning framework: lung
                segmentation and edema feature localization. The segmentation
                stage focused on isolating lung regions, while the detection
                stage utilized multiple object detection networks to identify
                edema-related radiographic features such as cephalization,
                Kerley lines, pleural effusion, infiltrates, and bat wings. The
                methodology integrated state-of-the-art networks, achieving high
                precision in localizing features and providing an interpretable
                diagnostic aid for radiologists.
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
              This study leveraged a robust and clinically relevant dataset to
              ensure precise model training and evaluation:
            </p>
            <ul className="space-y-2 text-gray-300 mb-6 text-justify">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Source:</strong> Chest
                  X-rays were sourced from the{" "}
                  <a
                    href="https://physionet.org/content/mimic-cxr-jpg/2.1.0/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    Medical Information Mart for Intensive Care
                  </a>{" "}
                  (MIMIC) database.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Dataset Size:</strong> 1,000
                  annotated chest X-rays representing 741 patients with
                  suspected pulmonary edema.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Features:</strong>{" "}
                  Cephalization, Kerley lines, pleural effusion, bat wings, and
                  infiltrates.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Annotation Method:</strong>{" "}
                  Cephalization and Kerley lines were delineated using
                  polylines; pleural effusion, bat wings, and infiltrates were
                  marked with binary segmentation masks.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">
                    Annotation Platform:
                  </strong>{" "}
                  The{" "}
                  <a
                    href="https://supervisely.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    Supervisely
                  </a>{" "}
                  computer vision platform facilitated high-quality, consistent
                  annotations.
                </span>
              </li>
            </ul>

            <p className="text-gray-300 leading-relaxed mb-6 text-justify">
              Radiological features such as cephalization, Kerley lines, pleural
              effusion, bat wings, and infiltrates were labeled by an
              experienced radiologist (
              <a href="#figure-1" className="text-accent hover:underline">
                Figure 1
              </a>
              ).
            </p>

            {/* Figure 1: Annotation Methodology */}
            <figure id="figure-1" className="scroll-mt-24">
              <ImageLightbox
                src="/portfolio/pulmovision/chest-xray-annotation-methodology.webp"
                alt="Chest X-ray Annotation Methodology"
                width={2520}
                height={900}
                maxWidth="full"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 1.</span> Chest X-ray
                annotation methodology showing the radiographic features of
                pulmonary edema: cephalization, Kerley lines, pleural effusion,
                bat wings, and infiltrates.
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
              The project implemented a comprehensive two-stage methodology
              tailored for the detection and localization of pulmonary edema
              features:
            </p>

            <ul className="space-y-4 text-gray-300 mb-6 text-justify">
              <li>
                <strong className="text-gray-200">Lung Segmentation:</strong>{" "}
                Combined predictions from three segmentation models (DeepLabV3,
                MA-Net, and FPN) in an ensemble approach. Achieved Dice
                Similarity Coefficients exceeding 94%, ensuring precise lung
                boundary delineation.
              </li>
              <li>
                <strong className="text-gray-200">Feature Detection:</strong>{" "}
                Eight object detection networks were trained to specialize in
                detecting individual features, including SABL, TOOD, Cascade
                RPN, PAA, Faster R-CNN, GFL, FSAF, and ATSS.
              </li>
              <li>
                <strong className="text-gray-200">Training Strategy:</strong>{" "}
                Each network was configured to address imbalances in feature
                representation, with tailored confidence thresholds to optimize
                F1 scores.
              </li>
              <li>
                <strong className="text-gray-200">Evaluation Metrics:</strong>{" "}
                Used average precision (AP), mean average precision (mAP), and
                latency to assess network performance across all feature
                classes.
              </li>
            </ul>

            <p className="text-gray-300 leading-relaxed mb-6 text-justify">
              The two-stage detection workflow is illustrated in{" "}
              <a href="#figure-2" className="text-accent hover:underline">
                Figure 2
              </a>
              , showing lung segmentation followed by feature detection.
            </p>

            {/* Figure 2: Feature Detection Workflow */}
            <figure id="figure-2" className="scroll-mt-24">
              <ImageLightbox
                src="/portfolio/pulmovision/feature-detection-workflow.webp"
                alt="Feature Detection Workflow"
                width={1800}
                height={600}
                maxWidth="full"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 2.</span> Two-stage
                feature detection workflow: lung segmentation using ensemble
                models followed by object detection for edema features.
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
              The developed framework demonstrated high precision and efficiency
              in localizing radiographic features of pulmonary edema:
            </p>

            <ul className="space-y-2 text-gray-300 mb-4">
              <li>
                <strong className="text-gray-200">SABL:</strong> Achieved the
                highest mAP of{" "}
                <span className="font-semibold text-light">0.568</span> and
                excelled in detecting pleural effusion (AP: 0.599), infiltrates
                (AP: 0.395), and bat wings (AP: 0.926).
              </li>
              <li>
                <strong className="text-gray-200">TOOD & Cascade RPN:</strong>{" "}
                Showed strong capabilities in detecting bat wings (AP: 0.918)
                and cephalization (AP: 0.532).
              </li>
              <li>
                <strong className="text-gray-200">Faster R-CNN:</strong>{" "}
                Delivered the shortest processing time of{" "}
                <span className="font-semibold text-light">42 ms</span> per
                image, demonstrating suitability for high-throughput clinical
                workflows.
              </li>
              <li>
                <strong className="text-gray-200">Bat Wings Detection:</strong>{" "}
                All networks demonstrated exceptional accuracy with average
                precision scores exceeding 0.90.
              </li>
            </ul>

            <p className="text-gray-300 leading-relaxed mb-6 text-justify">
              The integration of segmentation and detection networks provides a
              scalable solution for automating radiographic assessments, with
              applications in real-time diagnostic workflows and severity
              grading systems. The network performance comparison is shown in{" "}
              <a href="#figure-3" className="text-accent hover:underline">
                Figure 3
              </a>
              .
            </p>

            {/* Figure 3: Network Comparison */}
            <figure id="figure-3" className="mb-6 scroll-mt-24">
              <ImageLightbox
                src="/portfolio/pulmovision/comparison-of-detection-networks.webp"
                alt="Comparison of Detection Networks"
                width={1600}
                height={800}
                maxWidth="2xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 3.</span> Comparison of
                detection networks showing mAP scores, latency, and number of
                parameters for each model.
              </figcaption>
            </figure>

            <p className="text-gray-300 leading-relaxed mb-6 text-justify">
              Visual assessment of network predictions for bat wings (
              <a href="#figure-4" className="text-accent hover:underline">
                Figure 4
              </a>
              ) and pleural effusion (
              <a href="#figure-5" className="text-accent hover:underline">
                Figure 5
              </a>
              ) demonstrates the model&apos;s capabilities across different
              radiographic features.
            </p>

            {/* Figure 4: Bat Wing Predictions */}
            <figure id="figure-4" className="mb-6 scroll-mt-24">
              <ImageLightbox
                src="/portfolio/pulmovision/comparison-of-bat-wing-predictions.webp"
                alt="Comparison of Bat Wing Predictions"
                width={2200}
                height={1600}
                maxWidth="md"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 4.</span> Comparison of
                bat wing predictions across all detection networks,
                demonstrating exceptional accuracy with AP scores exceeding
                0.90.
              </figcaption>
            </figure>

            {/* Figure 5: Effusion Predictions */}
            <figure id="figure-5" className="scroll-mt-24">
              <ImageLightbox
                src="/portfolio/pulmovision/comparison-of-effusion-predictions.webp"
                alt="Comparison of Pleural Effusion Predictions"
                width={2200}
                height={1600}
                maxWidth="md"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 5.</span> Comparison of
                pleural effusion predictions showing varying performance across
                networks, with TOOD identifying both effusions.
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
              This project demonstrated the effectiveness of an explainable AI
              framework in accurately detecting pulmonary edema features from
              chest X-rays, offering enhanced diagnostic support for clinicians.
              The two-stage approach combining lung segmentation with
              specialized object detection networks achieved high precision
              while maintaining interpretability.
            </p>
            <p className="text-gray-300 leading-relaxed text-justify">
              The results highlight the potential for integrating such models
              into clinical workflows, with future improvements focusing on
              severity grading, larger datasets, and real-time implementation in
              hospital radiology departments.
            </p>
          </section>
        </div>
      </div>
      {/* Bottom spacing before footer */}
      <div className="pb-24" />
    </main>
  );
}
