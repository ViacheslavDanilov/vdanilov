"use client";

import React from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { CompanyLogo } from "@/components/ExperienceCard";

const CertificateCard = ({
  certificate,
  enableSpotlight = true,
  enableBorderGlow = true,
  glowColor = "blue",
  spotlightSize = 180,
}) => {
  return (
    <article className="h-full w-full">
      <GlowCard
        glowColor={glowColor}
        customSize={true}
        className="w-full h-full p-5 pb-3 group"
        enableSpotlight={enableSpotlight}
        enableBorderGlow={enableBorderGlow}
        spotlightSize={spotlightSize}
      >
        {/* Mobile Layout */}
        <div className="flex flex-col md:hidden items-center gap-4 h-full justify-center">
          {/* Logo */}
          <CompanyLogo
            logo={certificate.logo}
            company={certificate.organization}
            url={certificate.organizationUrl || certificate.url}
            brightness={certificate.logoBrightness || 1}
          />

          {/* Content */}
          <div className="flex flex-col gap-2 items-center text-center">
            <a
              href={certificate.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group/title flex items-center gap-2 text-md font-bold text-light group-hover:text-accent transition-colors max-w-full min-w-0"
            >
              <span className="uppercase tracking-wide">
                {certificate.title}
              </span>
              <span
                className="inline-block transition-transform duration-300 group-hover/title:translate-x-1"
                style={{ width: "0.75rem", height: "0.75rem" }}
              >
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="opacity-60"
                  style={{
                    width: "0.75rem",
                    height: "0.75rem",
                    display: "block",
                  }}
                />
              </span>
            </a>

            <a
              href={certificate.organizationUrl || certificate.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-light md:hover:text-accent uppercase tracking-wider transition-colors cursor-pointer max-w-full"
            >
              {certificate.organization}
            </a>

            {certificate.date && (
              <div className="text-sm text-gray-400">{certificate.date}</div>
            )}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex h-full items-center min-w-0">
          <div className="flex flex-row items-start gap-5 w-full min-w-0">
            {/* Logo */}
            <CompanyLogo
              logo={certificate.logo}
              company={certificate.organization}
              url={certificate.organizationUrl || certificate.url}
              brightness={certificate.logoBrightness || 1}
            />

            {/* Content */}
            <div className="flex-1 min-w-0 flex flex-col gap-2">
              <a
                href={certificate.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group/title flex items-center gap-2 text-md font-bold text-light group-hover:text-accent transition-colors max-w-full min-w-0"
              >
                <span className="uppercase tracking-wide truncate min-w-0">
                  {certificate.title}
                </span>
                <span
                  className="inline-block transition-transform duration-300 group-hover/title:translate-x-1"
                  style={{ width: "0.75rem", height: "0.75rem" }}
                >
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="opacity-60"
                    style={{
                      width: "0.75rem",
                      height: "0.75rem",
                      display: "block",
                    }}
                  />
                </span>
              </a>

              <a
                href={certificate.organizationUrl || certificate.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-light md:hover:text-accent uppercase tracking-wider transition-colors cursor-pointer truncate max-w-full"
              >
                {certificate.organization}
              </a>

              {certificate.date && (
                <div className="text-sm text-gray-400">{certificate.date}</div>
              )}
            </div>
          </div>
        </div>
      </GlowCard>
    </article>
  );
};

export default CertificateCard;
