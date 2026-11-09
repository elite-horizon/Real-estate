import { ArrowLeft, ArrowRight, ScanLine } from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { DemoNotice } from "@/components/demo-notice";
import { Button } from "@/components/ui/button";
import { demoDatabase } from "@/data/demo-database";
import { FloorPlanExperience } from "@/features/floor-plan/floor-plan-experience";
import { VirtualTourExperience } from "@/features/virtual-tour/virtual-tour-experience";
import { ApartmentNotFound } from "@/pages/apartments/apartment-shared";

export function ResidenceExperiencePage() {
  const { pathname } = useLocation();
  const { projectId, flatId } = useParams();
  const project = projectId ? demoDatabase.apartmentProjects[projectId] : undefined;
  const flat = flatId ? demoDatabase.flats[flatId] : undefined;
  if (!project || !flat || flat.projectId !== project.id) return <ApartmentNotFound />;
  const tower = demoDatabase.towers[flat.towerId]!;
  const floor = demoDatabase.floors[flat.floorId]!;
  const isTour = pathname.endsWith("/tour");
  const base = `/apartments/${project.id}/flats/${flat.id}`;
  const title = isTour ? `Virtual tour of Residence ${flat.unitNumber}` : `2D / 3D plan for Residence ${flat.unitNumber}`;
  return <main><section className="bg-navy-950 text-white"><div className="container-page py-12 sm:py-16"><Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Apartments", to: "/apartments" }, { label: project.name, to: `/apartments/${project.id}` }, { label: tower.name, to: `/apartments/${project.id}/towers/${tower.id}` }, { label: floor.label, to: `/apartments/${project.id}/towers/${tower.id}/floors/${floor.id}` }, { label: `Residence ${flat.unitNumber}`, to: base }, { label: isTour ? "Virtual tour" : "Floor plan" }]} /><p className="mt-9 text-xs font-bold uppercase tracking-[0.18em] text-gold-light">{tower.name} · {floor.label}</p><h1 className="mt-3 font-display text-4xl text-white sm:text-5xl">{title}</h1><p className="mt-4 max-w-2xl text-white/65">{isTour ? "Move between five room concepts using accessible controls and clearly labeled visual hotspots." : "Switch between the plan views, select rooms, and inspect simplified furniture and walls."}</p></div></section>
    <nav className="border-b border-border bg-surface"><div className="container-page flex items-center justify-between gap-4 py-3"><Button variant="ghost" size="sm" asChild><Link to={base}><ArrowLeft aria-hidden="true" size={15} />Flat details</Link></Button>{isTour ? <Button variant="secondary" size="sm" asChild><Link to={`${base}/floor-plan`}><ScanLine aria-hidden="true" size={15} />View floor plan</Link></Button> : <Button size="sm" asChild><Link to={`${base}/tour`}>Continue to room tour <ArrowRight aria-hidden="true" size={15} /></Link></Button>}</div></nav>
    <section className="container-page py-8 sm:py-12"><div className="mb-5"><DemoNotice>{isTour ? "No true panoramas are available. This is an explicitly labeled standard-image gallery fallback." : "The plan is fictional demonstration geometry and is not suitable for construction or measurement."}</DemoNotice></div>{isTour ? <VirtualTourExperience /> : <FloorPlanExperience />}</section>
  </main>;
}
