import { ArrowRight, CheckCircle2, Map, Ruler, Trees } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { DemoNotice } from "@/components/demo-notice";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { demoDatabase } from "@/data/demo-database";
import { countAvailability, getLandProjectPlots } from "@/data/queries";
import { formatArea, formatPrice } from "@/lib/formatters";
import { LandNotFound, ProjectSubnav } from "@/pages/lands/land-shared";

export function LandProjectPage() {
  const { projectId } = useParams();
  const project = projectId ? demoDatabase.landProjects[projectId] : undefined;
  if (!project) return <LandNotFound />;
  const plots = getLandProjectPlots(project);
  const inventory = countAvailability(plots);
  const media = project.heroMediaId ? demoDatabase.media[project.heroMediaId] : undefined;

  return <main>
    <section className="relative min-h-[68dvh] overflow-hidden bg-navy-950 text-white">
      {media && <img className="absolute inset-0 h-full w-full object-cover" src={media.src} alt={media.alt} />}
      <div className="absolute inset-0 bg-gradient-to-r from-[#06111f]/95 via-[#06111f]/72 to-[#06111f]/25" aria-hidden="true" />
      <div className="container-page relative flex min-h-[68dvh] items-end py-14 sm:py-20"><div className="max-w-3xl"><Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Land", to: "/lands" }, { label: project.name }]} /><p className="mt-9 text-xs font-bold uppercase tracking-[0.18em] text-gold-light">{project.locality}, {project.city}</p><h1 className="mt-4 font-display text-5xl font-semibold leading-tight text-white sm:text-6xl">{project.name}</h1><p className="mt-5 max-w-2xl text-base leading-7 text-white/75">{project.summary}</p><div className="mt-8 flex flex-wrap gap-3"><Button className="border-gold bg-gold text-navy-950 hover:bg-gold-light" asChild><Link to={`/lands/${project.id}/masterplan`}>Explore the masterplan <ArrowRight aria-hidden="true" size={16} /></Link></Button><Button className="border-white/50 text-white hover:bg-white/10" variant="secondary" asChild><Link to={`/lands/${project.id}/pricing`}>View pricing</Link></Button></div><div className="mt-7"><DemoNotice>{project.demoNotice}</DemoNotice></div></div></div>
    </section>
    <ProjectSubnav project={project} />
    <section className="container-page py-16 sm:py-24">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start"><SectionHeading eyebrow="Project overview" title="A plotted address with room to become personal." description="The experience connects an illustrative masterplan with individual plot specifications, nearby context, and a transparent demonstration price path." /><div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-4">{[{ label: "Estate area", value: formatArea(project.totalArea) }, { label: "Total plots", value: String(plots.length) }, { label: "Available", value: String(inventory.available) }, { label: "Starting", value: formatPrice(project.startingPriceInr) }].map((stat) => <div className="bg-surface p-5" key={stat.label}><p className="text-xs font-semibold uppercase tracking-[0.07em] text-muted">{stat.label}</p><p className="mt-2 text-xl font-bold tabular-nums text-foreground">{stat.value}</p></div>)}</div></div>
      <div className="mt-12 grid gap-5 md:grid-cols-3">{[{ icon: Map, title: "Interactive inventory", text: "Select numbered plots and compare availability, area, price, and facing." }, { icon: Ruler, title: "Clear specifications", text: "Understand dimensions, road width, orientation, and illustrative terrain context." }, { icon: Trees, title: "Community setting", text: "Review shared amenities and fictional proximity information before enquiring." }].map(({ icon: Icon, title, text }) => <Card className="p-6" key={title}><Icon className="text-gold-strong" aria-hidden="true" size={24} strokeWidth={1.5} /><h2 className="mt-6 font-display text-2xl text-foreground">{title}</h2><p className="mt-3 text-sm leading-6 text-muted">{text}</p></Card>)}</div>
    </section>
    <section className="bg-surface-subtle py-16 sm:py-24"><div className="container-page grid gap-8 lg:grid-cols-[1fr_0.8fr]"><div><SectionHeading eyebrow="Illustrative planning" title="Designed around a legible street and landscape structure." /><div className="mt-8 grid gap-4 sm:grid-cols-2">{["Tree-lined internal avenues", "Pedestrian green corridors", "Community recreation precinct", "Utility and water-management zones"].map((item) => <p className="flex items-start gap-3 text-sm text-muted" key={item}><CheckCircle2 className="mt-0.5 shrink-0 text-success" aria-hidden="true" size={17} />{item}</p>)}</div></div><Card className="p-6"><p className="eyebrow">Next step</p><h2 className="mt-3 font-display text-3xl text-foreground">Choose a plot on the plan.</h2><p className="mt-3 text-sm leading-6 text-muted">Filter the shared inventory and carry your selected plot into its detail page.</p><Button className="mt-7" asChild><Link to={`/lands/${project.id}/masterplan`}>Open interactive masterplan <ArrowRight aria-hidden="true" size={16} /></Link></Button></Card></div></section>
  </main>;
}
