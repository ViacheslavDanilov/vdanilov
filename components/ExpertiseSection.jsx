"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

// Helper function to convert hex color to RGB string
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : "3, 177, 251";
};

// Default configuration constants
const DEFAULT_SPOTLIGHT_RADIUS = 200;
const DEFAULT_GLOW_COLOR = "#03b1fb";
const DEFAULT_CARD_BACKGROUND = "#151a1f";
const MOBILE_BREAKPOINT = 768;

const cardData = [
  {
    color: DEFAULT_CARD_BACKGROUND,
    title: "10+ Years of Advanced R&D",
    description:
      "From a PhD in Computer Science to research roles across <highlight>Europe's leading institutions</highlight>: Pompeu Fabra, Sorbonne, ICFO, Politecnico di Milano, University of Leeds, Madrid Polytechnic, and UniTrento. Bridging <highlight>fundamental research</highlight> with practical applications in computer science, big data, AI and machine learning.",
    label: "Research & Development",
  },
  {
    color: DEFAULT_CARD_BACKGROUND,
    title: "Medical Imaging AI",
    description:
      "Developing advanced ML and AI systems for <highlight>medical imaging</highlight> across ultrasound, CT, MRI, hyperspectral, and time-series physiological data. Projects delivered for <highlight>leading medical centers</highlight> including Vall d'Hebron, Beth Israel Deaconess, Boston Children's, and the Institute for Image-Guided Surgery.",
    label: "Healthcare AI",
  },
  {
    color: DEFAULT_CARD_BACKGROUND,
    title: "Scalable ML Systems",
    description:
      "Building scalable ML and AI systems with <highlight>AutoML, PyTorch, TensorFlow, LangChain,</highlight> scikit-learn, MLflow, and DVC, deployed across <highlight>AWS and Google Cloud</highlight>. Integrating Generative AI with OpenAI, Qwen, Llama, and Stable Diffusion models for intelligent pipelines and workflow automation.",
    label: "ML Engineering",
  },
  {
    color: DEFAULT_CARD_BACKGROUND,
    title: "Technology Leadership",
    description:
      "Serving as <highlight>AI thought leader</highlight>, driving strategic direction, architectural decisions, and execution across client and internal projects. Establishing <highlight>long-term technical vision</highlight> and aligning technological units around scalable, AI-driven innovation for sustainable growth and competitive advantage.",
    label: "Strategic Leadership",
  },
  {
    color: DEFAULT_CARD_BACKGROUND,
    title: "Cross-Functional Management",
    description:
      "Leading and scaling a <highlight>cross-functional department</highlight> focused on AI, ML, autonomous agents, and automation. Managing diverse teams including <highlight>developers, scientists, and product managers</highlight> to deliver innovative solutions while fostering collaboration, mentorship, and continuous learning across the organization.",
    label: "Team Leadership",
  },
  {
    color: DEFAULT_CARD_BACKGROUND,
    title: "Applied ML & AI Across Industries",
    description:
      "Developing applied ML & AI systems for <highlight>insurance, diagnostics, and pharma</highlight> with deployments involving AmTrust, CNA, Plateau Group, leading medical centers, and pharmaceutical companies like Bristol Myers Squibb, Boehringer Ingelheim, and Volastra Therapeutics.",
    label: "Industry Applications",
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

const calculateSpotlightValues = (radius) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75,
});

const updateCardGlowProperties = (card, mouseX, mouseY, glow, radius) => {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;

  card.style.setProperty("--glow-x", `${relativeX}%`);
  card.style.setProperty("--glow-y", `${relativeY}%`);
  card.style.setProperty("--glow-intensity", glow.toString());
  card.style.setProperty("--glow-radius", `${radius}px`);
};

