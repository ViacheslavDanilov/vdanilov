"use client";

import React from "react";
import PublicationCard from "@/components/PublicationCard";

// Journal Articles Data
const JOURNAL_ARTICLES = [
  {
    id: "journal-1",
    title:
      "Advancing laser ablation assessment in hyperspectral imaging through machine learning",
    authors:
      "V. Danilov, D. Giakoumettis, A. Bano, M. Suhling, A. Mattos, A. Bano, A. Ostler, P. Jannin, A. Hostettler",
    venue: "Computers in Biology and Medicine",
    year: "2024",
    url: "https://doi.org/10.1016/j.compbiomed.2024.108849",
    type: "Journal Article",
    tags: ["Machine Learning", "Hyperspectral Imaging", "Medical Imaging"],
  },
  {
    id: "journal-2",
    title:
      "Explainable AI to identify radiographic features of pulmonary edema",
    authors:
      "V. Danilov, D. Proutski, A. Kirillova, D. Klyuev, Y. Gankin, A. Blokhin, M. Goncharov, I. Gombolevskiy",
    venue: "Radiology Advances",
    year: "2024",
    url: "https://doi.org/10.1093/radadv/umae003",
    type: "Journal Article",
    tags: ["Explainable AI", "Radiology", "Deep Learning"],
  },
];

// Conference Proceedings Data
const CONFERENCE_PROCEEDINGS = [
  {
    id: "conference-1",
    title:
      "Non-invasive intracranial pressure estimation from cerebral blood flow dynamics using wavelet-based deep learning",
    authors:
      "V. Danilov, R. Marin, J. Riera, T. Durduran, D. Kacprzak, A. Liebert",
    venue:
      "European Conferences on Biomedical Optics 2025 (ECBO), Munich, Germany",
    year: "2025",
    url: "https://doi.org/10.1364/ECBO.2025.W5B.5",
    type: "Conference Paper",
    tags: ["Biophotonics", "Neural Networks", "Medical Devices"],
  },
  {
    id: "conference-2",
    title:
      "Hybrid convolutional and recurrent neural network for non-invasive intracranial pressure estimation from cerebral blood flow",
    authors: "V. Danilov, R. Marin, J. Riera, T. Durduran",
    venue:
      "Biophotonics Congress: Biomedical Optics 2024 (BRAIN), Fort Lauderdale, USA",
    year: "2024",
    url: "https://doi.org/10.1364/BRAIN.2024.BTu3C.7",
    type: "Conference Paper",
    tags: ["CNN-RNN", "Time Series", "Biomedical Optics"],
  },
];

// Posts Data
const POSTS = [
  {
    id: "post-1",
    title:
      "Testing AI low-code platforms: What actually worked (and what didn't)",
    authors: "V. Danilov",
    venue: "Symfa Blog",
    year: "2024",
    url: "https://symfa.com/blog/ai-low-code-tools",
    type: "Blog Post",
    tags: ["AI Tools", "Low-Code", "Product Review"],
  },
  {
    id: "post-2",
    title:
      "Harnessing AI for Histopathology: A Leap Towards Precision Medicine",
    authors: "V. Danilov",
    venue: "Quantori Blog",
    year: "2023",
    url: "https://quantori.com/blog/harnessing-ai-for-histopathology-a-leap-towards-precision-medicine",
    type: "Blog Post",
    tags: ["Digital Pathology", "Precision Medicine", "Computer Vision"],
  },
];

// Datasets Data
const DATASETS = [
  {
    id: "dataset-1",
    title: "COVID-19 Chest X-ray Severity Scoring Dataset",
    authors:
      "V. Danilov, D. Proutski, A. Kirillova, D. Klyuev, Y. Gankin, A. Blokhin, M. Goncharov",
    venue: "Mendeley Data, v2",
    year: "2022",
    url: "https://data.mendeley.com/datasets/8h65ywd2jr/2",
    type: "Dataset",
    tags: ["COVID-19", "Chest X-ray", "Annotated Data"],
  },
  {
    id: "dataset-2",
    title: "Hyperspectral Laser Ablation Assessment Dataset",
    authors: "V. Danilov, A. Bano, M. Suhling, A. Hostettler",
    venue: "Zenodo",
    year: "2024",
    url: "#",
    type: "Dataset",
    tags: ["Hyperspectral", "Laser Surgery", "Medical Imaging"],
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
