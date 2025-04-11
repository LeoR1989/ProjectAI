import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function TasksLoading() {
  return (
    <div className="container py-6 pb-16">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-8 w-36" />
        <Skeleton className="h-6 w-24" />
      </div>

      <Skeleton className="w-full h-24 rounded-lg mb-6" />

      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-16" />
        </div>
        
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
                <Skeleton className="h-8 w-16 rounded-md" />
              </div>
            </Card>
          ))}
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-32" />
        </div>
        
        <div className="space-y-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <Card key={i} className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
              
              <Skeleton className="h-2 w-full mt-3 mb-2" />
              <div className="flex justify-between">
                <Skeleton className="h-4 w-4" />
                {Array.from({ length: 3 }).map((_, j) => (
                  <div key={j} className="flex flex-col items-center">
                    <Skeleton className="h-4 w-4 mb-1" />
                    <Skeleton className="h-4 w-10" />
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 