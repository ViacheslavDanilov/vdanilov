"use client";

import React from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { CompanyLogo } from "@/components/ExperienceCard";
import NowrapTail from "@/components/ui/nowrap-tail";

const CertificateCard = ({ certificate }) => {
  return (
    <article className="h-full w-full animate-card-in motion-reduce:animate-card-fade-in">
      <GlowCard className="w-full h-full p-4 gap-0 group" spotlightSize={180}>
        {/* Logo beside the text at every width */}
        <div className="flex h-full items-center">
          <div className="flex w-full items-center gap-4 md:gap-5">
            <CompanyLogo
              logo={certificate.logo}
              company={certificate.organization}
              url={certificate.organizationUrl || certificate.url}
              brightness={certificate.logoBrightness || 1}
            />

            <div className="flex min-w-0 flex-1 flex-col gap-2 items-stretch text-left">
              <a
                href={certificate.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group/title relative after:absolute after:-top-4 after:-bottom-1 after:-inset-x-3 focus-visible:after:hidden block md:whitespace-nowrap text-md font-bold text-strong group-hover:text-accent transition-colors w-fit"
              >
                <span className="uppercase tracking-wide">
                  <NowrapTail text={certificate.title}>
                    <span
                      className="inline-block ml-2 align-[-1px] transition-transform duration-300 motion-safe:group-hover/title:translate-x-1"
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
                  </NowrapTail>
                </span>
              </a>

              <div className="flex flex-wrap items-baseline gap-x-3 text-sm">
                <a
                  href={certificate.organizationUrl || certificate.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative after:absolute after:-top-1 after:-bottom-5 after:-inset-x-3 focus-visible:after:hidden font-medium text-strong md:hover:text-accent uppercase tracking-wider transition-colors cursor-pointer w-fit"
                >
                  {certificate.organization}
                </a>
                {certificate.date && (
                  <span className="text-muted">{certificate.date}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </GlowCard>
    </article>
  );
};

export default CertificateCard;
