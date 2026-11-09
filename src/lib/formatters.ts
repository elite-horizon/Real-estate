import type { Area, Facing, PropertyKind } from "@/types/property";

const inrFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

export function formatPrice(valueInr: number): string {
  if (valueInr >= 10_000_000) {
    return `₹ ${(valueInr / 10_000_000).toLocaleString("en-IN", { maximumFractionDigits: 2 })} Cr`;
  }
  if (valueInr >= 100_000) {
    return `₹ ${(valueInr / 100_000).toLocaleString("en-IN", { maximumFractionDigits: 2 })} L`;
  }
  return inrFormatter.format(valueInr);
}

const areaLabels: Record<Area["unit"], string> = { "sq-ft": "sq. ft.", "sq-yd": "sq. yd.", acre: "acre" };

export function formatArea(area: Area): string {
  const unit = area.value === 1 && area.unit === "acre" ? "acre" : area.unit === "acre" ? "acres" : areaLabels[area.unit];
  return `${area.value.toLocaleString("en-IN")} ${unit}`;
}

export function formatFacing(facing: Facing): string {
  return facing.split("-").map((part) => part[0]!.toUpperCase() + part.slice(1)).join("-");
}

export function formatPropertyKind(kind: PropertyKind): string {
  return { land: "Plotted development", apartment: "Apartment residence", house: "Individual house", villa: "Villa community" }[kind];
}
