"use client";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { GlowCard } from "@/components/ui/glow-card";

const PROJECTS = [
  {
    id: "deep-brainwatch",
    title: "Deep BrainWatch",
    client: "Vall d'Hebron Hospital",
    location: "Barcelona · Spain 🇪🇸",
    description:
      "A wavelet-based deep learning system that non-invasively estimates intracranial pressure from cerebral blood-flow signals, enabling accurate bedside ICP monitoring without surgical risk. Validated on 200+ hours of clinical data, the model achieves clinically actionable accuracy and demonstrates a scalable alternative to invasive neuro-monitoring.",
    stack: [
      "PyTorch",
      "Python",
      "fast.ai",
      "Gradio",
      "DVC",
      "Weights & Biases",
    ],
    link: "/portfolio/deep-brainwatch",
    image: "/portfolio/previews/deep-brainwatch.webp",
  },
  {
    id: "sales-pilot",
    title: "Sales Pilot",
    client: "Symfa",
    location: "Miami · United States 🇺🇸",
    description:
      "An end-to-end AI system that automates outbound lead generation by scoring jobs, contacts, and companies using hybrid heuristic–embedding models. It transforms slow manual sourcing into a scalable, data-driven workflow that dramatically cuts time-to-lead from days to minutes while boosting targeting accuracy and conversion potential.",
    stack: ["Python", "OpenAI API", "scikit-learn", "DVC", "CI/CD", "LLM"],
    link: "/portfolio/sales-pilot",
    image: "/portfolio/previews/sales-pilot.webp",
  },
  {
    id: "immune-profiler",
    title: "Immune Profiler",
    client: "Boehringer Ingelheim",
    location: "Ingelheim · Germany 🇩🇪",
    description:
      "A hybrid machine learning pipeline that classifies tumor immune phenotypes from whole-slide histopathology images using deep nucleus segmentation, feature engineering, and AutoML-based cell classification. Achieving an 89% weighted F1-score, it enables automated adenocarcinoma slide analysis, reducing manual workload and supporting more precise, personalized immunotherapy decisions.",
    stack: ["PyTorch", "HoVer-Net", "scikit-learn", "OpenSlide", "AutoML"],
    link: "/portfolio/immune-profiler",
    image: "/portfolio/previews/immune-profiler.webp",
  },
  {
    id: "hypervision-ablation",
    title: "HyperVision Ablation",
    client: "Institute for Image-Guided Surgery",
    location: "Strasbourg · France 🇫🇷",
    description:
      "A multi-stage machine learning pipeline that detects and segments laser-induced tissue ablation from hyperspectral imaging data using PCA/t-SNE reduction, Faster R-CNN detection, and Mean Shift clustering. The workflow enables automated assessment of thermal damage across organs, improving diagnostic accuracy and supporting research in laser-based cancer therapy.",
    stack: [
      "PyTorch",
      "MMDetection",
      "scikit-learn",
      "DVC",
      "OpenCV",
      "MLflow",
    ],
    link: "/portfolio/hypervision-ablation",
    image: "/portfolio/previews/hypervision-ablation.webp",
  },
];

const FeaturedProjects = ({
  enableSpotlight = true,
  enableBorderGlow = true,
  glowColor = "blue",
  spotlightSize = 300,
}) => {
  return (
    <section className="py-12 px-6 max-w-7xl mx-auto">
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-light mb-4">
          Featured Projects
        </h2>
        <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
          Delivering ML/AI systems and research tools that solve complex
          challenges in healthcare, life science, and enterprise
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {PROJECTS.map((project) => (
          <GlowCard
            key={project.id}
            glowColor={glowColor}
            customSize={true}
            className="group w-full h-full p-6"
            enableSpotlight={enableSpotlight}
            enableBorderGlow={enableBorderGlow}
            spotlightSize={spotlightSize}
          >
            <div className="flex flex-col h-full">
              {/* Mobile layout: centered image */}
              <div className="flex flex-col sm:hidden items-center mb-6">
                <a href={project.link} className="block mb-4">
                  <div className="relative w-48 h-48 rounded-lg overflow-hidden bg-neutral-800 border border-white/10">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="192px"
                      className="object-cover"
                    />
                  </div>
                </a>
                <a href={project.link} className="group/title inline-block">
                  <h3 className="project-title text-sm font-bold text-white group-hover/title:text-accent uppercase leading-tight tracking-wider mb-3 text-center transition-colors flex items-center justify-center gap-2">
                    {project.title}
                    <span
                      className="inline-block transition-transform duration-300 group-hover/title:translate-x-1"
                      style={{ width: "0.75rem", height: "0.75rem" }}
                    >
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="opacity-60"
                        style={{
                          width: "0.75rem",
                          height: "0.75rem",
                          display: "block",
                        }}
                      />
                    </span>
                  </h3>
                </a>
                <div className="text-sm font-light text-white uppercase tracking-wide text-center mb-2">
                  {project.client}
                </div>
                <div className="text-sm text-neutral-500 mt-1 text-center">
                  {project.location}
                </div>
              </div>

              {/* Desktop/Tablet layout: horizontal */}
              <div className="hidden sm:flex flex-row gap-6 mb-4">
                <a href={project.link} className="flex-shrink-0">
                  <div className="relative w-40 h-40 rounded-lg overflow-hidden bg-neutral-800 border border-white/10">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 640px) 192px, 160px"
                      className="object-cover"
                    />
                  </div>
                </a>

                <div className="flex flex-col justify-start">
                  <a href={project.link} className="group/title inline-block">
                    <h3 className="project-title text-sm font-bold text-white group-hover/title:text-accent uppercase leading-tight tracking-wider mb-3 transition-colors flex items-center gap-2">
                      {project.title}
                      <span
                        className="inline-block transition-transform duration-300 group-hover/title:translate-x-1"
                        style={{ width: "0.75rem", height: "0.75rem" }}
                      >
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          className="opacity-60"
                          style={{
                            width: "0.75rem",
                            height: "0.75rem",
                            display: "block",
                          }}
                        />
                      </span>
                    </h3>
                  </a>
                  <div className="text-sm font-light text-white uppercase tracking-wide mb-2">
                    {project.client}
                  </div>
                  <div className="text-sm text-neutral-500 mt-1">
                    {project.location}
                  </div>
                </div>
              </div>

              <p className="text-neutral-400 mb-6 flex-grow text-sm leading-relaxed text-justify">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 text-neutral-300 border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </GlowCard>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProjects;
