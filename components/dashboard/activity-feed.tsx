import type React from "react"
import { cn } from "@/lib/utils"
import { CircleUser } from "lucide-react"

interface ActivityItem {
  id: string
  content: React.ReactNode
  timestamp: string
  icon?: React.ReactNode
}

interface ActivityFeedProps {
  items: ActivityItem[]
  className?: string
}

export function ActivityFeed({ items, className }: ActivityFeedProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="font-semibold text-white">Recent Activities</h3>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-1">{item.icon || <CircleUser className="h-5 w-5 text-gray-400" />}</div>
            <div className="flex-1 min-w-0">
              <div className="text-sm text-white">{item.content}</div>
              <p className="text-xs text-gray-400">{item.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

