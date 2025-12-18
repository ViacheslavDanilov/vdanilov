"use client";

import React from "react";
import Image from "next/image";
import { GlowCard } from "@/components/ui/glow-card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

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
        className="w-full h-full p-5"
        enableSpotlight={enableSpotlight}
        enableBorderGlow={enableBorderGlow}
        spotlightSize={spotlightSize}
      >
        {/* Mobile Layout */}
        <div className="flex flex-col md:hidden items-center gap-4 h-full justify-center">
          {/* Logo */}
          <a
            href={certificate.organizationUrl || certificate.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-16 h-16 flex-shrink-0 rounded-2xl overflow-hidden border border-light/10 bg-card/50 p-1 flex items-center justify-center transition-all duration-300 md:hover:scale-[1.03] md:hover:border-accent/30"
            aria-label={`${certificate.organization} website`}
          >
            <Image
              src={certificate.logo}
              alt={`${certificate.organization} logo`}
              width={128}
              height={128}
              className="w-full h-full object-contain rounded-xl"
              style={{
                filter: `brightness(${certificate.logoBrightness || 1})`,
              }}
            />
          </a>

          {/* Content */}
          <div className="flex flex-col gap-2 items-center text-center">
            <a
              href={certificate.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-md font-bold text-light hover:text-accent transition-colors"
            >
              <span className="uppercase tracking-wide">
                {certificate.title}
              </span>
              <FontAwesomeIcon
                icon={faLink}
                className="w-3 h-3 text-gray-500 group-hover:text-accent transition-colors"
              />
            </a>

            <a
              href={certificate.organizationUrl || certificate.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-light md:hover:text-accent uppercase tracking-wider transition-colors cursor-pointer"
            >
              {certificate.organization}
            </a>

            {certificate.date && (
              <div className="text-sm text-gray-400">{certificate.date}</div>
            )}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex flex-row items-center gap-5 h-full">
          {/* Logo */}
          <a
            href={certificate.organizationUrl || certificate.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-16 h-16 flex-shrink-0 rounded-2xl overflow-hidden border border-light/10 bg-card/50 p-1 flex items-center justify-center transition-all duration-300 md:hover:scale-[1.03] md:hover:border-accent/30"
            aria-label={`${certificate.organization} website`}
          >
            <Image
              src={certificate.logo}
              alt={`${certificate.organization} logo`}
              width={128}
              height={128}
              className="w-full h-full object-contain rounded-xl"
              style={{
                filter: `brightness(${certificate.logoBrightness || 1})`,
              }}
            />
          </a>

          {/* Content */}
          <div className="flex-1 min-w-0 flex flex-col gap-2 justify-center">
            <a
              href={certificate.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-md font-bold text-light hover:text-accent transition-colors"
            >
              <span className="uppercase tracking-wide truncate">
                {certificate.title}
              </span>
              <FontAwesomeIcon
                icon={faLink}
                className="w-3 h-3 text-gray-500 group-hover:text-accent transition-colors"
              />
            </a>

            <a
              href={certificate.organizationUrl || certificate.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-light md:hover:text-accent uppercase tracking-wider transition-colors cursor-pointer truncate"
            >
              {certificate.organization}
            </a>

            {certificate.date && (
              <div className="text-sm text-gray-400">{certificate.date}</div>
            )}
          </div>
        </div>
      </GlowCard>
    </article>
  );
};

export default CertificateCard;
