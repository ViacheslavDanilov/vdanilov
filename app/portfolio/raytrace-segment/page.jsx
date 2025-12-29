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
  title: "RayTrace Segment – Viacheslav Danilov",
  description:
    "Ray-casting segmentation algorithm for convex anatomical structures in MRI, achieving up to 91.8% Dice score with millisecond-level runtime using ensemble learning.",
};

const HIGHLIGHTS_ITEMS = [
  {
    icon: faSearch,
    label: "Situation",
    text: "Clinicians and researchers needed a fast, reliable method to segment anatomical structures – such as brain tumors and cardiac ventricles – from MRI scans for diagnostic support and surgical planning.",
  },
  {
    icon: faBullseye,
    label: "Task",
    text: "Develop a ray-casting-based segmentation algorithm optimized for convex anatomical regions, using ensemble learning to enhance boundary detection under class imbalance.",
  },
  {
    icon: faCogs,
    label: "Action",
    text: "Engineered a pipeline that converts 2D MRI data into 1D ray profiles, applied classifiers like AdaBoost.M2 and SMOTEBoost, and used spline interpolation to construct smooth anatomical masks.",
  },
  {
    icon: faChartLine,
    label: "Result",
    text: "Delivered accurate segmentations with up to 91.8% Dice similarity and millisecond-level runtime, demonstrating strong performance across two clinical datasets.",
  },
];

const TEAM_MEMBERS = [
  {
    name: "Viacheslav Danilov",
    role: "Research Scientist",
    organization: "University of Leeds",
    location: "Leeds · United Kingdom 🇬🇧",
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
    name: "Alex Frangi",
    role: "Professor",
    organization: "University of Leeds",
    location: "Leeds · United Kingdom 🇬🇧",
    photo: "/people/alex-frangi.webp",
    links: {
      globe: "https://research.manchester.ac.uk/en/persons/alejandro-frangi",
      linkedin: "https://www.linkedin.com/in/alejandro-frangi/",
      researchgate: "https://www.researchgate.net/profile/Alejandro-Frangi",
      google: "https://scholar.google.com/citations?user=9fGrB0sAAAAJ",
      email: "alejandro.frangi@manchester.ac.uk",
    },
  },
];

const RESOURCES = [
  {
    label: "Conference Paper",
    url: "https://isprs-archives.copernicus.org/articles/XLII-2-W12/37/2019/",
  },
];

