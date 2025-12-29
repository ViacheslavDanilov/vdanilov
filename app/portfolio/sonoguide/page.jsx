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
  title: "SonoGuide – Viacheslav Danilov",
  description:
    "Deep learning solution for surgical tool segmentation in 3D ultrasound, achieving 93.6% Dice score for real-time catheter localization during minimally invasive cardiac surgery.",
};

const HIGHLIGHTS_ITEMS = [
  {
    icon: faSearch,
    label: "Situation",
    text: "Accurate localization of catheters in 3D ultrasound during minimally invasive surgery was hindered by speckle noise, low resolution, and complex instrument geometry.",
  },
  {
    icon: faBullseye,
    label: "Task",
    text: "Develop a deep learning solution (V-net) to segment surgical tools in noisy ultrasound volumes for real-time surgical navigation.",
  },
  {
    icon: faCogs,
    label: "Action",
    text: "Designed a fully 3D neural network with dense skip-connections, dynamic training strategy, and test-time augmentation to boost segmentation accuracy and robustness.",
  },
  {
    icon: faChartLine,
    label: "Result",
    text: "Achieved 93.6% Dice score – 10% higher than U-net – and enabled precise, automated catheter detection in clinical ultrasound workflows.",
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
    url: "https://earchive.tpu.ru/handle/11683/61925?locale=en",
  },
  {
    label: "Journal Article",
    url: "https://doi.org/10.1016/j.compmedimag.2023.102188",
  },
];

const TECH_STACK = ["TensorFlow", "Keras", "Python", "scikit-learn", "OpenCV"];

