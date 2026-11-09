import { Home, Search } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { AvailabilityBadge } from "@/components/availability-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { formatArea, formatFacing, formatPrice } from "@/lib/formatters";
import type { Villa, VillaCommunity } from "@/types/property";

const positions: Array<readonly [number, number]> = [
  [130, 120],
  [330, 95],
  [530, 135],
  [230, 345],
  [475, 360],
];
const colors = {
  available: "#059669",
  reserved: "#b7791f",
  sold: "#b42318",
} as const;

export function VillaMasterplan({
  community,
  villas,
}: {
  community: VillaCommunity;
  villas: Villa[];
}) {
  const [params, setParams] = useSearchParams();
  const selectedId = params.get("villa");
  const selected = villas.find((villa) => villa.id === selectedId);
  const query = (params.get("search") ?? "").toLowerCase();
  const status = params.get("status") ?? "all";
  const filtered = villas.filter(
    (villa) =>
      villa.name.toLowerCase().includes(query) &&
      (status === "all" || villa.availability === status),
  );
  function setParam(key: string, value: string) {
    const next = new URLSearchParams(params);
    if (!value || value === "all") next.delete(key);
    else next.set(key, value);
    const current = villas.find((villa) => villa.id === next.get("villa"));
    if (
      current &&
      ((next.get("status") && current.availability !== next.get("status")) ||
        (next.get("search") &&
          !current.name
            .toLowerCase()
            .includes(next.get("search")!.toLowerCase())))
    )
      next.delete("villa");
    setParams(next, { replace: true });
  }
  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_22rem]">
      <div>
        <Card className="grid gap-3 p-4 sm:grid-cols-[1fr_0.7fr]">
          <label className="relative">
            <span className="sr-only">Search villa</span>
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
              aria-hidden="true"
              size={16}
            />
            <Input
              className="pl-10"
              placeholder="Search villa"
              value={params.get("search") ?? ""}
              onChange={(event) => setParam("search", event.target.value)}
            />
          </label>
          <label>
            <span className="sr-only">Availability</span>
            <Select
              value={status}
              onChange={(event) => setParam("status", event.target.value)}
            >
              <option value="all">Every status</option>
              <option value="available">Available</option>
              <option value="reserved">Reserved</option>
              <option value="sold">Sold</option>
            </Select>
          </label>
        </Card>
        <Card className="mt-5 overflow-hidden">
          <div className="flex flex-wrap gap-2 border-b border-border p-3">
            <Badge variant="available">Available</Badge>
            <Badge variant="reserved">Reserved</Badge>
            <Badge variant="sold">Sold</Badge>
            <Badge variant="selected">Selected</Badge>
          </div>
          <div className="overflow-auto bg-[#d9d1bf] p-4">
            <svg
              viewBox="0 0 720 540"
              className="min-w-[650px]"
              role="img"
              aria-labelledby="villa-plan-title"
            >
              <title id="villa-plan-title">
                Illustrative selectable masterplan for {community.name}
              </title>
              <rect
                x="20"
                y="20"
                width="680"
                height="500"
                rx="30"
                fill="#b9c9aa"
                stroke="#71866b"
                strokeWidth="4"
              />
              <path
                d="M60 265 H660 M360 55 V485"
                stroke="#eee9dd"
                strokeWidth="44"
              />
              <path
                d="M60 265 H660 M360 55 V485"
                stroke="#9a907d"
                strokeWidth="2"
                strokeDasharray="12 10"
              />
              <ellipse
                cx="360"
                cy="265"
                rx="80"
                ry="58"
                fill="#8fb0a1"
                stroke="#547566"
                strokeWidth="3"
              />
              <text
                x="360"
                y="270"
                textAnchor="middle"
                fill="#284b3b"
                fontSize="14"
                fontWeight="700"
              >
                CLUB GARDEN
              </text>
              {villas.map((villa, index) => {
                const [x, y] = positions[index] ?? [360, 265];
                const visible = filtered.some((item) => item.id === villa.id);
                if (!visible) return null;
                const chosen = villa.id === selectedId;
                return (
                  <g
                    key={villa.id}
                    role="button"
                    tabIndex={0}
                    aria-label={`${villa.name}, ${villa.availability}`}
                    onClick={() => setParam("villa", villa.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setParam("villa", villa.id);
                      }
                    }}
                    className="cursor-pointer focus-visible:outline-none"
                  >
                    <rect
                      x={x - 58}
                      y={y - 42}
                      width="116"
                      height="84"
                      rx="8"
                      fill={chosen ? "#2563eb" : colors[villa.availability]}
                      fillOpacity="0.86"
                      stroke={chosen ? "#1d4ed8" : "white"}
                      strokeWidth={chosen ? 5 : 3}
                    />
                    <path
                      d={`M${x - 48} ${y - 18} L${x} ${y - 50} L${x + 48} ${y - 18}`}
                      fill="none"
                      stroke="white"
                      strokeWidth="4"
                    />
                    <text
                      x={x}
                      y={y + 12}
                      textAnchor="middle"
                      fill="white"
                      fontWeight="700"
                      fontSize="13"
                    >
                      {villa.name}
                    </text>
                  </g>
                );
              })}
              <text x="45" y="505" fill="#4f473a" fontSize="11">
                SCHEMATIC DEMONSTRATION · NOT A SURVEY DRAWING
              </text>
            </svg>
          </div>
        </Card>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((villa) => (
            <button
              key={villa.id}
              type="button"
              onClick={() => setParam("villa", villa.id)}
              className={`flex items-center justify-between rounded border p-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${selectedId === villa.id ? "border-selected bg-selected/10" : "border-border bg-surface hover:border-gold"}`}
            >
              <span>
                <strong className="text-sm text-foreground">
                  {villa.name}
                </strong>
                <span className="mt-1 block text-xs text-muted">
                  {formatArea(villa.plotArea)}
                </span>
              </span>
              <AvailabilityBadge status={villa.availability} />
            </button>
          ))}
        </div>
      </div>
      <aside className="xl:sticky xl:top-24 xl:self-start">
        {selected ? (
          <Card className="p-6">
            <AvailabilityBadge status={selected.availability} />
            <h2 className="mt-4 font-display text-3xl text-foreground">
              {selected.name}
            </h2>
            <dl className="mt-5 grid grid-cols-2 gap-4 border-y border-border py-5 text-sm">
              <div>
                <dt className="text-muted">Built-up</dt>
                <dd className="mt-1 font-semibold text-foreground">
                  {formatArea(selected.builtUpArea)}
                </dd>
              </div>
              <div>
                <dt className="text-muted">Facing</dt>
                <dd className="mt-1 font-semibold text-foreground">
                  {formatFacing(selected.facing)}
                </dd>
              </div>
              <div>
                <dt className="text-muted">Bedrooms</dt>
                <dd className="mt-1 font-semibold text-foreground">
                  {selected.bedrooms}
                </dd>
              </div>
              <div>
                <dt className="text-muted">Price</dt>
                <dd className="mt-1 font-semibold text-foreground">
                  {formatPrice(selected.priceInr)}
                </dd>
              </div>
            </dl>
            <Button className="mt-6 w-full" asChild>
              <Link to={`/villas/${community.id}/villas/${selected.id}`}>
                View villa details
              </Link>
            </Button>
          </Card>
        ) : (
          <Card className="p-6 text-center">
            <Home
              className="mx-auto text-gold-strong"
              aria-hidden="true"
              size={28}
            />
            <h2 className="mt-4 font-display text-2xl text-foreground">
              Select a villa
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              Choose a residence on the plan or from the accessible list.
            </p>
          </Card>
        )}
      </aside>
    </div>
  );
}
