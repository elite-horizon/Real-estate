import { ArrowLeft } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { VillaCommunity } from "@/types/property";

export function VillaNotFound() {
  return (
    <main className="container-page grid min-h-[65dvh] place-items-center py-16 text-center">
      <div>
        <p className="eyebrow">Villa unavailable</p>
        <h1 className="mt-4 font-display text-4xl text-foreground">
          We could not find that villa.
        </h1>
        <p className="mt-4 text-muted">
          This community or residence is not part of the demonstration
          inventory.
        </p>
        <Button className="mt-7" asChild>
          <Link to="/villas">
            <ArrowLeft aria-hidden="true" size={16} />
            Return to villa communities
          </Link>
        </Button>
      </div>
    </main>
  );
}

export function VillaCommunitySubnav({
  community,
}: {
  community: VillaCommunity;
}) {
  const base = `/villas/${community.id}`;
  const items = [
    { label: "Overview", to: base, end: true },
    { label: "Masterplan", to: `${base}/masterplan` },
    { label: "Amenities & security", to: `${base}/amenities` },
  ];
  return (
    <nav
      className="overflow-x-auto border-b border-border bg-surface"
      aria-label="Villa community"
    >
      <div className="container-page flex min-w-max gap-1">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              cn(
                "border-b-2 border-transparent px-4 py-4 text-sm font-semibold text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                isActive && "border-gold text-foreground",
              )
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
