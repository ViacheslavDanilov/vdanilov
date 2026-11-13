"use client";

import { memo, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  AdditiveBlending,
  BufferGeometry,
  Color,
  ExtrudeGeometry,
  Float32BufferAttribute,
  Matrix4,
  Quaternion,
  Shape,
  ShaderMaterial,
  Vector2,
  Vector3,
} from "three";
import { Line2 } from "three/addons/lines/Line2.js";
import { LineGeometry } from "three/addons/lines/LineGeometry.js";
import { LineMaterial } from "three/addons/lines/LineMaterial.js";
import { feature, mesh } from "topojson-client";
import world from "world-atlas/countries-110m.json";
import { LEGS, PLACES, REMOTE, STOPS, journeyAt } from "@/lib/journey";

const ACCENT = "#03b1fb";
const BACKGROUND = "#0a0e14";
const D2R = Math.PI / 180;
const CAMERA_Z = 4;
const CAMERA_FOV = 35;
const ARC_STEPS = 128;
const EUROPE = { lat: 36, lon: -5 };
const DRAG_HOLD_S = 1.5;

const CAMERA = {
  position: [0, 0, CAMERA_Z],
  fov: CAMERA_FOV,
  near: 0.1,
  far: 20,
};
const GL = { antialias: true };

const PLACE_KEYS = Object.keys(PLACES);
const toMs = (iso) => Date.parse(`${iso}T00:00:00Z`);
const firstStop = (key) => {
  const index = STOPS.findIndex((s) => s.place === key);
  return index < 0 ? Infinity : index;
};
const FIRST_STOP = Object.fromEntries(
  PLACE_KEYS.map((key) => [key, firstStop(key)]),
);
const REMOTE_FROM = Object.fromEntries(
  REMOTE.map((r) => [r.place, toMs(r.from)]),
);

const toVec = (lat, lon, r = 1) => {
  const cosLat = Math.cos(lat * D2R);
  return new Vector3(
    cosLat * Math.sin(lon * D2R) * r,
    Math.sin(lat * D2R) * r,
    cosLat * Math.cos(lon * D2R) * r,
  );
};

const PLACE_VEC = Object.fromEntries(
  PLACE_KEYS.map((key) => [key, toVec(PLACES[key].lat, PLACES[key].lon)]),
);

const ARCS = LEGS.map((leg) => {
  const a = PLACE_VEC[leg.from];
  const b = PLACE_VEC[leg.to];
  const angle = a.angleTo(b);
  return {
    a,
    b,
    angle,
    normal: a.clone().cross(b).normalize(),
    lift: 0.04 + 0.26 * (angle / Math.PI),
    bow: 0.015 + 0.05 * angle,
  };
});

// Great circle lifted and bowed right of travel, so a return leg does not cover its outbound one
function arcPoint(arc, t, out, lifted = true) {
  const { a, b, angle, normal } = arc;
  const bump = Math.sin(Math.PI * t);
  out
    .set(0, 0, 0)
    .addScaledVector(a, Math.sin((1 - t) * angle) / Math.sin(angle))
    .addScaledVector(b, Math.sin(t * angle) / Math.sin(angle));
  if (!lifted) return out.normalize();
  out.addScaledVector(normal, -arc.bow * bump).normalize();
  return out.multiplyScalar(1.004 + arc.lift * bump);
}

function buildArc(arc) {
  const positions = [];
  const point = new Vector3();
  for (let i = 0; i <= ARC_STEPS; i++) {
    arcPoint(arc, i / ARC_STEPS, point);
    positions.push(point.x, point.y, point.z);
  }
  const geometry = new LineGeometry();
  geometry.setPositions(positions);
  const material = new LineMaterial({
    color: ACCENT,
    linewidth: 1.5,
    transparent: true,
    depthWrite: false,
  });
  return new Line2(geometry, material);
}

