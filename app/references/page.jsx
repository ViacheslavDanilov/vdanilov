import ReferencesClient from "./ReferencesClient";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "References",
  description:
    "Recommendations from professors, executives, and collaborators across AI, research, and business.",
  path: "/references/",
});

export default function ReferencesPage() {
  return <ReferencesClient />;
}
