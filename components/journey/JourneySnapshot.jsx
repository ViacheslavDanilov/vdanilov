import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import world from "world-atlas/land-110m.json";
import { PLACES, REMOTE, STOPS } from "@/lib/journey";

const W = 360;
const H = 270;
const PAD = 22;

const KEYS = [...new Set(STOPS.map((stop) => stop.place))];
const REMOTE_KEYS = [...new Set(REMOTE.map((role) => role.place))];
const HOMES = STOPS.filter((stop) => stop.kind === "home")
  .map((stop) => stop.place)
  .filter((place, i, all) => place !== all[i - 1]);
const VISITS = KEYS.filter((key) => !HOMES.includes(key));
const VISIT_LEGS = STOPS.flatMap((stop, i) =>
  stop.kind === "visit" ? [[STOPS[i - 1].place, stop.place]] : [],
);

const projection = geoNaturalEarth1().fitExtent(
  [
    [PAD, PAD],
    [W - PAD, H - PAD],
  ],
  {
    type: "MultiPoint",
    coordinates: [...KEYS, ...REMOTE_KEYS].map((key) => [
      PLACES[key].lon,
      PLACES[key].lat,
    ]),
  },
);
projection.clipExtent([
  [0, 0],
  [W, H],
]);
const LAND = geoPath(projection).digits(1)(feature(world, world.objects.land));
const POS = Object.fromEntries(
  [...KEYS, ...REMOTE_KEYS].map((key) => [
    key,
    projection([PLACES[key].lon, PLACES[key].lat]),
  ]),
);
const fmt = ([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`;
const arc = (a, b, bend = 0.2) => {
  const c = [
    (a[0] + b[0]) / 2,
    Math.min(a[1], b[1]) - Math.hypot(b[0] - a[0], b[1] - a[1]) * bend,
  ];
  return `M${fmt(a)}Q${fmt(c)} ${fmt(b)}`;
};
const LABELS = [
  { key: "tomsk", dx: 2, dy: -7, anchor: "end" },
  { key: "barcelona", dx: -5, dy: 11, anchor: "end" },
  { key: "montreal", dx: -4, dy: -7, anchor: "start" },
  { key: "cambridge", dx: 7, dy: 4, anchor: "start" },
  { key: "miami", dx: 7, dy: 4, anchor: "start" },
];
const list = (words) => `${words.slice(0, -1).join(", ")} and ${words.at(-1)}`;

// Static route for phones: the moves between homes, the visits and the remote teams, no script
export default function JourneySnapshot() {
  return (
    <figure>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full rounded-2xl border border-[var(--line,rgba(255,255,255,0.1))] bg-[var(--surface,#151a1f)]"
        role="img"
        aria-label={`Route through ${list(HOMES.map((key) => PLACES[key].city))}, with visits to ${list(VISITS.map((key) => PLACES[key].city))}, and remote teams in ${list(REMOTE_KEYS.map((key) => PLACES[key].city))}`}
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
        <path d={LAND} fill="url(#journey-dots)" opacity="0.25" />
        <g
          fill="none"
          stroke="var(--ink, #fff)"
          strokeWidth="0.6"
          opacity="0.3"
        >
          {VISIT_LEGS.map(([a, b], i) => (
            <path key={i} d={arc(POS[a], POS[b], 0.12)} />
          ))}
        </g>
        <path
          d={HOMES.slice(1)
            .map((key, i) => arc(POS[HOMES[i]], POS[key]))
            .join("")}
          fill="none"
          stroke="var(--accent-text, #03b1fb)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        {VISITS.map((key) => (
          <circle
            key={key}
            cx={POS[key][0]}
            cy={POS[key][1]}
            r="1.6"
            fill="var(--ink, #fff)"
            opacity="0.7"
          />
        ))}
        {HOMES.map((key) => (
          <circle
            key={key}
            cx={POS[key][0]}
            cy={POS[key][1]}
            r="2.6"
            fill="var(--ink, #fff)"
          />
        ))}
        {REMOTE_KEYS.map((key) => (
          <circle
            key={key}
            cx={POS[key][0]}
            cy={POS[key][1]}
            r="2.6"
            fill="none"
            stroke="var(--accent-text, #03b1fb)"
            strokeWidth="1.2"
          />
        ))}
        <g
          fontSize="9"
          fill="var(--text-muted, #9ca3af)"
          stroke="var(--surface, #151a1f)"
          strokeWidth="2.5"
          paintOrder="stroke"
        >
          {LABELS.map(({ key, dx, dy, anchor }) => (
            <text
              key={key}
              x={POS[key][0] + dx}
              y={POS[key][1] + dy}
              textAnchor={anchor}
            >
              {PLACES[key].city}
            </text>
          ))}
        </g>
      </svg>
      <figcaption className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-1 text-xs text-muted">
        <span className="flex items-center gap-1.5">
          <svg viewBox="0 0 18 6" className="h-1.5 w-[18px]" aria-hidden="true">
            <path
              d="M1 3h16"
              stroke="var(--accent-text, #03b1fb)"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
          Moves
        </span>
        <span className="flex items-center gap-1.5">
          <svg viewBox="0 0 6 6" className="size-1.5" aria-hidden="true">
            <circle cx="3" cy="3" r="2" fill="currentColor" />
          </svg>
          Visits
        </span>
        <span className="flex items-center gap-1.5">
          <svg viewBox="0 0 8 8" className="size-2" aria-hidden="true">
            <circle
              cx="4"
              cy="4"
              r="2.8"
              fill="none"
              stroke="var(--accent-text, #03b1fb)"
              strokeWidth="1.2"
            />
          </svg>
          Remote teams
        </span>
      </figcaption>
    </figure>
  );
}
