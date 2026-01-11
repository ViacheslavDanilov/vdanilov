import PublicationsClient from "./PublicationsClient";

export const metadata = {
  title: "Publications",
  description:
    "Peer-reviewed research, conference proceedings, technical articles, and datasets by Viacheslav Danilov.",
  openGraph: {
    title: "Publications | Viacheslav Danilov",
    description:
      "Peer-reviewed research, conference proceedings, technical articles, and datasets by Viacheslav Danilov.",
    images: ["/opengraph-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Publications | Viacheslav Danilov",
    description:
      "Peer-reviewed research, conference proceedings, technical articles, and datasets by Viacheslav Danilov.",
    images: ["/opengraph-image.jpg"],
  },
};

export default function PublicationsPage() {
  return <PublicationsClient />;
}
