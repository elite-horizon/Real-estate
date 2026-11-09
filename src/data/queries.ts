import { demoDatabase } from "@/data/demo-database";
import type { ApartmentProject, Availability, LandProject, PropertyProject, VillaCommunity } from "@/types/property";

export function getAllProjects(): PropertyProject[] {
  return [
    ...Object.values(demoDatabase.landProjects),
    ...Object.values(demoDatabase.apartmentProjects),
    ...Object.values(demoDatabase.houses),
    ...Object.values(demoDatabase.villaCommunities),
  ];
}

export function getFeaturedProjects(): PropertyProject[] {
  return getAllProjects().filter(({ featured }) => featured);
}

export function getProjectById(id: string): PropertyProject | undefined {
  return getAllProjects().find((project) => project.id === id);
}

export function getLandProjectPlots(project: LandProject) {
  return project.plotIds.map((id) => demoDatabase.plots[id]).filter((plot) => plot !== undefined);
}

export function getApartmentProjectTowers(project: ApartmentProject) {
  return project.towerIds.map((id) => demoDatabase.towers[id]).filter((tower) => tower !== undefined);
}

export function getTowerFloors(tower: { floorIds: string[] }) {
  return tower.floorIds.map((id) => demoDatabase.floors[id]).filter((floor) => floor !== undefined);
}

export function getFloorFlats(floor: { flatIds: string[] }) {
  return floor.flatIds.map((id) => demoDatabase.flats[id]).filter((flat) => flat !== undefined);
}

export function getTowerFlats(tower: { floorIds: string[] }) {
  return getTowerFloors(tower).flatMap(getFloorFlats);
}

export function getVillaCommunityVillas(community: VillaCommunity) {
  return community.villaIds.map((id) => demoDatabase.villas[id]).filter((villa) => villa !== undefined);
}

export function countAvailability(items: Array<{ availability: Availability }>) {
  return items.reduce<Record<Availability, number>>(
    (counts, item) => ({ ...counts, [item.availability]: counts[item.availability] + 1 }),
    { available: 0, reserved: 0, sold: 0 },
  );
}
