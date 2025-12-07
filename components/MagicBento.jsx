"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";

// Default configuration constants
const DEFAULT_PARTICLE_COUNT = 16;
const DEFAULT_SPOTLIGHT_RADIUS = 200;
const DEFAULT_GLOW_COLOR = "#03b1fb";
const DEFAULT_CARD_BACKGROUND = "#151a1f";
const DEFAULT_ENABLE_STARS = true;
const DEFAULT_ENABLE_SPOTLIGHT = true;
const DEFAULT_ENABLE_BORDER_GLOW = true;
const DEFAULT_ENABLE_TILT = false;
const DEFAULT_CLICK_EFFECT = true;
const DEFAULT_ENABLE_MAGNETISM = false;
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
    title: "Applied ML Across Industries",
    description:
      "Developing applied ML and AI systems for <highlight>insurance, diagnostics, and pharma</highlight> with deployments involving AmTrust, CNA, Plateau Group, leading medical centers, and pharmaceutical companies like Bristol Myers Squibb, Boehringer Ingelheim, and Volastra Therapeutics.",
    label: "Industry Applications",
  },
];

// Helper function to convert hex color to RGB string
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : "3, 177, 251";
};

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

const createParticleElement = (x, y, color = DEFAULT_GLOW_COLOR) => {
  const rgbColor = hexToRgb(color);
  const el = document.createElement("div");
  el.className = "particle";
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${rgbColor}, 1);
    box-shadow: 0 0 6px rgba(${rgbColor}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
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

const ParticleCard = ({
  children,
  className = "",
  disableAnimations = false,
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  clickEffect = false,
  enableMagnetism = false,
}) => {
  const cardRef = useRef(null);
  const particlesRef = useRef([]);
  const timeoutsRef = useRef([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef([]);
  const particlesInitialized = useRef(false);
  const magnetismAnimationRef = useRef(null);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;

    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(
        Math.random() * width,
        Math.random() * height,
        glowColor,
      ),
    );
    particlesInitialized.current = true;
  }, [particleCount, glowColor]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    magnetismAnimationRef.current?.kill();

    particlesRef.current.forEach((particle) => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "back.in(1.7)",
        onComplete: () => {
          particle.parentNode?.removeChild(particle);
        },
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;

    if (!particlesInitialized.current) {
      initializeParticles();
    }

    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;

        const clone = particle.cloneNode(true);
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);

        gsap.fromTo(
          clone,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" },
        );

        gsap.to(clone, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: "none",
          repeat: -1,
          yoyo: true,
        });

        gsap.to(clone, {
          opacity: 0.3,
          duration: 1.5,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
        });
      }, index * 100);

      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;

    const element = cardRef.current;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 5,
          rotateY: 5,
          duration: 0.3,
          ease: "power2.out",
          transformPerspective: 1000,
        });
      }
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      if (enableMagnetism) {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleMouseMove = (e) => {
      if (!enableTilt && !enableMagnetism) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(element, {
          rotateX,
          rotateY,
          duration: 0.1,
          ease: "power2.out",
          transformPerspective: 1000,
        });
      }

      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.05;
        const magnetY = (y - centerY) * 0.05;

        magnetismAnimationRef.current = gsap.to(element, {
          x: magnetX,
          y: magnetY,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleClick = (e) => {
      if (!clickEffect) return;

      const rgbColor = hexToRgb(glowColor);
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height),
      );

      const ripple = document.createElement("div");
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${rgbColor}, 0.4) 0%, rgba(${rgbColor}, 0.2) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `;

      element.appendChild(ripple);

      gsap.fromTo(
        ripple,
        {
          scale: 0,
          opacity: 1,
        },
        {
          scale: 1,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => ripple.remove(),
        },
      );
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);
    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("click", handleClick);

    return () => {
      isHoveredRef.current = false;
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("click", handleClick);
      clearAllParticles();
    };
  }, [
    animateParticles,
    clearAllParticles,
    disableAnimations,
    enableTilt,
    enableMagnetism,
    clickEffect,
    glowColor,
  ]);

  return (
    <div
      ref={cardRef}
      className={`${className} relative overflow-hidden`}
      style={{ ...style, position: "relative", overflow: "hidden" }}
    >
      {children}
    </div>
  );
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

// Custom hook for card interactions (tilt, magnetism, click effect)
const useCardInteractions = (
  elementRef,
  {
    enableTilt,
    enableMagnetism,
    clickEffect,
    glowColor,
    shouldDisableAnimations,
  },
) => {
  useEffect(() => {
    if (shouldDisableAnimations || !elementRef.current) return;

    const element = elementRef.current;

    const handleMouseMove = (e) => {
      if (!enableTilt && !enableMagnetism) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(element, {
          rotateX,
          rotateY,
          duration: 0.1,
          ease: "power2.out",
          transformPerspective: 1000,
        });
      }

      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.05;
        const magnetY = (y - centerY) * 0.05;

        gsap.to(element, {
          x: magnetX,
          y: magnetY,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleMouseLeave = () => {
      if (enableTilt) {
        gsap.to(element, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      if (enableMagnetism) {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleClick = (e) => {
      if (!clickEffect) return;

      const rgbColor = hexToRgb(glowColor);
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height),
      );

      const ripple = document.createElement("div");
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${rgbColor}, 0.4) 0%, rgba(${rgbColor}, 0.2) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `;

      element.appendChild(ripple);

      gsap.fromTo(
        ripple,
        {
          scale: 0,
          opacity: 1,
        },
        {
          scale: 1,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => ripple.remove(),
        },
      );
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);
    element.addEventListener("click", handleClick);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
      element.removeEventListener("click", handleClick);
    };
  }, [
    elementRef,
    enableTilt,
    enableMagnetism,
    clickEffect,
    glowColor,
    shouldDisableAnimations,
  ]);
};

