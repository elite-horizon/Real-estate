import { demoDatabase } from "@/data/demo-database";
import type { MediaAsset } from "@/types/property";

export interface TourHotspot { label: string; targetRoomId: string; x: number; y: number }
export interface TourRoom { id: string; name: string; description: string; galleryImage: MediaAsset; panorama?: MediaAsset; hotspots: TourHotspot[] }

const image = (id: string) => demoDatabase.media[id]!;

export const tourRooms: TourRoom[] = [
  { id: "living", name: "Living Room", description: "An illustrative social space with broad glazing and a calm material palette.", galleryImage: image("architecture-golf"), hotspots: [{ label: "Continue to kitchen", targetRoomId: "kitchen", x: 77, y: 62 }, { label: "Step onto balcony", targetRoomId: "balcony", x: 52, y: 42 }] },
  { id: "kitchen", name: "Kitchen", description: "A concept kitchen emphasizing worktop continuity, concealed storage, and utility access.", galleryImage: image("architecture-courtyard"), hotspots: [{ label: "Return to living room", targetRoomId: "living", x: 22, y: 58 }, { label: "Enter master bedroom", targetRoomId: "master-bedroom", x: 78, y: 45 }] },
  { id: "master-bedroom", name: "Master Bedroom", description: "A fictional primary suite with framed views and a restrained, restful character.", galleryImage: image("architecture-lakeside"), hotspots: [{ label: "Open bathroom", targetRoomId: "bathroom", x: 74, y: 60 }, { label: "Return to kitchen", targetRoomId: "kitchen", x: 20, y: 48 }] },
  { id: "bathroom", name: "Bathroom", description: "An illustrative wet-area concept; the image is not a representation of the final room.", galleryImage: image("architecture-coast"), hotspots: [{ label: "Return to bedroom", targetRoomId: "master-bedroom", x: 18, y: 55 }] },
  { id: "balcony", name: "Balcony", description: "A concept outdoor edge that extends the living space toward the view.", galleryImage: image("architecture-coast"), hotspots: [{ label: "Return to living room", targetRoomId: "living", x: 24, y: 60 }] },
];
