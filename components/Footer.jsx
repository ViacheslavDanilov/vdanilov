"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faGithub,
  faGoogle,
  faOrcid,
  faResearchgate,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const socialLinks = [
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/viacheslav-danilov/",
    icon: faLinkedin,
  },
  {
    title: "GitHub",
    href: "https://github.com/ViacheslavDanilov",
    icon: faGithub,
  },
  {
    title: "Google Scholar",
    href: "https://scholar.google.com/citations?user=SJidGZkAAAAJ&hl=en",
    icon: faGoogle,
  },
  {
    title: "ORCID",
    href: "https://orcid.org/0000-0002-1413-1381",
    icon: faOrcid,
  },
  {
    title: "ResearchGate",
    href: "https://www.researchgate.net/profile/Viacheslav-Danilov-2",
    icon: faResearchgate,
  },
  {
    title: "Email",
    href: "mailto:viacheslav.danilov@gmail.com",
    icon: faEnvelope,
  },
];

const quickLinks = [
  { title: "Home", href: "/" },
  { title: "Experience", href: "/experience" },
  { title: "Education", href: "/education" },
  { title: "Portfolio", href: "/portfolio" },
  { title: "Publications", href: "/publications" },
  { title: "References", href: "/references" },
];

export function Footer() {
  return (
    <footer className="relative w-full max-w-[1400px] mx-auto flex flex-col items-center justify-center rounded-t-xl border-t border-light/10 bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.accent/8%),transparent)] px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="bg-accent/20 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur" />

      {/* Mobile Layout */}
      <div className="w-full space-y-8 lg:hidden">
        {/* Logo and Description */}
        <AnimatedContainer className="space-y-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/logo.png`}
              alt="Viacheslav Danilov"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
          </div>
          <p className="text-sm text-gray-400 mx-auto max-w-sm">
            Tech Lead · Engineering Manager · Research Scientist
          </p>
        </AnimatedContainer>

        {/* Quick Links and Social Links Grid */}
        <div className="grid grid-cols-2 gap-x-8 sm:gap-x-12 justify-items-center px-8 sm:px-12">
          {/* Quick Links */}
          <AnimatedContainer delay={0.1} className="justify-self-start">
            <div>
              <h3 className="text-xs uppercase tracking-wider text-light font-semibold mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2 text-sm">
                {quickLinks.map((link) => (
                  <li key={link.title}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-accent inline-flex items-center transition-colors duration-300 h-6"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedContainer>

          {/* Social Links */}
          <AnimatedContainer delay={0.2} className="justify-self-end">
            <div>
              <h3 className="text-xs uppercase tracking-wider text-light font-semibold mb-4">
                Connect
              </h3>
              <ul className="space-y-2 text-sm">
                {socialLinks.map((link) => (
                  <li key={link.title}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-accent inline-flex items-center transition-colors duration-300 h-6"
                    >
                      <FontAwesomeIcon
                        icon={link.icon}
                        className="mr-2 w-4 h-4 flex-shrink-0"
                      />
                      <span className="truncate">{link.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedContainer>
        </div>

        {/* Copyright */}
        <AnimatedContainer delay={0.4}>
          <div className="pt-6 border-t border-light/10 text-center">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Viacheslav Danilov. All rights
              reserved.
            </p>
          </div>
        </AnimatedContainer>
      </div>

      {/* Desktop Layout - 3 Columns */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-12 xl:gap-16 w-full items-start">
        {/* Left Column - Logo and Description */}
        <AnimatedContainer className="space-y-4">
          <div className="flex items-center gap-2">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/logo.png`}
              alt="Viacheslav Danilov"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
          </div>
          <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
            Tech Lead · Engineering Manager · Research Scientist
          </p>
          <p className="text-sm text-gray-400 pt-4">
            © {new Date().getFullYear()} Viacheslav Danilov. All rights
            reserved.
          </p>
        </AnimatedContainer>

        {/* Middle Column - Quick Links */}
        <AnimatedContainer delay={0.1}>
          <div>
            <h3 className="text-xs uppercase tracking-wider text-light font-semibold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.title}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-accent inline-flex items-center transition-colors duration-300 h-6"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </AnimatedContainer>

        {/* Right Column - Social Links */}
        <AnimatedContainer delay={0.2}>
          <div>
            <h3 className="text-xs uppercase tracking-wider text-light font-semibold mb-4">
              Connect
            </h3>
            <ul className="space-y-2 text-sm">
              {socialLinks.map((link) => (
                <li key={link.title}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-accent inline-flex items-center transition-colors duration-300 h-6"
                  >
                    <FontAwesomeIcon
                      icon={link.icon}
                      className="mr-2 w-4 h-4 flex-shrink-0"
                    />
                    <span>{link.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </AnimatedContainer>
      </div>
    </footer>
  );
}

function AnimatedContainer({ className, delay = 0.1, children }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
