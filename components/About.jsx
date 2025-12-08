"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AnimatedGradientButton } from "@/components/ui/animated-gradient-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faGithub,
  faGoogleScholar,
  faOrcid,
  faResearchgate,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const About = () => {
  const socialLinks = [
    {
      name: "LinkedIn",
      icon: faLinkedin,
      href: "https://www.linkedin.com/in/viacheslav-danilov/",
      color: "hover:text-light",
    },
    {
      name: "GitHub",
      icon: faGithub,
      href: "https://github.com/ViacheslavDanilov",
      color: "hover:text-light",
    },
    {
      name: "Google Scholar",
      icon: faGoogleScholar,
      href: "https://scholar.google.com/citations?user=SJidGZkAAAAJ&hl=en",
      color: "hover:text-light",
    },
    {
      name: "ORCID",
      icon: faOrcid,
      href: "https://orcid.org/0000-0002-1413-1381",
      color: "hover:text-light",
    },
    {
      name: "ResearchGate",
      icon: faResearchgate,
      href: "https://www.researchgate.net/profile/Viacheslav-Danilov-2",
      color: "hover:text-light",
    },
    {
      name: "Email",
      icon: faEnvelope,
      href: "mailto:viacheslav.danilov@gmail.com",
      color: "hover:text-light",
    },
  ];

  return (
    <section
      id="about"
      className="w-full max-w-7xl mx-auto px-6 py-12 md:py-24"
    >
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-light mb-4">
          About Me
        </h2>
        <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
          Bridging science and engineering to solve complex challenges
        </p>
      </div>

      <div className="flex flex-col items-center justify-center gap-8 max-w-4xl mx-auto">
        {/* Video */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-accent/20 shadow-2xl bg-dark">
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/hero/about-poster.webp`}
            alt="Viacheslav Danilov in professional setting"
            className="absolute inset-0 w-full h-full object-cover brightness-150"
          />
          <video
            autoPlay
            muted
            loop
            playsInline
            webkit-playsinline="true"
            preload="auto"
            className="relative w-full h-full object-cover brightness-125"
          >
            <source
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/hero/about-video.mp4`}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Signature (Commented out) */}
        {/* <div className="relative w-48 h-24">
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/hero/signature.webp`}
            alt="Viacheslav Danilov Signature"
            fill
            className="object-contain"
          />
        </div> */}

        {/* Description */}
        <div className="space-y-6 text-light leading-loose text-justify max-w-5xl">
          <p>
            Experienced{" "}
            <span className="font-semibold text-light/90 relative inline-block px-2">
              <span className="relative z-10">Lead ML Engineer</span>
              <span className="absolute -inset-2 bg-accent/20 blur-md rounded-full -z-10 scale-100"></span>
            </span>{" "}
            and{" "}
            <span className="font-semibold text-light/90 relative inline-block px-2">
              <span className="relative z-10">Research Scientist</span>
              <span className="absolute -inset-2 bg-accent/20 blur-md rounded-full -z-10 scale-100"></span>
            </span>{" "}
            based in Barcelona, with a PhD in Computer Science and 10 years of
            experience in AI and data science. Having worked in both academia
            and industry, I have sharpened skills in data analysis, AI/ML
            development, and scientific experimentation. I cover the full
            spectrum from designing predictive models to engineering scalable
            solutions with modern frameworks and cloud platforms. My projects
            often leverage cloud infrastructure to maximize efficiency. Over my
            career, I have collaborated on a variety of initiatives, and my work
            has been published in scientific venues like Springer, Frontiers,
            and Nature.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap items-center justify-center gap-8 pt-2">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className={`text-gray-400 transition-all duration-300 transform hover:scale-110 ${social.color}`}
              style={{ display: "inline-block" }}
            >
              <FontAwesomeIcon
                icon={social.icon}
                className="w-5 h-5"
                style={{
                  width: "1.25rem",
                  height: "1.25rem",
                  display: "block",
                }}
              />
            </a>
          ))}
        </div>

        {/* Contact Button */}
        <div className="pt-2">
          <AnimatedGradientButton
            href="https://wa.me/+34634810041"
            target="_blank"
            gradient="blue"
            ariaLabel="Contact me"
            className="text-base lg:text-lg font-medium"
          >
            <>
              <FontAwesomeIcon
                icon={faWhatsapp}
                className="mr-2 w-5 h-5"
                style={{
                  width: "1.25rem",
                  height: "1.25rem",
                  display: "inline-block",
                }}
              />
              Contact me
            </>
          </AnimatedGradientButton>
        </div>
      </div>
    </section>
  );
};

export default About;
