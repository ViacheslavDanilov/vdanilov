"use client";

import React from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { CompanyLogo } from "@/components/ExperienceCard";

// The arrow sits after the last word on phones and beside the title from md
const TitleArrow = ({ className }) => (
  <span
    className={`transition-transform duration-300 group-hover/title:translate-x-1 ${className}`}
    style={{ width: "0.75rem", height: "0.75rem" }}
  >
    <FontAwesomeIcon
      icon={faArrowRight}
      className="opacity-60"
      style={{ width: "0.75rem", height: "0.75rem", display: "block" }}
    />
  </span>
);

const CertificateCard = ({ certificate }) => {
  const words = certificate.title.split(" ");
  const lastWord = words.pop();

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
                className="group/title block md:flex md:items-end md:gap-2 text-md font-bold text-light group-hover:text-accent transition-colors w-fit"
              >
                <span className="uppercase tracking-wide md:truncate">
                  {words.length > 0 && `${words.join(" ")} `}
                  <span className="whitespace-nowrap">
                    {lastWord}
                    <TitleArrow className="inline-block ml-2 align-[-1px] md:hidden" />
                  </span>
                </span>
                <TitleArrow className="hidden shrink-0 mb-[calc((1lh-0.75rem)/2)] md:inline-block" />
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
