import { useParams } from "react-router-dom";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { DemoNotice } from "@/components/demo-notice";
import { demoDatabase } from "@/data/demo-database";
import { getApartmentProjectTowers } from "@/data/queries";
import { TowerSelector } from "@/features/tower-selector/tower-selector";
import { ApartmentNotFound, ApartmentProjectSubnav } from "@/pages/apartments/apartment-shared";

export function TowerSelectorPage() {
  const { projectId } = useParams();
  const project = projectId ? demoDatabase.apartmentProjects[projectId] : undefined;
  if (!project) return <ApartmentNotFound />;
  const towers = getApartmentProjectTowers(project);
  return <main><section className="border-b border-border bg-surface-subtle"><div className="container-page py-12 sm:py-16"><Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Apartments", to: "/apartments" }, { label: project.name, to: `/apartments/${project.id}` }, { label: "Tower selector" }]} /><p className="mt-9 eyebrow">Interactive building selection</p><h1 className="mt-3 font-display text-4xl text-foreground sm:text-5xl">Choose a tower at {project.name}.</h1><p className="mt-4 max-w-2xl text-base leading-7 text-muted">Rotate the simplified building model, zoom, or use the standard controls to make a selection.</p><div className="mt-6"><DemoNotice>The 3D massing is illustrative and not an architectural model.</DemoNotice></div></div></section><ApartmentProjectSubnav project={project} /><section className="container-page py-8 sm:py-12"><TowerSelector project={project} towers={towers} /></section></main>;
}
