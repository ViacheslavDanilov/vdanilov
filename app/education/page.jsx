import EducationClient from "./EducationClient";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Education",
  description:
    "Academic background and certifications of Viacheslav Danilov, including PhD, Master's degrees, and professional courses.",
  path: "/education/",
});

export default function EducationPage() {
  return <EducationClient />;
}
