"use client";

import React, { useMemo } from "react";
import ExperienceCard from "@/components/ExperienceCard";

/**
 * Calculate duration between two dates in LinkedIn-style format
 * @param {string} startDate - ISO date string
 * @param {string|null} endDate - ISO date string or null for ongoing
 * @returns {string} Formatted duration (e.g., "2 yrs 3 mos")
 */
const calculateDuration = (startDate, endDate = null) => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth() + 1;

  if (months < 0) {
    years--;
    months += 12;
  }

  const parts = [];
  if (years > 0) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
  if (months > 0) parts.push(`${months} mo${months > 1 ? "s" : ""}`);

  return parts.join(" ") || "Less than a month";
};

/**
 * Format date period in readable format
 * @param {string} startDate - ISO date string
 * @param {string|null} endDate - ISO date string or null for ongoing
 * @returns {string} Formatted period (e.g., "Nov 2024 - Present")
 */
const formatPeriod = (startDate, endDate = null) => {
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });

  return `${formatDate(startDate)} - ${endDate ? formatDate(endDate) : "Present"}`;
};

// Experience data configuration
const EXPERIENCES_DATA = [
  {
    id: "symfa-cto",
    title: "Chief Technology Officer",
    company: "Symfa",
    type: "Full-time",
    category: "industry",
    startDate: "2024-11-01",
    endDate: null,
    location: "Miami • United States 🇺🇸",
    logo: "/experience/core-roles/symfa.webp",
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
    logoBrightness: 1.1,
  },
  {
    id: "upf-professor",
    title: "Research Professor",
    company: "Pompeu Fabra University",
    type: "Full-time",
    category: "research",
    startDate: "2023-06-01",
    endDate: null,
    location: "Barcelona • Spain 🇪🇸",
    logo: "/experience/core-roles/upf.webp",
    responsibilities: [
      "Collaborated with the Institute of Photonic Sciences to develop ML solutions for a photonics platform enabling non-invasive ICP estimation via cerebral blood flow monitoring",
      "Applied biophotonics insights to guide model design, optimization, and validation",
      "Collected patient data at Vall d'Hebron Hospital, working directly with clinicians and surgeons",
      "Led time-series analysis and built advanced ML models for real-time, accurate ICP prediction",
      "Mentored PhD students and post-docs in ML algorithm development for time-series analysis and medical data applications",
    ],
    publications: [
      {
        title:
          "Non-invasive intracranial pressure estimation from cerebral blood flow dynamics using wavelet-based deep learning",
        url: "https://doi.org/10.1364/ECBO.2025.W5B.5",
        type: "Conference Paper",
      },
      {
        title:
          "Intracranial pressure and cerebral blood flow pulse dynamics in patients with idiopathic normal pressure hydrocephalus during Katzman infusion test: a pilot optical monitoring study",
        url: "https://doi.org/10.1364/ECBO.2025.S4F.2",
        type: "Conference Paper",
      },
      {
        title:
          "Hybrid convolutional and recurrent neural network for non-invasive intracranial pressure estimation from cerebral blood flow",
        url: "https://doi.org/10.1364/BRAIN.2024.BTu3C.7",
        type: "Conference Paper",
      },
      {
        title: "SafeICP",
        url: "https://safeicp.es/",
        type: "Project Website",
      },
    ],
    logoBrightness: 1.0,
  },
  {
    id: "quantori-lead-ml",
    title: "Lead Machine Learning Engineer",
    company: "Quantori",
    type: "Full-time",
    category: "industry",
    startDate: "2020-11-01",
    endDate: "2025-11-01",
    location: "Cambridge • United States 🇺🇸",
    logo: "/experience/core-roles/quantori.webp",
    responsibilities: [
      "Leading a team of 6 developers in the areas of ML, DS, and CV",
      "Developing an ML/DL pipeline for tumor immune phenotype classification from histopathology images for Boehringer Ingelheim",
      "Designing and implementing a specialized image processing system for Volastra Therapeutics, utilized for cell counting, classification, and detection",
      "Building a COVID-19/pneumonia classification and scoring model that utilizes guided attention for the Beth Israel Deaconess Medical Center",
    ],
    publications: [
      {
        title:
          "Harnessing AI for Histopathology: A Leap Towards Precision Medicine",
        url: "https://quantori.com/blog/harnessing-ai-for-histopathology-a-leap-towards-precision-medicine",
        type: "Blog Post",
      },
      {
        title:
          "Explainable AI to identify radiographic features of pulmonary edema",
        url: "https://doi.org/10.1093/radadv/umae003",
        type: "Journal Article",
      },
      {
        title:
          "Automatic scoring of COVID-19 severity in X-ray imaging based on a novel deep learning workflow",
        url: "https://doi.org/10.1038/s41598-022-15013-z",
        type: "Journal Article",
      },
      {
        title:
          "Indirect supervision applied to COVID-19 and pneumonia classification",
        url: "https://doi.org/10.1016/j.imu.2021.100835",
        type: "Journal Article",
      },
    ],
    logoBrightness: 1.0,
  },
  {
    id: "polimi-research-scientist",
    title: "Senior Research Scientist",
    company: "Politecnico di Milano",
    type: "Full-time",
    category: "research",
    startDate: "2022-05-01",
    endDate: "2024-09-01",
    location: "Milan • Italy 🇮🇹",
    logo: "/experience/core-roles/polimi.webp",
    responsibilities: [
      "Collected, processed, and analyzed hyperspectral data at the Institute for Image-Guided Surgery, supporting experimental surgery projects in cancer ablation and treatment",
      "Developed advanced machine learning models for hyperspectral detection and clustering, enabling more precise identification of tumor margins and evaluation of treatment effectiveness",
    ],
    publications: [
      {
        title:
          "Advancing laser ablation assessment in hyperspectral imaging through machine learning",
        url: "https://doi.org/10.1016/j.compbiomed.2024.108849",
        type: "Journal Article",
      },
      {
        title: "HyperSIGHT",
        url: "https://www.laseroptimal.polimi.it/hypersight/",
        type: "Project Website",
      },
      {
        title: "LASER OPTIMAL",
        url: "https://cordis.europa.eu/project/id/759159",
        type: "ERC Grant",
      },
    ],
    logoBrightness: 1.1,
  },
  {
    id: "intelerad-senior-ml",
    title: "Senior Machine Learning Engineer",
    company: "Intelerad Medical Systems",
    type: "Full-time",
    category: "industry",
    startDate: "2020-04-01",
    endDate: "2022-09-01",
    location: "Montreal • Canada 🇨🇦",
    logo: "/experience/core-roles/intelerad.webp",
    responsibilities: [
      "Developing a model for obscuring faces and ears on 3D MRI/CT data for Biospective",
      "Creation of a contrast classification model using CT data for Bristol Myers Squibb",
      "Retraining and implementing the CLOVA OCR for medical text recognition",
      "Developing ML models for recognizing body parts, utilizing both MRI and CT data for Bristol Myers Squibb",
      "Implementing the CRAFT (Character-Region Awareness) text detector",
    ],
    publications: [],
    logoBrightness: 1.0,
  },
  {
    id: "tpu-research-scientist",
    title: "Senior Research Scientist",
    company: "Tomsk Polytechnic University",
    type: "Full-time",
    category: "research",
    startDate: "2016-03-01",
    endDate: "2022-08-01",
    location: "Tomsk • Russia 🇷🇺",
    logo: "/experience/core-roles/tpu.webp",
    responsibilities: [
      "Supervising a group of 5 developers in the creation of CV algorithms and ML models",
      "Designing a specialized deep learning model for segmenting medical devices in ultrasound for Boston Children's Hospital",
      "Building an automatic fire detection system utilizing machine learning techniques for the Incom Group",
      "Developing a multi-task learning based system for tracking aorta and catheter key points for Kemerovo Cardiology Center",
    ],
    publications: [
      {
        title: "Solution for minimally invasive heart valve replacement",
        url: "https://minzdrav.gov.ru/regional_news/13932-sovmestnaya-razrabotka-uchenyh-kemerova-i-tomska-pozvolit-provodit-maloinvazivnye-operatsii-po-zamene-klapana-serdtsa-bez-ispolzovaniya-importnyh-izdeliy",
        type: "News",
      },
      {
        title:
          "Use of semi-synthetic data for catheter segmentation improvement",
        url: "https://doi.org/10.1016/j.compmedimag.2023.102188",
        type: "Journal Article",
      },
      {
        title:
          "Aortography keypoint tracking for transcatheter aortic valve implantation based on multi-task learning",
        url: "https://doi.org/10.3389/fcvm.2021.697737",
        type: "Journal Article",
      },
      {
        title:
          "Real-time coronary artery stenosis detection based on modern neural networks",
        url: "https://doi.org/10.1038/s41598-021-87174-2",
        type: "Journal Article",
      },
      {
        title:
          "Efficient workflow for automatic segmentation of the right heart based on 2D echocardiography",
        url: "https://doi.org/10.1007/s10554-018-1314-4",
        type: "Journal Article",
      },
    ],
    logoBrightness: 1.1,
  },
  {
    id: "sibur-process-control",
    title: "Process Control Engineer",
    company: "SIBUR",
    type: "Full-time",
    category: "industry",
    startDate: "2015-05-01",
    endDate: "2017-05-01",
    location: "Tomsk • Russia 🇷🇺",
    logo: "/experience/core-roles/sibur.webp",
    responsibilities: [
      "Implementation of process control systems within petrochemical pipelines",
      "Maintenance and repair of measurement devices, as well as automated process control systems such as Siemens S300/400, Yokogawa Centum, Numerik PS2000 and Remicont",
    ],
    publications: [],
    logoBrightness: 1.0,
  },
];

