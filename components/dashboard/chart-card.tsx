"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ChartCardProps {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
}

export function ChartCard({ title, description, children, className }: ChartCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <Card className={`bg-gray-800 border-gray-700 text-white ${className}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-medium">{title}</CardTitle>
            {description && <CardDescription className="text-gray-400">{description}</CardDescription>}
          </div>
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="h-8 w-8 text-gray-400 hover:text-white"
            >
              <MoreHorizontal className="h-5 w-5" />
            </Button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md bg-gray-900 py-1 shadow-lg ring-1 ring-black ring-opacity-5 z-10">
                <Button
                  variant="ghost"
                  className="flex w-full items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  View Details
                </Button>
                <Button
                  variant="ghost"
                  className="flex w-full items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Export Data
                </Button>
                <Button
                  variant="ghost"
                  className="flex w-full items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Refresh
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

