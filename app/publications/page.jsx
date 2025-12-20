"use client";

import React from "react";
import PublicationCard from "@/components/PublicationCard";

// Journal Articles Data
const JOURNAL_ARTICLES = [
  {
    id: "journal-1",
    title:
      "Segmentation and quantification of atherosclerotic plaques in optical coherence tomography",
    venue: "Computers in Biology and Medicine",
    year: "2025",
    url: "https://doi.org/10.1016/j.compbiomed.2025.111061",
    type: "Journal",
    tags: ["Computer Vision", "Medical Imaging", "Deep Learning"],
  },
  {
    id: "journal-2",
    title:
      "Optimized aortic root segmentation during transcatheter aortic valve implantation",
    venue: "Frontiers in Cardiovascular Medicine",
    year: "2025",
    url: "https://doi.org/10.3389/fcvm.2025.1602780",
    type: "Journal",
    tags: ["Segmentation", "Medical Imaging", "Cardiology"],
  },
  {
    id: "journal-3",
    title:
      "Advancing laser ablation assessment in hyperspectral imaging through machine learning",
    venue: "Computers in Biology and Medicine",
    year: "2024",
    url: "https://doi.org/10.1016/j.compbiomed.2024.108849",
    type: "Journal",
    tags: ["Machine Learning", "Hyperspectral Imaging", "Medical Imaging"],
  },
  {
    id: "journal-4",
    title:
      "ML-driven segmentation of microvascular features during histological examination of vascular grafts",
    venue: "Frontiers in Bioengineering and Biotechnology",
    year: "2024",
    url: "https://doi.org/10.3389/fbioe.2024.1411680",
    type: "Journal",
    tags: ["Machine Learning", "Bioengineering", "Histology"],
  },
  {
    id: "journal-5",
    title:
      "Explainable AI to identify radiographic features of pulmonary edema",
    venue: "Radiology Advances",
    year: "2024",
    url: "https://doi.org/10.1093/radadv/umae003",
    type: "Journal",
    tags: ["Explainable AI", "Radiology", "Deep Learning"],
  },
  {
    id: "journal-6",
    title:
      "Perfect prosthetic heart valve: Generative design with machine learning, modeling, and optimization",
    venue: "Frontiers in Bioengineering and Biotechnology",
    year: "2023",
    url: "https://doi.org/10.3389/fbioe.2023.1238130",
    type: "Journal",
    tags: ["Generative Design", "Optimization", "Biomedical Engineering"],
  },
  {
    id: "journal-7",
    title: "Use of semi-synthetic data for catheter segmentation improvement",
    venue: "Computerized Medical Imaging and Graphics",
    year: "2023",
    url: "https://doi.org/10.1016/j.compmedimag.2023.102188",
    type: "Journal",
    tags: ["Data Augmentation", "Medical Imaging", "Segmentation"],
  },
  {
    id: "journal-8",
    title:
      "Cardiovascular and renal comorbidities in neural networks predict COVID-19 ICU outcomes",
    venue: "Journal of Cardiovascular Development and Disease",
    year: "2023",
    url: "https://doi.org/10.3390/jcdd10020039",
    type: "Journal",
    tags: ["Neural Networks", "COVID-19", "Clinical Prediction"],
  },
  {
    id: "journal-9",
    title:
      "FABRIKx: Tackling the inverse kinematics problem of continuum robots with variable curvature",
    venue: "Robotics",
    year: "2022",
    url: "https://doi.org/10.3390/robotics11060128",
    type: "Journal",
    tags: ["Robotics", "Inverse Kinematics", "Algorithms"],
  },
  {
    id: "journal-10",
    title:
      "Automatic scoring of COVID-19 severity in X-ray imaging based on a novel deep learning workflow",
    venue: "Scientific Reports",
    year: "2022",
    url: "https://doi.org/10.1038/s41598-022-15013-z",
    type: "Journal",
    tags: ["Deep Learning", "COVID-19", "Medical Imaging"],
  },
  {
    id: "journal-11",
    title:
      "Indirect supervision applied to COVID-19 and pneumonia classification",
    venue: "Informatics in Medicine Unlocked",
    year: "2022",
    url: "https://doi.org/10.1016/j.imu.2021.100835",
    type: "Journal",
    tags: ["Weakly Supervised Learning", "COVID-19", "Classification"],
  },
  {
    id: "journal-12",
    title:
      "Aortography keypoint tracking for transcatheter aortic valve implantation based on multi-task learning",
    venue: "Frontiers in Cardiovascular Medicine",
    year: "2021",
    url: "https://doi.org/10.3389/fcvm.2021.697737",
    type: "Journal",
    tags: ["Multi-Task Learning", "Medical Imaging", "Keypoint Detection"],
  },
  {
    id: "journal-13",
    title:
      "Real-time coronary artery stenosis detection based on modern neural networks",
    venue: "Scientific Reports",
    year: "2021",
    url: "https://doi.org/10.1038/s41598-021-87174-2",
    type: "Journal",
    tags: ["Real-Time Detection", "Neural Networks", "Cardiology"],
  },
  {
    id: "journal-14",
    title: "Feature selection algorithm based on PDF/PMF area difference",
    venue: "Biomedical Signal Processing and Control",
    year: "2020",
    url: "https://doi.org/10.1016/j.bspc.2019.101681",
    type: "Journal",
    tags: ["Feature Selection", "Signal Processing", "Algorithms"],
  },
];

