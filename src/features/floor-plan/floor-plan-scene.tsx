import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import type { FloorPlanRoom } from "@/features/floor-plan/floor-plan-data";

function Room({ room, selected, onSelect }: { room: FloorPlanRoom; selected: boolean; onSelect: () => void }) {
  const [x, z] = room.position;
  const [width, depth] = room.size;
  const wallHeight = 0.8;
  return <group position={[x, 0, z]} onClick={(event) => { event.stopPropagation(); onSelect(); }}>
    <mesh position={[0, 0.04, 0]}><boxGeometry args={[width, 0.08, depth]} /><meshStandardMaterial color={selected ? "#c5a059" : room.color} roughness={0.82} /></mesh>
    <mesh position={[0, wallHeight / 2, -depth / 2]}><boxGeometry args={[width, wallHeight, 0.09]} /><meshStandardMaterial color="#f1ede4" /></mesh>
    <mesh position={[-width / 2, wallHeight / 2, 0]}><boxGeometry args={[0.09, wallHeight, depth]} /><meshStandardMaterial color="#f1ede4" /></mesh>
    <mesh position={[width / 2, wallHeight / 2, 0]}><boxGeometry args={[0.09, wallHeight, depth]} /><meshStandardMaterial color="#f1ede4" /></mesh>
    {room.id.includes("bedroom") || room.id === "master" ? <mesh position={[0, 0.18, 0]}><boxGeometry args={[1.4, 0.28, 1.9]} /><meshStandardMaterial color="#766b5d" /></mesh> : null}
    {room.id === "living" ? <><mesh position={[-1.1, 0.2, 0.45]}><boxGeometry args={[1.8, 0.32, 0.75]} /><meshStandardMaterial color="#786d60" /></mesh><mesh position={[1.2, 0.18, -0.5]}><boxGeometry args={[1.3, 0.28, 0.75]} /><meshStandardMaterial color="#8f826f" /></mesh></> : null}
    {room.id === "kitchen" ? <><mesh position={[-0.7, 0.32, 0]}><boxGeometry args={[0.45, 0.6, 2.2]} /><meshStandardMaterial color="#6c7d73" /></mesh><mesh position={[0.7, 0.32, 0]}><boxGeometry args={[0.45, 0.6, 2.2]} /><meshStandardMaterial color="#6c7d73" /></mesh></> : null}
  </group>;
}

export default function FloorPlanScene({ rooms, selectedId, onSelect }: { rooms: FloorPlanRoom[]; selectedId: string; onSelect: (id: string) => void }) {
  return <Canvas dpr={[1, 1.5]} camera={{ position: [10, 11, 12], fov: 38 }} gl={{ antialias: true, powerPreference: "high-performance" }}>
    <color attach="background" args={["#17283a"]} /><ambientLight intensity={1.8} /><directionalLight position={[8, 12, 6]} intensity={2.4} /><directionalLight position={[-6, 4, -5]} color="#c5a059" intensity={0.7} />
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.03, 0]}><planeGeometry args={[18, 15]} /><meshStandardMaterial color="#24394c" /></mesh>
    {rooms.map((room) => <Room key={room.id} room={room} selected={room.id === selectedId} onSelect={() => onSelect(room.id)} />)}
    <OrbitControls makeDefault enablePan={false} minDistance={10} maxDistance={22} minPolarAngle={Math.PI / 5} maxPolarAngle={Math.PI / 2.05} target={[0, 0, 0]} />
  </Canvas>;
}
