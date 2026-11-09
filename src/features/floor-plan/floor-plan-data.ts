export interface FloorPlanRoom {
  id: string;
  name: string;
  areaSqFt: number;
  position: [number, number];
  size: [number, number];
  color: string;
  description: string;
}

export const floorPlanRooms: FloorPlanRoom[] = [
  { id: "living", name: "Living & Dining", areaSqFt: 320, position: [0, 0.4], size: [4.8, 3.6], color: "#d9c79f", description: "A combined social space opening toward the primary balcony." },
  { id: "kitchen", name: "Kitchen", areaSqFt: 128, position: [-3.4, 0.4], size: [2, 3], color: "#b7c9bd", description: "A fitted kitchen with parallel worktops and utility access." },
  { id: "master", name: "Master Bedroom", areaSqFt: 210, position: [2.5, -3], size: [3.2, 2.7], color: "#b7bfd2", description: "Primary bedroom with wardrobe wall and private bathroom access." },
  { id: "bedroom-2", name: "Bedroom 2", areaSqFt: 165, position: [-1.4, -3], size: [2.8, 2.7], color: "#c9b7c8", description: "Secondary bedroom sized for a queen bed and study ledge." },
  { id: "bathroom", name: "Bathroom", areaSqFt: 72, position: [4, 0.4], size: [1.5, 2], color: "#a9c8d1", description: "Shared bathroom with separated wet and dry zones." },
  { id: "balcony", name: "Balcony", areaSqFt: 110, position: [0.5, 3.1], size: [5.8, 1.1], color: "#b8c9aa", description: "A broad outdoor edge connected to the living room." },
];
