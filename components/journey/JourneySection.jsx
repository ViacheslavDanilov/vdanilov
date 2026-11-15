import JourneyPlayer from "@/components/journey/JourneyPlayer";
import JourneySnapshot from "@/components/journey/JourneySnapshot";
import { TOTALS } from "@/lib/journey";

export default function JourneySection() {
  return (
    <section
      id="journey"
      aria-labelledby="journey-title"
      className="w-full max-w-7xl mx-auto px-6 py-12 lg:min-h-[min(100svh,72rem)] lg:flex lg:flex-col lg:justify-center"
    >
      <div className="mb-10 text-center">
        <h2
          id="journey-title"
          className="text-3xl md:text-4xl font-bold text-strong mb-4"
        >
          Career Journey
        </h2>
        <p className="text-muted mt-3 max-w-2xl mx-auto leading-relaxed">
          From Tomsk in 2007 to Barcelona today, through study, research and
          engineering in {TOTALS.countries} countries
        </p>
      </div>
      <JourneyPlayer>
        <div className="md:hidden">
          <JourneySnapshot />
        </div>
      </JourneyPlayer>
    </section>
  );
}
