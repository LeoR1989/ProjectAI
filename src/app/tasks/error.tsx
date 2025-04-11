'use client'

import { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Trophy } from "lucide-react"

export default function Error({
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
    <div className="flex h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <Trophy className="h-16 w-16 text-muted" />
      <h2 className="text-2xl font-bold">加载任务失败</h2>
      <p className="text-muted-foreground max-w-md">
        抱歉，加载任务数据时发生错误。这可能是由于网络问题或服务器暂时不可用。
      </p>
      <div className="flex gap-4">
        <Button
          variant="outline"
          onClick={() => window.location.href = '/'}
        >
          返回首页
        </Button>
        <Button
          onClick={() => reset()}
        >
          重试
        </Button>
      </div>
    </div>
  )
} 