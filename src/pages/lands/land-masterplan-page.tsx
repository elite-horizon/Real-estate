import { useParams } from "react-router-dom";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { DemoNotice } from "@/components/demo-notice";
import { demoDatabase } from "@/data/demo-database";
import { countAvailability, getLandProjectPlots } from "@/data/queries";
import { PlotMasterplan } from "@/features/plot-explorer/plot-masterplan";
import { LandNotFound, ProjectSubnav } from "@/pages/lands/land-shared";

export function LandMasterplanPage() {
  const { projectId } = useParams();
  const project = projectId ? demoDatabase.landProjects[projectId] : undefined;
  if (!project) return <LandNotFound />;
  const plots = getLandProjectPlots(project);
  const inventory = countAvailability(plots);
  return <main><section className="border-b border-border bg-surface-subtle"><div className="container-page py-12 sm:py-16"><Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Land", to: "/lands" }, { label: project.name, to: `/lands/${project.id}` }, { label: "Masterplan" }]} /><div className="mt-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-end"><div className="max-w-3xl"><p className="eyebrow">Interactive plotted layout</p><h1 className="mt-3 font-display text-4xl text-foreground sm:text-5xl">Choose your position within {project.name}.</h1><p className="mt-4 text-base leading-7 text-muted">Search and filter the fictional inventory, then select a plot to carry it into the detail journey.</p></div><div className="grid grid-cols-3 gap-6"><div><p className="text-2xl font-bold tabular-nums text-foreground">{plots.length}</p><p className="text-xs text-muted">Total</p></div><div><p className="text-2xl font-bold tabular-nums text-success">{inventory.available}</p><p className="text-xs text-muted">Available</p></div><div><p className="text-2xl font-bold tabular-nums text-danger">{inventory.sold}</p><p className="text-xs text-muted">Sold</p></div></div></div><div className="mt-6"><DemoNotice>The plan and geometry are fictional sales-demo schematics, not survey or legal drawings.</DemoNotice></div></div></section><ProjectSubnav project={project} /><section className="container-page py-8 sm:py-12"><PlotMasterplan project={project} plots={plots} /></section></main>;
}
