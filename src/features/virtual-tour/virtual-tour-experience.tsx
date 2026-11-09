import { lazy, Suspense, useRef } from "react";
import { Expand, ImageIcon, RotateCcw } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { tourRooms } from "@/features/virtual-tour/tour-data";

const MarzipanoViewer = lazy(() => import("@/features/virtual-tour/marzipano-viewer"));

export function VirtualTourExperience() {
  const [params, setParams] = useSearchParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const roomId = params.get("room") ?? "living";
  const room = tourRooms.find((item) => item.id === roomId) ?? tourRooms[0]!;
  const hasPanorama = Boolean(room.panorama);

  function selectRoom(id: string) {
    const next = new URLSearchParams(params);
    next.set("room", id);
    setParams(next, { replace: true });
  }

  async function enterFullscreen() {
    if (containerRef.current?.requestFullscreen) await containerRef.current.requestFullscreen();
  }

  return <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_21rem]">
    <Card className="overflow-hidden"><div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-3"><div><p className="text-sm font-semibold text-foreground">{hasPanorama ? "360° room viewer" : "Room concept gallery"}</p><p className="text-xs text-muted">{hasPanorama ? "Drag to look around · Scroll or pinch to zoom" : "Standard images · Explicit non-360 fallback"}</p></div><div className="flex gap-1"><Button size="icon" variant="ghost" aria-label="Return to living room" onClick={() => selectRoom("living")}><RotateCcw aria-hidden="true" size={16} /></Button><Button size="icon" variant="ghost" aria-label="View fullscreen" onClick={enterFullscreen}><Expand aria-hidden="true" size={16} /></Button></div></div>
      <div ref={containerRef} className="relative h-[30rem] bg-navy-950 sm:h-[40rem]">{hasPanorama ? <Suspense fallback={<Skeleton className="h-full rounded-none" />}><MarzipanoViewer room={room} /></Suspense> : <><img className="h-full w-full object-cover" src={room.galleryImage.src} alt={`${room.galleryImage.alt}. Standard concept image, not a 360-degree panorama.`} /><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/15" aria-hidden="true" /><div className="absolute bottom-5 left-5 right-5"><span className="inline-flex items-center gap-2 rounded border border-white/25 bg-black/35 px-3 py-2 text-xs font-semibold text-white backdrop-blur"><ImageIcon aria-hidden="true" size={15} />Concept image · Not 360°</span><h2 className="mt-3 font-display text-3xl text-white">{room.name}</h2></div>{room.hotspots.map((hotspot) => <button key={hotspot.targetRoomId} type="button" onClick={() => selectRoom(hotspot.targetRoomId)} className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/70 bg-black/55 px-3 py-2 text-xs font-semibold text-white shadow-lg backdrop-blur transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold" style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}>{hotspot.label}</button>)}</>}</div>
      <div className="border-t border-border p-4"><div className="flex gap-2 overflow-x-auto pb-1">{tourRooms.map((item) => <button key={item.id} type="button" onClick={() => selectRoom(item.id)} className={`min-w-max rounded border px-3 py-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${item.id === room.id ? "border-selected bg-selected/10 text-foreground" : "border-border text-muted hover:border-gold hover:text-foreground"}`}>{item.name}</button>)}</div></div>
    </Card>
    <aside className="xl:sticky xl:top-24 xl:self-start"><Card className="p-6"><p className="eyebrow">Current room</p><h2 className="mt-2 font-display text-3xl text-foreground">{room.name}</h2><p className="mt-3 text-sm leading-6 text-muted">{room.description}</p><dl className="mt-6 border-y border-border py-4 text-sm"><div className="flex justify-between gap-4"><dt className="text-muted">Experience</dt><dd className="font-semibold text-foreground">{hasPanorama ? "True panorama" : "Gallery fallback"}</dd></div><div className="mt-3 flex justify-between gap-4"><dt className="text-muted">Image source</dt><dd className="text-right font-semibold text-foreground">{room.galleryImage.credit}</dd></div></dl><p className="mt-5 text-xs leading-5 text-muted">A Marzipano viewer is ready to activate when licensed equirectangular panorama assets are supplied.</p></Card></aside>
  </div>;
}
