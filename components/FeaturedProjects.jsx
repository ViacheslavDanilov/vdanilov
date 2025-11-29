import React from "react";
import CyberneticCard from "./ui/cybernetic-card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const PROJECTS = [
  {
    title:
      "Wavelets in the brain: Deep learning for non-invasive ICP monitoring",
    client: "Vall d’Hebron Hospital",
    location: "Barcelona · Spain 🇪🇸",
    description:
      "This project developed a hybrid deep learning system that automates the segmentation of atherosclerotic plaques in OCT images. By combining task-specific neural networks with ensemble learning, it achieved state-of-the-art accuracy and offers clinically relevant insights for cardiovascular risk assessment.",
    stack: [
      "PyTorch",
      "Python",
      "fast.ai",
      "Gradio",
      "DVC",
      "Weights & Biases",
    ],
    link: "#",
    image: "/images/projects/wavelets-in-the-brain/preview.webp",
  },
  {
    title: "Sales pilot: AI-driven lead scoring at scale",
    client: "Symfa",
    location: "Miami · United States 🇺🇸",
    description:
      "An end-to-end AI system that automates outbound lead generation by scoring jobs, contacts, and companies using hybrid models – dramatically reducing time-to-lead and improving conversion rates.",
    stack: ["Python", "OpenAI API", "scikit-learn", "DVC", "CI/CD", "LLM"],
    link: "#",
    image: "/images/projects/sales-pilot/preview.webp",
  },
  {
    title: "Tumor immune phenotype classification",
    client: "Boehringer Ingelheim",
    location: "Ingelheim · Germany 🇩🇪",
    description:
      "Created a hybrid pipeline to classify tumor immune phenotypes with 89% weighted F1-score, enabling automated analysis of adenocarcinoma slides for personalized treatments.",
    stack: ["PyTorch", "HoVer-Net", "scikit-learn", "OpenSlide", "AutoML"],
    link: "#",
    image: "/images/projects/tumor-immune-phenotype/preview.webp",
  },
  {
    title:
      "Harnessing ML for laser ablation assessment in hyperspectral imaging",
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
    image: "/images/projects/ml-for-laser-ablation/preview.webp",
  },
];

const FeaturedProjects = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-light mb-4">
          Featured Projects
        </h2>
        <p className="text-light/60 max-w-2xl mx-auto">
          A selection of key projects demonstrating expertise in AI, web
          development, and scalable systems.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {PROJECTS.map((project, index) => (
          <CyberneticCard key={index} className="h-full flex flex-col">
            <div className="flex flex-col sm:flex-row gap-6 mb-4">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 rounded-lg overflow-hidden bg-neutral-800 border border-white/10">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-col justify-center">
                <h3 className="text-lg font-bold text-white group-hover:text-accent transition-colors uppercase leading-tight mb-2">
                  {project.title}
                </h3>
                <div className="text-sm font-semibold text-accent/80 uppercase tracking-wide">
                  {project.client}
                </div>
                <div className="text-xs text-neutral-500 mt-1">
                  {project.location}
                </div>
              </div>

              <div className="ml-auto">
                <a
                  href={project.link}
                  className="text-neutral-400 hover:text-white transition-colors"
                  aria-label={`View ${project.title}`}
                >
                  <FontAwesomeIcon
                    icon={faArrowUpRightFromSquare}
                    className="w-5 h-5"
                  />
                </a>
              </div>
            </div>

            <p className="text-neutral-400 mb-6 flex-grow text-sm leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-auto">
              {project.stack.map((tech, i) => (
                <span
                  key={i}
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
