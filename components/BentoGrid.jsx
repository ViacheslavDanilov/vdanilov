import React from "react";
import BentoItem from "./ui/bento-item";

const BentoGrid = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-light mb-4">
          Expertise & Leadership
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 1. 10+ Years R&D */}
        <BentoItem className="col-span-1 lg:col-span-2">
          <div className="h-full flex flex-col justify-between">
            <h3 className="text-2xl font-bold text-light mb-2">
              10+ Years of Advanced R&D
            </h3>
            <p className="text-light/80">
              From a PhD in Computer Science to research roles across Europe’s
              leading scientific institutions, with experience spanning Pompeu
              Fabra University, Institute of Photonic Sciences, Politecnico di
              Milano, Sorbonne University, University of Leeds, Universidad
              Politécnica de Madrid, and University of Trento.
            </p>
          </div>
        </BentoItem>

        {/* 2. Medical Imaging AI */}
        <BentoItem className="col-span-1">
          <div className="h-full flex flex-col justify-between">
            <h3 className="text-xl font-bold text-light mb-2">
              Medical Imaging AI
            </h3>
            <p className="text-light/80">
              Developing advanced ML & AI systems for medical imaging across
              ultrasound, CT, MRI, hyperspectral, and time-series physiological
              data, with projects delivered for Vall d’Hebron Hospital, Beth
              Israel Deaconess Medical Center, Boston Children’s Hospital, and
              Institute for Image-Guided Surgery.
            </p>
          </div>
        </BentoItem>

        {/* 3. Scalable Systems */}
        <BentoItem className="col-span-1">
          <div className="h-full flex flex-col justify-between">
            <h3 className="text-xl font-bold text-light mb-2">
              Scalable Systems
            </h3>
            <p className="text-light/80">
              Building scalable ML and AI systems with AutoML, PyTorch,
              TensorFlow, scikit-learn, MLflow, DVC, LangChain, and Weights &
              Biases, deployed across AWS and Google Cloud. Integrating
              Generative AI and multimodal capabilities with OpenAI models,
              Qwen, and Stable Diffusion/Flux to enable intelligent pipelines
              for reasoning, generation, retrieval, and workflow automation.
            </p>
          </div>
        </BentoItem>

        {/* 4. CTO Leadership */}
        <BentoItem className="col-span-1 lg:col-span-2">
          <div className="h-full flex flex-col justify-between">
            <h3 className="text-2xl font-bold text-light mb-2">
              CTO Leadership
            </h3>
            <p className="text-light/80">
              Acting as the company’s AI thought leader, guiding strategy and
              implementation. Defining and executing the long-term technical
              vision across technological units.
            </p>
          </div>
        </BentoItem>

        {/* 5. Global Management */}
        <BentoItem className="col-span-1">
          <div className="h-full flex flex-col justify-between">
            <h3 className="text-xl font-bold text-light mb-2">
              Global Management
            </h3>
            <p className="text-light/80">
              Leading and scaling a cross-functional department focused on AI,
              ML, autonomous agents, and automation including developers,
              scientists, and product managers.
            </p>
          </div>
        </BentoItem>

        {/* 6. Applied AI Impact */}
        <BentoItem className="col-span-1 md:col-span-2 lg:col-span-2">
          <div className="h-full flex flex-col justify-between">
            <h3 className="text-2xl font-bold text-light mb-2">
              Applied AI Impact
            </h3>
            <p className="text-light/80">
              Delivering AI solutions for InsurTech (AmTrust, CNA, Plateau
              Group), Healthcare (Beth Israel Deaconess, Vall d'Hebron), and
              Pharma (Bristol Myers Squibb, Boehringer Ingelheim).
            </p>
          </div>
        </BentoItem>
      </div>
    </section>
  );
};

export default BentoGrid;
