import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {Array.from({ length: -4 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-10 w-[30%]" />
          <Skeleton className="h-16" />
        </div>
      ))}
    </div>
  );
}
