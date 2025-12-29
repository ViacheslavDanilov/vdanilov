"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Close mobile menu after navigation
  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  // Handle scroll to show/hide navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show navbar when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        // Scrolling up or near the top
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 10) {
        // Scrolling down and past threshold
        setIsVisible(false);
        setIsMenuOpen(false); // Close mobile menu when hiding navbar
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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
    <nav
      className="fixed top-4 left-0 right-0 z-50 flex justify-center px-6"
      style={{
        transform: isVisible ? "translateY(0)" : "translateY(-130%)",
        transition: "transform 0.3s ease-in-out",
      }}
    >
      {/* Glassmorphism Pill Container */}
      <div className="flex items-center justify-between gap-8 px-6 lg:px-6 h-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg max-w-4xl w-full">
        {/* Logo */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 hover:brightness-125 hover:scale-[1.03] transition-all duration-200 origin-center cursor-pointer flex-shrink-0"
          aria-label="Go to home page"
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              overflow: "hidden",
              display: "block",
            }}
          >
            <Image
              src="/logo.webp"
              alt="Viacheslav Danilov"
              width={40}
              height={40}
              priority
              className="object-contain w-full h-full"
            />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div key={pathname} className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => window.scrollTo(0, 0)}
                className={`px-4 py-2 rounded-full text-md font-normal transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-accent/20 text-accent"
                    : "text-gray-300 hover:text-light hover:bg-light/10"
                }`}
              >
                {item.label}
              </Link>
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
                  const isActive =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);

                  return (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        onClick={handleNavClick}
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
                      </Link>
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
