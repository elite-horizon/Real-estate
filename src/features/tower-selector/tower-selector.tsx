import { lazy, Suspense, useState } from "react";
import { Box, Building2, RotateCcw } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { countAvailability, getTowerFlats } from "@/data/queries";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { ApartmentProject, Tower } from "@/types/property";

const TowerScene = lazy(() => import("@/features/tower-selector/tower-scene"));

export function TowerSelector({ project, towers }: { project: ApartmentProject; towers: Tower[] }) {
  const [params, setParams] = useSearchParams();
  const reducedMotion = useReducedMotion();
  const [mode, setMode] = useState<"3d" | "2d">(reducedMotion ? "2d" : "3d");
  const selectedId = params.get("tower") ?? towers[0]?.id;
  const selected = towers.find((tower) => tower.id === selectedId) ?? towers[0];

  function selectTower(id: string) {
    const next = new URLSearchParams(params);
    next.set("tower", id);
    setParams(next, { replace: true });
  }

  return <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_22rem]">
    <Card className="overflow-hidden"><div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-3"><div><p className="text-sm font-semibold text-foreground">Tower selection</p><p className="text-xs text-muted">Drag to rotate · Scroll or pinch to zoom</p></div><div className="flex gap-1"><Button size="sm" variant={mode === "3d" ? "primary" : "ghost"} onClick={() => setMode("3d")} disabled={reducedMotion}><Box aria-hidden="true" size={15} />3D</Button><Button size="sm" variant={mode === "2d" ? "primary" : "ghost"} onClick={() => setMode("2d")}><Building2 aria-hidden="true" size={15} />2D</Button><Button size="icon" variant="ghost" aria-label="Reset tower selection" onClick={() => towers[0] && selectTower(towers[0].id)}><RotateCcw aria-hidden="true" size={16} /></Button></div></div>
      <div className="h-[30rem] bg-[#e8e1d2] sm:h-[36rem]">{mode === "3d" ? <Suspense fallback={<Skeleton className="h-full w-full rounded-none" />}><TowerScene towers={towers} selectedId={selected?.id} onSelect={selectTower} /></Suspense> : <div className="flex h-full items-end justify-center gap-8 overflow-hidden p-8">{towers.map((tower, index) => <button key={tower.id} type="button" onClick={() => selectTower(tower.id)} className={`relative w-36 border-2 transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-selected ${tower.id === selected?.id ? "border-gold bg-gold/25" : "border-[#60758a] bg-white/60 hover:border-gold"}`} style={{ height: `${58 + index * 10}%` }} aria-label={`Select ${tower.name}`}><span className="absolute inset-x-3 top-4 font-display text-xl text-[#0a192f]">{tower.name}</span>{Array.from({ length: tower.floors }, (_, floor) => <span key={floor} className="mx-3 mt-3 block h-5 border border-[#60758a]/40 bg-[#60758a]/25" />)}</button>)}</div>}</div>
      <div className="border-t border-border p-4"><p className="text-xs text-muted">3D is an illustrative selector built from simplified geometry. Use the tower buttons below for a keyboard-first alternative.</p><div className="mt-3 grid gap-2 sm:grid-cols-2">{towers.map((tower) => { const inventory = countAvailability(getTowerFlats(tower)); return <button key={tower.id} type="button" onClick={() => selectTower(tower.id)} className={`flex items-center justify-between rounded border p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${tower.id === selected?.id ? "border-selected bg-selected/10" : "border-border bg-surface hover:border-gold/50"}`}><span><strong className="text-sm text-foreground">{tower.name}</strong><span className="mt-1 block text-xs text-muted">{tower.floors} floors · {inventory.available} available</span></span><Building2 className="text-gold-strong" aria-hidden="true" size={19} /></button>; })}</div></div>
    </Card>
    <aside className="xl:sticky xl:top-24 xl:self-start">{selected && <Card className="p-6"><p className="eyebrow">Selected tower</p><h2 className="mt-3 font-display text-3xl text-foreground">{selected.name}</h2><p className="mt-3 text-sm leading-6 text-muted">Review its floor stack, residence inventory, and individual floor layouts.</p><dl className="mt-6 grid grid-cols-2 gap-4 border-y border-border py-5"><div><dt className="text-xs text-muted">Floors</dt><dd className="mt-1 font-semibold text-foreground">{selected.floors}</dd></div><div><dt className="text-xs text-muted">Available</dt><dd className="mt-1 font-semibold text-success">{countAvailability(getTowerFlats(selected)).available}</dd></div></dl><Button className="mt-6 w-full" asChild><Link to={`/apartments/${project.id}/towers/${selected.id}`}>View {selected.name}</Link></Button></Card>}</aside>
  </div>;
}
