import {
  ArrowRight,
  Bath,
  BedDouble,
  Compass,
  Home,
  Ruler,
  ShieldCheck,
  Sparkles,
  Trees,
} from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";
import { AvailabilityBadge } from "@/components/availability-badge";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { DemoNotice } from "@/components/demo-notice";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { demoDatabase } from "@/data/demo-database";
import { VillaMasterplan } from "@/features/villa-masterplan/villa-masterplan";
import { formatArea, formatFacing, formatPrice } from "@/lib/formatters";
import {
  VillaCommunitySubnav,
  VillaNotFound,
} from "@/pages/villas/villa-shared";
import type { Amenity, Villa } from "@/types/property";

function isVilla(value: Villa | undefined): value is Villa {
  return value !== undefined;
}

function isAmenity(value: Amenity | undefined): value is Amenity {
  return value !== undefined;
}

export function VillaCommunityPage() {
  const { pathname } = useLocation();
  const { communityId } = useParams();
  const community = communityId
    ? demoDatabase.villaCommunities[communityId]
    : undefined;
  if (!community) return <VillaNotFound />;
  const villas = community.villaIds
    .map((id) => demoDatabase.villas[id])
    .filter(isVilla);
  const view = pathname.endsWith("/masterplan")
    ? "masterplan"
    : pathname.endsWith("/amenities")
      ? "amenities"
      : "overview";
  if (view === "overview")
    return <CommunityOverview community={community} villas={villas} />;
  return (
    <main>
      <CommunityHeader
        community={community}
        title={
          view === "masterplan"
            ? "Choose a private address."
            : "Resident amenities and security."
        }
      />
      <VillaCommunitySubnav community={community} />
      <section className="container-page py-8 sm:py-12">
        <DemoNotice>
          {view === "masterplan"
            ? "This masterplan is a fictional interactive diagram, not a survey or sales plan."
            : community.demoNotice}
        </DemoNotice>
        <div className="mt-5">
          {view === "masterplan" ? (
            <VillaMasterplan community={community} villas={villas} />
          ) : (
            <Amenities communityId={community.id} />
          )}
        </div>
      </section>
    </main>
  );
}

export function VillaDetailPage() {
  const { communityId, villaId } = useParams();
  const community = communityId
    ? demoDatabase.villaCommunities[communityId]
    : undefined;
  const villa = villaId ? demoDatabase.villas[villaId] : undefined;
  if (!community || !villa || villa.communityId !== community.id)
    return <VillaNotFound />;
  const stats = [
    { icon: BedDouble, label: "Bedrooms", value: villa.bedrooms },
    { icon: Bath, label: "Bathrooms", value: villa.bathrooms },
    { icon: Ruler, label: "Built-up", value: formatArea(villa.builtUpArea) },
    { icon: Trees, label: "Private plot", value: formatArea(villa.plotArea) },
    { icon: Compass, label: "Facing", value: formatFacing(villa.facing) },
  ];
  return (
    <main>
      <section className="bg-navy-950 text-white">
        <div className="container-page py-12 sm:py-16">
          <Breadcrumbs
            items={[
              { label: "Home", to: "/" },
              { label: "Villas", to: "/villas" },
              { label: community.name, to: `/villas/${community.id}` },
              { label: villa.name },
            ]}
          />
          <div className="mt-9 flex flex-wrap items-end gap-4">
            <h1 className="font-display text-5xl text-white">{villa.name}</h1>
            <AvailabilityBadge status={villa.availability} />
          </div>
          <p className="mt-4 max-w-2xl text-white/65">
            A fictional private residence within {community.name}, composed
            around garden living and discreet service.
          </p>
        </div>
      </section>
      <VillaCommunitySubnav community={community} />
      <section className="container-page py-10 sm:py-16">
        <DemoNotice>{community.demoNotice}</DemoNotice>
        <div className="mt-7 grid gap-7 lg:grid-cols-[1fr_22rem]">
          <div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {stats.map(({ icon: Icon, label, value }) => (
                <Card key={label} className="p-5">
                  <Icon
                    className="text-gold-strong"
                    aria-hidden="true"
                    size={20}
                  />
                  <p className="mt-4 text-xs font-bold uppercase tracking-wider text-muted">
                    {label}
                  </p>
                  <p className="mt-1 font-semibold text-foreground">{value}</p>
                </Card>
              ))}
            </div>
            <Card className="mt-5 p-7">
              <Home className="text-gold-strong" aria-hidden="true" />
              <h2 className="mt-5 font-display text-3xl text-foreground">
                Indoor-outdoor living with a private garden edge.
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted">
                The demonstration layout pairs generous entertaining rooms with
                bedroom suites, shaded terraces, and service circulation.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild>
                  <Link
                    to={`/villas/${community.id}/villas/${villa.id}/floor-plan`}
                  >
                    Explore floor plan{" "}
                    <ArrowRight aria-hidden="true" size={16} />
                  </Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link to={`/villas/${community.id}/villas/${villa.id}/tour`}>
                    Interior tour
                  </Link>
                </Button>
              </div>
            </Card>
          </div>
          <aside>
            <Card className="p-6">
              <p className="eyebrow">Demonstration price</p>
              <p className="mt-3 text-3xl font-bold tabular-nums text-foreground">
                {formatPrice(villa.priceInr)}
              </p>
              <p className="mt-2 text-xs text-muted">
                Illustrative value excluding taxes and fees.
              </p>
              <Button className="mt-6 w-full" asChild>
                <Link to={`/enquire/villa/${villa.id}`}>
                  Enquire about this villa
                </Link>
              </Button>
            </Card>
          </aside>
        </div>
      </section>
    </main>
  );
}

