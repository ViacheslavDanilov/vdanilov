import ExperienceClient from "./ExperienceClient";

export const metadata = {
  title: "Experience",
  description:
    "Professional experience of Viacheslav Danilov spanning AI, machine learning, and data science across research and industry.",
  openGraph: {
    title: "Experience | Viacheslav Danilov",
    description:
      "Professional experience of Viacheslav Danilov spanning AI, machine learning, and data science across research and industry.",
    images: ["/opengraph-image.png"],
  },
  twitter: {
    title: "Experience | Viacheslav Danilov",
    description:
      "Professional experience of Viacheslav Danilov spanning AI, machine learning, and data science across research and industry.",
    images: ["/opengraph-image.png"],
  },
};

export default function ExperiencePage() {
  return <ExperienceClient />;
}
