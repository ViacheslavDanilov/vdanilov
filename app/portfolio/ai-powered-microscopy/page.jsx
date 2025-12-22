import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export const metadata = {
  title: "AI-Powered Microscopy – Viacheslav Danilov",
  description:
    "Automated detection and counting of cancer cells using advanced computer vision.",
};

export default function ProjectPage() {
  return (
    <main className="min-h-screen pt-24">
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-24">
        {/* Back Navigation */}
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-accent 
                     transition-colors mb-8 group"
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="w-4 h-4 transition-transform group-hover:-translate-x-1"
          />
          <span>Back to Portfolio</span>
        </Link>

        {/* Hero Image */}
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-8 border border-white/10">
          <Image
            src="/portfolio/previews/ai-powered-microscopy.webp"
            alt="AI-Powered Microscopy"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Project Header */}
        <header className="mb-12">
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-accent/20 text-accent border border-accent/30 mb-4">
            AI/ML
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-light mb-4">
            AI-Powered Microscopy
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            Automated detection and counting of cancer cells using advanced
            computer vision and neural networks.
          </p>
        </header>

        {/* Content Sections */}
        <div className="space-y-12">
          {/* Overview */}
          <section>
            <h2 className="text-xl font-semibold text-light mb-4 flex items-center gap-3">
              <span className="w-1 h-6 bg-accent rounded-full"></span>
              Overview
            </h2>
            <p className="text-gray-400 leading-relaxed">
              This project leverages cutting-edge deep learning techniques to
              automate the analysis of microscopy images. The system can detect,
              identify, and accurately count cancer cells in high-resolution
              microscopy slides, dramatically reducing the manual workload for
              pathologists and improving diagnostic consistency.
            </p>
          </section>

          {/* Technologies */}
          <section>
            <h2 className="text-xl font-semibold text-light mb-4 flex items-center gap-3">
              <span className="w-1 h-6 bg-accent rounded-full"></span>
              Technologies
            </h2>
            <div className="flex flex-wrap gap-2">
              {[
                "TensorFlow",
                "Python",
                "YOLO",
                "OpenSlide",
                "scikit-image",
                "Pathology AI",
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 text-sm rounded-full bg-card border border-white/10 text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Results */}
          <section>
            <h2 className="text-xl font-semibold text-light mb-4 flex items-center gap-3">
              <span className="w-1 h-6 bg-accent rounded-full"></span>
              Results
            </h2>
            <p className="text-gray-400 leading-relaxed">
              The AI system achieved 95%+ accuracy in cell detection and
              counting tasks, processing slides up to 100x faster than manual
              analysis. This enables high-throughput screening and supports more
              timely clinical decisions.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
