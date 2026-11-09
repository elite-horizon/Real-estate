import { Car, CheckCircle2, ChefHat, CircleDollarSign, Dumbbell, Droplets, KeyRound, ShieldCheck, Sparkles, Wrench } from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { DemoNotice } from "@/components/demo-notice";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { demoDatabase } from "@/data/demo-database";
import { formatPrice } from "@/lib/formatters";
import { ApartmentNotFound, ApartmentProjectSubnav } from "@/pages/apartments/apartment-shared";

const pageMeta = {
  interiors: { title: "Kitchen and interior details", description: "Illustrative material, appliance, storage, and finish specifications." },
  materials: { title: "Construction materials", description: "A demonstration specification library for structure, envelope, services, and finishes." },
  amenities: { title: "Resident amenities", description: "Shared spaces shaped around wellbeing, recreation, gathering, and everyday convenience." },
  parking: { title: "Parking and arrival", description: "Resident, visitor, accessible, and service-arrival planning in one clear view." },
  security: { title: "Security and visitor policy", description: "A layered demonstration of access, monitoring, visitors, and service entry." },
  maintenance: { title: "Maintenance costs", description: "An illustrative monthly operating-cost explanation with transparent categories." },
  pricing: { title: "Flat pricing", description: "Example base values, charges, and payment stages for demonstration residences." },
} as const;
type InfoView = keyof typeof pageMeta;

export function ApartmentInformationPage() {
  const { pathname } = useLocation();
  const { projectId } = useParams();
  const project = projectId ? demoDatabase.apartmentProjects[projectId] : undefined;
  if (!project) return <ApartmentNotFound />;
  const view = (pathname.split("/").pop() ?? "amenities") as InfoView;
  const meta = pageMeta[view] ?? pageMeta.amenities;
  return <main><section className="border-b border-border bg-surface-subtle"><div className="container-page py-12 sm:py-16"><Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Apartments", to: "/apartments" }, { label: project.name, to: `/apartments/${project.id}` }, { label: meta.title }]} /><p className="mt-9 eyebrow">{project.name}</p><h1 className="mt-3 font-display text-4xl text-foreground sm:text-5xl">{meta.title}</h1><p className="mt-4 max-w-2xl text-base leading-7 text-muted">{meta.description}</p></div></section><ApartmentProjectSubnav project={project} /><InformationContent view={view} projectId={project.id} /></main>;
}

function InformationContent({ view, projectId }: { view: InfoView; projectId: string }) {
  if (view === "pricing" || view === "maintenance") return <FinancialContent view={view} projectId={projectId} />;
  const content = {
    interiors: [{ icon: ChefHat, title: "Kitchen", text: "Quartz worktops, modular storage, appliance provisions, and a separate utility edge." }, { icon: Sparkles, title: "Living finishes", text: "Large-format stone-look flooring, restrained wall palette, and concealed curtain pockets." }, { icon: KeyRound, title: "Joinery", text: "Full-height wardrobes with soft-close hardware and configurable internal accessories." }],
    materials: [{ icon: Wrench, title: "Structure", text: "Illustrative reinforced-concrete frame with quality-control checkpoints." }, { icon: Droplets, title: "Waterproofing", text: "Layered wet-area and terrace systems with hypothetical test documentation." }, { icon: Sparkles, title: "Envelope", text: "Performance glazing and durable exterior finishes selected for the fictional climate context." }],
    amenities: [{ icon: Dumbbell, title: "Fitness atelier", text: "Strength, cardio, movement studio, and recovery rooms." }, { icon: Droplets, title: "Pool court", text: "Temperature-controlled lap pool, leisure ledge, and shaded deck." }, { icon: Sparkles, title: "Residents’ club", text: "Lounges, private dining, work rooms, and gathering spaces." }],
    parking: [{ icon: Car, title: "Resident parking", text: "Numbered bays tied to residence inventory, with EV-ready provision." }, { icon: KeyRound, title: "Visitor arrival", text: "Pre-registered guest access and clearly separated short-stay bays." }, { icon: ShieldCheck, title: "Service movement", text: "Dedicated loading and service access away from the main resident arrival." }],
    security: [{ icon: ShieldCheck, title: "Layered access", text: "Perimeter, lobby, lift, and residence-level access zones." }, { icon: KeyRound, title: "Visitor policy", text: "Resident approval, identity capture, time-bound passes, and arrival notifications." }, { icon: CheckCircle2, title: "Common-area monitoring", text: "Illustrative coverage of entrances and shared circulation with clear privacy boundaries." }],
  }[view as Exclude<InfoView, "pricing" | "maintenance">];
  return <section className="container-page py-12 sm:py-18"><DemoNotice>All specifications and policies are fictional examples for interface demonstration.</DemoNotice><div className="mt-8 grid gap-5 md:grid-cols-3">{content.map(({ icon: Icon, title, text }) => <Card className="p-6" key={title}><Icon className="text-gold-strong" aria-hidden="true" size={24} /><h2 className="mt-6 font-display text-2xl text-foreground">{title}</h2><p className="mt-3 text-sm leading-6 text-muted">{text}</p></Card>)}</div></section>;
}

function FinancialContent({ view, projectId }: { view: "pricing" | "maintenance"; projectId: string }) {
  const project = demoDatabase.apartmentProjects[projectId]!;
  const sample = demoDatabase.flats[demoDatabase.floors[demoDatabase.towers[project.towerIds[0]!]!.floorIds[0]!]!.flatIds[0]!]!;
  const rows = view === "pricing" ? [{ label: "Illustrative residence value", value: sample.priceInr }, { label: "Parking allocation", value: 750_000 }, { label: "Club establishment", value: 225_000 }, { label: "Documentation estimate", value: 75_000 }] : [{ label: "Common-area operations", value: 3_200 }, { label: "Security and visitor systems", value: 1_100 }, { label: "Landscape and amenities", value: 1_450 }, { label: "Reserve contribution", value: 750 }];
  const total = rows.reduce((sum, row) => sum + row.value, 0);
  return <section className="container-page py-12 sm:py-18"><div className="grid gap-8 lg:grid-cols-[1fr_22rem]"><div><DemoNotice>All values and payment assumptions are fictional and not financial advice.</DemoNotice><Card className="mt-6 overflow-hidden"><dl className="divide-y divide-border">{rows.map((row) => <div className="flex justify-between gap-4 px-6 py-4" key={row.label}><dt className="text-sm text-muted">{row.label}</dt><dd className="font-semibold tabular-nums text-foreground">{formatPrice(row.value)}</dd></div>)}<div className="flex justify-between gap-4 bg-surface-subtle px-6 py-5"><dt className="font-semibold text-foreground">{view === "pricing" ? "Illustrative subtotal" : "Illustrative monthly total"}</dt><dd className="text-xl font-bold tabular-nums text-foreground">{formatPrice(total)}</dd></div></dl></Card></div><aside><Card className="p-6"><CircleDollarSign className="text-gold-strong" aria-hidden="true" size={26} /><h2 className="mt-5 font-display text-3xl text-foreground">Choose a residence.</h2><p className="mt-3 text-sm leading-6 text-muted">Carry a specific flat and its shared mock price into the detailed journey.</p><Button className="mt-6 w-full" asChild><Link to={`/apartments/${projectId}/towers`}>Open tower selector</Link></Button></Card></aside></div></section>;
}
