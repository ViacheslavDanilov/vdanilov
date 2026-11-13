import JourneyCompare from "./JourneyCompare";

export const metadata = {
  title: "Journey prototype",
  robots: { index: false, follow: false },
};

export default function JourneyPage() {
  return (
    <div className="relative min-h-screen pt-28 pb-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6">
        <h1 className="text-3xl font-bold">Journey prototype</h1>
        <p className="text-[var(--text-muted,#9ca3af)]">
          Prototype of an animated career route. Desktop only.
        </p>
      </div>
      <JourneyCompare />
    </div>
  );
}
