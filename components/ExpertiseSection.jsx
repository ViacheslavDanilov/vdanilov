"use client";

import { GlowCard } from "@/components/ui/glow-card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFlask,
  faHeartPulse,
  faMicrochip,
  faChessKing,
  faUsers,
  faIndustry,
} from "@fortawesome/free-solid-svg-icons";

const cardData = [
  {
    title: "10+ Years of Advanced R&D",
    description:
      "From a PhD in Computer Science to research roles across <highlight>Europe's leading institutions</highlight>: Pompeu Fabra, Sorbonne, ICFO, Politecnico di Milano, University of Leeds, Madrid Polytechnic, and UniTrento. Bridging <highlight>fundamental research</highlight> with practical applications in computer science, big data, AI and machine learning.",
    label: "Research & Development",
    icon: faFlask,
  },
  {
    title: "Medical Imaging AI",
    description:
      "Developing advanced ML and AI systems for <highlight>medical imaging</highlight> across ultrasound, CT, MRI, hyperspectral, and time-series physiological data. Projects delivered for <highlight>leading medical centers</highlight> including Vall d'Hebron, Beth Israel Deaconess, Boston Children's, and the Institute for Image-Guided Surgery.",
    label: "Healthcare AI",
    icon: faHeartPulse,
  },
  {
    title: "Scalable ML Systems",
    description:
      "Building scalable ML and AI systems with <highlight>AutoML, PyTorch, TensorFlow, LangChain,</highlight> scikit-learn, MLflow, and DVC, deployed across <highlight>AWS and Google Cloud</highlight>. Integrating Generative AI with OpenAI, Qwen, Llama, and Stable Diffusion models for intelligent pipelines and workflow automation.",
    label: "ML Engineering",
    icon: faMicrochip,
  },
  {
    title: "Technology Leadership",
    description:
      "Serving as <highlight>AI thought leader</highlight>, driving strategic direction, architectural decisions, and execution across client and internal projects. Establishing <highlight>long-term technical vision</highlight> and aligning technological units around scalable, AI-driven innovation for sustainable growth and competitive advantage.",
    label: "Strategic Leadership",
    icon: faChessKing,
  },
  {
    title: "Cross-Functional Management",
    description:
      "Leading and scaling a <highlight>cross-functional department</highlight> focused on AI, ML, autonomous agents, and automation. Managing diverse teams of <highlight>developers, scientists, and product managers</highlight> to deliver innovative solutions while fostering collaboration, mentorship, and continuous learning.",
    label: "Team Leadership",
    icon: faUsers,
  },
  {
    title: "Applied ML & AI Across Industries",
    description:
      "Developing applied ML & AI systems for <highlight>insurance, diagnostics, and pharma</highlight> with deployments involving AmTrust, CNA, Plateau Group, leading medical centers, and pharmaceutical companies like Bristol Myers Squibb, Boehringer Ingelheim, and Volastra Therapeutics.",
    label: "Industry Applications",
    icon: faIndustry,
  },
];

// Helper function to render text with highlighted phrases
const renderHighlightedText = (text) => {
  const parts = text.split(/(<highlight>|<\/highlight>)/);
  const elements = [];
  let isHighlight = false;

  parts.forEach((part, index) => {
    if (part === "<highlight>") {
      isHighlight = true;
    } else if (part === "</highlight>") {
      isHighlight = false;
    } else if (part) {
      elements.push({
        text: part,
        highlight: isHighlight,
        key: index,
      });
    }
  });

  return elements;
};

const ExpertiseSection = ({
  enableSpotlight = true,
  enableBorderGlow = true,
  glowColor = "blue",
  spotlightSize = 180,
}) => {
  return (
    <section className="py-12 px-6 max-w-7xl mx-auto">
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-light mb-4">
          Expertise & Leadership
        </h2>
        <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
          Bridging the gap between academic research and industrial-scale
          engineering to build high-performing technical teams
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardData.map((card, index) => (
          <GlowCard
            key={index}
            glowColor={glowColor}
            customSize={true}
            className="group w-full h-full p-6"
            enableSpotlight={enableSpotlight}
            enableBorderGlow={enableBorderGlow}
            spotlightSize={spotlightSize}
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon
                  icon={card.icon}
                  className="w-3.5 h-3.5 text-white/70 transition-colors duration-300 group-hover:text-accent"
                  style={{
                    width: "0.875rem",
                    height: "0.875rem",
                    display: "inline-block",
                  }}
                />
                <span className="text-xs uppercase tracking-wide text-white/70 transition-colors duration-300 group-hover:text-accent">
                  {card.label}
                </span>
              </div>
              <div className="flex flex-col">
                <h3 className="font-bold text-lg text-light mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-light/80 text-justify leading-relaxed">
                  {renderHighlightedText(card.description).map((part) =>
                    part.highlight ? (
                      <span
                        key={part.key}
                        className="text-light/90 font-semibold transition-colors duration-300 group-hover:text-accent"
                      >
                        {part.text}
                      </span>
                    ) : (
                      <span key={part.key}>{part.text}</span>
                    ),
                  )}
                </p>
              </div>
            </div>
          </GlowCard>
        ))}
      </div>
    </section>
  );
};

export default ExpertiseSection;
