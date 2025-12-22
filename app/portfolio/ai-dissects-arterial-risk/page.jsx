import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export const metadata = {
  title: "AI Dissects Arterial Risk – Viacheslav Danilov",
  description:
    "Deep learning pipeline for OCT plaque segmentation and arterial risk assessment.",
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
            src="/portfolio/previews/ai-dissects-arterial-risk.webp"
            alt="AI Dissects Arterial Risk"
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
            AI Dissects Arterial Risk
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            Deep learning pipeline for OCT plaque segmentation, enabling precise
            arterial risk assessment in cardiovascular imaging.
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
              This project developed a sophisticated deep learning system for
              analyzing Optical Coherence Tomography (OCT) images of coronary
              arteries. The AI model accurately segments and classifies
              different types of arterial plaques, providing clinicians with
              detailed risk assessments for cardiovascular disease.
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
                "PyTorch",
                "Python",
                "U-Net",
                "OpenCV",
                "CUDA",
                "Medical Imaging",
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
              The system achieved state-of-the-art performance in plaque
              segmentation with a Dice coefficient exceeding 0.90. It
              significantly reduces the time required for manual analysis while
              providing consistent, reproducible results across different
              imaging conditions.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
