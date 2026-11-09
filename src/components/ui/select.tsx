import { forwardRef, type SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(({ className, children, ...props }, ref) => (
  <span className="relative block">
    <select ref={ref} className={cn("h-12 w-full appearance-none rounded border border-border bg-surface px-3.5 pr-10 text-sm text-foreground outline-none transition focus:border-gold focus:ring-1 focus:ring-gold disabled:cursor-not-allowed disabled:opacity-50", className)} {...props}>{children}</select>
    <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" size={17} />
  </span>
));
Select.displayName = "Select";
