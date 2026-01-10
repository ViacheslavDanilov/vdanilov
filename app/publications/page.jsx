import PublicationsClient from "./PublicationsClient";

export const metadata = {
  title: "Publications",
  description:
    "Peer-reviewed research, conference proceedings, technical articles, and datasets by Viacheslav Danilov.",
  openGraph: {
    title: "Publications | Viacheslav Danilov",
    description:
      "Peer-reviewed research, conference proceedings, technical articles, and datasets by Viacheslav Danilov.",
    images: ["https://vdanilov.com/opengraph-image.png"],
  },
  twitter: {
    title: "Publications | Viacheslav Danilov",
    description:
      "Peer-reviewed research, conference proceedings, technical articles, and datasets by Viacheslav Danilov.",
    images: ["https://vdanilov.com/opengraph-image.png"],
  },
};

export default function PublicationsPage() {
  return <PublicationsClient />;
}
