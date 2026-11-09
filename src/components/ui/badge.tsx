import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.08em]",
  {
    variants: {
      variant: {
        neutral: "border border-border bg-surface-subtle text-muted",
        gold: "border border-[#d8c189] bg-[#fff8e5] text-[#654d1c]",
        available: "border border-[#a7e5cc] bg-[#dff8ed] text-[#065f46]",
        reserved: "border border-[#efd58a] bg-[#fff3cc] text-[#78350f]",
        sold: "border border-[#efb3ae] bg-[#fee4e2] text-[#7f1d1d]",
        selected: "border border-[#b6c8ff] bg-[#e7edff] text-[#1e40af]",
      },
    },
    defaultVariants: { variant: "neutral" },
  },
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
