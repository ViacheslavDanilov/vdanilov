import React from "react";
import CyberneticCard from "./ui/cybernetic-card";
import Image from "next/image";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const PROJECTS = [
  {
    id: "wavelets-in-the-brain",
    title: "Wavelets in the brain",
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
    link: "#",
    image: `${basePath}/images/projects/wavelets-in-the-brain/preview.webp`,
  },
  {
    id: "sales-pilot",
    title: "AI-driven lead scoring at scale",
    client: "Symfa",
    location: "Miami · United States 🇺🇸",
    description:
      "An end-to-end AI system that automates outbound lead generation by scoring jobs, contacts, and companies using hybrid models – dramatically reducing time-to-lead and improving conversion rates.",
    stack: ["Python", "OpenAI API", "scikit-learn", "DVC", "CI/CD", "LLM"],
    link: "#",
    image: `${basePath}/images/projects/sales-pilot/preview.webp`,
  },
  {
    id: "tumor-immune-phenotype",
    title: "Tumor immune phenotype classification",
    client: "Boehringer Ingelheim",
    location: "Ingelheim · Germany 🇩🇪",
    description:
      "Created a hybrid pipeline to classify tumor immune phenotypes with 89% weighted F1-score, enabling automated analysis of adenocarcinoma slides for personalized treatments.",
    stack: ["PyTorch", "HoVer-Net", "scikit-learn", "OpenSlide", "AutoML"],
    link: "#",
    image: `${basePath}/images/projects/tumor-immune-phenotype/preview.webp`,
  },
  {
    id: "ml-for-laser-ablation",
    title: "ML for laser ablation assessment",
    client: "Institute for Image-Guided Surgery",
    location: "Strasbourg · France 🇫🇷",
    description:
      "Leveraging deep learning and clustering, this project introduces a robust workflow for analyzing hyperspectral imaging data, enabling precise detection and segmentation of laser-induced tissue ablation, with applications in medical diagnostics and cancer therapy.",
    stack: [
      "PyTorch",
      "MMDetection",
      "scikit-learn",
      "DVC",
      "OpenCV",
      "MLflow",
    ],
    link: "#",
    image: `${basePath}/images/projects/ml-for-laser-ablation/preview.webp`,
  },
];

const FeaturedProjects = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-light mb-4">
          Featured Projects
        </h2>
        {/* <p className="text-light/60 max-w-2xl mx-auto">
          A selection of key projects demonstrating expertise in AI, web
          development, and scalable systems.
        </p> */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {PROJECTS.map((project) => (
          <CyberneticCard key={project.id} className="h-full flex flex-col">
            {/* Mobile layout: centered image */}
            <div className="flex flex-col sm:hidden items-center mb-6">
              <a href={project.link} className="block mb-4">
                <div className="relative w-48 h-48 rounded-lg overflow-hidden bg-neutral-800 border border-white/10 transition-transform duration-300 hover:scale-105">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="192px"
                    className="object-cover"
                  />
                </div>
              </a>
              <a href={project.link} className="block">
                <h3 className="text-lg font-bold text-white group-hover:text-accent hover:text-accent transition-colors uppercase leading-tight mb-2 text-center">
                  {project.title}
                </h3>
              </a>
              <div className="text-sm font-semibold text-white uppercase tracking-wide text-center">
                {project.client}
              </div>
              <div className="text-xs text-neutral-500 mt-1 text-center">
                {project.location}
              </div>
            </div>

            {/* Desktop/Tablet layout: horizontal */}
            <div className="hidden sm:flex flex-row gap-6 mb-4">
              <a href={project.link} className="flex-shrink-0">
                <div className="relative w-40 h-40 rounded-lg overflow-hidden bg-neutral-800 border border-white/10 transition-transform duration-300 hover:scale-105">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 192px, 160px"
                    className="object-cover"
                  />
                </div>
              </a>

              <div className="flex flex-col justify-center">
                <a href={project.link}>
                  <h3 className="text-lg font-bold text-white group-hover:text-accent hover:text-accent transition-colors uppercase leading-tight mb-2">
                    {project.title}
                  </h3>
                </a>
                <div className="text-sm font-semibold text-white uppercase tracking-wide">
                  {project.client}
                </div>
                <div className="text-xs text-neutral-500 mt-1">
                  {project.location}
                </div>
              </div>
            </div>

            <p className="text-neutral-400 mb-6 flex-grow text-sm leading-relaxed">
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
          </CyberneticCard>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProjects;
