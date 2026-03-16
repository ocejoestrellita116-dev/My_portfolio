/**
 * Dossier Hero Configuration
 * Artifact-driven phase system for premium dossier narrative
 * 
 * Phases: closed -> open -> flight -> close -> handoff
 * First frame is recruiter-readable: identity + role statement + CTA
 */

import type { PhaseContent } from "./dossier-hero.types";

// Phase definitions with scroll ranges
// Each phase controls what content is visible and how it animates
export const PHASES = [
  { 
    id: "closed",     
    range: [0.00, 0.08] as const, 
    label: null,        
    thought: null,
    content: { identity: true, positioning: false, proof: false, flagship: false, handoff: false } satisfies PhaseContent
  },
  { 
    id: "open",   
    range: [0.08, 0.30] as const, 
    label: "DOSSIER",   
    thought: "Every ticket tells a story",
    content: { identity: true, positioning: true, proof: false, flagship: false, handoff: false } satisfies PhaseContent
  },
  { 
    id: "flight",     
    range: [0.30, 0.62] as const, 
    label: "PROOF",     
    thought: "Patterns emerge from noise",
    content: { identity: false, positioning: false, proof: true, flagship: false, handoff: false } satisfies PhaseContent
  },
  { 
    id: "close",     
    range: [0.62, 0.84] as const, 
    label: "WORK",     
    thought: "Systems replace repetition",
    content: { identity: false, positioning: false, proof: false, flagship: true, handoff: false } satisfies PhaseContent
  },
  { 
    id: "handoff",   
    range: [0.84, 1.00] as const, 
    label: "CONNECT",   
    thought: "Clarity, documented",
    content: { identity: false, positioning: false, proof: false, flagship: false, handoff: true } satisfies PhaseContent
  },
] as const;

export type DossierPhaseId = typeof PHASES[number]["id"];

// Legacy aliases for backward compatibility
export const STAGES = PHASES;
export type DossierStageId = DossierPhaseId;

// Flagship teaser crossfade range (starts in flight, full in close)
export const FLAGSHIP_CROSSFADE = {
  fadeInStart: 0.55,   // End of flight: begin fade in
  fadeInEnd: 0.65,     // Start of close: full opacity
  fadeOutStart: 0.80,  // Near handoff
  fadeOutEnd: 0.84,    // Handoff begins
} as const;

// Proof strip fade range
export const PROOF_STRIP_FADE = {
  fadeInStart: 0.30,
  fadeInEnd: 0.38,
  fadeOutStart: 0.55,
  fadeOutEnd: 0.62,
} as const;

// Parallax depth factors for multi-layer effect
export const PARALLAX_FACTORS = {
  background: 0.2,
  book: 1.0,
  phaseLabel: 1.15,
  headline: 1.4,
} as const;

// Color palette for background transition
export const COLORS = {
  // Studio white environment (start)
  studioWhite: "#f8f6f3",
  warmCream: "#f5f0e6",
  warmGray: "#e8e4df",
  
  // Transition midtones
  midTone: "#9a958d",
  coolGray: "#6a6a78",
  
  // Dark environment (end)
  charcoal: "#2a2926",
  graphite: "#1a1a1f",
  nearBlack: "#0a0a0c",
  
  // Accent
  brass: "#c4a574",
  brassActive: "#d4b584",
  brassMuted: "#9a8054",
} as const;

// Background transition keyframes
export const BG_TRANSITION = {
  keys: [0, 0.70, 0.85, 0.95, 1.0],
  colors: [
    COLORS.studioWhite,
    COLORS.studioWhite,
    COLORS.warmGray,
    COLORS.charcoal,
    COLORS.nearBlack,
  ],
} as const;

