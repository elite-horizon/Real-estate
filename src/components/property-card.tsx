import { ArrowUpRight, GitCompareArrows, Heart, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatPrice, formatPropertyKind } from "@/lib/formatters";
import type { PropertyProject } from "@/types/property";
import { demoDatabase } from "@/data/demo-database";
import { useFavorites } from "@/hooks/use-favorites";
import { cn } from "@/lib/utils";
import { useComparison } from "@/hooks/use-comparison";

function getProjectPath(project: PropertyProject) {
  if (project.kind === "land") return `/lands/${project.id}`;
  if (project.kind === "apartment") return `/apartments/${project.id}`;
  if (project.kind === "house") return `/houses/${project.id}`;
  return `/villas/${project.id}`;
}

export function PropertyCard({ project }: { project: PropertyProject }) {
  const media = project.heroMediaId
    ? demoDatabase.media[project.heroMediaId]
    : undefined;
  const { isFavorite, toggleFavorite } = useFavorites();
  const saved = isFavorite(project.id);
  const { isCompared, isFull, toggleComparison } = useComparison();
  const compared = isCompared(project.id);
  return (
    <Card className="group overflow-hidden">
      <div className="relative aspect-[16/10] overflow-hidden bg-[linear-gradient(135deg,var(--color-primary),var(--color-primary-soft))]">
        {media ? (
          <img
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
            src={media.src}
            alt={media.alt}
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(197,160,89,0.28),transparent_30%)]" />
        )}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10"
          aria-hidden="true"
        />
        <Badge className="absolute left-4 top-4" variant="gold">
          {formatPropertyKind(project.kind)}
        </Badge>
        <Button
          className="absolute right-3 top-3 border-white/30 bg-black/25 text-white backdrop-blur-md hover:bg-black/40"
          variant="ghost"
          size="icon"
          aria-label={
            saved
              ? `Remove ${project.name} from favorites`
              : `Save ${project.name}`
          }
          aria-pressed={saved}
          onClick={() => toggleFavorite(project.id)}
        >
          <Heart
            className={cn(saved && "fill-current text-gold-light")}
            aria-hidden="true"
            size={17}
          />
        </Button>
        <p className="absolute bottom-4 left-4 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-white/75">
          Stitch-generated concept image
        </p>
      </div>
      <div className="p-5">
        <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.07em] text-muted">
          <MapPin aria-hidden="true" size={13} />
          {project.locality}, {project.city}
        </p>
        <h3 className="mt-2 font-display text-2xl font-medium text-foreground">
          {project.name}
        </h3>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted">
          {project.summary}
        </p>
        <div className="mt-5 flex items-end justify-between gap-4 border-t border-border pt-4">
          <div>
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.08em] text-muted">
              Starting from
            </p>
            <p className="mt-1 text-lg font-bold tabular-nums text-foreground">
              {formatPrice(project.startingPriceInr)}
            </p>
          </div>
          <Button asChild size="icon" variant="secondary">
            <Link
              to={getProjectPath(project)}
              aria-label={`Explore ${project.name}`}
            >
              <ArrowUpRight aria-hidden="true" size={17} />
            </Link>
          </Button>
        </div>
        <Button
          className="mt-3 w-full"
          size="sm"
          variant="ghost"
          disabled={isFull && !compared}
          aria-pressed={compared}
          onClick={() => toggleComparison(project.id)}
        >
          <GitCompareArrows aria-hidden="true" size={15} />
          {compared
            ? "Remove from comparison"
            : isFull
              ? "Comparison is full"
              : "Add to comparison"}
        </Button>
      </div>
    </Card>
  );
}