const TECH_STACK = ["R", "caret", "OpenCV", "SMOTE", "MATLAB"];

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
            RayTrace Segment
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Ray-casting segmentation for convex anatomical structures in MRI
          </p>

          {/* Divider */}
          <div className="h-px bg-light/10 my-8" />

          {/* Client */}
          <div className="text-sm text-gray-400">
            <span className="text-gray-400 font-medium">Client: </span>
            <a
              href="https://www.cistib.org/r-d/en/our-r-d-programmes"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Centre for Computational Imaging & Simulation Technologies in
              Biomedicine
            </a>
            <span className="text-gray-400"> · Leeds · United Kingdom 🇬🇧</span>
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
                This project addresses the challenge of segmenting anatomical
                structures in MRI images with high accuracy and low
                computational cost. Leveraging a ray-casting technique, the
                algorithm emits radial beams from a central point to detect
                boundary points of target regions like the heart&apos;s left
                ventricle and brain tumors.
              </p>
              <p className="text-gray-300 leading-relaxed text-justify">
                To overcome data imbalance – a common issue in pixel-based
                classification – the approach incorporates ensemble learning
                methods like AdaBoost.M2, SMOTEBoost, and UnderBagging. The
                algorithm was tested on two major datasets: a cardiac MRI
                dataset from the University of York and a brain tumor MRI
                dataset from Southern Medical University. The results
                demonstrate impressive segmentation accuracy (up to 89.5% Dice
                coefficient) and fast execution times (as low as 4.1 ms), making
                it suitable for real-time or clinical scenarios.
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
              This project utilized two publicly available, clinically annotated
              MRI datasets to evaluate the segmentation algorithm&apos;s
              performance on cardiac and brain anatomical structures.
            </p>
            <ul className="space-y-2 text-gray-300 mb-6 text-justify">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">
                    Cardiac MRI Dataset:
                  </strong>{" "}
                  Comprising 7,980 short-axis cardiac MRI images from 33
                  patients (York University). Each sequence includes 20 frames
                  with 8–15 slices per patient at 256×256 pixels resolution.
                  Manual segmentations of the left ventricle&apos;s endocardium
                  and epicardium were provided, each described by 32-point
                  contours.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">
                    Brain Tumor MRI Dataset:
                  </strong>{" "}
                  Contains 3,064 T1-weighted contrast-enhanced MRI slices from
                  233 patients (Southern Medical University), categorized into
                  meningioma (708 slices), glioma (1,426 slices), and pituitary
                  tumor (930 slices). Each image has a resolution of 512×512
                  pixels with manual tumor border delineations by experienced
                  radiologists.
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
              The segmentation algorithm follows a structured pipeline
              comprising five key stages: preprocessing, ray emission, data
              gathering, classifier training, and post-processing.
            </p>

            <ul className="space-y-4 text-gray-300 mb-6 text-justify">
              <li>
                <strong className="text-gray-200">Preprocessing:</strong>{" "}
                Histogram-based contrast enhancement using bimodal Gaussian
                filtering, intensity normalization to reduce variability, and
                resampling to ensure uniform resolution across datasets.
              </li>
              <li>
                <strong className="text-gray-200">
                  Ray Emission and Data Gathering:
                </strong>{" "}
                From a central point within the region of interest, rays are
                emitted at uniform angular intervals (∆φ), sampling intensity
                profiles along their paths. The number of rays (e.g., 8, 16, 32,
                64) determines the angular resolution (
                <a href="#figure-1" className="text-accent hover:underline">
                  Figure 1
                </a>
                ).
              </li>
              <li>
                <strong className="text-gray-200">Classifier Training:</strong>{" "}
                The extracted patches exhibit class imbalance, with boundary
                points being underrepresented. Ensemble learning techniques such
                as AdaBoost.M2, RUSBoost, UnderBagging, SMOTEBagging, and
                SMOTEBoost were employed to improve boundary detection accuracy.
              </li>
              <li>
                <strong className="text-gray-200">Post-Processing:</strong>{" "}
                Detected boundary points are interpolated using cubic splines to
                generate smooth, closed contours representing the segmented
                anatomical structures.
              </li>
            </ul>

            {/* Figure 1: Ray Emission Workflow */}
            <figure id="figure-1" className="scroll-mt-24">
              <ImageLightbox
                src="/portfolio/raytrace-segment/ray-emission-workflow.webp"
                alt="Ray Emission Workflow"
                width={2520}
                height={900}
                maxWidth="full"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 1.</span> Ray-casting
                segmentation workflow showing the step-by-step progression from
                raw image to final mask via radial ray emission and boundary
                detection.
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
              The algorithm produced high-quality segmentation results with low
              computational latency across both cardiac and brain tumor
              datasets.
            </p>

            <ul className="space-y-2 text-gray-300 mb-6">
              <li>
                <strong className="text-gray-200">Heart Segmentation:</strong>{" "}
                Dice Score up to{" "}
                <span className="font-semibold text-light">91.8%</span> (mean
                84.7–85.0% across ray configurations). Optimal trade-off at ∆φ =
                π/8 with speed of 4.1–20.2 ms per slice (
                <a href="#figure-2" className="text-accent hover:underline">
                  Figure 2
                </a>
                ).
              </li>
              <li>
                <strong className="text-gray-200">
                  Brain Tumor Segmentation:
                </strong>{" "}
                Dice Score up to{" "}
                <span className="font-semibold text-light">89.5%</span> (mean
                82.2–83.0%). Consistent performance across tumor types with
                speed of 5.1–16.0 ms per slice (
                <a href="#figure-3" className="text-accent hover:underline">
                  Figure 3
                </a>
                ).
              </li>
              <li>
                <strong className="text-gray-200">Best Classifiers:</strong>{" "}
                AdaBoost.M2 and SMOTEBoost offered the best trade-off between
                recall and precision across classifiers.
              </li>
            </ul>

            {/* Figure 2: Heart Segmentation */}
            <figure id="figure-2" className="mb-6 scroll-mt-24">
              <ImageLightbox
                src="/portfolio/raytrace-segment/heart-segmentation-via-ray-emission.webp"
                alt="Heart Segmentation via Ray Emission"
                width={2256}
                height={1600}
                maxWidth="full"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 2.</span> Cardiac left
                ventricle segmentation results showing ground truth contours and
                ray-casting predictions across different configurations.
              </figcaption>
            </figure>

            {/* Figure 3: Brain Tumor Segmentation */}
            <figure id="figure-3" className="scroll-mt-24">
              <ImageLightbox
                src="/portfolio/raytrace-segment/brain-segmentation-via-ray-emission.webp"
                alt="Brain Tumor Segmentation via Ray Emission"
                width={2256}
                height={1600}
                maxWidth="full"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 3.</span> Brain tumor
                segmentation results demonstrating algorithm performance across
                meningioma, glioma, and pituitary tumor types.
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
              This project introduced a ray-casting segmentation algorithm that
              efficiently and accurately detects anatomical structures in MRI
              images. By reducing the task to one-dimensional boundary
              detection, the method achieved high Dice scores – up to 91.8% for
              the heart and 89.5% for brain tumors – with millisecond-level
              processing times.
            </p>
            <p className="text-gray-300 leading-relaxed text-justify">
              The approach proved especially effective for convex shapes and
              benefited from ensemble classifiers like AdaBoost.M2 and
              SMOTEBoost to handle class imbalance. With a balanced
              configuration at ∆φ = π/8, it offers a strong trade-off between
              speed and accuracy. Future work could extend this method to
              non-convex structures and 3D imaging, further enhancing its
              clinical relevance.
            </p>
          </section>
        </div>
      </div>
      {/* Bottom spacing before footer */}
      <div className="pb-24" />
    </main>
  );
}
