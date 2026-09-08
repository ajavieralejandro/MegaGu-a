interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return <div className={`animate-pulse rounded-2xl bg-ink-200/70 ${className}`} aria-hidden="true" />;
}

export function BusinessCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl border border-ink-100 bg-white">
      <Skeleton className="h-40 w-full rounded-none" />
      <div className="space-y-2 p-4">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-1/3" />
      </div>
    </div>
  );
}

export function BusinessGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <BusinessCardSkeleton key={i} />
      ))}
    </div>
  );
}
