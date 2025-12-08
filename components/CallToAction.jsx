"use client";

import React from "react";
import Image from "next/image";
import { AnimatedGradientButton } from "@/components/ui/animated-gradient-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const CallToAction = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-12 md:py-24">
      <div className="relative rounded-2xl border border-light/10 bg-gradient-to-br from-card/50 to-dark/50 overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(40%_128px_at_50%_0%,theme(backgroundColor.accent/10%),transparent)]" />

        <div className="relative flex flex-col md:flex-row items-center gap-4 md:gap-10 p-8 md:p-12 lg:px-16">
          {/* Image Section */}
          <div className="flex-shrink-0 flex flex-col items-center gap-4 lg:ml-0">
            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-2 border-accent/20 shadow-2xl">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/hero/about-poster.webp`}
                alt="Viacheslav Danilov"
                fill
                className="object-cover brightness-150"
                priority
              />
            </div>

            {/* Signature */}
            <div className="relative w-48 h-16">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/hero/signature.webp`}
                alt="Viacheslav Danilov Signature"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-6 md:pl-8 lg:pl-12 lg:pr-0">
            <div className="space-y-4 w-full">
              <h2 className="text-2xl md:text-4xl font-bold text-light">
                Let's Build What Matters
              </h2>
              <p className="text-base md:text-lg text-gray-400 leading-relaxed text-center md:text-left">
                Whether you are looking to scale your AI capabilities, lead
                complex research initiatives, or build high-performing technical
                teams, I'm here to help transform your vision into reality
              </p>
            </div>

            {/* Contact Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <AnimatedGradientButton
                href="mailto:viacheslav.danilov@gmail.com"
                target="_blank"
                gradient="blue"
                ariaLabel="Send email"
                className="text-base lg:text-lg font-medium w-full sm:w-auto"
              >
                <>
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="mr-2 w-5 h-5"
                    style={{
                      width: "1.25rem",
                      height: "1.25rem",
                      display: "inline-block",
                    }}
                  />
                  Email Me
                </>
              </AnimatedGradientButton>

              <AnimatedGradientButton
                href="https://www.linkedin.com/in/viacheslav-danilov/"
                target="_blank"
                gradient="blue"
                ariaLabel="Connect on LinkedIn"
                className="text-base lg:text-lg font-medium w-full sm:w-auto"
              >
                <>
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    className="mr-2 w-5 h-5"
                    style={{
                      width: "1.25rem",
                      height: "1.25rem",
                      display: "inline-block",
                    }}
                  />
                  Connect on LinkedIn
                </>
              </AnimatedGradientButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
