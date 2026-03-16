"use client";

import { useMemo } from "react";
import { motion, useTransform, AnimatePresence, type MotionValue } from "motion/react";
import { CTAButton } from "../cta-button";
import {
  COLORS,
  TEXT_TRANSITION,
  IDENTITY_TRANSFORMS,
  PROOF_STRIP_TRANSFORMS,
  FLAGSHIP_TRANSFORMS,
  HANDOFF_TRANSFORMS,
  PHASE_LABEL_TRANSFORMS,
  THOUGHT_TRANSFORMS,
  SPATIAL_LABEL_TRANSFORMS,
  PHASES,
} from "./dossier-hero.config";
import {
  IDENTITY_CONTENT,
  POSITIONING_CONTENT,
  PROOF_CONTENT,
  FLAGSHIP_CONTENT,
  HANDOFF_CONTENT,
} from "./dossier-hero.content";
import type { HeroOverlayProps, DossierPhase } from "./dossier-hero.types";
import styles from "./hero-overlay.module.css";

/**
 * HeroOverlay - Phase-based content system
 * 
 * Phases: closed -> open -> flight -> close -> handoff
 * - closed: Identity block (eyebrow, headline, role statement, CTA) - recruiter-readable
 * - open: Identity + positioning expansion + whispers (secondary)
 * - flight: Proof strip (metrics) + spatial labels (strictly secondary) + flagship fade-in at end
 * - close: Flagship case teaser (full)
 * - handoff: Final CTAs
 */
export function HeroOverlay({
  progress,
  progressValue,
  phase,
  isDesktop,
  reducedMotion,
  resumeHref,
  contactHref,
  className = "",
}: HeroOverlayProps) {
  // Text color transitions
  const textPrimary = useTransform(
    progress,
    [...TEXT_TRANSITION.primary.keys],
    [...TEXT_TRANSITION.primary.colors] as string[]
  );
  const textSecondary = useTransform(
    progress,
    [...TEXT_TRANSITION.secondary.keys],
    [...TEXT_TRANSITION.secondary.colors] as string[]
  );

  return (
    <div className={`${styles.overlay} ${className}`}>
      <div className={styles.grid}>
        {/* LEFT: Main content area */}
        <div className={styles.leftCopy}>
          <LeftContent
            progress={progress}
            progressValue={progressValue}
            phase={phase}
            textPrimary={textPrimary}
            textSecondary={textSecondary}
            reducedMotion={reducedMotion}
            resumeHref={resumeHref}
            contactHref={contactHref}
          />
        </div>

        {/* CENTER: Spacer for book */}
        <div className={styles.centerSpacer} />

        {/* RIGHT: Phase labels, progress rail, spatial elements */}
        <div className={styles.rightRail}>
          <RightRailContent
            progress={progress}
            progressValue={progressValue}
            phase={phase}
            textSecondary={textSecondary}
            reducedMotion={reducedMotion}
          />
        </div>
      </div>
    </div>
  );
}

// ============================================
// Left Content - Main Phase Content
// ============================================

interface LeftContentProps {
  progress: MotionValue<number>;
  progressValue: number;
  phase: DossierPhase;
  textPrimary: MotionValue<string>;
  textSecondary: MotionValue<string>;
  reducedMotion: boolean;
  resumeHref: string;
  contactHref: string;
}

function LeftContent({
  progress,
  progressValue,
  phase,
  textPrimary,
  textSecondary,
  reducedMotion,
  resumeHref,
  contactHref,
}: LeftContentProps) {
  const { content } = phase;

  return (
    <>
      {/* IDENTITY BLOCK: closed + open phases */}
      {(content.identity || content.positioning) && (
        <IdentityBlock
          progress={progress}
          textPrimary={textPrimary}
          textSecondary={textSecondary}
          reducedMotion={reducedMotion}
          resumeHref={resumeHref}
          contactHref={contactHref}
          showPositioning={content.positioning}
        />
      )}

      {/* PROOF STRIP: flight phase */}
      {content.proof && (
        <ProofStrip
          progress={progress}
          progressValue={progressValue}
          textPrimary={textPrimary}
          reducedMotion={reducedMotion}
        />
      )}

      {/* FLAGSHIP TEASER: starts fade-in at end of flight, full in close */}
      {(content.proof || content.flagship) && (
        <FlagshipTeaser
          progress={progress}
          progressValue={progressValue}
          textPrimary={textPrimary}
          textSecondary={textSecondary}
          reducedMotion={reducedMotion}
        />
      )}

      {/* HANDOFF CTAs: handoff phase */}
      {content.handoff && (
        <HandoffBlock
          progress={progress}
          textPrimary={textPrimary}
          textSecondary={textSecondary}
          reducedMotion={reducedMotion}
        />
      )}
    </>
  );
}

