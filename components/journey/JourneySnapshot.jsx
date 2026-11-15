import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import world from "world-atlas/land-110m.json";
import { LEGS, PLACES, STOPS } from "@/lib/journey";

const W = 360;
const H = 260;
const PAD = 22;

const KEYS = [...new Set(STOPS.map((stop) => stop.place))];
const projection = geoNaturalEarth1().fitExtent(
  [
    [PAD, PAD],
    [W - PAD, H - PAD],
  ],
  {
    type: "MultiPoint",
    coordinates: KEYS.map((key) => [PLACES[key].lon, PLACES[key].lat]),
  },
);
projection.clipExtent([
  [0, 0],
  [W, H],
]);
const LAND = geoPath(projection).digits(1)(feature(world, world.objects.land));
const POS = Object.fromEntries(
  KEYS.map((key) => [key, projection([PLACES[key].lon, PLACES[key].lat])]),
);
const PAIRS = [
  ...new Set(LEGS.map(({ from, to }) => [from, to].sort().join(":"))),
].map((pair) => pair.split(":"));
const fmt = ([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`;
const arc = (a, b) => {
  const c = [
    (a[0] + b[0]) / 2,
    Math.min(a[1], b[1]) - Math.hypot(b[0] - a[0], b[1] - a[1]) * 0.2,
  ];
  return `M${fmt(a)}Q${fmt(c)} ${fmt(b)}`;
};

// Static route for phones: every place and every leg at once, no script
export default function JourneySnapshot() {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full rounded-2xl border border-[var(--line,rgba(255,255,255,0.1))] bg-[var(--surface,#151a1f)]"
      role="img"
      aria-label={`Route through ${KEYS.map((key) => PLACES[key].city).join(", ")}`}
    >
      <defs>
        <pattern
          id="journey-dots"
          width="4"
          height="4"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="0.8" fill="var(--ink, #fff)" />
        </pattern>
      </defs>
      <path d={LAND} fill="url(#journey-dots)" opacity="0.3" />
      <g
        fill="none"
        stroke="var(--accent-text, #03b1fb)"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.7"
      >
        {PAIRS.map(([a, b]) => (
          <path key={`${a}:${b}`} d={arc(POS[a], POS[b])} />
        ))}
      </g>
      {KEYS.map((key) => (
        <circle
          key={key}
          cx={POS[key][0]}
          cy={POS[key][1]}
          r="2.5"
          fill="var(--ink, #fff)"
        />
      ))}
    </svg>
  );
}
