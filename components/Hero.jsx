"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FlipWords } from "@/components/ui/flip-words";
import { AnimatedGradientButton } from "@/components/ui/animated-gradient-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";

const Hero = () => {
  const roles = ["Tech Lead", "Engineering Manager", "Research Scientist"];

  const ButtonContent = () => (
    <>
      <FontAwesomeIcon
        icon={faFileArrowDown}
        className="mr-2 w-5 h-5"
        style={{ width: "1.25rem", height: "1.25rem", display: "inline-block" }}
      />
      Download CV
    </>
  );

  return (
    <section id="hero" className="w-full max-w-7xl mx-auto px-6 py-12 md:py-24">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10">
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
            {/* Science-driven AI. Engineering-led execution. Technically inspired leadership. */}
            Fusing Science with Engineering Precision
          </p>

          {/* CTA Button - Desktop only */}
          <div className="hidden md:flex items-center justify-start pt-6">
            <AnimatedGradientButton
              href="https://drive.google.com/file/d/1jYs54eFCYc367ZKhWjH1Xfry4_sFI7Ir/view?usp=drive_link"
              target="_blank"
              ariaLabel="Download CV"
              className="text-base lg:text-lg font-medium"
            >
              <ButtonContent />
            </AnimatedGradientButton>
          </div>
        </div>

        {/* Video Content */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-accent/20 shadow-2xl bg-dark">
            <img
              src="/hero/hero-poster.webp"
              alt="Viacheslav Danilov portrait"
              className="absolute inset-0 w-full h-full object-cover brightness-175"
            />
            <video
              autoPlay
              muted
              loop
              playsInline
              webkit-playsinline="true"
              preload="auto"
              className="relative w-full h-full object-cover brightness-150"
            >
              <source src="/hero/hero-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* CTA Button - Mobile only (below video) */}
        <div className="flex md:hidden items-center justify-center w-full">
          <AnimatedGradientButton
            href="https://drive.google.com/file/d/1jYs54eFCYc367ZKhWjH1Xfry4_sFI7Ir/view?usp=drive_link"
            target="_blank"
            ariaLabel="Download CV"
            className="text-base lg:text-lg font-medium"
          >
            <ButtonContent />
          </AnimatedGradientButton>
        </div>
      </div>
    </section>
  );
};

export default Hero;
