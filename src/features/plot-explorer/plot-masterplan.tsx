import { useMemo, useState } from "react";
import { Compass, LocateFixed, Minus, Plus, Search } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { AvailabilityBadge } from "@/components/availability-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { formatArea, formatFacing, formatPrice } from "@/lib/formatters";
import type { Availability, LandProject, Plot } from "@/types/property";

const plotColors: Record<Availability, string> = { available: "#059669", reserved: "#b7791f", sold: "#b42318" };

function matchesPlot(plot: Plot, params: URLSearchParams) {
  const query = (params.get("search") ?? "").toLowerCase();
  const status = params.get("status") ?? "all";
  const facing = params.get("facing") ?? "all";
  const maxArea = Number(params.get("maxArea") ?? 0);
  const maxPrice = Number(params.get("maxPrice") ?? 0);
  return (!query || plot.number.toLowerCase().includes(query)) && (status === "all" || plot.availability === status) && (facing === "all" || plot.facing === facing) && (!maxArea || plot.area.value <= maxArea) && (!maxPrice || plot.priceInr <= maxPrice);
}

export function PlotMasterplan({ project, plots }: { project: LandProject; plots: Plot[] }) {
  const [params, setParams] = useSearchParams();
  const [zoom, setZoom] = useState(1);
  const [filterNotice, setFilterNotice] = useState("");
  const selectedId = params.get("plot");
  const selected = plots.find((plot) => plot.id === selectedId);
  const filtered = useMemo(() => plots.filter((plot) => matchesPlot(plot, params)), [plots, params]);

  function updateParam(key: string, value: string) {
    const next = new URLSearchParams(params);
    if (!value || value === "all" || value === "0") next.delete(key); else next.set(key, value);
    if (selected && !matchesPlot(selected, next)) {
      next.delete("plot");
      setFilterNotice(`Plot ${selected.number} was cleared because it does not match the new filters.`);
    } else setFilterNotice("");
    setParams(next, { replace: true });
  }

  function selectPlot(plot: Plot) {
    const next = new URLSearchParams(params);
    next.set("plot", plot.id);
    setParams(next, { replace: true });
    setFilterNotice("");
  }

  return <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_23rem]">
    <div className="min-w-0">
      <Card className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-5" aria-label="Masterplan filters">
        <label className="relative"><span className="sr-only">Search plot number</span><Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" size={16} /><Input className="pl-10" placeholder="Plot number" value={params.get("search") ?? ""} onChange={(event) => updateParam("search", event.target.value)} /></label>
        <label><span className="sr-only">Availability</span><Select value={params.get("status") ?? "all"} onChange={(event) => updateParam("status", event.target.value)}><option value="all">Every status</option><option value="available">Available</option><option value="reserved">Reserved</option><option value="sold">Sold</option></Select></label>
        <label><span className="sr-only">Facing</span><Select value={params.get("facing") ?? "all"} onChange={(event) => updateParam("facing", event.target.value)}><option value="all">Every facing</option><option value="north">North</option><option value="east">East</option><option value="west">West</option><option value="north-east">North-East</option><option value="south-east">South-East</option></Select></label>
        <label><span className="sr-only">Maximum plot area</span><Select value={params.get("maxArea") ?? "all"} onChange={(event) => updateParam("maxArea", event.target.value)}><option value="all">Any area</option><option value="1200">Up to 1,200 sq. ft.</option><option value="1500">Up to 1,500 sq. ft.</option><option value="1800">Up to 1,800 sq. ft.</option></Select></label>
        <label><span className="sr-only">Maximum price</span><Select value={params.get("maxPrice") ?? "all"} onChange={(event) => updateParam("maxPrice", event.target.value)}><option value="all">Any price</option><option value="5500000">Up to ₹55 L</option><option value="7000000">Up to ₹70 L</option><option value="9000000">Up to ₹90 L</option></Select></label>
      </Card>
      {filterNotice && <p className="mt-3 rounded border border-reserved/30 bg-reserved/10 px-3 py-2 text-xs text-reserved" role="status">{filterNotice}</p>}
      <Card className="mt-5 overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-3"><div className="flex flex-wrap gap-2"><Badge variant="available">Available</Badge><Badge variant="reserved">Reserved</Badge><Badge variant="sold">Sold</Badge><Badge variant="selected">Selected</Badge></div><div className="flex items-center gap-1"><Compass className="mr-2 text-gold-strong" aria-label="North is up" size={22} /><Button size="icon" variant="ghost" aria-label="Zoom out" onClick={() => setZoom((value) => Math.max(1, value - 0.25))} disabled={zoom === 1}><Minus aria-hidden="true" size={17} /></Button><span className="min-w-12 text-center text-xs font-semibold tabular-nums text-muted">{Math.round(zoom * 100)}%</span><Button size="icon" variant="ghost" aria-label="Zoom in" onClick={() => setZoom((value) => Math.min(2, value + 0.25))} disabled={zoom === 2}><Plus aria-hidden="true" size={17} /></Button><Button size="icon" variant="ghost" aria-label="Reset map zoom" onClick={() => setZoom(1)}><LocateFixed aria-hidden="true" size={17} /></Button></div></div>
        <div className="max-h-[42rem] overflow-auto bg-[#e8e1d2] p-3 sm:p-6" aria-label="Scrollable masterplan viewport">
          <svg viewBox="0 0 800 570" role="img" aria-labelledby="masterplan-title masterplan-description" style={{ width: `${zoom * 100}%`, minWidth: 720 }}>
            <title id="masterplan-title">Interactive masterplan for {project.name}</title><desc id="masterplan-description">A fictional schematic showing roads and selectable plots. North is at the top.</desc>
            <rect x="20" y="20" width="760" height="530" rx="12" fill="#d7cfbc" stroke="#8f846f" strokeWidth="3" />
            <path d="M35 235 H765 M345 35 V535" stroke="#f5f1e7" strokeWidth="46" /><path d="M35 235 H765 M345 35 V535" stroke="#a89d88" strokeWidth="2" strokeDasharray="12 10" />
            <rect x="370" y="260" width="360" height="220" rx="20" fill="#b8c9aa" stroke="#71866b" strokeWidth="2" /><text x="550" y="365" textAnchor="middle" fill="#40523d" fontSize="18" fontWeight="700">COMMUNITY GREEN</text><text x="550" y="390" textAnchor="middle" fill="#52654e" fontSize="12">Illustrative recreation precinct</text>
            <g>{filtered.map((plot) => {
              const points = plot.geometry.map(([x, y]) => `${x * 6 + 45},${y * 6 + 45}`).join(" ");
              const isSelected = selected?.id === plot.id;
              const centerX = plot.geometry.reduce((sum, [x]) => sum + x, 0) / plot.geometry.length * 6 + 45;
              const centerY = plot.geometry.reduce((sum, [, y]) => sum + y, 0) / plot.geometry.length * 6 + 45;
              return <g key={plot.id} role="button" tabIndex={0} aria-label={`Plot ${plot.number}, ${formatArea(plot.area)}, ${plot.availability}`} onClick={() => selectPlot(plot)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); selectPlot(plot); } }} className="cursor-pointer outline-none focus-visible:[&_polygon]:stroke-selected focus-visible:[&_polygon]:stroke-[5]">
                <polygon points={points} fill={isSelected ? "#2563eb" : plotColors[plot.availability]} fillOpacity={isSelected ? 0.9 : 0.72} stroke={isSelected ? "#1d4ed8" : "#ffffff"} strokeWidth={isSelected ? 4 : 2} className="transition-[fill-opacity,stroke-width] hover:fill-opacity-100" />
                <text x={centerX} y={centerY + 4} textAnchor="middle" fill="white" fontSize="11" fontWeight="700" pointerEvents="none">{plot.number}</text>
              </g>;
            })}</g>
            <text x="65" y="530" fill="#6b6253" fontSize="12">SCHEMATIC ONLY · NOT A SURVEY DRAWING</text><path d="M735 90 V45 M735 45 l-8 14 M735 45 l8 14" stroke="#0a192f" strokeWidth="3" /><text x="735" y="36" textAnchor="middle" fill="#0a192f" fontWeight="700">N</text>
          </svg>
        </div>
      </Card>
      <div className="mt-5"><p className="text-sm text-muted"><strong className="text-foreground">{filtered.length}</strong> of {plots.length} plots match the current filters.</p><div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{filtered.map((plot) => <button key={plot.id} type="button" onClick={() => selectPlot(plot)} className={`flex items-center justify-between rounded border p-3 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${selected?.id === plot.id ? "border-selected bg-selected/10" : "border-border bg-surface hover:border-gold/50"}`}><span><strong className="text-foreground">Plot {plot.number}</strong><span className="mt-1 block text-xs text-muted">{formatArea(plot.area)} · {formatFacing(plot.facing)}</span></span><AvailabilityBadge status={plot.availability} /></button>)}</div></div>
    </div>
    <aside className="xl:sticky xl:top-24 xl:self-start">{selected ? <Card className="p-6"><div className="flex items-start justify-between gap-3"><div><p className="eyebrow">Selected plot</p><h2 className="mt-2 font-display text-3xl text-foreground">Plot {selected.number}</h2></div><AvailabilityBadge status={selected.availability} /></div><dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-5 border-y border-border py-5"><div><dt className="text-xs text-muted">Area</dt><dd className="mt-1 font-semibold text-foreground">{formatArea(selected.area)}</dd></div><div><dt className="text-xs text-muted">Facing</dt><dd className="mt-1 font-semibold text-foreground">{formatFacing(selected.facing)}</dd></div><div><dt className="text-xs text-muted">Road width</dt><dd className="mt-1 font-semibold text-foreground">{selected.roadWidthFeet} ft</dd></div><div><dt className="text-xs text-muted">Price</dt><dd className="mt-1 font-semibold text-foreground">{formatPrice(selected.priceInr)}</dd></div></dl><Button className="mt-6 w-full" asChild><Link to={`/lands/${project.id}/plots/${selected.id}`}>View plot details</Link></Button></Card> : <Card className="p-6 text-center"><span className="mx-auto grid size-12 place-items-center rounded border border-gold/30 text-gold-strong"><LocateFixed aria-hidden="true" size={22} /></span><h2 className="mt-5 font-display text-2xl text-foreground">Select a plot</h2><p className="mt-3 text-sm leading-6 text-muted">Choose a polygon or inventory row to review its area, facing, price, and availability.</p></Card>}</aside>
  </div>;
}
