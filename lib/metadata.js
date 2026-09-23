export const SITE_URL = "https://www.vdanilov.com";
export const SITE_NAME = "Viacheslav Danilov";
export const SITE_DESCRIPTION =
  "PhD in Computer Science combining research depth, engineering skill, and leadership experience. Building ML and AI solutions that solve real problems.";

const DEFAULT_IMAGE = {
  url: "/opengraph-image.jpg",
  alt: "Viacheslav Danilov - ML/AI Solutions Engineer",
};

// Next.js replaces the layout's openGraph object, so every page repeats the shared fields
export function pageMetadata({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;

  return {
    ...(title && { title }),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: path,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      images: [{ width: 1200, height: 630, ...image }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image.url],
    },
  };
}
