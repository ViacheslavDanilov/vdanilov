"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
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

// Navigation Items Array
const navItems = [
  {
    icon: faHouse,
    label: "Home",
    href: "/",
  },
  {
    icon: faBriefcase,
    label: "Experience",
    href: "/experience",
  },
  {
    icon: faGraduationCap,
    label: "Education",
    href: "/education",
  },
  {
    icon: faFolderOpen,
    label: "Portfolio",
    href: "/portfolio",
  },
  {
    icon: faBook,
    label: "Publications",
    href: "/publications",
  },
  {
    icon: faUsers,
    label: "References",
    href: "/references",
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
    setActiveSection(label); // Update active section immediately
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
    <nav className="fixed top-4 left-0 right-0 z-50 flex justify-center px-6">
      {/* Glassmorphism Pill Container */}
      <div className="flex items-center justify-between gap-8 px-6 lg:px-6 h-14 rounded-full bg-dark/40 backdrop-blur-lg border border-white/10 shadow-lg max-w-4xl w-full">
        {/* Logo */}
        <button
          onClick={() => router.push("/")}
          className="inline-flex items-center gap-2 hover:brightness-125 hover:scale-[1.03] transition-all duration-200 origin-center cursor-pointer bg-transparent border-none flex-shrink-0"
          aria-label="Go to home page"
        >
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/logo.png`}
            alt="Viacheslav Danilov"
            className="h-8 w-auto"
          />
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = item.label === activeSection;
            return (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.label, item.href)}
                className={`px-4 py-2 rounded-full text-md font-normal transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-accent/20 text-accent"
                    : "text-gray-300 hover:text-light hover:bg-light/10"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden text-light hover:text-accent transition-colors flex-shrink-0"
          aria-label="Toggle menu"
        >
          <MenuToggleIcon
            open={isMenuOpen}
            className="w-8 h-8"
            duration={500}
          />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed top-20 left-6 right-6 bg-dark/60 backdrop-blur-lg border border-white/10 shadow-lg rounded-2xl"
          >
            <div className="px-6 py-4">
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
                            ? "bg-accent/20 text-accent"
                            : "text-gray-400 hover:bg-light/10 hover:text-light"
                        }`}
                      >
                        <FontAwesomeIcon
                          icon={item.icon}
                          className={`w-5 h-5 ${isActive ? "text-accent" : ""}`}
                        />
                        <span className="font-normal">{item.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
