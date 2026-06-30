// src/components/markets/WorldMap.tsx
import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { geoNaturalEarth1, geoPath, type GeoPermissibleObjects } from "d3-geo";
import { feature } from "topojson-client";
import worldAtlas from "world-atlas/countries-110m.json";
import { ORIGIN, project, type Continent } from "./data";
import { RouteAnimation } from "./RouteAnimation";

interface WorldMapProps {
  activeContinent: Continent;
  /** index used to key animation restarts when the slide changes */
  slideKey: string | number;
}

/** Minimal shape of the world-atlas TopoJSON we actually read — avoids
 * depending on the (unused) topojson-specification types package. */
interface CountriesTopology {
  type: "Topology";
  objects: { countries: Record<string, unknown> };
  arcs: number[][][];
  bbox?: number[];
  transform?: { scale: [number, number]; translate: [number, number] };
}

/** Map viewBox — kept at the original 1000x500 frame so RouteAnimation,
 * which projects countries via the equirectangular `project()` helper
 * in data.ts, continues to line up against the map without modification. */
const VIEW_W = 1000;
const VIEW_H = 500;

/**
 * Real country name -> continent id, matched against the Natural Earth
 * dataset's `properties.name` field. Used purely to decide which country
 * polygons get the "active" highlight treatment; it intentionally mirrors
 * the continents already defined in data.ts.
 */
const CONTINENT_COUNTRY_NAMES: Record<string, string[]> = {
  asia: [
    "China",
    "Iran",
    "Israel",
    "Malaysia",
    "Philippines",
    "Saudi Arabia",
    "South Korea",
    "Taiwan",
    "Thailand",
    "Turkey",
    "United Arab Emirates",
    "Vietnam",
    "India", // not an export market, but keeps the subcontinent lit near Kochi
  ],
  europe: [
    "France",
    "Germany",
    "Greece",
    "Italy",
    "Lithuania",
    "Netherlands",
    "Portugal",
    "Spain",
  ],
  africa: ["Algeria", "Cameroon", "Tunisia", "Mauritius", "Madagascar"],
  americas: ["Dominican Rep.", "Dominican Republic"],
  oceania: ["Australia"],
};

type WorldFeature = {
  type: "Feature";
  id?: string | number;
  properties: { name: string };
  geometry: GeoPermissibleObjects;
};

/** Build the projection + path generator once, fitted to the fixed viewBox. */
function useWorldGeography() {
  return useMemo(() => {
    const topology = worldAtlas as unknown as CountriesTopology;
    const geo = feature(
      topology as never,
      topology.objects.countries as never
    ) as unknown as { features: WorldFeature[] };

    const projection = geoNaturalEarth1().fitSize(
      [VIEW_W, VIEW_H],
      geo as unknown as GeoPermissibleObjects
    );
    const path = geoPath(projection);

    return { features: geo.features, projection, path };
  }, []);
}

/** Compute a padded bounding box (in the projected viewBox space) around all
 * countries belonging to a continent, used as the camera's pan/zoom target. */
function useContinentFocus(
  features: WorldFeature[],
  path: ReturnType<typeof geoPath>
) {
  return useMemo(() => {
    const focus: Record<string, { cx: number; cy: number; scale: number }> = {};

    for (const [continentId, names] of Object.entries(CONTINENT_COUNTRY_NAMES)) {
      const matched = features.filter((f) => names.includes(f.properties.name));
      if (matched.length === 0) continue;

      let minX = Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;

      for (const f of matched) {
        const bounds = path.bounds(f.geometry as GeoPermissibleObjects);
        minX = Math.min(minX, bounds[0][0]);
        minY = Math.min(minY, bounds[0][1]);
        maxX = Math.max(maxX, bounds[1][0]);
        maxY = Math.max(maxY, bounds[1][1]);
      }

      // Pad and floor the box so tiny / single-country regions (e.g. a
      // lone island nation) still frame nicely instead of zooming in too far.
      const padX = Math.max((maxX - minX) * 0.45, 70);
      const padY = Math.max((maxY - minY) * 0.45, 70);
      minX -= padX;
      maxX += padX;
      minY -= padY;
      maxY += padY;

      const w = Math.max(maxX - minX, 140);
      const h = Math.max(maxY - minY, 140);
      const cx = minX + (maxX - minX) / 2;
      const cy = minY + (maxY - minY) / 2;

      const scaleX = VIEW_W / w;
      const scaleY = VIEW_H / h;
      const scale = Math.min(Math.min(scaleX, scaleY), 4.5);

      focus[continentId] = { cx, cy, scale };
    }

    return focus;
  }, [features, path]);
}

