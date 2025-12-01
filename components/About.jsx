"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AnimatedGradientButton } from "@/components/ui/animated-gradient-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faGithub,
  faGoogle,
  faOrcid,
  faResearchgate,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const About = () => {
  const socialLinks = [
    {
      name: "LinkedIn",
      icon: faLinkedin,
      href: "https://www.linkedin.com/in/vdanilov",
      color: "hover:text-[#0A66C2]",
    },
    {
      name: "GitHub",
      icon: faGithub,
      href: "https://github.com/ViacheslavDanilov",
      color: "hover:text-[#FFFFFF]",
    },
    {
      name: "Google Scholar",
      icon: faGoogle,
      href: "https://scholar.google.com/citations?user=YOUR_ID",
      color: "hover:text-[#4285F4]",
    },
    {
      name: "ORCID",
      icon: faOrcid,
      href: "https://orcid.org/0000-0001-5177-8763",
      color: "hover:text-[#A6CE39]",
    },
    {
      name: "ResearchGate",
      icon: faResearchgate,
      href: "https://www.researchgate.net/profile/Viacheslav-Danilov",
      color: "hover:text-[#00D0B1]",
    },
    {
      name: "Email",
      icon: faEnvelope,
      href: "mailto:contact@example.com",
      color: "hover:text-accent",
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
          <video
            autoPlay
            muted
            loop
            playsInline
            webkit-playsinline="true"
            preload="auto"
            className="w-full h-full object-cover"
          >
            <source
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/hero/about.mp4`}
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
        <div className="space-y-4 text-gray-300 text-base leading-relaxed text-center max-w-3xl">
          <p>
            I am an experienced{" "}
            <span className="text-accent font-medium">Lead ML Engineer</span>{" "}
            and{" "}
            <span className="text-accent font-medium">Research Professor</span>{" "}
            based in Barcelona, with a PhD in Computer Science and over 10 years
            of experience in ML.
          </p>
          <p>
            With experience in both academic and industrial environments, I have
            honed my skills in data analysis, ML development, and scientific
            experimentation. I have worked across various machine learning
            areas, from designing predictive models to building scalable
            solutions with frameworks like TensorFlow, PyTorch, and Keras. My
            projects often use cloud services like AWS and GCP to ensure
            efficiency. Throughout my career, I have collaborated on diverse
            projects, with my work featured in journals like Springer,
            Frontiers, and Nature. Whether you need consultation or development
            support, I am here to provide a range of options to explore
            together.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className={`text-gray-400 transition-colors duration-300 ${social.color}`}
            >
              <FontAwesomeIcon icon={social.icon} className="w-6 h-6" />
            </a>
          ))}
        </div>

        {/* Contact Button */}
        <div className="pt-2">
          <AnimatedGradientButton
            href="mailto:contact@example.com"
            target="_blank"
            gradient="blue"
            ariaLabel="Contact me"
            className="text-base font-medium"
          >
            <>
              <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5 mr-2" />
              Contact me
            </>
          </AnimatedGradientButton>
        </div>
      </div>
    </section>
  );
};

export default About;
