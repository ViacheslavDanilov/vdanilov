"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import CountUp from "@/components/CountUp";

// Helper function to convert hex color to RGB string
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : "255, 255, 255";
};

// Default configuration constants
const DEFAULT_SPOTLIGHT_RADIUS = 150;
const DEFAULT_GLOW_COLOR = "#ffffff";
const DEFAULT_CARD_BACKGROUND = "#151a1f";
const MOBILE_BREAKPOINT = 768;

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

const Statistics = ({
  enableSpotlight = false,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor = DEFAULT_GLOW_COLOR,
}) => {
  const gridRef = useRef(null);
  const isMobile = useMobileDetection();
  const shouldDisableAnimations = disableAnimations || isMobile;

  const stats = [
    {
      value: 10,
      suffix: "+",
      label: "Years of Expertise",
      duration: 2,
      delay: 0,
    },
    {
      value: 15,
      suffix: "+",
      label: "ML and AI Projects",
      duration: 2,
      delay: 0.1,
    },
    {
      value: 50,
      suffix: "k",
      label: "Lines of Code Written",
      duration: 2,
      delay: 0.2,
    },
    {
      value: 40,
      suffix: "",
      label: "Research Publications",
      duration: 2,
      delay: 0.3,
    },
    {
      value: 9,
      suffix: "",
      label: "Universities Worked At",
      duration: 2,
      delay: 0.4,
    },
    {
      value: 6,
      suffix: "",
      label: "Countries of Long-term Living",
      duration: 2,
      delay: 0.5,
    },
  ];

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

      <section
        id="statistics"
        className="w-full max-w-7xl mx-auto py-12 md:py-24 px-6"
      >
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-light mb-4">
            Career Highlights
          </h2>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto leading-relaxed">
            Building scalable ML and AI solutions and advancing research across
            multiple domains, companies and countries
          </p>
        </div>

        <BentoCardGrid gridRef={gridRef}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {stats.map((stat) => {
              const baseClassName = `card flex flex-col relative w-full h-full p-6 md:p-10 rounded-xl border border-solid overflow-hidden transition-all duration-300 ease-in-out text-center ${
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
                  key={stat.label.toLowerCase().replace(/\s+/g, "-")}
                  className={baseClassName}
                  style={cardStyle}
                >
                  <div className="text-4xl md:text-5xl font-semibold text-accent mb-3">
                    <CountUp
                      from={0}
                      to={stat.value}
                      duration={stat.duration}
                      delay={stat.delay}
                      className="inline-block"
                    />
                    <span className="text-accent">{stat.suffix}</span>
                  </div>
                  <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </BentoCardGrid>
      </section>
    </>
  );
};

export default Statistics;
