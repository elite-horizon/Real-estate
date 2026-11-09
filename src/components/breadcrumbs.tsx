import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.06em] text-muted">
        {items.map((item, index) => (
          <li className="flex items-center gap-1.5" key={`${item.label}-${index}`}>
            {index > 0 && <ChevronRight aria-hidden="true" size={13} />}
            {item.to ? <Link className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold" to={item.to}>{item.label}</Link> : <span aria-current="page" className="text-foreground">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
