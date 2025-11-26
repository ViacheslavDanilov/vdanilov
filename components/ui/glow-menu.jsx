"use client";

import * as React from "react";
import { motion } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cn } from "@/lib/utils";

// Animation Variants
const itemVariants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
};

const backVariants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
};

const glowVariants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 2,
    transition: {
      opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
      scale: { duration: 0.5, type: "spring", stiffness: 300, damping: 25 },
    },
  },
};

const navGlowVariants = {
  initial: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const sharedTransition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  duration: 0.5,
};

export const MenuBar = React.forwardRef(
  ({ className, items, activeItem, onItemClick, ...props }, ref) => {
    return (
      <motion.nav
        ref={ref}
        className={cn(
          "p-2 rounded-2xl bg-gradient-to-b from-dark/80 to-dark/40 backdrop-blur-lg border border-accent/40 shadow-lg relative overflow-hidden",
          className,
        )}
        initial="initial"
        whileHover="hover"
        {...props}
      >
        <motion.div
          className="absolute -inset-2 bg-gradient-radial from-transparent via-blue-400/30 via-30% via-purple-400/30 via-60% via-red-400/30 via-90% to-transparent rounded-3xl z-0 pointer-events-none"
          variants={navGlowVariants}
        />
        <ul className="flex items-center gap-2 relative z-10">
          {items.map((item) => {
            const isActive = item.label === activeItem;

            return (
              <motion.li key={item.label} className="relative">
                <button
                  type="button"
                  onClick={() => onItemClick?.(item.label, item.href)}
                  className="block w-full cursor-pointer"
                >
                  <motion.div
                    className="block rounded-xl overflow-visible group relative"
                    style={{ perspective: "600px" }}
                    whileHover="hover"
                    initial="initial"
                  >
                    <motion.div
                      className="absolute inset-0 z-0 pointer-events-none"
                      variants={glowVariants}
                      animate={isActive ? "hover" : "initial"}
                      style={{
                        background: item.gradient,
                        opacity: isActive ? 1 : 0,
                        borderRadius: "16px",
                      }}
                    />
                    <motion.div
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 relative z-10 bg-transparent transition-colors rounded-xl",
                        isActive
                          ? "text-light"
                          : "text-gray-400 group-hover:text-light",
                      )}
                      variants={itemVariants}
                      transition={sharedTransition}
                      style={{
                        transformStyle: "preserve-3d",
                        transformOrigin: "center bottom",
                      }}
                    >
                      <span
                        className={cn(
                          "transition-colors duration-300",
                          isActive ? item.iconColor : "text-light",
                          // `group-hover:${item.iconColor}`,
                        )}
                      >
                        <FontAwesomeIcon icon={item.icon} className="h-5 w-5" />
                      </span>
                      <span>{item.label}</span>
                    </motion.div>
                    <motion.div
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 absolute inset-0 z-10 bg-transparent transition-colors rounded-xl",
                        isActive
                          ? "text-light"
                          : "text-gray-400 group-hover:text-light",
                      )}
                      variants={backVariants}
                      transition={sharedTransition}
                      style={{
                        transformStyle: "preserve-3d",
                        transformOrigin: "center top",
                        rotateX: 90,
                      }}
                    >
                      <span
                        className={cn(
                          "transition-colors duration-300",
                          isActive ? item.iconColor : "text-light",
                          // `group-hover:${item.iconColor}`,
                        )}
                      >
                        <FontAwesomeIcon icon={item.icon} className="h-5 w-5" />
                      </span>
                      <span>{item.label}</span>
                    </motion.div>
                  </motion.div>
                </button>
              </motion.li>
            );
          })}
        </ul>
      </motion.nav>
    );
  },
);

MenuBar.displayName = "MenuBar";
