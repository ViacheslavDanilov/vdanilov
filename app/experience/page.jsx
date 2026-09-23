import ExperienceClient from "./ExperienceClient";
import { pageMetadata } from "@/lib/metadata";

// Rebuild daily so the ongoing role's duration stays current
export const revalidate = 86400;

export const metadata = pageMetadata({
  title: "Experience",
  description:
    "Professional experience of Viacheslav Danilov spanning AI, machine learning, and data science across research and industry.",
  path: "/experience/",
});

export default function ExperiencePage() {
  return <ExperienceClient />;
}
