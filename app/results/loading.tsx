import { Skeleton } from "@/components/ui/skeleton"

export default function ResultsLoading() {
  return (
    <div className="container mx-auto px-6 py-12">
      <Skeleton className="h-9 w-48 mb-8" />
      <div className="mb-8">
        <Skeleton className="h-12 w-full rounded-lg" />
      </div>
      <div className="flex flex-wrap gap-4 mb-8">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-28" />
        <Skeleton className="h-10 w-36" />
        <Skeleton className="h-10 w-24" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <div className="p-4 space-y-3">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <div className="flex gap-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-9 w-full mt-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