// Visiting roles data configuration
const VISITING_ROLES_DATA = [
  {
    id: "sorbonne-visiting-prof",
    title: "Visiting Professor",
    company: "Sorbonne University",
    type: "Visiting",
    category: "research",
    startDate: "2025-03-01",
    endDate: "2025-04-01",
    location: "Paris • France 🇫🇷",
    logo: "/experience/visiting-roles/sorbonne.webp",
    responsibilities: [
      "Collaborated with the Neural Connectivity and Plasticity group on integrating neuroimaging (fMRI, PET, electrophysiology) with machine learning",
      "Presented research on non-invasive intracranial pressure prediction using photonics and AI as part of the SafeICP project",
      "Participated in hands-on training and interdisciplinary work on ML-based diagnostics for hydrocephalus and brain trauma",
      "Engaged with faculty including Prof. Dmitrii Todorov, Prof. Olivier Couture, and Prof. Lori Bridal to initiate future joint research and publications",
    ],
    publications: [
      {
        title: "Certificate of attendance",
        url: "https://drive.google.com/file/d/1HsBKzfXy9qrggTqh20Q4CQPxlxVy_dWe/view?usp=drive_link",
        type: "Certificate",
      },
    ],
    logoBrightness: 1.1,
  },
  {
    id: "leeds-research-fellow",
    title: "Data Scientist · Research Fellow",
    company: "University of Leeds",
    type: "Visiting",
    category: "research",
    startDate: "2019-02-01",
    endDate: "2019-08-01",
    location: "Leeds • United Kingdom 🇬🇧",
    logo: "/experience/visiting-roles/uol.webp",
    responsibilities: [
      "Designed and implemented an ML-driven system for automated stenosis detection and scoring, enhancing diagnostic precision and reproducibility in vascular imaging",
      "Advanced medical data synthesis using VAEs and GANs to overcome dataset scarcity and improve model generalization",
      "Collaborated with Prof. Alejandro F. Frangi on applied DL for cardiovascular imaging, contributing to publications in Scientific Reports and ISPRS Archives",
    ],
    publications: [
      {
        title: "Reference letter by prof. Alejandro F. Frangi",
        url: "https://drive.google.com/file/d/1JG56_Z3b_l810wcrfjgwe_Jq6QUIQr1I/view",
        type: "Reference Letter",
      },
      {
        title:
          "Real-time coronary artery stenosis detection based on modern neural networks",
        url: "https://doi.org/10.1038/s41598-021-87174-2",
        type: "Journal Article",
      },
      {
        title: "Ray-based segmentation algorithm for medical imaging",
        url: "https://doi.org/10.5194/isprs-archives-XLII-2-W12-37-2019",
        type: "Conference Paper",
      },
    ],
    logoBrightness: 1.1,
  },
  {
    id: "upm-research-fellow",
    title: "Data Scientist · Research Fellow",
    company: "Technical University of Madrid",
    type: "Visiting",
    category: "research",
    startDate: "2018-08-01",
    endDate: "2019-01-01",
    location: "Madrid • Spain 🇪🇸",
    logo: "/experience/visiting-roles/upm.webp",
    responsibilities: [
      "Developed an approach for semi-synthetic ultrasound data generation to enhance segmentation accuracy and robustness in medical imaging",
      "Implemented ML models for pulmonary emphysema detection and unsupervised biomedical image segmentation, improving interpretability and diagnostic automation",
      "Collaborated with Prof. Maria J. Ledesma-Carbayo on image reconstruction and data augmentation, contributing to publications in Computerized Medical Imaging and Graphics and ISPRS Archives",
    ],
    publications: [
      {
        title: "Reference letter by prof. Maria J. Ledesma-Carbayo",
        url: "https://drive.google.com/file/d/1RBCxGWQOzUe_7MWqtZRYgyylUgbRr3nK/view",
        type: "Reference Letter",
      },
      {
        title:
          "Use of semi-synthetic data for catheter segmentation improvement",
        url: "https://doi.org/10.1016/j.compmedimag.2023.102188",
        type: "Journal Article",
      },
      {
        title:
          "Boosting segmentation accuracy of the deep learning models based on the synthetic data generation",
        url: "https://doi.org/10.5194/isprs-archives-XLIV-2-W1-2021-33-2021",
        type: "Conference Paper",
      },
    ],
    logoBrightness: 1.0,
  },
  {
    id: "trento-research-fellow",
    title: "Data Scientist · Research Fellow",
    company: "University of Trento",
    type: "Visiting",
    category: "research",
    startDate: "2017-03-01",
    endDate: "2017-08-01",
    location: "Trento • Italy 🇮🇹",
    logo: "/experience/visiting-roles/uot.webp",
    responsibilities: [
      "Developed a volumetric ultrasound catheter detection and segmentation algorithm using SVM and texture-based features",
      "Designed and evaluated a feature selection method based on PDF/PMF area difference, benchmarked against established techniques",
      "Collaborated with Prof. Farid Melgani on biomedical signal processing research published in Biomedical Signal Processing and Control and Scientific Visualization",
    ],
    publications: [
      {
        title: "Reference letter by prof. Farid Melgani",
        url: "https://drive.google.com/file/d/1L_8GD3Lu-G7tRf4QXjimTENsSkiFzt76/view",
        type: "Reference Letter",
      },
      {
        title: "Feature selection algorithm based on PDF/PMF area difference",
        url: "https://doi.org/10.1016/j.bspc.2019.101681",
        type: "Journal Article",
      },
      {
        title:
          "Catheter detection and segmentation in volumetric ultrasound using SVM and GLCM",
        url: "https://doi.org/10.26583/sv.10.4.03",
        type: "Journal Article",
      },
    ],
    logoBrightness: 1.1,
  },
];

