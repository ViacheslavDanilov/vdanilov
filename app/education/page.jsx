import EducationClient from "./EducationClient";

export const metadata = {
  title: "Education",
  description:
    "Academic background and certifications of Viacheslav Danilov, including PhD, Master's degrees, and professional courses.",
  openGraph: {
    title: "Education | Viacheslav Danilov",
    description:
      "Academic background and certifications of Viacheslav Danilov, including PhD, Master's degrees, and professional courses.",
  },
  twitter: {
    title: "Education | Viacheslav Danilov",
    description:
      "Academic background and certifications of Viacheslav Danilov, including PhD, Master's degrees, and professional courses.",
  },
};

export default function EducationPage() {
  return <EducationClient />;
}