// ============================================
// Identity Block (closed + open phases)
// ============================================

interface IdentityBlockProps {
  progress: MotionValue<number>;
  textPrimary: MotionValue<string>;
  textSecondary: MotionValue<string>;
  reducedMotion: boolean;
  resumeHref: string;
  contactHref: string;
  showPositioning: boolean;
}

function IdentityBlock({
  progress,
  textPrimary,
  textSecondary,
  reducedMotion,
  resumeHref,
  contactHref,
  showPositioning,
}: IdentityBlockProps) {
  const transforms = IDENTITY_TRANSFORMS;

  // Eyebrow transforms
  const eyebrowY = useTransform(progress, [...transforms.eyebrow.y.keys], [...transforms.eyebrow.y.values]);
  const eyebrowScale = useTransform(progress, [...transforms.eyebrow.scale.keys], [...transforms.eyebrow.scale.values]);
  const eyebrowOpacity = useTransform(progress, [...transforms.eyebrow.opacity.keys], [...transforms.eyebrow.opacity.values]);
  const eyebrowBlur = useTransform(progress, [...transforms.eyebrow.blur.keys], [...transforms.eyebrow.blur.values]);
  const eyebrowFilter = useTransform(eyebrowBlur, (b) => `blur(${b}px)`);

  // Headline transforms
  const headlineY = useTransform(progress, [...transforms.headline.y.keys], [...transforms.headline.y.values]);
  const headlineScale = useTransform(progress, [...transforms.headline.scale.keys], [...transforms.headline.scale.values]);
  const headlineOpacity = useTransform(progress, [...transforms.headline.opacity.keys], [...transforms.headline.opacity.values]);
  const headlineBlur = useTransform(progress, [...transforms.headline.blur.keys], [...transforms.headline.blur.values]);
  const headlineFilter = useTransform(headlineBlur, (b) => `blur(${b}px)`);

  // Role statement transforms
  const roleY = useTransform(progress, [...transforms.roleStatement.y.keys], [...transforms.roleStatement.y.values]);
  const roleScale = useTransform(progress, [...transforms.roleStatement.scale.keys], [...transforms.roleStatement.scale.values]);
  const roleOpacity = useTransform(progress, [...transforms.roleStatement.opacity.keys], [...transforms.roleStatement.opacity.values]);
  const roleBlur = useTransform(progress, [...transforms.roleStatement.blur.keys], [...transforms.roleStatement.blur.values]);
  const roleFilter = useTransform(roleBlur, (b) => `blur(${b}px)`);

  // CTA transforms
  const ctaY = useTransform(progress, [...transforms.cta.y.keys], [...transforms.cta.y.values]);
  const ctaOpacity = useTransform(progress, [...transforms.cta.opacity.keys], [...transforms.cta.opacity.values]);
  const ctaScale = useTransform(progress, [...transforms.cta.scale.keys], [...transforms.cta.scale.values]);

  // Scroll hint transforms
  const hintY = useTransform(progress, [...transforms.scrollHint.y.keys], [...transforms.scrollHint.y.values]);
  const hintOpacity = useTransform(progress, [...transforms.scrollHint.opacity.keys], [...transforms.scrollHint.opacity.values]);

  if (reducedMotion) {
    return (
      <div className={styles.identityBlock}>
        <p className={styles.eyebrow}>{IDENTITY_CONTENT.eyebrow}</p>
        <h1 className={styles.headline}>{IDENTITY_CONTENT.headline}</h1>
        <p className={styles.roleStatement}>{IDENTITY_CONTENT.roleStatement}</p>
        {showPositioning && (
          <p className={styles.expansion}>{POSITIONING_CONTENT.expansion}</p>
        )}
        <div className={styles.ctaRow}>
          <CTAButton as="a" href={resumeHref} variant="primary" size="lg">
            {IDENTITY_CONTENT.cta.label}
          </CTAButton>
          <CTAButton as="a" href={contactHref} variant="ghost" size="lg">
            Contact
          </CTAButton>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.identityBlock}>
      {/* Eyebrow */}
      <motion.p
        className={styles.eyebrow}
        style={{
          y: eyebrowY,
          scale: eyebrowScale,
          opacity: eyebrowOpacity,
          filter: eyebrowFilter,
          color: textSecondary,
        }}
      >
        {IDENTITY_CONTENT.eyebrow}
      </motion.p>

      {/* Headline */}
      <motion.h1
        className={styles.headline}
        style={{
          y: headlineY,
          scale: headlineScale,
          opacity: headlineOpacity,
          filter: headlineFilter,
          color: textPrimary,
        }}
      >
        {IDENTITY_CONTENT.headline}
      </motion.h1>

      {/* Role Statement - visible immediately for recruiter scan */}
      <motion.p
        className={styles.roleStatement}
        style={{
          y: roleY,
          scale: roleScale,
          opacity: roleOpacity,
          filter: roleFilter,
          color: textSecondary,
        }}
      >
        {IDENTITY_CONTENT.roleStatement}
      </motion.p>

      {/* Positioning Expansion (open phase) */}
      <AnimatePresence>
        {showPositioning && (
          <motion.p
            className={styles.expansion}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ color: textSecondary }}
          >
            {POSITIONING_CONTENT.expansion}
          </motion.p>
        )}
      </AnimatePresence>

      {/* CTA Row */}
      <motion.div
        className={styles.ctaRow}
        style={{
          y: ctaY,
          opacity: ctaOpacity,
          scale: ctaScale,
        }}
        data-cta-area="true"
      >
        <CTAButton as="a" href={resumeHref} variant="primary" size="lg">
          {IDENTITY_CONTENT.cta.label}
        </CTAButton>
        <CTAButton as="a" href={contactHref} variant="ghost" size="lg">
          Contact
        </CTAButton>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className={styles.scrollHint}
        style={{
          y: hintY,
          opacity: hintOpacity,
          color: textSecondary,
        }}
      >
        <span className={styles.scrollIcon}>
          <motion.span
            className={styles.scrollDot}
            animate={{ y: [2, 14, 2] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
        <span>Scroll to explore</span>
      </motion.div>
    </div>
  );
}

