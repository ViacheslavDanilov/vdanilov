"use client";

import dynamic from "next/dynamic";
import JourneyPlayer from "@/components/journey/JourneyPlayer";

const JourneyMap = dynamic(() => import("@/components/journey/JourneyMap"), {
  ssr: false,
});

export default function JourneyCompare() {
  return (
    <div className="mt-10 flex flex-col items-center">
      <JourneyPlayer View={JourneyMap} label="Journey" />
    </div>
  );
}
