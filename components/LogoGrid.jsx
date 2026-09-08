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
    name: "Plateau",
    src: "/clients/plateau.svg",
    href: "https://www.plateaugroup.com/",
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

const LogoGrid = () => {
  return (
    <section className="py-12 px-6 max-w-7xl mx-auto">
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-light mb-4">
          Selected Clients
        </h2>
        <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
          Helping companies build better software and scale their research and
          engineering teams
        </p>
      </div>
      <ul className="grid grid-cols-2 gap-x-10 gap-y-8 md:gap-x-16 md:grid-cols-3 lg:grid-cols-4">
        {logos.map((logo, idx) => (
          <li
            key={idx}
            className="flex items-center justify-center"
            style={{ minHeight: "5rem" }}
          >
            <Link
              href={logo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center transition-all duration-300 hover:brightness-125 hover:scale-[1.01]"
              style={{ width: "10rem", height: "5rem" }}
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={320}
                height={160}
                style={{
                  width: "auto",
                  height: "auto",
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
                className="object-contain"
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default LogoGrid;
