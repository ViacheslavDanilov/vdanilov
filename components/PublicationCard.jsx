"use client";

import React from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAnglesRight } from "@fortawesome/free-solid-svg-icons";

/**
 * Minimalistic publication card component
 * Displays publication title, authors, venue, year, and optional link
 */
const PublicationCard = ({
  publication,
  enableSpotlight = true,
  enableBorderGlow = true,
  glowColor = "blue",
  spotlightSize = 240,
}) => {
  const { title, authors, venue, year, url, type, tags } = publication;

  return (
    <article className="self-start w-full">
      <GlowCard
        glowColor={glowColor}
        customSize={true}
        className="w-full h-full p-5 group relative"
        enableSpotlight={enableSpotlight}
        enableBorderGlow={enableBorderGlow}
        spotlightSize={spotlightSize}
      >
        {/* Type Badge - Top Right Corner */}
        {type && (
          <span className="absolute top-5 right-5 px-3 py-1 text-xs font-medium rounded-full bg-accent/7 text-accent/80 border border-accent/10">
            {type}
          </span>
        )}

        <div className="flex flex-col gap-3">
          {/* Title */}
          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link pr-28"
            >
              <h3 className="text-base font-semibold text-light leading-snug group-hover/link:text-accent transition-colors inline">
                {title}
                <span className="relative inline-flex items-center justify-center w-3 h-3 ml-1.5">
                  <FontAwesomeIcon
                    icon={faAngleRight}
                    className="absolute w-3 h-3 opacity-60 transition-opacity duration-300 group-hover/link:opacity-0"
                    aria-hidden="true"
                  />
                  <FontAwesomeIcon
                    icon={faAnglesRight}
                    className="absolute w-3 h-3 opacity-0 transition-opacity duration-300 group-hover/link:opacity-60"
                    aria-hidden="true"
                  />
                </span>
              </h3>
            </a>
          ) : (
            <h3 className="text-base font-semibold text-light leading-snug pr-28">
              {title}
            </h3>
          )}

          {/* Venue and Year */}
          {venue && (
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <p className="font-medium italic">{venue}</p>
              {year && (
                <>
                  <span className="text-gray-500">•</span>
                  <span className="font-medium text-gray-400">{year}</span>
                </>
              )}
            </div>
          )}

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-white/5 text-neutral-300 border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </GlowCard>
    </article>
  );
};

export default PublicationCard;
