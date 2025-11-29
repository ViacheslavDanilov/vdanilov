"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { MenuBar } from "@/components/ui/glow-menu";
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";
import { AnimatePresence, motion } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faBriefcase,
  faGraduationCap,
  faFolderOpen,
  faBook,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

// Menu glow gradient configuration
// Cool Blue (Soft)
const GLOW_GRADIENT =
  "radial-gradient(circle, rgba(3, 177, 251, 0.2) 0%, rgba(2,141,200,0.075) 50%, rgba(1,106,150,0) 100%)";
const ICON_COLOR = "text-blue-500";

// Electric Blue (Vibrant)
// const GLOW_GRADIENT = "radial-gradient(circle, rgba(96, 165, 250, 0.40) 0%, rgba(59, 130, 246, 0.22) 50%, rgba(37, 99, 235, 0) 100%)";
// const ICON_COLOR = "text-blue-400";

// Slate Blue (Muted)
// const GLOW_GRADIENT = "radial-gradient(circle, rgba(100, 116, 139, 0.35) 0%, rgba(71, 85, 105, 0.18) 50%, rgba(51, 65, 85, 0) 100%)";
// const ICON_COLOR = "text-slate-400";

// Navigation Items Array
const navItems = [
  {
    icon: faHouse,
    label: "Home",
    href: "/",
    gradient: GLOW_GRADIENT,
    iconColor: ICON_COLOR,
  },
  {
    icon: faBriefcase,
    label: "Experience",
    href: "/experience",
    gradient: GLOW_GRADIENT,
    iconColor: ICON_COLOR,
  },
  {
    icon: faGraduationCap,
    label: "Education",
    href: "/education",
    gradient: GLOW_GRADIENT,
    iconColor: ICON_COLOR,
  },
  {
    icon: faFolderOpen,
    label: "Portfolio",
    href: "/portfolio",
    gradient: GLOW_GRADIENT,
    iconColor: ICON_COLOR,
  },
  {
    icon: faBook,
    label: "Publications",
    href: "/publications",
    gradient: GLOW_GRADIENT,
    iconColor: ICON_COLOR,
  },
  {
    icon: faUsers,
    label: "References",
    href: "/references",
    gradient: GLOW_GRADIENT,
    iconColor: ICON_COLOR,
  },
];

function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("Home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Update active section based on current route
  useEffect(() => {
    const activeItem = navItems.find((item) => item.href === pathname);
    if (activeItem) {
      setActiveSection(activeItem.label);
    }
  }, [pathname]);

  // Navigation handler
  const handleNavClick = (label, href) => {
    router.push(href);
    setIsMenuOpen(false); // Close mobile menu after navigation
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest("nav")) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark/95 backdrop-blur-sm border-b border-accent/20">
      <div className="max-w-7xl mx-auto px-6 py-1 sm:py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer bg-transparent border-none"
            aria-label="Go to home page"
          >
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/logo.png`}
              alt="Viacheslav Danilov"
              className="h-8 sm:h-10 w-auto"
            />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <MenuBar
              items={navItems}
              activeItem={activeSection}
              onItemClick={handleNavClick}
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-light hover:text-accent transition-colors"
            aria-label="Toggle menu"
          >
            <MenuToggleIcon
              open={isMenuOpen}
              className="w-8 h-8"
              duration={500}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-dark/98 backdrop-blur-lg border-b border-accent/20 shadow-lg"
          >
            <nav className="max-w-7xl mx-auto px-6 py-4">
              <ul className="space-y-2">
                {navItems.map((item) => {
                  const isActive = item.label === activeSection;

                  return (
                    <li key={item.label}>
                      <button
                        type="button"
                        onClick={() => handleNavClick(item.label, item.href)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                          isActive
                            ? "bg-accent/10 text-light"
                            : "text-gray-400 hover:bg-accent/5 hover:text-light"
                        }`}
                      >
                        <FontAwesomeIcon
                          icon={item.icon}
                          className={`w-5 h-5 ${isActive ? item.iconColor : ""}`}
                        />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
