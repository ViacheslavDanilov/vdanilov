import PortfolioClient from "./PortfolioClient";

export const metadata = {
  title: "Portfolio",
  description:
    "A curated collection of projects by Viacheslav Danilov showcasing expertise in machine learning, AI, and data-driven solutions.",
  openGraph: {
    title: "Portfolio | Viacheslav Danilov",
    description:
      "A curated collection of projects by Viacheslav Danilov showcasing expertise in machine learning, AI, and data-driven solutions.",
    images: ["https://vdanilov.com/opengraph-image.png"],
  },
  twitter: {
    title: "Portfolio | Viacheslav Danilov",
    description:
      "A curated collection of projects by Viacheslav Danilov showcasing expertise in machine learning, AI, and data-driven solutions.",
    images: ["https://vdanilov.com/opengraph-image.png"],
  },
};

export default function PortfolioPage() {
  return <PortfolioClient />;
}
