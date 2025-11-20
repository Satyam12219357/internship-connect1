import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

export const StatCardSkeleton = () => (
  <Card className="p-6">
    <div className="flex items-start justify-between">
      <div className="flex-1 space-y-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-3 w-28" />
      </div>
      <Skeleton className="h-12 w-12 rounded-xl" />
    </div>
  </Card>
);

export const TableSkeleton = ({ rows = 5 }: { rows?: number }) => (
  <Card className="p-6">
    <Skeleton className="h-6 w-48 mb-4" />
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-3/4" />
          </div>
          <Skeleton className="h-8 w-20 rounded-full" />
        </div>
      ))}
    </div>
  </Card>
);

export const ChartSkeleton = () => (
  <Card className="p-6">
    <Skeleton className="h-6 w-48 mb-6" />
    <Skeleton className="h-64 w-full rounded-lg" />
  </Card>
);
