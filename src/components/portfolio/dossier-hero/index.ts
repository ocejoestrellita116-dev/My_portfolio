// Re-exports for clean imports
export { DossierHero } from "./dossier-hero";

// Types - explicit exports
export type {
  // Phase types (new)
  PhaseContent,
  DossierPhase,
  DossierPhaseContent,
  ProofMetric,
  FlagshipCase,
  CTALink,
  // Common types
  PointerState,
  DossierHeroState,
  DossierHeroMotionState,
  DossierHeroProps,
  BookSequenceCanvasProps,
  DioramaSceneProps,
  HeroOverlayProps,
  AdaptiveTopbarProps,
  TransformConfig,
  LayerTransforms,
  UseDossierProgressReturn,
  UsePointerParallaxReturn,
  // Legacy aliases
  StageContent,
  DossierStage,
  DossierStageId,
} from "./dossier-hero.types";

// Config - explicit exports
export {
  // Phase system (new)
  PHASES,
  FLAGSHIP_CROSSFADE,
  PROOF_STRIP_FADE,
  IDENTITY_TRANSFORMS,
  PROOF_STRIP_TRANSFORMS,
  FLAGSHIP_TRANSFORMS,
  HANDOFF_TRANSFORMS,
  SPATIAL_LABEL_TRANSFORMS,
  PHASE_LABEL_TRANSFORMS,
  THOUGHT_TRANSFORMS,
  // Common config
  PARALLAX_FACTORS,
  COLORS,
  BG_TRANSITION,
  TEXT_TRANSITION,
  SCROLL_HEIGHT_VH,
  PIN_HEIGHT_VH,
  TOPBAR_TIMELINE,
  BOOK_CONFIG,
  BREAKPOINTS,
  RESPONSIVE_SCALE,
  // Legacy aliases
  STAGES,
  LEFT_COPY_TRANSFORMS,
  RIGHT_RAIL_TRANSFORMS,
  EVIDENCE_TRANSFORMS,
} from "./dossier-hero.config";
export type { DossierPhaseId } from "./dossier-hero.config";

// Content
export {
  DOSSIER_PHASE_CONTENT,
  IDENTITY_CONTENT,
  POSITIONING_CONTENT,
  PROOF_CONTENT,
  FLAGSHIP_CONTENT,
  HANDOFF_CONTENT,
} from "./dossier-hero.content";

// Hooks
export { useDossierProgress, getPhaseFromProgress, getStageFromProgress } from "./hooks/use-dossier-progress";
export { usePointerParallax, createPointerTracker } from "./hooks/use-pointer-parallax";
