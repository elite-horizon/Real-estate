import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/breadcrumbs";

export function WorkflowHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="bg-navy-950 text-white">
      <div className="container-page py-12 sm:py-16">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: title }]} />
        <p className="mt-9 text-xs font-bold uppercase tracking-[0.18em] text-gold-light">
          {eyebrow}
        </p>
        <h1 className="mt-3 max-w-4xl font-display text-4xl text-white sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl leading-7 text-white/65">{description}</p>
      </div>
    </section>
  );
}
export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-foreground">
        {label}
      </span>
      {children}
      {hint && <span className="mt-1.5 block text-xs text-muted">{hint}</span>}
    </label>
  );
}
export const textareaClass =
  "min-h-28 w-full rounded border border-border bg-surface px-3.5 py-3 text-sm text-foreground outline-none placeholder:text-muted/70 focus:border-gold focus:ring-1 focus:ring-gold";
