import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  Building2,
  Compass,
  Home,
  LandPlot,
  MapPin,
  MoveUpRight,
  Trees,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { DemoNotice } from "@/components/demo-notice";
import { PropertyCard } from "@/components/property-card";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { demoDatabase } from "@/data/demo-database";
import {
  countAvailability,
  getFeaturedProjects,
  getLandProjectPlots,
} from "@/data/queries";
import type { PropertyKind } from "@/types/property";

const categories = [
  {
    kind: "land",
    label: "Land",
    description: "Plotted addresses with interactive masterplans.",
    icon: LandPlot,
    to: "/lands",
  },
  {
    kind: "apartment",
    label: "Apartments",
    description: "Explore project, tower, floor, and residence.",
    icon: Building2,
    to: "/apartments",
  },
  {
    kind: "house",
    label: "Houses",
    description: "Individual homes composed around everyday life.",
    icon: Home,
    to: "/houses",
  },
  {
    kind: "villa",
    label: "Villas",
    description: "Private residences within curated communities.",
    icon: Trees,
    to: "/villas",
  },
] as const;

export function HomePage() {
  const navigate = useNavigate();
  const [kind, setKind] = useState<PropertyKind | "all">("all");
  const [city, setCity] = useState("all");
  const [query, setQuery] = useState("");
  const featured = getFeaturedProjects().slice(0, 3);
  const heroMedia = demoDatabase.media["architecture-coast"]!;
  const previewProject = demoDatabase.landProjects["land-1"]!;
  const previewPlots = getLandProjectPlots(previewProject);
  const inventory = countAvailability(previewPlots);

  function handleSearch(event: FormEvent) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (kind !== "all") params.set("kind", kind);
    if (city !== "all") params.set("city", city);
    if (query.trim()) params.set("query", query.trim());
    navigate(`/properties${params.size ? `?${params.toString()}` : ""}`);
  }

  return (
    <main>
      <section className="relative min-h-[38rem] overflow-hidden bg-navy-950 text-white sm:min-h-[42rem]">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src={heroMedia.src}
          alt={heroMedia.alt}
          fetchPriority="high"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,21,17,0.9)_0%,rgba(5,21,17,0.6)_56%,rgba(5,21,17,0.18)_100%)]"
          aria-hidden="true"
        />
        <div className="container-page relative grid min-h-[38rem] content-center py-14 sm:min-h-[42rem] sm:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-light">
              Homes, land and private communities
            </p>
            <h1 className="mt-4 font-display text-5xl font-semibold leading-[1.02] tracking-[-0.025em] text-white sm:text-6xl">
              Find a property that fits how you want to live.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/80">
              Search the collection, compare your shortlist, then explore every
              project in detail.
            </p>
          </div>
          <form
            onSubmit={handleSearch}
            className="mt-8 grid max-w-5xl gap-2 rounded-xl border border-white/30 bg-white p-2 shadow-2xl sm:grid-cols-2 lg:grid-cols-[0.8fr_0.8fr_1.4fr_auto]"
            aria-label="Search properties"
          >
            <label className="sr-only" htmlFor="home-kind">
              Property type
            </label>
            <Select
              id="home-kind"
              value={kind}
              onChange={(event) =>
                setKind(event.target.value as PropertyKind | "all")
              }
            >
              <option value="all">All property types</option>
              <option value="land">Land</option>
              <option value="apartment">Apartments</option>
              <option value="house">Houses</option>
              <option value="villa">Villas</option>
            </Select>
            <label className="sr-only" htmlFor="home-city">
              City
            </label>
            <Select
              id="home-city"
              value={city}
              onChange={(event) => setCity(event.target.value)}
            >
              <option value="all">Every city</option>
              <option>Bengaluru</option>
              <option>Hyderabad</option>
              <option>Gurugram</option>
              <option>Pune</option>
            </Select>
            <label className="sr-only" htmlFor="home-query">
              Search by project or locality
            </label>
            <Input
              id="home-query"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Project, locality, or city"
            />
            <Button className="h-12" type="submit">
              Search <ArrowRight aria-hidden="true" size={16} />
            </Button>
          </form>
          <div className="mt-5">
            <DemoNotice>
              Concept imagery and all property information are fictional
              demonstration content.
            </DemoNotice>
          </div>
        </div>
        <p className="absolute bottom-4 right-5 hidden text-[0.65rem] uppercase tracking-[0.08em] text-white/55 md:block">
          Generated with Google Stitch
        </p>
      </section>

      <section className="container-page py-16 sm:py-20">
        <SectionHeading
          eyebrow="Browse by property type"
          title="What are you looking for?"
          description="Start with a category, then narrow by city, project, price, and availability."
        />
        <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {categories.map(({ label, description, icon: Icon, to }) => (
            <Link
              key={label}
              to={to}
              className="group bg-surface p-6 transition-colors hover:bg-surface-subtle focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:p-7"
            >
              <span className="grid size-11 place-items-center rounded border border-gold/35 text-gold-strong">
                <Icon aria-hidden="true" size={21} strokeWidth={1.6} />
              </span>
              <h2 className="mt-6 font-display text-2xl font-medium text-foreground">
                {label}
              </h2>
              <p className="mt-3 min-h-12 text-sm leading-6 text-muted">
                {description}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.08em] text-foreground">
                Discover{" "}
                <MoveUpRight
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                  size={15}
                />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-navy-950 py-20 text-white sm:py-28">
        <div className="container-page grid items-center gap-12 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-light">
              Masterplan preview
            </p>
            <h2 className="mt-4 font-display text-4xl font-medium leading-tight text-white sm:text-5xl">
              See the whole address. Then choose your plot.
            </h2>
            <p className="mt-5 text-base leading-7 text-white/65">
              The land journey connects real-time-style inventory, dimensions,
              facing, price, and road context in one exploratory plan.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-3 border-y border-white/15 py-5">
              <div>
                <p className="text-2xl font-bold tabular-nums">
                  {previewPlots.length}
                </p>
                <p className="mt-1 text-xs text-white/55">Total plots</p>
              </div>
              <div>
                <p className="text-2xl font-bold tabular-nums text-success">
                  {inventory.available}
                </p>
                <p className="mt-1 text-xs text-white/55">Available</p>
              </div>
              <div>
                <p className="text-2xl font-bold tabular-nums text-danger">
                  {inventory.sold}
                </p>
                <p className="mt-1 text-xs text-white/55">Sold</p>
              </div>
            </div>
            <Button
              className="mt-8 border-gold bg-gold text-navy-950 hover:bg-gold-light"
              asChild
            >
              <Link to={`/lands/${previewProject.id}/masterplan`}>
                Open masterplan preview{" "}
                <ArrowRight aria-hidden="true" size={16} />
              </Link>
            </Button>
          </div>
          <div className="rounded-xl border border-white/15 bg-white/5 p-4 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="font-display text-xl text-white">
                  {previewProject.name}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-white/55">
                  <MapPin aria-hidden="true" size={13} />
                  {previewProject.locality}, {previewProject.city}
                </p>
              </div>
              <Compass
                className="text-gold-light"
                aria-label="North"
                size={25}
              />
            </div>
            <div className="grid grid-cols-4 gap-2 rounded-lg bg-[#e8e1d2] p-4 sm:gap-3 sm:p-6">
              {previewPlots.map((plot) => (
                <Link
                  key={plot.id}
                  to={`/lands/${previewProject.id}/plots/${plot.id}`}
                  className={`grid aspect-[4/5] place-items-center rounded border text-[0.65rem] font-bold transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-selected ${plot.availability === "available" ? "border-success/50 bg-success/25 text-[#064e3b]" : plot.availability === "reserved" ? "border-reserved/50 bg-reserved/25 text-[#78350f]" : "border-danger/50 bg-danger/20 text-[#7f1d1d]"}`}
                  aria-label={`Plot ${plot.number}, ${plot.availability}`}
                >
                  {plot.number}
                </Link>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <Badge variant="available">Available</Badge>
              <Badge variant="reserved">Reserved</Badge>
              <Badge variant="sold">Sold</Badge>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-20 sm:py-28">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Selected collection"
            title="Places worth a closer look."
            description="A cross-section of fictional projects from the shared demonstration inventory."
          />
          <Button asChild variant="secondary">
            <Link to="/properties">
              View all properties <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </Button>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <PropertyCard project={project} key={project.id} />
          ))}
        </div>
      </section>

      <section className="container-page pb-20 sm:pb-28">
        <Card className="relative overflow-hidden border-gold/25 bg-surface-subtle p-7 sm:p-12 lg:p-16">
          <div
            className="absolute -right-24 -top-24 size-72 rounded-full border border-gold/20"
            aria-hidden="true"
          />
          <div className="relative max-w-3xl">
            <p className="eyebrow">Private viewing</p>
            <h2 className="mt-4 font-display text-4xl font-medium leading-tight text-foreground sm:text-5xl">
              Move from browsing to standing in the space.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted">
              Choose a fictional project and experience the demonstration
              visit-scheduling flow.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/schedule-visit">
                  Schedule a site visit{" "}
                  <ArrowRight aria-hidden="true" size={16} />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link to="/compare">Compare properties</Link>
              </Button>
            </div>
          </div>
        </Card>
      </section>
    </main>
  );
}
