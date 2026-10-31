"use client";

import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFlask,
  faBriefcase,
  faHeartPulse,
  faCapsules,
} from "@fortawesome/free-solid-svg-icons";
import { GlowCard } from "@/components/ui/glow-card";
import { Badge } from "@/components/ui/badge";
import { orderedPersonLinks } from "@/lib/person-links";

// Badge configuration for each category
const CATEGORY_CONFIG = {
  Research: { variant: "blue", icon: faFlask },
  Industry: { variant: "violet", icon: faBriefcase },
  Medicine: { variant: "teal", icon: faHeartPulse },
  Pharma: { variant: "sky", icon: faCapsules },
};

const ReferenceCard = ({ reference, priority = false }) => {
  const {
    name,
    role,
    organization,
    location,
    category,
    image,
    socials = {},
  } = reference;
  const config = CATEGORY_CONFIG[category] || CATEGORY_CONFIG.Research;

  const socialLinks = orderedPersonLinks(socials);

  return (
    <GlowCard className="group w-full h-full p-5 relative" spotlightSize={250}>
      {/* Category Badge */}
      <Badge
        variant={config.variant}
        icon={config.icon}
        className="absolute top-5 right-5 z-10"
      >
        {category}
      </Badge>

      <div className="flex flex-col items-center text-center h-full">
        {/* Profile Photo */}
        <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-accent/20 shadow-lg bg-dark mb-4">
          <Image
            src={image}
            alt={name}
            width={112}
            height={112}
            sizes="112px"
            quality={100}
            priority={priority}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Name */}
        <h2 className="text-lg font-bold text-light mb-1.5">{name}</h2>

        {/* Role */}
        <p className="text-sm font-medium text-accent mb-1.5">{role}</p>

        {/* Organization */}
        <p className="text-sm text-gray-300 mb-1.5">{organization}</p>

        {/* Location */}
        <p className="text-xs text-gray-400 mb-4">{location}</p>

        {/* Social Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-auto pt-2">
          {socialLinks.map(({ key, label, icon, href, external }) => (
            <a
              key={key}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              aria-label={`${name}'s ${label}`}
              className="p-3 -m-3 text-gray-400 hover:text-light transition-all duration-300 transform hover:scale-110"
            >
              <FontAwesomeIcon
                icon={icon}
                className="w-5 h-5"
                style={{
                  width: "1.25rem",
                  height: "1.25rem",
                  display: "block",
                }}
              />
            </a>
          ))}
        </div>
      </div>
    </GlowCard>
  );
};

export default ReferenceCard;
