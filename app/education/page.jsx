"use client";

import React, { useMemo } from "react";
import EducationCard from "@/components/EducationCard";

// Configuration Constants
const INSTITUTION_URLS = {
  "Tomsk Polytechnic University": "https://tpu.ru/en/",
  "Tomsk State University": "https://en.tsu.ru/",
};

const CORE_EDUCATION_DATA = [
  {
    id: "phd-tpu",
    degree: "PhD in Computer Science",
    field: "Applied Mathematics and Machine Learning",
    institution: "Tomsk Polytechnic University",
    url: INSTITUTION_URLS["Tomsk Polytechnic University"],
    honors: "Honors", // GPA: 5.0/5.0
    period: "Sep 2015 - Sep 2020",
    location: "Tomsk • Russia 🇷🇺",
    logo: "/education/universities/tpu.webp",
    coreCourses: [
      "Mathematical modeling, numerical methods, and programming systems",
      "Methods for organizing, planning, and processing the results of an engineering experiment",
      "System analysis, information control, and processing techniques",
    ],
    thesis:
      "Methods and algorithms for medical image segmentation based on machine learning",
  },
  {
    id: "msc-tpu",
    degree: "MSc in Computer Engineering",
    field: "Information and Control Systems",
    institution: "Tomsk Polytechnic University",
    url: INSTITUTION_URLS["Tomsk Polytechnic University"],
    honors: "Honors", // GPA: 4.94/5.0
    period: "Sep 2011 - Sep 2013",
    location: "Tomsk • Russia 🇷🇺",
    logo: "/education/universities/tpu.webp",
    coreCourses: [
      "Object-oriented programming",
      "Design of control systems",
      "Optimization methods",
      "Adaptive control systems",
      "Automated control in engineering systems",
    ],
    thesis:
      "Development of a stabilisation system for a tethered underwater vehicle",
  },
  {
    id: "msc-tsu",
    degree: "MSc in Business Management",
    field: "Corporate Finance and Strategic Management",
    institution: "Tomsk State University",
    url: INSTITUTION_URLS["Tomsk State University"],
    honors: "Honors", // GPA: 5.0/5.0
    period: "Sep 2011 - Sep 2013",
    location: "Tomsk • Russia 🇷🇺",
    logo: "/education/universities/tsu.webp",
    coreCourses: [
      "Project management",
      "International financial reporting standards",
      "Customer relationship management systems",
      "Research methods in management",
      "Corporate finance",
    ],
    thesis:
      "Development of the optimal financial strategy for the organization",
  },
  {
    id: "bsc-tpu",
    degree: "BSc in Robotics",
    field: "Robotics and Intelligent Control",
    institution: "Tomsk Polytechnic University",
    url: INSTITUTION_URLS["Tomsk Polytechnic University"],
    honors: "", // GPA: 4.8/5.0
    period: "Sep 2007 - Sep 2011",
    location: "Tomsk • Russia 🇷🇺",
    logo: "/education/universities/tpu.webp",
    coreCourses: [
      "Information devices and systems in mechatronics",
      "Automatic control theory",
      "Automation facilities",
      "Electromechanical and mechatronic systems",
      "Computer numerical control machines and flexible manufacturing systems",
    ],
    thesis:
      "Development of emergency protection for the catalyst dosing unit in propylene polymerization reactors",
  },
];

const ADDITIONAL_EDUCATION_DATA = [];
const CERTIFICATIONS_DATA = [];

export default function Education() {
  const coreEducation = useMemo(() => CORE_EDUCATION_DATA, []);
  const additionalEducation = useMemo(() => ADDITIONAL_EDUCATION_DATA, []);
  const certifications = useMemo(() => CERTIFICATIONS_DATA, []);

  return (
    <main className="min-h-screen pt-24">
      <div className="flex flex-col items-center pt-12 md:pt-36 gap-12 pb-32">
        {/* Section 1: Core Education */}
        <section className="w-full max-w-7xl mx-auto px-6">
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-light mb-4">
              Core Education
            </h1>
            <p className="text-gray-400 mt-3 max-w-3xl mx-auto leading-relaxed">
              Academic foundation combining a PhD in Computer Science, a
              technical Master’s in engineering, and a business-focused Master’s
              in management, offering a balanced blend of technical and
              strategic expertise
            </p>
          </header>

          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:items-start"
            role="list"
          >
            {coreEducation.map((edu) => (
              <EducationCard key={edu.id} education={edu} />
            ))}
          </div>
        </section>

        {/* Section 2: Additional Education */}
        <section className="w-full max-w-7xl mx-auto px-6 mt-16">
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-light mb-4">
              Additional Education
            </h1>
            <p className="text-gray-400 mt-3 max-w-3xl mx-auto leading-relaxed">
              Broadened academic experience through various international
              programs, including visiting PhD positions in the UK, Spain, and
              Italy, formatted to deepen expertise in machine learning, big
              data, and biomedical applications
            </p>
          </header>

          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:items-start"
            role="list"
          >
            {additionalEducation.length > 0 ? (
              additionalEducation.map((edu) => (
                <EducationCard key={edu.id} education={edu} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500 italic">
                Coming soon...
              </p>
            )}
          </div>
        </section>

        {/* Section 3: Certifications */}
        <section className="w-full max-w-7xl mx-auto px-6 mt-16">
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-light mb-4">
              Certifications
            </h1>
            <p className="text-gray-400 mt-3 max-w-3xl mx-auto leading-relaxed">
              Professional certifications in computer science, advanced data
              science, and machine learning, reinforcing a commitment to
              continuous learning and practical skill development
            </p>
          </header>

          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:items-start"
            role="list"
          >
            {certifications.length > 0 ? (
              certifications.map((cert) => (
                <EducationCard key={cert.id} education={cert} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500 italic">
                Coming soon...
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
