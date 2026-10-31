import React from "react";
import Image from "next/image";
import Link from "next/link";

const logos = [
  {
    name: "BCH",
    src: "/clients/bch.svg",
    href: "https://www.childrenshospital.org/",
  },
  {
    name: "Boehringer Ingelheim",
    src: "/clients/boehringer-ingelheim.svg",
    href: "https://www.boehringer-ingelheim.com/",
  },
  {
    name: "Biospective",
    src: "/clients/biospective.svg",
    href: "https://www.biospective.com/",
  },
  {
    name: "BIDMC",
    src: "/clients/bidmc.svg",
    href: "https://www.bidmc.org/",
  },
  {
    name: "IHU",
    src: "/clients/ihu.svg",
    href: "https://www.ihu-strasbourg.eu/",
  },
  {
    name: "BMS",
    src: "/clients/bms.svg",
    href: "https://www.bms.com/",
  },
  {
    name: "VHIR",
    src: "/clients/vhir.svg",
    href: "https://www.vhir.org/",
  },
  {
    name: "Volastra",
    src: "/clients/volastra.svg",
    href: "https://www.volastratx.com/",
  },
  {
    name: "AmTrust",
    src: "/clients/amtrust.svg",
    href: "https://amtrustfinancial.com/",
  },
  {
    name: "Lumos Insurance",
    src: "/clients/lumos.svg",
    href: "https://www.lumosinsurance.com/",
  },
  {
    name: "CNA",
    src: "/clients/cna.svg",
    href: "https://www.cna.com/",
  },
  {
    name: "Huawei",
    src: "/clients/huawei.svg",
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
    <section className="w-full max-w-6xl mx-auto px-6 py-12 lg:min-h-[min(100svh,72rem)] lg:flex lg:flex-col lg:justify-center">
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-light mb-4">
          Selected Clients
        </h2>
        <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
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
              className="flex h-28 md:h-36 items-center justify-center px-6 py-6 transition-all duration-300 hover:brightness-125"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={320}
                height={160}
                style={{ width: "auto", height: "auto" }}
                className="max-h-full max-w-full object-contain"
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
