import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faGlobe } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookSquare,
  faGithub,
  faGitlab,
  faGoogleScholar,
  faKaggle,
  faLinkedin,
  faOrcid,
  faResearchgate,
} from "@fortawesome/free-brands-svg-icons";
import { GlowCard } from "@/components/ui/glow-card";
import Section from "@/components/project/Section";

const SOCIAL_LINKS = {
  linkedin: { icon: faLinkedin, label: "LinkedIn" },
  github: { icon: faGithub, label: "GitHub" },
  gitlab: { icon: faGitlab, label: "GitLab" },
  researchgate: { icon: faResearchgate, label: "ResearchGate" },
  google: { icon: faGoogleScholar, label: "Google Scholar" },
  orcid: { icon: faOrcid, label: "ORCID" },
  kaggle: { icon: faKaggle, label: "Kaggle" },
  facebook: { icon: faFacebookSquare, label: "Facebook" },
  globe: { icon: faGlobe, label: "Website" },
  email: { icon: faEnvelope, label: "Email" },
};

function TeamMemberCard({ member }) {
  return (
    <GlowCard
      glowColor="blue"
      customSize={true}
      className="w-full h-full p-5"
      enableSpotlight={true}
      enableBorderGlow={true}
      spotlightSize={240}
    >
      <div className="flex flex-col items-center text-center h-full">
        <div className="relative w-24 h-24 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-accent/20 shadow-lg bg-dark mb-4">
          <Image
            src={member.photo}
            alt={member.name}
            fill
            sizes="(max-width: 768px) 80px, 96px"
            quality={90}
            className="object-cover"
          />
        </div>
        <h3 className="text-base font-bold text-light mb-1.5">{member.name}</h3>
        <p className="text-sm font-medium text-accent mb-2">{member.role}</p>
        <p className="text-sm text-gray-300 mb-2">{member.organization}</p>
        <p className="text-sm text-gray-500 mb-4">{member.location}</p>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-auto">
          {Object.entries(member.links).map(([key, url]) => (
            <a
              key={key}
              href={key === "email" ? `mailto:${url}` : url}
              target={key === "email" ? undefined : "_blank"}
              rel={key === "email" ? undefined : "noopener noreferrer"}
              className="p-2 -m-2 text-gray-400 hover:text-light transition-all duration-300 transform hover:scale-110"
              aria-label={`${member.name}'s ${SOCIAL_LINKS[key].label}`}
            >
              <FontAwesomeIcon
                icon={SOCIAL_LINKS[key].icon}
                className="w-4 h-4"
                style={{
                  width: "1rem",
                  height: "1rem",
                  display: "block",
                }}
              />
            </a>
          ))}
        </div>
      </div>
    </GlowCard>
  );
}

export default function CoreTeam({ members }) {
  return (
    <Section title="Core Team" headingClassName="mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {members.map((member) => (
          <TeamMemberCard key={member.name} member={member} />
        ))}
      </div>
    </Section>
  );
}
