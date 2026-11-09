import type { Amenity, ApartmentProject, Availability, DemoDatabase, Facing, Flat, Floor, House, LandProject, LocationPoint, MediaAsset, Plot, Tower, Villa, VillaCommunity } from "@/types/property";

const demoNotice = "Fictional demonstration data — not a verified listing or sales offer.";

const media: MediaAsset[] = [
  { id: "architecture-coast", kind: "image", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDOGkSi8h6F1AduopzQVrXzWGhemu-W23l6s8UieTTVLBl-CSo6u7fcsPWELIV6kw_9jFQY6ZDAZH_lkerv8NsfPeqFapkG0onbWMRIEwYWxyXnunRgPD4DcMNMTysktP5L_NfrfjL1Ci-32oVdR5rxJFK5nPa8_VXV7IuxsZusEYq9mVC75jY8SsBpQd7ZngjOBsNKykTr7FysewwHNhirhpra_Btd_yym5N9_NHQ", alt: "Illustrative coastal penthouse terrace at golden hour", credit: "Generated with Google Stitch", license: "Prototype use" },
  { id: "architecture-courtyard", kind: "image", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVm9gsqXm6RAW-rk4rGPc1GKzXhi7oyglfGt_uI6SdNYWad6LqIkQItuCgJqMOZlrWPJ3SwxMrtSzFjKtJ2Sl0AKkgk2KmfOWYBSw_BjOL5_CBs_QZiF0lg_v3gXbISNtTQxRl-yupJYaSV5faX4C3zhF6guYggakv0QxMWmdFjgaCDBYc-2SI-3g2SJgpa3D8fSa8IV2G1NrQrG3XGnu2CYgo3wMz1pFqz30ojLI", alt: "Illustrative modern courtyard villa with tropical landscape", credit: "Generated with Google Stitch", license: "Prototype use" },
  { id: "architecture-golf", kind: "image", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDNIka1Ec1O6wcX5Juqukjhy46063Uuus0AYma9gxRC3KEzo57AMSyDfzctIJLUowSwt9sxOoolxfy5xMuIz2PsFxi47XnAu9BggORoAIM0VqOK-EDUH5a8Hj-ViH8VQttAPpdg9zZZxUpdYpiU_yRYzOI7Z7hbfDQ5taoV2ZdYJNFDWvX6u4MG2H0zIDk-gYTiIN4kwXHDiHYCHuSucCLCKhTMPy6zA8yr3Yurx68", alt: "Illustrative high-rise residence overlooking a golf course", credit: "Generated with Google Stitch", license: "Prototype use" },
  { id: "architecture-lakeside", kind: "image", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUMUnVHUyIPueM8zq_cCT_Rgf6u3ypiul7rClTYCPYYVbWXqYLkCa5Tuyozg_y7w-ZcaE4syzgQbSmGApafAnqulb6QTe046yaH2C3oZ9pGn77l-xZnAWE2D2LYrMkTQYm2O7V-wKh7adQypOlVyMnDzyjHhPxBKdqG5UaRwg8gavwWg4AfRMLEXFVx4CZzUELDZldopf3qCU2-TqZ5Xz0e7ctJUSb39I0g2OvChQ", alt: "Illustrative lakeside luxury residence at twilight", credit: "Generated with Google Stitch", license: "Prototype use" },
];
const mediaIds = media.map(({ id }) => id);

const amenities: Amenity[] = [
  { id: "clubhouse", name: "Residents’ Club", category: "community", description: "Lounges, event rooms, and private dining for residents." },
  { id: "pool", name: "Lap Pool", category: "wellness", description: "A temperature-controlled pool with shaded deck seating." },
  { id: "gym", name: "Fitness Atelier", category: "wellness", description: "Cardio, strength, and guided movement studios." },
  { id: "sports", name: "Racquet Courts", category: "sport", description: "Multi-use tennis and pickleball courts." },
  { id: "play", name: "Children’s Grove", category: "outdoor", description: "Nature-led play and discovery spaces." },
  { id: "security", name: "Layered Security", category: "security", description: "Controlled entry, visitor management, and monitored common areas." },
  { id: "power", name: "Power Resilience", category: "utility", description: "Backup provision for essential services and common areas." },
  { id: "water", name: "Water Stewardship", category: "utility", description: "Treatment, rainwater collection, and reuse systems." },
];

const locationPoints: LocationPoint[] = [
  { id: "school-a", name: "Aurelia International School", category: "school", distanceKm: 2.4, travelMinutes: 8 },
  { id: "college-a", name: "Northfield Institute", category: "college", distanceKm: 6.8, travelMinutes: 18 },
  { id: "hospital-a", name: "Meridian Medical Centre", category: "hospital", distanceKm: 4.1, travelMinutes: 12 },
  { id: "airport-a", name: "International Airport", category: "airport", distanceKm: 24, travelMinutes: 42 },
  { id: "transit-a", name: "Metro Interchange", category: "transit", distanceKm: 3.2, travelMinutes: 10 },
  { id: "landmark-a", name: "Central Business District", category: "landmark", distanceKm: 11.5, travelMinutes: 28 },
];

const baseLocations = [
  { city: "Bengaluru", locality: "Devanahalli", latitude: 13.245, longitude: 77.711 },
  { city: "Hyderabad", locality: "Kokapet", latitude: 17.396, longitude: 78.337 },
  { city: "Gurugram", locality: "Golf Course Extension", latitude: 28.405, longitude: 77.067 },
  { city: "Pune", locality: "Baner Hills", latitude: 18.56, longitude: 73.779 },
] as const;

const commonAmenityIds = amenities.map(({ id }) => id);
const nearbyIds = locationPoints.map(({ id }) => id);
const statuses: Availability[] = ["available", "available", "available", "reserved", "sold"];
const facings: Facing[] = ["north", "east", "west", "north-east", "south-east"];

const plots: Plot[] = [];
const landProjects: LandProject[] = ["Aurelis Grove", "Sovereign Fields", "Cedar Reserve", "The Meridian Plots"].map((name, projectIndex) => {
  const id = `land-${projectIndex + 1}`;
  const location = baseLocations[projectIndex]!;
  const plotIds = Array.from({ length: 12 }, (_, plotIndex) => {
    const plotId = `${id}-plot-${String(plotIndex + 1).padStart(2, "0")}`;
    const column = plotIndex % 4;
    const row = Math.floor(plotIndex / 4);
    const areaValue = 1200 + (plotIndex % 4) * 300;
    plots.push({
      id: plotId,
      projectId: id,
      number: `${String.fromCharCode(65 + projectIndex)}-${String(plotIndex + 1).padStart(2, "0")}`,
      area: { value: areaValue, unit: "sq-ft" },
      facing: facings[(plotIndex + projectIndex) % facings.length]!,
      priceInr: 4_800_000 + projectIndex * 1_100_000 + plotIndex * 275_000,
      availability: statuses[(plotIndex + projectIndex) % statuses.length]!,
      roadWidthFeet: [30, 40, 50][plotIndex % 3]!,
      dimensionsFeet: { width: 30 + (plotIndex % 3) * 10, depth: 40 + (plotIndex % 2) * 10 },
      geometry: [[column * 12, row * 15], [column * 12 + 10, row * 15], [column * 12 + 10, row * 15 + 12], [column * 12, row * 15 + 12]],
    });
    return plotId;
  });
  return {
    id, slug: id, name, kind: "land", city: location.city, locality: location.locality,
    coordinates: { latitude: location.latitude, longitude: location.longitude },
    summary: "A low-density plotted address shaped by green corridors, walkable streets, and considered community infrastructure.",
    startingPriceInr: 4_800_000 + projectIndex * 1_100_000, heroMediaId: mediaIds[projectIndex % mediaIds.length], amenityIds: commonAmenityIds, nearbyIds,
    featured: projectIndex < 2, demoNotice, plotIds, totalArea: { value: 22 + projectIndex * 4, unit: "acre" },
    approvalLabel: "Illustrative planning approval",
  };
});

const towers: Tower[] = [];
const floors: Floor[] = [];
const flats: Flat[] = [];
const apartmentProjects: ApartmentProject[] = ["Aurelis One", "The Regent Residences", "Skycourt", "Maison 27"].map((name, projectIndex) => {
  const id = `apartment-${projectIndex + 1}`;
  const location = baseLocations[(projectIndex + 1) % baseLocations.length]!;
  const towerIds = Array.from({ length: 2 }, (_, towerIndex) => {
    const towerId = `${id}-tower-${towerIndex + 1}`;
    const floorIds = Array.from({ length: 4 }, (_, floorIndex) => {
      const floorId = `${towerId}-floor-${floorIndex + 1}`;
      const flatIds = Array.from({ length: 4 }, (_, unitIndex) => {
        const flatId = `${floorId}-flat-${unitIndex + 1}`;
        const bhk = (2 + (unitIndex % 3)) as 2 | 3 | 4;
        const carpet = 980 + bhk * 190 + floorIndex * 15;
        flats.push({ id: flatId, projectId: id, towerId, floorId, unitNumber: `${floorIndex + 1}0${unitIndex + 1}`, bhk,
          carpetArea: { value: carpet, unit: "sq-ft" }, builtUpArea: { value: Math.round(carpet * 1.28), unit: "sq-ft" },
          facing: facings[(unitIndex + towerIndex) % facings.length]!, bedrooms: bhk, bathrooms: bhk, balconies: unitIndex % 2 + 1,
          hasUtilityRoom: bhk >= 3, parkingSpaces: bhk >= 4 ? 2 : 1,
          priceInr: 12_500_000 + projectIndex * 3_000_000 + floorIndex * 450_000 + unitIndex * 1_200_000,
          maintenanceMonthlyInr: 6_500 + bhk * 1_250, availability: statuses[(unitIndex + floorIndex + towerIndex) % statuses.length]!,
        });
        return flatId;
      });
      floors.push({ id: floorId, towerId, number: floorIndex + 1, label: `Level ${String(floorIndex + 1).padStart(2, "0")}`, flatIds });
      return floorId;
    });
    towers.push({ id: towerId, projectId: id, name: `Tower ${String.fromCharCode(65 + towerIndex)}`, floors: floorIds.length, floorIds });
    return towerId;
  });
  return { id, slug: id, name, kind: "apartment", city: location.city, locality: location.locality,
    coordinates: { latitude: location.latitude, longitude: location.longitude },
    summary: "An elevated residential collection with framed views, private amenities, and carefully resolved plans.",
    startingPriceInr: 12_500_000 + projectIndex * 3_000_000, heroMediaId: mediaIds[(projectIndex + 2) % mediaIds.length], amenityIds: commonAmenityIds, nearbyIds,
    featured: projectIndex < 2, demoNotice, towerIds, possessionLabel: "Illustrative completion: 2028",
  };
});

const houses: House[] = Array.from({ length: 6 }, (_, index) => {
  const location = baseLocations[index % baseLocations.length]!;
  const bedrooms = 3 + (index % 3);
  return { id: `house-${index + 1}`, slug: `house-${index + 1}`, name: ["Courtyard House", "The Linden Home", "House of Light", "Terrace House", "Garden Atelier", "The Verandah"][index]!,
    kind: "house", city: location.city, locality: location.locality, coordinates: { latitude: location.latitude, longitude: location.longitude },
    summary: "An individual residence balancing private rooms, generous gathering spaces, and a close relationship with landscape.",
    startingPriceInr: 18_000_000 + index * 4_500_000, priceInr: 18_000_000 + index * 4_500_000,
    heroMediaId: mediaIds[(index + 1) % mediaIds.length], amenityIds: ["security", "power", "water", "play"], nearbyIds, featured: index < 2, demoNotice,
    bedrooms, bathrooms: bedrooms + 1, floors: 2 + (index % 2), builtUpArea: { value: 2400 + index * 280, unit: "sq-ft" },
    plotArea: { value: 1800 + index * 220, unit: "sq-ft" }, availability: statuses[index % statuses.length]!,
  };
});

const villas: Villa[] = [];
const villaCommunities: VillaCommunity[] = ["Aurelis Reserve", "Palm Court", "The Equestrian Estate"].map((name, communityIndex) => {
  const id = `villa-community-${communityIndex + 1}`;
  const location = baseLocations[(communityIndex + 2) % baseLocations.length]!;
  const villaIds = Array.from({ length: 5 }, (_, villaIndex) => {
    const villaId = `${id}-villa-${villaIndex + 1}`;
    villas.push({ id: villaId, communityId: id, name: `Villa ${String.fromCharCode(65 + villaIndex)}`, bedrooms: 4 + (villaIndex % 2), bathrooms: 5 + (villaIndex % 2),
      builtUpArea: { value: 3600 + villaIndex * 320, unit: "sq-ft" }, plotArea: { value: 4200 + villaIndex * 450, unit: "sq-ft" },
      facing: facings[(villaIndex + communityIndex) % facings.length]!, priceInr: 42_000_000 + communityIndex * 9_000_000 + villaIndex * 5_500_000,
      availability: statuses[(villaIndex + communityIndex) % statuses.length]!,
    });
    return villaId;
  });
  return { id, slug: id, name, kind: "villa", city: location.city, locality: location.locality,
    coordinates: { latitude: location.latitude, longitude: location.longitude },
    summary: "A private villa community composed around mature landscape, resident rituals, and discreet service.",
    startingPriceInr: 42_000_000 + communityIndex * 9_000_000, heroMediaId: mediaIds[(communityIndex + 1) % mediaIds.length], amenityIds: commonAmenityIds, nearbyIds,
    featured: communityIndex === 0, demoNotice, villaIds, totalArea: { value: 36 + communityIndex * 10, unit: "acre" },
  };
});

function indexById<T extends { id: string }>(items: T[]): Record<string, T> {
  return Object.fromEntries(items.map((item) => [item.id, item]));
}

export const demoDatabase: DemoDatabase = {
  amenities: indexById(amenities), locationPoints: indexById(locationPoints), media: indexById(media),
  landProjects: indexById(landProjects), plots: indexById(plots), apartmentProjects: indexById(apartmentProjects),
  towers: indexById(towers), floors: indexById(floors), flats: indexById(flats), houses: indexById(houses),
  villaCommunities: indexById(villaCommunities), villas: indexById(villas),
};
