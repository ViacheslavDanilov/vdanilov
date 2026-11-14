import PublicationsClient from "./PublicationsClient";
import { pageMetadata } from "@/lib/metadata";
import { publicationsSummary } from "@/lib/publications";

export const metadata = pageMetadata({
  title: "Publications",
  description: `${publicationsSummary("by Viacheslav Danilov")}.`,
  path: "/publications/",
});

export default function PublicationsPage() {
  return <PublicationsClient />;
}
