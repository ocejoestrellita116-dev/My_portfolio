// Re-exports for clean imports
export { DossierHero } from "./dossier-hero";

// Types - explicit exports to avoid conflicts
export type {
  StageContent,
  DossierStage,
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
} from "./dossier-hero.types";

// Config - explicit exports
export {
  STAGES,
  LEGACY_STAGES,
  PARALLAX_FACTORS,
  COLORS,
  BG_TRANSITION,
  TEXT_TRANSITION,
  SCROLL_HEIGHT_VH,
  PIN_HEIGHT_VH,
  TOPBAR_TIMELINE,
  BOOK_CONFIG,
  LEFT_COPY_TRANSFORMS,
  RIGHT_RAIL_TRANSFORMS,
  EVIDENCE_TRANSFORMS,
  BREAKPOINTS,
  RESPONSIVE_SCALE,
} from "./dossier-hero.config";
export type { DossierStageId } from "./dossier-hero.config";

// Hooks
export { useDossierProgress, getStageFromProgress } from "./hooks/use-dossier-progress";
export { usePointerParallax, createPointerTracker } from "./hooks/use-pointer-parallax";