function CommunityHeader({
  community,
  title,
}: {
  community: NonNullable<(typeof demoDatabase.villaCommunities)[string]>;
  title: string;
}) {
  return (
    <section className="bg-navy-950 text-white">
      <div className="container-page py-12 sm:py-16">
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: "Villas", to: "/villas" },
            { label: community.name },
          ]}
        />
        <p className="mt-9 text-xs font-bold uppercase tracking-[0.18em] text-gold-light">
          {community.locality}, {community.city}
        </p>
        <h1 className="mt-3 font-display text-4xl text-white sm:text-5xl">
          {title}
        </h1>
      </div>
    </section>
  );
}

function CommunityOverview({
  community,
  villas,
}: {
  community: NonNullable<(typeof demoDatabase.villaCommunities)[string]>;
  villas: NonNullable<(typeof demoDatabase.villas)[string]>[];
}) {
  const media = community.heroMediaId
    ? demoDatabase.media[community.heroMediaId]
    : undefined;
  const available = villas.filter(
    (villa) => villa.availability === "available",
  ).length;
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
        <div className="absolute inset-0 bg-gradient-to-r from-[#06111f]/95 via-[#06111f]/70 to-transparent" />
        <div className="container-page relative flex min-h-[68dvh] items-end py-16">
          <div className="max-w-3xl">
            <Breadcrumbs
              items={[
                { label: "Home", to: "/" },
                { label: "Villas", to: "/villas" },
                { label: community.name },
              ]}
            />
            <p className="mt-9 text-xs font-bold uppercase tracking-[0.18em] text-gold-light">
              {community.locality}, {community.city}
            </p>
            <h1 className="mt-4 font-display text-5xl text-white sm:text-6xl">
              {community.name}
            </h1>
            <p className="mt-5 max-w-2xl leading-7 text-white/75">
              {community.summary}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link to={`/villas/${community.id}/masterplan`}>
                  Explore masterplan <ArrowRight aria-hidden="true" size={16} />
                </Link>
              </Button>
              <Button
                variant="secondary"
                className="border-white/40 text-white hover:bg-white/10"
                asChild
              >
                <Link to={`/villas/${community.id}/amenities`}>
                  Amenities & security
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <VillaCommunitySubnav community={community} />
      <section className="container-page py-12 sm:py-20">
        <DemoNotice>{community.demoNotice}</DemoNotice>
        <div className="mt-7 grid gap-4 sm:grid-cols-3">
          <Card className="p-6">
            <Trees className="text-gold-strong" aria-hidden="true" />
            <p className="mt-4 text-sm text-muted">Community area</p>
            <p className="mt-1 text-xl font-semibold">
              {formatArea(community.totalArea)}
            </p>
          </Card>
          <Card className="p-6">
            <Home className="text-gold-strong" aria-hidden="true" />
            <p className="mt-4 text-sm text-muted">Demo residences</p>
            <p className="mt-1 text-xl font-semibold">{villas.length} villas</p>
          </Card>
          <Card className="p-6">
            <Sparkles className="text-gold-strong" aria-hidden="true" />
            <p className="mt-4 text-sm text-muted">Currently available</p>
            <p className="mt-1 text-xl font-semibold">{available} villas</p>
          </Card>
        </div>
      </section>
    </main>
  );
}

function Amenities({ communityId }: { communityId: string }) {
  const community = demoDatabase.villaCommunities[communityId]!;
  const amenities = community.amenityIds
    .map((id) => demoDatabase.amenities[id])
    .filter(isAmenity);
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {amenities.map((amenity, index) => (
        <Card key={amenity.id} className="p-7">
          {index === 0 ? (
            <ShieldCheck className="text-gold-strong" aria-hidden="true" />
          ) : (
            <Sparkles className="text-gold-strong" aria-hidden="true" />
          )}
          <h2 className="mt-5 font-display text-2xl text-foreground">
            {amenity.name}
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            {amenity.description}
          </p>
        </Card>
      ))}
    </div>
  );
}
