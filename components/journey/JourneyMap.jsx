"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import world from "world-atlas/land-110m.json";
import { LEGS, PLACES, STOPS, journeyAt } from "@/lib/journey";

const W = 1200;
const H = 675;
const SAFE = { top: 120, right: 80, bottom: 170, left: 80 };
const PAD = (W * 10) / 360;
const K_STAY = 6;
const STAY_ZOOM = { tomsk: 3 };
const BEND = 0.3;
const TAIL = 0.6;
const RETRACT = 0.2;
const ZOOM_PHASE = 0.3;
const PITCH = 9;
const DOT_R = 1.5;
const DOT_ALPHA = 0.3;
const LEVELS = 5;
const TILE = 60;
const TAU = Math.PI * 2;

const INK = "var(--ink, #fff)";
const ACCENT = "var(--accent-text, #03b1fb)";
const SURFACE = "var(--surface, #151a1f)";
const PLANE_D =
  "M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z";

// Easing curves from the animate skill, evaluated for progress-driven motion
const cubicBezier = (x1, y1, x2, y2) => {
  const axis = (a, b, t) =>
    3 * a * (1 - t) * (1 - t) * t + 3 * b * (1 - t) * t * t + t * t * t;
  return (x) => {
    if (x <= 0 || x >= 1) return Math.min(1, Math.max(0, x));
    let lo = 0;
    let hi = 1;
    for (let i = 0; i < 24; i++) {
      const mid = (lo + hi) / 2;
      if (axis(x1, x2, mid) < x) lo = mid;
      else hi = mid;
    }
    return axis(y1, y2, (lo + hi) / 2);
  };
};
const EASE_IN_OUT = cubicBezier(0.77, 0, 0.175, 1);
const sine = (t) => 0.5 - 0.5 * Math.cos(Math.PI * t);
const clamp01 = (t) => Math.min(1, Math.max(0, t));
const ramp = (t, a, b) => EASE_IN_OUT(clamp01((t - a) / (b - a)));
const lerp = (a, b, t) => a + (b - a) * t;
const mix = (p, q, t) => [lerp(p[0], q[0], t), lerp(p[1], q[1], t)];

const projection = geoNaturalEarth1().fitWidth(W, { type: "Sphere" });
const POS = Object.fromEntries(
  Object.entries(PLACES).map(([key, p]) => [key, projection([p.lon, p.lat])]),
);

// Land as a lattice of dots in map space. Level n holds the dots that sit on a
// lattice 2^n times coarser, so zooming out only drops dots and never moves one.
const DOTS = (() => {
  const step = PITCH / K_STAY;
  const cols = Math.ceil(W / step);
  const rows = Math.ceil(projection([0, -60])[1] / step);
  const canvas = document.createElement("canvas");
  canvas.width = cols;
  canvas.height = rows;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  ctx.scale(1 / step, 1 / step);
  ctx.fill(new Path2D(geoPath(projection)(feature(world, world.objects.land))));
  const alpha = ctx.getImageData(0, 0, cols, rows).data;
  const tilesX = Math.ceil(W / TILE);
  const tilesY = Math.ceil((rows * step) / TILE);
  const levels = Array.from({ length: LEVELS }, () =>
    Array.from({ length: tilesX * tilesY }, () => []),
  );
  const trailing = (n) =>
    n === 0 ? LEVELS : Math.min(LEVELS, Math.clz32(n & -n) ^ 31);
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      if (alpha[(j * cols + i) * 4 + 3] < 128) continue;
      const x = (i + 0.5) * step;
      const y = (j + 0.5) * step;
      const level = Math.min(LEVELS - 1, trailing(i), trailing(j));
      levels[level][Math.floor(y / TILE) * tilesX + Math.floor(x / TILE)].push(
        x,
        y,
      );
    }
  }
  return { levels, tilesX, tilesY };
})();

const drawLand = (canvas, cam, color) => {
  const ctx = canvas.getContext("2d");
  const s = canvas.width / W;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = color;
  const halfW = W / 2 / cam.k;
  const halfH = H / 2 / cam.k;
  const tx0 = Math.max(0, Math.floor((cam.x - halfW) / TILE));
  const tx1 = Math.min(DOTS.tilesX - 1, Math.floor((cam.x + halfW) / TILE));
  const ty0 = Math.max(0, Math.floor((cam.y - halfH) / TILE));
  const ty1 = Math.min(DOTS.tilesY - 1, Math.floor((cam.y + halfH) / TILE));
  const spacing = Math.max(0, Math.log2(K_STAY / cam.k));
  const r = DOT_R * s;
  for (let level = Math.floor(spacing); level < LEVELS; level++) {
    const alpha = clamp01(level - spacing + 1) * DOT_ALPHA;
    if (alpha <= 0) continue;
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    for (let ty = ty0; ty <= ty1; ty++) {
      for (let tx = tx0; tx <= tx1; tx++) {
        const dots = DOTS.levels[level][ty * DOTS.tilesX + tx];
        for (let n = 0; n < dots.length; n += 2) {
          const x = ((dots[n] - cam.x) * cam.k + W / 2) * s;
          const y = ((dots[n + 1] - cam.y) * cam.k + H / 2) * s;
          ctx.moveTo(x + r, y);
          ctx.arc(x, y, r, 0, TAU);
        }
      }
    }
    ctx.fill();
  }
};

