import { describe, expect, it } from "vitest";
import { calculateEmi } from "@/lib/finance";
describe("calculateEmi", () => {
  it("calculates a monthly reducing-balance payment", () => {
    expect(calculateEmi(5_000_000, 8.5, 20)).toBeCloseTo(43_391, -1);
  });
  it("handles zero interest", () => {
    expect(calculateEmi(1_200_000, 0, 10)).toBe(10_000);
  });
});
