// src/components/markets/RouteAnimation.tsx
import { useMemo } from "react";
import { motion } from "framer-motion";
import { project, type ExportCountry } from "./data";
import { Ship } from "./Ship";

interface RouteAnimationProps {
  origin: { x: number; y: number };
  countries: ExportCountry[];
}

interface RoutePath {
  country: ExportCountry;
  d: string;
  point: { x: number; y: number };
  length: number;
  delay: number;
}

/**
 * Builds a gentle quadratic-bezier "great circle"-style curve between two
 * points, arcing toward the pole slightly for a more nautical, less robotic
 * line than a straight chord.
 */
function buildCurve(origin: { x: number; y: number }, dest: { x: number; y: number }): string {
  const midX = (origin.x + dest.x) / 2;
  const midY = (origin.y + dest.y) / 2;
  const dx = dest.x - origin.x;
  const dy = dest.y - origin.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const arcLift = Math.min(dist * 0.18, 60);
  const controlX = midX;
  const controlY = midY - arcLift;
  return `M ${origin.x} ${origin.y} Q ${controlX} ${controlY} ${dest.x} ${dest.y}`;
}

/** Approximate path length for a quadratic curve via the control polygon (good enough for stagger timing) */
function approximateLength(d: string): number {
  const match = d.match(
    /M ([\d.-]+) ([\d.-]+) Q ([\d.-]+) ([\d.-]+) ([\d.-]+) ([\d.-]+)/
  );
  if (!match) return 100;
  const [, x0, y0, cx, cy, x1, y1] = match.slice(1).map(Number);
  const seg1 = Math.hypot(cx - x0, cy - y0);
  const seg2 = Math.hypot(x1 - cx, y1 - cy);
  return seg1 + seg2;
}

export function RouteAnimation({ origin, countries }: RouteAnimationProps) {
  const routes: RoutePath[] = useMemo(() => {
    return countries.map((country, i) => {
      const point = project(country.lat, country.lng);
      const d = buildCurve(origin, point);
      return {
        country,
        d,
        point,
        length: approximateLength(d),
        delay: i * 0.35,
      };
    });
  }, [countries, origin]);

  return (
    <g>
      <defs>
        <linearGradient id="route-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D4A24C" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#F0C674" stopOpacity="0.9" />
        </linearGradient>
        <filter id="route-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.4" />
        </filter>
        <filter id="dest-glow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="2.6" />
        </filter>
      </defs>

      {routes.map((route) => (
        <g key={route.country.code}>
          {/* faint static guide line, always visible */}
          <path
            d={route.d}
            fill="none"
            stroke="#D4A24C"
            strokeOpacity="0.12"
            strokeWidth="1"
            strokeDasharray="2 4"
          />

          {/* animated drawing stroke, sequential per destination */}
          <motion.path
            d={route.d}
            fill="none"
            stroke="url(#route-gradient)"
            strokeWidth="1.6"
            strokeLinecap="round"
            filter="url(#route-glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { duration: 1.1, delay: route.delay, ease: "easeInOut" },
              opacity: { duration: 0.3, delay: route.delay },
            }}
          />

          {/* the moving ship, follows this path shortly after the line draws */}
          <Ship pathD={route.d} delay={route.delay + 0.15} duration={1.4} />

          {/* destination marker */}
          <g>
            <motion.circle
              cx={route.point.x}
              cy={route.point.y}
              r="2.6"
              fill="#D4A24C"
              opacity="0"
              filter="url(#dest-glow)"
              animate={{
                opacity: [0, 0.5, 0.18, 0.5],
                r: [2.6, 7, 5, 7],
              }}
              transition={{
                delay: route.delay + 1.0,
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            />
            <motion.circle
              cx={route.point.x}
              cy={route.point.y}
              r="2.4"
              fill="#FFF4DC"
              stroke="#D4A24C"
              strokeWidth="1"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: route.delay + 0.9, duration: 0.4, ease: "backOut" }}
              style={{ transformOrigin: `${route.point.x}px ${route.point.y}px` }}
            />
          </g>
        </g>
      ))}
    </g>
  );
}