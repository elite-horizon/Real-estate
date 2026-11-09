import {
  CalendarDays,
  GitCompareArrows,
  Heart,
  Inbox,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useComparison } from "@/hooks/use-comparison";
import { useDemoActivity } from "@/hooks/use-demo-activity";
import { useFavorites } from "@/hooks/use-favorites";
import { WorkflowHeader } from "@/pages/shared/workflow-shared";

export function SavedDashboardPage() {
  const { favorites } = useFavorites();
  const { comparison } = useComparison();
  const { activity, clearActivity } = useDemoActivity();
  return (
    <main>
      <WorkflowHeader
        eyebrow="Local dashboard"
        title="Return to your property journey."
        description="Favorites, comparison choices, and simulated requests stored in this browser are gathered here."
      />
      <section className="container-page py-10 sm:py-14">
        <div className="grid gap-4 sm:grid-cols-3">
          <Summary
            icon={Heart}
            label="Favorites"
            value={favorites.length}
            to="/favorites"
          />
          <Summary
            icon={GitCompareArrows}
            label="Compared"
            value={comparison.length}
            to="/compare"
          />
          <Summary
            icon={Inbox}
            label="Demo requests"
            value={activity.length}
            to="#activity"
          />
        </div>
        <div className="mt-8 flex items-center justify-between">
          <h2 id="activity" className="font-display text-3xl">
            Recent demo activity
          </h2>
          {activity.length > 0 && (
            <Button size="sm" variant="ghost" onClick={clearActivity}>
              <Trash2 aria-hidden="true" size={15} />
              Clear activity
            </Button>
          )}
        </div>
        {activity.length ? (
          <div className="mt-5 grid gap-3">
            {activity.map((item) => (
              <Card
                key={item.id}
                className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center"
              >
                <div className="flex gap-4">
                  {item.kind === "visit" ? (
                    <CalendarDays
                      className="mt-1 text-gold-strong"
                      aria-hidden="true"
                    />
                  ) : (
                    <Inbox
                      className="mt-1 text-gold-strong"
                      aria-hidden="true"
                    />
                  )}
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-muted">
                      Simulated {item.kind}
                    </p>
                    <h3 className="mt-1 font-semibold">{item.propertyLabel}</h3>
                    <p className="mt-1 text-sm text-muted">{item.detail}</p>
                  </div>
                </div>
                <time className="text-xs text-muted" dateTime={item.createdAt}>
                  {new Date(item.createdAt).toLocaleDateString()}
                </time>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="mt-5 p-8 text-center text-sm text-muted">
            No simulated enquiries or visit preferences have been saved.
          </Card>
        )}
      </section>
    </main>
  );
}
function Summary({
  icon: Icon,
  label,
  value,
  to,
}: {
  icon: typeof Heart;
  label: string;
  value: number;
  to: string;
}) {
  return (
    <Card className="p-6">
      <Icon className="text-gold-strong" aria-hidden="true" />
      <p className="mt-5 text-sm text-muted">{label}</p>
      <p className="mt-1 text-3xl font-bold tabular-nums">{value}</p>
      <Button className="mt-4" size="sm" variant="ghost" asChild>
        <Link to={to}>Open {label.toLowerCase()}</Link>
      </Button>
    </Card>
  );
}
