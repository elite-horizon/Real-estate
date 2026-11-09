import { Link, useLocation, useParams } from "react-router-dom";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { DemoNotice } from "@/components/demo-notice";
import { Button } from "@/components/ui/button";
import { demoDatabase } from "@/data/demo-database";
import { FloorPlanExperience } from "@/features/floor-plan/floor-plan-experience";
import { VirtualTourExperience } from "@/features/virtual-tour/virtual-tour-experience";
import { VillaNotFound } from "@/pages/villas/villa-shared";

export function VillaExperiencePage() {
  const { pathname } = useLocation();
  const { communityId, villaId } = useParams();
  const community = communityId
    ? demoDatabase.villaCommunities[communityId]
    : undefined;
  const villa = villaId ? demoDatabase.villas[villaId] : undefined;
  if (!community || !villa || villa.communityId !== community.id)
    return <VillaNotFound />;
  const isTour = pathname.endsWith("/tour");
  return (
    <main>
      <section className="bg-navy-950 text-white">
        <div className="container-page py-12 sm:py-16">
          <Breadcrumbs
            items={[
              { label: "Home", to: "/" },
              { label: "Villas", to: "/villas" },
              { label: community.name, to: `/villas/${community.id}` },
              {
                label: villa.name,
                to: `/villas/${community.id}/villas/${villa.id}`,
              },
              { label: isTour ? "Tour" : "Floor plan" },
            ]}
          />
          <h1 className="mt-9 font-display text-4xl text-white sm:text-5xl">
            {isTour
              ? "Interior concept tour."
              : "Interactive villa floor plan."}
          </h1>
          <p className="mt-4 text-white/65">
            {villa.name} · {community.name}
          </p>
        </div>
      </section>
      <section className="container-page py-8 sm:py-12">
        <DemoNotice>
          {isTour
            ? "Standard concept images are clearly presented as a non-360 fallback."
            : "Simplified fictional geometry; not a construction drawing."}
        </DemoNotice>
        <div className="mt-5">
          {isTour ? <VirtualTourExperience /> : <FloorPlanExperience />}
        </div>
        <Button className="mt-5" variant="secondary" asChild>
          <Link to={`/villas/${community.id}/villas/${villa.id}`}>
            Return to villa details
          </Link>
        </Button>
      </section>
    </main>
  );
}