const GlobalSpotlight = ({
  gridRef,
  disableAnimations = false,
  enabled = true,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor = DEFAULT_GLOW_COLOR,
}) => {
  const spotlightRef = useRef(null);
  const isInsideSection = useRef(false);
  const cachedCards = useRef([]);
  const rafId = useRef(null);
  const lastMousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (disableAnimations || !gridRef?.current || !enabled) return;

    const rgbColor = hexToRgb(glowColor);
    const spotlight = document.createElement("div");
    spotlight.className = "global-spotlight";
    spotlight.style.cssText = `
      position: fixed;
      width: ${spotlightRadius * 2}px;
      height: ${spotlightRadius * 2}px;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${rgbColor}, 0.18) 0%,
        rgba(${rgbColor}, 0.13) 20%,
        rgba(${rgbColor}, 0.09) 35%,
        rgba(${rgbColor}, 0.045) 50%,
        rgba(${rgbColor}, 0.02) 65%,
        rgba(${rgbColor}, 0.008) 80%,
        transparent 100%
      );
      filter: blur(40px);
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    // Cache card elements on mount and when grid changes
    const cacheCards = () => {
      if (gridRef.current) {
        cachedCards.current = Array.from(
          gridRef.current.querySelectorAll(".card"),
        );
      }
    };
    cacheCards();

    // Use ResizeObserver to update cache when cards are added/removed
    const resizeObserver = new ResizeObserver(cacheCards);
    if (gridRef.current) {
      resizeObserver.observe(gridRef.current);
    }

    const updateSpotlight = () => {
      if (!spotlightRef.current || !gridRef.current) return;

      const e = lastMousePos.current;
      const section = gridRef.current.closest(".bento-section");
      const rect = section?.getBoundingClientRect();
      const mouseInside =
        rect &&
        e.x >= rect.left &&
        e.x <= rect.right &&
        e.y >= rect.top &&
        e.y <= rect.bottom;

      isInsideSection.current = mouseInside || false;

      if (!mouseInside) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
        cachedCards.current.forEach((card) => {
          card.style.setProperty("--glow-intensity", "0");
        });
        return;
      }

      const { proximity, fadeDistance } =
        calculateSpotlightValues(spotlightRadius);
      let minDistance = Infinity;

      cachedCards.current.forEach((card) => {
        const cardRect = card.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const distance =
          Math.hypot(e.x - centerX, e.y - centerY) -
          Math.max(cardRect.width, cardRect.height) / 2;
        const effectiveDistance = Math.max(0, distance);

        minDistance = Math.min(minDistance, effectiveDistance);

        let glowIntensity = 0;
        if (effectiveDistance <= proximity) {
          glowIntensity = 1;
        } else if (effectiveDistance <= fadeDistance) {
          glowIntensity =
            (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
        }

        updateCardGlowProperties(
          card,
          e.x,
          e.y,
          glowIntensity,
          spotlightRadius,
        );
      });

      gsap.to(spotlightRef.current, {
        left: e.x,
        top: e.y,
        duration: 0.1,
        ease: "power2.out",
      });

      const targetOpacity =
        minDistance <= proximity
          ? 1.0
          : minDistance <= fadeDistance
            ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 1.0
            : 0;

      gsap.to(spotlightRef.current, {
        opacity: targetOpacity,
        duration: targetOpacity > 0 ? 0.2 : 0.5,
        ease: "power2.out",
      });
    };

    const handleMouseMove = (e) => {
      lastMousePos.current = { x: e.clientX, y: e.clientY };

      // Cancel any pending animation frame
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      // Schedule update on next frame
      rafId.current = requestAnimationFrame(updateSpotlight);
    };

    const handleMouseLeave = () => {
      isInsideSection.current = false;
      cachedCards.current.forEach((card) => {
        card.style.setProperty("--glow-intensity", "0");
      });
      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      resizeObserver.disconnect();
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
    };
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

  return null;
};

const BentoCardGrid = ({ children, gridRef }) => (
  <div className="bento-section w-full select-none relative" ref={gridRef}>
    {children}
  </div>
);

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () =>
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
};

const ExpertiseSection = ({
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor = DEFAULT_GLOW_COLOR,
}) => {
  const gridRef = useRef(null);
  const isMobile = useMobileDetection();
  const shouldDisableAnimations = disableAnimations || isMobile;

  // Set dynamic CSS variables
  useEffect(() => {
    if (gridRef.current) {
      const section = gridRef.current;
      section.style.setProperty("--glow-radius", `${spotlightRadius}px`);
      section.style.setProperty("--glow-color", hexToRgb(glowColor));
    }
  }, [spotlightRadius, glowColor]);

  return (
    <>
      {enableSpotlight && (
        <GlobalSpotlight
          gridRef={gridRef}
          disableAnimations={shouldDisableAnimations}
          enabled={enableSpotlight}
          spotlightRadius={spotlightRadius}
          glowColor={glowColor}
        />
      )}

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

        <BentoCardGrid gridRef={gridRef}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cardData.map((card, index) => {
              const baseClassName = `card flex flex-col gap-4 relative w-full h-full p-6 rounded-xl border border-solid overflow-hidden transition-all duration-300 ease-in-out ${
                enableBorderGlow ? "card--border-glow" : ""
              }`;

              const cardStyle = {
                backgroundColor: card.color || "var(--background-dark)",
                borderColor: "var(--border-color)",
                color: "var(--white)",
                "--glow-x": "50%",
                "--glow-y": "50%",
                "--glow-intensity": "0",
                "--glow-radius": `${spotlightRadius}px`,
              };

              return (
                <div key={index} className={baseClassName} style={cardStyle}>
                  <div className="card__header flex justify-between gap-3 relative text-white">
                    <span className="card__label text-xs uppercase tracking-wide opacity-70">
                      {card.label}
                    </span>
                  </div>
                  <div className="card__content flex flex-col relative text-white">
                    <h3 className="card__title font-bold text-lg text-light mb-2">
                      {card.title}
                    </h3>
                    <p className="card__description text-sm text-light/80 text-justify leading-relaxed">
                      {renderHighlightedText(card.description).map((part) =>
                        part.highlight ? (
                          <span
                            key={part.key}
                            className="text-accent font-medium"
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
              );
            })}
          </div>
        </BentoCardGrid>
      </section>
    </>
  );
};

export default ExpertiseSection;
