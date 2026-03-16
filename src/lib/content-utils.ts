/**
 * Content utility functions for consistent label formatting across the portfolio.
 */

export type ProofLevel = "core" | "working-knowledge" | "shipped";

/**
 * Formats a proof level into a human-readable label.
 * Used for skills and builds to indicate proficiency level.
 */
export function proofLevelLabel(level: string): string {
  if (level === "core") {
    return "Core proof";
  }

  if (level === "working-knowledge") {
    return "Working knowledge";
  }

  return "Shipped build";
}

/**
 * Shorter version of proof level label for compact displays like resume.
 */
export function proofLevelLabelShort(level: string): string {
  if (level === "core") {
    return "Core";
  }

  if (level === "working-knowledge") {
    return "Working knowledge";
  }

  return "Shipped";
}
