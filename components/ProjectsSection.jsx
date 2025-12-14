"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";

// Helper function to convert hex color to RGB string
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : "3, 177, 251";
};

// Default configuration constants
const DEFAULT_SPOTLIGHT_RADIUS = 100;
const DEFAULT_GLOW_COLOR = "#ffffff";
const DEFAULT_CARD_BACKGROUND = "#151a1f";
const MOBILE_BREAKPOINT = 768;

const PROJECTS = [
  {
    id: "wavelets-in-the-brain",
    title: "Wavelets in the brain",
    client: "Vall d'Hebron Hospital",
    location: "Barcelona · Spain 🇪🇸",
    description:
      "A wavelet-based deep learning system that non-invasively estimates intracranial pressure from cerebral blood-flow signals, enabling accurate bedside ICP monitoring without surgical risk. Validated on 200+ hours of clinical data, the model achieves clinically actionable accuracy and demonstrates a scalable alternative to invasive neuro-monitoring.",
    stack: [
      "PyTorch",
      "Python",
      "fast.ai",
      "Gradio",
      "DVC",
      "Weights & Biases",
    ],
    link: "#",
    image: "/projects/wavelets-in-the-brain/preview.webp",
  },
  {
    id: "sales-pilot",
    title: "AI-driven lead scoring at scale",
    client: "Symfa",
    location: "Miami · United States 🇺🇸",
    description:
      "An end-to-end AI system that automates outbound lead generation by scoring jobs, contacts, and companies using hybrid heuristic–embedding models. It transforms slow manual sourcing into a scalable, data-driven workflow that dramatically cuts time-to-lead from days to minutes while boosting targeting accuracy and conversion potential.",
    stack: ["Python", "OpenAI API", "scikit-learn", "DVC", "CI/CD", "LLM"],
    link: "#",
    image: "/projects/sales-pilot/preview.webp",
  },
  {
    id: "tumor-immune-phenotype",
    title: "Tumor immune phenotype classification",
    client: "Boehringer Ingelheim",
    location: "Ingelheim · Germany 🇩🇪",
    description:
      "A hybrid machine learning pipeline that classifies tumor immune phenotypes from whole-slide histopathology images using deep nucleus segmentation, feature engineering, and AutoML-based cell classification. Achieving an 89% weighted F1-score, it enables automated adenocarcinoma slide analysis, reducing manual workload and supporting more precise, personalized immunotherapy decisions.",
    stack: ["PyTorch", "HoVer-Net", "scikit-learn", "OpenSlide", "AutoML"],
    link: "#",
    image: "/projects/tumor-immune-phenotype/preview.webp",
  },
  {
    id: "ml-for-laser-ablation",
    title: "ML for laser ablation assessment",
    client: "Institute for Image-Guided Surgery",
    location: "Strasbourg · France 🇫🇷",
    description:
      "A multi-stage machine learning pipeline that detects and segments laser-induced tissue ablation from hyperspectral imaging data using PCA/t-SNE reduction, Faster R-CNN detection, and Mean Shift clustering. The workflow enables automated assessment of thermal damage across organs, improving diagnostic accuracy and supporting research in laser-based cancer therapy.",
    stack: [
      "PyTorch",
      "MMDetection",
      "scikit-learn",
      "DVC",
      "OpenCV",
      "MLflow",
    ],
    link: "#",
    image: "/projects/ml-for-laser-ablation/preview.webp",
  },
];

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
      background: rgba(${rgbColor}, 0.25);
      border-radius: 50%;
      filter: blur(80px);
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const cacheCards = () => {
      if (gridRef.current) {
        cachedCards.current = Array.from(
          gridRef.current.querySelectorAll(".card"),
        );
      }
    };
    cacheCards();

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

      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

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

const ProjectsSection = ({
  enableSpotlight = false,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor = DEFAULT_GLOW_COLOR,
}) => {
  const gridRef = useRef(null);
  const isMobile = useMobileDetection();
  const shouldDisableAnimations = disableAnimations || isMobile;

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
            Featured Projects
          </h2>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
            Delivering ML/AI systems and research tools that solve complex
            challenges in healthcare, life science, and enterprise
          </p>
        </div>

        <BentoCardGrid gridRef={gridRef}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {PROJECTS.map((project) => {
              const baseClassName = `card flex flex-col relative w-full h-full p-6 rounded-xl border border-solid overflow-hidden transition-all duration-300 ease-in-out ${
                enableBorderGlow ? "card--border-glow" : ""
              }`;

              const cardStyle = {
                backgroundColor: DEFAULT_CARD_BACKGROUND,
                borderColor: "var(--border-color)",
                color: "var(--white)",
                "--glow-x": "50%",
                "--glow-y": "50%",
                "--glow-intensity": "0",
                "--glow-radius": `${spotlightRadius}px`,
              };

              return (
                <div
                  key={project.id}
                  className={baseClassName}
                  style={cardStyle}
                >
                  {/* Mobile layout: centered image */}
                  <div className="flex flex-col sm:hidden items-center mb-6">
                    <a href={project.link} className="block mb-4">
                      <div className="relative w-48 h-48 rounded-lg overflow-hidden bg-neutral-800 border border-white/10 transition-transform duration-300 hover:scale-105">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="192px"
                          className="object-cover"
                        />
                      </div>
                    </a>
                    <a href={project.link} className="block">
                      <h3 className="text-sm font-bold text-white hover:text-accent transition-colors uppercase leading-tight tracking-wider mb-3 text-center">
                        {project.title}
                      </h3>
                    </a>
                    <div className="text-sm font-light text-white uppercase tracking-wide text-center mb-2">
                      {project.client}
                    </div>
                    <div className="text-sm text-neutral-500 mt-1 text-center">
                      {project.location}
                    </div>
                  </div>

                  {/* Desktop/Tablet layout: horizontal */}
                  <div className="hidden sm:flex flex-row gap-6 mb-4">
                    <a href={project.link} className="flex-shrink-0">
                      <div className="relative w-40 h-40 rounded-lg overflow-hidden bg-neutral-800 border border-white/10 transition-transform duration-300 hover:scale-105">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(max-width: 640px) 192px, 160px"
                          className="object-cover"
                        />
                      </div>
                    </a>

                    <div className="flex flex-col justify-start">
                      <a href={project.link}>
                        <h3 className="text-sm font-bold text-white hover:text-accent uppercase transition-colors leading-tight tracking-wider mb-3">
                          {project.title}
                        </h3>
                      </a>
                      <div className="text-sm font-light text-white uppercase tracking-wide mb-2">
                        {project.client}
                      </div>
                      <div className="text-sm text-neutral-500 mt-1">
                        {project.location}
                      </div>
                    </div>
                  </div>

                  <p className="text-neutral-400 mb-6 flex-grow text-sm leading-relaxed text-justify">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 text-neutral-300 border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
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

export default ProjectsSection;
