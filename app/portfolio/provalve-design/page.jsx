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
} from "@fortawesome/free-brands-svg-icons";
import ImageLightbox from "@/components/ImageLightbox";
import { GlowCard } from "@/components/ui/glow-card";

export const metadata = {
  title: "ProValve Design",
  description:
    "ML-driven generative design framework for prosthetic heart valves using optimization algorithms, achieving 95% design efficacy.",
  openGraph: {
    title: "ProValve Design | Viacheslav Danilov",
    description:
      "ML-driven generative design framework for prosthetic heart valves using optimization algorithms, achieving 95% design efficacy.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ProValve Design | Viacheslav Danilov",
    description:
      "ML-driven generative design framework for prosthetic heart valves using optimization algorithms, achieving 95% design efficacy.",
  },
};

const HIGHLIGHTS_ITEMS = [
  {
    icon: faSearch,
    label: "Situation",
    text: "The Kemerovo Cardiology Center needed a faster, data-driven method to prototype prosthetic heart valves, as traditional CAD/FEM approaches were time-intensive.",
  },
  {
    icon: faBullseye,
    label: "Task",
    text: "Build an ML-optimization pipeline to streamline valve design and explore a vast design space efficiently.",
  },
  {
    icon: faCogs,
    label: "Action",
    text: "Trained ML models on 11,500+ FEM-evaluated geometries and integrated six optimization algorithms to identify high-performance designs.",
  },
  {
    icon: faChartLine,
    label: "Result",
    text: "Achieved 95% design efficacy, >96% model accuracy (R²), and significantly reduced prototyping time for clinically viable valves.",
  },
];

