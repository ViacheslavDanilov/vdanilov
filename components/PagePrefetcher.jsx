"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ROUTES_TO_PREFETCH = ["/experience", "/portfolio", "/references"];

// Small, high-impact set of above-the-fold assets for post-home navigation.
const IMAGES_TO_PREFETCH = [
  "/experience/core-roles/symfa.svg",
  "/experience/core-roles/upf.svg",
  "/experience/core-roles/quantori.svg",
  "/experience/core-roles/polimi.svg",
  "/portfolio/previews/deep-brainwatch.jpg",
  "/portfolio/previews/coronary-insight.jpg",
  "/portfolio/previews/sales-pilot.jpg",
  "/portfolio/previews/hypervision-ablation.jpg",
  "/education/universities/tpu.svg",
  "/education/universities/tsu.svg",
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
      const id = window.requestIdleCallback(warmImages, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }

    const timer = window.setTimeout(warmImages, 400);
    return () => window.clearTimeout(timer);
  }, [router]);

  return null;
}
