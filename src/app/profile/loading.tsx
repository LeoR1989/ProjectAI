export default function Loading() {
  return (
    <div className="container py-6">
      <div className="flex flex-col items-center gap-6">
        <div className="h-24 w-24 rounded-full bg-muted animate-pulse"></div>
        <div className="text-center space-y-2">
          <div className="h-8 w-32 bg-muted animate-pulse rounded mx-auto"></div>
          <div className="h-4 w-24 bg-muted animate-pulse rounded mx-auto"></div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 w-full max-w-3xl">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="p-6 rounded-lg bg-card">
              <div className="space-y-2">
                <div className="h-5 w-24 bg-muted animate-pulse rounded"></div>
                <div className="h-8 w-16 bg-muted animate-pulse rounded"></div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full max-w-3xl space-y-4">
          <div className="h-6 w-32 bg-muted animate-pulse rounded"></div>
          <div className="space-y-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="p-4 rounded-lg bg-muted">
                <div className="flex justify-between items-center">
                  <div className="space-y-2">
                    <div className="h-5 w-32 bg-muted animate-pulse rounded"></div>
                    <div className="h-4 w-24 bg-muted animate-pulse rounded"></div>
                  </div>
                  <div className="h-8 w-16 bg-muted animate-pulse rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 