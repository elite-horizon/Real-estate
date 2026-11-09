import { ArrowLeft } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ApartmentProject } from "@/types/property";

export function ApartmentNotFound({ message = "This apartment selection is not part of the demonstration inventory." }: { message?: string }) {
  return <main className="container-page grid min-h-[65dvh] place-items-center py-16 text-center"><div><p className="eyebrow">Residence unavailable</p><h1 className="mt-4 font-display text-4xl text-foreground">We could not find that residence.</h1><p className="mx-auto mt-4 max-w-lg text-muted">{message}</p><Button className="mt-7" asChild><Link to="/apartments"><ArrowLeft aria-hidden="true" size={16} />Return to apartment projects</Link></Button></div></main>;
}

export function ApartmentProjectSubnav({ project }: { project: ApartmentProject }) {
  const base = `/apartments/${project.id}`;
  const items = [{ label: "Overview", to: base, end: true }, { label: "Towers", to: `${base}/towers` }, { label: "Interiors", to: `${base}/interiors` }, { label: "Materials", to: `${base}/materials` }, { label: "Amenities", to: `${base}/amenities` }, { label: "Parking", to: `${base}/parking` }, { label: "Security", to: `${base}/security` }, { label: "Maintenance", to: `${base}/maintenance` }, { label: "Pricing", to: `${base}/pricing` }];
  return <nav className="overflow-x-auto border-b border-border bg-surface" aria-label="Apartment project"><div className="container-page flex min-w-max gap-1">{items.map((item) => <NavLink key={item.to} to={item.to} end={item.end} className={({ isActive }) => cn("border-b-2 border-transparent px-4 py-4 text-sm font-semibold text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold", isActive && "border-gold text-foreground")}>{item.label}</NavLink>)}</div></nav>;
}
