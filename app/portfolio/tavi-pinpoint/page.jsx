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
  title: "TAVI PinPoint",
  description:
    "Real-time landmark tracking for safer valve implantation during TAVI procedures using multi-task deep learning with 97% accuracy.",
  openGraph: {
    title: "TAVI PinPoint | Viacheslav Danilov",
    description:
      "Real-time landmark tracking for safer valve implantation during TAVI procedures using multi-task deep learning with 97% accuracy.",
    images: [
      {
        url: "https://vdanilov.dev/portfolio/tavi-pinpoint/opengraph-image.jpg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TAVI PinPoint | Viacheslav Danilov",
    description:
      "Real-time landmark tracking for safer valve implantation during TAVI procedures using multi-task deep learning with 97% accuracy.",
    images: [
      "https://vdanilov.dev/portfolio/tavi-pinpoint/opengraph-image.jpg",
    ],
  },
};

const HIGHLIGHTS_ITEMS = [
  {
    icon: faSearch,
    label: "Situation",
    text: "The Kemerovo Cardiology Center needed better intraoperative guidance for TAVI procedures to reduce valve misplacement risks.",
  },
  {
    icon: faBullseye,
    label: "Task",
    text: "Develop an AI-driven visual assistance system for real-time surgical support during transcatheter aortic valve implantation.",
  },
  {
    icon: faCogs,
    label: "Action",
    text: "Applied multi-task deep learning to detect and localize 11 anatomical keypoints from aortography data using ResNet and MobileNet V2.",
  },
  {
    icon: faChartLine,
    label: "Result",
    text: "Delivered 97% accuracy and ~90 FPS speed, improving precision and enabling safer, future-ready valve implantation.",
  },
];

const TEAM_MEMBERS = [
  {
    name: "Viacheslav Danilov",
    role: "Senior Data Scientist",
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
    name: "Anton Kutikhin",
    role: "Research Scientist",
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
  {
    name: "Vladimir Ganyukov",
    role: "Cardiothoracic Surgeon",
    organization: "Kemerovo Cardiology Center",
    location: "Kemerovo · Russia 🇷🇺",
    photo: "/people/vladimir-ganyukov.webp",
    links: {
      globe:
        "https://kemcardio.ru/nauka/nauchnye-podrazdeleniya/otdel-hirurgii-serdca-i-sosudov/",
      linkedin: "https://www.linkedin.com/in/vladimir-ganyukov-6b656b64",
      researchgate: "https://www.researchgate.net/profile/Vladimir-Ganyukov",
      orcid: "https://orcid.org/0000-0002-9704-7678",
      email: "ganyukov@mail.ru",
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
      email: "popow.yu.a@gmail.com",
    },
  },
];

const RESOURCES = [
  {
    label: "Journal Paper",
    url: "https://doi.org/10.3389/fcvm.2021.697737",
  },
  {
    label: "Interactive Report",
    url: "https://wandb.ai/viacheslav_danilov/tavr_keypoint_tracking/reports/Keypoint-tracking-and-classification--Vmlldzo3ODIyNQ",
  },
  { label: "Dataset", url: "https://doi.org/10.17632/pgynfy766g.2" },
  {
    label: "News (RSF)",
    url: "https://www.rscf.ru/news/medicine/neyroset-nauchilas-pomogat-v-ustanovke-iskusstvennogo-klapana-v-serdtse/",
  },
  {
    label: "News (Scientific Russia)",
    url: "https://scientificrussia.ru/articles/nejroset-predskazet-lucsee-mesto-dla-ustanovki-iskusstvennogo-klapana-v-serdce",
  },
  {
    label: "News (TASS)",
    url: "https://nauka.tass.ru/nauka/12048261",
  },
];

const TECH_STACK = [
  "TensorFlow",
  "Python",
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
            TAVI PinPoint
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Real-time landmark tracking for safer valve implantation during TAVI
            procedures
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
                This project addresses one of the most critical challenges in
                modern cardiovascular intervention: accurately positioning the
                valve during{" "}
                <a
                  href="https://www.mayoclinic.org/tests-procedures/transcatheter-aortic-valve-replacement/about/pac-20384698"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  Transcatheter Aortic Valve Implantation
                </a>{" "}
                (TAVI). Traditional imaging methods offer limited intraoperative
                guidance, risking misplacement and complications.
              </p>
              <p className="text-gray-300 leading-relaxed text-justify">
                To overcome this, we developed a deep learning-based visual
                assistance system using{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Multi-task_learning"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  multi-task learning
                </a>{" "}
                (MTL) to simultaneously detect and localize 11 anatomical
                keypoints on both the aortic valve and the delivery system. This
                system was trained on real intraoperative aortography data and
                evaluated across several neural network architectures. The most
                efficient models – ResNet and MobileNet V2 – achieved impressive
                accuracy and responsiveness, demonstrating real-time prediction
                capabilities that could enhance clinical outcomes and serve as
                the basis for future robotic surgical systems.
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
              The solution was developed and validated using real-world surgical
              imaging data, making its outputs directly relevant for clinical
              applications. The dataset included:
            </p>
            <ul className="space-y-2 text-gray-300 mb-6 text-justify">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Source:</strong> Original
                  aortography imaging series from 14 patients undergoing TAVI
                  procedures (2015 – 2018) at the Kemerovo Cardiology Center
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Images:</strong> 3,730
                  grayscale images (1,000×1,000 pixels), labeled with up to 11
                  anatomical and device-related keypoints
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Annotation:</strong> Image
                  annotation was conducted by expert cardiologists using the{" "}
                  <a
                    href="https://supervisely.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    Supervisely
                  </a>{" "}
                  platform
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Split:</strong> Training
                  (80%, 2,984 images) and validation (20%, 746 images) sets
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Coverage:</strong> Three
                  critical surgical stages – delivery system positioning,
                  prosthesis deployment initiation, and partial valve release
                </span>
              </li>
            </ul>

            <p className="text-gray-300 leading-relaxed mb-6 text-justify">
              These images captured three critical surgical stages providing a
              diverse and representative training ground for keypoint detection
              (
              <a href="#figure-1" className="text-accent hover:underline">
                Figure 1
              </a>
              ).
            </p>

            {/* Figure 1: Visual Workflow */}
            <figure id="figure-1" className="scroll-mt-24">
              <ImageLightbox
                src="/portfolio/tavi-pinpoint/visual-workflow-for-intraoperative-labeling.webp"
                alt="Visual workflow for intraoperative landmark labeling"
                width={2520}
                height={1600}
                maxWidth="2xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 1.</span> Visual workflow
                for intraoperative landmark labeling showing the annotation
                process and keypoint identification across surgical stages.
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
              The project implemented a multi-task learning architecture to
              simultaneously classify the presence and regress the coordinates
              of keypoints in angiographic images (
              <a href="#figure-2" className="text-accent hover:underline">
                Figure 2
              </a>
              ). This approach offered more efficient representation learning
              compared to single-task methods.
            </p>

            <ul className="space-y-4 text-gray-300 mb-6 text-justify">
              <li>
                <strong className="text-gray-200">Architecture:</strong> A
                shared feature extractor that reduced image dimensionality while
                preserving semantic detail, combined with a classifier for
                multi-label keypoint detection and a regressor for (x, y)
                coordinate prediction.
              </li>
              <li>
                <strong className="text-gray-200">Backbones Tested:</strong>{" "}
                Five architectures were evaluated: MobileNet V2, ResNet V2,
                Inception V3, Inception ResNet V2, and EfficientNet B5.
              </li>
              <li>
                <strong className="text-gray-200">Training Strategy:</strong>{" "}
                Fine-tuning and early stopping were employed to boost
                generalization and prevent overfitting.
              </li>
              <li>
                <strong className="text-gray-200">Loss Functions:</strong>{" "}
                Log-Cosh loss for regression and binary cross-entropy for
                classification, balanced via weighted sum.
              </li>
            </ul>

            {/* Figure 2: Multi-task Learning Workflow */}
            <figure id="figure-2" className="scroll-mt-24">
              <ImageLightbox
                src="/portfolio/tavi-pinpoint/multi-task-learning-workflow.webp"
                alt="Multi-task learning workflow"
                width={2400}
                height={1200}
                maxWidth="2xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 2.</span> Multi-task
                learning workflow showing the shared feature extractor with
                parallel classification and regression heads.
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
              The system achieved real-time performance with high accuracy in
              both keypoint detection and localization. Key outcomes included:
            </p>

            <ul className="space-y-2 text-gray-300 mb-4">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">
                    ResNet V2 (fine-tuned):
                  </strong>{" "}
                  Reached <span className="font-semibold">97%</span>{" "}
                  classification accuracy and a mean absolute percentage error
                  (MAPE) of <span className="font-semibold">4.7%</span>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">
                    MobileNet V2 (fine-tuned):
                  </strong>{" "}
                  Achieved <span className="font-semibold">96%</span> accuracy
                  and a <span className="font-semibold">5.6%</span> MAPE, while
                  maintaining the highest prediction speed (~
                  <span className="font-semibold">90 FPS</span>)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Model Convergence:</strong>{" "}
                  Rapid convergence with early stopping applied around 22–76
                  epochs depending on architecture
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Performance Gain:</strong>{" "}
                  Fine-tuned models outperformed their non-tuned counterparts
                  across all metrics (F1-score, MAE, RMSE)
                </span>
              </li>
            </ul>

            <p className="text-gray-300 leading-relaxed mb-6 text-justify">
              The analysis also highlighted challenges from class imbalance,
              particularly with underrepresented keypoints (e.g., aortic annulus
              landmarks), which the model handled well despite data limitations.
              Training convergence for selected architectures is shown in{" "}
              <a href="#figure-3" className="text-accent hover:underline">
                Figure 3
              </a>
              , and prediction quality comparison in{" "}
              <a href="#figure-4" className="text-accent hover:underline">
                Figure 4
              </a>
              .
            </p>

            {/* Figure 3: Training Convergence Videos */}
            <figure id="figure-3" className="mb-6 scroll-mt-24">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-lg overflow-hidden">
                  <video
                    src="/portfolio/tavi-pinpoint/convergence-mobilenet.mp4"
                    autoPlay
                    loop
                    muted
                    controls
                    playsInline
                    className="w-full h-auto"
                  />
                  <p className="text-center text-xs text-gray-500 mt-2">
                    MobileNet V2
                  </p>
                </div>
                <div className="rounded-lg overflow-hidden">
                  <video
                    src="/portfolio/tavi-pinpoint/convergence-resnet.mp4"
                    autoPlay
                    loop
                    muted
                    controls
                    playsInline
                    className="w-full h-auto"
                  />
                  <p className="text-center text-xs text-gray-500 mt-2">
                    ResNet V2
                  </p>
                </div>
                <div className="rounded-lg overflow-hidden">
                  <video
                    src="/portfolio/tavi-pinpoint/convergence-inception.mp4"
                    autoPlay
                    loop
                    muted
                    controls
                    playsInline
                    className="w-full h-auto"
                  />
                  <p className="text-center text-xs text-gray-500 mt-2">
                    Inception V3
                  </p>
                </div>
              </div>
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 3.</span> Training
                convergence of selected neural network architectures showing
                prediction quality evolution during training.
              </figcaption>
            </figure>

            {/* Figure 4: Prediction Beginning vs End */}
            <figure id="figure-4" className="scroll-mt-24">
              <ImageLightbox
                src="/portfolio/tavi-pinpoint/prediction-beginning-vs-end.webp"
                alt="Prediction quality at the beginning vs end of training"
                width={2400}
                height={1200}
                maxWidth="2xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 4.</span> Comparison of
                prediction quality at the beginning versus end of training,
                demonstrating significant improvement in keypoint localization.
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
              This project successfully demonstrates a real-time AI-based system
              for intraoperative landmark tracking during TAVI, offering a
              significant step toward safer, more precise cardiovascular
              surgery. The system&apos;s main contributions are:
            </p>
            <ul className="space-y-2 text-gray-300 mb-4 text-justify">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  Accurate detection and localization of 11 keypoints critical
                  to valve deployment
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  Support for intraoperative guidance without reliance on
                  preoperative CT models
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  Scalability toward robotic-assisted interventions by supplying
                  continuous, structured input for automated systems
                </span>
              </li>
            </ul>
            <p className="text-gray-300 leading-relaxed text-justify">
              Future directions include expanding the dataset to cover more
              valve models, optimizing for class imbalance, and integrating with
              surgical robotics for semi-automated procedures.
            </p>
          </section>
        </div>
      </div>
      {/* Bottom spacing before footer */}
      <div className="pb-24" />
    </main>
  );
}