const quadAt = (a, c, b, u) => mix(mix(a, c, u), mix(c, b, u), u);
// Part s to h of a quadratic curve, as a quadratic curve
const quadSlice = (a, c, b, s, h) => [
  quadAt(a, c, b, s),
  mix(quadAt(a, c, b, s), mix(c, b, s), (h - s) / (1 - s)),
  quadAt(a, c, b, h),
];

const ARCS = LEGS.map(({ from, to }) => {
  const a = POS[from];
  const b = POS[to];
  let nx = b[1] - a[1];
  let ny = a[0] - b[0];
  if (ny > 0) {
    nx = -nx;
    ny = -ny;
  }
  const c = [(a[0] + b[0]) / 2 + nx * BEND, (a[1] + b[1]) / 2 + ny * BEND];
  return { a, b, c };
});

const centered = (x, y, k) => ({
  x: x - (SAFE.left - SAFE.right) / 2 / k,
  y: y - (SAFE.top - SAFE.bottom) / 2 / k,
  k,
});

const frameAround = (points) => {
  const xs = points.map((p) => p[0]);
  const ys = points.map((p) => p[1]);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const k = Math.min(
    K_STAY,
    (W - SAFE.left - SAFE.right) / (maxX - minX + 2 * PAD),
    (H - SAFE.top - SAFE.bottom) / (maxY - minY + 2 * PAD),
  );
  return centered((minX + maxX) / 2, (minY + maxY) / 2, k);
};

const STAY_FRAMES = STOPS.map((stop) =>
  centered(...POS[stop.place], STAY_ZOOM[stop.place] ?? K_STAY),
);
const FLY_FRAMES = ARCS.map(({ a, b, c }) =>
  frameAround([a, quadAt(a, c, b, 0.5), b]),
);

const blend = (from, to, t) => ({
  x: lerp(from.x, to.x, t),
  y: lerp(from.y, to.y, t),
  k: Math.exp(lerp(Math.log(from.k), Math.log(to.k), t)),
});

// Stay: frame the city. Flight: zoom out to both endpoints, hold, zoom in on the destination
const cameraAt = ({ phase, stopIndex, t }) => {
  if (phase === "stay") return STAY_FRAMES[stopIndex];
  const mid = FLY_FRAMES[stopIndex];
  if (t < ZOOM_PHASE) {
    return blend(STAY_FRAMES[stopIndex], mid, EASE_IN_OUT(t / ZOOM_PHASE));
  }
  if (t > 1 - ZOOM_PHASE) {
    return blend(
      mid,
      STAY_FRAMES[stopIndex + 1],
      EASE_IN_OUT((t - 1 + ZOOM_PHASE) / ZOOM_PHASE),
    );
  }
  return mid;
};

// The label sits on the side the comet does not come from
const SIDES = STOPS.map((stop, i) => {
  const arc = ARCS[i - 1] ?? ARCS[i];
  const from = i > 0 ? arc.c[0] - arc.b[0] : arc.c[0] - arc.a[0];
  return from > 0 ? "left" : "right";
});

const Label = ({ x, y, text, side }) => (
  <text
    x={x + (side === "left" ? -13 : 13)}
    y={y + 5}
    textAnchor={side === "left" ? "end" : "start"}
    fontSize="15"
    fontWeight="600"
    fill={INK}
    stroke={SURFACE}
    strokeWidth="4"
    strokeLinejoin="round"
    paintOrder="stroke"
  >
    {text}
  </text>
);

// What is on the map at progress p: up to two cities and one comet
const sceneAt = (state) => {
  const { phase, stopIndex: i, t } = state;
  if (phase === "stay") {
    const retract = EASE_IN_OUT(clamp01(t / RETRACT));
    return {
      cities: [{ index: i, show: 1, halo: 1 }],
      comet:
        i > 0
          ? { arc: ARCS[i - 1], start: lerp(1 - TAIL, 1, retract), head: 1 }
          : null,
      plane: 0,
    };
  }
  const head = sine(t);
  const leave = ramp(t, 0, 0.3);
  return {
    cities: [
      { index: i, show: 1 - leave, halo: 1 - leave },
      { index: i + 1, show: leave, halo: ramp(t, 0.6, 1) },
    ],
    comet: { arc: ARCS[i], start: Math.max(0, head - TAIL), head },
    plane: ramp(t, 0, 0.08) * (1 - ramp(t, 0.88, 1)),
  };
};

