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
    id: "upf-professor",
    title: "Research Professor",
    company: "Pompeu Fabra University",
    type: "Full-time",
    category: "research",
    startDate: "2023-06-01",
    endDate: null,
    location: "Barcelona • Spain 🇪🇸",
    logo: "/experience/core-roles/upf.svg",
    summary:
      "Leading the ML on SafeICP, which reads intracranial pressure from blood flow without surgery, and on Huawei's depth-aware video bokeh, which runs on a phone; mentoring 2 PhD students and a post-doc",
    responsibilities: [
      "Lead the ML on SafeICP with the Institute of Photonic Sciences and surgeons at Vall d'Hebron: intracranial pressure from blood flow, no surgery, at 5.3 mmHg mean error against the invasive probe",
      "Build the training data and the depth baseline for Huawei's depth-aware video bokeh, a model that has to run on the phone inside a 100 GFLOP budget",
      "Mentor 2 PhD students and a post-doc on time-series and medical ML",
    ],
    links: [
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
    ],
    logoBrightness: 1.0,
  },
  {
    id: "symfa-cto",
    title: "Chief Technology Officer",
    company: "Symfa",
    type: "Full-time",
    category: "industry",
    startDate: "2024-11-01",
    endDate: "2026-11-01",
    location: "Miami • United States 🇺🇸",
    logo: "/experience/core-roles/symfa.svg",
    summary:
      "Led an R&D group of 5 developers and researchers in AI, ML and agents, and served as the architect and lead engineer on the InsurTech systems it built for AmTrust, CNA, Lumos Insurance and GNP",
    responsibilities: [
      "Led an R&D group of 5 developers and researchers in AI, ML and agents, and acted as architect and lead engineer on the InsurTech systems it built for AmTrust, CNA, Lumos Insurance and GNP",
      "Shipped a multi-tenant compliance platform for construction insurance: 4 web apps, a FastAPI backend, and an OCR worker that grades coverage",
      "Built 6 InsurTech prototypes for claim intake, fraud scoring, pricing and forecasting; about half were taken into client work",
      "Cut claim intake to about a minute per form in testing, from a carrier baseline of 107,000 claims a year keyed by 30 staff, using OCR and LLM mapping with confidence checks",
      "Built explainability into every model with AutoGluon and SHAP, ranking the drivers behind each fraud score and premium",
    ],
    links: [
      {
        title: "InsurTech Intelligence",
        url: "https://insurtech-intelligence.symfa.ai/",
        type: "Prototypes",
      },
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
    id: "quantori-lead-ml",
    title: "Lead Machine Learning Engineer",
    company: "Quantori",
    type: "Full-time",
    category: "industry",
    startDate: "2020-11-01",
    endDate: "2025-11-01",
    location: "Cambridge • United States 🇺🇸",
    logo: "/experience/core-roles/quantori.svg",
    summary:
      "Led 6 developers in ML and computer vision: tumor immune phenotyping for Boehringer Ingelheim, chromosomal instability for Volastra, and explainable chest radiography for Beth Israel",
    responsibilities: [
      "Led 6 developers across ML, data science and computer vision for pharma and hospital clients",
      "Turned histopathology slides into tumor immune phenotypes for Boehringer Ingelheim at 89% F1, replacing a pathologist's manual read",
      "Built the microscopy readout Volastra Therapeutics used to track chromosomal instability and drug response: nuclei, micronuclei, mitosis and apoptosis at 85% and 66% mAP",
      "Delivered three chest X-ray models for Beth Israel Deaconess: 84% accuracy on COVID and pneumonia, severity at 0.30 MAE out of 6, and the lung regions behind each call",
      "Ran data collection and label review with practicing radiologists, pathologists and cardiologists, giving every model clinical-grade ground truth",
    ],
    links: [
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
    logo: "/experience/core-roles/polimi.svg",
    summary:
      "Built hyperspectral ML that finds tumor margins and grades laser ablation for the ERC project LASER OPTIMAL, and turned prosthetic heart valve design into an optimization search",
    responsibilities: [
      "Built the hyperspectral pipeline that finds tumor margins and grades laser ablation on 100-band images, with Faster R-CNN at 74.4% mAP on PCA-transformed reflectance data",
      "Ran the data collection in experimental surgery at the Institute for Image-Guided Surgery and Cardinale Panico Hospital, training the models on tissue imaged during the procedure",
      "Turned prosthetic heart valve design from hand iteration into an optimization search for the Kemerovo Cardiology Center, across 11,500+ FEM-evaluated geometries at 95% design efficacy",
    ],
    links: [
      {
        title:
          "Advancing laser ablation assessment in hyperspectral imaging through machine learning",
        url: "https://doi.org/10.1016/j.compbiomed.2024.108849",
        type: "Journal Article",
      },
      {
        title:
          "Perfect prosthetic heart valve: Generative design with machine learning, modeling, and optimization",
        url: "https://doi.org/10.3389/fbioe.2023.1238130",
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
        type: "ERC Project",
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
    logo: "/experience/core-roles/intelerad.svg",
    summary:
      "Built ML on MRI and CT: de-identification running in Biospective's PACS, contrast classification and body part recognition for Bristol Myers Squibb, and medical text OCR",
    responsibilities: [
      "Built the de-identification model Biospective runs in PACS: faces and ears gone from CT and MRI at 96% and 94% accuracy, keeping every intracranial voxel behind a 2 mm margin",
      "Added contrast classification and body part recognition on CT and MRI for Bristol Myers Squibb, sorting trial scans before anyone opened them",
      "Brought medical text recognition into the product, retraining CLOVA OCR and adding the CRAFT detector for text regions",
    ],
    links: [
      {
        title: "Deep Deface",
        url: "https://vdanilov.com/portfolio/deep-deface",
        type: "Project Overview",
      },
    ],
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
    logo: "/experience/core-roles/tpu.svg",
    summary:
      "Supervised 5 developers on stenosis detection running in live surgery and TAVI tracking for the Kemerovo Cardiology Center, and catheter segmentation in ultrasound for Boston Children's Hospital",
    responsibilities: [
      "Supervised 5 developers on computer vision and ML across cardiology, pediatric surgery and industry",
      "Developed real-time coronary stenosis detection that runs in live surgery at the Kemerovo Cardiology Center, at 94% mAP and 10 FPS",
      "Tracked aorta and catheter keypoints for TAVI at 97% accuracy and 90 FPS, guiding valve placement during surgery",
      "Segmented catheters in 3D ultrasound for Boston Children's Hospital at 93.6% Dice, 13 points above U-Net, despite speckle and low resolution",
      "Built wildfire detection from video at 95.6% accuracy and 9 FPS, over remote Siberian forest",
    ],
    links: [
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
    logo: "/experience/core-roles/sibur.svg",
    summary:
      "Implemented, maintained and repaired process control systems and field instrumentation across petrochemical pipelines on Siemens PLC and Yokogawa DCS platforms",
    responsibilities: [
      "Implementation of process control systems within petrochemical pipelines",
      "Maintenance and repair of measurement devices, as well as automated process control systems such as Siemens S300/400, Yokogawa Centum, Numerik PS2000 and Remicont",
    ],
    links: [],
    logoBrightness: 1.0,
  },
];

// Visiting roles data configuration
const VISITING_ROLES_DATA = [
  {
    id: "pretoria-visiting-prof",
    title: "Visiting Professor",
    company: "University of Pretoria",
    type: "Visiting",
    category: "research",
    startDate: "2026-09-01",
    endDate: "2026-10-01",
    location: "Pretoria • South Africa 🇿🇦",
    logo: "/experience/visiting-roles/uop.svg",
    summary:
      "Hosted by Prof. Olawande Daramola on an A4U Erasmus+ mobility grant, covering machine learning, applied AI and translational research, and presenting non-invasive intracranial pressure monitoring",
    responsibilities: [
      "Visited Prof. Olawande Daramola's group on an A4U Erasmus+ staff mobility grant, on machine learning, applied AI and translational research",
      "Presented the SafeICP work on non-invasive brain pressure from photonic sensors",
      "Invited to judge International Students’ Day 2026 and to speak at the Embassy of Spain in Pretoria",
    ],
    links: [],
    logoBrightness: 1.0,
  },
  {
    id: "sapienza-visiting-prof",
    title: "Visiting Professor",
    company: "Sapienza University of Rome",
    type: "Visiting",
    category: "research",
    startDate: "2026-05-11",
    endDate: "2026-05-15",
    location: "Rome • Italy 🇮🇹",
    logo: "/experience/visiting-roles/sapienza.svg",
    summary:
      "Worked with Prof. Irene Amerini's ALCOR Lab on computer vision, pattern recognition and multimodal AI, and presented non-invasive intracranial pressure from near-infrared photonics",
    responsibilities: [
      "Visited Prof. Irene Amerini's ALCOR Lab on computer vision, pattern recognition and multimodal AI",
      "Presented “Illuminating the black box”, on non-invasive intracranial pressure from near-infrared photonics and deep learning",
      "Mapped where the ALCOR Lab's computer vision meets BCN MedTech's biomedical signal processing, for non-invasive clinical monitoring",
    ],
    links: [
      {
        title: "Certificate of attendance",
        url: "/documents/certificate-of-attendance-sapienza.pdf",
        type: "Certificate",
      },
      {
        title:
          "Illuminating the black box: Non-invasive intracranial pressure estimation via near-infrared photonics and deep learning",
        url: "https://www.diag.uniroma1.it/node/30655",
        type: "Seminar",
      },
      {
        title: "SafeICP",
        url: "https://safe-icp.vercel.app/",
        type: "Project Website",
      },
    ],
    logoBrightness: 1.0,
  },
  {
    id: "groningen-visiting-prof",
    title: "Visiting Professor",
    company: "University of Groningen",
    type: "Visiting",
    category: "research",
    startDate: "2026-04-13",
    endDate: "2026-04-17",
    location: "Groningen • Netherlands 🇳🇱",
    logo: "/experience/visiting-roles/uog.svg",
    summary:
      "Worked with Prof. George Azzopardi at the Bernoulli Institute on machine learning, computer vision and predictive modeling, and lectured on non-invasive brain pressure monitoring",
    responsibilities: [
      "Visited Prof. George Azzopardi at the Bernoulli Institute on machine learning, computer vision and predictive modeling",
      "Presented “A Safe Window Into Brain Pressure”, on reading intracranial pressure without surgery",
      "Ran knowledge-exchange sessions with the institute's researchers on AI and ML for biomedical work",
    ],
    links: [
      {
        title: "Certificate of attendance",
        url: "/documents/certificate-of-attendance-groningen.pdf",
        type: "Certificate",
      },
      {
        title: "A Safe Window Into Brain Pressure",
        url: "https://www.rug.nl/jantina-tammes-school/calendar/2026/safe-window-into-brain-pressure",
        type: "Seminar",
      },
      {
        title: "SafeICP",
        url: "https://safe-icp.vercel.app/",
        type: "Project Website",
      },
    ],
    logoBrightness: 1.0,
  },
  {
    id: "sorbonne-visiting-prof",
    title: "Visiting Professor",
    company: "Sorbonne University",
    type: "Visiting",
    category: "research",
    startDate: "2025-03-01",
    endDate: "2025-04-01",
    location: "Paris • France 🇫🇷",
    logo: "/experience/visiting-roles/sorbonne.svg",
    summary:
      "Joined the Laboratory of Biomedical Imaging on combining fMRI, PET and electrophysiology with ML for hydrocephalus and brain trauma, and presented SafeICP work on non-invasive brain pressure",
    responsibilities: [
      "Visited the Laboratory of Biomedical Imaging on joining neuroimaging, fMRI, PET and electrophysiology, with machine learning",
      "Presented the SafeICP work on non-invasive intracranial pressure from photonics and AI",
      "Worked on ML diagnostics for hydrocephalus and brain trauma with Prof. Dmitrii Todorov and Prof. Lori Bridal",
    ],
    links: [
      {
        title: "Certificate of attendance",
        url: "/documents/certificate-of-attendance-sorbonne.pdf",
        type: "Certificate",
      },
      {
        title: "SafeICP",
        url: "https://safe-icp.vercel.app/",
        type: "Project Website",
      },
    ],
    logoBrightness: 1.1,
  },
  {
    id: "leeds-research-fellow",
    title: "Visiting Research Scientist",
    company: "University of Leeds",
    type: "Visiting",
    category: "research",
    startDate: "2019-01-01",
    endDate: "2019-08-01",
    location: "Leeds • United Kingdom 🇬🇧",
    logo: "/experience/visiting-roles/uol.svg",
    summary:
      "Built automated coronary stenosis detection and scoring with Prof. Alejandro Frangi, and used VAEs and GANs to synthesize training data and overcome dataset scarcity in vascular imaging",
    responsibilities: [
      "Built automated stenosis detection and scoring for vascular imaging with Prof. Alejandro Frangi",
      "Synthesized medical data with VAEs and GANs to get past dataset scarcity and make models generalize",
      "Designed a ray-based segmentation method for MRI, reaching up to 91.8% Dice on cardiac ventricles and 89.5% on brain tumors in milliseconds",
    ],
    links: [
      {
        title: "Reference letter by prof. Alejandro F. Frangi",
        url: "/documents/reference-letter-alejandro-frangi.pdf",
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
    title: "Visiting Research Scientist",
    company: "Technical University of Madrid",
    type: "Visiting",
    category: "research",
    startDate: "2018-08-01",
    endDate: "2019-01-01",
    location: "Madrid • Spain 🇪🇸",
    logo: "/experience/visiting-roles/upm.svg",
    summary:
      "Generated semi-synthetic ultrasound data to improve segmentation robustness, and built models for pulmonary emphysema detection and unsupervised segmentation with Prof. Maria Ledesma-Carbayo",
    responsibilities: [
      "Designed a pipeline that turns real ultrasound scans into semi-synthetic training data, making segmentation more accurate and more robust",
      "Built models for pulmonary emphysema detection and unsupervised biomedical image segmentation",
      "Worked with Prof. Maria J. Ledesma-Carbayo on image reconstruction and data augmentation",
    ],
    links: [
      {
        title: "Reference letter by prof. Maria J. Ledesma-Carbayo",
        url: "/documents/reference-letter-maria-ledesma-carbayo.pdf",
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
    title: "Visiting Research Scientist",
    company: "University of Trento",
    type: "Visiting",
    category: "research",
    startDate: "2017-03-01",
    endDate: "2017-08-01",
    location: "Trento • Italy 🇮🇹",
    logo: "/experience/visiting-roles/uot.svg",
    summary:
      "Built catheter detection and segmentation in 3D ultrasound using support vector machines and texture features, and benchmarked a new feature selection method with Prof. Farid Melgani",
    responsibilities: [
      "Built volumetric ultrasound catheter detection and segmentation on SVM and texture features",
      "Designed a feature selection method on the area between distributions, benchmarked against the established ones",
      "Worked with Prof. Farid Melgani on biomedical signal processing",
    ],
    links: [
      {
        title: "Reference letter by prof. Farid Melgani",
        url: "/documents/reference-letter-farid-melgani.pdf",
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
      EXPERIENCES_DATA.map((exp, index) => ({
        ...exp,
        duration: calculateDuration(exp.startDate, exp.endDate),
        period: formatPeriod(exp.startDate, exp.endDate),
        logoPriority: index < 4,
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
        logoPriority: false,
      })),
    [],
  );

  return (
    <main className="min-h-screen pt-24">
      <div className="flex flex-col items-center pt-12 md:pt-24 gap-36 pb-48">
        <section className="w-full max-w-7xl mx-auto px-6">
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-light mb-4">
              Core Positions
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

        {/* Visiting Positions Section */}
        <section className="w-full max-w-7xl mx-auto px-6">
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-light mb-4">
              Visiting Positions
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
