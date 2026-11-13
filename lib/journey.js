// Temporary prototype data; to be merged into ExperienceClient.jsx if the journey stays.

export const PLACES = {
  tomsk: { city: "Tomsk", country: "Russia", lat: 56.4977, lon: 84.9744 },
  trento: { city: "Trento", country: "Italy", lat: 46.0748, lon: 11.1217 },
  madrid: { city: "Madrid", country: "Spain", lat: 40.4168, lon: -3.7038 },
  leeds: {
    city: "Leeds",
    country: "United Kingdom",
    lat: 53.8008,
    lon: -1.5491,
  },
  milan: { city: "Milan", country: "Italy", lat: 45.4642, lon: 9.19 },
  barcelona: { city: "Barcelona", country: "Spain", lat: 41.3874, lon: 2.1686 },
  paris: { city: "Paris", country: "France", lat: 48.8566, lon: 2.3522 },
  groningen: {
    city: "Groningen",
    country: "Netherlands",
    lat: 53.2194,
    lon: 6.5665,
  },
  rome: { city: "Rome", country: "Italy", lat: 41.9028, lon: 12.4964 },
  pretoria: {
    city: "Pretoria",
    country: "South Africa",
    lat: -25.7479,
    lon: 28.2293,
  },
  montreal: {
    city: "Montreal",
    country: "Canada",
    lat: 45.5017,
    lon: -73.5673,
  },
  cambridge: {
    city: "Cambridge",
    country: "United States",
    lat: 42.3736,
    lon: -71.1097,
  },
  miami: {
    city: "Miami",
    country: "United States",
    lat: 25.7617,
    lon: -80.1918,
  },
};

export const JOURNEY_END = "2026-11-13";

export const STOPS = [
  {
    place: "tomsk",
    kind: "home",
    from: "2015-05-01",
    to: "2017-03-01",
    role: "Process Control Engineer, PhD researcher",
    org: "SIBUR, Tomsk Polytechnic University",
  },
  {
    place: "trento",
    kind: "visit",
    from: "2017-03-01",
    to: "2017-08-01",
    role: "Visiting Research Scientist",
    org: "University of Trento",
  },
  {
    place: "tomsk",
    kind: "home",
    from: "2017-08-01",
    to: "2018-08-01",
    role: "Research Scientist",
    org: "Tomsk Polytechnic University",
  },
  {
    place: "madrid",
    kind: "visit",
    from: "2018-08-01",
    to: "2019-01-01",
    role: "Visiting Research Scientist",
    org: "Technical University of Madrid",
  },
  {
    place: "leeds",
    kind: "visit",
    from: "2019-01-01",
    to: "2019-08-01",
    role: "Visiting Research Scientist",
    org: "University of Leeds",
  },
  {
    place: "tomsk",
    kind: "home",
    from: "2019-08-01",
    to: "2022-05-01",
    role: "Senior Research Scientist",
    org: "Tomsk Polytechnic University",
  },
  {
    place: "milan",
    kind: "home",
    from: "2022-05-01",
    to: "2023-06-01",
    role: "Senior Research Scientist",
    org: "Politecnico di Milano",
  },
  {
    place: "barcelona",
    kind: "home",
    from: "2023-06-01",
    to: "2025-03-01",
    role: "Senior Research Scientist",
    org: "Pompeu Fabra University",
  },
  {
    place: "paris",
    kind: "visit",
    from: "2025-03-01",
    to: "2025-04-01",
    role: "Visiting Professor",
    org: "Sorbonne University",
  },
  {
    place: "barcelona",
    kind: "home",
    from: "2025-04-01",
    to: "2026-04-13",
    role: "Senior Research Scientist",
    org: "Pompeu Fabra University",
  },
  {
    place: "groningen",
    kind: "visit",
    from: "2026-04-13",
    to: "2026-04-17",
    role: "Visiting Professor",
    org: "University of Groningen",
  },
  {
    place: "barcelona",
    kind: "home",
    from: "2026-04-17",
    to: "2026-05-11",
    role: "Senior Research Scientist",
    org: "Pompeu Fabra University",
  },
  {
    place: "rome",
    kind: "visit",
    from: "2026-05-11",
    to: "2026-05-15",
    role: "Visiting Professor",
    org: "Sapienza University of Rome",
  },
  {
    place: "barcelona",
    kind: "home",
    from: "2026-05-15",
    to: "2026-09-01",
    role: "Senior Research Scientist",
    org: "Pompeu Fabra University",
  },
  {
    place: "pretoria",
    kind: "visit",
    from: "2026-09-01",
    to: "2026-10-01",
    role: "Visiting Professor",
    org: "University of Pretoria",
  },
  {
    place: "barcelona",
    kind: "home",
    from: "2026-10-01",
    to: JOURNEY_END,
    role: "Senior Research Scientist",
    org: "Pompeu Fabra University",
  },
];

