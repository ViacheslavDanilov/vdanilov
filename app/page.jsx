import Hero from "@/components/Hero";
import MagicBento from "@/components/MagicBento";
import FeaturedProjects from "@/components/FeaturedProjects";
import LogoGrid from "@/components/LogoGrid";
import About from "@/components/About";
import Statistics from "@/components/Statistics";
import LightRays from "@/components/ui/light-rays";

export default function Home() {
  return (
    <>
      <div
        className="absolute top-0 left-0 right-0 h-[60vh]"
        style={{ zIndex: -1 }}
      >
        <LightRays />
      </div>
      <div className="min-h-screen flex flex-col items-center pt-12 md:pt-36 gap-36 pb-32">
        <Hero />
        <About />
        <Statistics />
        <FeaturedProjects />
        <MagicBento />
        <LogoGrid />
      </div>
    </>
  );
}
