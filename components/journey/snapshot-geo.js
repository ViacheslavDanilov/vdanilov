import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import world from "world-atlas/land-110m.json";
import { PLACES, REMOTE, STOPS } from "@/lib/journey";

export const W = 360;
export const H = 270;
const PAD = 22;

export const KEYS = [...new Set(STOPS.map((stop) => stop.place))];
export const REMOTE_KEYS = [...new Set(REMOTE.map((role) => role.place))];

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

// Land outline for the phone map, served as its own file so the page does not carry it
export const landPath = () =>
  geoPath(projection).digits(1)(feature(world, world.objects.land));

export const POS = Object.fromEntries(
  [...KEYS, ...REMOTE_KEYS].map((key) => [
    key,
    projection([PLACES[key].lon, PLACES[key].lat]),
  ]),
);
