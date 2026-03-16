"use client";

import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { useMotionValue, useVelocity } from "motion/react";
import { PHASES } from "../dossier-hero.config";
import type { DossierPhase, UseDossierProgressReturn } from "../dossier-hero.types";

/**
 * Custom hook for tracking scroll progress within the dossier hero section.
 * Uses artifact-driven phases: closed -> open -> flight -> close -> handoff
 * 
 * Works with both native scroll and Lenis smooth scroll.
 */
export function useDossierProgress(
  containerRef: React.RefObject<HTMLElement | null>
): UseDossierProgressReturn {
  const progress = useMotionValue(0);
  const velocity = useVelocity(progress);
  
  const [progressValue, setProgressValue] = useState(0);
  const [velocityValue, setVelocityValue] = useState(0);
  const rafRef = useRef<number>(0);

  // Calculate progress based on container position
  const updateProgress = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const containerHeight = container.offsetHeight;
    const viewportHeight = window.innerHeight;
    const scrollRange = containerHeight - viewportHeight;

    if (scrollRange <= 0) return;

    const scrolled = -rect.top;
    const newProgress = Math.max(0, Math.min(1, scrolled / scrollRange));
    
    progress.set(newProgress);
    setProgressValue(newProgress);
  }, [containerRef, progress]);

  // Use RAF loop for continuous updates (works with Lenis)
  useEffect(() => {
    let running = true;
    
    const tick = () => {
      if (!running) return;
      updateProgress();
      rafRef.current = requestAnimationFrame(tick);
    };
    
    rafRef.current = requestAnimationFrame(tick);
    window.addEventListener("resize", updateProgress, { passive: true });

    return () => {
      running = false;
      window.removeEventListener("resize", updateProgress);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateProgress]);

  // Track velocity changes
  useEffect(() => {
    const unsubscribe = velocity.on("change", (v) => {
      setVelocityValue(v);
    });
    return unsubscribe;
  }, [velocity]);

  // Calculate current phase
  const phase = useMemo((): DossierPhase => {
    const currentPhase = PHASES.find(
      (p) => progressValue >= p.range[0] && progressValue < p.range[1]
    ) ?? PHASES[PHASES.length - 1];

    const phaseIndex = PHASES.findIndex((p) => p.id === currentPhase.id);
    const [start, end] = currentPhase.range;
    const localProgress = end > start 
      ? Math.max(0, Math.min(1, (progressValue - start) / (end - start)))
      : 0;

    return {
      id: currentPhase.id,
      index: phaseIndex,
      label: currentPhase.label,
      thought: currentPhase.thought,
      localProgress,
      content: currentPhase.content,
    };
  }, [progressValue]);

  return {
    progress,
    progressValue,
    velocity,
    velocityValue,
    phase,
  };
}

/**
 * Helper to get phase from progress value (non-reactive)
 */
export function getPhaseFromProgress(progressValue: number): DossierPhase {
  const currentPhase = PHASES.find(
    (p) => progressValue >= p.range[0] && progressValue < p.range[1]
  ) ?? PHASES[PHASES.length - 1];

  const phaseIndex = PHASES.findIndex((p) => p.id === currentPhase.id);
  const [start, end] = currentPhase.range;
  const localProgress = end > start 
    ? Math.max(0, Math.min(1, (progressValue - start) / (end - start)))
    : 0;

  return {
    id: currentPhase.id,
    index: phaseIndex,
    label: currentPhase.label,
    thought: currentPhase.thought,
    localProgress,
    content: currentPhase.content,
  };
}

// Legacy aliases for backward compatibility
export const getStageFromProgress = getPhaseFromProgress;