// Conference Proceedings Data
const CONFERENCE_PROCEEDINGS = [
  {
    id: "conference-1",
    title:
      "Non-invasive intracranial pressure estimation from cerebral blood flow dynamics using wavelet-based deep learning",
    venue: "European Conferences on Biomedical Optics",
    location: "Munich, Germany 🇩🇪",
    year: "2025",
    url: "https://doi.org/10.1364/ECBO.2025.W5B.5",
    type: "Conference",
    tags: ["Biophotonics", "Deep Learning", "Medical Devices"],
  },
  {
    id: "conference-2",
    title:
      "Intracranial pressure and cerebral blood flow pulse dynamics in patients with idiopathic normal pressure hydrocephalus during Katzman infusion test",
    venue: "European Conferences on Biomedical Optics",
    location: "Munich, Germany 🇩🇪",
    year: "2025",
    url: "https://doi.org/10.1364/ECBO.2025.S4F.2",
    type: "Conference",
    tags: ["Biophotonics", "Clinical Study", "Hydrocephalus"],
  },
  {
    id: "conference-3",
    title:
      "Hybrid convolutional and recurrent neural network for non-invasive ICP estimation from CBF", // "Hybrid convolutional and recurrent neural network for non-invasive intracranial pressure estimation from cerebral blood flow"
    venue: "Optica Biophotonics Congress",
    location: "Miami, United States 🇺🇸",
    year: "2024",
    url: "https://doi.org/10.1364/brain.2024.btu3c.7",
    type: "Conference",
    tags: ["Time Series", "Deep Learning", "Biomedical Optics"],
  },
  {
    id: "conference-4",
    title:
      "Boosting segmentation accuracy of the deep learning models based on the synthetic data generation",
    venue: "ISPRS Workshop on Computer Vision Techniques", // International Workshop on Photogrammetric & Computer Vision Techniques
    location: "Moscow, Russia 🇷🇺",
    year: "2021",
    url: "https://doi.org/10.5194/isprs-archives-xliv-2-w1-2021-33-2021",
    type: "Conference",
    tags: ["Synthetic Data", "Deep Learning", "Medical Imaging"],
  },
  {
    id: "conference-5",
    title:
      "Comparative study of deep learning models for automatic coronary stenosis detection",
    venue: "GraphiCon", // International Conference on Computer Graphics and Vision
    location: "Saint Petersburg, Russia 🇷🇺",
    year: "2020",
    url: "https://doi.org/10.51130/graphicon-2020-2-3-75",
    type: "Conference",
    tags: ["Deep Learning", "Medical Imaging", "Stenosis Detection"],
  },
  {
    id: "conference-6",
    title: "FABRIK-based inverse kinematics for multi-section continuum robots",
    venue: "International Conference on Mechatronics",
    location: "Brno, Czech Republic 🇨🇿",
    year: "2019",
    url: "https://ieeexplore.ieee.org/document/8624888",
    type: "Conference",
    tags: ["Robotics", "Inverse Kinematics", "Continuum Robots"],
  },
];

