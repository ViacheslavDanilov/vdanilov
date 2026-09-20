"use client";

import React from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { Badge } from "@/components/ui/badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBook,
  faUsers,
  faPenNib,
  faDatabase,
} from "@fortawesome/free-solid-svg-icons";

// Badge configuration for each publication type
const TYPE_CONFIG = {
  Journal: { variant: "blue", icon: faBook },
  Conference: { variant: "teal", icon: faUsers },
  "Blog Post": { variant: "violet", icon: faPenNib },
  Dataset: { variant: "cyan", icon: faDatabase },
};

// City and flag only; the country sits in the data but will not fit the line
const cityAndFlag = (location) => {
  const flag = (location.match(/\p{Regional_Indicator}{2}/u) || [""])[0];
  return `${location.split(",")[0].trim()} ${flag}`.trim();
};

// Author position, worded the way the CV prints it
const AUTHOR_POSITION_LABELS = {
  first: "First author",
  senior: "Senior author",
  middle: "Co-author",
};

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
  const config = TYPE_CONFIG[type] || TYPE_CONFIG.Journal;

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
          <Badge
            variant={config.variant}
            icon={config.icon}
            className="absolute top-5 right-5 z-10"
          >
            {type}
          </Badge>
        )}

        <div className="flex flex-col gap-3">
          {/* Title */}
          <div className="pr-30">
            {url ? (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline"
              >
                <h3 className="text-base font-semibold text-light leading-snug group-hover:text-accent transition-colors inline">
                  {title}
                  <span
                    className="inline-block ml-1.5 align-baseline transition-transform duration-300 group-hover/link:translate-x-1"
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
                      aria-hidden="true"
                    />
                  </span>
                </h3>
              </a>
            ) : (
              <h3 className="text-base font-semibold text-light leading-snug">
                {title}
              </h3>
            )}
          </div>

          {/* Venue, Location, and Year */}
          {venue && (
            <p className="text-sm text-gray-300 font-medium">
              <span className="italic">{venue}</span>
              {publication.location && (
                <>
                  <span className="text-gray-500 mx-2">•</span>
                  <span>{cityAndFlag(publication.location)}</span>
                </>
              )}
              {year && (
                <>
                  <span className="text-gray-500 mx-2">•</span>
                  <span>{year}</span>
                </>
              )}
            </p>
          )}

          {/* Tags */}
          {((tags && tags.length > 0) ||
            AUTHOR_POSITION_LABELS[publication.authorPosition]) && (
            <div className="flex flex-wrap gap-2 mt-2">
              {tags?.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-white/5 text-neutral-300 border border-white/10"
                >
                  {tag}
                </span>
              ))}
              {AUTHOR_POSITION_LABELS[publication.authorPosition] && (
                <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-accent/10 text-accent/80 border border-accent/20">
                  {AUTHOR_POSITION_LABELS[publication.authorPosition]}
                </span>
              )}
            </div>
          )}
        </div>
      </GlowCard>
    </article>
  );
};

export default PublicationCard;
