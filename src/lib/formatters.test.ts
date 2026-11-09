import { formatArea, formatFacing, formatPrice } from "@/lib/formatters";

describe("property formatters", () => {
  it("formats Indian real-estate price denominations", () => {
    expect(formatPrice(14_500_000)).toBe("₹ 1.45 Cr");
    expect(formatPrice(4_800_000)).toBe("₹ 48 L");
  });

  it("formats explicit areas and facing labels", () => {
    expect(formatArea({ value: 1250, unit: "sq-ft" })).toBe("1,250 sq. ft.");
    expect(formatFacing("north-east")).toBe("North-East");
  });
});
