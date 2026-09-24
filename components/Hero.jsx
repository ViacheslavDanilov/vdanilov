"use client";

import React from "react";
import Image from "next/image";
import AutoplayVideo from "@/components/AutoplayVideo";
import { FlipWords } from "@/components/ui/flip-words";
import { LiquidButtonLink } from "@/components/ui/liquid-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faFileArrowDown,
} from "@fortawesome/free-solid-svg-icons";

// Rendered twice: in the text column from md, below the portrait on phones
const HeroButtons = ({ className }) => (
  <div className={className}>
    <LiquidButtonLink
      href="https://drive.google.com/file/d/1viI3o1RBDoreQcbCwe5zc2NTWpxU7ouk/view"
      target="_blank"
      ariaLabel="Download CV"
      className="justify-center"
      size="xxl"
      textClassName="text-sm"
    >
      <FontAwesomeIcon icon={faFileArrowDown} className="w-4 h-4" />
      &nbsp;Download CV
    </LiquidButtonLink>
    <LiquidButtonLink
      href="/portfolio"
      ariaLabel="Portfolio"
      className="justify-center"
      size="xxl"
      textClassName="text-sm"
    >
      <FontAwesomeIcon icon={faBriefcase} className="w-4 h-4" />
      &nbsp;Portfolio
    </LiquidButtonLink>
  </div>
);

const Hero = () => {
  const roles = ["Tech Lead", "Engineering Manager", "Research Scientist"];

  return (
    <section id="hero" className="w-full max-w-7xl mx-auto px-6 py-12 md:py-24">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-6 lg:gap-10">
        {/* Text Content */}
        <div className="w-full md:w-1/2 space-y-4 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-semibold text-light tracking-tight">
            Viacheslav Danilov, PhD
          </h1>
          <h2 className="text-2xl md:text-3xl text-gray-400 min-h-[2.0em] flex items-center justify-center md:justify-start">
            <FlipWords words={roles} className="text-light" />
          </h2>

          {/* Tagline */}
          <p className="text-base md:text-lg text-gray-300 max-w-md mx-auto md:mx-0 pt-2">
            Fusing Science with Engineering Precision
          </p>

          <HeroButtons className="hidden md:flex items-center justify-start gap-3 pt-6" />
        </div>

        {/* Video Content */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-accent/20 shadow-2xl bg-dark">
            <Image
              src="/hero/hero-poster.webp"
              alt="Viacheslav Danilov portrait"
              fill
              sizes="(min-width: 768px) 384px, 256px"
              priority
              className="object-cover brightness-175"
            />
            <AutoplayVideo className="relative w-full h-full object-cover brightness-150">
              <source src="/hero/hero-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </AutoplayVideo>
          </div>
        </div>

        <HeroButtons className="flex md:hidden flex-col items-center justify-center gap-3 w-full" />
      </div>
    </section>
  );
};

export default Hero;
