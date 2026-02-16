"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ROUTES_TO_PREFETCH = ["/experience", "/portfolio", "/references"];

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
  "/education/universities/tpu.webp",
  "/education/universities/tsu.webp",
  "/people/farid-melgani.webp",
  "/people/gemma-piella.webp",
  "/people/maria-poca.webp",
  "/people/efim-furman.webp",
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
