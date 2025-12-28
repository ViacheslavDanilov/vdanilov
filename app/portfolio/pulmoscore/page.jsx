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
  title: "PulmoScore – Viacheslav Danilov",
  description:
    "Two-stage ML workflow for COVID-19 severity scoring on chest X-rays. Achieved MAE of 0.30 and 11× faster processing than existing solutions.",
};

const HIGHLIGHTS_ITEMS = [
  {
    icon: faSearch,
    label: "Situation",
    text: "Beth Israel Deaconess Medical Center needed a faster, more accurate tool for diagnosing COVID-19 from chest X-rays.",
  },
  {
    icon: faBullseye,
    label: "Task",
    text: "Design and implement an ML pipeline to segment lungs and assess disease severity on chest radiographs.",
  },
  {
    icon: faCogs,
    label: "Action",
    text: "Built a two-stage model using DeepLabV3+ and MA-Net, trained on diverse datasets for robust lung and infection detection.",
  },
  {
    icon: faChartLine,
    label: "Result",
    text: "Achieved 0.30 MAE out of 6.0 and 11× faster processing, enabling scalable, real-time diagnostics.",
  },
];

const TEAM_MEMBERS = [
  {
    name: "Viacheslav Danilov",
    role: "Lead ML Engineer",
    organization: "Quantori",
    location: "Cambridge · US 🇺🇸",
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
    name: "Alex Proutski",
    role: "Research Scientist",
    organization: "Quantori",
    location: "Hague · Netherlands 🇳🇱",
    photo: "/portfolio/team/alex-proutski.webp",
    links: {
      linkedin: "https://www.linkedin.com/in/alexanderproutski/",
      email: "alex_proutski@hotmail.com",
    },
  },
  {
    name: "David Nefaridze",
    role: "Data Scientist",
    organization: "Quantori",
    location: "Tbilisi · Georgia 🇬🇪",
    photo: "/portfolio/team/john-doe.webp",
    links: {
      linkedin: "http://linkedin.com/in/david-nefaridze",
      github: "https://github.com/datonefaridze",
      email: "datonefaridze495@gmail.com",
    },
  },
  {
    name: "Diana Litmanovich",
    role: "Radiologist",
    organization: "BID Medical Center",
    location: "Boston · US 🇺🇸",
    photo: "/portfolio/team/diana-litmanovich.webp",
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
    location: "Cambridge · US 🇺🇸",
    photo: "/portfolio/team/yuriy-gankin.webp",
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
    url: "https://www.nature.com/articles/s41598-022-15013-z",
  },
  {
    label: "GitHub",
    url: "https://github.com/ViacheslavDanilov/covid_scoring",
  },
  { label: "Models", url: "https://zenodo.org/doi/10.5281/zenodo.8393555" },
  {
    label: "Dataset 1",
    url: "https://data.mendeley.com/datasets/8gf9vpkhgy/2",
  },
  {
    label: "Dataset 2",
    url: "https://data.mendeley.com/datasets/36fjrg9s69/1",
  },
];

const TECH_STACK = [
  "PyTorch",
  "scikit-learn",
  "Albumentations",
  "Supervisely",
  "Weights & Biases",
  "OpenCV",
];

