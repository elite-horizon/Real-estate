import { BrandMark } from "@/components/brand-mark";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-navy-950 text-white">
      <div className="container-page grid gap-8 py-10 md:grid-cols-[1fr_auto] md:items-end">
        <div className="[&_.font-display]:text-white [&_.text-muted]:text-white/60">
          <BrandMark />
          <p className="mt-5 max-w-lg text-sm leading-6 text-white/65">
            A fictional interactive property showcase created for client presentation purposes.
          </p>
        </div>
        <p className="text-xs tracking-wide text-white/60">Demo content · Not a sales offer</p>
      </div>
    </footer>
  );
}