function buildLand() {
  const width = 1440;
  const height = 720;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  for (const { geometry } of feature(world, world.objects.land).features) {
    const polygons =
      geometry.type === "Polygon"
        ? [geometry.coordinates]
        : geometry.coordinates;
    for (const polygon of polygons) {
      for (const ring of polygon) {
        let previous = ring[0][0];
        const points = ring.map(([lon, lat]) => {
          while (lon - previous > 180) lon -= 360;
          while (lon - previous < -180) lon += 360;
          previous = lon;
          return [((lon + 180) / 360) * width, ((90 - lat) / 180) * height];
        });
        for (const shift of [-width, 0, width]) {
          points.forEach(([x, y], i) => {
            if (i === 0) ctx.moveTo(x + shift, y);
            else ctx.lineTo(x + shift, y);
          });
          ctx.closePath();
        }
      }
    }
  }
  ctx.fill("evenodd");
  const pixels = ctx.getImageData(0, 0, width, height).data;
  const isLand = (lat, lon) => {
    const x = Math.min(width - 1, Math.floor(((lon + 180) / 360) * width));
    const y = Math.min(height - 1, Math.floor(((90 - lat) / 180) * height));
    return pixels[(y * width + x) * 4 + 3] > 127;
  };

  const total = 30000;
  const dots = [];
  for (let i = 0; i < total; i++) {
    const lat = Math.asin(1 - (2 * (i + 0.5)) / total) / D2R;
    const lon = ((i * 137.50776405) % 360) - 180;
    if (!isLand(lat, lon)) continue;
    const v = toVec(lat, lon, 1.001);
    dots.push(v.x, v.y, v.z);
  }

  const borders = [];
  for (const line of mesh(world, world.objects.countries).coordinates) {
    for (let i = 1; i < line.length; i++) {
      const [lonA, latA] = line[i - 1];
      const [lonB, latB] = line[i];
      const onEdge =
        (Math.abs(lonA) > 179.99 && Math.abs(lonB) > 179.99) ||
        (latA < -89.9 && latB < -89.9);
      if (onEdge || Math.abs(lonB - lonA) > 180) continue;
      const pieces = Math.ceil(
        Math.max(Math.abs(lonB - lonA), Math.abs(latB - latA)) / 2,
      );
      for (let k = 0; k < pieces; k++) {
        for (const f of [k / pieces, (k + 1) / pieces]) {
          const v = toVec(
            latA + (latB - latA) * f,
            lonA + (lonB - lonA) * f,
            1.001,
          );
          borders.push(v.x, v.y, v.z);
        }
      }
    }
  }

  const toGeometry = (array) =>
    new BufferGeometry().setAttribute(
      "position",
      new Float32BufferAttribute(array, 3),
    );
  return { dots: toGeometry(dots), borders: toGeometry(borders) };
}

function buildPlane() {
  const half = [
    [0, 1],
    [0.1, 0.8],
    [0.12, 0.3],
    [0.95, -0.2],
    [0.95, -0.38],
    [0.12, -0.12],
    [0.1, -0.62],
    [0.42, -0.88],
    [0.42, -1],
    [0, -0.9],
  ];
  const outline = [
    ...half,
    ...half
      .slice(1, -1)
      .reverse()
      .map(([x, y]) => [-x, y]),
  ];
  const shape = new Shape(outline.map(([x, y]) => new Vector2(x, y)));
  const geometry = new ExtrudeGeometry(shape, {
    depth: 0.12,
    bevelEnabled: false,
  });
  geometry.translate(0, 0, -0.06);
  geometry.scale(0.05, 0.05, 0.05);
  return geometry;
}

const limbMaterial = ({ color, opacity, size = 0 }) =>
  new ShaderMaterial({
    transparent: true,
    depthWrite: false,
    defines: size ? { POINTS: "" } : {},
    uniforms: {
      uColor: { value: new Color(color) },
      uOpacity: { value: opacity },
      uSize: { value: size },
      uScale: { value: 1 },
    },
    vertexShader: /* glsl */ `
      uniform float uSize;
      uniform float uScale;
      varying float vFacing;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vFacing = normalize(normalMatrix * position).z;
        gl_PointSize = uSize * uScale / -mv.z;
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      uniform float uOpacity;
      varying float vFacing;
      void main() {
        float a = uOpacity * smoothstep(0.3, 0.65, vFacing);
        #ifdef POINTS
          a *= 1.0 - smoothstep(0.36, 0.5, length(gl_PointCoord - 0.5));
        #endif
        if (a < 0.01) discard;
        gl_FragColor = vec4(uColor, a);
        #include <colorspace_fragment>
      }
    `,
  });