// ============================================
// Proof Strip (flight phase)
// ============================================

interface ProofStripProps {
  progress: MotionValue<number>;
  progressValue: number;
  textPrimary: MotionValue<string>;
  reducedMotion: boolean;
}

function ProofStrip({
  progress,
  progressValue,
  textPrimary,
  reducedMotion,
}: ProofStripProps) {
  const transforms = PROOF_STRIP_TRANSFORMS;

  const containerY = useTransform(progress, [...transforms.container.y.keys], [...transforms.container.y.values]);
  const containerOpacity = useTransform(progress, [...transforms.container.opacity.keys], [...transforms.container.opacity.values]);
  const containerScale = useTransform(progress, [...transforms.container.scale.keys], [...transforms.container.scale.values]);

  if (reducedMotion) {
    return (
      <div className={styles.proofStrip}>
        <div className={styles.proofGrid}>
          {PROOF_CONTENT.proofStrip.map((metric) => (
            <div key={metric.label} className={styles.proofMetric}>
              <span className={styles.proofValue}>{metric.value}</span>
              <span className={styles.proofLabel}>{metric.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className={styles.proofStrip}
      style={{
        y: containerY,
        opacity: containerOpacity,
        scale: containerScale,
      }}
    >
      <div className={styles.proofGrid}>
        {PROOF_CONTENT.proofStrip.map((metric, i) => (
          <motion.div
            key={metric.label}
            className={styles.proofMetric}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: i * transforms.metric.stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <motion.span className={styles.proofValue} style={{ color: textPrimary }}>
              {metric.value}
            </motion.span>
            <span className={styles.proofLabel}>{metric.label}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ============================================
// Flagship Teaser (soft intro in flight, full in close)
// ============================================

interface FlagshipTeaserProps {
  progress: MotionValue<number>;
  progressValue: number;
  textPrimary: MotionValue<string>;
  textSecondary: MotionValue<string>;
  reducedMotion: boolean;
}

function FlagshipTeaser({
  progress,
  progressValue,
  textPrimary,
  textSecondary,
  reducedMotion,
}: FlagshipTeaserProps) {
  const transforms = FLAGSHIP_TRANSFORMS;

  const containerY = useTransform(progress, [...transforms.container.y.keys], [...transforms.container.y.values]);
  const containerOpacity = useTransform(progress, [...transforms.container.opacity.keys], [...transforms.container.opacity.values]);
  const containerScale = useTransform(progress, [...transforms.container.scale.keys], [...transforms.container.scale.values]);
  const containerBlur = useTransform(progress, [...transforms.container.blur.keys], [...transforms.container.blur.values]);
  const containerFilter = useTransform(containerBlur, (b) => `blur(${b}px)`);

  // Only render when in fade-in range (0.55+)
  if (progressValue < 0.54) return null;

  if (reducedMotion) {
    return (
      <div className={styles.flagshipTeaser}>
        <span className={styles.flagshipLabel}>Featured Case</span>
        <h2 className={styles.flagshipTitle}>{FLAGSHIP_CONTENT.title}</h2>
        <p className={styles.flagshipOutcome}>{FLAGSHIP_CONTENT.outcome}</p>
        <p className={styles.flagshipContext}>{FLAGSHIP_CONTENT.context}</p>
        <CTAButton as="a" href={FLAGSHIP_CONTENT.href} variant="secondary" size="md">
          {FLAGSHIP_CONTENT.cta}
        </CTAButton>
      </div>
    );
  }

  return (
    <motion.div
      className={styles.flagshipTeaser}
      style={{
        y: containerY,
        opacity: containerOpacity,
        scale: containerScale,
        filter: containerFilter,
      }}
    >
      <span className={styles.flagshipLabel}>Featured Case</span>
      <motion.h2 className={styles.flagshipTitle} style={{ color: textPrimary }}>
        {FLAGSHIP_CONTENT.title}
      </motion.h2>
      <motion.p className={styles.flagshipOutcome} style={{ color: textPrimary }}>
        {FLAGSHIP_CONTENT.outcome}
      </motion.p>
      <motion.p className={styles.flagshipContext} style={{ color: textSecondary }}>
        {FLAGSHIP_CONTENT.context}
      </motion.p>
      <CTAButton as="a" href={FLAGSHIP_CONTENT.href} variant="secondary" size="md">
        {FLAGSHIP_CONTENT.cta}
      </CTAButton>
    </motion.div>
  );
}

// ============================================
// Handoff Block (handoff phase)
// ============================================

interface HandoffBlockProps {
  progress: MotionValue<number>;
  textPrimary: MotionValue<string>;
  textSecondary: MotionValue<string>;
  reducedMotion: boolean;
}

function HandoffBlock({
  progress,
  textPrimary,
  textSecondary,
  reducedMotion,
}: HandoffBlockProps) {
  const transforms = HANDOFF_TRANSFORMS;

  const containerY = useTransform(progress, [...transforms.container.y.keys], [...transforms.container.y.values]);
  const containerOpacity = useTransform(progress, [...transforms.container.opacity.keys], [...transforms.container.opacity.values]);
  const containerScale = useTransform(progress, [...transforms.container.scale.keys], [...transforms.container.scale.values]);
  const containerBlur = useTransform(progress, [...transforms.container.blur.keys], [...transforms.container.blur.values]);
  const containerFilter = useTransform(containerBlur, (b) => `blur(${b}px)`);

  if (reducedMotion) {
    return (
      <div className={styles.handoffBlock}>
        <h2 className={styles.handoffTitle}>Let&apos;s Connect</h2>
        <div className={styles.handoffCtas}>
          {HANDOFF_CONTENT.ctas.map((cta) => (
            <CTAButton key={cta.label} as="a" href={cta.href} variant="secondary" size="lg">
              {cta.label}
            </CTAButton>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className={styles.handoffBlock}
      style={{
        y: containerY,
        opacity: containerOpacity,
        scale: containerScale,
        filter: containerFilter,
      }}
    >
      <motion.h2 className={styles.handoffTitle} style={{ color: textPrimary }}>
        Let&apos;s Connect
      </motion.h2>
      <div className={styles.handoffCtas}>
        {HANDOFF_CONTENT.ctas.map((cta, i) => (
          <motion.div
            key={cta.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: i * transforms.itemStagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <CTAButton as="a" href={cta.href} variant="secondary" size="lg">
              {cta.label}
            </CTAButton>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ============================================
// Right Rail Content
// ============================================

interface RightRailContentProps {
  progress: MotionValue<number>;
  progressValue: number;
  phase: DossierPhase;
  textSecondary: MotionValue<string>;
  reducedMotion: boolean;
}

function RightRailContent({
  progress,
  progressValue,
  phase,
  textSecondary,
  reducedMotion,
}: RightRailContentProps) {
  // Progress rail
  const railOpacity = useTransform(progress, [0.05, 0.40, 1.00], [0.35, 0.55, 0.75]);

  // Show phase content when not in closed or handoff
  const showPhaseContent = phase.id !== "closed" && phase.id !== "handoff";

  // Spatial labels only during flight phase (strictly secondary)
  const showSpatialLabels = phase.content.proof;

  return (
    <>
      {/* Phase label + thought */}
      <div className={styles.phaseArea}>
        <AnimatePresence mode="wait">
          {showPhaseContent && phase.label && (
            <PhaseContent
              key={`phase-${phase.id}`}
              phase={phase}
              textSecondary={textSecondary}
              reducedMotion={reducedMotion}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Spatial labels (strictly secondary) */}
      <AnimatePresence>
        {showSpatialLabels && (
          <SpatialLabels
            phase={phase}
            reducedMotion={reducedMotion}
          />
        )}
      </AnimatePresence>

      {/* Progress indicator */}
      <motion.div
        className={styles.progressRail}
        style={{ opacity: railOpacity }}
      >
        {PHASES.filter((p) => p.label).map((p) => (
          <div
            key={p.id}
            className={styles.progressTick}
            data-active={phase.index >= PHASES.findIndex((ph) => ph.id === p.id)}
          >
            <span
              className={styles.progressBar}
              style={{
                width: phase.id === p.id 
                  ? `${Math.min(100, phase.localProgress * 100)}%` 
                  : phase.index > PHASES.findIndex((ph) => ph.id === p.id) 
                    ? "100%" 
                    : "0%",
              }}
            />
          </div>
        ))}
      </motion.div>
    </>
  );
}

// ============================================
// Phase Content (animated per phase)
// ============================================

interface PhaseContentProps {
  phase: DossierPhase;
  textSecondary: MotionValue<string>;
  reducedMotion: boolean;
}

function PhaseContent({ phase, textSecondary, reducedMotion }: PhaseContentProps) {
  const local = phase.localProgress;

  // Calculate transform values based on local progress
  const getTransformValue = (
    config: { keys: readonly number[]; values: readonly number[] },
    localProgress: number
  ): number => {
    const { keys, values } = config;
    if (localProgress <= keys[0]) return values[0];
    if (localProgress >= keys[keys.length - 1]) return values[values.length - 1];

    for (let i = 0; i < keys.length - 1; i++) {
      if (localProgress >= keys[i] && localProgress <= keys[i + 1]) {
        const t = (localProgress - keys[i]) / (keys[i + 1] - keys[i]);
        return values[i] + (values[i + 1] - values[i]) * t;
      }
    }
    return values[values.length - 1];
  };

  if (reducedMotion) {
    return (
      <div className={styles.phaseContent}>
        <p className={styles.phaseLabel} style={{ color: COLORS.brassActive }}>
          {phase.label}
        </p>
        {phase.thought && (
          <p className={styles.phaseThought}>"{phase.thought}"</p>
        )}
      </div>
    );
  }

  const labelY = getTransformValue(PHASE_LABEL_TRANSFORMS.y, local);
  const labelX = getTransformValue(PHASE_LABEL_TRANSFORMS.x, local);
  const labelOpacity = getTransformValue(PHASE_LABEL_TRANSFORMS.opacity, local);
  const labelBlur = getTransformValue(PHASE_LABEL_TRANSFORMS.blur, local);
  const labelScale = getTransformValue(PHASE_LABEL_TRANSFORMS.scale, local);

  const thoughtY = getTransformValue(THOUGHT_TRANSFORMS.y, local);
  const thoughtX = getTransformValue(THOUGHT_TRANSFORMS.x, local);
  const thoughtOpacity = getTransformValue(THOUGHT_TRANSFORMS.opacity, local);
  const thoughtBlur = getTransformValue(THOUGHT_TRANSFORMS.blur, local);

  return (
    <motion.div
      className={styles.phaseContent}
      initial={{ opacity: 0, x: 24, filter: "blur(10px)" }}
      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, x: -10, filter: "blur(8px)" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.p
        className={styles.phaseLabel}
        style={{
          color: COLORS.brassActive,
          y: labelY,
          x: labelX,
          opacity: labelOpacity,
          scale: labelScale,
          filter: `blur(${labelBlur}px)`,
        }}
      >
        {phase.label}
      </motion.p>
      {phase.thought && (
        <motion.p
          className={styles.phaseThought}
          style={{
            color: textSecondary,
            y: thoughtY,
            x: thoughtX,
            opacity: thoughtOpacity,
            filter: `blur(${thoughtBlur}px)`,
          }}
        >
          "{phase.thought}"
        </motion.p>
      )}
    </motion.div>
  );
}

// ============================================
// Spatial Labels (strictly secondary)
// ============================================

interface SpatialLabelsProps {
  phase: DossierPhase;
  reducedMotion: boolean;
}

function SpatialLabels({ phase, reducedMotion }: SpatialLabelsProps) {
  const local = phase.localProgress;

  const getTransformValue = (
    config: { keys: readonly number[]; values: readonly number[] },
    localProgress: number
  ): number => {
    const { keys, values } = config;
    if (localProgress <= keys[0]) return values[0];
    if (localProgress >= keys[keys.length - 1]) return values[values.length - 1];

    for (let i = 0; i < keys.length - 1; i++) {
      if (localProgress >= keys[i] && localProgress <= keys[i + 1]) {
        const t = (localProgress - keys[i]) / (keys[i + 1] - keys[i]);
        return values[i] + (values[i + 1] - values[i]) * t;
      }
    }
    return values[values.length - 1];
  };

  if (reducedMotion) {
    return (
      <div className={styles.spatialLabels}>
        {PROOF_CONTENT.spatialLabels.map((label) => (
          <span key={label} className={styles.spatialLabel}>
            {label}
          </span>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className={styles.spatialLabels}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {PROOF_CONTENT.spatialLabels.map((label, i) => {
        const y = getTransformValue(SPATIAL_LABEL_TRANSFORMS.y, local);
        const x = getTransformValue(SPATIAL_LABEL_TRANSFORMS.x, local);
        // Max opacity 0.4 - strictly secondary, never compete with primary content
        const opacity = getTransformValue(SPATIAL_LABEL_TRANSFORMS.opacity, local);
        const blur = getTransformValue(SPATIAL_LABEL_TRANSFORMS.blur, local);

        return (
          <motion.span
            key={label}
            className={styles.spatialLabel}
            style={{
              y: y + i * 8,
              x: x + i * 4,
              opacity,
              filter: `blur(${blur}px)`,
            }}
          >
            {label}
          </motion.span>
        );
      })}
    </motion.div>
  );
}
