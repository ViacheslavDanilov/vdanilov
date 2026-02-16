"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ROUTES_TO_PREFETCH = ["/experience", "/portfolio"];

// Small, high-impact set of above-the-fold assets for post-home navigation.
const IMAGES_TO_PREFETCH = [
  "/experience/core-roles/symfa.webp",
  "/experience/core-roles/upf.webp",
  "/experience/core-roles/quantori.webp",
  "/experience/core-roles/polimi.webp",
  "/portfolio/previews/deep-brainwatch.jpg",
  "/portfolio/previews/coronary-insight.jpg",
  "/portfolio/previews/sales-pilot.jpg",
  "/portfolio/previews/hypervision-ablation.jpg",
];

export default function PagePrefetcher() {
  const router = useRouter();

  useEffect(() => {
    ROUTES_TO_PREFETCH.forEach((route) => router.prefetch(route));

    const warmImages = () => {
      IMAGES_TO_PREFETCH.forEach((src) => {
        const img = new window.Image();
        img.src = src;
      });
    };

    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(warmImages, { timeout: 2500 });
      return;
    }

    const timer = window.setTimeout(warmImages, 400);
    return () => window.clearTimeout(timer);
  }, [router]);

  return null;
}
