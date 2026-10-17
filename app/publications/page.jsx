import PublicationsClient from "./PublicationsClient";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Publications",
  description:
    "Selected from 48 peer-reviewed publications and 8 open datasets by Viacheslav Danilov: first author on 32, senior author on 4, 14 in Q1 journals.",
  path: "/publications/",
});

export default function PublicationsPage() {
  return <PublicationsClient />;
}
