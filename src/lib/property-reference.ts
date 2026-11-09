import { demoDatabase } from "@/data/demo-database";
import { getAllProjects } from "@/data/queries";
import type { PropertyProject } from "@/types/property";

export function projectPath(project: PropertyProject) {
  return project.kind === "land"
    ? `/lands/${project.id}`
    : project.kind === "apartment"
      ? `/apartments/${project.id}`
      : project.kind === "house"
        ? `/houses/${project.id}`
        : `/villas/${project.id}`;
}

export function resolvePropertyReference(
  type: string | undefined,
  id: string | undefined,
) {
  if (!id) return undefined;
  const project = getAllProjects().find((item) => item.id === id);
  if (project)
    return {
      id,
      label: project.name,
      price: project.startingPriceInr,
      path: projectPath(project),
      type: project.kind,
    };
  const plot = demoDatabase.plots[id];
  if (plot) {
    const parent = demoDatabase.landProjects[plot.projectId];
    return {
      id,
      label: `${parent?.name ?? "Land project"} · Plot ${plot.number}`,
      price: plot.priceInr,
      path: `/lands/${plot.projectId}/plots/${plot.id}`,
      type: "land",
    };
  }
  const flat = demoDatabase.flats[id];
  if (flat) {
    const parent = demoDatabase.apartmentProjects[flat.projectId];
    return {
      id,
      label: `${parent?.name ?? "Apartment project"} · Flat ${flat.unitNumber}`,
      price: flat.priceInr,
      path: `/apartments/${flat.projectId}/flats/${flat.id}`,
      type: "apartment",
    };
  }
  const villa = demoDatabase.villas[id];
  if (villa) {
    const parent = demoDatabase.villaCommunities[villa.communityId];
    return {
      id,
      label: `${parent?.name ?? "Villa community"} · ${villa.name}`,
      price: villa.priceInr,
      path: `/villas/${villa.communityId}/villas/${villa.id}`,
      type: "villa",
    };
  }
  const house = demoDatabase.houses[id];
  if (house)
    return {
      id,
      label: house.name,
      price: house.priceInr,
      path: `/houses/${house.id}`,
      type: "house",
    };
  return type ? undefined : undefined;
}
