import React from "react";
import BentoItem from "./ui/bento-item";

const BentoGrid = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 1. Translational AI Research */}
        <BentoItem className="col-span-1 lg:col-span-2">
          <div className="h-full flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Translational AI Research
              </h3>
              <p className="text-gray-400">
                Turning complex biomedical signals into actionable insights.
              </p>
            </div>
            <p className="mt-4 text-gray-300">
              I build ML models for ICP prediction, hyperspectral analysis, and
              cardiovascular imaging.
            </p>
          </div>
        </BentoItem>

        {/* 2. Scientific Innovation for Healthcare */}
        <BentoItem className="col-span-1">
          <div className="h-full flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                Scientific Innovation
              </h3>
              <p className="text-gray-400">
                AI solutions designed alongside clinicians.
              </p>
            </div>
            <p className="mt-4 text-gray-300">
              From ultrasound segmentation to real-time diagnostics, my work
              bridges lab to clinic.
            </p>
          </div>
        </BentoItem>

        {/* 3. Industry-Ready AI Systems */}
        <BentoItem className="col-span-1">
          <div className="h-full flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                Industry-Ready AI
              </h3>
              <p className="text-gray-400">
                Applied AI for InsurTech & enterprise.
              </p>
            </div>
            <p className="mt-4 text-gray-300">
              I help companies deploy scalable, production-grade intelligent
              systems.
            </p>
          </div>
        </BentoItem>

        {/* 4. Strategic Technology Leadership */}
        <BentoItem className="col-span-1 lg:col-span-2">
          <div className="h-full flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Strategic Tech Leadership
              </h3>
              <p className="text-gray-400">
                Setting long-term AI vision and guiding technical teams.
              </p>
            </div>
            <p className="mt-4 text-gray-300">
              As CTO, I lead R&D strategy, architecture decisions, and
              innovation roadmaps.
            </p>
          </div>
        </BentoItem>

        {/* 5. Cross-Functional Team Leadership */}
        <BentoItem className="col-span-1">
          <div className="h-full flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                Team Leadership
              </h3>
              <p className="text-gray-400">
                Managing engineering, science, and product.
              </p>
            </div>
            <p className="mt-4 text-gray-300">
              I drive alignment, clarity, and high-impact execution across
              teams.
            </p>
          </div>
        </BentoItem>

        {/* 6. Business & Technical Management */}
        <BentoItem className="col-span-1 md:col-span-2 lg:col-span-2">
          <div className="h-full flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Business & Tech Management
              </h3>
              <p className="text-gray-400">Where engineering meets strategy.</p>
            </div>
            <p className="mt-4 text-gray-300">
              With dual tech + management background, I build AI initiatives
              tied to real business value.
            </p>
          </div>
        </BentoItem>
      </div>
    </section>
  );
};

export default BentoGrid;
