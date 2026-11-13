"use client";

import { memo } from "react";
import { geoGraticule10, geoNaturalEarth1, geoPath } from "d3-geo";
import { feature, mesh } from "topojson-client";
import world from "world-atlas/countries-110m.json";
import {
  LEGS,
  PLACES,
  REMOTE,
  STOPS,
  journeyAt,
  progressOfStop,
} from "@/lib/journey";

const W = 1200;
const H = 675;
const ACCENT = "#03b1fb";
const SAFE = { top: 120, right: 80, bottom: 170, left: 80 };
const PAD = (W * 10) / 360;
const MIN_SPAN = (W * 34) / 360;
const BEND = 0.3;
const PLANE_D =
  "M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z";

const projection = geoNaturalEarth1().fitWidth(W, { type: "Sphere" });
const toPath = geoPath(projection);
const LAND_D = toPath(feature(world, world.objects.land));
const BORDERS_D = toPath(
  mesh(world, world.objects.countries, (a, b) => a !== b),
);
const GRATICULE_D = toPath(geoGraticule10());

const POS = Object.fromEntries(
  Object.entries(PLACES).map(([key, p]) => [key, projection([p.lon, p.lat])]),
);

const ARCS = LEGS.map(({ from, to }) => {
  const [ax, ay] = POS[from];
  const [bx, by] = POS[to];
  const c = [
    (ax + bx) / 2 + (by - ay) * BEND,
    (ay + by) / 2 - (bx - ax) * BEND,
  ];
  return { a: POS[from], b: POS[to], c };
});

const frameOf = (keys) => {
  const xs = keys.map((key) => POS[key][0]);
  const ys = keys.map((key) => POS[key][1]);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const k = Math.min(
    (W - SAFE.left - SAFE.right) / Math.max(maxX - minX + 2 * PAD, MIN_SPAN),
    (H - SAFE.top - SAFE.bottom) / Math.max(maxY - minY + 2 * PAD, 1),
  );
  return {
    x: (minX + maxX) / 2 - (SAFE.left - SAFE.right) / 2 / k,
    y: (minY + maxY) / 2 - (SAFE.top - SAFE.bottom) / 2 / k,
    k,
  };
};

const REMOTE_PLACES = REMOTE.map((r) => r.place);
const REMOTE_START = Math.min(...REMOTE.map((r) => Date.parse(r.from)));

// A camera frame per stop (its neighbours, plus the Americas once remote work starts), blended over each flight
const FRAMES = STOPS.map((stop, i) => {
  if (i === STOPS.length - 1) return frameOf(Object.keys(PLACES));
  const keys = [STOPS[i - 1], stop, STOPS[i + 1]]
    .filter(Boolean)
    .map((s) => s.place);
  if (Date.parse(stop.to) >= REMOTE_START) keys.push(...REMOTE_PLACES);
  return frameOf(keys);
});

const WINDOWS = LEGS.map((_, i) => {
  const end = progressOfStop(i + 1);
  let lo = progressOfStop(i);
  let hi = end;
  for (let n = 0; n < 30; n++) {
    const mid = (lo + hi) / 2;
    if (journeyAt(mid).leg) hi = mid;
    else lo = mid;
  }
  return [hi - (end - hi) / 2, end];
});

const smooth = (t) => t * t * (3 - 2 * t);
const sine = (t) => 0.5 - 0.5 * Math.cos(Math.PI * t);

const cameraAt = (p) => {
  let i = 0;
  while (i < WINDOWS.length && p > WINDOWS[i][1]) i++;
  if (i === WINDOWS.length) return FRAMES[FRAMES.length - 1];
  const [start, end] = WINDOWS[i];
  if (p <= start) return FRAMES[i];
  const t = smooth((p - start) / (end - start));
  const a = FRAMES[i];
  const b = FRAMES[i + 1];
  return {
    x: a.x + (b.x - a.x) * t,
    y: a.y + (b.y - a.y) * t,
    k: Math.exp(Math.log(a.k) + (Math.log(b.k) - Math.log(a.k)) * t),
  };
};

