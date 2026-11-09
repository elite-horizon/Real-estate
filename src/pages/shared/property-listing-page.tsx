import { useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useLocation, useSearchParams } from "react-router-dom";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { DemoNotice } from "@/components/demo-notice";
import { PropertyCard } from "@/components/property-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { getAllProjects } from "@/data/queries";
import type { PropertyKind } from "@/types/property";

const routeKinds: Record<string, PropertyKind | undefined> = { "/lands": "land", "/apartments": "apartment", "/houses": "house", "/villas": "villa" };
const titles: Record<PropertyKind | "all", { eyebrow: string; title: string; description: string }> = {
  all: { eyebrow: "The complete collection", title: "Find a property with the right shape for your life.", description: "Search the complete fictional portfolio by type, city, project, or locality." },
  land: { eyebrow: "Plotted developments", title: "Begin with the ground beneath it all.", description: "Explore planned communities, plot inventory, dimensions, orientation, and nearby context." },
  apartment: { eyebrow: "Apartment residences", title: "Choose the view, floor, and plan.", description: "Move from project to tower, floor, and individual residence with a clear inventory trail." },
  house: { eyebrow: "Individual houses", title: "A home with its own threshold.", description: "Discover independent residences with considered plans, landscape, and private character." },
  villa: { eyebrow: "Villa communities", title: "Private living, thoughtfully connected.", description: "Explore gated communities through masterplans, individual villas, and shared amenities." },
};

export function PropertyListingPage() {
  const { pathname } = useLocation();
  const [params, setParams] = useSearchParams();
  const fixedKind = routeKinds[pathname];
  const selectedKind = fixedKind ?? (params.get("kind") as PropertyKind | null) ?? "all";
  const city = params.get("city") ?? "all";
  const query = params.get("query") ?? "";
  const content = titles[fixedKind ?? "all"];

  const projects = useMemo(() => getAllProjects().filter((project) => {
    const matchesKind = selectedKind === "all" || project.kind === selectedKind;
    const matchesCity = city === "all" || project.city === city;
    const haystack = `${project.name} ${project.locality} ${project.city}`.toLowerCase();
    return matchesKind && matchesCity && haystack.includes(query.toLowerCase());
  }), [city, query, selectedKind]);

  function updateParam(key: string, value: string) {
    const next = new URLSearchParams(params);
    if (!value || value === "all") next.delete(key); else next.set(key, value);
    setParams(next, { replace: true });
  }

  return (
    <main>
      <section className="border-b border-border bg-surface-subtle">
        <div className="container-page py-14 sm:py-20">
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: fixedKind ? `${fixedKind[0]!.toUpperCase()}${fixedKind.slice(1)}s` : "All properties" }]} />
          <div className="mt-10 max-w-4xl"><p className="eyebrow">{content.eyebrow}</p><h1 className="mt-4 font-display text-4xl font-medium leading-tight tracking-[-0.02em] text-foreground sm:text-5xl lg:text-6xl">{content.title}</h1><p className="mt-5 max-w-2xl text-base leading-7 text-muted">{content.description}</p></div>
          <div className="mt-7"><DemoNotice /></div>
        </div>
      </section>

      <section className="container-page py-10 sm:py-14">
        <Card className="grid gap-3 p-4 md:grid-cols-[1.4fr_0.8fr_0.8fr_auto]" aria-label="Property filters">
          <label className="relative"><span className="sr-only">Search projects or locations</span><Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" size={17} /><Input className="pl-10" value={query} onChange={(event) => updateParam("query", event.target.value)} placeholder="Search project or locality" /></label>
          {!fixedKind && <label><span className="sr-only">Property type</span><Select value={selectedKind} onChange={(event) => updateParam("kind", event.target.value)}><option value="all">All property types</option><option value="land">Land</option><option value="apartment">Apartments</option><option value="house">Houses</option><option value="villa">Villas</option></Select></label>}
          <label><span className="sr-only">City</span><Select value={city} onChange={(event) => updateParam("city", event.target.value)}><option value="all">Every city</option><option>Bengaluru</option><option>Hyderabad</option><option>Gurugram</option><option>Pune</option></Select></label>
          <Button variant="ghost" disabled={!params.size} onClick={() => setParams({})}><X aria-hidden="true" size={16} />Clear</Button>
        </Card>

        <div className="mt-8 flex items-center justify-between gap-4"><p className="text-sm text-muted"><strong className="text-foreground">{projects.length}</strong> fictional {projects.length === 1 ? "property" : "properties"}</p><p className="hidden items-center gap-2 text-xs font-semibold uppercase tracking-[0.07em] text-muted sm:flex"><SlidersHorizontal aria-hidden="true" size={15} />Filters update the URL</p></div>

        {projects.length ? <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">{projects.map((project) => <PropertyCard key={project.id} project={project} />)}</div> : (
          <div className="mt-6 grid min-h-80 place-items-center rounded-lg border border-dashed border-border bg-surface-subtle p-8 text-center"><div><p className="font-display text-3xl text-foreground">No properties match this view.</p><p className="mt-3 text-sm text-muted">Clear the filters or try a broader project or locality search.</p><Button className="mt-6" variant="secondary" onClick={() => setParams({})}>Clear filters</Button></div></div>
        )}
      </section>
    </main>
  );
}
