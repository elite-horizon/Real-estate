import {
  ArrowLeft,
  ArrowRight,
  Bath,
  BedDouble,
  Building2,
  Car,
  Grid2X2,
  Home,
  Ruler,
  Trees,
} from "lucide-react";
import {
  Link,
  NavLink,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { AvailabilityBadge } from "@/components/availability-badge";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { DemoNotice } from "@/components/demo-notice";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { demoDatabase } from "@/data/demo-database";
import { VirtualTourExperience } from "@/features/virtual-tour/virtual-tour-experience";
import { formatArea, formatPrice } from "@/lib/formatters";
import { cn } from "@/lib/utils";

function HouseNotFound() {
  return (
    <main className="container-page grid min-h-[65dvh] place-items-center py-16 text-center">
      <div>
        <p className="eyebrow">House unavailable</p>
        <h1 className="mt-4 font-display text-4xl text-foreground">
          We could not find that home.
        </h1>
        <p className="mt-4 text-muted">
          This house is not part of the demonstration inventory.
        </p>
        <Button className="mt-7" asChild>
          <Link to="/houses">
            <ArrowLeft aria-hidden="true" size={16} />
            Return to houses
          </Link>
        </Button>
      </div>
    </main>
  );
}

function HouseSubnav({ houseId }: { houseId: string }) {
  const items = [
    { label: "Overview", to: `/houses/${houseId}`, end: true },
    { label: "Floor explorer", to: `/houses/${houseId}/floors` },
    { label: "Interior tour", to: `/houses/${houseId}/tour` },
  ];
  return (
    <nav
      className="overflow-x-auto border-b border-border bg-surface"
      aria-label="House"
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

export function HousePage() {
  const { pathname } = useLocation();
  const { houseId } = useParams();
  const house = houseId ? demoDatabase.houses[houseId] : undefined;
  if (!house) return <HouseNotFound />;
  const view = pathname.endsWith("/floors")
    ? "floors"
    : pathname.endsWith("/tour")
      ? "tour"
      : "overview";
  const media = house.heroMediaId
    ? demoDatabase.media[house.heroMediaId]
    : undefined;
  if (view === "overview")
    return (
      <main>
        <section className="relative min-h-[68dvh] overflow-hidden bg-navy-950 text-white">
          {media && (
            <img
              className="absolute inset-0 h-full w-full object-cover"
              src={media.src}
              alt={media.alt}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-[#06111f]/95 via-[#06111f]/72 to-[#06111f]/20" />
          <div className="container-page relative flex min-h-[68dvh] items-end py-14 sm:py-20">
            <div className="max-w-3xl">
              <Breadcrumbs
                items={[
                  { label: "Home", to: "/" },
                  { label: "Houses", to: "/houses" },
                  { label: house.name },
                ]}
              />
              <p className="mt-9 text-xs font-bold uppercase tracking-[0.18em] text-gold-light">
                {house.locality}, {house.city}
              </p>
              <div className="mt-4 flex items-end gap-4">
                <h1 className="font-display text-5xl font-semibold text-white sm:text-6xl">
                  {house.name}
                </h1>
                <AvailabilityBadge status={house.availability} />
              </div>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/75">
                {house.summary}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  className="border-gold bg-gold text-navy-950 hover:bg-gold-light"
                  asChild
                >
                  <Link to={`/houses/${house.id}/floors`}>
                    Explore house floors{" "}
                    <ArrowRight aria-hidden="true" size={16} />
                  </Link>
                </Button>
                <Button
                  className="border-white/50 text-white hover:bg-white/10"
                  variant="secondary"
                  asChild
                >
                  <Link to={`/houses/${house.id}/tour`}>Interior tour</Link>
                </Button>
              </div>
              <div className="mt-7">
                <DemoNotice>{house.demoNotice}</DemoNotice>
              </div>
            </div>
          </div>
        </section>
        <HouseSubnav houseId={house.id} />
        <HouseOverview house={house} />
      </main>
    );
  return (
    <main>
      <section className="bg-navy-950 text-white">
        <div className="container-page py-12 sm:py-16">
          <Breadcrumbs
            items={[
              { label: "Home", to: "/" },
              { label: "Houses", to: "/houses" },
              { label: house.name, to: `/houses/${house.id}` },
              { label: view === "floors" ? "Floor explorer" : "Interior tour" },
            ]}
          />
          <p className="mt-9 text-xs font-bold uppercase tracking-[0.18em] text-gold-light">
            {house.name}
          </p>
          <h1 className="mt-3 font-display text-4xl text-white sm:text-5xl">
            {view === "floors"
              ? "Explore the house floor by floor."
              : "Interior concept tour."}
          </h1>
          <p className="mt-4 max-w-2xl text-white/65">
            {view === "floors"
              ? "Switch levels and select rooms in the illustrative plan."
              : "Move between clearly labeled room concepts using the standard-image fallback."}
          </p>
        </div>
      </section>
      <HouseSubnav houseId={house.id} />
      <section className="container-page py-8 sm:py-12">
        <div className="mb-5">
          <DemoNotice>
            {view === "floors"
              ? "This floor plan is fictional and not suitable for measurement or construction."
              : "No true panoramas are available; ordinary concept images are not presented as 360° content."}
          </DemoNotice>
        </div>
        {view === "floors" ? (
          <HouseFloorExplorer floors={house.floors} />
        ) : (
          <VirtualTourExperience />
        )}
      </section>
    </main>
  );
}

function HouseOverview({
  house,
}: {
  house: NonNullable<(typeof demoDatabase.houses)[string]>;
}) {
  const stats = [
    { icon: BedDouble, label: "Bedrooms", value: house.bedrooms },
    { icon: Bath, label: "Bathrooms", value: house.bathrooms },
    { icon: Building2, label: "Floors", value: house.floors },
    {
      icon: Ruler,
      label: "Built-up area",
      value: formatArea(house.builtUpArea),
    },
    { icon: Trees, label: "Plot area", value: formatArea(house.plotArea) },
    { icon: Car, label: "Parking", value: "2 spaces" },
  ];
  return (
    <section className="container-page py-12 sm:py-20">
      <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
        <div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map(({ icon: Icon, label, value }) => (
              <Card className="p-5" key={label}>
                <Icon
                  className="text-gold-strong"
                  aria-hidden="true"
                  size={20}
                />
                <p className="mt-4 text-xs font-bold uppercase tracking-[0.07em] text-muted">
                  {label}
                </p>
                <p className="mt-1 font-semibold text-foreground">{value}</p>
              </Card>
            ))}
          </div>
          <Card className="mt-6 p-6 sm:p-8">
            <Home className="text-gold-strong" aria-hidden="true" size={28} />
            <h2 className="mt-5 font-display text-3xl text-foreground">
              A private home composed around light and landscape.
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted">
              The fictional specification balances shared living spaces on the
              lower level with private bedroom floors above, connected to
              garden, terrace, and utility edges.
            </p>
          </Card>
        </div>
        <aside>
          <Card className="p-6">
            <p className="eyebrow">Demonstration price</p>
            <p className="mt-3 text-3xl font-bold tabular-nums text-foreground">
              {formatPrice(house.priceInr)}
            </p>
            <p className="mt-2 text-xs text-muted">
              Illustrative value excluding taxes and registration.
            </p>
            <Button className="mt-6 w-full" asChild>
              <Link to={`/enquire/house/${house.id}`}>
                Enquire about this house{" "}
                <ArrowRight aria-hidden="true" size={16} />
              </Link>
            </Button>
          </Card>
        </aside>
      </div>
    </section>
  );
}

const floorRooms = [
  ["Entry Court", "Living Room", "Dining", "Kitchen", "Garden Deck", "Utility"],
  [
    "Master Suite",
    "Bedroom 2",
    "Bedroom 3",
    "Family Lounge",
    "Terrace",
    "Study",
  ],
  ["Guest Suite", "Media Room", "Gym", "Roof Terrace", "Store", "Service Room"],
];
function HouseFloorExplorer({ floors }: { floors: number }) {
  const [params, setParams] = useSearchParams();
  const level = Math.min(Number(params.get("level") ?? 1), floors);
  const rooms = floorRooms[level - 1] ?? floorRooms[0]!;
  const selected = params.get("room") ?? rooms[0]!;
  function setSelection(nextLevel: number, room?: string) {
    const next = new URLSearchParams(params);
    next.set("level", String(nextLevel));
    next.set("room", room ?? floorRooms[nextLevel - 1]?.[0] ?? "Living Room");
    setParams(next, { replace: true });
  }
  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_20rem]">
      <Card className="overflow-hidden">
        <div className="flex gap-1 border-b border-border p-3">
          {Array.from({ length: floors }, (_, index) => (
            <Button
              key={index}
              size="sm"
              variant={level === index + 1 ? "primary" : "ghost"}
              onClick={() => setSelection(index + 1)}
            >
              {index === 0 ? "Ground" : `Level ${index}`}
            </Button>
          ))}
        </div>
        <div className="grid min-h-[34rem] grid-cols-2 gap-3 bg-[#e8e1d2] p-5 sm:grid-cols-3 sm:p-8">
          {rooms.map((room, index) => (
            <button
              key={room}
              type="button"
              onClick={() => setSelection(level, room)}
              className={`relative grid min-h-40 place-items-center border-4 p-4 text-center transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-selected ${selected === room ? "z-10 border-selected bg-gold/35 shadow-xl" : "border-[#718096] bg-white/60 hover:border-gold"}`}
            >
              <Grid2X2
                className="text-gold-strong"
                aria-hidden="true"
                size={21}
              />
              <strong className="mt-3 text-foreground">{room}</strong>
              <span className="mt-1 text-xs text-muted">
                {110 + index * 18} sq. ft.
              </span>
            </button>
          ))}
        </div>
      </Card>
      <aside>
        <Card className="p-6">
          <p className="eyebrow">Selected space</p>
          <h2 className="mt-2 font-display text-3xl text-foreground">
            {selected}
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            An illustrative room on{" "}
            {level === 1 ? "the ground floor" : `level ${level - 1}`} with
            conceptual furniture and circulation.
          </p>
          <Button
            className="mt-6 w-full"
            variant="secondary"
            onClick={() => setSelection(1, "Living Room")}
          >
            Reset explorer
          </Button>
        </Card>
      </aside>
    </div>
  );
}
