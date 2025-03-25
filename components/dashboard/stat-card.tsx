import type React from "react"
import { cn } from "@/lib/utils"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  change?: number
  period?: string
  className?: string
  icon?: React.ReactNode
}

export function StatCard({ title, value, change, period, className, icon }: StatCardProps) {
  const isPositive = change && change > 0

  return (
    <div className={cn("rounded-xl bg-gray-800 p-4", className)}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-400">{title}</p>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>
      <div className="mt-2">
        <p className="text-2xl font-bold text-white">{value}</p>
        {change !== undefined && (
          <div className="mt-1 flex items-center text-xs">
            <span className={cn("flex items-center", isPositive ? "text-green-500" : "text-red-500")}>
              {isPositive ? <ArrowUpRight className="mr-1 h-3 w-3" /> : <ArrowDownRight className="mr-1 h-3 w-3" />}
              {Math.abs(change)}%
            </span>
            {period && <span className="ml-1 text-gray-400">vs {period}</span>}
          </div>
        )}
      </div>
    </div>
  )
}

