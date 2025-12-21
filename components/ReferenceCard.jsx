"use client";

import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faResearchgate,
  faOrcid,
  faGoogleScholar,
  faFacebookSquare,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { GlowCard } from "@/components/ui/glow-card";

const BADGE_STYLES = {
  Research: {
    // bg: "bg-blue-500/15",
    // border: "border-blue-500/40",
    bg: "bg-blue-600/20",
    border: "border-blue-600/40",
    text: "text-blue-400",
    emoji: "🔬",
  },
  Business: {
    // bg: "bg-violet-500/15",
    // border: "border-violet-500/40",
    bg: "bg-violet-600/20",
    border: "border-violet-600/40",
    text: "text-violet-400",
    emoji: "💼",
  },
  Medicine: {
    // bg: "bg-teal-500/15",
    // border: "border-teal-500/40",
    bg: "bg-teal-600/20",
    border: "border-teal-600/40",
    text: "text-teal-400",
    emoji: "🏥",
  },
};

const SOCIAL_ICONS = {
  website: { icon: faGlobe, label: "Website" },
  linkedin: { icon: faLinkedin, label: "LinkedIn" },
  researchgate: { icon: faResearchgate, label: "ResearchGate" },
  googleScholar: { icon: faGoogleScholar, label: "Google Scholar" },
  orcid: { icon: faOrcid, label: "ORCID" },
  facebook: { icon: faFacebookSquare, label: "Facebook" },
  email: { icon: faEnvelope, label: "Email" },
};

const ReferenceCard = ({ reference }) => {
  const {
    name,
    role,
    organization,
    location,
    category,
    image,
    socials = {},
  } = reference;
  const badgeStyle = BADGE_STYLES[category] || BADGE_STYLES.Research;

  // Build array of social links to render
  const socialLinks = [];
  if (socials.website)
    socialLinks.push({ type: "website", url: socials.website });
  if (socials.linkedin)
    socialLinks.push({ type: "linkedin", url: socials.linkedin });
  if (socials.researchgate)
    socialLinks.push({ type: "researchgate", url: socials.researchgate });
  if (socials.googleScholar)
    socialLinks.push({ type: "googleScholar", url: socials.googleScholar });
  if (socials.orcid) socialLinks.push({ type: "orcid", url: socials.orcid });
  if (socials.facebook)
    socialLinks.push({ type: "facebook", url: socials.facebook });
  if (socials.email)
    socialLinks.push({ type: "email", url: `mailto:${socials.email}` });

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
        <div className="flex flex-wrap items-center justify-center gap-4 mt-auto pt-2">
          {socialLinks.map((social) => {
            const iconConfig = SOCIAL_ICONS[social.type];
            return (
              <a
                key={social.type}
                href={social.url}
                target={social.type === "email" ? undefined : "_blank"}
                rel={
                  social.type === "email" ? undefined : "noopener noreferrer"
                }
                aria-label={`${name}'s ${iconConfig.label}`}
                className="text-gray-400 hover:text-light transition-all duration-300 transform hover:scale-110"
              >
                <FontAwesomeIcon
                  icon={iconConfig.icon}
                  className="w-5 h-5"
                  style={{
                    width: "1.25rem",
                    height: "1.25rem",
                    display: "block",
                  }}
                />
              </a>
            );
          })}
        </div>
      </div>
    </GlowCard>
  );
};

export default ReferenceCard;
