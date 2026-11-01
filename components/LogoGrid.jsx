import React from "react";
import Image from "next/image";
import Link from "next/link";

const logos = [
  {
    name: "Boston Children's Hospital",
    src: "/clients/bch-mono.svg",
    href: "https://www.childrenshospital.org/",
  },
  {
    name: "Boehringer Ingelheim",
    src: "/clients/boehringer-ingelheim-mono.svg",
    href: "https://www.boehringer-ingelheim.com/",
  },
  {
    name: "Biospective",
    src: "/clients/biospective-mono.svg",
    href: "https://www.biospective.com/",
  },
  {
    name: "Beth Israel Deaconess Medical Center",
    src: "/clients/bidmc-mono.svg",
    href: "https://www.bidmc.org/",
  },
  {
    name: "Institute of Image-Guided Surgery",
    src: "/clients/ihu-mono.svg",
    href: "https://www.ihu-strasbourg.eu/",
  },
  {
    name: "Bristol Myers Squibb",
    src: "/clients/bms-mono.svg",
    href: "https://www.bms.com/",
  },
  {
    name: "Vall d'Hebron Barcelona Hospital Campus",
    src: "/clients/vhir-mono.svg",
    href: "https://www.vhir.org/",
  },
  {
    name: "Volastra",
    src: "/clients/volastra-mono.svg",
    href: "https://www.volastratx.com/",
  },
  {
    name: "AmTrust",
    src: "/clients/amtrust-mono.svg",
    href: "https://amtrustfinancial.com/",
  },
  {
    name: "Lumos Insurance",
    src: "/clients/lumos-mono.svg",
    href: "https://www.lumosinsurance.com/",
  },
  {
    name: "CNA",
    src: "/clients/cna-mono.svg",
    size: "max-h-5 md:max-h-7",
    href: "https://www.cna.com/",
  },
  {
    name: "Huawei",
    src: "/clients/huawei-mono.svg",
    size: "max-h-6 md:max-h-8",
    href: "https://www.huawei.com/",
  },
];

// Tint cells like a checkerboard at both column counts (2 on phones, 4 from md)
const tinted = (i, cols) => (Math.floor(i / cols) + (i % cols)) % 2 === 0;
// Mark inner corners, where four cells meet
const inner = (i, cols, rows) =>
  i % cols < cols - 1 && Math.floor(i / cols) < rows - 1;

const PlusMark = ({ className }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className={`absolute -right-3 -bottom-3 z-10 size-6 text-white/40 ${className}`}
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const LogoGrid = () => {
  return (
    <section className="w-full max-w-5xl mx-auto px-6 py-12 lg:min-h-[min(100svh,72rem)] lg:flex lg:flex-col lg:justify-center">
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-light mb-4">
          Selected Clients
        </h2>
        <p className="text-gray-400 mt-3 max-w-2xl mx-auto text-balance">
          Helping companies build better software and scale their research and
          engineering teams
        </p>
      </div>
      <ul className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-white/10">
        {logos.map((logo, i) => (
          <li
            key={logo.name}
            className={`relative border-r border-b border-white/10 ${
              tinted(i, 2) ? "bg-white/[0.03]" : ""
            } ${tinted(i, 4) ? "md:bg-white/[0.03]" : "md:bg-transparent"}`}
          >
            <Link
              href={logo.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${logo.name} (opens in a new tab)`}
              className="group flex h-20 md:h-24 items-center justify-center px-6 transition-colors hover:bg-white/[0.06] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={320}
                height={160}
                style={{ width: "auto", height: "auto" }}
                className={`${logo.size ?? "max-h-7 md:max-h-10"} max-w-[6.5rem] md:max-w-[9rem] object-contain opacity-80 transition-opacity group-hover:opacity-100`}
              />
            </Link>
            {inner(i, 2, 6) && <PlusMark className="md:hidden" />}
            {inner(i, 4, 3) && <PlusMark className="hidden md:block" />}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default LogoGrid;
