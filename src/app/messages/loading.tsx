export default function Loading() {
  return (
    <div className="container py-6">
      <div className="h-8 w-32 bg-muted animate-pulse rounded mb-6"></div>
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-4 rounded-lg bg-muted/5"
          >
            <div className="h-10 w-10 rounded-full bg-muted animate-pulse"></div>
            <div className="flex-1 space-y-2">
              <div className="h-5 w-24 bg-muted animate-pulse rounded"></div>
              <div className="h-4 w-48 bg-muted animate-pulse rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 