export default function Experience() {
  // Memoize processed experiences to prevent recalculation on every render
  const experiences = useMemo(
    () =>
      EXPERIENCES_DATA.map((exp) => ({
        ...exp,
        duration: calculateDuration(exp.startDate, exp.endDate),
        period: formatPeriod(exp.startDate, exp.endDate),
      })),
    [],
  );

  // Memoize processed visiting roles to prevent recalculation on every render
  const visitingRoles = useMemo(
    () =>
      VISITING_ROLES_DATA.map((role) => ({
        ...role,
        duration: calculateDuration(role.startDate, role.endDate),
        period: formatPeriod(role.startDate, role.endDate),
      })),
    [],
  );

  return (
    <main className="min-h-screen pt-24">
      <div className="flex flex-col items-center pt-12 md:pt-24 gap-12 pb-32">
        <section className="w-full max-w-7xl mx-auto px-6">
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-light mb-4">
              Core Roles
            </h1>
            <p className="text-gray-400 mt-3 max-w-3xl mx-auto leading-relaxed">
              Leadership and engineering roles spanning AI, machine learning,
              data science, computer vision, and biomedical imaging across
              research and industry
            </p>
          </header>

          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:items-start"
            role="list"
          >
            {experiences.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
        </section>

        {/* Visiting Roles Section */}
        <section className="w-full max-w-7xl mx-auto px-6 mt-16">
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-light mb-4">
              Visiting Roles
            </h1>
            <p className="text-gray-400 mt-3 max-w-3xl mx-auto leading-relaxed">
              Collaborative research contributions in machine learning, AI, and
              biomedical imaging through short- and mid-term academic
              engagements
            </p>
          </header>

          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:items-start"
            role="list"
          >
            {visitingRoles.map((role) => (
              <ExperienceCard key={role.id} experience={role} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