const LABEL_SIDE = {
  montreal: "left",
  trento: "above",
  milan: "below",
  madrid: "below",
  barcelona: "below",
  rome: "below",
  leeds: "above",
  paris: "above",
  groningen: "above",
};

const Land = memo(function Land() {
  return (
    <>
      <path
        d={GRATICULE_D}
        fill="none"
        stroke="rgba(255,255,255,0.035)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
      <path d={LAND_D} fill="rgba(255,255,255,0.055)" />
      <path
        d={BORDERS_D}
        fill="none"
        stroke="rgba(255,255,255,0.09)"
        strokeWidth="0.75"
        vectorEffect="non-scaling-stroke"
      />
    </>
  );
});

const Pulse = ({ x, y }) =>
  [0, 1.2].map((delay) => (
    <circle
      key={delay}
      cx={x}
      cy={y}
      r="6"
      fill="none"
      stroke={ACCENT}
      strokeWidth="1.5"
      opacity="0"
    >
      <animate
        attributeName="r"
        from="6"
        to="32"
        dur="2.4s"
        begin={`${delay}s`}
        repeatCount="indefinite"
      />
      <animate
        attributeName="opacity"
        from="0.85"
        to="0"
        dur="2.4s"
        begin={`${delay}s`}
        repeatCount="indefinite"
      />
    </circle>
  ));

const Label = ({ x, y, text, side, strong }) => {
  const dir = side ?? (x > W - 190 ? "left" : "right");
  const vertical = dir === "above" || dir === "below";
  const anchor = vertical ? "middle" : dir === "left" ? "end" : "start";
  const dx = vertical ? 0 : dir === "left" ? -11 : 11;
  const dy = dir === "above" ? -13 : dir === "below" ? 22 : 4.5;
  return (
    <text
      x={x + dx}
      y={y + dy}
      textAnchor={anchor}
      fontSize={strong ? 15 : 13}
      fontWeight={strong ? 600 : 500}
      fill={strong ? "#f5f5f5" : "#9ca3af"}
      stroke="#151a1f"
      strokeWidth="4"
      strokeLinejoin="round"
      paintOrder="stroke"
    >
      {text}
    </text>
  );
};

const STATIC_LABELS = ["tomsk", "barcelona", "pretoria"];

