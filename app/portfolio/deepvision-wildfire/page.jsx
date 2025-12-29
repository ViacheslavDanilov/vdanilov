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
  title: "DeepVision Wildfire – Viacheslav Danilov",
  description:
    "Deep learning wildfire detection system combining EfficientDet and CNN-RNN for real-time smoke detection in Siberian forests. Achieved 95.6% accuracy and 94% F1-score.",
};

const HIGHLIGHTS_ITEMS = [
  {
    icon: faSearch,
    label: "Situation",
    text: "Catastrophic wildfires in Siberia required an automated system to detect and localize fires in vast, remote forest regions using real-time video feeds.",
  },
  {
    icon: faBullseye,
    label: "Task",
    text: "Develop a deep learning–powered wildfire detection system leveraging object detection and temporal modeling across multi-source video datasets.",
  },
  {
    icon: faCogs,
    label: "Action",
    text: "Built a modular pipeline combining EfficientDet-D1 for spatial detection and a CNN-RNN hybrid classifier (InceptionV3 + LSTM) to track smoke evolution over time.",
  },
  {
    icon: faChartLine,
    label: "Result",
    text: "Achieved 95.6% classification accuracy and 94% F-score, outperforming existing systems with reliable quasi-real-time inference at ~9 FPS.",
  },
];

