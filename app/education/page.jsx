import EducationClient from "./EducationClient";

export const metadata = {
  title: "Education",
  description:
    "Academic background and certifications of Viacheslav Danilov, including PhD, Master's degrees, and professional courses.",
  openGraph: {
    title: "Education | Viacheslav Danilov",
    description:
      "Academic background and certifications of Viacheslav Danilov, including PhD, Master's degrees, and professional courses.",
    images: ["/opengraph-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Education | Viacheslav Danilov",
    description:
      "Academic background and certifications of Viacheslav Danilov, including PhD, Master's degrees, and professional courses.",
    images: ["/opengraph-image.jpg"],
  },
};

export default function EducationPage() {
  return <EducationClient />;
}
