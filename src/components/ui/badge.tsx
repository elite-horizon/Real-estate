import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.08em]", {
  variants: {
    variant: {
      neutral: "border border-border bg-surface-subtle text-muted",
      gold: "border border-gold/30 bg-gold/10 text-gold-strong",
      available: "border border-success/30 bg-success/10 text-success",
      reserved: "border border-reserved/30 bg-reserved/10 text-reserved",
      sold: "border border-danger/30 bg-danger/10 text-danger",
      selected: "border border-selected/30 bg-selected/10 text-selected",
    },
  },
  defaultVariants: { variant: "neutral" },
});

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
