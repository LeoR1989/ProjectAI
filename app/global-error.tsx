'use client'

import { useEffect } from 'react'
import { Button } from "@/components/ui/button"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html>
      <body>
        <div className="flex h-screen flex-col items-center justify-center gap-4">
          <h2 className="text-2xl font-bold">发生了严重错误</h2>
          <p className="text-muted-foreground">抱歉，应用程序遇到了问题。</p>
          <Button
            variant="outline"
            onClick={
              () => reset()
            }
          >
            重试
          </Button>
        </div>
      </body>
    </html>
  )
} 