// Posts Data
const POSTS = [
  {
    id: "post-1",
    title:
      "Testing AI low-code platforms: What actually worked and what didn't",
    venue: "Symfa Blog",
    year: "2025",
    url: "https://symfa.com/blog/ai-low-code-tools",
    type: "Blog Post",
    tags: ["AI Tools", "Low-Code", "Product Development"],
  },
  {
    id: "post-2",
    title: "The future of business challenges: People + AI or People vs AI",
    venue: "LinkedIn",
    year: "2025",
    url: "https://www.linkedin.com/posts/viacheslav-danilov_the-future-of-business-challenges-activity-7315342704802959379-spfI",
    type: "Blog Post",
    tags: ["AI Development", "Leadership", "Digital Transformation"],
  },
  {
    id: "post-3",
    title:
      "Freelance tech trends: Top IT skills, pay rates, and regional demand",
    venue: "Symfa Blog",
    year: "2025",
    url: "https://symfa.com/blog/top-skills-in-demand-in-gig-economy",
    type: "Blog Post",
    tags: ["Data Analysis", "Tech Trends", "Market Research"],
  },
  {
    id: "post-4",
    title:
      "Freelance pricing trends: Industry, location, and expertise insights",
    venue: "Symfa Blog",
    year: "2025",
    url: "https://symfa.com/blog/insights-and-trends-in-the-gig-economy",
    type: "Blog Post",
    tags: ["Data Analysis", "Tech Trends", "Market Research"],
  },
  {
    id: "post-5",
    title:
      "Transforming chaotic data into clarity: Practical insights and a streamlined pipeline",
    venue: "Medium",
    year: "2024",
    url: "https://medium.com/@symfa_stories/from-data-chaos-to-clarity-streamlining-a-freelance-platform-dataset-96534c6af1fc",
    type: "Blog Post",
    tags: ["Data Engineering", "ETL Pipeline", "Data Science"],
  },
  {
    id: "post-6",
    title:
      "Harnessing AI for histopathology: A leap towards precision medicine",
    venue: "Quantori Blog",
    year: "2024",
    url: "https://quantori.com/blog/harnessing-ai-for-histopathology-a-leap-towards-precision-medicine",
    type: "Blog Post",
    tags: ["Digital Pathology", "Precision Medicine", "Medical AI"],
  },
];

