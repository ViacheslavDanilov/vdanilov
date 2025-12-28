"use client";

import React, { useState, useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";
import PortfolioCard from "@/components/PortfolioCard";
import { Tab } from "@/components/ui/tab";
import {
  faBrain,
  faLayerGroup,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

// Project data with date and featured fields
const PROJECTS_DATA = [
  {
    id: "hypervision-ablation",
    title: "HyperVision Ablation",
    description:
      "ML workflow for tissue ablation assessment in hyperspectral imaging using PCA, Faster R-CNN, and Mean Shift clustering.",
    category: "AI/ML",
    image: "/portfolio/previews/hypervision-ablation.webp",
    date: "2024-07",
    featured: true,
  },
  {
    id: "sales-pilot",
    title: "Sales Pilot",
    description:
      "AI-powered lead scoring system using hybrid heuristics and OpenAI embeddings to automate and prioritize high-fit leads at scale.",
    category: "AI/ML",
    image: "/portfolio/previews/sales-pilot.webp",
    date: "2025-05",
    featured: true,
  },
  {
    id: "coronary-insight",
    title: "Coronary Insight",
    description:
      "Deep learning pipeline for OCT plaque segmentation, enabling precise arterial risk assessment in cardiovascular imaging.",
    category: "AI/ML",
    image: "/portfolio/previews/coronary-insight.webp",
    date: "2025-06",
    featured: true,
  },
  {
    id: "deep-brainwatch",
    title: "Deep BrainWatch",
    description:
      "Non-invasive ICP monitoring using deep learning on cerebral blood flow signals from near-infrared photonic sensors.",
    category: "AI/ML",
    image: "/portfolio/previews/deep-brainwatch.webp",
    date: "2025-12",
    featured: true,
  },
  {
    id: "immune-profiler",
    title: "Immune Profiler",
    description:
      "ML-driven workflow for tumor immune phenotype classification using HoVer-Net and AutoML on histopathology images.",
    category: "AI/ML",
    image: "/portfolio/previews/immune-profiler.webp",
    date: "2024-06",
    featured: true,
  },
  {
    id: "histo-scanner",
    title: "Histo Scanner",
    description:
      "Deep learning pipeline for segmenting microvascular features in tissue-engineered vascular grafts with 89% Dice score.",
    category: "AI/ML",
    image: "/portfolio/previews/histo-scanner.webp",
    date: "2024-05",
    featured: true,
  },
  {
    id: "pulmovision",
    title: "PulmoVision",
    description:
      "Explainable AI framework for detecting pulmonary edema features in chest X-rays using deep learning segmentation and object detection.",
    category: "AI/ML",
    image: "/portfolio/previews/pulmovision.webp",
    date: "2024-03",
    featured: true,
  },
  {
    id: "provalve-design",
    title: "ProValve Design",
    description:
      "ML-driven generative design framework for prosthetic heart valves using optimization algorithms, achieving 95% design efficacy.",
    category: "AI/ML",
    image: "/portfolio/previews/provalve-design.webp",
    date: "2023-09",
    featured: true,
  },
  {
    id: "sonoguide",
    title: "SonoGuide",
    description:
      "Deep learning solution for surgical tool segmentation in 3D ultrasound, achieving 93.6% Dice score for real-time catheter localization.",
    category: "AI/ML",
    image: "/portfolio/previews/sonoguide.webp",
    date: "2023-02",
    featured: true,
  },
  {
    id: "pulmoscore",
    title: "PulmoScore",
    description:
      "Two-stage ML workflow for COVID-19 severity scoring on chest X-rays, achieving MAE of 0.30 and 11× faster processing.",
    category: "AI/ML",
    image: "/portfolio/previews/pulmoscore.webp",
    date: "2022-07",
    featured: true,
  },
  {
    id: "pulmolens",
    title: "PulmoLens",
    description:
      "Attention-guided deep learning for COVID-19 and pneumonia detection in chest X-rays, achieving 84% accuracy with Grad-CAM supervision.",
    category: "AI/ML",
    image: "/portfolio/previews/pulmolens.webp",
    date: "2022-01",
    featured: true,
  },
  {
    id: "deep-deface",
    title: "Deep Deface",
    description:
      "GPU-accelerated 3D anonymization pipeline for CT and MRI scans, detecting and blurring facial/ear regions while preserving 100% of brain anatomy.",
    category: "AI/ML",
    image: "/portfolio/previews/deep-deface.webp",
    date: "2021-09",
    featured: true,
  },
  {
    id: "tavi-pinpoint",
    title: "TAVI PinPoint",
    description:
      "Real-time landmark tracking for safer valve implantation during TAVI procedures using multi-task deep learning with 97% accuracy.",
    category: "AI/ML",
    image: "/portfolio/previews/tavi-pinpoint.webp",
    date: "2021-07",
    featured: true,
  },
  {
    id: "stenosis-spotter",
    title: "Stenosis Spotter",
    description:
      "Real-time coronary stenosis detection using deep learning for intraoperative angiographic image analysis with 0.94 mAP.",
    category: "AI/ML",
    image: "/portfolio/previews/stenosis-spotter.webp",
    date: "2021-04",
    featured: true,
  },
  {
    id: "oncocell-vision",
    title: "OncoCell Vision",
    description:
      "AI-powered microscopy pipeline for detecting and counting cancer cell biomarkers using EfficientDet, achieving 85% mAP for nuclei detection.",
    category: "AI/ML",
    image: "/portfolio/previews/oncocell-vision.webp",
    date: "2021-01",
    featured: true,
  },
  {
    id: "deep-anatomy",
    title: "Deep Anatomy",
    description:
      "High-precision 3D organ segmentation via V-net architecture with dense skip connections, achieving up to 96% Dice score across 5 anatomical structures.",
    category: "AI/ML",
    image: "/portfolio/previews/deep-anatomy.webp",
    date: "2020-07",
    featured: true,
  },
  {
    id: "deepvision-wildfire",
    title: "DeepVision Wildfire",
    description:
      "Real-time wildfire detection system for Siberian forests combining EfficientDet and CNN-RNN, achieving 95.6% accuracy at 9 FPS.",
    category: "AI/ML",
    image: "/portfolio/previews/deepvision-wildfire.webp",
    date: "2019-07",
    featured: true,
  },
];

const FILTER_OPTIONS = [
  { id: "all", label: "All", icon: faLayerGroup },
  { id: "featured", label: "Featured", icon: faStar },
  { id: "AI/ML", label: "AI/ML", icon: faBrain },
];

// Sort projects by date (newest first)
const sortByDate = (projects) => {
  return [...projects].sort((a, b) => new Date(b.date) - new Date(a.date));
};

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects = useMemo(() => {
    let filtered;
    if (activeFilter === "all") {
      filtered = PROJECTS_DATA;
    } else if (activeFilter === "featured") {
      filtered = PROJECTS_DATA.filter((project) => project.featured);
    } else {
      filtered = PROJECTS_DATA.filter(
        (project) => project.category === activeFilter,
      );
    }
    return sortByDate(filtered);
  }, [activeFilter]);

  const getCounts = useMemo(() => {
    const counts = {
      all: PROJECTS_DATA.length,
      featured: PROJECTS_DATA.filter((p) => p.featured).length,
    };
    FILTER_OPTIONS.forEach((option) => {
      if (option.id !== "all" && option.id !== "featured") {
        counts[option.id] = PROJECTS_DATA.filter(
          (project) => project.category === option.id,
        ).length;
      }
    });
    return counts;
  }, []);

  return (
    <main className="min-h-screen pt-24">
      <div className="flex flex-col items-center pt-12 md:pt-24 gap-16 pb-48">
        {/* Header Section */}
        <section className="w-full max-w-7xl mx-auto px-6">
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-light mb-4">
              Portfolio
            </h1>
            <p className="text-gray-400 mt-3 max-w-3xl mx-auto leading-relaxed">
              A curated collection of projects showcasing expertise in machine
              learning, artificial intelligence, and data-driven solutions
            </p>
          </header>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {FILTER_OPTIONS.map((option) => (
              <Tab
                key={option.id}
                text={`${option.label} (${getCounts[option.id]})`}
                icon={option.icon}
                selected={activeFilter === option.id}
                setSelected={() => setActiveFilter(option.id)}
                layoutId="portfolio-filter"
              />
            ))}
          </div>

          {/* Projects Grid */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            role="list"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  role="listitem"
                >
                  <PortfolioCard project={project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-card border border-white/10 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <p className="text-gray-400 text-lg">
                No projects in this category yet.
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Check back soon for updates!
              </p>
            </motion.div>
          )}
        </section>
      </div>
    </main>
  );
}