export default function JourneyMap({ progress, reducedMotion }) {
  const p = reducedMotion ? 1 : progress;
  const state = journeyAt(p);
  const cam = cameraAt(p);
  const at = ([x, y]) => [
    (x - cam.x) * cam.k + W / 2,
    (y - cam.y) * cam.k + H / 2,
  ];
  const fmt = ([x, y]) => `${x.toFixed(2)} ${y.toFixed(2)}`;

  const reached = [
    ...new Set(STOPS.slice(0, state.stopIndex + 1).map((s) => s.place)),
  ];
  const current = state.leg ? null : STOPS[state.stopIndex].place;
  const target = state.leg && !reducedMotion ? state.leg.to : null;
  const ahead = [...new Set(STOPS.map((s) => s.place))].filter(
    (place) => !reached.includes(place) && place !== target,
  );

  const eased = state.leg ? sine(state.legT) : 0;
  const live = state.leg ? ARCS[state.stopIndex] : null;
  let livePath = null;
  let plane = null;
  if (live && !reducedMotion) {
    const { a, b, c } = live;
    const u = eased;
    const mix = (s, t, k) => [
      s[0] + (t[0] - s[0]) * k,
      s[1] + (t[1] - s[1]) * k,
    ];
    const control = mix(a, c, u);
    const end = mix(control, mix(c, b, u), u);
    const head = at(end);
    livePath = `M${fmt(at(a))}Q${fmt(at(control))} ${fmt(head)}`;
    const dx = 2 * (1 - u) * (c[0] - a[0]) + 2 * u * (b[0] - c[0]);
    const dy = 2 * (1 - u) * (c[1] - a[1]) + 2 * u * (b[1] - c[1]);
    plane = {
      x: head[0],
      y: head[1],
      angle: (Math.atan2(dy, dx) * 180) / Math.PI + 90,
    };
  }

  const done = ARCS.slice(0, state.stopIndex).map(
    ({ a, b, c }) => `M${fmt(at(a))}Q${fmt(at(c))} ${fmt(at(b))}`,
  );

  const remoteStarted = reducedMotion
    ? REMOTE
    : REMOTE.filter((r) => state.dateMs >= Date.parse(r.from));
  const remoteLive = new Set(
    reducedMotion ? [] : state.remote.map((r) => r.place),
  );
  const remotePlaces = [...new Set(remoteStarted.map((r) => r.place))];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <g
        transform={`translate(${W / 2 - cam.x * cam.k} ${H / 2 - cam.y * cam.k}) scale(${cam.k})`}
      >
        <Land />
      </g>

      {ahead.map((place) => (
        <circle
          key={place}
          cx={at(POS[place])[0]}
          cy={at(POS[place])[1]}
          r="2.5"
          fill="#f5f5f5"
          opacity="0.22"
        />
      ))}

      <g fill="none" strokeLinecap="round">
        {done.map((d, i) => (
          <path
            key={i}
            d={d}
            stroke={ACCENT}
            strokeWidth="1.25"
            opacity={
              reducedMotion
                ? 0.7
                : Math.max(0.2, 0.55 - 0.05 * (done.length - 1 - i))
            }
          />
        ))}
        {livePath && (
          <>
            <path d={livePath} stroke={ACCENT} strokeWidth="7" opacity="0.14" />
            <path d={livePath} stroke={ACCENT} strokeWidth="2" />
          </>
        )}
      </g>

      {target && (
        <circle
          cx={at(POS[target])[0]}
          cy={at(POS[target])[1]}
          r="4.5"
          fill="none"
          stroke={ACCENT}
          strokeWidth="1.25"
          opacity="0.5"
        />
      )}

      {remotePlaces.map((place) => {
        const [x, y] = at(POS[place]);
        return (
          <g key={place}>
            {remoteLive.has(place) && <Pulse x={x} y={y} />}
            {reducedMotion && (
              <circle
                cx={x}
                cy={y}
                r="13"
                fill="none"
                stroke={ACCENT}
                strokeWidth="1.25"
                opacity="0.45"
              />
            )}
            <circle
              cx={x}
              cy={y}
              r="4"
              fill="#151a1f"
              stroke={ACCENT}
              strokeWidth="1.75"
            />
            <Label
              x={x}
              y={y}
              text={PLACES[place].city}
              side={LABEL_SIDE[place]}
            />
          </g>
        );
      })}

      {reached.map((place) => {
        const [x, y] = at(POS[place]);
        const here = place === current;
        return (
          <g key={place}>
            {here && (
              <circle
                cx={x}
                cy={y}
                r="9.5"
                fill="none"
                stroke={ACCENT}
                strokeWidth="1.5"
                opacity="0.55"
              />
            )}
            <circle
              cx={x}
              cy={y}
              r={here ? 4.5 : 3.5}
              fill={here ? "#f5f5f5" : ACCENT}
            />
            {(here || (reducedMotion && STATIC_LABELS.includes(place))) && (
              <Label
                x={x}
                y={y}
                text={PLACES[place].city}
                side={LABEL_SIDE[place]}
                strong={here}
              />
            )}
          </g>
        );
      })}

      {plane && (
        <g
          transform={`translate(${plane.x} ${plane.y}) rotate(${plane.angle})`}
        >
          <path
            d={PLANE_D}
            transform="translate(-13.2 -13.2) scale(1.1)"
            fill="#f5f5f5"
            stroke="#0a0e14"
            strokeWidth="1.2"
            strokeLinejoin="round"
            paintOrder="stroke"
          />
        </g>
      )}
    </svg>
  );
}
