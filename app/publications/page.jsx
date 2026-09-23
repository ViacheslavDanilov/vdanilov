import PublicationsClient from "./PublicationsClient";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Publications",
  description:
    "Peer-reviewed research, conference proceedings, technical articles, and datasets by Viacheslav Danilov.",
  path: "/publications/",
});

export default function PublicationsPage() {
  return <PublicationsClient />;
}