// Datasets Data
const DATASETS = [
  {
    id: "dataset-1",
    title:
      "OCT dataset for segmentation of atherosclerotic plaque morphological features",
    venue: "Zenodo",
    year: "2025",
    url: "https://doi.org/10.5281/zenodo.14478209",
    type: "Dataset",
    tags: ["OCT Imaging", "Atherosclerosis", "Segmentation"],
  },
  {
    id: "dataset-2",
    title:
      "Histological dataset for microvascular segmentation of tissue-engineered vascular grafts",
    venue: "Zenodo",
    year: "2024",
    url: "https://doi.org/10.5281/zenodo.10838383",
    type: "Dataset",
    tags: ["Histology", "Vascular Grafts", "Segmentation"],
  },
  {
    id: "dataset-3",
    title:
      "Hyperspectral imaging dataset for laser thermal ablation monitoring in vital organs",
    venue: "Zenodo",
    year: "2023",
    url: "https://doi.org/10.5281/zenodo.10444212",
    type: "Dataset",
    tags: ["Hyperspectral Imaging", "Laser Ablation", "Medical Imaging"],
  },
  {
    id: "dataset-4",
    title:
      "Dataset for detection and segmentation of the radiographic features of pulmonary edema",
    venue: "Zenodo",
    year: "2023",
    url: "https://doi.org/10.5281/zenodo.8383776",
    type: "Dataset",
    tags: ["Chest X-ray", "Pulmonary Edema", "Segmentation"],
  },
  {
    id: "dataset-5",
    title: "COVID-19 segmentation and severity scoring",
    venue: "Mendeley Data",
    year: "2022",
    url: "http://doi.org/10.17632/36fjrg9s69.1",
    type: "Dataset",
    tags: ["COVID-19", "Chest X-ray", "Severity Scoring"],
  },
  {
    id: "dataset-6",
    title: "Chest X-ray dataset for lung segmentation",
    venue: "Mendeley Data",
    year: "2022",
    url: "http://doi.org/10.17632/8gf9vpkhgy.1",
    type: "Dataset",
    tags: ["Chest X-ray", "Lung Segmentation", "Medical Imaging"],
  },
  {
    id: "dataset-7",
    title: "Angiographic dataset for stenosis detection",
    venue: "Mendeley Data",
    year: "2021",
    url: "https://doi.org/10.17632/ydrm75xywg.2",
    type: "Dataset",
    tags: ["Angiography", "Stenosis Detection", "Cardiology"],
  },
  {
    id: "dataset-8",
    title: "Aortography keypoint tracking for TAVI",
    venue: "Mendeley Data",
    year: "2021",
    url: "https://doi.org/10.17632/pgynfy766g.2",
    type: "Dataset",
    tags: ["Aortography", "TAVI", "Keypoint Tracking"],
  },
];

export default function Publications() {
  return (
    <main className="min-h-screen pt-24">
      <div className="flex flex-col items-center pt-12 md:pt-24 gap-16 pb-32">
        {/* Journal Articles Section */}
        <section className="w-full max-w-7xl mx-auto px-6">
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-light mb-4">
              Journal Articles
            </h1>
            <p className="text-gray-400 mt-3 max-w-3xl mx-auto leading-relaxed">
              Peer-reviewed research published in leading scientific journals,
              advancing the intersection of machine learning, biomedical
              imaging, and data-driven healthcare innovation
            </p>
          </header>

          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:items-start"
            role="list"
          >
            {JOURNAL_ARTICLES.map((publication) => (
              <PublicationCard key={publication.id} publication={publication} />
            ))}
          </div>
        </section>

        {/* Conference Proceedings Section */}
        <section className="w-full max-w-7xl mx-auto px-6">
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-light mb-4">
              Conference Proceedings
            </h1>
            <p className="text-gray-400 mt-3 max-w-3xl mx-auto leading-relaxed">
              Presentations and papers from international conferences,
              showcasing emerging research, collaborative insights, and
              domain-specific AI applications across academia and industry
            </p>
          </header>

          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:items-start"
            role="list"
          >
            {CONFERENCE_PROCEEDINGS.map((publication) => (
              <PublicationCard key={publication.id} publication={publication} />
            ))}
          </div>
        </section>

        {/* Posts Section */}
        <section className="w-full max-w-7xl mx-auto px-6">
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-light mb-4">
              Posts
            </h1>
            <p className="text-gray-400 mt-3 max-w-3xl mx-auto leading-relaxed">
              Technical articles and thought leadership pieces bridging applied
              ML, research-to-product translation, and strategic AI adoption for
              professional audiences
            </p>
          </header>

          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:items-start"
            role="list"
          >
            {POSTS.map((publication) => (
              <PublicationCard key={publication.id} publication={publication} />
            ))}
          </div>
        </section>

        {/* Datasets Section */}
        <section className="w-full max-w-7xl mx-auto px-6">
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-light mb-4">
              Datasets
            </h1>
            <p className="text-gray-400 mt-3 max-w-3xl mx-auto leading-relaxed">
              Curated open-access datasets supporting reproducible research in
              AI and biomedicine, built with rigorous annotation standards to
              enable validation, benchmarking, and novel discovery
            </p>
          </header>

          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:items-start"
            role="list"
          >
            {DATASETS.map((publication) => (
              <PublicationCard key={publication.id} publication={publication} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