export function WorldMap({ activeContinent, slideKey }: WorldMapProps) {
  const originPoint = useMemo(() => project(ORIGIN.lat, ORIGIN.lng), []);
  const { features, path } = useWorldGeography();
  const continentFocus = useContinentFocus(features, path);

  const focus =
  activeContinent.id === "americas"
    ? {
        cx: 220,
        cy: 165,
        scale: 1.6,
      }
    : activeContinent.id === "oceania"
    ? {
        cx: 845,
        cy: 340,
        scale: 1.6
      }
    : continentFocus[activeContinent.id];
    

  const camera = useMemo(() => {
  if (!focus) return { x: 0, y: 0, scale: 1 };

  let x = VIEW_W / 2 - focus.cx * focus.scale;
  let y = VIEW_H / 2 - focus.cy * focus.scale;

  // Move Australia down slightly
  if (activeContinent.id === "oceania") {
    y += 260;
    x -= -250;
  }
  if (activeContinent.id === "americas") {
    x -= 90;      // move map right
    y +=140;      // move map down
  }
  return {
    scale: focus.scale,
    x,
    y,
  };
}, [focus, activeContinent.id]);

  const [isCoarsePointer, setIsCoarsePointer] = useState(false);
  useEffect(() => {
    setIsCoarsePointer(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="ocean-glow" cx="50%" cy="45%" r="65%">
            <stop offset="0%" stopColor="#103244" stopOpacity="0.9" />
            <stop offset="55%" stopColor="#0A1A2F" stopOpacity="0.97" />
            <stop offset="100%" stopColor="#060F1C" stopOpacity="1" />
          </radialGradient>

          <linearGradient id="land-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1B6B7A" />
            <stop offset="100%" stopColor="#0F4C5C" />
          </linearGradient>

          <linearGradient id="land-gradient-active" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2C8A9C" />
            <stop offset="100%" stopColor="#176376" />
          </linearGradient>

          <filter id="active-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="origin-glow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="3.2" />
          </filter>
        </defs>

        <rect x="0" y="0" width={VIEW_W} height={VIEW_H} fill="url(#ocean-glow)" />

        {/* camera group — smooth pan/zoom toward the active continent */}
        <motion.g
          initial={false}
          animate={{ x: camera.x, y: camera.y, scale: camera.scale }}
          transition={{ duration: isCoarsePointer ? 0.9 : 1.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "0px 0px" }}
        >
          {/* latitude / longitude grid, faint, nautical-chart feel */}
          <g stroke="#D4A24C" strokeOpacity="0.06" strokeWidth="0.5">
            {Array.from({ length: 9 }).map((_, i) => (
              <line
                key={`lat-${i}`}
                x1="0"
                x2={VIEW_W}
                y1={(i + 1) * 50}
                y2={(i + 1) * 50}
              />
            ))}
            {Array.from({ length: 19 }).map((_, i) => (
              <line
                key={`lng-${i}`}
                x1={(i + 1) * 50}
                x2={(i + 1) * 50}
                y1="0"
                y2={VIEW_H}
              />
            ))}
          </g>

          {/* real country polygons, drawn from Natural Earth topojson */}
          <g>
            {features.map((f) => {
              const isActiveRegion = isCountryInContinent(
                f.properties.name,
                activeContinent.id
              );
              const d = path(f.geometry as GeoPermissibleObjects) ?? "";
              if (!d) return null;
              return (
                <motion.path
                  key={String(f.id ?? f.properties.name)}
                  d={d}
                  fill={
                    isActiveRegion
                      ? "url(#land-gradient-active)"
                      : "url(#land-gradient)"
                  }
                  stroke={isActiveRegion ? "#D4A24C" : "#0A1A2F"}
                  strokeWidth={isActiveRegion ? 1.1 : 0.6}
                  strokeOpacity={isActiveRegion ? 0.55 : 0.4}
                  filter={isActiveRegion ? "url(#active-glow)" : undefined}
                  initial={false}
                  animate={{ opacity: isActiveRegion ? 1 : 0.38 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              );
            })}
          </g>

          {/* focus halo behind the active continent's bounding region */}
          <AnimatePresence mode="wait">
            {focus && (
              <motion.ellipse
                key={`halo-${activeContinent.id}-${slideKey}`}
                cx={focus.cx}
                cy={focus.cy}
                rx={(VIEW_W / focus.scale / 2) * 0.85}
                ry={(VIEW_H / focus.scale / 2) * 0.85}
                fill="#D4A24C"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 0.07, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ filter: "blur(18px)" }}
              />
            )}
          </AnimatePresence>

          {/* shipping routes + ship animation, keyed to force restart per slide */}
          <RouteAnimation
            key={slideKey}
            origin={originPoint}
            countries={activeContinent.countries}
          />

          {/* origin marker — Kochi */}
          <g>
            <circle
              cx={originPoint.x}
              cy={originPoint.y}
              r="10"
              fill="#D4A24C"
              opacity="0.25"
              filter="url(#origin-glow)"
            />
            <motion.circle
              cx={originPoint.x}
              cy={originPoint.y}
              r="6"
              fill="#D4A24C"
              opacity="0.35"
              animate={{ r: [6, 13, 6], opacity: [0.35, 0, 0.35] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
            <circle
              cx={originPoint.x}
              cy={originPoint.y}
              r="3.2"
              fill="#FFF4DC"
              stroke="#D4A24C"
              strokeWidth="1.4"
            />
          </g>
        </motion.g>
      </svg>

      {/* Origin label, HTML overlay for crisp typography at any zoom */}
      <OriginLabel point={originPoint} camera={camera} />
    </div>
  );
}

function OriginLabel({
  point,
  camera,
}: {
  point: { x: number; y: number };
  camera: { x: number; y: number; scale: number };
}) {
  const projectedX = point.x * camera.scale + camera.x;
  const projectedY = point.y * camera.scale + camera.y;
  const leftPct = (projectedX / VIEW_W) * 100;
  const topPct = (projectedY / VIEW_H) * 100;
  return (
    <motion.div
      className="pointer-events-none absolute z-10 -translate-x-1/2 translate-y-3"
      animate={{ left: `${leftPct}%`, top: `${topPct}%` }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="rounded-full border border-[#D4A24C]/40 bg-[#0A1A2F]/80 px-2.5 py-1 backdrop-blur-sm">
        <span className="whitespace-nowrap font-['DM_Sans'] text-[10px] font-medium uppercase tracking-wider text-[#F0E6D2]">
          Kochi · Origin
        </span>
      </div>
    </motion.div>
  );
}

function isCountryInContinent(countryName: string, continentId: string): boolean {
  return CONTINENT_COUNTRY_NAMES[continentId]?.includes(countryName) ?? false;
}