const SPHERE_VERTEX = /* glsl */ `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const SPHERE_FRAGMENT = /* glsl */ `
  uniform vec3 uBase;
  uniform vec3 uRim;
  varying vec3 vNormal;
  void main() {
    float rim = pow(1.0 - clamp(vNormal.z, 0.0, 1.0), 2.5);
    float light = clamp(dot(vNormal, normalize(vec3(-0.4, 0.6, 0.7))), 0.0, 1.0);
    vec3 color = uBase * (0.7 + 0.6 * light) + uRim * rim * 0.45;
    gl_FragColor = vec4(color, 1.0);
    #include <colorspace_fragment>
  }
`;

const GLOW_FRAGMENT = /* glsl */ `
  uniform vec3 uColor;
  uniform float uLimb;
  varying vec2 vUv;
  void main() {
    float u = length((vUv - 0.5) * 2.0) / uLimb;
    float a = u < 1.0 ? 0.0 : 0.5 * exp(-(u - 1.0) * 8.0) * (1.0 - smoothstep(1.2, 1.38, u));
    gl_FragColor = vec4(uColor, a);
    #include <colorspace_fragment>
  }
`;

const GLOW_VERTEX = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const GLOW_HALF = 1.45;
const GLOW_LIMB = 1 / Math.sqrt(1 - 1 / CAMERA_Z ** 2) / GLOW_HALF;

const ease = (value, target, rate, dt) =>
  value + (target - value) * (1 - Math.exp(-rate * dt));

const Scene = memo(function Scene({ progressRef, reduced }) {
  const { gl, camera, size, invalidate } = useThree();
  const globe = useRef(null);
  const plane = useRef(null);
  const halo = useRef(null);
  const dotRefs = useRef([]);
  const ringRefs = useRef([]);
  const state = useRef({
    focus: new Vector3(),
    ready: false,
    dotScale: new Float32Array(PLACE_KEYS.length),
    presence: new Float32Array(REMOTE.length),
    drag: { lat: 0, lon: 0, down: false, last: null, releasedAt: 0 },
  }).current;

  const land = useMemo(buildLand, []);
  const arcs = useMemo(() => ARCS.map(buildArc), []);
  const planeGeometry = useMemo(buildPlane, []);
  const dotMaterial = useMemo(
    () => limbMaterial({ color: "#5b7089", opacity: 0.95, size: 0.0105 }),
    [],
  );
  const borderMaterial = useMemo(
    () => limbMaterial({ color: ACCENT, opacity: 0.16 }),
    [],
  );
  const ringTilts = useMemo(
    () =>
      REMOTE.map((r) =>
        new Quaternion().setFromUnitVectors(
          new Vector3(0, 0, 1),
          PLACE_VEC[r.place].clone().normalize(),
        ),
      ),
    [],
  );
  const scratch = useMemo(
    () => ({
      point: new Vector3(),
      next: new Vector3(),
      right: new Vector3(),
      up: new Vector3(),
      matrix: new Matrix4(),
      target: new Vector3(),
    }),
    [],
  );

  useEffect(() => {
    camera.setViewOffset(
      size.width,
      size.height,
      -size.width * 0.06,
      0,
      size.width,
      size.height,
    );
  }, [camera, size.width, size.height]);

  useEffect(() => {
    arcs.forEach((line) =>
      line.material.resolution.set(size.width, size.height),
    );
  }, [arcs, size.width, size.height]);

  useEffect(() => {
    const el = gl.domElement;
    const { drag } = state;
    el.style.cursor = "grab";
    el.style.touchAction = "pan-y";
    const down = (event) => {
      drag.down = true;
      drag.last = [event.clientX, event.clientY];
      el.setPointerCapture(event.pointerId);
      el.style.cursor = "grabbing";
    };
    const move = (event) => {
      if (!drag.down) return;
      const dx = event.clientX - drag.last[0];
      const dy = event.clientY - drag.last[1];
      drag.last = [event.clientX, event.clientY];
      drag.lon -= dx * 0.004;
      drag.lat = Math.max(-1, Math.min(1, drag.lat + dy * 0.004));
      invalidate();
    };
    const up = () => {
      drag.down = false;
      drag.releasedAt = performance.now();
      el.style.cursor = "grab";
    };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
  }, [gl, invalidate, state]);

  useEffect(
    () => () => {
      land.dots.dispose();
      land.borders.dispose();
      arcs.forEach((line) => {
        line.geometry.dispose();
        line.material.dispose();
      });
      planeGeometry.dispose();
      dotMaterial.dispose();
      borderMaterial.dispose();
    },
    [land, arcs, planeGeometry, dotMaterial, borderMaterial],
  );

  useFrame(({ clock, camera }, delta) => {
    const dt = Math.min(delta, 0.05);
    const journey = journeyAt(reduced ? 1 : progressRef.current);
    const { drag, focus } = state;
    const { point, next, right, up, matrix, target } = scratch;
    const inFlight = journey.leg !== null && !reduced;
    const stop = STOPS[journey.stopIndex];

    if (reduced) target.copy(toVec(EUROPE.lat, EUROPE.lon));
    else if (inFlight)
      arcPoint(ARCS[journey.stopIndex], journey.legT, target, false);
    else target.copy(PLACE_VEC[stop.place]);

    if (!state.ready || reduced) {
      focus.copy(target);
      state.ready = true;
    } else {
      focus.lerp(target, 1 - Math.exp(-3.5 * dt)).normalize();
    }

    if (
      !reduced &&
      !drag.down &&
      performance.now() - drag.releasedAt > DRAG_HOLD_S * 1000
    ) {
      drag.lon = ease(drag.lon, 0, 2.2, dt);
      drag.lat = ease(drag.lat, 0, 2.2, dt);
    }
    const lat = Math.max(-1.3, Math.min(1.3, Math.asin(focus.y) + drag.lat));
    const lon = Math.atan2(focus.x, focus.z) + drag.lon;
    globe.current.rotation.set(lat, -lon, 0);

    dotMaterial.uniforms.uScale.value =
      (size.height * gl.getPixelRatio()) /
      (2 * Math.tan((camera.fov * D2R) / 2));

    PLACE_KEYS.forEach((key, i) => {
      const reached =
        FIRST_STOP[key] <= journey.stopIndex ||
        (REMOTE_FROM[key] ?? Infinity) <= journey.dateMs;
      const current = !inFlight && !reduced && stop.place === key;
      const goal = reached ? (current ? 1.7 : 1) : 0;
      state.dotScale[i] = reduced
        ? goal
        : ease(state.dotScale[i], goal, 14, dt);
      const dot = dotRefs.current[i];
      dot.visible = state.dotScale[i] > 0.01;
      dot.scale.setScalar(state.dotScale[i]);
      dot.material.color.set(current ? ACCENT : "#e2f1ff");
    });

    halo.current.visible = !inFlight && !reduced;
    if (halo.current.visible) {
      halo.current.position.copy(PLACE_VEC[stop.place]).multiplyScalar(1.003);
      halo.current.quaternion.setFromUnitVectors(
        up.set(0, 0, 1),
        PLACE_VEC[stop.place],
      );
    }

    arcs.forEach((line, i) => {
      const done = i < journey.stopIndex;
      const flying = inFlight && i === journey.stopIndex;
      line.visible = done || flying;
      if (!line.visible) return;
      line.geometry.instanceCount = done
        ? ARC_STEPS
        : Math.max(1, Math.floor(journey.legT * ARC_STEPS));
      line.material.opacity = flying ? 1 : 0.5;
      line.material.linewidth = flying ? 2.2 : 1.4;
    });

    plane.current.visible = inFlight;
    if (inFlight) {
      const arc = ARCS[journey.stopIndex];
      const t = journey.legT;
      arcPoint(arc, t, point);
      arcPoint(arc, Math.min(1, t + 0.004), next);
      arcPoint(arc, Math.max(0, t - 0.004), up);
      next.sub(up).normalize();
      up.copy(point).normalize();
      right.crossVectors(next, up).normalize();
      next.crossVectors(up, right);
      plane.current.quaternion.setFromRotationMatrix(
        matrix.makeBasis(right, next, up),
      );
      plane.current.position.copy(point).addScaledVector(up, 0.012);
    }

    const time = clock.elapsedTime / 2.6;
    REMOTE.forEach((remote, i) => {
      const active = reduced || journey.remote.includes(remote);
      state.presence[i] = reduced
        ? +active
        : ease(state.presence[i], +active, 8, dt);
      ringRefs.current[i].forEach((ring, k) => {
        ring.visible = state.presence[i] > 0.01 && !(reduced && k > 0);
        if (!ring.visible) return;
        const phase = reduced ? 0.3 : (time + k * 0.5) % 1;
        const eased = 1 - (1 - phase) ** 2;
        ring.scale.setScalar(0.03 + 0.1 * eased);
        ring.material.opacity =
          (reduced ? 0.8 : 0.9 * (1 - phase) ** 1.3) * state.presence[i];
      });
    });
  });

  return (
    <>
      <color attach="background" args={[BACKGROUND]} />
      <mesh position={[0, 0, -0.2]}>
        <planeGeometry args={[GLOW_HALF * 2, GLOW_HALF * 2]} />
        <shaderMaterial
          transparent
          depthWrite={false}
          blending={AdditiveBlending}
          uniforms={{
            uColor: { value: new Color(ACCENT) },
            uLimb: { value: GLOW_LIMB },
          }}
          vertexShader={GLOW_VERTEX}
          fragmentShader={GLOW_FRAGMENT}
        />
      </mesh>
      <group ref={globe}>
        <mesh>
          <sphereGeometry args={[1, 64, 48]} />
          <shaderMaterial
            uniforms={{
              uBase: { value: new Color("#0e1722") },
              uRim: { value: new Color(ACCENT) },
            }}
            vertexShader={SPHERE_VERTEX}
            fragmentShader={SPHERE_FRAGMENT}
          />
        </mesh>
        <lineSegments geometry={land.borders} material={borderMaterial} />
        <points geometry={land.dots} material={dotMaterial} />
        {arcs.map((line, i) => (
          <primitive key={i} object={line} />
        ))}
        {PLACE_KEYS.map((key, i) => (
          <mesh
            key={key}
            ref={(el) => {
              dotRefs.current[i] = el;
            }}
            position={toVec(PLACES[key].lat, PLACES[key].lon, 1.004)}
          >
            <sphereGeometry args={[0.013, 16, 12]} />
            <meshBasicMaterial color="#e2f1ff" />
          </mesh>
        ))}
        <mesh ref={halo}>
          <circleGeometry args={[0.032, 32]} />
          <meshBasicMaterial
            color={ACCENT}
            transparent
            opacity={0.28}
            depthWrite={false}
          />
        </mesh>
        {REMOTE.map((remote, i) => (
          <group
            key={remote.org}
            position={toVec(
              PLACES[remote.place].lat,
              PLACES[remote.place].lon,
              1.006,
            )}
            quaternion={ringTilts[i]}
          >
            {[0, 1].map((k) => (
              <mesh
                key={k}
                ref={(el) => {
                  (ringRefs.current[i] ??= [])[k] = el;
                }}
              >
                <ringGeometry args={[0.93, 1, 64]} />
                <meshBasicMaterial
                  color={ACCENT}
                  transparent
                  depthWrite={false}
                />
              </mesh>
            ))}
          </group>
        ))}
        <mesh ref={plane} geometry={planeGeometry}>
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>
    </>
  );
});

export default function JourneyGlobe({ progress, reducedMotion }) {
  const progressRef = useRef(progress);
  progressRef.current = progress;
  const rootRef = useRef(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    observer.observe(rootRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="absolute inset-0">
      <Canvas
        flat
        dpr={[1, 2]}
        frameloop={reducedMotion || !visible ? "demand" : "always"}
        camera={CAMERA}
        gl={GL}
      >
        <Scene progressRef={progressRef} reduced={reducedMotion} />
      </Canvas>
    </div>
  );
}
