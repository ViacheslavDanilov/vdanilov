export const PLACES = {
  tomsk: {
    city: "Tomsk",
    country: "Russia",
    flag: "🇷🇺",
    lat: 56.4977,
    lon: 84.9744,
  },
  lisbon: {
    city: "Lisbon",
    country: "Portugal",
    flag: "🇵🇹",
    lat: 38.7223,
    lon: -9.1393,
  },
  antalya: {
    city: "Antalya",
    country: "Turkey",
    flag: "🇹🇷",
    lat: 36.8969,
    lon: 30.7133,
  },
  trento: {
    city: "Trento",
    country: "Italy",
    flag: "🇮🇹",
    lat: 46.0748,
    lon: 11.1217,
  },
  madrid: {
    city: "Madrid",
    country: "Spain",
    flag: "🇪🇸",
    lat: 40.4168,
    lon: -3.7038,
  },
  leeds: {
    city: "Leeds",
    country: "United Kingdom",
    flag: "🇬🇧",
    lat: 53.8008,
    lon: -1.5491,
  },
  milan: {
    city: "Milan",
    country: "Italy",
    flag: "🇮🇹",
    lat: 45.4642,
    lon: 9.19,
  },
  barcelona: {
    city: "Barcelona",
    country: "Spain",
    flag: "🇪🇸",
    lat: 41.3874,
    lon: 2.1686,
  },
  paris: {
    city: "Paris",
    country: "France",
    flag: "🇫🇷",
    lat: 48.8566,
    lon: 2.3522,
  },
  groningen: {
    city: "Groningen",
    country: "Netherlands",
    flag: "🇳🇱",
    lat: 53.2194,
    lon: 6.5665,
  },
  rome: {
    city: "Rome",
    country: "Italy",
    flag: "🇮🇹",
    lat: 41.9028,
    lon: 12.4964,
  },
  pretoria: {
    city: "Pretoria",
    country: "South Africa",
    flag: "🇿🇦",
    lat: -25.7479,
    lon: 28.2293,
  },
  montreal: {
    city: "Montreal",
    country: "Canada",
    flag: "🇨🇦",
    lat: 45.5017,
    lon: -73.5673,
  },
  cambridge: {
    city: "Cambridge",
    country: "United States",
    flag: "🇺🇸",
    lat: 42.3736,
    lon: -71.1097,
  },
  miami: {
    city: "Miami",
    country: "United States",
    flag: "🇺🇸",
    lat: 25.7617,
    lon: -80.1918,
  },
};

export const JOURNEY_END = "2026-11-13";

// Tomsk roles by date, from least to most senior; a stay there shows the last one it overlaps
const TPU = "Tomsk Polytechnic University";
const TOMSK_ROLES = [
  { from: "2007-09-01", to: "2011-09-01", role: "BSc in Robotics", org: TPU },
  {
    from: "2011-09-01",
    to: "2013-09-01",
    role: "MSc in Business Management",
    org: "Tomsk State University",
  },
  {
    from: "2011-09-01",
    to: "2013-09-01",
    role: "MSc in Computer Engineering",
    org: TPU,
  },
  {
    from: "2015-05-01",
    to: "2017-05-01",
    role: "Process Control Engineer",
    org: "SIBUR",
  },
  {
    from: "2015-09-01",
    to: "2020-09-01",
    role: "PhD Student in Computer Science",
    org: TPU,
  },
  {
    from: "2016-03-01",
    to: "2022-08-01",
    role: "Senior Research Scientist",
    org: TPU,
  },
];

export const STOPS = [
  {
    place: "tomsk",
    kind: "home",
    from: "2007-09-01",
    to: "2013-01-01",
    roles: TOMSK_ROLES,
  },
  {
    place: "lisbon",
    kind: "visit",
    from: "2013-01-01",
    to: "2013-08-01",
    role: "MSc Student in Robotics",
    org: "University of Lisbon",
  },
  {
    place: "tomsk",
    kind: "home",
    from: "2013-08-01",
    to: "2017-03-01",
    roles: TOMSK_ROLES,
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
    roles: TOMSK_ROLES,
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
    to: "2022-03-01",
    roles: TOMSK_ROLES,
  },
  {
    place: "antalya",
    kind: "home",
    from: "2022-03-01",
    to: "2022-04-01",
    role: "Senior Research Scientist",
    org: "Tomsk Polytechnic University",
  },
  {
    place: "trento",
    kind: "visit",
    from: "2022-04-01",
    to: "2022-07-01",
    role: "Visiting Research Scientist",
    org: "University of Trento",
  },
  {
    place: "antalya",
    kind: "home",
    from: "2022-07-01",
    to: "2022-07-20",
    role: "Senior Research Scientist",
    org: "Politecnico di Milano",
  },
  {
    place: "milan",
    kind: "home",
    from: "2022-07-20",
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
}));

const DWELL = { home: 1.6, visit: 0.9 };
const FLIGHT = 1.2;
const REVEAL = 1.4;
const OUTRO = 2.4;

