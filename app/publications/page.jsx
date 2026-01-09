import PublicationsClient from "./PublicationsClient";

export const metadata = {
  title: "Publications",
  description:
    "Peer-reviewed research, conference proceedings, and data sets by Viacheslav Danilov.",
  openGraph: {
    title: "Publications | Viacheslav Danilov",
    description:
      "Peer-reviewed research, conference proceedings, and data sets by Viacheslav Danilov.",
  },
  twitter: {
    title: "Publications | Viacheslav Danilov",
    description:
      "Peer-reviewed research, conference proceedings, and data sets by Viacheslav Danilov.",
  },
};

export default function PublicationsPage() {
  return <PublicationsClient />;
}
