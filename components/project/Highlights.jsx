import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GlowCard } from "@/components/ui/glow-card";
import Section from "@/components/project/Section";

// STAR summary: one card per { icon, label, text } item
export default function Highlights({ items }) {
  return (
    <Section title="Highlights" headingClassName="mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <GlowCard
            key={item.label}
            glowColor="blue"
            customSize={true}
            className="group w-full h-full p-5"
            enableSpotlight={true}
            enableBorderGlow={true}
            spotlightSize={240}
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon
                  icon={item.icon}
                  className="w-3.5 h-3.5 text-white/70 transition-colors duration-300 group-hover:text-accent"
                  style={{
                    width: "0.875rem",
                    height: "0.875rem",
                    display: "inline-block",
                  }}
                />
                <span className="text-xs uppercase tracking-wider text-light transition-colors duration-300 group-hover:text-accent font-semibold">
                  {item.label}
                </span>
              </div>
              <p className="text-sm text-light/80 leading-relaxed text-justify">
                {item.text}
              </p>
            </div>
          </GlowCard>
        ))}
      </div>
    </Section>
  );
}
