import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import MagicBento from "@/components/MagicBento";
import FeaturedProjects from "@/components/FeaturedProjects";
import LogoGrid from "@/components/LogoGrid";
import About from "@/components/About";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center pt-12 md:pt-36 gap-36 pb-32">
      <Hero />
      <About />
      <FeaturedProjects />
      {/* <BentoGrid /> */}
      <MagicBento />
      <LogoGrid />
    </div>
  );
}
