/**
 * Dossier Hero Phase Content
 * Isolated typed structure for phase-specific content
 * NOT mixed with general site-content.ts
 */

import type { DossierPhaseContent } from "./dossier-hero.types";

export const DOSSIER_PHASE_CONTENT: DossierPhaseContent = {
  // CLOSED PHASE: Recruiter-readable in 3 seconds
  // Identity + role statement + CTA visible immediately
  closed: {
    eyebrow: "Support Systems Operator",
    headline: "Grigorii",
    roleStatement: "Turning ticket noise into systems that scale.",
    cta: { label: "View Resume", href: "/resume" },
  },

  // OPEN PHASE: Positioning expansion
  // Whispers are secondary (0.4-0.6 opacity, smaller font)
  open: {
    expansion: "AI-enabled workflows. Structured escalations. Calmer systems.",
    whispers: [
      "Every ticket tells a story",
      "Patterns emerge from noise",
    ],
  },

  // FLIGHT PHASE: Proof metrics
  // Spatial labels are strictly secondary - background texture only
  flight: {
    proofStrip: [
      { value: "45%", label: "Tier-1 reduction" },
      { value: "35%", label: "Faster response" },
      { value: "70%", label: "Less manual load" },
      { value: "112+", label: "Indexed items" },
    ],
    spatialLabels: [
      "Workflow automation",
      "Escalation quality", 
      "AI leverage",
    ],
  },

  // FLAGSHIP: Appears in both flight (end, 0.55+) and close phases
  // Soft intro via crossfade, not hard switch
  flagship: {
    title: "Darkest AFK",
    outcome: "112+ items indexed, recovery time cut",
    context: "Operator tool for faster compensation",
    cta: "Open case study",
    href: "/cases/darkest-afk",
  },

  // HANDOFF PHASE: Final CTAs
  handoff: {
    ctas: [
      { label: "View case studies", href: "#cases" },
      { label: "Open resume", href: "/resume" },
      { label: "Email", href: "mailto:grigorii584@gmail.com" },
    ],
  },
};

// Export individual sections for convenience
export const IDENTITY_CONTENT = DOSSIER_PHASE_CONTENT.closed;
export const POSITIONING_CONTENT = DOSSIER_PHASE_CONTENT.open;
export const PROOF_CONTENT = DOSSIER_PHASE_CONTENT.flight;
export const FLAGSHIP_CONTENT = DOSSIER_PHASE_CONTENT.flagship;
export const HANDOFF_CONTENT = DOSSIER_PHASE_CONTENT.handoff;