const TEAM_MEMBERS = [
  {
    name: "Viacheslav Danilov",
    role: "Research Supervisor",
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
    name: "Nikita Laptev",
    role: "ML Engineer",
    organization: "Tomsk Polytechnic University",
    location: "Tomsk · Russia 🇷🇺",
    photo: "/people/nikita-laptev.webp",
    links: {
      globe: "https://ieeexplore.ieee.org/author/37086602301",
      researchgate:
        "https://www.researchgate.net/scientific-contributions/Nikita-V-Laptev-2169942870",
      email: "nikitalaptev77@gmail.com",
    },
  },
  {
    name: "Vladislav Laptev",
    role: "Data Scientist",
    organization: "Tomsk Polytechnic University",
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
    name: "Andrey Kravchenko",
    role: "Software Developer",
    organization: "Tomsk Polytechnic University",
    location: "Tomsk · Russia 🇷🇺",
    photo: "/people/john-doe.webp",
    links: {
      researchgate: "https://www.researchgate.net/profile/Andrey-Kravchenko-4",
      email: "kravch2013@yandex.ru",
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
];

const RESOURCES = [
  {
    label: "Patent",
    url: "https://www1.fips.ru/fips_servl/fips_servlet?DB=EVM&DocNumber=2022619805&TypeFile=html",
  },
  {
    label: "Model Testing",
    url: "https://drive.google.com/drive/folders/1iZTxyE_3H1HkqPAMkTQD6Fz81zGKVsef?usp=sharing",
  },
];

const TECH_STACK = [
  "TensorFlow",
  "Python",
  "Java",
  "scikit-learn",
  "Supervisely",
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
            DeepVision Wildfire
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Deep learning wildfire detection system for real-time smoke
            detection in Siberian forests
          </p>

          {/* Divider */}
          <div className="h-px bg-light/10 my-8" />

          {/* Client */}
          <div className="text-sm text-gray-400">
            <span className="text-gray-400 font-medium">Client: </span>
            <a
              href="https://incom.tomsk.ru/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Incom Group
            </a>
            <span className="text-gray-400"> · Tomsk · Russia 🇷🇺</span>
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
                In response to the devastating 2019 Siberian wildfires, this
                project developed a high-accuracy wildfire detection system
                based on object detection and neural networks. The goal was to
                detect smoke in video footage and alert forest protection
                services in real-time.
              </p>
              <p className="text-gray-300 leading-relaxed text-justify">
                The project combined EfficientDet object detectors with custom
                pre-processing and a novel CNN-RNN hybrid classifier. Not only
                did it outperform existing systems in classification and
                localization accuracy, but it also significantly reduced false
                alarms. The final model achieved a classification accuracy of
                95.6% and an F1-score of 94%, making it a powerful tool for both
                civil protection and environmental monitoring.
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
              The system was trained on a diverse dataset of 550 video
              recordings (350 fire, 200 non-fire), sourced from multiple
              international wildfire monitoring centers:
            </p>
            <ul className="space-y-2 text-gray-300 mb-6 text-justify">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <a
                    href="http://www.seismo.unr.edu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    Nevada Seismological Laboratory
                  </a>{" "}
                  (United States)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <a
                    href="http://wildfire.fesb.hr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    Center for Wildfire Research
                  </a>{" "}
                  (Croatia)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <a
                    href="https://rosleshoz.gov.ru/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    Perm and Kaliningrad Forest Services
                  </a>{" "}
                  (Russia)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <a
                    href="https://www.hpwren.ucsd.edu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    HPWREN
                  </a>{" "}
                  (United States)
                </span>
              </li>
            </ul>

            <p className="text-gray-300 leading-relaxed mb-6 text-justify">
              From each video, frames were extracted, preprocessed, and
              annotated using{" "}
              <a
                href="https://supervisely.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Supervisely
              </a>
              . Preprocessing involved grayscale conversion, dynamic feature
              extraction using frame differencing, and noise reduction via
              adaptive Gaussian filtering. This increased signal clarity and
              reduced false positives (
              <a href="#figure-1" className="text-accent hover:underline">
                Figure 1
              </a>
              ).
            </p>

            {/* Figure 1: Nevada Seismological Lab Wildfire */}
            <figure id="figure-1" className="scroll-mt-24">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ImageLightbox
                  src="/portfolio/deepvision-wildfire/nevada-seismological-lab-wildfire-1.webp"
                  alt="Nevada Seismological Laboratory wildfire detection - sample 1"
                  width={1920}
                  height={1080}
                  maxWidth="full"
                />
                <ImageLightbox
                  src="/portfolio/deepvision-wildfire/nevada-seismological-lab-wildfire-2.webp"
                  alt="Nevada Seismological Laboratory wildfire detection - sample 2"
                  width={1920}
                  height={1080}
                  maxWidth="full"
                />
              </div>
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 1.</span> Sample wildfire
                detection from Nevada Seismological Laboratory video feed
                showing smoke plume identification.
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
              The detection pipeline used a three-stage architecture designed
              for robust smoke detection across varied terrain and weather
              conditions:
            </p>

            <ul className="space-y-4 text-gray-300 mb-6 text-justify">
              <li>
                <strong className="text-gray-200">
                  Dynamic Feature Extraction:
                </strong>{" "}
                Frame differencing and adaptive thresholding to isolate motion
                patterns typical of smoke.
              </li>
              <li>
                <strong className="text-gray-200">Object Detection:</strong>{" "}
                Multiple models were evaluated (EfficientDet-D0/D1/D2, Faster
                R-CNN, SSD MobileNet), with EfficientDet-D1 chosen for best
                localization and speed.
              </li>
              <li>
                <strong className="text-gray-200">
                  Hybrid Classification:
                </strong>{" "}
                A CNN-RNN model combining InceptionV3 for spatial features and
                LSTM for temporal analysis classified sequences of fire-related
                frames.
              </li>
              <li>
                <strong className="text-gray-200">Clustering Algorithm:</strong>{" "}
                A unique clustering algorithm aggregated detection results
                across frames using intersection-over-union (IoU) similarity,
                improving localization by 6% and reducing false positives.
              </li>
            </ul>

            <p className="text-gray-300 leading-relaxed mb-6 text-justify">
              The Siberian Forest Protection Service deployment scenario
              demonstrates the system&apos;s capability to detect smoke in
              challenging conditions (
              <a href="#figure-2" className="text-accent hover:underline">
                Figure 2
              </a>
              ).
            </p>

            {/* Figure 2: Siberian Forest Protection Service */}
            <figure id="figure-2" className="scroll-mt-24">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ImageLightbox
                  src="/portfolio/deepvision-wildfire/siberian-forest-protection-service-wildfire-1.webp"
                  alt="Siberian Forest Protection Service wildfire detection - sample 1"
                  width={1920}
                  height={1080}
                  maxWidth="full"
                />
                <ImageLightbox
                  src="/portfolio/deepvision-wildfire/siberian-forest-protection-service-wildfire-2.webp"
                  alt="Siberian Forest Protection Service wildfire detection - sample 2"
                  width={1920}
                  height={1080}
                  maxWidth="full"
                />
              </div>
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 2.</span> Wildfire
                detection in Siberian forest region demonstrating the
                system&apos;s real-time smoke identification capabilities.
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
              The wildfire detection system demonstrated robust performance
              across multiple evaluation metrics and test scenarios. The
              combination of advanced object detection, custom pre-processing,
              and temporal classification yielded highly reliable and accurate
              results.
            </p>

            <ul className="space-y-2 text-gray-300 mb-4">
              <li>
                <strong className="text-gray-200">
                  Classification Accuracy:
                </strong>{" "}
                <span className="font-semibold">95.6%</span>, reflecting the
                system&apos;s overall correctness in identifying both fire and
                non-fire instances.
              </li>
              <li>
                <strong className="text-gray-200">F1-score:</strong>{" "}
                <span className="font-semibold">94%</span>, indicating a strong
                balance between precision and recall – critical for minimizing
                missed fires and false alarms.
              </li>
              <li>
                <strong className="text-gray-200">Recall:</strong>{" "}
                <span className="font-semibold">97.2%</span>, showing the
                system&apos;s excellent capability to detect almost all actual
                fire events.
              </li>
              <li>
                <strong className="text-gray-200">Precision:</strong>{" "}
                <span className="font-semibold">93%</span>, indicating that the
                majority of alerts corresponded to real fire-related events.
              </li>
              <li>
                <strong className="text-gray-200">
                  Localization Accuracy (IoU):
                </strong>{" "}
                <span className="font-semibold">62%</span>, measuring how well
                the system identified the precise region of the fire.
              </li>
              <li>
                <strong className="text-gray-200">Processing Speed:</strong>{" "}
                Approximately <span className="font-semibold">9 FPS</span> on a
                GeForce RTX 2080 Ti GPU, ensuring quasi-real-time deployment.
              </li>
            </ul>

            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              Notably, the application of dynamic feature extraction and
              temporal sequence modeling contributed to significant performance
              improvements:
            </p>

            <ul className="space-y-2 text-gray-300 mb-4 text-justify">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  The clustering algorithm for prediction aggregation improved
                  localization accuracy by <strong>6%</strong>.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  The hybrid CNN-RNN classifier increased the F1-score by{" "}
                  <strong>9%</strong> over traditional static image classifiers.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  Dynamic smoke pattern analysis via frame differencing led to a{" "}
                  <strong>31% boost in recall</strong> and{" "}
                  <strong>21% gain in precision</strong>.
                </span>
              </li>
            </ul>

            <p className="text-gray-300 leading-relaxed text-justify">
              These results place the system ahead of comparable wildfire
              detection technologies such as{" "}
              <a
                href="https://fuego.ssl.berkeley.edu/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Fuego
              </a>{" "}
              and{" "}
              <a
                href="https://arxiv.org/abs/2112.08598"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                SmokeyNet
              </a>
              , both in terms of detection accuracy and robustness under
              real-world video conditions.
            </p>
          </section>

          {/* Conclusion */}
          <section>
            <h2 className="text-xl font-semibold text-light mb-4 flex items-center gap-3">
              <span className="w-1 h-6 bg-accent rounded-full"></span>
              Conclusion
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              This project showcases a scalable and robust wildfire detection
              system, outperforming current methods in both accuracy and speed.
              Its modular pipeline – spanning image pre-processing, real-time
              object detection, and temporal classification – can be adapted to
              various dynamic-object detection tasks, from medical diagnostics
              to robotics.
            </p>
            <p className="text-gray-300 leading-relaxed text-justify">
              Future improvements could include edge deployment, drone
              integration, and domain adaptation for wildfire detection in
              different geographies and climates. The project has been
              implemented in commercial applications and presented at top
              academic conferences.
            </p>
          </section>
        </div>
      </div>
      {/* Bottom spacing before footer */}
      <div className="pb-24" />
    </main>
  );
}
