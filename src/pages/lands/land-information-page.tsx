import { ArrowRight, Building, Bus, CheckCircle2, FileCheck2, GraduationCap, Hospital, Landmark, Plane, ShieldCheck } from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { DemoNotice } from "@/components/demo-notice";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { demoDatabase } from "@/data/demo-database";
import { formatPrice } from "@/lib/formatters";
import { LandNotFound, ProjectSubnav } from "@/pages/lands/land-shared";

export function LandInformationPage() {
  const { pathname } = useLocation();
  const { projectId } = useParams();
  const project = projectId ? demoDatabase.landProjects[projectId] : undefined;
  if (!project) return <LandNotFound />;
  const view = pathname.endsWith("/approvals") ? "approvals" : pathname.endsWith("/nearby") ? "nearby" : "pricing";
  const label = view === "approvals" ? "Legal approvals" : view === "nearby" ? "Nearby infrastructure" : "Plot pricing";
  return <main><section className="border-b border-border bg-surface-subtle"><div className="container-page py-12 sm:py-16"><Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Land", to: "/lands" }, { label: project.name, to: `/lands/${project.id}` }, { label }]} /><p className="mt-9 eyebrow">{project.name}</p><h1 className="mt-3 font-display text-4xl text-foreground sm:text-5xl">{label}</h1><p className="mt-4 max-w-2xl text-base leading-7 text-muted">A detailed but explicitly fictional demonstration of the information a buyer-facing experience could provide.</p></div></section><ProjectSubnav project={project} />{view === "approvals" ? <Approvals /> : view === "nearby" ? <Nearby project={project} /> : <Pricing project={project} />}</main>;
}

function Approvals() {
  const items = [{ title: "Planning layout", reference: "DEMO/LP/2026/014", status: "Illustrative approval" }, { title: "Land title review", reference: "DEMO/TITLE/081", status: "Demo due-diligence summary" }, { title: "Environmental context", reference: "DEMO/ENV/044", status: "Illustrative assessment" }, { title: "Utility provision", reference: "DEMO/UTIL/102", status: "Concept infrastructure note" }];
  return <section className="container-page py-12 sm:py-18"><DemoNotice>No approval, title, registration, or legal claim on this page is verified or connected to a real project.</DemoNotice><div className="mt-8 grid gap-5 md:grid-cols-2">{items.map((item) => <Card className="p-6" key={item.title}><div className="flex items-start gap-4"><span className="grid size-11 shrink-0 place-items-center rounded border border-success/30 bg-success/10 text-success"><FileCheck2 aria-hidden="true" size={21} /></span><div><p className="text-xs font-bold uppercase tracking-[0.07em] text-muted">{item.reference}</p><h2 className="mt-2 font-display text-2xl text-foreground">{item.title}</h2><p className="mt-2 flex items-center gap-2 text-sm text-success"><CheckCircle2 aria-hidden="true" size={15} />{item.status}</p></div></div></Card>)}</div><Card className="mt-8 p-6 sm:p-8"><ShieldCheck className="text-gold-strong" aria-hidden="true" size={28} /><h2 className="mt-5 font-display text-3xl text-foreground">What a production legal room would add</h2><p className="mt-4 max-w-3xl text-sm leading-7 text-muted">Authenticated document access, issue dates, issuing authorities, version history, lawyer-reviewed summaries, purchaser acknowledgements, and explicit links to source registries.</p></Card></section>;
}

const nearbyIcons = { school: GraduationCap, college: Building, hospital: Hospital, airport: Plane, transit: Bus, landmark: Landmark } as const;
function Nearby({ project }: { project: NonNullable<(typeof demoDatabase.landProjects)[string]> }) {
  const points = project.nearbyIds.map((id) => demoDatabase.locationPoints[id]).filter((point) => point !== undefined);
  return <section className="container-page py-12 sm:py-18"><DemoNotice>Distances and travel times are fictional examples and do not represent measured routes.</DemoNotice><div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{points.map((point) => { const Icon = nearbyIcons[point.category]; return <Card className="p-6" key={point.id}><div className="flex items-center justify-between"><span className="grid size-10 place-items-center rounded border border-gold/30 text-gold-strong"><Icon aria-hidden="true" size={19} /></span><span className="text-xs font-bold uppercase tracking-[0.07em] text-muted">{point.category}</span></div><h2 className="mt-6 font-display text-2xl text-foreground">{point.name}</h2><div className="mt-4 flex gap-5 text-sm"><span><strong className="tabular-nums text-foreground">{point.distanceKm} km</strong><span className="block text-xs text-muted">Distance</span></span><span><strong className="tabular-nums text-foreground">{point.travelMinutes} min</strong><span className="block text-xs text-muted">Illustrative drive</span></span></div></Card>; })}</div></section>;
}

function Pricing({ project }: { project: NonNullable<(typeof demoDatabase.landProjects)[string]> }) {
  const sample = demoDatabase.plots[project.plotIds[0]!]!;
  const items = [{ label: "Illustrative plot value", value: sample.priceInr }, { label: "Infrastructure contribution", value: 325_000 }, { label: "Club establishment", value: 150_000 }, { label: "Maintenance reserve", value: 75_000 }];
  const subtotal = items.reduce((sum, item) => sum + item.value, 0);
  return <section className="container-page py-12 sm:py-18"><div className="grid gap-8 lg:grid-cols-[1fr_23rem]"><div><DemoNotice>Prices, taxes, fees, schedules, and financing examples are fictional and not financial advice.</DemoNotice><Card className="mt-6 overflow-hidden"><div className="border-b border-border p-6"><p className="eyebrow">Example selection</p><h2 className="mt-2 font-display text-3xl text-foreground">Plot {sample.number}</h2></div><dl className="divide-y divide-border">{items.map((item) => <div className="flex justify-between gap-4 px-6 py-4" key={item.label}><dt className="text-sm text-muted">{item.label}</dt><dd className="font-semibold tabular-nums text-foreground">{formatPrice(item.value)}</dd></div>)}<div className="flex justify-between gap-4 bg-surface-subtle px-6 py-5"><dt className="font-semibold text-foreground">Illustrative subtotal</dt><dd className="text-xl font-bold tabular-nums text-foreground">{formatPrice(subtotal)}</dd></div></dl></Card></div><aside><Card className="p-6"><p className="eyebrow">Continue</p><h2 className="mt-3 font-display text-3xl text-foreground">Review the live-style inventory.</h2><p className="mt-3 text-sm leading-6 text-muted">Choose a plot to carry its actual demonstration price into the enquiry flow.</p><Button className="mt-6 w-full" asChild><Link to={`/lands/${project.id}/masterplan`}>Choose a plot <ArrowRight aria-hidden="true" size={16} /></Link></Button></Card></aside></div></section>;
}
