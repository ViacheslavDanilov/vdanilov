"use client";

import { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

// Helper function to convert hex color to RGB string
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : "255, 255, 255";
};

// Default configuration constants
const DEFAULT_PARTICLE_COUNT = 16;
const DEFAULT_SPOTLIGHT_COLOR = "rgba(255, 255, 255, 0.6)";
const DEFAULT_ENABLE_STARS = false;
const DEFAULT_ENABLE_SPOTLIGHT = true;
const DEFAULT_ENABLE_BORDER_GLOW = true;
const DEFAULT_ENABLE_TILT = false;
const DEFAULT_CLICK_EFFECT = false;
const DEFAULT_ENABLE_MAGNETISM = false;

const createParticleElement = (x, y, color) => {
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

// Hook for particle/star effects
const useParticleEffect = (
  cardRef,
  { enabled, particleCount, spotlightColor, disableAnimations },
) => {
  const particlesRef = useRef([]);
  const timeoutsRef = useRef([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef([]);
  const particlesInitialized = useRef(false);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;

    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(
        Math.random() * width,
        Math.random() * height,
        spotlightColor,
      ),
    );
    particlesInitialized.current = true;
  }, [particleCount, spotlightColor]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

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
    if (!enabled || disableAnimations || !cardRef.current) return;

    const element = cardRef.current;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      isHoveredRef.current = false;
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      clearAllParticles();
    };
  }, [enabled, disableAnimations, animateParticles, clearAllParticles]);
};

// Hook for tilt and magnetism effects
const useCardInteractions = (
  cardRef,
  { enableTilt, enableMagnetism, disableAnimations },
) => {
  const magnetismAnimationRef = useRef(null);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;
    if (!enableTilt && !enableMagnetism) return;

    const element = cardRef.current;

    const handleMouseMove = (e) => {
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

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
      magnetismAnimationRef.current?.kill();
    };
  }, [enableTilt, enableMagnetism, disableAnimations]);
};

// Hook for click effect
const useClickEffect = (
  cardRef,
  { enabled, spotlightColor, disableAnimations },
) => {
  useEffect(() => {
    if (!enabled || disableAnimations || !cardRef.current) return;

    const element = cardRef.current;

    const handleClick = (e) => {
      const rgbColor = hexToRgb(spotlightColor);
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

    element.addEventListener("click", handleClick);

    return () => {
      element.removeEventListener("click", handleClick);
    };
  }, [enabled, spotlightColor, disableAnimations]);
};

// Hook for spotlight effect (simple mouse tracking for individual cards)
const useSpotlightEffect = (
  cardRef,
  { enabled, spotlightColor, disableAnimations },
) => {
  useEffect(() => {
    if (!enabled || disableAnimations || !cardRef.current) return;

    const element = cardRef.current;

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      element.style.setProperty("--mouse-x", `${x}px`);
      element.style.setProperty("--mouse-y", `${y}px`);
    };

    element.addEventListener("mousemove", handleMouseMove);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
    };
  }, [enabled, disableAnimations]);
};

/**
 * BentoCard - A flexible, reusable card component with configurable visual effects
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.style - Inline styles
 * @param {string} props.spotlightColor - Spotlight color (hex or rgba)
 * @param {boolean} props.enableStars - Enable particle/star effect
 * @param {boolean} props.enableMagnetism - Enable magnetic cursor following
 * @param {boolean} props.enableTilt - Enable 3D tilt effect
 * @param {boolean} props.enableSpotlight - Enable spotlight effect
 * @param {boolean} props.enableBorderGlow - Enable border glow effect
 * @param {boolean} props.enableClickEffect - Enable ripple click effect
 * @param {boolean} props.disableAnimations - Master override for all animations
 * @param {number} props.particleCount - Number of particles when stars enabled
 */
const BentoCard = ({
  children,
  className = "",
  style = {},
  spotlightColor = DEFAULT_SPOTLIGHT_COLOR,
  enableStars = DEFAULT_ENABLE_STARS,
  enableMagnetism = DEFAULT_ENABLE_MAGNETISM,
  enableTilt = DEFAULT_ENABLE_TILT,
  enableSpotlight = DEFAULT_ENABLE_SPOTLIGHT,
  enableBorderGlow = DEFAULT_ENABLE_BORDER_GLOW,
  enableClickEffect = DEFAULT_CLICK_EFFECT,
  disableAnimations = false,
  particleCount = DEFAULT_PARTICLE_COUNT,
}) => {
  const cardRef = useRef(null);

  // Apply all effects via hooks
  useParticleEffect(cardRef, {
    enabled: enableStars,
    particleCount,
    spotlightColor,
    disableAnimations,
  });

  useCardInteractions(cardRef, {
    enableTilt,
    enableMagnetism,
    disableAnimations,
  });

  useClickEffect(cardRef, {
    enabled: enableClickEffect,
    spotlightColor,
    disableAnimations,
  });

  useSpotlightEffect(cardRef, {
    enabled: enableSpotlight,
    spotlightColor,
    disableAnimations,
  });

  // Prepare CSS classes
  const cardClasses = cn(
    "bento-card relative overflow-hidden rounded-xl border transition-all duration-300 ease-in-out",
    enableBorderGlow && "bento-card--border-glow",
    enableSpotlight && "bento-card--spotlight",
    className,
  );

  // Set spotlight color as CSS variable
  const rgbColor = hexToRgb(spotlightColor);
  const cardStyle = {
    ...style,
    "--spotlight-color": rgbColor,
    "--mouse-x": "50%",
    "--mouse-y": "50%",
  };

  return (
    <div ref={cardRef} className={cardClasses} style={cardStyle}>
      {enableSpotlight && (
        <div className="bento-card__glow absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      )}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

export default BentoCard;