// Text color transition (for readability)
export const TEXT_TRANSITION = {
  primary: {
    keys: [0, 0.70, 0.90, 1.0],
    colors: ["#0a0a0c", "#0a0a0c", "#e8e4df", "#f8f6f3"],
  },
  secondary: {
    keys: [0, 0.70, 0.90, 1.0],
    colors: ["#4a4a52", "#4a4a52", "#9a958d", "#a0a5ab"],
  },
} as const;

// Scroll track height (multiplier of viewport)
export const SCROLL_HEIGHT_VH = 500;

// Pin height
export const PIN_HEIGHT_VH = 100;

// Topbar collapse timeline
export const TOPBAR_TIMELINE = {
  fullStart: 0.00,
  collapseStart: 0.12,
  collapseEnd: 0.24,
  restoreStart: 0.84,
  restoreEnd: 0.96,
} as const;

// Book sequence configuration
export const BOOK_CONFIG = {
  videoSrc: "/scroll-sequences/dossier/book-sequence.mp4",
  posterSrc: "/scroll-sequences/dossier/poster.jpg",
  transforms: {
    y: { keys: [0, 0.05, 0.30, 0.80, 1.0], values: [40, 0, 0, 0, 0] },
    scale: { keys: [0, 0.05, 0.30, 0.55, 0.80, 1.0], values: [0.92, 1, 1, 1.03, 1, 0.98] },
    opacity: { keys: [0, 0.03], values: [0.7, 1] },
  },
} as const;

// Identity block transforms (closed + open phases)
export const IDENTITY_TRANSFORMS = {
  eyebrow: {
    y: { keys: [0.00, 0.04, 0.20, 0.28], values: [12, 0, 0, -28] },
    scale: { keys: [0.00, 0.04, 0.20, 0.28], values: [1, 1, 1, 1.03] },
    opacity: { keys: [0.00, 0.04, 0.22, 0.28], values: [0, 1, 1, 0] },
    blur: { keys: [0.00, 0.04, 0.22, 0.28], values: [6, 0, 0, 8] },
  },
  headline: {
    y: { keys: [0.00, 0.05, 0.22, 0.30], values: [48, 0, 0, -84] },
    scale: { keys: [0.00, 0.05, 0.22, 0.30], values: [0.96, 1, 1, 1.16] },
    opacity: { keys: [0.00, 0.03, 0.24, 0.30], values: [0, 1, 1, 0] },
    blur: { keys: [0.00, 0.05, 0.24, 0.30], values: [12, 0, 0, 12] },
  },
  roleStatement: {
    y: { keys: [0.03, 0.08, 0.24, 0.32], values: [24, 0, 0, -44] },
    scale: { keys: [0.03, 0.24, 0.32], values: [0.98, 1, 1.05] },
    opacity: { keys: [0.03, 0.08, 0.26, 0.32], values: [0, 1, 1, 0] },
    blur: { keys: [0.03, 0.08, 0.26, 0.32], values: [8, 0, 0, 10] },
  },
  cta: {
    y: { keys: [0.05, 0.10, 0.26, 0.34], values: [16, 0, 0, -24] },
    opacity: { keys: [0.05, 0.10, 0.28, 0.34], values: [0, 1, 1, 0] },
    scale: { keys: [0.05, 0.10, 0.28, 0.34], values: [1, 1, 1, 1.02] },
  },
  scrollHint: {
    y: { keys: [0.03, 0.14], values: [0, -10] },
    opacity: { keys: [0.03, 0.06, 0.12, 0.14], values: [0, 0.6, 0.6, 0] },
  },
} as const;

// Proof strip transforms (flight phase)
export const PROOF_STRIP_TRANSFORMS = {
  container: {
    y: { keys: [0.30, 0.38, 0.55, 0.62], values: [32, 0, 0, -32] },
    opacity: { keys: [0.30, 0.38, 0.55, 0.62], values: [0, 1, 1, 0] },
    scale: { keys: [0.30, 0.38, 0.55, 0.62], values: [0.95, 1, 1, 0.95] },
  },
  metric: {
    // Staggered entry per item
    stagger: 0.02,
  },
} as const;

