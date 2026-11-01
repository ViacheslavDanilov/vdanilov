import React from "react";
import Image from "next/image";
import AutoplayVideo from "@/components/AutoplayVideo";
import RotatingRoles from "@/components/RotatingRoles";
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

const roles = ["Tech Lead", "Engineering Manager", "Research Scientist"];

const Hero = () => {
  return (
    <section
      id="hero"
      className="w-full max-w-7xl mx-auto px-6 pb-12 overflow-x-clip lg:py-12 lg:min-h-[min(calc(100svh-6rem),66rem)] lg:flex lg:flex-col lg:justify-center"
    >
      <div className="flex flex-col items-center gap-8 lg:grid lg:grid-cols-[auto_minmax(0,36rem)] lg:justify-center lg:gap-16">
        <div className="contents lg:flex lg:flex-col lg:items-center lg:gap-8">
          <div className="order-1 lg:order-none relative size-64 md:size-96 rounded-full overflow-hidden border-4 border-accent/20 shadow-2xl bg-dark">
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
          <div className="order-2 lg:order-none -mt-3 lg:mt-0 flex flex-wrap items-center justify-center gap-6">
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
                title={social.name}
                className="p-3 -m-3 rounded-full text-gray-400 transition-all duration-300 transform motion-safe:hover:scale-110 hover:text-light focus-visible:outline-2 focus-visible:outline-accent"
                style={{ display: "inline-block" }}
              >
                <FontAwesomeIcon
                  icon={social.icon}
                  className="w-6 h-6"
                  style={{
                    width: "1.5rem",
                    height: "1.5rem",
                    display: "block",
                  }}
                />
              </a>
            ))}
          </div>
        </div>

        {/* Below lg the icons follow the video and the buttons come before the paragraph, so the buttons show on the first screen */}
        <div className="contents lg:flex lg:flex-col lg:gap-8">
          <div className="space-y-3 text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl text-balance font-semibold text-light tracking-tight">
              Viacheslav Danilov, PhD
            </h1>
            <RotatingRoles
              roles={roles}
              className="text-lg md:text-xl text-gray-300"
            />
          </div>

          <p className="order-4 lg:order-none max-w-2xl text-light text-base xl:text-lg leading-relaxed text-justify hyphens-auto text-pretty">
            <strong className="font-semibold text-white">
              Lead AI/ML Engineer
            </strong>{" "}
            and{" "}
            <strong className="font-semibold text-white">
              Research Scientist
            </strong>{" "}
            with a PhD in Computer Science and over 10 years across academia and
            industry. I take machine learning from first experiment to
            production: medical signal and image analysis, computer vision, time
            series, and LLM and RAG systems. I have led teams of developers and
            researchers, supervised PhD students and postdocs, and published
            nearly 50 peer-reviewed papers.
          </p>

          <div className="order-3 lg:order-none flex flex-wrap items-center justify-center gap-2 sm:gap-3">
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
        </div>
      </div>
    </section>
  );
};

export default Hero;
