const PROJECTS_DATA = [
  {
    id: "insurecast",
    title: "InsureCast",
    description:
      "Time-series forecasting dashboard for monthly insurance claims and costs using SARIMAX seasonal models, scenario stress-testing, and AI-generated summaries.",
    category: "insurtech",
    image: "/portfolio/previews/insurecast.jpg",
    date: "2026-04",
    featured: false,
  },
  {
    id: "insurance-pricing",
    title: "Insurance Pricing",
    description:
      "End-to-end ML app for predicting annual insurance charges with SHAP explainability and LLM-powered interpretation for business and technical users.",
    category: "insurtech",
    image: "/portfolio/previews/insurance-pricing.jpg",
    date: "2026-03",
    featured: false,
  },
  {
    id: "risk-profiler",
    title: "Risk Profiler",
    description:
      "ML prototype for insurance claim fraud risk profiling using AutoGluon ensembles, SHAP explainability, and LLM-generated assessment summaries.",
    category: "insurtech",
    image: "/portfolio/previews/risk-profiler.jpg",
    date: "2026-03",
    featured: false,
  },
  {
    id: "deep-brainwatch",
    title: "Deep BrainWatch",
    description:
      "Non-invasive ICP monitoring using deep learning on cerebral blood flow signals from near-infrared photonic sensors.",
    category: "medical-devices",
    image: "/portfolio/previews/deep-brainwatch.jpg",
    date: "2025-12",
    featured: true,
  },
  {
    id: "claim-assistant",
    title: "Claim Assistant",
    description:
      "AI-powered insurance claim intake automation using Azure Document Intelligence and GPT-5 for extraction, policy matching, and confidence-scored coverage analysis.",
    category: "insurtech",
    image: "/portfolio/previews/claim-assistant.jpg",
    date: "2025-12",
    featured: true,
  },
  {
    id: "hypervision-ablation",
    title: "HyperVision Ablation",
    description:
      "ML workflow for tissue ablation assessment in hyperspectral imaging using PCA, Faster R-CNN, and Mean Shift clustering.",
    category: "biomedical-research",
    image: "/portfolio/previews/hypervision-ablation.jpg",
    date: "2024-07",
    featured: true,
  },
  {
    id: "sales-pilot",
    title: "Sales Pilot",
    description:
      "AI-powered lead scoring system using hybrid heuristics and OpenAI embeddings to automate and prioritize high-fit leads at scale.",
    category: "industry-ai-ml",
    image: "/portfolio/previews/sales-pilot.jpg",
    date: "2025-05",
    featured: false,
  },
  {
    id: "coronary-insight",
    title: "Coronary Insight",
    description:
      "Deep learning pipeline for OCT plaque segmentation, enabling precise arterial risk assessment in cardiovascular imaging.",
    category: "medical-imaging",
    image: "/portfolio/previews/coronary-insight.jpg",
    date: "2025-06",
    featured: true,
  },
  {
    id: "immune-profiler",
    title: "Immune Profiler",
    description:
      "ML-driven workflow for tumor immune phenotype classification using HoVer-Net and AutoML on histopathology images.",
    category: "biomedical-research",
    image: "/portfolio/previews/immune-profiler.jpg",
    date: "2024-06",
    featured: false,
  },
  {
    id: "histo-scanner",
    title: "Histo Scanner",
    description:
      "Deep learning pipeline for segmenting microvascular features in tissue-engineered vascular grafts with 89% Dice score.",
    category: "biomedical-research",
    image: "/portfolio/previews/histo-scanner.jpg",
    date: "2024-05",
    featured: false,
  },
  {
    id: "pulmovision",
    title: "PulmoVision",
    description:
      "Explainable AI framework for detecting pulmonary edema features in chest X-rays using deep learning segmentation and object detection.",
    category: "medical-imaging",
    image: "/portfolio/previews/pulmovision.jpg",
    date: "2024-03",
    featured: true,
  },
  {
    id: "provalve-design",
    title: "ProValve Design",
    description:
      "ML-driven generative design framework for prosthetic heart valves using optimization algorithms, achieving 95% design efficacy.",
    category: "medical-devices",
    image: "/portfolio/previews/provalve-design.jpg",
    date: "2023-09",
    featured: false,
  },
  {
    id: "sonoguide",
    title: "SonoGuide",
    description:
      "Deep learning solution for surgical tool segmentation in 3D ultrasound, achieving 93.6% Dice score for real-time catheter localization.",
    category: "image-guided-surgery",
    image: "/portfolio/previews/sonoguide.jpg",
    date: "2023-02",
    featured: true,
  },
  {
    id: "pulmoscore",
    title: "PulmoScore",
    description:
      "Two-stage ML workflow for COVID-19 severity scoring on chest X-rays, achieving MAE of 0.30 and 11× faster processing.",
    category: "medical-imaging",
    image: "/portfolio/previews/pulmoscore.jpg",
    date: "2022-07",
    featured: false,
  },
  {
    id: "pulmolens",
    title: "PulmoLens",
    description:
      "Attention-guided deep learning for COVID-19 and pneumonia detection in chest X-rays, achieving 84% accuracy with Grad-CAM supervision.",
    category: "medical-imaging",
    image: "/portfolio/previews/pulmolens.jpg",
    date: "2022-01",
    featured: false,
  },
  {
    id: "deep-deface",
    title: "Deep Deface",
    description:
      "GPU-accelerated 3D anonymization pipeline for CT and MRI scans, detecting and blurring facial/ear regions while preserving 100% of brain anatomy.",
    category: "medical-imaging",
    image: "/portfolio/previews/deep-deface.jpg",
    date: "2021-09",
    featured: false,
  },
  {
    id: "tavi-pinpoint",
    title: "TAVI PinPoint",
    description:
      "Real-time landmark tracking for safer valve implantation during TAVI procedures using multi-task deep learning with 97% accuracy.",
    category: "image-guided-surgery",
    image: "/portfolio/previews/tavi-pinpoint.jpg",
    date: "2021-07",
    featured: false,
  },
  {
    id: "stenosis-spotter",
    title: "Stenosis Spotter",
    description:
      "Real-time coronary stenosis detection using deep learning for intraoperative angiographic image analysis with 0.94 mAP.",
    category: "image-guided-surgery",
    image: "/portfolio/previews/stenosis-spotter.jpg",
    date: "2021-04",
    featured: false,
  },
  {
    id: "oncocell-vision",
    title: "OncoCell Vision",
    description:
      "AI-powered microscopy pipeline for detecting and counting cancer cell biomarkers using EfficientDet, achieving 85% mAP for nuclei detection.",
    category: "biomedical-research",
    image: "/portfolio/previews/oncocell-vision.jpg",
    date: "2021-01",
    featured: false,
  },
  {
    id: "deep-anatomy",
    title: "Deep Anatomy",
    description:
      "High-precision 3D organ segmentation via V-net architecture with dense skip connections, achieving up to 96% Dice score across 5 anatomical structures.",
    category: "medical-imaging",
    image: "/portfolio/previews/deep-anatomy.jpg",
    date: "2020-07",
    featured: false,
  },
  {
    id: "deepvision-wildfire",
    title: "DeepVision Wildfire",
    description:
      "Real-time wildfire detection system for Siberian forests combining EfficientDet and CNN-RNN, achieving 95.6% accuracy at 9 FPS.",
    category: "industry-ai-ml",
    image: "/portfolio/previews/deepvision-wildfire.jpg",
    date: "2019-07",
    featured: false,
  },
  {
    id: "raytrace-segment",
    title: "RayTrace Segment",
    description:
      "Ray-casting segmentation algorithm for convex anatomical structures in MRI, achieving up to 91.8% Dice score with millisecond-level runtime.",
    category: "medical-imaging",
    image: "/portfolio/previews/raytrace-segment.jpg",
    date: "2019-05",
    featured: false,
  },
];

// Newest first; the portfolio filters keep this order
export const PROJECTS = [...PROJECTS_DATA].sort(
  (a, b) => new Date(b.date) - new Date(a.date),
);

// The project that follows `id` in its own category, wrapping round at the end;
// a category with a single project falls back to the whole list
export function getNextProject(id) {
  const current = PROJECTS.find((project) => project.id === id);
  if (!current) throw new Error(`Unknown project: ${id}`);
  const sameCategory = PROJECTS.filter(
    (project) => project.category === current.category,
  );
  const pool = sameCategory.length > 1 ? sameCategory : PROJECTS;
  const index = pool.findIndex((project) => project.id === id);
  return pool[(index + 1) % pool.length];
}
