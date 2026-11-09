import { ArrowLeft } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { LandProject, Plot } from "@/types/property";

export function LandNotFound({ message = "This land project is not part of the demonstration inventory." }: { message?: string }) {
  return <main className="container-page grid min-h-[65dvh] place-items-center py-16 text-center"><div><p className="eyebrow">Inventory unavailable</p><h1 className="mt-4 font-display text-4xl text-foreground">We could not find that address.</h1><p className="mx-auto mt-4 max-w-lg text-muted">{message}</p><Button className="mt-7" asChild><Link to="/lands"><ArrowLeft aria-hidden="true" size={16} />Return to land projects</Link></Button></div></main>;
}

export function PlotSubnav({ project, plot }: { project: LandProject; plot: Plot }) {
  const base = `/lands/${project.id}/plots/${plot.id}`;
  const items = [{ label: "Overview", to: base, end: true }, { label: "Geography", to: `${base}/geography` }, { label: "Dimensions & facing", to: `${base}/dimensions` }];
  return <nav className="overflow-x-auto border-b border-border bg-surface" aria-label="Plot details"><div className="container-page flex min-w-max gap-1">{items.map((item) => <NavLink key={item.to} to={item.to} end={item.end} className={({ isActive }) => cn("border-b-2 border-transparent px-4 py-4 text-sm font-semibold text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold", isActive && "border-gold text-foreground")}>{item.label}</NavLink>)}</div></nav>;
}

export function ProjectSubnav({ project }: { project: LandProject }) {
  const base = `/lands/${project.id}`;
  const items = [{ label: "Overview", to: base, end: true }, { label: "Masterplan", to: `${base}/masterplan` }, { label: "Approvals", to: `${base}/approvals` }, { label: "Nearby", to: `${base}/nearby` }, { label: "Pricing", to: `${base}/pricing` }];
  return <nav className="overflow-x-auto border-b border-border bg-surface" aria-label="Land project"><div className="container-page flex min-w-max gap-1">{items.map((item) => <NavLink key={item.to} to={item.to} end={item.end} className={({ isActive }) => cn("border-b-2 border-transparent px-4 py-4 text-sm font-semibold text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold", isActive && "border-gold text-foreground")}>{item.label}</NavLink>)}</div></nav>;
}
