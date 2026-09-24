"use client";

import React from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { CompanyLogo } from "@/components/ExperienceCard";

const CertificateCard = ({ certificate }) => {
  return (
    <article className="h-full w-full">
      <GlowCard className="w-full h-full p-5 pb-3 group" spotlightSize={180}>
        {/* Stacked and centred on phones, a row from md */}
        <div className="flex flex-col items-center justify-center gap-4 h-full md:flex-row md:justify-start md:gap-0">
          <div className="contents md:flex md:flex-row md:items-start md:gap-5 md:w-full">
            <CompanyLogo
              logo={certificate.logo}
              company={certificate.organization}
              url={certificate.organizationUrl || certificate.url}
              brightness={certificate.logoBrightness || 1}
            />

            <div className="flex flex-col gap-2 items-center text-center md:flex-1 md:min-w-0 md:items-stretch md:text-left">
              <a
                href={certificate.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group/title flex items-center gap-2 text-md font-bold text-light group-hover:text-accent transition-colors w-fit"
              >
                <span className="uppercase tracking-wide md:truncate">
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
                className="text-sm font-medium text-light md:hover:text-accent uppercase tracking-wider transition-colors cursor-pointer w-fit md:truncate"
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
