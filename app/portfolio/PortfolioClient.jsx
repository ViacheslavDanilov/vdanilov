"use client";

import React from "react";
import FilteredGrid from "@/components/FilteredGrid";
import { motion } from "motion/react";
import PortfolioCard from "@/components/PortfolioCard";
import { PROJECTS } from "@/lib/projects";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const FILTER_OPTIONS = [
  {
    id: "featured",
    label: "Featured",
    icon: faStar /* faStar */,
  },
  {
    id: "all",
    label: "All",
    icon: "" /* faLayerGroup */,
  },
  {
    id: "medical-imaging",
    label: "Medical Imaging",
    icon: "" /* faXRay */,
  },
  {
    id: "image-guided-surgery",
    label: "Image-Guided Surgery",
    icon: "" /* faHeartPulse */,
  },
  {
    id: "biomedical-research",
    label: "Biomedical Research",
    icon: "" /* faMicroscope */,
  },
  {
    id: "medical-devices",
    label: "Medical Devices",
    icon: "" /* faGears */,
  },
  {
    id: "industry-ai-ml",
    label: "Industry AI/ML",
    icon: "" /* faChartLine */,
  },
  {
    id: "insurtech",
    label: "InsurTech",
    icon: "" /* faShieldHalved */,
  },
];

export default function Portfolio() {
  return (
    <div className="min-h-screen pt-24">
      <div className="flex flex-col items-center pt-12 md:pt-24 gap-16 pb-48">
        {/* Header Section */}
        <section className="w-full max-w-7xl mx-auto px-6">
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-strong mb-4">
              Portfolio
            </h1>
            <p className="text-muted mt-3 max-w-3xl mx-auto leading-relaxed">
              A curated collection of projects showcasing expertise in machine
              learning, artificial intelligence, and data-driven solutions
            </p>
          </header>

          <FilteredGrid
            items={PROJECTS}
            options={FILTER_OPTIONS}
            label="Filter projects"
            layoutId="portfolio-filter"
            gridClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            renderItem={(project, index) => (
              <PortfolioCard project={project} priority={index < 3} />
            )}
            empty={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-card border border-white/10 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-legacy-gray-500"
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
                <p className="text-muted text-lg">
                  No projects in this category yet.
                </p>
                <p className="text-legacy-gray-500 text-sm mt-2">
                  Check back soon for updates!
                </p>
              </motion.div>
            }
          />
        </section>
      </div>
    </div>
  );
}