const SEGMENTATION_RESULTS = [
  { src: "/portfolio/pulmoscore/unet.webp", model: "U-Net", score: 4 },
  {
    src: "/portfolio/pulmoscore/unet-plus-plus.webp",
    model: "U-Net++",
    score: 5,
  },
  {
    src: "/portfolio/pulmoscore/deeplab-v3.webp",
    model: "DeepLabV3",
    score: 0,
  },
  {
    src: "/portfolio/pulmoscore/deeplab-v3-plus.webp",
    model: "DeepLabV3+",
    score: 3,
  },
  { src: "/portfolio/pulmoscore/fpn.webp", model: "FPN", score: 4 },
  { src: "/portfolio/pulmoscore/linknet.webp", model: "LinkNet", score: 3 },
  { src: "/portfolio/pulmoscore/pspnet.webp", model: "PSPNet", score: 3 },
  { src: "/portfolio/pulmoscore/pan.webp", model: "PAN", score: 5 },
  { src: "/portfolio/pulmoscore/manet.webp", model: "MA-Net", score: 5 },
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
            PulmoScore
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Two-stage ML workflow for COVID-19 severity scoring on chest X-rays
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
                This project developed a two-stage ML-driven workflow for
                segmenting and scoring lung diseases on chest X-rays, with a
                focus on COVID-19. The approach combined lung segmentation and
                disease localization, followed by a severity scoring process to
                provide quantitative assessments aligned with radiological
                practices.
              </p>
              <p className="text-gray-300 leading-relaxed text-justify">
                Using publicly available datasets, the best-performing solution
                integrated DeepLabV3+ for lung segmentation and MA-Net for
                disease segmentation, achieving a mean absolute error (MAE) of
                0.30 out of 6.0 – significantly outperforming established
                methods like{" "}
                <a
                  href="https://www.sciencedirect.com/science/article/pii/S136184152100092X"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  BS-net
                </a>{" "}
                and{" "}
                <a
                  href="https://www.nature.com/articles/s41598-020-76550-z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  COVID-Net-S
                </a>
                . The workflow is 11 times faster than comparable solutions and
                adaptable to broader applications, including pneumonia and
                tuberculosis.
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
              The dataset for this study was carefully curated to address both
              lung segmentation and disease-scoring tasks, drawing from diverse
              publicly available sources:
            </p>
            <ul className="space-y-2 text-gray-300 mb-6 text-justify">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Lung Segmentation:</strong>{" "}
                  6,810 X-rays from three datasets (Darwin, Montgomery,
                  Shenzhen) providing diverse examples of lung pathologies and
                  healthy subjects
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">
                    Disease Segmentation:
                  </strong>{" "}
                  1,364 X-rays from four COVID-19 datasets (ACCD, CRD, CCXD,
                  FCXD) and two normal datasets (CXN, RSNA) representing 580
                  COVID-19 and 784 normal cases
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Source Diversity:</strong>{" "}
                  Data sourced from over 40 institutions worldwide, ensuring
                  robust model generalization
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

            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              The proposed workflow inherits the quantification and
              qualification of lung diseases from expert radiologists and
              fulfills the following processing steps (
              <a href="#figure-1" className="text-accent hover:underline">
                Figure 1
              </a>
              ):
            </p>

            <ul className="space-y-4 text-gray-300 mb-6 text-justify">
              <li>
                <strong className="text-gray-200">
                  Stage I – Lung Segmentation:
                </strong>{" "}
                Pixel-level localization of the lungs and removal of irrelevant
                areas using DeepLabV3+ architecture.
              </li>
              <li>
                <strong className="text-gray-200">
                  Stage II – Disease Segmentation:
                </strong>{" "}
                Identification of infected lung regions with nine tested neural
                networks: U-Net, U-Net++, DeepLabV3, DeepLabV3+, FPN, LinkNet,
                PSPNet, PAN, and MA-Net.
              </li>
              <li>
                <strong className="text-gray-200">
                  Stage III – Severity Scoring:
                </strong>{" "}
                Quantification and qualification of infected regions to compute
                an overall severity score per patient, aligned with radiological
                practices.
              </li>
            </ul>

            {/* Figure 1: COVID Scoring Workflow */}
            <figure id="figure-1" className="scroll-mt-24">
              <ImageLightbox
                src="/portfolio/pulmoscore/covid-scoring-workflow.webp"
                alt="COVID Scoring Workflow"
                width={2520}
                height={900}
                maxWidth="full"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 1.</span> Two-stage COVID
                severity scoring workflow showing lung segmentation, disease
                detection, and severity quantification.
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
              The proposed workflow demonstrated high accuracy and efficiency in
              segmenting lungs, identifying infected regions, and computing
              severity scores for COVID-19 patients:
            </p>

            <ul className="space-y-2 text-gray-300 mb-4">
              <li>
                <strong className="text-gray-200">Best Accuracy:</strong>{" "}
                DeepLabV3+ (Stage I) + MA-Net (Stage II) achieved MAE of{" "}
                <span className="font-semibold">0.30</span> out of 6.0,
                significantly outperforming BS-net (MAE: 2.52) and COVID-Net-S
                (MAE: 1.83).
              </li>
              <li>
                <strong className="text-gray-200">Processing Speed:</strong> The
                fastest solution (DeepLabV3+ + PSPNet) processed{" "}
                <span className="font-semibold">12.5 images/second</span>, while
                the most accurate achieved 7.9 images/second.
              </li>
              <li>
                <strong className="text-gray-200">Efficiency Gain:</strong>{" "}
                <span className="text-light font-semibold">11× faster</span>{" "}
                than BS-net and COVID-Net-S (0.7 and 0.6 images/s respectively).
              </li>
            </ul>

            <p className="text-gray-300 leading-relaxed mb-6 text-justify">
              The model comparison chart (
              <a href="#figure-2" className="text-accent hover:underline">
                Figure 2
              </a>
              ) summarizes the performance across all tested architectures,
              while
              <a href="#figure-3" className="text-accent hover:underline">
                {" "}
                Figure 3
              </a>{" "}
              shows detailed segmentation results for each neural network.
            </p>

            {/* Figure 2: Model Comparison */}
            <figure id="figure-2" className="mb-6 scroll-mt-24">
              <ImageLightbox
                src="/portfolio/pulmoscore/model-comparison.webp"
                alt="Model Performance Comparison"
                width={1200}
                height={800}
                maxWidth="2xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 2.</span> Performance
                comparison of tested neural network architectures showing MAE
                and processing speed.
              </figcaption>
            </figure>

            {/* Figure 3: Segmentation Results Grid */}
            <figure id="figure-3" className="scroll-mt-24">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {SEGMENTATION_RESULTS.map((item) => (
                  <div key={item.model} className="flex flex-col">
                    <ImageLightbox
                      src={item.src}
                      alt={`${item.model} Segmentation Results`}
                      width={1024}
                      height={1024}
                      maxWidth="full"
                      className="rounded-lg"
                    />
                    <p className="text-center text-sm text-gray-300 mt-2">
                      <span className="font-medium">{item.model}</span>
                      <span className="text-gray-500"> · Score: </span>
                      <span className="text-accent font-semibold">
                        {item.score}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
              <figcaption className="text-center text-sm text-gray-400 mt-4">
                <span className="text-gray-300">Figure 3.</span> Segmentation
                results comparison across all tested architectures. Cyan
                delineation: lung segmentation (Stage I); Red mask: disease
                prediction (Stage II); Yellow mask: ground truth.
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
              The proposed two-stage workflow accurately segmented lung regions
              and quantified infection severity, offering a significant
              improvement over existing methods in both accuracy and speed. By
              combining DeepLabV3+ for lung segmentation and MA-Net for disease
              segmentation, the system provided reliable diagnostic support for
              COVID-19 and other respiratory diseases.
            </p>
            <p className="text-gray-300 leading-relaxed text-justify">
              Future directions include adapting this workflow for real-time
              clinical deployment and expanding its application to other
              pulmonary conditions, such as pneumonia and tuberculosis.
            </p>
          </section>
        </div>
      </div>
      {/* Bottom spacing before footer */}
      <div className="pb-24" />
    </main>
  );
}