export const REMOTE = [
  {
    place: "montreal",
    from: "2020-04-01",
    to: "2022-09-01",
    role: "Senior Machine Learning Engineer",
    org: "Intelerad Medical Systems",
  },
  {
    place: "cambridge",
    from: "2020-11-01",
    to: "2025-11-01",
    role: "Lead Machine Learning Engineer",
    org: "Quantori",
  },
  {
    place: "miami",
    from: "2024-11-01",
    to: "2026-11-01",
    role: "Chief Technology Officer",
    org: "Symfa",
  },
];

export const toMs = (iso) => Date.parse(`${iso}T00:00:00Z`);

export const JOURNEY_START_MS = toMs(STOPS[0].from);
export const JOURNEY_END_MS = toMs(JOURNEY_END);

export const LEGS = STOPS.slice(1).map((stop, i) => ({
  from: STOPS[i].place,
  to: stop.place,
  departMs: toMs(STOPS[i].to),
  arriveMs: toMs(stop.from),
  stopIndex: i + 1,
}));

const DWELL = { home: 1.6, visit: 0.9 };
const FLIGHT = 1.2;

const SEGMENTS = (() => {
  const segments = [];
  let at = 0;
  STOPS.forEach((stop, i) => {
    const dwell = DWELL[stop.kind];
    segments.push({ type: "stay", index: i, start: at, end: at + dwell });
    at += dwell;
    if (i < LEGS.length) {
      segments.push({ type: "fly", index: i, start: at, end: at + FLIGHT });
      at += FLIGHT;
    }
  });
  return segments.map((s) => ({ ...s, start: s.start / at, end: s.end / at }));
})();

const lerp = (a, b, t) => a + (b - a) * t;

/**
 * State of the journey at story progress p (0 to 1).
 * phase is "stay" or "fly", and t runs from 0 to 1 inside the current phase.
 * @returns {{ dateMs: number, stopIndex: number, phase: string, t: number, leg: object|null, legT: number, remote: object[] }}
 */
export function journeyAt(p) {
  const clamped = Math.min(1, Math.max(0, p));
  const segment =
    SEGMENTS.find((s) => clamped <= s.end) ?? SEGMENTS[SEGMENTS.length - 1];
  const t = (clamped - segment.start) / (segment.end - segment.start);

  let dateMs;
  let stopIndex;
  let leg = null;
  let legT = 0;

  if (segment.type === "stay") {
    const stop = STOPS[segment.index];
    dateMs = lerp(toMs(stop.from), toMs(stop.to), t);
    stopIndex = segment.index;
  } else {
    leg = LEGS[segment.index];
    legT = t;
    dateMs = lerp(leg.departMs, leg.arriveMs, t);
    stopIndex = segment.index;
  }

  const remote = REMOTE.filter(
    (r) => dateMs >= toMs(r.from) && dateMs < toMs(r.to),
  );

  return { dateMs, stopIndex, phase: segment.type, t, leg, legT, remote };
}

export const progressOfDate = (ms) => {
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 30; i++) {
    const mid = (lo + hi) / 2;
    if (journeyAt(mid).dateMs < ms) lo = mid;
    else hi = mid;
  }
  return hi;
};

export const progressOfStop = (index) =>
  SEGMENTS.find((s) => s.type === "stay" && s.index === index).start;

const MONTHS = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ");

export const formatMonth = (ms) => {
  const date = new Date(ms);
  return `${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
};

export const stopPeriod = (stop) =>
  `${formatMonth(toMs(stop.from))} – ${stop.to === JOURNEY_END ? "Present" : formatMonth(toMs(stop.to))}`;

export const yearOf = (ms) => new Date(ms).getUTCFullYear();
