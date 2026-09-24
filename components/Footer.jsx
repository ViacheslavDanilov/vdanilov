import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faGithub,
  faGoogleScholar,
  faOrcid,
  faResearchgate,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faHouse,
  faBriefcase,
  faGraduationCap,
  faFolderOpen,
  faBook,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";

const socialLinks = [
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/viacheslav-danilov/",
    icon: faLinkedin,
  },
  {
    title: "GitHub",
    href: "https://github.com/ViacheslavDanilov",
    icon: faGithub,
  },
  {
    title: "Google Scholar",
    href: "https://scholar.google.com/citations?user=SJidGZkAAAAJ&hl=en",
    icon: faGoogleScholar,
  },
  {
    title: "ORCID",
    href: "https://orcid.org/0000-0002-1413-1381",
    icon: faOrcid,
  },
  {
    title: "ResearchGate",
    href: "https://www.researchgate.net/profile/Viacheslav-Danilov-2",
    icon: faResearchgate,
  },
  {
    title: "Email",
    href: "mailto:viacheslav.v.danilov@gmail.com",
    icon: faEnvelope,
  },
];

const quickLinks = [
  { title: "Home", href: "/", icon: faHouse },
  { title: "Experience", href: "/experience", icon: faBriefcase },
  { title: "Education", href: "/education", icon: faGraduationCap },
  { title: "Portfolio", href: "/portfolio", icon: faFolderOpen },
  { title: "Publications", href: "/publications", icon: faBook },
  { title: "References", href: "/references", icon: faUsers },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full max-w-[1400px] mx-auto flex flex-col items-center justify-center rounded-t-xl border-t border-light/10 bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.accent/8%),transparent)] px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="bg-accent/20 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur" />

      {/* Stacked below lg; from lg, three columns with the copyright under the brand */}
      <div className="w-full flex flex-col gap-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto_1fr] lg:gap-x-12 xl:gap-x-16 lg:gap-y-0 lg:items-start">
        <div className="space-y-4 text-center lg:text-left lg:col-start-1 lg:row-start-1">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 [@media(hover:hover)]:hover:brightness-125 [@media(hover:hover)]:hover:scale-[1.03] transition-all duration-200 origin-center"
            aria-label="Go to home page"
          >
            <Image
              src="/logo.webp"
              alt="Viacheslav Danilov"
              width={42}
              height={32}
              quality={100}
              priority
              className="h-8 w-auto"
            />
          </Link>
          <p className="text-sm text-gray-400 mx-auto max-w-sm lg:mx-0 lg:max-w-xs lg:leading-relaxed">
            Bridging scientific research and industrial innovation through
            advanced AI and machine learning solutions
          </p>
        </div>

        {/* Link columns: a centred two-column grid below lg, the second and third columns from lg */}
        <div className="flex justify-center lg:contents">
          <div className="grid grid-cols-2 gap-x-8 sm:gap-x-12 lg:contents">
            <div className="lg:flex lg:justify-center lg:col-start-2 lg:row-start-1 lg:row-span-2">
              <div>
                <h3 className="text-xs uppercase tracking-wider text-light font-semibold mb-4">
                  Quick Links
                </h3>
                <ul className="space-y-2 text-sm">
                  {quickLinks.map((link) => (
                    <li key={link.title}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-accent inline-flex items-center transition-colors duration-300 h-6"
                      >
                        <FontAwesomeIcon
                          icon={link.icon}
                          className="mr-2 w-4 h-4 flex-shrink-0"
                          style={{
                            width: "1rem",
                            height: "1rem",
                            display: "block",
                          }}
                        />
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-start-3 lg:row-start-1 lg:row-span-2">
              <h3 className="text-xs uppercase tracking-wider text-light font-semibold mb-4">
                Connect
              </h3>
              <ul className="space-y-2 text-sm">
                {socialLinks.map((link) => (
                  <li key={link.title}>
                    <a
                      href={link.href}
                      target={
                        link.href.startsWith("mailto:") ? undefined : "_blank"
                      }
                      rel={
                        link.href.startsWith("mailto:")
                          ? undefined
                          : "noopener noreferrer"
                      }
                      className="text-gray-400 hover:text-accent inline-flex items-center transition-colors duration-300 h-6"
                    >
                      <FontAwesomeIcon
                        icon={link.icon}
                        className="mr-2 w-4 h-4 flex-shrink-0"
                        style={{
                          width: "1rem",
                          height: "1rem",
                          display: "block",
                        }}
                      />
                      <span className="max-lg:truncate">{link.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-light/10 text-center lg:col-start-1 lg:row-start-2 lg:pt-8 lg:border-t-0 lg:text-left">
          <p className="text-sm text-gray-400">
            © {year} Viacheslav Danilov • All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
