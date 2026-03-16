import { describe, expect, it } from "vitest";
import { proofLevelLabel, proofLevelLabelShort } from "@/lib/content-utils";

describe("content-utils", () => {
  describe("proofLevelLabel", () => {
    it("returns 'Core proof' for core level", () => {
      expect(proofLevelLabel("core")).toBe("Core proof");
    });

    it("returns 'Working knowledge' for working-knowledge level", () => {
      expect(proofLevelLabel("working-knowledge")).toBe("Working knowledge");
    });

    it("returns 'Shipped build' for shipped level", () => {
      expect(proofLevelLabel("shipped")).toBe("Shipped build");
    });

    it("returns 'Shipped build' for unknown levels", () => {
      expect(proofLevelLabel("unknown")).toBe("Shipped build");
    });
  });

  describe("proofLevelLabelShort", () => {
    it("returns 'Core' for core level", () => {
      expect(proofLevelLabelShort("core")).toBe("Core");
    });

    it("returns 'Working knowledge' for working-knowledge level", () => {
      expect(proofLevelLabelShort("working-knowledge")).toBe("Working knowledge");
    });

    it("returns 'Shipped' for shipped level", () => {
      expect(proofLevelLabelShort("shipped")).toBe("Shipped");
    });

    it("returns 'Shipped' for unknown levels", () => {
      expect(proofLevelLabelShort("unknown")).toBe("Shipped");
    });
  });
});
