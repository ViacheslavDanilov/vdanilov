"use client";

import React, { useState, useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";
import ReferenceCard from "@/components/ReferenceCard";
import { Tab } from "@/components/ui/tab";
import {
  faFlask,
  faBriefcase,
  faHeartPulse,
  faLayerGroup,
  faStar,
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
    featured: true,
    socials: {
      website: "https://research.manchester.ac.uk/en/persons/alejandro-frangi",
      linkedin: "https://www.linkedin.com/in/alejandro-frangi/",
      researchgate: "https://www.researchgate.net/profile/Alejandro-Frangi",
      googleScholar: "https://scholar.google.com/citations?user=9fGrB0sAAAAJ",
      email: "alejandro.frangi@manchester.ac.uk",
    },
  },
  {
    id: "lori-bridal",
    name: "Lori Bridal, PhD",
    role: "Research Director",
    organization: "Sorbonne University",
    location: "Paris · France 🇫🇷",
    category: "Research",
    image: "/references/lori-bridal.webp",
    featured: false,
    socials: {
      website: "https://ieee-uffc.org/contact/s-lori-bridal",
      linkedin: "https://www.linkedin.com/in/s-lori-bridal-57262313",
      researchgate: "https://www.researchgate.net/profile/S-Bridal",
      orcid: "https://orcid.org/0000-0001-5053-5423",
      email: "lori.bridal@sorbonne-universite.fr",
    },
  },
  {
    id: "paola-saccomandi",
    name: "Paola Saccomandi, PhD",
    role: "Professor",
    organization: "Politecnico di Milano",
    location: "Milan · Italy 🇮🇹",
    category: "Research",
    image: "/references/paola-saccomandi.webp",
    featured: false,
    socials: {
      website: "https://www.mecc.polimi.it/en/staff/paola.saccomandi",
      linkedin: "https://www.linkedin.com/in/paola-saccomandi-92759561",
      researchgate: "https://www.researchgate.net/profile/Paola-Saccomandi",
      googleScholar:
        "https://scholar.google.it/citations?user=VBOinLAAAAAJ&hl=en",
      email: "paola.saccomandi@polimi.it",
    },
  },
  {
    id: "farid-melgani",
    name: "Farid Melgani, PhD",
    role: "Professor",
    organization: "University of Trento",
    location: "Trento · Italy 🇮🇹",
    category: "Research",
    image: "/references/farid-melgani.webp",
    featured: true,
    socials: {
      website: "https://webapps.unitn.it/du/en/Persona/PER0004197/Didattica",
      linkedin: "https://www.linkedin.com/in/farid-melgani-1a227712",
      researchgate: "https://www.researchgate.net/profile/Farid-Melgani",
      googleScholar:
        "https://scholar.google.com/citations?user=j5MVrE0AAAAJ&hl=en",
      email: "farid.melgani@unitn.it",
    },
  },
  {
    id: "gemma-piella",
    name: "Gemma Piella, PhD",
    role: "Professor",
    organization: "Pompeu Fabra University",
    location: "Barcelona · Spain 🇪🇸",
    category: "Research",
    image: "/references/gemma-piella.webp",
    featured: true,
    socials: {
      website: "https://memoir.icrea.cat/academia_awardees/piella-gemma/",
      linkedin: "https://www.linkedin.com/in/gemma-piella-a234b4/",
      researchgate: "https://www.researchgate.net/profile/Gemma-Piella",
      googleScholar:
        "https://scholar.google.com/citations?user=Q6zjCpsAAAAJ&hl=en",
      email: "gemma.piella@upf.edu",
    },
  },
  {
    id: "turgut-durduran",
    name: "Turgut Durduran, PhD",
    role: "Medical Optics Group Head",
    organization: "Institute of Photonic Sciences",
    location: "Barcelona · Spain 🇪🇸",
    category: "Research",
    image: "/references/turgut-durduran.webp",
    featured: false,
    socials: {
      website: "https://www.icrea.cat/community/icreas/16857/turgut-durduran/",
      linkedin: "https://www.linkedin.com/in/turgut-durduran-5a47a294",
      researchgate: "https://www.researchgate.net/profile/Turgut-Durduran",
      googleScholar:
        "https://scholar.google.com/citations?user=c7reUlAAAAAJ&hl=en",
      email: "turgut.durduran@icfo.eu",
    },
  },
  {
    id: "maria-ledesma",
    name: "Maria Ledesma, PhD",
    role: "Professor",
    organization: "Technical University of Madrid",
    location: "Madrid · Spain 🇪🇸",
    category: "Research",
    image: "/references/maria-ledesma.webp",
    featured: false,
    socials: {
      website: "https://ieeexplore.ieee.org/author/37327193600",
      linkedin: "https://www.linkedin.com/in/maria-j-ledesma-carbayo-440aa8275",
      orcid: "https://orcid.org/0000-0001-6846-3923",
      googleScholar:
        "https://scholar.google.es/citations?user=jCcBex0AAAAJ&hl=en",
      email: "mj.ledesma@upm.es",
    },
  },
  // Medicine
  {
    id: "evgeny-ovcharenko",
    name: "Evgeny Ovcharenko, PhD",
    role: "Head of Biomaterials Lab",
    organization: "Kemerovo Cardiology Center",
    location: "Kemerovo · Russia 🇷🇺",
    category: "Medicine",
    image: "/references/evgeny-ovcharenko.webp",
    featured: false,
    socials: {
      website: "https://loop.frontiersin.org/people/355364",
      linkedin: "https://www.linkedin.com/in/evgeny-ovcharenko-89098722",
      researchgate: "https://www.researchgate.net/profile/Evgeny-Ovcharenko",
      googleScholar:
        "https://scholar.google.ru/citations?user=taoklzsAAAAJ&hl=en",
      email: "ov.eugene@gmail.com",
    },
  },
  {
    id: "diana-litmanovich",
    name: "Diana Litmanovich, MD",
    role: "Professor",
    organization: "Harvard University",
    location: "Boston · United States 🇺🇸",
    category: "Medicine",
    image: "/references/diana-litmanovich.webp",
    featured: true,
    socials: {
      website:
        "https://findadoc.bidmc.org/details/929/diana-litmanovich-diagnostic_radiology-boston-needham",
      linkedin: "https://www.linkedin.com/in/diana-litmanovich-55577276",
      researchgate: "https://www.researchgate.net/profile/Diana-Litmanovich",
      googleScholar:
        "https://scholar.google.com/citations?user=i3JdQAYAAAAJ&hl=en",
      email: "dlitmano@bidmc.harvard.edu",
    },
  },
  {
    id: "nikolay-vasilyev",
    name: "Nikolay Vasilyev, MD",
    role: "Senior Medical Director",
    organization: "Pfizer",
    location: "Denver · United States 🇺🇸",
    category: "Medicine",
    image: "/references/nikolay-vasilyev.webp",
    featured: false,
    socials: {
      website: "https://www.ctsnet.org/home/nvasiliev",
      linkedin: "https://www.linkedin.com/in/nikolayvasilyev/",
      researchgate: "https://www.researchgate.net/profile/Nikolay-Vasilyev-2",
      googleScholar:
        "https://scholar.google.com/citations?user=HnEl5nYAAAAJ&hl=en",
      email: "nikolay.v.vasilyev.md@gmail.com",
    },
  },
  // Industry
  {
    id: "yuriy-gankin",
    name: "Yuriy Gankin, PhD",
    role: "Chief Scientific Officer",
    organization: "Quantori",
    location: "Cambridge · United States 🇺🇸",
    category: "Industry",
    image: "/references/yuriy-gankin.webp",
    featured: true,
    socials: {
      website: "https://quantori.com/about/yuriy-gankin",
      linkedin: "https://www.linkedin.com/in/yuriygankin/",
      orcid: "https://orcid.org/0000-0003-0046-1037",
      googleScholar: "https://scholar.google.com/citations?user=0H_Ty8sAAAAJ",
      email: "yuriy.gankin@quantori.com",
    },
  },
  {
    id: "efim-furman",
    name: "Efim Furman",
    role: "Chief Architect",
    organization: "Centaur Labs",
    location: "Boston · United States 🇺🇸",
    category: "Industry",
    image: "/references/efim-furman.webp",
    featured: true,
    socials: {
      facebook: "https://www.facebook.com/efim.furman",
      linkedin: "https://www.linkedin.com/in/fima-furman-74133a",
      email: "efimfurman@gmail.com",
    },
  },
];

