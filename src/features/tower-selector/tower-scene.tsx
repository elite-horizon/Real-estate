import { useState } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import type { Tower } from "@/types/property";

function TowerGeometry({ tower, index, selected, onSelect }: { tower: Tower; index: number; selected: boolean; onSelect: () => void }) {
  const [hovered, setHovered] = useState(false);
  const height = tower.floors * 0.85;
  const x = index === 0 ? -2.1 : 2.1;
  const color = selected ? "#c5a059" : hovered ? "#d8c79f" : "#d7dde2";
  return <group position={[x, 0, 0]} onClick={(event) => { event.stopPropagation(); onSelect(); }} onPointerEnter={(event) => { event.stopPropagation(); setHovered(true); document.body.style.cursor = "pointer"; }} onPointerLeave={() => { setHovered(false); document.body.style.cursor = "auto"; }}>
    <mesh position={[0, height / 2, 0]}>
      <boxGeometry args={[2.6, height, 2]} />
      <meshStandardMaterial color={color} roughness={0.68} metalness={0.08} />
    </mesh>
    {Array.from({ length: tower.floors }, (_, floor) => <mesh key={floor} position={[0, floor * 0.85 + 0.45, 1.015]}><boxGeometry args={[2.15, 0.48, 0.04]} /><meshStandardMaterial color={selected ? "#0a192f" : "#60758a"} /></mesh>)}
    <mesh position={[0, 0.08, 0]}><boxGeometry args={[3.1, 0.16, 2.5]} /><meshStandardMaterial color="#8b806d" /></mesh>
  </group>;
}

export default function TowerScene({ towers, selectedId, onSelect }: { towers: Tower[]; selectedId?: string; onSelect: (id: string) => void }) {
  return <Canvas dpr={[1, 1.5]} camera={{ position: [9, 7, 11], fov: 40 }} gl={{ antialias: true, powerPreference: "high-performance" }}>
    <color attach="background" args={["#e8e1d2"]} />
    <ambientLight intensity={1.5} />
    <directionalLight position={[6, 10, 5]} intensity={2.2} />
    <directionalLight position={[-5, 4, -4]} intensity={0.8} color="#c5a059" />
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}><planeGeometry args={[22, 18]} /><meshStandardMaterial color="#c8c0b0" roughness={1} /></mesh>
    {towers.map((tower, index) => <TowerGeometry key={tower.id} tower={tower} index={index} selected={tower.id === selectedId} onSelect={() => onSelect(tower.id)} />)}
    <OrbitControls makeDefault enablePan={false} minDistance={8} maxDistance={18} minPolarAngle={Math.PI / 5} maxPolarAngle={Math.PI / 2.15} target={[0, 1.8, 0]} />
  </Canvas>;
}
