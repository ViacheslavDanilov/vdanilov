import React from "react";
import Image from "next/image";
import Link from "next/link";

const logos = [
  {
    name: "BCH",
    src: "/clients/bch.webp",
    href: "https://www.childrenshospital.org/",
  },
  {
    name: "Boehringer Ingelheim",
    src: "/clients/boehringer-ingelheim.webp",
    href: "https://www.boehringer-ingelheim.com/",
  },
  {
    name: "Biospective",
    src: "/clients/biospective.webp",
    href: "https://www.biospective.com/",
  },
  {
    name: "BIDMC",
    src: "/clients/bidmc.webp",
    href: "https://www.bidmc.org/",
  },
  {
    name: "IHU",
    src: "/clients/ihu.webp",
    href: "https://www.ihu-strasbourg.eu/",
  },
  {
    name: "BMS",
    src: "/clients/bms.webp",
    href: "https://www.bms.com/",
  },
  {
    name: "VHIR",
    src: "/clients/vhir.webp",
    href: "https://www.vhir.org/",
  },
  {
    name: "Volastra",
    src: "/clients/volastra.webp",
    href: "https://www.volastratx.com/",
  },
  {
    name: "AmTrust",
    src: "/clients/amtrust.webp",
    href: "https://amtrustfinancial.com/",
  },
  {
    name: "Plateau",
    src: "/clients/plateau.webp",
    href: "https://www.plateaugroup.com/",
  },
  {
    name: "CNA",
    src: "/clients/cna.webp",
    href: "https://www.cna.com/",
  },
  {
    name: "Huawei",
    src: "/clients/huawei.webp",
    href: "https://www.huawei.com/",
  },
];

const LogoGrid = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-light mb-4">
          Selected Clients
        </h2>
        <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
          Helping companies build better software and scale their research and
          engineering teams
        </p>
      </div>
      <div className="flex justify-center">
        <ul className="inline-grid grid-cols-2 gap-x-10 gap-y-8 md:gap-x-16 md:grid-cols-3 lg:grid-cols-4">
          {logos.map((logo, idx) => (
            <li key={idx} className="flex items-center justify-center">
              <Link
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-40 h-20 hover:grayscale-0 transition-all duration-300 opacity-75 hover:opacity-100"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  fill
                  className="object-contain"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default LogoGrid;
