import ReferencesClient from "./ReferencesClient";

export const metadata = {
  title: "References",
  description:
    "Recommendations from professors, executives, and collaborators across AI, research, and business.",
  openGraph: {
    title: "References | Viacheslav Danilov",
    description:
      "Recommendations from professors, executives, and collaborators across AI, research, and business.",
    images: ["/opengraph-image.png"],
  },
  twitter: {
    title: "References | Viacheslav Danilov",
    description:
      "Recommendations from professors, executives, and collaborators across AI, research, and business.",
    images: ["/opengraph-image.png"],
  },
};

export default function ReferencesPage() {
  return <ReferencesClient />;
}
