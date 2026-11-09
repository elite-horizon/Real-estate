import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  return (
    <main className="container-page grid min-h-[70dvh] place-items-center py-16 text-center">
      <div>
        <p className="eyebrow">404 · Route not found</p>
        <h1 className="mt-4 font-display text-5xl text-foreground">This address is not in the collection.</h1>
        <p className="mx-auto mt-5 max-w-xl text-muted">The page may have moved, or the demo route has not been introduced yet.</p>
        <Button className="mt-8" asChild><Link to="/"><ArrowLeft aria-hidden="true" size={17} />Return home</Link></Button>
      </div>
    </main>
  );
}
