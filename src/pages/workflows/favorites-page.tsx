import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { PropertyCard } from "@/components/property-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getAllProjects } from "@/data/queries";
import { useFavorites } from "@/hooks/use-favorites";
import { WorkflowHeader } from "@/pages/shared/workflow-shared";

export function FavoritesPage() {
  const { favorites } = useFavorites();
  const items = getAllProjects().filter((item) => favorites.includes(item.id));
  return (
    <main>
      <WorkflowHeader
        eyebrow="Saved locally"
        title="Your considered shortlist."
        description="Favorite project collections are stored only in this browser for the demonstration."
      />
      <section className="container-page py-10 sm:py-14">
        {items.length ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => (
              <PropertyCard key={item.id} project={item} />
            ))}
          </div>
        ) : (
          <Card className="grid min-h-72 place-items-center p-8 text-center">
            <div>
              <Heart
                className="mx-auto text-gold-strong"
                aria-hidden="true"
                size={34}
              />
              <h2 className="mt-5 font-display text-3xl">No favorites yet.</h2>
              <p className="mt-3 text-sm text-muted">
                Use the heart control on a property card to build a shortlist.
              </p>
              <Button className="mt-6" asChild>
                <Link to="/properties">Explore the collection</Link>
              </Button>
            </div>
          </Card>
        )}
      </section>
    </main>
  );
}
