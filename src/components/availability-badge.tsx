import { Badge } from "@/components/ui/badge";
import type { Availability } from "@/types/property";

export function AvailabilityBadge({ status }: { status: Availability }) {
  return <Badge variant={status}>{status}</Badge>;
}
