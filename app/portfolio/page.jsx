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
    image: "/portfolio/previews/harnessing-ml-for-laser-ablation.webp",
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
    image: "/portfolio/previews/ai-dissects-arterial-risk.webp",
    date: "2025-06",
    featured: true,
  },
  {
    id: "deep-brainwatch",
    title: "Deep BrainWatch",
    description:
      "Non-invasive ICP monitoring using deep learning on cerebral blood flow signals from near-infrared photonic sensors.",
    category: "AI/ML",
    image: "/portfolio/previews/wavelets-in-the-brain.webp",
    date: "2025-12",
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
