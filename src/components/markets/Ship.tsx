// src/components/markets/Ship.tsx
import { useEffect, useId, useRef, useState } from "react";
import { motion, useAnimationFrame } from "framer-motion";

interface ShipProps {
  /** the "d" attribute of the path this ship should travel along */
  pathD: string;
  /** seconds to wait before the ship starts moving */
  delay: number;
  /** seconds the journey takes */
  duration: number;
}

/**
 * Moves a small cargo-ship glyph along an arbitrary SVG path by sampling
 * point-at-length each frame. Uses a hidden native <path> node (via ref)
 * so we can call the real DOM getPointAtLength/getTotalLength API for
 * pixel-accurate following, including correct heading/rotation.
 */
export function Ship({ pathD, delay, duration }: ShipProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const groupRef = useRef<SVGGElement>(null);
  const [visible, setVisible] = useState(false);
  const startRef = useRef<number | null>(null);
  const rawId = useId();
  const glowId = `ship-glow-${rawId.replace(/:/g, "")}`;

  useEffect(() => {
    setVisible(false);
    startRef.current = null;
    const timer = setTimeout(() => setVisible(true), delay * 1000);
    return () => clearTimeout(timer);
    // re-run whenever the path changes (slide change), restarting the journey
  }, [pathD, delay]);

  useAnimationFrame((time) => {
    if (!visible || !pathRef.current || !groupRef.current) return;
    if (startRef.current === null) startRef.current = time;
    const elapsedSec = (time - startRef.current) / 1000;
    const progress = Math.min(elapsedSec / duration, 1);

    const total = pathRef.current.getTotalLength();
    const point = pathRef.current.getPointAtLength(progress * total);
    const aheadPoint = pathRef.current.getPointAtLength(
      Math.min(progress * total + 1, total)
    );
    const angle =
      (Math.atan2(aheadPoint.y - point.y, aheadPoint.x - point.x) * 180) / Math.PI;

    // SVG-native transform on the <g> element itself — operates in the same
    // 1000x500 user-space coordinate system as the path, so it stays
    // pixel-accurate regardless of how the viewBox is scaled on screen.
    groupRef.current.setAttribute(
      "transform",
      `translate(${point.x} ${point.y}) rotate(${angle})`
    );
  });

  return (
    <g>
      {/* invisible reference path used purely for geometry sampling */}
      <path ref={pathRef} d={pathD} fill="none" stroke="none" />

      {visible && (
        <motion.g
          ref={groupRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <defs>
            <filter id={glowId} x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="1.6" />
            </filter>
          </defs>
          <g filter={`url(#${glowId})`}>
            <ShipGlyph />
          </g>
        </motion.g>
      )}
    </g>
  );
}

/** A small top-down cargo-ship silhouette, sized for the 1000x500 map viewBox */
function ShipGlyph() {
  return (
    <g transform="scale(0.9)">
      <ellipse cx="0" cy="0" rx="5.5" ry="6.5" fill="#0A1A2F" opacity="0.001" />
      {/* hull */}
      <path
        d="M -4.5 -1.5 L 4.5 -1.5 L 5.8 0 L 4.5 1.8 L -4.5 1.8 L -5.6 0 Z"
        fill="#F0E6D2"
        stroke="#D4A24C"
        strokeWidth="0.6"
      />
      {/* containers / superstructure */}
      <rect x="-2.6" y="-2.6" width="2.4" height="2" fill="#D4A24C" />
      <rect x="-0.1" y="-2.6" width="2.4" height="2" fill="#1B6B7A" />
      {/* bow highlight */}
      <circle cx="4.6" cy="0" r="0.7" fill="#D4A24C" />
    </g>
  );
}