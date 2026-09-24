import {
  faSearch,
  faBullseye,
  faCogs,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import AutoplayVideo from "@/components/AutoplayVideo";
import ImageLightbox from "@/components/ImageLightbox";
import { pageMetadata } from "@/lib/metadata";
import ProjectHeader from "@/components/project/ProjectHeader";
import Highlights from "@/components/project/Highlights";
import CoreTeam from "@/components/project/CoreTeam";
import Section from "@/components/project/Section";

export const metadata = pageMetadata({
  title: "ProValve Design",
  description:
    "ML-driven generative design framework for prosthetic heart valves using optimization algorithms, achieving 95% design efficacy.",
  path: "/portfolio/provalve-design/",
  image: {
    url: "/portfolio/previews/provalve-design.jpg",
    alt: "ProValve Design - Prosthetic heart valve design",
  },
});

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
      email: "ov.eugene@gmail.com",
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

export default function ProjectPage() {
  return (
    <div className="min-h-screen pt-24">
      <div className="w-full max-w-5xl mx-auto px-6 py-12 md:py-24">
        <ProjectHeader
          title="ProValve Design"
          subtitle="ML-driven generative design framework for prosthetic heart valves"
          banner={{
            image: "/portfolio/previews/provalve-design.jpg",
            alt: "ProValve Design - Biomechanical prosthetic heart valve simulation",
          }}
          client={{
            name: "Kemerovo Cardiology Center",
            url: "https://eng.kemcardio.ru/",
            location: "Kemerovo · Russia 🇷🇺",
          }}
          techStack={TECH_STACK}
          resources={RESOURCES}
        />

        {/* Content Sections */}
        <div className="space-y-16">
          <Highlights items={HIGHLIGHTS_ITEMS} />

          <CoreTeam members={TEAM_MEMBERS} />

          {/* Overview */}
          <Section title="Overview">
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
          </Section>

          {/* Data */}
          <Section title="Data">
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
                width={4040}
                height={3545}
                maxWidth="xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 1.</span> Prosthetic
                heart valve structure showing the parametric model with six
                critical design parameters.
              </figcaption>
            </figure>
          </Section>

          {/* Methods */}
          <Section title="Methods">
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
                width={3536}
                height={2096}
                maxWidth="3xl"
              />
              <figcaption className="text-center text-sm text-gray-400 mt-3">
                <span className="text-gray-300">Figure 2.</span> Generative
                design workflow showing the integration of parametric modeling,
                machine learning, and optimization algorithms.
              </figcaption>
            </figure>
          </Section>

          {/* Results */}
          <Section title="Results">
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
                width={3811}
                height={4518}
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
                <AutoplayVideo
                  aspectRatio="16 / 9"
                  controls
                  className="w-full rounded-lg border border-white/10"
                >
                  <source
                    src="/portfolio/provalve-design/valve-opening-rs.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </AutoplayVideo>
                <figcaption className="text-center text-sm text-gray-400 mt-2">
                  Random Search
                </figcaption>
              </figure>

              {/* Video 2: Tree-structured Parzen Estimator */}
              <figure className="scroll-mt-24">
                <AutoplayVideo
                  aspectRatio="16 / 9"
                  controls
                  className="w-full rounded-lg border border-white/10"
                >
                  <source
                    src="/portfolio/provalve-design/valve-opening-tpe.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </AutoplayVideo>
                <figcaption className="text-center text-sm text-gray-400 mt-2">
                  Tree-structured Parzen Estimator
                </figcaption>
              </figure>
            </div>
          </Section>

          {/* Conclusion */}
          <Section title="Conclusion">
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
          </Section>
        </div>
      </div>
      {/* Bottom spacing before footer */}
      <div className="pb-24" />
    </div>
  );
}