const FILTER_OPTIONS = [
  { id: "featured", label: "Featured", icon: faStar },
  { id: "all", label: "All", icon: faLayerGroup },
  { id: "Research", label: "Research", icon: faFlask },
  { id: "Industry", label: "Industry", icon: faBriefcase },
  { id: "Medicine", label: "Medicine", icon: faHeartPulse },
];

export default function References() {
  const [activeFilter, setActiveFilter] = useState("featured");

  const filteredReferences = useMemo(() => {
    if (activeFilter === "all") {
      return REFERENCES_DATA;
    }
    if (activeFilter === "featured") {
      return REFERENCES_DATA.filter((ref) => ref.featured);
    }
    return REFERENCES_DATA.filter((ref) => ref.category === activeFilter);
  }, [activeFilter]);

  const getCounts = useMemo(() => {
    const counts = {
      all: REFERENCES_DATA.length,
      featured: REFERENCES_DATA.filter((ref) => ref.featured).length,
    };
    FILTER_OPTIONS.forEach((option) => {
      if (option.id !== "all" && option.id !== "featured") {
        counts[option.id] = REFERENCES_DATA.filter(
          (ref) => ref.category === option.id,
        ).length;
      }
    });
    return counts;
  }, []);

  return (
    <main className="min-h-screen pt-24">
      <div className="flex flex-col items-center pt-12 md:pt-24 gap-36 pb-48">
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
            <AnimatePresence mode="popLayout">
              {filteredReferences.map((reference) => (
                <motion.div
                  key={reference.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  role="listitem"
                >
                  <ReferenceCard reference={reference} />
                </motion.div>
              ))}
            </AnimatePresence>
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