function TeamMemberCard({ member }) {
  const iconMap = {
    linkedin: faLinkedin,
    github: faGithub,
    researchgate: faResearchgate,
    google: faGoogleScholar,
    globe: faGlobe,
    orcid: faOrcid,
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
      <div className="flex flex-col items-center text-center h-full">
        <div className="relative w-24 h-24 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-accent/20 shadow-lg bg-dark mb-4">
          <Image
            src={member.photo}
            alt={member.name}
            fill
            sizes="(max-width: 768px) 80px, 96px"
            className="object-cover"
          />
        </div>
        <h4 className="text-base font-bold text-light mb-1.5">{member.name}</h4>
        <p className="text-sm font-medium text-accent mb-2">{member.role}</p>
        <p className="text-sm text-gray-300 mb-2">{member.organization}</p>
        <p className="text-sm text-gray-500 mb-4">{member.location}</p>
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
            SonoGuide
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Deep segmentation for guiding surgical tools in 3D ultrasound
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
              {HIGHLIGHTS_ITEMS.map((item) => (
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
                Minimally invasive cardiac procedures demand real-time,
                high-fidelity imaging of surgical tools like catheters. However,
                3D{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Echocardiography"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  echocardiography
                </a>{" "}
                – despite being a cost-effective modality – suffers from speckle
                noise and low resolution, making device localization
                challenging.
              </p>
              <p className="text-gray-300 leading-relaxed text-justify">
                This project addressed this limitation by designing a custom
                deep learning solution based on a modified U-net, termed V-net,
                tailored for medical image segmentation under noisy conditions.
                The proposed V-net introduces additional dense skip-connections
                within both encoder and decoder paths to combat gradient
                vanishing and overfitting.
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
              This study used a specialized dataset consisting of 75
              three-dimensional grayscale ultrasound volumes collected during
              minimally invasive cardiac procedures on three Yorkshire pigs. The
              imaging was performed at Boston Children&apos;s Hospital using a
              Philips iE33 ultrasound system.
            </p>

            <ul className="space-y-2 text-gray-300 mb-6 text-justify">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Resolution:</strong>{" "}
                  176×176×208 voxels per volume
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Challenges:</strong> Speckle
                  noise and low contrast posing significant segmentation
                  difficulties
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Augmentation:</strong>{" "}
                  Synthetic data generation using kinematics of flexible robots
                </span>
              </li>
            </ul>

            <p className="text-gray-300 leading-relaxed mb-6 text-justify">
              The catheter used in this study is shown in{" "}
              <a href="#figure-1" className="text-accent hover:underline">
                Figure 1
              </a>
              , while{" "}
              <a href="#figure-2" className="text-accent hover:underline">
                Figure 2
              </a>{" "}
              illustrates the challenging visibility of catheters in raw
              ultrasound data.
            </p>

            {/* Figure 1: Catheter */}
            <figure id="figure-1" className="mb-8 scroll-mt-24">
              <ImageLightbox
                src="/portfolio/sonoguide/catheter-and-pigtail.webp"
                alt="Catheter and Pigtail"
                width={1200}
                height={600}
                maxWidth="2xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 1.</span> The catheter
                with pigtail tip used during minimally invasive cardiac
                procedures.
              </figcaption>
            </figure>

            {/* Figure 2: Source Data */}
            <figure id="figure-2" className="scroll-mt-24">
              <ImageLightbox
                src="/portfolio/sonoguide/example-of-catheter-source-data.webp"
                alt="Catheter Source Data"
                width={2000}
                height={800}
                maxWidth="3xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 2.</span> Example of
                catheter visibility in raw 3D ultrasound data across multiple
                planes (highlighted in green circles and ellipses).
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
              To address the challenges of catheter segmentation in noisy 3D
              ultrasound data, we developed V-net, a fully volumetric
              convolutional neural network based on the U-net architecture,
              enhanced for depth, gradient stability, and feature reuse.
            </p>

            <ul className="space-y-4 text-gray-300 mb-6 text-justify">
              <li>
                <strong className="text-gray-200">Architecture:</strong> The
                V-net employs a symmetric encoder-decoder structure with dense
                skip-connections, dilated convolutions, instance normalization,
                ELU activations, and dropout.
              </li>
              <li>
                <strong className="text-gray-200">Training Strategy:</strong>{" "}
                Cyclical learning rate schedule and variable batch size strategy
                based on the Fibonacci sequence.
              </li>
              <li>
                <strong className="text-gray-200">
                  Hyperparameter Tuning:
                </strong>{" "}
                T-test-based selection method reducing the search space from
                millions to a few hundred combinations.
              </li>
              <li>
                <strong className="text-gray-200">Inference:</strong> Test-time
                augmentation (TTA) to enhance segmentation stability.
              </li>
            </ul>

            <p className="text-gray-300 leading-relaxed mb-6 text-justify">
              The full V-net architecture is shown in{" "}
              <a href="#figure-3" className="text-accent hover:underline">
                Figure 3
              </a>
              , and the dense feature transfer mechanism is illustrated in{" "}
              <a href="#figure-4" className="text-accent hover:underline">
                Figure 4
              </a>
              .
            </p>

            {/* Figure 3: V-net Architecture */}
            <figure id="figure-3" className="mb-8 scroll-mt-24">
              <ImageLightbox
                src="/portfolio/sonoguide/v-net-architecture.webp"
                alt="V-net Architecture"
                width={2000}
                height={1000}
                maxWidth="2xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 3.</span> Full V-net
                architecture highlighting the layered structure and rich network
                of skip-connections.
              </figcaption>
            </figure>

            {/* Figure 4: Feature Transfer (GIF) */}
            <figure id="figure-4" className="scroll-mt-24">
              <ImageLightbox
                src="/portfolio/sonoguide/v-net-feature-transfer.gif"
                alt="V-net Feature Transfer"
                width={1000}
                height={600}
                maxWidth="2xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 4.</span> Dense feature
                transfer during encoding and decoding, allowing early-layer
                features to influence deeper representations.
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
              The V-net architecture achieved high spatial precision in
              localizing catheters despite strong speckle noise and anatomical
              occlusion:
            </p>

            <ul className="space-y-2 text-gray-300 mb-4">
              <li>
                <strong className="text-gray-200">V-net (TTA):</strong>{" "}
                <span className="font-semibold text-light">
                  93.6 ± 2.4% DSC
                </span>
              </li>
              <li>
                <strong className="text-gray-200">Standard U-net:</strong> 80.5
                ± 5.8% DSC
              </li>
              <li>
                <strong className="text-gray-200">SegNet / FCN:</strong> &lt;25%
                DSC on average
              </li>
            </ul>

            <p className="text-gray-300 leading-relaxed mb-6 text-justify">
              Segmentation accuracy on synthetic and real samples is shown in{" "}
              <a href="#figure-5" className="text-accent hover:underline">
                Figure 5
              </a>{" "}
              and{" "}
              <a href="#figure-6" className="text-accent hover:underline">
                Figure 6
              </a>
              , and the comparison with other networks is presented in{" "}
              <a href="#figure-7" className="text-accent hover:underline">
                Figure 7
              </a>
              .
            </p>

            {/* Figure 5: Synthetic Sample */}
            <figure id="figure-5" className="mb-8 scroll-mt-24">
              <ImageLightbox
                src="/portfolio/sonoguide/segmentation-of-synthetic-sample.webp"
                alt="Segmentation of Synthetic Sample"
                width={1800}
                height={900}
                maxWidth="2xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 5.</span> Segmentation
                results on a synthetic sample showing network prediction (white)
                vs ground truth (red).
              </figcaption>
            </figure>

            {/* Figure 6: Real Sample */}
            <figure id="figure-6" className="mb-8 scroll-mt-24">
              <ImageLightbox
                src="/portfolio/sonoguide/segmentation-of-real-sample.webp"
                alt="Segmentation of Real Sample"
                width={1800}
                height={900}
                maxWidth="2xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 6.</span> Segmentation
                results on a real ultrasound sample across axial, sagittal, and
                coronal planes.
              </figcaption>
            </figure>

            {/* Figure 7: Network Comparison */}
            <figure id="figure-7" className="mb-8 scroll-mt-24">
              <ImageLightbox
                src="/portfolio/sonoguide/comparison–with-other-networks.webp"
                alt="Comparison with Other Networks"
                width={1200}
                height={800}
                maxWidth="2xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 7.</span> Performance
                comparison of V-net against FCN, SegNet, Deep Medic, and U-net
                variants.
              </figcaption>
            </figure>

            <p className="text-gray-300 leading-relaxed mb-6 text-justify">
              The videos below demonstrate 3D volumetric segmentation in static
              and dynamic series:
            </p>

            {/* Video Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Video 1: Static 3D */}
              <figure className="scroll-mt-24">
                <video
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full rounded-lg border border-white/10"
                >
                  <source
                    src="/portfolio/sonoguide/segmentation-of-a-static-3D-series.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
                <figcaption className="text-center text-sm text-gray-400 mt-2">
                  Segmentation of a static 3D series
                </figcaption>
              </figure>

              {/* Video 2: Dynamic 3D */}
              <figure className="scroll-mt-24">
                <video
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full rounded-lg border border-white/10"
                >
                  <source
                    src="/portfolio/sonoguide/segmentation-of-a-dynamic-3D-series.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
                <figcaption className="text-center text-sm text-gray-400 mt-2">
                  Segmentation of a dynamic 3D series
                </figcaption>
              </figure>
            </div>
          </section>

          {/* Conclusion */}
          <section>
            <h2 className="text-xl font-semibold text-light mb-4 flex items-center gap-3">
              <span className="w-1 h-6 bg-accent rounded-full"></span>
              Conclusion
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              This project showcases a robust, deployable solution for
              segmenting surgical instruments in noisy 3D ultrasound,
              significantly enhancing intraoperative navigation. The V-net
              model&apos;s innovations in architecture, training strategy, and
              data synthesis demonstrate both academic rigor and practical
              value.
            </p>
            <p className="text-gray-300 leading-relaxed text-justify">
              Future work may include adapting the model for other
              low-resolution modalities, extending real-time capabilities, and
              integrating AR-based visualization during surgery. The methods are
              also applicable to oncology, neurosurgery, and vascular
              interventions.
            </p>
          </section>
        </div>
      </div>
      {/* Bottom spacing before footer */}
      <div className="pb-24" />
    </main>
  );
}
