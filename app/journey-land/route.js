import { H, W, landPath } from "@/components/journey/snapshot-geo";

export const dynamic = "force-static";

// Dotted land for the phone route map, used as a CSS mask
export function GET() {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">` +
    `<defs><pattern id="d" width="4" height="4" patternUnits="userSpaceOnUse">` +
    `<circle cx="2" cy="2" r="0.8" fill="#fff"/></pattern></defs>` +
    `<path d="${landPath()}" fill="url(#d)"/></svg>`;
  return new Response(svg, {
    headers: { "Content-Type": "image/svg+xml" },
  });
}
