import PortfolioClient from "./PortfolioClient";

export const metadata = {
  title: "Portfolio",
  description:
    "A curated collection of projects by Viacheslav Danilov showcasing expertise in machine learning, AI, and data-driven solutions.",
  openGraph: {
    title: "Portfolio | Viacheslav Danilov",
    description:
      "A curated collection of projects by Viacheslav Danilov showcasing expertise in machine learning, AI, and data-driven solutions.",
    images: ["/opengraph-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | Viacheslav Danilov",
    description:
      "A curated collection of projects by Viacheslav Danilov showcasing expertise in machine learning, AI, and data-driven solutions.",
    images: ["/opengraph-image.jpg"],
  },
};

export default function PortfolioPage() {
  return <PortfolioClient />;
}