// Simple card component without stars that uses the hook
const SimpleCard = ({
  children,
  className,
  style,
  enableTilt,
  enableMagnetism,
  clickEffect,
  glowColor,
  shouldDisableAnimations,
}) => {
  const cardRef = useRef(null);

  useCardInteractions(cardRef, {
    enableTilt,
    enableMagnetism,
    clickEffect,
    glowColor,
    shouldDisableAnimations,
  });

  return (
    <div ref={cardRef} className={className} style={style}>
      {children}
    </div>
  );
};

const MagicBento = ({
  enableStars = DEFAULT_ENABLE_STARS,
  enableSpotlight = DEFAULT_ENABLE_SPOTLIGHT,
  enableBorderGlow = DEFAULT_ENABLE_BORDER_GLOW,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  enableTilt = DEFAULT_ENABLE_TILT,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = DEFAULT_CLICK_EFFECT,
  enableMagnetism = DEFAULT_ENABLE_MAGNETISM,
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

              if (enableStars) {
                return (
                  <ParticleCard
                    key={index}
                    className={baseClassName}
                    style={cardStyle}
                    disableAnimations={shouldDisableAnimations}
                    particleCount={particleCount}
                    glowColor={glowColor}
                    enableTilt={enableTilt}
                    clickEffect={clickEffect}
                    enableMagnetism={enableMagnetism}
                  >
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
                  </ParticleCard>
                );
              }

              return (
                <SimpleCard
                  key={index}
                  className={baseClassName}
                  style={cardStyle}
                  enableTilt={enableTilt}
                  enableMagnetism={enableMagnetism}
                  clickEffect={clickEffect}
                  glowColor={glowColor}
                  shouldDisableAnimations={shouldDisableAnimations}
                >
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
                </SimpleCard>
              );
            })}
          </div>
        </BentoCardGrid>
      </section>
    </>
  );
};

export default MagicBento;
