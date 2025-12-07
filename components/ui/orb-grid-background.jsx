"use client";

import React from "react";
import LightRays from "./light-rays";

const OrbGridBackground = () => {
  return (
    <>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: -1,
          background: "#0a0e14",
          backgroundImage: `
            linear-gradient(to right, rgba(3,177,251,0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(3,177,251,0.08) 1px, transparent 1px),
            radial-gradient(circle at 50% 60%, rgba(3,177,251,0.12) 0%, rgba(3,177,251,0.04) 40%, transparent 70%)
          `,
          backgroundSize: "40px 40px, 40px 40px, 100% 100%",
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-[60vh] pointer-events-none"
        style={{ zIndex: -1 }}
      >
        <LightRays
          raysOrigin="top-center"
          raysColor="#03b1fb"
          raysSpeed={0.8}
          lightSpread={0.6}
          rayLength={0.8}
          followMouse={false}
          mouseInfluence={0}
          noiseAmount={0.05}
          distortion={0.02}
          fadeDistance={0.6}
          saturation={0.9}
        />
      </div>
    </>
  );
};

export default OrbGridBackground;
