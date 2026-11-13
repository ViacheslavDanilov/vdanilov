"use client";

import dynamic from "next/dynamic";
import JourneyPlayer from "@/components/journey/JourneyPlayer";

const JourneyGlobe = dynamic(
  () => import("@/components/journey/JourneyGlobe"),
  {
    ssr: false,
  },
);
const JourneyMap = dynamic(() => import("@/components/journey/JourneyMap"), {
  ssr: false,
});

export default function JourneyCompare() {
  return (
    <div className="mt-10 flex flex-col items-center gap-16">
      <JourneyPlayer View={JourneyGlobe} label="A. Globe (three.js)" />
      <JourneyPlayer View={JourneyMap} label="B. Flat map (SVG)" />
    </div>
  );
}
