import PortfolioClient from "./PortfolioClient";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Portfolio",
  description:
    "A curated collection of projects by Viacheslav Danilov showcasing expertise in machine learning, AI, and data-driven solutions.",
  path: "/portfolio/",
});

export default function PortfolioPage() {
  return <PortfolioClient />;
}