// Flagship teaser transforms (close phase with soft intro from flight)
export const FLAGSHIP_TRANSFORMS = {
  container: {
    y: { keys: [0.55, 0.65, 0.78, 0.84], values: [48, 0, 0, -24] },
    opacity: { keys: [0.55, 0.65, 0.78, 0.84], values: [0, 1, 1, 0] },
    scale: { keys: [0.55, 0.65, 0.78, 0.84], values: [0.92, 1, 1, 0.98] },
    blur: { keys: [0.55, 0.65, 0.78, 0.84], values: [12, 0, 0, 8] },
  },
} as const;

// Handoff CTAs transforms
export const HANDOFF_TRANSFORMS = {
  container: {
    y: { keys: [0.84, 0.92, 0.98, 1.00], values: [32, 0, 0, -8] },
    scale: { keys: [0.84, 0.92], values: [0.92, 1] },
    opacity: { keys: [0.84, 0.90, 1.00], values: [0, 1, 1] },
    blur: { keys: [0.84, 0.92], values: [12, 0] },
  },
  itemStagger: 0.03,
} as const;

// Spatial labels (strictly secondary)
export const SPATIAL_LABEL_TRANSFORMS = {
  // Local progress within phase [0, 1]
  y: { keys: [0, 0.12, 0.82, 1], values: [18, 0, -34, -54] },
  x: { keys: [0, 0.12, 0.82, 1], values: [24, 0, 0, -4] },
  opacity: { keys: [0, 0.12, 0.82, 1], values: [0, 0.4, 0.4, 0] }, // Max 0.4 - strictly secondary
  blur: { keys: [0, 0.12, 0.82, 1], values: [10, 0, 0, 8] },
  scale: { keys: [0, 0.12, 0.82, 1], values: [0.98, 1, 1, 1.04] },
} as const;

// Phase label transforms (right rail)
export const PHASE_LABEL_TRANSFORMS = {
  y: { keys: [0, 0.12, 0.82, 1], values: [18, 0, -34, -54] },
  x: { keys: [0, 0.12, 0.82, 1], values: [24, 0, 0, -4] },
  opacity: { keys: [0, 0.12, 0.82, 1], values: [0, 1, 1, 0] },
  blur: { keys: [0, 0.12, 0.82, 1], values: [10, 0, 0, 8] },
  scale: { keys: [0, 0.12, 0.82, 1], values: [0.98, 1, 1, 1.04] },
} as const;

// Thought text transforms
export const THOUGHT_TRANSFORMS = {
  y: { keys: [0, 0.15, 0.80, 1], values: [12, 0, -22, -34] },
  x: { keys: [0, 0.15, 0.80, 1], values: [16, 0, 0, -2] },
  opacity: { keys: [0, 0.15, 0.82, 1], values: [0, 1, 1, 0] },
  blur: { keys: [0, 0.15, 0.82, 1], values: [8, 0, 0, 6] },
} as const;

// Breakpoint adjustments
export const BREAKPOINTS = {
  desktop: 1280,
  tablet: 1024,
  mobile: 768,
} as const;

// Scale factors for smaller screens
export const RESPONSIVE_SCALE = {
  tablet: 0.8,
  mobile: 0.5,
} as const;

// Legacy exports for backward compatibility
export const STAGES_CONFIG = PHASES;
export const LEFT_COPY_TRANSFORMS = IDENTITY_TRANSFORMS;
export const EVIDENCE_TRANSFORMS = HANDOFF_TRANSFORMS;
export const RIGHT_RAIL_TRANSFORMS = {
  stageLabel: PHASE_LABEL_TRANSFORMS,
  thought: THOUGHT_TRANSFORMS,
  progressRail: {
    y: { keys: [0.05, 1.00], values: [0, -18] },
    opacity: { keys: [0.05, 0.40, 1.00], values: [0.35, 0.55, 0.75] },
  },
} as const;
