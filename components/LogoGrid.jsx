import React from "react";
import Image from "next/image";

const logos = [
  { name: "BCH", src: "/clients/bch.webp" },
  { name: "Boehringer Ingelheim", src: "/clients/boehringer-ingelheim.webp" },
  { name: "Biospective", src: "/clients/biospective.webp" },
  { name: "BIDMC", src: "/clients/bidmc.webp" },
  { name: "IHU", src: "/clients/ihu.webp" },
  { name: "BMS", src: "/clients/bms.webp" },
  { name: "VHIR", src: "/clients/vhir.webp" },
  { name: "Volastra", src: "/clients/volastra.webp" },
  { name: "AmTrust", src: "/clients/amtrust.webp" },
  { name: "Plateau", src: "/clients/plateau.webp" },
  { name: "CNA", src: "/clients/cna.webp" },
  { name: "Huawei", src: "/clients/huawei.webp" },
];

const LogoGrid = () => {
  return (
    <div className="py-14">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="max-w-xl mx-auto text-center">
          <h3 className="text-gray-200 text-3xl font-semibold sm:text-4xl">
            Trusted by industry leaders
          </h3>
          <p className="text-gray-400 mt-3">
            Helping companies build better software and scale their research and
            engineering teams.
          </p>
        </div>
        <div className="mt-12 flex justify-center">
          <ul className="inline-grid grid-cols-2 gap-x-10 gap-y-8 md:gap-x-16 md:grid-cols-3 lg:grid-cols-4">
            {logos.map((logo, idx) => (
              <li key={idx} className="flex items-center justify-center">
                <div className="relative w-40 h-20 hover:grayscale-0 transition-all duration-300 opacity-75 hover:opacity-100">
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LogoGrid;
