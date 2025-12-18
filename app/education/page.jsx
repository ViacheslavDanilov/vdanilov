"use client";

import React, { useMemo } from "react";
import EducationCard from "@/components/EducationCard";
import CertificateCard from "@/components/CertificateCard";

// Configuration Constants
const INSTITUTION_URLS = {
  "Tomsk Polytechnic University": "https://tpu.ru/en/",
  "Tomsk State University": "https://en.tsu.ru/",
  "University of Leeds": "https://www.leeds.ac.uk/",
  "Technical University of Madrid": "https://www.upm.es/",
  "University of Trento": "https://www.unitn.it/",
  "University of Lisbon": "https://tecnico.ulisboa.pt/",
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
    logoBrightness: 1.1,
  },
  {
    id: "msc-tpu",
    degree: "MSc in Computer Engineering",
    field: "Information and Control Systems",
    institution: "Tomsk Polytechnic University",
    url: INSTITUTION_URLS["Tomsk Polytechnic University"],
    honors: "", // GPA: 4.94/5.0
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
    logoBrightness: 1.1,
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
    logoBrightness: 1.3,
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
    logoBrightness: 1.1,
  },
];

const ADDITIONAL_EDUCATION_DATA = [
  {
    id: "visiting-phd-uol",
    degree: "PhD Student in Computer Science",
    field: "Machine Learning and Medical Image Analysis",
    institution: "University of Leeds",
    url: INSTITUTION_URLS["University of Leeds"],
    period: "Jan 2019 - Aug 2019",
    location: "Leeds • United Kingdom 🇬🇧",
    logo: "/education/universities/uol.webp",
    coreCourses: ["Machine learning and deep learning research"],
    logoBrightness: 1.1,
  },
  {
    id: "visiting-phd-upm",
    degree: "PhD Student in Data Science",
    field: "Machine Learning for Biomedical Imaging",
    institution: "Technical University of Madrid",
    url: INSTITUTION_URLS["Technical University of Madrid"],
    period: "Mar 2019 - Jul 2019",
    location: "Madrid • Spain 🇪🇸",
    logo: "/education/universities/upm.webp",
    coreCourses: [
      "Advanced methods in medical imaging",
      "Predictive and descriptive learning",
      "Data science foundations and applications",
      "Machine Learning",
    ],
    logoBrightness: 1.0,
  },
  {
    id: "visiting-phd-uot",
    degree: "PhD Student in Machine Learning",
    field: "Pattern Recognition and Signal Processing",
    institution: "University of Trento",
    url: INSTITUTION_URLS["University of Trento"],
    period: "Mar 2017 - Aug 2017",
    location: "Trento • Italy 🇮🇹",
    logo: "/education/universities/uot-white.webp",
    coreCourses: [
      "Recognition systems",
      "Signal processing and pattern recognition",
    ],
    logoBrightness: 1.1,
  },
  {
    id: "visiting-msc-uol",
    degree: "MSc Student in Robotics",
    field: "Intelligent Systems and AI",
    institution: "University of Lisbon",
    url: INSTITUTION_URLS["University of Lisbon"],
    period: "Jan 2013 - Aug 2013",
    location: "Lisbon • Portugal 🇵🇹",
    logo: "/education/universities/ist.webp",
    coreCourses: [
      "Robotics",
      "Computer graphics",
      "Natural language processing",
    ],
    logoBrightness: 1.1,
  },
];
const CERTIFICATES_DATA = [
  {
    id: "meta-db-engineer",
    title: "Database Engineer",
    organization: "Meta",
    date: "Feb 2026",
    logo: "/education/certificates/meta.png",
    url: "#", // Placeholder
    organizationUrl:
      "https://certifications.facebookblueprint.com/student/catalog",
    logoBrightness: 1.0,
  },
  {
    id: "skillshare-figma",
    title: "Figma UI / UX Design",
    organization: "Skillshare",
    date: "Oct 2025",
    logo: "/education/certificates/skillshare.png",
    url: "https://coursera.org/verify/specialization/I4H76PVZN9Z2",
    organizationUrl: "https://www.skillshare.com/",
    logoBrightness: 1.1,
  },
  {
    id: "scrimba-tailwind",
    title: "Tailwind CSS",
    organization: "Scrimba",
    date: "Oct 2025",
    logo: "/education/certificates/scrimba.png",
    url: "https://coursera.org/verify/specialization/5UGXLV455V59",
    organizationUrl: "https://scrimba.com/",
    logoBrightness: 1.0,
  },
  {
    id: "jhu-web-dev",
    title: "Web Development",
    organization: "Johns Hopkins University",
    date: "Sep 2025",
    logo: "/education/certificates/jhu.png",
    url: "https://coursera.org/verify/specialization/4TE0FF6R5JCB",
    organizationUrl: "https://www.jhu.edu/",
    logoBrightness: 1.1,
  },
  {
    id: "aws-ml-specialty",
    title: "Machine Learning Specialty",
    organization: "Amazon Web Services",
    date: "Sep 2021",
    logo: "/education/certificates/aws.png",
    url: "https://www.udemy.com/certificate/UC-eb6e5170-fed4-42d1-b014-6186c4d5e23e/",
    organizationUrl: "https://aws.amazon.com/certification/",
    logoBrightness: 1.1,
  },
  {
    id: "tpu-cv",
    title: "Computer Vision",
    organization: "Tomsk Polytechnic University",
    date: "Sep 2019",
    logo: "/education/certificates/tpu.png",
    url: "https://drive.google.com/open?id=17gZz3O2m8MVzWcSLr_c537VRYAEMkOhu",
    organizationUrl: "https://tpu.ru/en/",
    logoBrightness: 1.1,
  },
  {
    id: "mda-english",
    title: "English Language",
    organization: "MDA College",
    date: "Jul 2019",
    logo: "/education/certificates/mda.png",
    url: "https://drive.google.com/file/d/1xgvnBmdxNRfj9ZeLHjnaOk5z4FLs_177/view?usp=sharing",
    organizationUrl: "https://takeielts.britishcouncil.org/mda-college/",
    logoBrightness: 1.1,
  },
  {
    id: "google-digital-marketing",
    title: "Digital Marketing",
    organization: "Google",
    date: "Sep 2018",
    logo: "/education/certificates/google.png",
    url: "https://drive.google.com/open?id=10O0Mt0r_lGgbyAYJyM64H84hHweFpRmH",
    organizationUrl: "https://developers.google.com/",
    logoBrightness: 1.1,
  },
  {
    id: "google-ml-specialty",
    title: "Machine Learning Specialty",
    organization: "Google",
    date: "Aug 2018",
    logo: "/education/certificates/google.png",
    url: "https://drive.google.com/open?id=1_2BI1VgwfsmzPtYTeqCrIANK3SUvDiFe",
    organizationUrl: "https://developers.google.com/",
    logoBrightness: 1.1,
  },
];

export default function Education() {
  const coreEducation = useMemo(() => CORE_EDUCATION_DATA, []);
  const additionalEducation = useMemo(() => ADDITIONAL_EDUCATION_DATA, []);
  const certifications = useMemo(() => CERTIFICATES_DATA, []);

  return (
    <main className="min-h-screen pt-24">
      <div className="flex flex-col items-center pt-12 md:pt-24 gap-12 pb-32">
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            role="list"
          >
            {certifications.length > 0 ? (
              certifications.map((cert) => (
                <CertificateCard key={cert.id} certificate={cert} />
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
