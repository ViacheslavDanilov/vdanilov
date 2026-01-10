import ReferencesClient from "./ReferencesClient";

export const metadata = {
  title: "References",
  description:
    "Collaborations with leading experts in machine learning, data science, and biomedicine who have shaped Viacheslav Danilov's career.",
  openGraph: {
    title: "References | Viacheslav Danilov",
    description:
      "Collaborations with leading experts in machine learning, data science, and biomedicine who have shaped Viacheslav Danilov's career.",
    images: ["/opengraph-image.png"],
  },
  twitter: {
    title: "References | Viacheslav Danilov",
    description:
      "Collaborations with leading experts in machine learning, data science, and biomedicine who have shaped Viacheslav Danilov's career.",
    images: ["/opengraph-image.png"],
  },
};

export default function ReferencesPage() {
  return <ReferencesClient />;
}
