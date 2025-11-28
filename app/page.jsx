import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center pt-12 md:pt-36 gap-36">
      <Hero />
      <BentoGrid />
    </div>
  );
}
