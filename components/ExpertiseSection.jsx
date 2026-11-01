import ExpertiseList from "@/components/ExpertiseList";
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
    image: "/portfolio/previews/oncocell-vision.jpg",
    link: { href: "/experience", label: "View experience" },
  },
  {
    title: "Medical Imaging AI",
    description:
      "Developing advanced ML and AI systems for <highlight>medical imaging</highlight> across ultrasound, CT, MRI, hyperspectral, and time-series physiological data. Projects delivered for <highlight>leading medical centers</highlight> including Vall d'Hebron, Beth Israel Deaconess, Boston Children's, and the Institute of Image-Guided Surgery.",
    label: "Healthcare AI",
    icon: faHeartPulse,
    image: "/portfolio/previews/pulmoscore.jpg",
    link: { href: "/portfolio?filter=medical-imaging", label: "View projects" },
  },
  {
    title: "Scalable ML Systems",
    description:
      "Building scalable ML and AI systems with <highlight>AutoML, PyTorch, TensorFlow, LangChain,</highlight> scikit-learn, MLflow, and DVC, deployed across <highlight>AWS and Google Cloud</highlight>. Integrating Generative AI with OpenAI, Qwen, Llama, and Stable Diffusion models for intelligent pipelines and workflow automation.",
    label: "ML Engineering",
    icon: faMicrochip,
    image: "/portfolio/previews/insurecast.jpg",
  },
  {
    title: "Technology Leadership",
    description:
      "Serving as <highlight>AI thought leader</highlight>, driving strategic direction, architectural decisions, and execution across client and internal projects. Establishing <highlight>long-term technical vision</highlight> and aligning technological units around scalable, AI-driven innovation for sustainable growth and competitive advantage.",
    label: "Strategic Leadership",
    icon: faChessKing,
    image: "/portfolio/previews/risk-profiler.jpg",
  },
  {
    title: "Cross-Functional Management",
    description:
      "Leading and scaling a <highlight>cross-functional department</highlight> focused on AI, ML, autonomous agents, and automation. Managing diverse teams of <highlight>developers, scientists, and product managers</highlight> to deliver innovative solutions while fostering collaboration, mentorship, and continuous learning.",
    label: "Team Leadership",
    icon: faUsers,
    image: "/portfolio/previews/claim-assistant.jpg",
  },
  {
    title: "Applied ML & AI Across Industries",
    description:
      "Developing applied ML & AI systems for <highlight>insurance, diagnostics, and pharma</highlight> with deployments involving AmTrust, CNA, Lumos Insurance, leading medical centers, and pharmaceutical companies like Bristol Myers Squibb, Boehringer Ingelheim, and Volastra Therapeutics.",
    label: "Industry Applications",
    icon: faIndustry,
    image: "/portfolio/previews/insurance-pricing.jpg",
    link: { href: "/portfolio?filter=industry-ai-ml", label: "View projects" },
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

const items = cardData.map((card) => ({
  ...card,
  parts: renderHighlightedText(card.description),
}));

const ExpertiseSection = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-12">
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-light mb-4">
          Expertise & Leadership
        </h2>
        <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
          Bridging the gap between academic research and industrial-scale
          engineering to build high-performing technical teams
        </p>
      </div>

      <ExpertiseList items={items} />
    </section>
  );
};

export default ExpertiseSection;
