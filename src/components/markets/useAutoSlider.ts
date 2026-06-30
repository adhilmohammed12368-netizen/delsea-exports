// src/components/markets/useAutoSlider.ts
import { useCallback, useEffect, useRef, useState } from "react";

export type SlideDirection = 1 | -1;

interface UseAutoSliderOptions {
  /** total number of slides in the loop */
  count: number;
  /** ms between automatic advances */
  intervalMs?: number;
  /** when false, auto-advance is fully disabled (e.g. reduced-motion users) */
  enabled?: boolean;
}

interface UseAutoSliderResult {
  /** current slide index, always within [0, count) */
  index: number;
  /** direction of the most recent transition, for directional animations */
  direction: SlideDirection;
  /** move forward one slide */
  next: () => void;
  /** move backward one slide */
  prev: () => void;
  /** jump directly to a slide index */
  goTo: (i: number) => void;
  /** call on drag/pointer start to pause auto-advance */
  pause: () => void;
  /** call on drag/pointer end to resume auto-advance (after a short grace period) */
  resume: () => void;
  /** whether auto-advance is currently paused */
  isPaused: boolean;
}

/**
 * Drives an infinite-loop slider: auto-advances every `intervalMs`,
 * pauses while the user is interacting (dragging), and resumes shortly
 * after they let go. Index always wraps with modulo, so callers never
 * need to clamp.
 */
export function useAutoSlider({
  count,
  intervalMs = 5000,
  enabled = true,
}: UseAutoSliderOptions): UseAutoSliderResult {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<SlideDirection>(1);
  const [isPaused, setIsPaused] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const wrap = useCallback((i: number) => ((i % count) + count) % count, [count]);

  const next = useCallback(() => {
    setDirection(1);
    setIndex((i) => wrap(i + 1));
  }, [wrap]);

  const prev = useCallback(() => {
    setDirection(-1);
    setIndex((i) => wrap(i - 1));
  }, [wrap]);

  const goTo = useCallback(
    (i: number) => {
      setIndex((current) => {
        setDirection(wrap(i) >= current ? 1 : -1);
        return wrap(i);
      });
    },
    [wrap]
  );

  const pause = useCallback(() => {
    setIsPaused(true);
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
  }, []);

  const resume = useCallback(() => {
    // small grace period so the slider doesn't immediately jump right
    // after the user releases a drag
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => setIsPaused(false), 600);
  }, []);

  useEffect(() => {
    if (!enabled || isPaused || count <= 1) return;
    timerRef.current = setInterval(next, intervalMs);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [enabled, isPaused, count, intervalMs, next]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  return { index, direction, next, prev, goTo, pause, resume, isPaused };
}