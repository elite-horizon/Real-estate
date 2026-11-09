import type { LucideIcon } from "lucide-react";
import { ArrowRight, Building2, Home, LandPlot, Map, Sparkles } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

type RouteInfo = { eyebrow: string; title: string; description: string; icon: LucideIcon };

const exactRoutes: Record<string, RouteInfo> = {
  "/": { eyebrow: "Foundation preview", title: "A considered home for remarkable places.", description: "The application shell, route architecture, accessibility baseline, and premium design tokens are ready. The full editorial homepage arrives in Milestone 4.", icon: Sparkles },
  "/properties": { eyebrow: "Property portfolio", title: "Every address, one considered collection.", description: "A unified catalog for land, apartments, houses, and private villa communities will live here.", icon: Building2 },
  "/map": { eyebrow: "Map search", title: "Explore by place.", description: "The future geographic search experience will connect project context, nearby infrastructure, and inventory.", icon: Map },
  "/compare": { eyebrow: "Property comparison", title: "Compare what matters.", description: "A focused comparison workspace will make specifications, price, and amenities easy to review.", icon: Building2 },
  "/favorites": { eyebrow: "Saved properties", title: "Your considered shortlist.", description: "Favorited plots, flats, homes, and villas will be stored locally for this frontend demonstration.", icon: Home },
  "/lands": { eyebrow: "Plotted developments", title: "Land with a clear sense of possibility.", description: "Project stories, masterplans, plot status, dimensions, nearby context, and pricing will form the land journey.", icon: LandPlot },
  "/apartments": { eyebrow: "Apartment residences", title: "A better view of vertical living.", description: "Visitors will move naturally from project to tower, floor, flat, plan, and virtual tour.", icon: Building2 },
  "/houses": { eyebrow: "Individual houses", title: "Homes with room for a life.", description: "The house journey will pair detailed specifications with floor exploration and an interior experience.", icon: Home },
  "/villas": { eyebrow: "Villa communities", title: "Privacy, considered as a community.", description: "Community masterplans, individual villa details, amenities, and tour experiences will be connected here.", icon: Home },
  "/schedule-visit": { eyebrow: "Private viewing", title: "Plan a site visit.", description: "A later milestone will add an accessible, clearly simulated scheduling confirmation flow.", icon: Sparkles },
  "/emi-calculator": { eyebrow: "Finance preview", title: "Understand the monthly picture.", description: "The EMI demonstration will help visitors explore example terms without presenting financial advice.", icon: Building2 },
  "/saved": { eyebrow: "Saved dashboard", title: "Return to your property journey.", description: "This dashboard will bring together favorites, comparisons, and simulated enquiries.", icon: Home },
};

function inferRoute(pathname: string): RouteInfo {
  if (pathname.startsWith("/lands/")) return { ...exactRoutes["/lands"]!, eyebrow: "Land journey preview" };
  if (pathname.startsWith("/apartments/")) return { ...exactRoutes["/apartments"]!, eyebrow: "Apartment journey preview" };
  if (pathname.startsWith("/houses/")) return { ...exactRoutes["/houses"]!, eyebrow: "House journey preview" };
  if (pathname.startsWith("/villas/")) return { ...exactRoutes["/villas"]!, eyebrow: "Villa journey preview" };
  if (pathname.startsWith("/enquire/")) return { eyebrow: "Property enquiry", title: "Start a conversation.", description: "The enquiry form and its clearly simulated confirmation will be delivered in Milestone 9.", icon: Sparkles };
  return exactRoutes[pathname] ?? exactRoutes["/"]!;
}

export function FoundationPage() {
  const { pathname } = useLocation();
  const route = inferRoute(pathname);
  const Icon = route.icon;

  return (
    <main className="relative isolate overflow-hidden">
      <div className="ambient-orb" aria-hidden="true" />
      <section className="container-page grid min-h-[calc(100dvh-5rem)] items-center gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
        <div className="max-w-3xl">
          <p className="eyebrow">{route.eyebrow}</p>
          <h1 className="mt-5 max-w-3xl font-display text-5xl leading-[0.98] tracking-[-0.035em] text-foreground sm:text-6xl lg:text-7xl">
            {route.title}
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-muted sm:text-lg">{route.description}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg"><Link to="/properties">Explore the foundation <ArrowRight aria-hidden="true" size={17} /></Link></Button>
            <Button asChild size="lg" variant="secondary"><Link to="/map">View route preview</Link></Button>
          </div>
          <p className="mt-7 text-xs tracking-wide text-muted">Fictional presentation prototype · Milestone 2 of 10</p>
        </div>
        <div className="relative mx-auto aspect-[4/5] w-full max-w-md rounded-[2rem] border border-border bg-surface p-3 shadow-2xl shadow-black/25">
          <div className="grid h-full place-items-center overflow-hidden rounded-[1.45rem] border border-white/5 bg-[radial-gradient(circle_at_30%_20%,rgba(201,168,101,0.18),transparent_28%),linear-gradient(145deg,#17283a,#091522_70%)]">
            <div className="text-center">
              <span className="mx-auto grid size-20 place-items-center rounded-full border border-gold/40 bg-gold/10 text-gold"><Icon aria-hidden="true" size={32} strokeWidth={1.25} /></span>
              <p className="mt-6 font-display text-2xl text-foreground">Experience in progress</p>
              <p className="mx-auto mt-2 max-w-64 text-sm leading-6 text-muted">The route is live and ready for its feature milestone.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
