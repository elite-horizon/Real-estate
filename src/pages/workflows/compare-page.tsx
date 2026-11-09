import { GitCompareArrows, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getAllProjects } from "@/data/queries";
import { useComparison } from "@/hooks/use-comparison";
import { formatArea, formatPrice, formatPropertyKind } from "@/lib/formatters";
import { projectPath } from "@/lib/property-reference";
import { WorkflowHeader } from "@/pages/shared/workflow-shared";

export function ComparePage() {
  const { comparison, toggleComparison, clearComparison } = useComparison();
  const items = comparison
    .map((id) => getAllProjects().find((item) => item.id === id))
    .filter((item) => item !== undefined);
  return (
    <main>
      <WorkflowHeader
        eyebrow="Side-by-side review"
        title="Compare what matters."
        description="Review up to three fictional properties using a focused set of shared attributes."
      />
      <section className="container-page py-10 sm:py-14">
        {items.length ? (
          <>
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm text-muted">
                {items.length} of 3 comparison spaces used
              </p>
              <Button variant="ghost" size="sm" onClick={clearComparison}>
                <Trash2 aria-hidden="true" size={15} />
                Clear all
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[44rem] border-separate border-spacing-0 overflow-hidden rounded border border-border bg-surface text-left">
                <caption className="sr-only">Property comparison</caption>
                <thead>
                  <tr>
                    <th className="border-b border-border p-4 text-sm text-muted">
                      Attribute
                    </th>
                    {items.map((item) => (
                      <th
                        key={item.id}
                        className="border-b border-l border-border p-4 align-top"
                      >
                        <span className="eyebrow">
                          {formatPropertyKind(item.kind)}
                        </span>
                        <strong className="mt-2 block font-display text-2xl">
                          {item.name}
                        </strong>
                        <Button
                          className="mt-3"
                          size="sm"
                          variant="ghost"
                          onClick={() => toggleComparison(item.id)}
                        >
                          Remove
                        </Button>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      label: "Location",
                      value: (item: (typeof items)[number]) =>
                        `${item.locality}, ${item.city}`,
                    },
                    {
                      label: "Starting price",
                      value: (item: (typeof items)[number]) =>
                        formatPrice(item.startingPriceInr),
                    },
                    {
                      label: "Scale",
                      value: (item: (typeof items)[number]) =>
                        "totalArea" in item
                          ? formatArea(item.totalArea)
                          : "builtUpArea" in item
                            ? formatArea(item.builtUpArea)
                            : "Community collection",
                    },
                    {
                      label: "Amenities",
                      value: (item: (typeof items)[number]) =>
                        `${item.amenityIds.length} highlighted`,
                    },
                  ].map((row) => (
                    <tr key={row.label}>
                      <th className="border-b border-border p-4 text-sm text-muted">
                        {row.label}
                      </th>
                      {items.map((item) => (
                        <td
                          key={item.id}
                          className="border-b border-l border-border p-4 font-semibold"
                        >
                          {row.value(item)}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <th className="p-4 text-sm text-muted">Explore</th>
                    {items.map((item) => (
                      <td key={item.id} className="border-l border-border p-4">
                        <Button asChild size="sm">
                          <Link to={projectPath(item)}>View property</Link>
                        </Button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <Card className="grid min-h-72 place-items-center p-8 text-center">
            <div>
              <GitCompareArrows
                className="mx-auto text-gold-strong"
                aria-hidden="true"
                size={34}
              />
              <h2 className="mt-5 font-display text-3xl">
                Your comparison is empty.
              </h2>
              <p className="mt-3 text-sm text-muted">
                Add properties from the collection to compare up to three.
              </p>
              <Button className="mt-6" asChild>
                <Link to="/properties">Browse properties</Link>
              </Button>
            </div>
          </Card>
        )}
      </section>
    </main>
  );
}
