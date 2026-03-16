import { describe, expect, it } from "vitest";
import {
  isExternalHref,
  isInternalRouteHref,
  getExternalLinkProps,
} from "@/lib/url-utils";

describe("url-utils", () => {
  describe("isExternalHref", () => {
    it("returns true for http URLs", () => {
      expect(isExternalHref("http://example.com")).toBe(true);
    });

    it("returns true for https URLs", () => {
      expect(isExternalHref("https://example.com")).toBe(true);
    });

    it("returns true for mailto links", () => {
      expect(isExternalHref("mailto:test@example.com")).toBe(true);
    });

    it("returns false for internal routes", () => {
      expect(isExternalHref("/about")).toBe(false);
    });

    it("returns false for hash links", () => {
      expect(isExternalHref("#section")).toBe(false);
    });

    it("returns false for relative paths", () => {
      expect(isExternalHref("./page")).toBe(false);
    });
  });

  describe("isInternalRouteHref", () => {
    it("returns true for absolute internal routes", () => {
      expect(isInternalRouteHref("/")).toBe(true);
      expect(isInternalRouteHref("/about")).toBe(true);
      expect(isInternalRouteHref("/cases/example")).toBe(true);
    });

    it("returns false for protocol-relative URLs", () => {
      expect(isInternalRouteHref("//example.com")).toBe(false);
    });

    it("returns false for external URLs", () => {
      expect(isInternalRouteHref("https://example.com")).toBe(false);
    });

    it("returns false for hash links", () => {
      expect(isInternalRouteHref("#section")).toBe(false);
    });

    it("returns false for relative paths without leading slash", () => {
      expect(isInternalRouteHref("about")).toBe(false);
    });
  });

  describe("getExternalLinkProps", () => {
    it("returns blank target and noopener for external http URLs", () => {
      const props = getExternalLinkProps("https://example.com");
      expect(props).toEqual({
        target: "_blank",
        rel: "noopener noreferrer",
      });
    });

    it("returns blank target and noopener for mailto links", () => {
      const props = getExternalLinkProps("mailto:test@example.com");
      expect(props).toEqual({
        target: "_blank",
        rel: "noopener noreferrer",
      });
    });

    it("returns empty object for internal routes", () => {
      const props = getExternalLinkProps("/about");
      expect(props).toEqual({});
    });

    it("returns empty object for hash links", () => {
      const props = getExternalLinkProps("#section");
      expect(props).toEqual({});
    });
  });
});
