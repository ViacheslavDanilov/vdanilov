import React from "react";
import BentoItem from "./ui/bento-item";

// Highlight style for key phrases
const HIGHLIGHT_STYLE =
  "bg-accent/20 text-light px-1 py-0 rounded-md font-normal";

const BentoGrid = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-light mb-4">
          Expertise & Leadership
        </h2>
        <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
          Bridging the gap between academic research and industrial-scale
          engineering to build high-performing technical teams.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 1. Advanced R&D */}
        <BentoItem className="col-span-1">
          <div className="h-full flex flex-col gap-4">
            <h3 className="text-xl font-bold text-light">
              10+ Years of Advanced R&D
            </h3>
            <p className="text-light/80 text-justify">
              From a{" "}
              <span className={HIGHLIGHT_STYLE}>PhD in Computer Science</span>{" "}
              to research roles across{" "}
              <span className={HIGHLIGHT_STYLE}>
                Europe’s leading scientific institutions
              </span>
              , with experience spanning Pompeu Fabra University, Sorbonne
              University, Institute of Photonic Sciences, Politecnico di Milano,
              University of Leeds, Universidad Politécnica de Madrid, and
              University of Trento.
            </p>
          </div>
        </BentoItem>

        {/* 2. Medical Imaging AI */}
        <BentoItem className="col-span-1">
          <div className="h-full flex flex-col gap-4">
            <h3 className="text-xl font-bold text-light">Medical Imaging AI</h3>
            <p className="text-light/80 text-justify">
              Developing{" "}
              <span className={HIGHLIGHT_STYLE}>
                advanced ML & AI systems for medical imaging
              </span>{" "}
              across ultrasound, CT, MRI, hyperspectral, and time-series
              physiological data, with projects delivered for Vall d’Hebron
              Hospital, Beth Israel Deaconess Medical Center, Boston Children’s
              Hospital, and Institute for Image-Guided Surgery.
            </p>
          </div>
        </BentoItem>

        {/* 3. Scalable Systems */}
        <BentoItem className="col-span-1">
          <div className="h-full flex flex-col gap-4">
            <h3 className="text-xl font-bold text-light">Scalable Systems</h3>
            <p className="text-light/80 text-justify">
              Building{" "}
              <span className={HIGHLIGHT_STYLE}>scalable ML & AI systems</span>{" "}
              with AutoML, PyTorch, TensorFlow, scikit-learn, MLflow, DVC,
              LangChain, and Weights & Biases, deployed across AWS and Google
              Cloud. Integrating{" "}
              <span className={HIGHLIGHT_STYLE}>
                Generative AI and multimodal capabilities
              </span>{" "}
              with OpenAI, Qwen, Llama, Stable Diffusion and Flux models to
              enable intelligent pipelines for reasoning, generation, retrieval,
              and workflow automation.
            </p>
          </div>
        </BentoItem>

        {/* 4. Technology Leadership */}
        <BentoItem className="col-span-1">
          <div className="h-full flex flex-col gap-4">
            <h3 className="text-xl font-bold text-light">
              Technology Leadership
            </h3>
            <p className="text-light/80 text-justify">
              Serving as the company’s{" "}
              <span className={HIGHLIGHT_STYLE}>AI thought leader</span>,
              driving strategic direction, architectural decisions, and
              execution across client and internal projects. Establishing{" "}
              <span className={HIGHLIGHT_STYLE}>
                long-term technical vision
              </span>{" "}
              and aligning technological units around scalable, AI-driven
              innovation.
            </p>
          </div>
        </BentoItem>

        {/* 5. Cross-Functional Management */}
        <BentoItem className="col-span-1">
          <div className="h-full flex flex-col gap-4">
            <h3 className="text-xl font-bold text-light">
              Cross-Functional Management
            </h3>
            <p className="text-light/80 text-justify">
              Leading and scaling a{" "}
              <span className={HIGHLIGHT_STYLE}>
                cross-functional department
              </span>{" "}
              focused on AI, ML, autonomous agents, and automation including
              developers, scientists, and product managers.
            </p>
          </div>
        </BentoItem>

        {/* 6. Applied ML & AI Across Industries */}
        <BentoItem className="col-span-1">
          <div className="h-full flex flex-col gap-4">
            <h3 className="text-xl font-bold text-light">
              Applied ML & AI Across Industries
            </h3>
            <p className="text-light/80 text-justify">
              Developing{" "}
              <span className={HIGHLIGHT_STYLE}>applied ML & AI systems</span>{" "}
              for insurance, clinical diagnostics, medical imaging, and
              pharmaceutical research with deployments and collaborations
              involving AmTrust, CNA, Plateau Group, Beth Israel Deaconess
              Medical Center, Vall d’Hebron Hospital, Institute for Image-Guided
              Surgery, Bristol Myers Squibb, Boehringer Ingelheim, and Volastra
              Therapeutics.
            </p>
          </div>
        </BentoItem>
      </div>
    </section>
  );
};

export default BentoGrid;
