"use client";

import React, { useState, useMemo } from "react";
import ReferenceCard from "@/components/ReferenceCard";
import { Tab } from "@/components/ui/tab";
import {
  faFlask,
  faBriefcase,
  faHeartPulse,
} from "@fortawesome/free-solid-svg-icons";

// Placeholder reference data
const REFERENCES_DATA = [
  {
    id: "elena-kowalski",
    name: "Dr. Elena Kowalski",
    role: "Research Director",
    organization: "MIT Artificial Intelligence Lab",
    location: "Cambridge, MA · United States 🇺🇸",
    category: "Research",
    image: "/references/placeholder-1.webp",
    linkedin: "https://linkedin.com/",
    email: "elena.kowalski@example.com",
  },
  {
    id: "james-chen",
    name: "Prof. James Chen",
    role: "AI Lab Lead",
    organization: "Stanford University",
    location: "Palo Alto, CA · United States 🇺🇸",
    category: "Research",
    image: "/references/placeholder-2.webp",
    linkedin: "https://linkedin.com/",
    email: "james.chen@example.com",
  },
  {
    id: "sarah-mitchell",
    name: "Dr. Sarah Mitchell",
    role: "Principal Scientist",
    organization: "DeepMind",
    location: "London · United Kingdom 🇬🇧",
    category: "Research",
    image: "/references/placeholder-3.webp",
    linkedin: "https://linkedin.com/",
    email: "sarah.mitchell@example.com",
  },
  {
    id: "michael-anderson",
    name: "Michael Anderson",
    role: "Chief Executive Officer",
    organization: "TechVentures Capital",
    location: "San Francisco, CA · United States 🇺🇸",
    category: "Business",
    image: "/references/placeholder-4.webp",
    linkedin: "https://linkedin.com/",
    email: "michael.anderson@example.com",
  },
  {
    id: "jennifer-martinez",
    name: "Jennifer Martinez",
    role: "Chief Technology Officer",
    organization: "Innovation Labs",
    location: "Berlin · Germany 🇩🇪",
    category: "Business",
    image: "/references/placeholder-5.webp",
    linkedin: "https://linkedin.com/",
    email: "jennifer.martinez@example.com",
  },
  {
    id: "david-kim",
    name: "David Kim",
    role: "VP of Engineering",
    organization: "CloudScale Technologies",
    location: "Seattle, WA · United States 🇺🇸",
    category: "Business",
    image: "/references/placeholder-6.webp",
    linkedin: "https://linkedin.com/",
    email: "david.kim@example.com",
  },
  {
    id: "maria-santos",
    name: "Dr. Maria Santos",
    role: "Chief Cardiologist",
    organization: "Mayo Clinic",
    location: "Rochester, MN · United States 🇺🇸",
    category: "Medicine",
    image: "/references/placeholder-7.webp",
    linkedin: "https://linkedin.com/",
    email: "maria.santos@example.com",
  },
  {
    id: "thomas-weber",
    name: "Dr. Thomas Weber",
    role: "Head of Radiology",
    organization: "Charité University Hospital",
    location: "Berlin · Germany 🇩🇪",
    category: "Medicine",
    image: "/references/placeholder-8.webp",
    linkedin: "https://linkedin.com/",
    email: "thomas.weber@example.com",
  },
  {
    id: "amanda-foster",
    name: "Dr. Amanda Foster",
    role: "Director of Biomedical Research",
    organization: "Johns Hopkins Medicine",
    location: "Baltimore, MD · United States 🇺🇸",
    category: "Medicine",
    image: "/references/placeholder-9.webp",
    linkedin: "https://linkedin.com/",
    email: "amanda.foster@example.com",
  },
];

const FILTER_OPTIONS = [
  { id: "all", label: "All", icon: null },
  { id: "Research", label: "Research", icon: faFlask },
  { id: "Business", label: "Business", icon: faBriefcase },
  { id: "Medicine", label: "Medicine", icon: faHeartPulse },
];

export default function References() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredReferences = useMemo(() => {
    if (activeFilter === "all") {
      return REFERENCES_DATA;
    }
    return REFERENCES_DATA.filter((ref) => ref.category === activeFilter);
  }, [activeFilter]);

  const getCounts = useMemo(() => {
    const counts = { all: REFERENCES_DATA.length };
    FILTER_OPTIONS.forEach((option) => {
      if (option.id !== "all") {
        counts[option.id] = REFERENCES_DATA.filter(
          (ref) => ref.category === option.id,
        ).length;
      }
    });
    return counts;
  }, []);

  return (
    <main className="min-h-screen pt-24">
      <div className="flex flex-col items-center pt-12 md:pt-24 gap-8 pb-32">
        {/* Header Section */}
        <section className="w-full max-w-7xl mx-auto px-6">
          <header className="mb-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-light mb-4">
              References
            </h1>
            <p className="text-gray-400 mt-3 max-w-3xl mx-auto leading-relaxed">
              Collaborations with leading experts in machine learning, data
              science, and biomedicine have shaped my technical expertise and
              strategic perspective
            </p>
          </header>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {FILTER_OPTIONS.map((option) => (
              <Tab
                key={option.id}
                text={`${option.label} (${getCounts[option.id]})`}
                icon={option.icon}
                selected={activeFilter === option.id}
                setSelected={() => setActiveFilter(option.id)}
                layoutId="references-filter"
              />
            ))}
          </div>

          {/* References Grid */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            role="list"
          >
            {filteredReferences.map((reference) => (
              <div
                key={reference.id}
                className="transition-all duration-300"
                role="listitem"
              >
                <ReferenceCard reference={reference} />
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredReferences.length === 0 && (
            <p className="text-center text-gray-500 italic py-12">
              No references found for this category.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
