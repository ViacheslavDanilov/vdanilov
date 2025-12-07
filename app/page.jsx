import Hero from "@/components/Hero";
import MagicBento from "@/components/MagicBento";
import FeaturedProjects from "@/components/FeaturedProjects";
import LogoGrid from "@/components/LogoGrid";
import About from "@/components/About";
import Statistics from "@/components/Statistics";
import OrbGridBackground from "@/components/ui/orb-grid-background";

export default function Home() {
  return (
    <>
      <OrbGridBackground />
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
