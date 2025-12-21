"use client";

import React from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faArrowRight,
  faBook,
  faUsers,
  faPenNib,
  faDatabase,
} from "@fortawesome/free-solid-svg-icons";

// Type badge styling - matching References page colors
const TYPE_STYLES = {
  Journal: {
    bg: "bg-blue-600/20",
    border: "border-blue-600/40",
    text: "text-blue-400",
    icon: faBook,
  },
  Conference: {
    bg: "bg-teal-600/20",
    border: "border-teal-600/40",
    text: "text-teal-400",
    icon: faUsers,
  },
  "Blog Post": {
    bg: "bg-violet-600/20",
    border: "border-violet-600/40",
    text: "text-violet-400",
    icon: faPenNib,
  },
  Dataset: {
    bg: "bg-cyan-600/20",
    border: "border-cyan-600/40",
    text: "text-cyan-400",
    icon: faDatabase,
  },
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
  const typeStyle = TYPE_STYLES[type] || TYPE_STYLES.Journal;

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
          <span
            className={`absolute top-5 right-5 z-10 px-3 py-1 text-xs font-medium rounded-full border inline-flex items-center gap-1.5 ${typeStyle.bg} ${typeStyle.border} ${typeStyle.text}`}
          >
            <FontAwesomeIcon
              icon={typeStyle.icon}
              className="w-3 h-3"
              style={{ width: "0.75rem", height: "0.75rem" }}
            />
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
                    icon={faArrowRight}
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

          {/* Venue, Location, and Year */}
          {venue && (
            <p className="text-sm text-gray-300 font-medium">
              <span className="italic">{venue}</span>
              {publication.location && (
                <>
                  <span className="text-gray-500 mx-2">•</span>
                  <span>{publication.location}</span>
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
