import { lazy, Suspense, useState } from "react";
import { Box, Grid2X2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { floorPlanRooms } from "@/features/floor-plan/floor-plan-data";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const FloorPlanScene = lazy(() => import("@/features/floor-plan/floor-plan-scene"));

export function FloorPlanExperience() {
  const reducedMotion = useReducedMotion();
  const [mode, setMode] = useState<"2d" | "3d">(reducedMotion ? "2d" : "3d");
  const [selectedId, setSelectedId] = useState("living");
  const [sceneKey, setSceneKey] = useState(0);
  const selected = floorPlanRooms.find((room) => room.id === selectedId)!;
  return <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_22rem]">
    <Card className="overflow-hidden"><div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-3"><div><p className="text-sm font-semibold text-foreground">Interactive floor plan</p><p className="text-xs text-muted">Select rooms · Orbit and zoom in 3D</p></div><div className="flex gap-1"><Button size="sm" variant={mode === "2d" ? "primary" : "ghost"} onClick={() => setMode("2d")}><Grid2X2 aria-hidden="true" size={15} />2D</Button><Button size="sm" variant={mode === "3d" ? "primary" : "ghost"} onClick={() => setMode("3d")} disabled={reducedMotion}><Box aria-hidden="true" size={15} />3D</Button><Button size="icon" variant="ghost" aria-label="Reset floor-plan camera and room" onClick={() => { setSelectedId("living"); setSceneKey((key) => key + 1); }}><RotateCcw aria-hidden="true" size={16} /></Button></div></div>
      <div className="h-[32rem] sm:h-[40rem]">{mode === "3d" ? <Suspense fallback={<Skeleton className="h-full rounded-none" />}><FloorPlanScene key={sceneKey} rooms={floorPlanRooms} selectedId={selectedId} onSelect={setSelectedId} /></Suspense> : <TwoDimensionalPlan selectedId={selectedId} onSelect={setSelectedId} />}</div>
      <div className="border-t border-border p-4"><p className="text-xs text-muted">Simplified demonstration geometry. Room shapes, sizes, furniture, and walls are not construction drawings.</p><div className="mt-3 flex flex-wrap gap-2">{floorPlanRooms.map((room) => <button key={room.id} type="button" onClick={() => setSelectedId(room.id)} className={`rounded border px-3 py-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${room.id === selectedId ? "border-selected bg-selected/10 text-foreground" : "border-border text-muted hover:border-gold hover:text-foreground"}`}>{room.name}</button>)}</div></div>
    </Card>
    <aside className="xl:sticky xl:top-24 xl:self-start"><Card className="p-6"><span className="block size-8 rounded" style={{ backgroundColor: selected.color }} aria-hidden="true" /><p className="mt-6 eyebrow">Selected room</p><h2 className="mt-2 font-display text-3xl text-foreground">{selected.name}</h2><p className="mt-3 text-sm leading-6 text-muted">{selected.description}</p><dl className="mt-6 border-y border-border py-4"><div className="flex justify-between text-sm"><dt className="text-muted">Illustrative area</dt><dd className="font-semibold tabular-nums text-foreground">{selected.areaSqFt} sq. ft.</dd></div></dl><p className="mt-5 text-xs leading-5 text-muted">Use the room controls outside the canvas for full keyboard access.</p></Card></aside>
  </div>;
}

function TwoDimensionalPlan({ selectedId, onSelect }: { selectedId: string; onSelect: (id: string) => void }) {
  const boxes: Record<string, string> = { living: "left-[25%] top-[26%] h-[36%] w-[42%]", kitchen: "left-[6%] top-[26%] h-[36%] w-[17%]", master: "left-[52%] top-[65%] h-[27%] w-[28%]", "bedroom-2": "left-[22%] top-[65%] h-[27%] w-[25%]", bathroom: "left-[70%] top-[32%] h-[22%] w-[16%]", balcony: "left-[28%] top-[7%] h-[14%] w-[51%]" };
  return <div className="relative h-full bg-[#e8e1d2] p-4 sm:p-8"><div className="relative mx-auto h-full max-w-4xl border-[12px] border-[#718096] bg-[#c8c0b0]">{floorPlanRooms.map((room) => <button key={room.id} type="button" onClick={() => onSelect(room.id)} className={`absolute grid place-items-center border-2 p-2 text-center transition-all focus-visible:z-10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-selected ${boxes[room.id]} ${selectedId === room.id ? "z-10 border-selected scale-[1.02] shadow-lg" : "border-white/80 hover:border-gold"}`} style={{ backgroundColor: room.color }}><span className="text-xs font-bold text-[#0a192f] sm:text-sm">{room.name}</span></button>)}</div></div>;
}
