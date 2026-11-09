export type PropertyKind = "land" | "apartment" | "house" | "villa";
export type Availability = "available" | "reserved" | "sold";
export type AreaUnit = "sq-ft" | "sq-yd" | "acre";
export type Facing = "north" | "south" | "east" | "west" | "north-east" | "north-west" | "south-east" | "south-west";

export interface Area {
  value: number;
  unit: AreaUnit;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface MediaAsset {
  id: string;
  kind: "image" | "panorama" | "video" | "floor-plan";
  src: string;
  alt: string;
  credit?: string;
  license?: string;
}

export interface Amenity {
  id: string;
  name: string;
  category: "wellness" | "sport" | "community" | "security" | "utility" | "outdoor";
  description: string;
}

export interface LocationPoint {
  id: string;
  name: string;
  category: "school" | "college" | "hospital" | "airport" | "transit" | "landmark";
  distanceKm: number;
  travelMinutes: number;
}

export interface ProjectBase {
  id: string;
  slug: string;
  name: string;
  kind: PropertyKind;
  city: string;
  locality: string;
  coordinates: Coordinates;
  summary: string;
  startingPriceInr: number;
  heroMediaId?: string;
  amenityIds: string[];
  nearbyIds: string[];
  featured: boolean;
  demoNotice: string;
}

export interface Plot {
  id: string;
  projectId: string;
  number: string;
  area: Area;
  facing: Facing;
  priceInr: number;
  availability: Availability;
  roadWidthFeet: number;
  dimensionsFeet: { width: number; depth: number };
  geometry: Array<[number, number]>;
}

export interface LandProject extends ProjectBase {
  kind: "land";
  plotIds: string[];
  totalArea: Area;
  approvalLabel: string;
}

export interface Flat {
  id: string;
  projectId: string;
  towerId: string;
  floorId: string;
  unitNumber: string;
  bhk: 1 | 2 | 3 | 4 | 5;
  carpetArea: Area;
  builtUpArea: Area;
  facing: Facing;
  bedrooms: number;
  bathrooms: number;
  balconies: number;
  hasUtilityRoom: boolean;
  parkingSpaces: number;
  priceInr: number;
  maintenanceMonthlyInr: number;
  availability: Availability;
}

export interface Floor {
  id: string;
  towerId: string;
  number: number;
  label: string;
  flatIds: string[];
}

export interface Tower {
  id: string;
  projectId: string;
  name: string;
  floors: number;
  floorIds: string[];
}

export interface ApartmentProject extends ProjectBase {
  kind: "apartment";
  towerIds: string[];
  possessionLabel: string;
}

export interface House extends ProjectBase {
  kind: "house";
  bedrooms: number;
  bathrooms: number;
  floors: number;
  builtUpArea: Area;
  plotArea: Area;
  availability: Availability;
  priceInr: number;
}

export interface Villa {
  id: string;
  communityId: string;
  name: string;
  bedrooms: number;
  bathrooms: number;
  builtUpArea: Area;
  plotArea: Area;
  facing: Facing;
  priceInr: number;
  availability: Availability;
}

export interface VillaCommunity extends ProjectBase {
  kind: "villa";
  villaIds: string[];
  totalArea: Area;
}

export type PropertyProject = LandProject | ApartmentProject | House | VillaCommunity;

export interface DemoDatabase {
  amenities: Record<string, Amenity>;
  locationPoints: Record<string, LocationPoint>;
  media: Record<string, MediaAsset>;
  landProjects: Record<string, LandProject>;
  plots: Record<string, Plot>;
  apartmentProjects: Record<string, ApartmentProject>;
  towers: Record<string, Tower>;
  floors: Record<string, Floor>;
  flats: Record<string, Flat>;
  houses: Record<string, House>;
  villaCommunities: Record<string, VillaCommunity>;
  villas: Record<string, Villa>;
}
