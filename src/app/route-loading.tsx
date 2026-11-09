import { Skeleton } from "@/components/ui/skeleton";

export function RouteLoading() {
  return (
    <main className="container-page py-16" aria-busy="true" aria-label="Loading page">
      <Skeleton className="mb-5 h-4 w-28" />
      <Skeleton className="mb-4 h-14 max-w-xl" />
      <Skeleton className="h-6 max-w-2xl" />
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        <Skeleton className="h-44" />
        <Skeleton className="h-44" />
        <Skeleton className="h-44" />
      </div>
    </main>
  );
}