export default function JourneyMap({ progress }) {
  const canvasRef = useRef(null);
  const [size, setSize] = useState(0);
  const [theme, setTheme] = useState(0);

  const state = journeyAt(progress);
  const cam = cameraAt(state);
  const scene = sceneAt(state);

  useEffect(() => {
    const canvas = canvasRef.current;
    const observer = new ResizeObserver(() =>
      setSize(canvas.clientWidth * (window.devicePixelRatio || 1)),
    );
    observer.observe(canvas);
    const bump = () => setTheme((n) => n + 1);
    const watcher = new MutationObserver(bump);
    watcher.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme", "style"],
    });
    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    scheme.addEventListener("change", bump);
    return () => {
      observer.disconnect();
      watcher.disconnect();
      scheme.removeEventListener("change", bump);
    };
  }, []);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const width = Math.round(size);
    if (!width) return;
    if (canvas.width !== width) {
      canvas.width = width;
      canvas.height = Math.round((width * H) / W);
    }
    drawLand(canvas, cam, getComputedStyle(canvas).color);
  }, [cam.x, cam.y, cam.k, size, theme]);

  const at = ([x, y]) => [
    (x - cam.x) * cam.k + W / 2,
    (y - cam.y) * cam.k + H / 2,
  ];
  const fmt = ([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`;

  let comet = null;
  let plane = null;
  if (scene.comet) {
    const { arc, start, head } = scene.comet;
    const a = at(arc.a);
    const b = at(arc.b);
    const c = at(arc.c);
    const [p0, pc, p1] = quadSlice(a, c, b, start, head);
    if (Math.hypot(p1[0] - p0[0], p1[1] - p0[1]) > 1) {
      comet = { d: `M${fmt(p0)}Q${fmt(pc)} ${fmt(p1)}`, p0, p1 };
    }
    if (scene.plane > 0) {
      const dx = 2 * (1 - head) * (c[0] - a[0]) + 2 * head * (b[0] - c[0]);
      const dy = 2 * (1 - head) * (c[1] - a[1]) + 2 * head * (b[1] - c[1]);
      plane = {
        x: p1[0],
        y: p1[1],
        angle: (Math.atan2(dy, dx) * 180) / Math.PI + 90,
      };
    }
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full text-[var(--ink,#fff)]"
        aria-hidden="true"
      />
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="journey-halo">
            <stop offset="0" stopColor={ACCENT} stopOpacity="0.4" />
            <stop offset="1" stopColor={ACCENT} stopOpacity="0" />
          </radialGradient>
          {comet && (
            <linearGradient
              id="journey-tail"
              gradientUnits="userSpaceOnUse"
              x1={comet.p0[0]}
              y1={comet.p0[1]}
              x2={comet.p1[0]}
              y2={comet.p1[1]}
            >
              <stop offset="0" stopColor={ACCENT} stopOpacity="0" />
              <stop offset="1" stopColor={ACCENT} stopOpacity="1" />
            </linearGradient>
          )}
        </defs>

        {comet && (
          <g fill="none" strokeLinecap="round" stroke="url(#journey-tail)">
            <path d={comet.d} strokeWidth="8" opacity="0.2" />
            <path d={comet.d} strokeWidth="2.25" />
          </g>
        )}

        {scene.cities.map(({ index, show, halo }) => {
          if (show <= 0) return null;
          const [x, y] = at(POS[STOPS[index].place]);
          return (
            <g key={index} opacity={show}>
              <circle
                cx={x}
                cy={y}
                r="26"
                fill="url(#journey-halo)"
                opacity={halo}
              />
              <circle cx={x} cy={y} r="4.5" fill={INK} />
              <Label
                x={x}
                y={y}
                text={PLACES[STOPS[index].place].city}
                side={SIDES[index]}
              />
            </g>
          );
        })}

        {plane && (
          <g
            transform={`translate(${plane.x} ${plane.y}) rotate(${plane.angle})`}
            opacity={scene.plane}
          >
            <circle r="11" fill={ACCENT} opacity="0.25" />
            <path
              d={PLANE_D}
              transform="translate(-13.2 -13.2) scale(1.1)"
              fill={INK}
              stroke={SURFACE}
              strokeWidth="1.2"
              strokeLinejoin="round"
              paintOrder="stroke"
            />
          </g>
        )}
      </svg>
    </>
  );
}
