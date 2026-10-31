import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GlowCard } from "@/components/ui/glow-card";
import Section from "@/components/project/Section";
import { orderedPersonLinks } from "@/lib/person-links";

function TeamMemberCard({ member }) {
  return (
    <GlowCard className="w-full h-full p-5" spotlightSize={240}>
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
        <p className="text-sm text-gray-400 mb-4">{member.location}</p>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-auto">
          {orderedPersonLinks(member.links).map(
            ({ key, label, icon, href, external }) => (
              <a
                key={key}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="p-3.5 -m-3.5 text-gray-400 hover:text-light transition-all duration-300 transform motion-safe:hover:scale-110"
                aria-label={`${member.name}'s ${label}`}
              >
                <FontAwesomeIcon
                  icon={icon}
                  className="w-4 h-4"
                  style={{
                    width: "1rem",
                    height: "1rem",
                    display: "block",
                  }}
                />
              </a>
            ),
          )}
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
