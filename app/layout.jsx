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

// Canonical production URL (used for SEO)
const SITE_URL = "https://www.vdanilov.com";

// Dynamic metadataBase for Vercel preview deployments
const getBaseUrl = () => {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return SITE_URL;
};

export const metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: "Viacheslav Danilov",
    template: "%s | Viacheslav Danilov",
  },
  description:
    "PhD in Computer Science combining research depth, engineering skill, and leadership experience. Building ML and AI solutions that solve real problems.",
  icons: {
    icon: "/favicon.webp",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Viacheslav Danilov",
    title: "Viacheslav Danilov",
    description:
      "PhD in Computer Science combining research depth, engineering skill, and leadership experience. Building ML and AI solutions that solve real problems.",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Viacheslav Danilov - ML/AI Solutions Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Viacheslav Danilov",
    description:
      "PhD in Computer Science combining research depth, engineering skill, and leadership experience. Building ML and AI solutions that solve real problems.",
    images: ["/opengraph-image.jpg"],
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
