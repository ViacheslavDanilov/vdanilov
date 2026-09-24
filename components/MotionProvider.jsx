"use client";

import { MotionConfig } from "motion/react";

// Turns off transform and layout animations for visitors who ask for reduced motion
export default function MotionProvider({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
