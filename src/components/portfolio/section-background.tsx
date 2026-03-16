"use client";

import { useRef, type ReactNode, type CSSProperties } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface SectionBackgroundProps {
  children: ReactNode;
  /** Starting background color (as CSS value) */
  colorFrom?: string;
  /** Ending background color (as CSS value) */
  colorTo?: string;
  /** Optional className for the container */
  className?: string;
  /** Offset for when the transition starts (0-1) */
  offsetStart?: number;
  /** Offset for when the transition ends (0-1) */
  offsetEnd?: number;
  /** Additional style properties */
  style?: CSSProperties;
  /** Section ID for navigation */
  id?: string;
}

/**
 * SectionBackground - Kamaboko-style smooth background color transitions
 * 
 * Wraps a section and provides smooth color transitions as the user scrolls.
 * Colors interpolate based on the section's position in the viewport.
 */
export function SectionBackground({
  children,
  colorFrom = "transparent",
  colorTo = "transparent",
  className = "",
  offsetStart = 0,
  offsetEnd = 1,
  style,
  id,
}: SectionBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Interpolate background color based on scroll progress
  const backgroundColor = useTransform(
    scrollYProgress,
    [offsetStart, offsetEnd],
    [colorFrom, colorTo]
  );

  return (
    <motion.div
      ref={ref}
      id={id}
      className={`relative ${className}`}
      style={{
        backgroundColor,
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * GradientSectionBackground - For more complex gradient transitions
 */
interface GradientSectionBackgroundProps {
  children: ReactNode;
  /** Gradient stops - array of [progress, color] tuples */
  gradientStops?: [number, string][];
  className?: string;
  id?: string;
}

export function GradientSectionBackground({
  children,
  gradientStops = [[0, "transparent"], [1, "transparent"]],
  className = "",
  id,
}: GradientSectionBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const progress = gradientStops.map(([p]) => p);
  const colors = gradientStops.map(([, c]) => c);

  const backgroundColor = useTransform(scrollYProgress, progress, colors);

  return (
    <motion.div
      ref={ref}
      id={id}
      className={`relative ${className}`}
      style={{ backgroundColor }}
    >
      {children}
    </motion.div>
  );
}

export default SectionBackground;
