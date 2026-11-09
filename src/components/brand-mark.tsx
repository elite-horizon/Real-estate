import { Building2 } from "lucide-react";
import { Link } from "react-router-dom";

export function BrandMark() {
  return (
    <Link
      className="inline-flex items-center gap-3 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
      to="/"
    >
      <span className="grid size-10 place-items-center rounded border border-gold/60 text-gold-strong">
        <Building2 aria-hidden="true" size={19} strokeWidth={1.5} />
      </span>
      <span>
        <span className="block font-display text-lg font-semibold leading-none tracking-[0.14em] text-foreground">
          AURELIS
        </span>
        <span className="mt-1 block text-[0.6rem] font-semibold tracking-[0.32em] text-muted">
          ESTATES
        </span>
      </span>
    </Link>
  );
}
