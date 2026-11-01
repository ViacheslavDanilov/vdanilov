"use client";

import React from "react";
import Image from "next/image";
import AutoplayVideo from "@/components/AutoplayVideo";
import { FlipWords } from "@/components/ui/flip-words";
import { LiquidButtonLink } from "@/components/ui/liquid-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faGithub,
  faGoogleScholar,
  faOrcid,
  faResearchgate,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faFileArrowDown } from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/lib/utils";

const EMAIL = "viacheslav.v.danilov@gmail.com";

const socialLinks = [
  {
    name: "LinkedIn",
    icon: faLinkedin,
    href: "https://www.linkedin.com/in/viacheslav-danilov/",
  },
  {
    name: "GitHub",
    icon: faGithub,
    href: "https://github.com/ViacheslavDanilov",
  },
  {
    name: "ResearchGate",
    icon: faResearchgate,
    href: "https://www.researchgate.net/profile/Viacheslav-Danilov-2",
  },
  {
    name: "Google Scholar",
    icon: faGoogleScholar,
    href: "https://scholar.google.com/citations?user=SJidGZkAAAAJ&hl=en",
  },
  {
    name: "ORCID",
    icon: faOrcid,
    href: "https://orcid.org/0000-0002-1413-1381",
  },
  {
    name: "Email",
    icon: faEnvelope,
    href: `mailto:${EMAIL}`,
  },
];

// Wraps between words without justify stretching the phrase; "before" stays on its first word's line
const Highlight = ({ before, children }) => {
  const [first, ...rest] = children.split(" ").map((word, i, words) => (
    <span
      key={word}
      className={cn(
        "inline-block whitespace-pre bg-accent/10 text-accent font-semibold",
        i === 0 && "pl-4 rounded-l-3xl",
        i === words.length - 1 && "pr-4 rounded-r-3xl",
      )}
    >
      {i === 0 ? word : ` ${word}`}
    </span>
  ));
  return (
    <>
      {before ? (
        <span className="whitespace-nowrap">
          {before} {first}
        </span>
      ) : (
        first
      )}
      {rest}
    </>
  );
};

const Hero = () => {
  const roles = ["Tech Lead", "Engineering Manager", "Research Scientist"];

  return (
    <section
      id="hero"
      className="w-full max-w-7xl mx-auto px-6 pb-12 overflow-x-clip lg:py-12 lg:min-h-[min(calc(100svh-6rem),66rem)] lg:flex lg:flex-col lg:justify-center"
    >
      <div className="mb-6 flex flex-col sm:flex-row sm:flex-wrap items-center justify-center lg:justify-start sm:gap-x-3 text-lg md:text-xl">
        <h1 className="font-semibold text-light">Viacheslav Danilov, PhD</h1>
        <span aria-hidden="true" className="max-sm:hidden text-gray-500">
          /
        </span>
        <div className="relative min-h-[2em] flex items-center text-gray-400">
          <FlipWords words={roles} className="text-light" />
        </div>
      </div>

      <p className="mb-8 lg:mb-10 text-center lg:text-left text-balance text-3xl sm:text-5xl xl:[@media(min-height:800px)]:text-6xl font-semibold leading-[1.1] tracking-tight text-light">
        Bridging Science and Engineering to Solve Complex Challenges
      </p>

      <div className="flex flex-col items-center gap-8 lg:grid lg:grid-cols-2 lg:gap-16">
        <div className="order-1 lg:order-none relative size-56 sm:size-64 lg:size-[clamp(18rem,calc(100svh-24rem),28rem)] justify-self-center rounded-full overflow-hidden border-4 border-accent/20 shadow-2xl bg-dark">
          <Image
            src="/hero/hero-poster.webp"
            alt="Viacheslav Danilov portrait"
            fill
            sizes="(min-width: 1024px) 448px, (min-width: 640px) 256px, 224px"
            priority
            className="object-cover brightness-175"
          />
          <AutoplayVideo className="relative w-full h-full object-cover brightness-150">
            <source src="/hero/hero-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </AutoplayVideo>
        </div>

        {/* On phones and tablets the buttons come before the paragraph, so they show on the first screen */}
        <div className="contents lg:flex lg:flex-col lg:gap-8">
          <p className="order-3 lg:order-none max-w-2xl text-light text-base xl:text-lg leading-relaxed text-justify">
            <Highlight>Lead AI/ML Engineer</Highlight>{" "}
            <Highlight before="and">Research Scientist</Highlight> with a PhD in
            Computer Science and over 10 years across academia and industry. I
            take machine learning from first experiment to production: medical
            signal and image analysis, computer vision, time series, and LLM and
            RAG systems. I have led teams of developers and researchers,
            supervised PhD students and postdocs, and published nearly 50
            peer-reviewed papers.
          </p>

          <div className="order-2 lg:order-none flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3">
            <LiquidButtonLink
              href="https://drive.google.com/uc?export=download&id=1viI3o1RBDoreQcbCwe5zc2NTWpxU7ouk"
              ariaLabel="Download CV"
              size="xl"
              className="px-3.5 sm:h-14 sm:px-10"
              textClassName="text-sm"
            >
              <FontAwesomeIcon icon={faFileArrowDown} className="w-4 h-4" />
              &nbsp;Download CV
            </LiquidButtonLink>
            <LiquidButtonLink
              href={`mailto:${EMAIL}`}
              ariaLabel="Contact me"
              size="xl"
              className="px-3.5 sm:h-14 sm:px-10"
              textClassName="text-sm"
            >
              <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4" />
              &nbsp;Contact me
            </LiquidButtonLink>
          </div>

          <div className="order-4 lg:order-none flex flex-wrap items-center justify-center lg:justify-start gap-8">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target={
                  social.href.startsWith("mailto:") ? undefined : "_blank"
                }
                rel={
                  social.href.startsWith("mailto:")
                    ? undefined
                    : "noopener noreferrer"
                }
                aria-label={social.name}
                className="p-3 -m-3 text-gray-400 transition-all duration-300 transform motion-safe:hover:scale-110 hover:text-light"
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
        </div>
      </div>
    </section>
  );
};

export default Hero;
