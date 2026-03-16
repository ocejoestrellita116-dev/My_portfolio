/**
 * URL utility functions for consistent link handling across the portfolio.
 * These functions determine link behavior (internal vs external, route vs anchor).
 */

/**
 * Checks if a URL is an external link (HTTP, HTTPS, or mailto).
 * External links should open in a new tab with proper security attributes.
 */
export function isExternalHref(href: string): boolean {
  return href.startsWith("http") || href.startsWith("mailto:");
}

/**
 * Checks if a URL is an internal route (starts with / but not //).
 * Internal routes use Next.js Link component for client-side navigation.
 */
export function isInternalRouteHref(href: string): boolean {
  return href.startsWith("/") && !href.startsWith("//");
}

/**
 * Returns the appropriate target and rel attributes for a link.
 * External links get "_blank" target and security-focused rel attributes.
 */
export function getExternalLinkProps(href: string): {
  target?: "_blank";
  rel?: "noopener noreferrer";
} {
  if (isExternalHref(href)) {
    return {
      target: "_blank",
      rel: "noopener noreferrer",
    };
  }
  return {};
}
