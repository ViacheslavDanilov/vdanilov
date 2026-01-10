import ReferencesClient from "./ReferencesClient";

export const metadata = {
  title: "References",
  description:
    "Recommendations from professors, executives, and collaborators across AI, research, and business.",
  openGraph: {
    title: "References | Viacheslav Danilov",
    description:
      "Recommendations from professors, executives, and collaborators across AI, research, and business.",
  },
  twitter: {
    title: "References | Viacheslav Danilov",
    description:
      "Recommendations from professors, executives, and collaborators across AI, research, and business.",
  },
};

export default function ReferencesPage() {
  return <ReferencesClient />;
}