// A remote role that starts mid-stay splits the stay, so its start gets its own beat
const SEGMENTS = (() => {
  const segments = [];
  let at = 0;
  STOPS.forEach((stop, i) => {
    const fromMs = toMs(stop.from);
    const toMsEnd = toMs(stop.to);
    const cuts = REMOTE.filter(
      (r) => toMs(r.from) > fromMs && toMs(r.from) < toMsEnd,
    ).sort((a, b) => toMs(a.from) - toMs(b.from));
    let pieceFrom = fromMs;
    let reveal = null;
    [...cuts, null].forEach((cut) => {
      const pieceTo = cut ? toMs(cut.from) : toMsEnd;
      const dwell = reveal ? REVEAL : DWELL[stop.kind];
      segments.push({
        type: "stay",
        index: i,
        fromMs: pieceFrom,
        toMs: pieceTo,
        reveal,
        start: at,
        end: at + dwell,
      });
      at += dwell;
      pieceFrom = pieceTo;
      reveal = cut;
    });
    if (i < LEGS.length) {
      segments.push({ type: "fly", index: i, start: at, end: at + FLIGHT });
      at += FLIGHT;
    }
  });
  segments.push({
    type: "outro",
    index: STOPS.length - 1,
    start: at,
    end: at + OUTRO,
  });
  at += OUTRO;
  return segments.map((s) => ({ ...s, start: s.start / at, end: s.end / at }));
})();

const lerp = (a, b, t) => a + (b - a) * t;

/**
 * State of the journey at story progress p (0 to 1).
 * phase is "stay", "fly" or "outro", and t runs from 0 to 1 inside the current phase.
 * reveal is the remote role whose start this stretch shows, if any.
 * @returns {{ dateMs: number, stopIndex: number, phase: string, t: number, remote: object[], reveal: object | null }}
 */
export function journeyAt(p) {
  const clamped = Math.min(1, Math.max(0, p));
  const segment =
    SEGMENTS.find((s) => clamped <= s.end) ?? SEGMENTS[SEGMENTS.length - 1];
  const t = (clamped - segment.start) / (segment.end - segment.start);

  let dateMs;
  let stopIndex;

  if (segment.type === "stay") {
    dateMs = lerp(segment.fromMs, segment.toMs, t);
    stopIndex = segment.index;
  } else if (segment.type === "outro") {
    dateMs = JOURNEY_END_MS;
    stopIndex = segment.index;
  } else {
    const leg = LEGS[segment.index];
    dateMs = lerp(leg.departMs, leg.arriveMs, t);
    stopIndex = segment.index;
  }

  const remote = REMOTE.filter(
    (r) => dateMs >= toMs(r.from) && dateMs < toMs(r.to),
  );

  return {
    dateMs,
    stopIndex,
    phase: segment.type,
    t,
    remote,
    reveal: segment.reveal ?? null,
  };
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

// Story progress where each remote role is revealed and where it ends
export const REMOTE_SPANS = REMOTE.map((role) => {
  const piece = SEGMENTS.find((s) => s.reveal === role);
  return {
    role,
    revealStart: piece.start,
    revealEnd: piece.end,
    end: progressOfDate(toMs(role.to)),
  };
});

export const OUTRO_START = SEGMENTS[SEGMENTS.length - 1].start;

// Where each stop's stay begins, for chapter marks and jumps
export const STOP_STARTS = STOPS.map(
  (_, i) => SEGMENTS.find((s) => s.type === "stay" && s.index === i).start,
);

const isUniversity = (name) => /Universit|Politecnico/.test(name);

// The role a stop shows for its whole stay: the most senior dated role it overlaps, or its own
export const roleOf = (stop) =>
  stop.roles
    ? stop.roles.findLast(
        (role) =>
          toMs(role.from) < toMs(stop.to) && toMs(stop.from) < toMs(role.to),
      )
    : { role: stop.role, org: stop.org };

const rolesStartedBy = (stop, dateMs) =>
  stop.roles
    ? stop.roles.filter((role) => toMs(role.from) <= dateMs)
    : [{ role: stop.role, org: stop.org }];

// Places, countries and universities reached by this point, and remote teams joined
export const countsAt = ({ stopIndex, dateMs }) => {
  const reached = STOPS.slice(0, stopIndex + 1);
  const unique = (list) => new Set(list).size;
  return {
    countries: unique(reached.map((stop) => PLACES[stop.place].country)),
    cities: unique(reached.map((stop) => stop.place)),
    universities: unique(
      reached
        .flatMap((stop) => rolesStartedBy(stop, dateMs))
        .map((role) => role.org)
        .filter(isUniversity),
    ),
    remote: REMOTE.filter((role) => toMs(role.from) <= dateMs).length,
  };
};

export const TOTALS = countsAt(journeyAt(1));

const MONTHS = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ");

export const formatMonth = (ms) => {
  const date = new Date(ms);
  return `${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
};

export const stopPeriod = (stop) => {
  const from = formatMonth(toMs(stop.from));
  const to = stop.to === JOURNEY_END ? "Present" : formatMonth(toMs(stop.to));
  return from === to ? from : `${from} – ${to}`;
};
