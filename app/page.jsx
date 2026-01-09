import Hero from "@/components/Hero";
import ExpertiseSection from "@/components/ExpertiseSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import LogoGrid from "@/components/LogoGrid";
import About from "@/components/About";
import Statistics from "@/components/Statistics";
import CallToAction from "@/components/CallToAction";
import LightRays from "@/components/ui/light-rays";

export default function Home() {
  return (
    <div className="relative min-h-screen pt-24">
      <div className="absolute top-0 left-0 right-0 h-[60vh] pointer-events-none -z-10">
        <LightRays />
      </div>
      <div className="flex flex-col items-center pt-12 md:pt-36 gap-36 pb-32">
        <Hero />
        <About />
        <Statistics />
        <FeaturedProjects />
        <ExpertiseSection />
        <LogoGrid />
        <CallToAction />
      </div>
    </div>
  );
}
