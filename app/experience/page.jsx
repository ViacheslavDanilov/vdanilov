"use client";

import React from "react";
import ExperienceCard from "@/components/ExperienceCard";

// Calculate duration between two dates
const calculateDuration = (startDate, endDate = null) => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  if (years > 0 && months > 0) {
    return `${years} yr${years > 1 ? "s" : ""} ${months} mo${months > 1 ? "s" : ""}`;
  } else if (years > 0) {
    return `${years} yr${years > 1 ? "s" : ""}`;
  } else {
    return `${months} mo${months > 1 ? "s" : ""}`;
  }
};

export default function Experience() {
  const experiences = [
    {
      id: "symfa-cto",
      title: "Chief Technology Officer",
      company: "Symfa",
      type: "Full-time",
      startDate: "2024-11-01",
      endDate: null,
      location: "Miami • United States 🇺🇸",
      logo: "/experience/symfa.webp",
      responsibilities: [
        "Defining and executing the company's long-term technical vision across technological units",
        "Leading and scaling a cross-functional R&D department focused on AI, machine learning, autonomous agents, and automation",
        "Driving applied research in the InsurTech domain with partners such as AmTrust, CNA, and Plateau Group to deliver innovative, market-aligned solutions",
        "Acting as the company's AI thought leader, guiding strategy and implementation across client and internal projects",
        "Publishing business and technical articles to position Symfa at the forefront of AI-driven innovation",
        "Representing the company at key industry events and conferences",
      ],
      publications: [
        {
          title:
            "Testing AI low-code platforms: What actually worked (and what didn't)",
          url: "https://symfa.com/blog/ai-low-code-tools",
          type: "Blog Post",
        },
        {
          title:
            "Freelance Tech Trends: Top IT Skills, Pay Rates, & Regional Demand",
          url: "https://symfa.com/blog/top-skills-in-demand-in-gig-economy",
          type: "Blog Post",
        },
        {
          title:
            "Freelance Pricing Trends 2025: Industry, Location & Expertise Insights",
          url: "https://symfa.com/blog/insights-and-trends-in-the-gig-economy",
          type: "Blog Post",
        },
      ],
    },
    {
      id: "upf-professor",
      title: "Research Professor",
      company: "Pompeu Fabra University",
      type: "Full-time",
      startDate: "2023-06-01",
      endDate: null,
      location: "Barcelona • Spain 🇪🇸",
      logo: "/experience/upf.webp",
      responsibilities: [
        "Collaborated with the Institute of Photonic Sciences to develop ML solutions for a photonics platform enabling non-invasive ICP estimation via cerebral blood flow monitoring",
        "Applied biophotonics insights to guide model design, optimization, and validation",
        "Collected patient data at Vall d'Hebron Hospital, working directly with clinicians and surgeons",
        "Led time-series analysis and built advanced ML models for real-time, accurate ICP prediction",
        "Mentored PhD students and post-docs in ML algorithm development for time-series analysis and medical data applications",
      ],
      publications: [
        {
          title: "SafeICP",
          url: "https://safeicp.es/",
          type: "Project Website",
        },
        {
          title:
            "Hybrid Convolutional and Recurrent Neural Network for Non-Invasive Intracranial Pressure Estimation from Cerebral Blood Flow",
          url: "https://doi.org/10.1364/BRAIN.2024.BTu3C.7",
          type: "Conference Paper",
        },
        {
          title:
            "Intracranial pressure and cerebral blood flow pulse dynamics in patients with idiopathic normal pressure hydrocephalus during Katzman infusion test: a pilot optical monitoring study",
          url: "https://doi.org/10.1364/ECBO.2025.S4F.2",
          type: "Conference Paper",
        },
      ],
    },
  ];

  // Add computed duration to each experience
  const experiencesWithDuration = experiences.map((exp) => ({
    ...exp,
    duration: calculateDuration(exp.startDate, exp.endDate),
    period: `${new Date(exp.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })} - ${exp.endDate ? new Date(exp.endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "Present"}`,
  }));

  return (
    <div className="min-h-screen pt-24">
      <div className="flex flex-col items-center pt-12 md:pt-36 gap-12 pb-32">
        <section className="w-full max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-light mb-4">
              Core Roles
            </h1>
            <p className="text-gray-400 mt-3 max-w-3xl mx-auto leading-relaxed">
              The following positions reflect my long-term leadership and
              engineering contributions across AI, LLMs, machine learning,
              computer vision, and medical and hyperspectral imaging – driving
              innovation, strategy, and execution in both research and industry
              contexts.
            </p>
          </div>

          {/* Experience Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {experiencesWithDuration.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
