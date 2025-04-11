export default function Loading() {
  return (
    <div className="container py-6">
      <div className="h-8 w-48 bg-muted animate-pulse rounded mb-6"></div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="game-card">
            <div className="aspect-video w-full bg-muted animate-pulse rounded"></div>
            <div className="p-4 space-y-2">
              <div className="h-5 w-3/4 bg-muted animate-pulse rounded"></div>
              <div className="h-4 w-1/2 bg-muted animate-pulse rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 