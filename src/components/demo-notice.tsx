import { Info } from "lucide-react";

export function DemoNotice({ children = "Fictional demonstration content — not a verified listing or sales offer." }: { children?: React.ReactNode }) {
  return (
    <p className="inline-flex items-start gap-2 rounded border border-gold/25 bg-gold/8 px-3 py-2 text-xs leading-5 text-muted">
      <Info className="mt-0.5 shrink-0 text-gold-strong" aria-hidden="true" size={14} />
      <span>{children}</span>
    </p>
  );
}
