import Hero from "@/components/Hero";
import ExpertiseSection from "@/components/ExpertiseSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import LogoGrid from "@/components/LogoGrid";
import Statistics from "@/components/Statistics";
import CallToAction from "@/components/CallToAction";
import LightRays from "@/components/ui/light-rays";
import PagePrefetcher from "@/components/PagePrefetcher";
import { pageMetadata, SITE_DESCRIPTION } from "@/lib/metadata";

export const metadata = pageMetadata({
  description: SITE_DESCRIPTION,
  path: "/",
});

export default function Home() {
  return (
    <div className="relative min-h-screen pt-24">
      <PagePrefetcher />
      <div className="absolute top-0 left-0 right-0 h-[60vh] pointer-events-none -z-10">
        <LightRays />
      </div>
      <div className="flex flex-col items-center pt-4 lg:pt-0 pb-12">
        <Hero />
        <Statistics />
        <FeaturedProjects />
        <ExpertiseSection />
        <LogoGrid />
        <CallToAction />
      </div>
    </div>
  );
}
