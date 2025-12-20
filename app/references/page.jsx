"use client";

import React, { useState, useMemo } from "react";
import ReferenceCard from "@/components/ReferenceCard";
import { Tab } from "@/components/ui/tab";
import {
  faFlask,
  faBriefcase,
  faHeartPulse,
} from "@fortawesome/free-solid-svg-icons";

// Reference data
const REFERENCES_DATA = [
  // Research
  {
    id: "alex-frangi",
    name: "Alex Frangi, PhD",
    role: "Director",
    organization: "Christabel Pankhurst Institute",
    location: "Manchester · United Kingdom 🇬🇧",
    category: "Research",
    image: "/references/alex-frangi.webp",
    linkedin: "https://www.linkedin.com/in/alex-frangi-5765853/",
    email: "a.frangi@manchester.ac.uk",
  },
  {
    id: "lori-bridal",
    name: "Lori Bridal, PhD",
    role: "Research Director",
    organization: "Sorbonne University",
    location: "Paris · France 🇫🇷",
    category: "Research",
    image: "/references/lori-bridal.webp",
    linkedin: "https://www.linkedin.com/in/lori-bridal-05ab8a5/",
    email: "lori.bridal@sorbonne-universite.fr",
  },
  {
    id: "paola-saccomandi",
    name: "Paola Saccomandi, PhD",
    role: "Professor",
    organization: "Politecnico di Milano",
    location: "Milan · Italy 🇮🇹",
    category: "Research",
    image: "/references/paola-saccomandi.webp",
    linkedin: "https://www.linkedin.com/in/paola-saccomandi-93410645/",
    email: "paola.saccomandi@polimi.it",
  },
  {
    id: "farid-melgani",
    name: "Farid Melgani, PhD",
    role: "Professor",
    organization: "University of Trento",
    location: "Trento · Italy 🇮🇹",
    category: "Research",
    image: "/references/farid-melgani.webp",
    linkedin: "https://www.linkedin.com/in/farid-melgani-36549215/",
    email: "farid.melgani@unitn.it",
  },
  {
    id: "gemma-piella",
    name: "Gemma Piella, PhD",
    role: "Professor",
    organization: "Pompeu Fabra University",
    location: "Barcelona · Spain 🇪🇸",
    category: "Research",
    image: "/references/gemma-piella.webp",
    linkedin: "https://www.linkedin.com/in/gemma-piella-27a5232b/",
    email: "gemma.piella@upf.edu",
  },
  {
    id: "turgut-durduran",
    name: "Turgut Durduran, PhD",
    role: "Group Head",
    organization: "Institute of Photonic Sciences",
    location: "Barcelona · Spain 🇪🇸",
    category: "Research",
    image: "/references/turgut-durduran.webp",
    linkedin: "https://www.linkedin.com/in/turgut-durduran-4b66aa16/",
    email: "turgut.durduran@icfo.eu",
  },
  {
    id: "maria-ledesma",
    name: "Maria Ledesma, PhD",
    role: "Professor",
    organization: "Technical University of Madrid",
    location: "Madrid · Spain 🇪🇸",
    category: "Research",
    image: "/references/maria-ledesma.webp",
    linkedin: "https://www.linkedin.com/in/maria-j-ledesma-carbayo-98907/",
    email: "mledesma@die.upm.es",
  },
  // Medicine
  {
    id: "evgeny-ovcharenko",
    name: "Evgeny Ovcharenko, PhD",
    role: "Lab Head",
    organization: "Kuzbass Cardiology Center",
    location: "Kemerovo · Russia 🇷🇺",
    category: "Medicine",
    image: "/references/evgeny-ovcharenko.webp",
    linkedin: "https://www.linkedin.com/in/evgeny-ovcharenko-467b3545/",
    email: "ov.evgeny@gmail.com",
  },
  {
    id: "diana-litmanovich",
    name: "Diana Litmanovich, MD",
    role: "Professor",
    organization: "Harvard University",
    location: "Boston · United States 🇺🇸",
    category: "Medicine",
    image: "/references/diana-litmanovich.webp",
    linkedin: "https://www.linkedin.com/in/diana-litmanovich-4a51b212/",
    email: "dlitmanovich@bwh.harvard.edu",
  },
  {
    id: "nikolay-vasilyev",
    name: "Nikolay Vasilyev, MD",
    role: "Senior Medical Director",
    organization: "Pfizer",
    location: "Denver · United States 🇺🇸",
    category: "Medicine",
    image: "/references/nikolay-vasilyev.webp",
    linkedin: "https://www.linkedin.com/in/nikolay-vasilyev-8666384/",
    email: "nikolay.vasilyev@pfizer.com",
  },
  // Business
  {
    id: "yuriy-gankin",
    name: "Yuriy Gankin, PhD",
    role: "Chief Scientific Officer",
    organization: "Quantori",
    location: "Cambridge · United States 🇺🇸",
    category: "Business",
    image: "/references/yuriy-gankin.webp",
    linkedin: "https://www.linkedin.com/in/yurygankin/",
    email: "yury.gankin@quantori.com",
  },
  {
    id: "efim-furman",
    name: "Efim Furman",
    role: "Chief Architect",
    organization: "Centaur Labs",
    location: "Boston · United States 🇺🇸",
    category: "Business",
    image: "/references/efim-furman.webp",
    linkedin: "https://www.linkedin.com/in/efim-furman/",
    email: "efim@centaurlabs.com",
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
