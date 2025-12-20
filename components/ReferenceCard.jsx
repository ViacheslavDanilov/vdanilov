"use client";

import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { GlowCard } from "@/components/ui/glow-card";

const BADGE_STYLES = {
  Research: {
    bg: "bg-blue-500/20",
    border: "border-blue-500/40",
    text: "text-blue-400",
    emoji: "🔬",
  },
  Business: {
    bg: "bg-emerald-500/20",
    border: "border-emerald-500/40",
    text: "text-emerald-400",
    emoji: "💼",
  },
  Medicine: {
    bg: "bg-purple-500/20",
    border: "border-purple-500/40",
    text: "text-purple-400",
    emoji: "🏥",
  },
};

const ReferenceCard = ({ reference }) => {
  const {
    name,
    role,
    organization,
    location,
    category,
    image,
    linkedin,
    email,
  } = reference;
  const badgeStyle = BADGE_STYLES[category] || BADGE_STYLES.Research;

  return (
    <GlowCard
      glowColor="blue"
      customSize={true}
      className="group w-full h-full p-6 relative"
      enableSpotlight={true}
      enableBorderGlow={true}
      spotlightSize={250}
    >
      {/* Category Badge */}
      <div
        className={`absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-xs font-medium border ${badgeStyle.bg} ${badgeStyle.border} ${badgeStyle.text} flex items-center gap-1.5`}
      >
        <span>{badgeStyle.emoji}</span>
        <span>{category}</span>
      </div>

      <div className="flex flex-col items-center text-center h-full">
        {/* Profile Photo */}
        <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-accent/20 shadow-lg bg-dark mb-4">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 96px, 112px"
            className="object-cover"
          />
        </div>

        {/* Name */}
        <h3 className="text-lg font-bold text-light mb-1">{name}</h3>

        {/* Role */}
        <p className="text-sm font-medium text-accent mb-1">{role}</p>

        {/* Organization */}
        <p className="text-sm text-gray-300 mb-1">{organization}</p>

        {/* Location */}
        <p className="text-xs text-gray-500 mb-4">{location}</p>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-4 mt-auto pt-2">
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name}'s LinkedIn`}
              className="text-gray-400 hover:text-light transition-all duration-300 transform hover:scale-110"
            >
              <FontAwesomeIcon
                icon={faLinkedin}
                className="w-5 h-5"
                style={{
                  width: "1.25rem",
                  height: "1.25rem",
                  display: "block",
                }}
              />
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              aria-label={`Email ${name}`}
              className="text-gray-400 hover:text-light transition-all duration-300 transform hover:scale-110"
            >
              <FontAwesomeIcon
                icon={faEnvelope}
                className="w-5 h-5"
                style={{
                  width: "1.25rem",
                  height: "1.25rem",
                  display: "block",
                }}
              />
            </a>
          )}
        </div>
      </div>
    </GlowCard>
  );
};

export default ReferenceCard;
