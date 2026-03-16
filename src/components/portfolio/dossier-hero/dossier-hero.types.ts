/**
 * Dossier Hero Types
 * Artifact-driven phase system for premium dossier narrative
 */

import type { MotionValue } from "motion/react";
import type { DossierPhaseId } from "./dossier-hero.config";

// Phase content visibility flags
export interface PhaseContent {
  identity: boolean;      // Name, role statement, CTA
  positioning: boolean;   // Expansion text, whispers
  proof: boolean;         // Metrics strip
  flagship: boolean;      // Case teaser
  handoff: boolean;       // Final CTAs
}

// Phase information
export interface DossierPhase {
  id: DossierPhaseId;
  index: number;
  label: string | null;
  thought: string | null;
  localProgress: number;  // 0-1 within the phase
  content: PhaseContent;
}

// Pointer position normalized to -1..1
export interface PointerState {
  x: number;
  y: number;
  isActive: boolean;
}

// Full state passed to child components
export interface DossierHeroState {
  progress: number;
  velocity: number;
  phase: DossierPhase;
  isDesktop: boolean;
  reducedMotion: boolean;
  isInteractive: boolean;
  pointer: PointerState;
}

// Motion value versions for reactive transforms
export interface DossierHeroMotionState {
  progress: MotionValue<number>;
  velocity: MotionValue<number>;
}

// Props for DossierHero orchestrator
export interface DossierHeroProps {
  resumeHref?: string;
  contactHref?: string;
  onProgressChange?: (progress: number) => void;
  onPhaseChange?: (phase: DossierPhase) => void;
}

// Props for BookSequenceCanvas
export interface BookSequenceCanvasProps {
  progress: number;
  phase: DossierPhase;
  isInteractive: boolean;
  className?: string;
}

// Props for DioramaScene (atmosphere layer)
export interface DioramaSceneProps {
  progress: number;
  velocity: number;
  pointer: PointerState;
  phase: DossierPhase;
  className?: string;
}

// Props for HeroOverlay (text layer)
export interface HeroOverlayProps {
  progress: MotionValue<number>;
  progressValue: number;
  phase: DossierPhase;
  isDesktop: boolean;
  reducedMotion: boolean;
  resumeHref: string;
  contactHref: string;
  className?: string;
}

// Props for AdaptiveTopbar
export interface AdaptiveTopbarProps {
  progress: number;
  phase: DossierPhase;
  className?: string;
}

// Transform config shape
export interface TransformConfig {
  keys: readonly number[];
  values: readonly number[];
}

// Layer transform set
export interface LayerTransforms {
  y?: TransformConfig;
  x?: TransformConfig;
  scale?: TransformConfig;
  opacity?: TransformConfig;
  blur?: TransformConfig;
}

// Hook return types
export interface UseDossierProgressReturn {
  progress: MotionValue<number>;
  progressValue: number;
  velocity: MotionValue<number>;
  velocityValue: number;
  phase: DossierPhase;
}

export interface UsePointerParallaxReturn {
  pointer: PointerState;
  bind: {
    onPointerMove: (e: React.PointerEvent) => void;
    onPointerLeave: () => void;
  };
}

// ============================================
// Phase Content Types (for dossier-hero.content.ts)
// ============================================

export interface ProofMetric {
  value: string;
  label: string;
}

export interface FlagshipCase {
  title: string;
  outcome: string;
  context: string;
  cta: string;
  href: string;
}

export interface CTALink {
  label: string;
  href: string;
}

export interface DossierPhaseContent {
  closed: {
    eyebrow: string;
    headline: string;
    roleStatement: string;
    cta: CTALink;
  };
  open: {
    expansion: string;
    whispers: string[];
  };
  flight: {
    proofStrip: ProofMetric[];
    spatialLabels: string[];
  };
  flagship: FlagshipCase;
  handoff: {
    ctas: CTALink[];
  };
}

// Legacy aliases for backward compatibility
export type DossierStage = DossierPhase;
export type DossierStageId = DossierPhaseId;
export type StageContent = PhaseContent;
