"use client";

import CountUp from "@/components/CountUp";
import { GlowCard } from "@/components/ui/glow-card";

const Statistics = ({
  enableSpotlight = true,
  enableBorderGlow = true,
  glowColor = "blue",
}) => {
  const stats = [
    {
      value: 10,
      suffix: "+",
      label: "Years of Expertise",
      duration: 2,
      delay: 0,
    },
    {
      value: 15,
      suffix: "+",
      label: "ML and AI Projects",
      duration: 2,
      delay: 0.1,
    },
    {
      value: 50,
      suffix: "k",
      label: "Lines of Code Written",
      duration: 2,
      delay: 0.2,
    },
    {
      value: 40,
      suffix: "",
      label: "Research Publications",
      duration: 2,
      delay: 0.3,
    },
    {
      value: 9,
      suffix: "",
      label: "Universities Worked At",
      duration: 2,
      delay: 0.4,
    },
    {
      value: 6,
      suffix: "",
      label: "Countries of Long-term Living",
      duration: 2,
      delay: 0.5,
    },
  ];

  return (
    <section
      id="statistics"
      className="w-full max-w-7xl mx-auto py-12 md:py-24 px-6"
    >
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-light mb-4">
          Career Highlights
        </h2>
        <p className="text-gray-400 mt-3 max-w-2xl mx-auto leading-relaxed">
          Building scalable ML and AI solutions and advancing research across
          multiple domains, companies and countries
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <GlowCard
            key={stat.label.toLowerCase().replace(/\s+/g, "-")}
            glowColor={glowColor}
            customSize={true}
            className="w-full h-full p-6 md:p-10"
            enableSpotlight={enableSpotlight}
            enableBorderGlow={enableBorderGlow}
          >
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="text-4xl md:text-5xl font-semibold text-accent mb-3">
                <CountUp
                  from={0}
                  to={stat.value}
                  duration={stat.duration}
                  delay={stat.delay}
                  className="inline-block"
                />
                <span className="text-accent">{stat.suffix}</span>
              </div>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                {stat.label}
              </p>
            </div>
          </GlowCard>
        ))}
      </div>
    </section>
  );
};

export default Statistics;