const TEAM_MEMBERS = [
  {
    name: "Viacheslav Danilov",
    role: "Lead Data Scientist",
    organization: "Politecnico di Milano",
    location: "Milan · Italy 🇮🇹",
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
    name: "Farid Melgani",
    role: "Professor",
    organization: "University of Trento",
    location: "Trento · Italy 🇮🇹",
    photo: "/people/farid-melgani.webp",
    links: {
      globe: "https://webapps.unitn.it/du/en/Persona/PER0004197/Didattica",
      linkedin: "https://www.linkedin.com/in/farid-melgani-1a227712",
      researchgate: "https://www.researchgate.net/profile/Farid-Melgani",
      google: "https://scholar.google.com/citations?user=j5MVrE0AAAAJ&hl=en",
      email: "farid.melgani@unitn.it",
    },
  },
  {
    name: "Pavel Onishchenko",
    role: "Research Scientist",
    organization: "Kemerovo Cardiology Center",
    location: "Kemerovo · Russia 🇷🇺",
    photo: "/people/pavel-onishchenko.webp",
    links: {
      globe: "https://loop.frontiersin.org/people/2420713/overview",
      researchgate: "https://www.researchgate.net/profile/Pavel-Onishchenko",
      email: "onisps@kemcardio.ru",
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
    url: "https://doi.org/10.3389/fbioe.2023.1238130",
  },
  {
    label: "GitHub",
    url: "https://github.com/ViacheslavDanilov/generative_design",
  },
  { label: "Models", url: "https://doi.org/10.5281/zenodo.10865907" },
  {
    label: "Dataset",
    url: "https://github.com/ViacheslavDanilov/generative_design/blob/main/dataset/data.xlsx",
  },
];

const TECH_STACK = [
  "AutoML",
  "Python",
  "Optuna",
  "scikit-learn",
  "SHAP",
  "Abaqus",
];

function TeamMemberCard({ member }) {
  const iconMap = {
    linkedin: faLinkedin,
    github: faGithub,
    researchgate: faResearchgate,
    google: faGoogleScholar,
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
            ProValve Design
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            ML-driven generative design framework for prosthetic heart valves
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
                Valvular heart disease affects millions globally, and{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Artificial_heart_valve"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  prosthetic heart valves
                </a>{" "}
                (PHVs) are a primary intervention. Traditional methods for PHV
                design, such as{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Computer-aided_design"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  computer-aided design
                </a>{" "}
                (CAD) and{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Finite_element_method"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  finite element analysis
                </a>{" "}
                (FEM), are time-intensive and limited in exploring large design
                spaces.
              </p>
              <p className="text-gray-300 leading-relaxed text-justify">
                This project introduces a generative design framework that
                integrates machine learning models and optimization algorithms
                to accelerate and improve PHV design. The framework achieves 95%
                design efficacy, significantly reducing error rates and enabling
                the generation of new valve geometries tailored to clinical and
                manufacturing constraints.
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
              The dataset comprised 11,565 prosthetic heart valve designs, each
              generated using a parametric model with six critical parameters:
            </p>
            <ul className="space-y-2 text-gray-300 mb-6 text-justify">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Parameters:</strong> Height
                  (HGT), diameter (DIA), leaflet thickness (THK), curvature
                  (CVT), elevation angle (ANG), and material stiffness (ELM).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Simulations:</strong> FEM
                  simulations were performed for each design to evaluate
                  mechanical performance under physiological conditions.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  <strong className="text-gray-200">Output Metrics:</strong>{" "}
                  Leaflet opening area (LMN) and peak stress (STS), critical
                  indicators of PHV functionality and durability.
                </span>
              </li>
            </ul>

            <p className="text-gray-300 leading-relaxed mb-6 text-justify">
              The valve structure and parametric model are illustrated in{" "}
              <a href="#figure-1" className="text-accent hover:underline">
                Figure 1
              </a>
              .
            </p>

            {/* Figure 1: Valve Structure */}
            <figure id="figure-1" className="scroll-mt-24">
              <ImageLightbox
                src="/portfolio/provalve-design/valve-structure.webp"
                alt="Prosthetic Heart Valve Structure"
                width={2400}
                height={1200}
                maxWidth="xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 1.</span> Prosthetic
                heart valve structure showing the parametric model with six
                critical design parameters.
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
              The methodology integrates machine learning and optimization
              algorithms to enable efficient exploration of the design space:
            </p>

            <ul className="space-y-4 text-gray-300 mb-6 text-justify">
              <li>
                <strong className="text-gray-200">
                  Parametric Modeling and Simulation:
                </strong>{" "}
                PHV geometries were generated algorithmically using a
                MATLAB-based parametric model, then analyzed using FEM to
                simulate mechanical performance under physiological conditions.
              </li>
              <li>
                <strong className="text-gray-200">
                  Machine Learning Model Training:
                </strong>{" "}
                Using the dataset of 11,565 FEM-evaluated designs, we trained
                regression models including Random Forest, LightGBM, and
                ensemble methods. Models predicted LMN and STS with R² &gt; 96%.
              </li>
              <li>
                <strong className="text-gray-200">
                  Optimization Algorithms:
                </strong>{" "}
                Six state-of-the-art algorithms were deployed: Random Search
                (RS), Tree-structured Parzen Estimator (TPE), CMA-ES (CMA),
                NSGA-II, MOTPE, and Quasi-Monte Carlo (QMC).
              </li>
              <li>
                <strong className="text-gray-200">Hybrid Approach:</strong> By
                combining ML predictions with optimization algorithms, we
                accelerated the search for optimal designs while reducing
                reliance on computationally expensive FEM simulations.
              </li>
            </ul>

            <p className="text-gray-300 leading-relaxed mb-6 text-justify">
              The complete generative design workflow integrating parametric
              modeling, ML predictions, and optimization is shown in{" "}
              <a href="#figure-2" className="text-accent hover:underline">
                Figure 2
              </a>
              .
            </p>

            {/* Figure 2: Generative Design Workflow */}
            <figure id="figure-2" className="scroll-mt-24">
              <ImageLightbox
                src="/portfolio/provalve-design/generative-design-workflow.webp"
                alt="Generative Design Workflow"
                width={2400}
                height={1200}
                maxWidth="3xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 2.</span> Generative
                design workflow showing the integration of parametric modeling,
                machine learning, and optimization algorithms.
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
              The proposed framework demonstrated significant improvements in
              PHV design efficiency:
            </p>

            <ul className="space-y-2 text-gray-300 mb-4">
              <li>
                <strong className="text-gray-200">Model Accuracy:</strong>{" "}
                Trained ML models achieved R² values exceeding{" "}
                <span className="font-semibold text-light">96%</span> with MAPE
                of 11.8% and 10.2% for opening area and peak stress.
              </li>
              <li>
                <strong className="text-gray-200">Design Efficacy:</strong> TPE
                and NSGA-II achieved efficacy scores exceeding{" "}
                <span className="font-semibold text-light">95%</span>,
                identifying superior designs in fewer iterations.
              </li>
              <li>
                <strong className="text-gray-200">Parameter Trends:</strong>{" "}
                Algorithms favored thinner leaflets and larger diameters,
                contributing to higher opening areas while maintaining
                acceptable stress levels.
              </li>
            </ul>

            <p className="text-gray-300 leading-relaxed mb-6 text-justify">
              Examples of optimized valve designs in the open state are shown in{" "}
              <a href="#figure-3" className="text-accent hover:underline">
                Figure 3
              </a>
              , showcasing improvements over the initial geometry.
            </p>

            {/* Figure 3: Generated Valves */}
            <figure id="figure-3" className="mb-8 scroll-mt-24">
              <ImageLightbox
                src="/portfolio/provalve-design/generated-valves.webp"
                alt="Optimized Valve Designs"
                width={2400}
                height={1600}
                maxWidth="xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 3.</span> Examples of
                optimized valve designs generated by different optimization
                algorithms, showing variations in opening area and stress
                distribution.
              </figcaption>
            </figure>

            <p className="text-gray-300 leading-relaxed mb-6 text-justify">
              The videos below demonstrate the valve opening behavior for
              designs generated by the following optimization algorithms:
            </p>

            {/* Video Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Video 1: Random Search */}
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
                    src="/portfolio/provalve-design/valve-opening-rs.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
                <figcaption className="text-center text-sm text-gray-400 mt-2">
                  Random Search (RS)
                </figcaption>
              </figure>

              {/* Video 2: Tree-structured Parzen Estimator */}
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
                    src="/portfolio/provalve-design/valve-opening-tpe.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
                <figcaption className="text-center text-sm text-gray-400 mt-2">
                  Tree-structured Parzen Estimator (TPE)
                </figcaption>
              </figure>

              {/* Video 3: CMA-ES */}
              {/* <figure className="scroll-mt-24">
                <video
                  controls
                  className="w-full rounded-lg border border-white/10"
                >
                  <source
                    src="/portfolio/provalve-design/valve-opening-cma.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
                <figcaption className="text-center text-sm text-gray-400 mt-2">
                  CMA-ES Algorithm (CMA)
                </figcaption>
              </figure> */}

              {/* Video 4: NSGA-II */}
              {/* <figure className="scroll-mt-24">
                <video
                  controls
                  className="w-full rounded-lg border border-white/10"
                >
                  <source
                    src="/portfolio/provalve-design/valve-opening-nsga.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
                <figcaption className="text-center text-sm text-gray-400 mt-2">
                  NSGA-II Algorithm (NSGA)
                </figcaption>
              </figure> */}

              {/* Video 5: MOTPE */}
              {/* <figure className="scroll-mt-24">
                <video
                  controls
                  className="w-full rounded-lg border border-white/10"
                >
                  <source
                    src="/portfolio/provalve-design/valve-opening-motpe.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
                <figcaption className="text-center text-sm text-gray-400 mt-2">
                  Multiobjective TPE (MOTPE)
                </figcaption>
              </figure> */}

              {/* Video 6: QMC */}
              {/* <figure className="scroll-mt-24">
                <video
                  controls
                  className="w-full rounded-lg border border-white/10"
                >
                  <source
                    src="/portfolio/provalve-design/valve-opening-qmc.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
                <figcaption className="text-center text-sm text-gray-400 mt-2">
                  Quasi-Monte Carlo (QMC)
                </figcaption>
              </figure> */}
            </div>
          </section>

          {/* Conclusion */}
          <section>
            <h2 className="text-xl font-semibold text-light mb-4 flex items-center gap-3">
              <span className="w-1 h-6 bg-accent rounded-full"></span>
              Conclusion
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4 text-justify">
              This generative design framework demonstrates the transformative
              potential of combining machine learning and optimization for
              medical device development. It enables faster, more efficient
              design iterations, significantly reducing the time and cost of
              prototyping.
            </p>
            <p className="text-gray-300 leading-relaxed text-justify">
              Future work will expand this approach to incorporate advanced
              material modeling and fluid-structure interactions, further
              refining prosthetic heart valve designs for improved patient
              outcomes.
            </p>
          </section>
        </div>
      </div>
      {/* Bottom spacing before footer */}
      <div className="pb-24" />
    </main>
  );
}
