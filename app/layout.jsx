import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

// FontAwesome SSR fix - prevents hydration mismatch by loading CSS upfront
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

const siteUrl = "https://vdanilov.com";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Viacheslav Danilov",
    template: "%s | Viacheslav Danilov",
  },
  description:
    "Personal website of Viacheslav Danilov, CTO and PhD in Computer Science. Expert in AI, Machine Learning, and R&D leadership, bridging the gap between scientific research and impactful industrial applications.",
  icons: {
    icon: "/favicon.webp",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Viacheslav Danilov",
    title: "Viacheslav Danilov",
    description:
      "CTO and PhD in Computer Science. Expert in AI, Machine Learning, and R&D leadership.",
    images: [
      {
        url: "/profile.png",
        width: 1000,
        height: 1000,
        alt: "Viacheslav Danilov - AI & ML Expert",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Viacheslav Danilov",
    description:
      "CTO and PhD in Computer Science. Expert in AI, Machine Learning, and R&D leadership.",
    images: ["/profile.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
