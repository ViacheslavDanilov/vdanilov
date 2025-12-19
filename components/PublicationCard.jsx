"use client";

import React from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";

/**
 * Minimalistic publication card component
 * Displays publication title, authors, venue, year, and optional link
 */
const PublicationCard = ({
  publication,
  enableSpotlight = true,
  enableBorderGlow = true,
  glowColor = "blue",
  spotlightSize = 300,
}) => {
  const { title, authors, venue, year, url, type, tags } = publication;

  return (
    <article className="self-start w-full">
      <GlowCard
        glowColor={glowColor}
        customSize={true}
        className="w-full h-full p-5 group"
        enableSpotlight={enableSpotlight}
        enableBorderGlow={enableBorderGlow}
        spotlightSize={spotlightSize}
      >
        <div className="flex flex-col gap-3">
          {/* Type Badge */}
          {type && (
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-accent/7 text-accent/80 border border-accent/10">
                {type}
              </span>
              {year && (
                <span className="text-sm text-gray-400 font-medium">
                  {year}
                </span>
              )}
            </div>
          )}

          {/* Title */}
          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link"
            >
              <h3 className="text-base font-semibold text-light leading-snug group-hover/link:text-accent transition-colors flex items-start gap-2">
                <span className="flex-1">{title}</span>
                <FontAwesomeIcon
                  icon={faExternalLink}
                  className="w-3.5 h-3.5 mt-1 opacity-60 group-hover/link:opacity-100 transition-opacity flex-shrink-0"
                  style={{ width: "0.875rem", height: "0.875rem" }}
                  aria-hidden="true"
                />
              </h3>
            </a>
          ) : (
            <h3 className="text-base font-semibold text-light leading-snug">
              {title}
            </h3>
          )}

          {/* Venue */}
          {venue && (
            <p className="text-sm text-gray-300 font-medium italic">{venue}</p>
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
