"use client"

import { useEffect, useRef } from "react"

interface DonutChartProps {
  data: {
    label: string
    value: number
    color: string
  }[]
  centerText?: string
  centerSubtext?: string
}

export function DonutChart({ data, centerText, centerSubtext }: DonutChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const size = Math.min(canvas.parentElement?.offsetWidth || 300, 300)
    canvas.width = size
    canvas.height = size

    // Calculate total value
    const total = data.reduce((sum, item) => sum + item.value, 0)

    // Draw donut chart
    const centerX = size / 2
    const centerY = size / 2
    const radius = size * 0.4
    const innerRadius = radius * 0.6

    let startAngle = -0.5 * Math.PI // Start at top

    // Draw segments
    data.forEach((item) => {
      const segmentAngle = (item.value / total) * (2 * Math.PI)

      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + segmentAngle)
      ctx.arc(centerX, centerY, innerRadius, startAngle + segmentAngle, startAngle, true)
      ctx.closePath()

      ctx.fillStyle = item.color
      ctx.fill()

      startAngle += segmentAngle
    })

    // Draw center text
    if (centerText) {
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 24px Inter, sans-serif"
      ctx.fillText(centerText, centerX, centerY - (centerSubtext ? 12 : 0))

      if (centerSubtext) {
        ctx.font = "14px Inter, sans-serif"
        ctx.fillStyle = "#9ca3af"
        ctx.fillText(centerSubtext, centerX, centerY + 16)
      }
    }

    // Draw legend
    const legendY = size + 20
    const legendItemHeight = 24
    const legendItemWidth = size / data.length

    data.forEach((item, index) => {
      const x = index * legendItemWidth + 10
      const y = legendY

      // Draw color box
      ctx.fillStyle = item.color
      ctx.fillRect(x, y, 12, 12)

      // Draw label
      ctx.fillStyle = "#ffffff"
      ctx.font = "12px Inter, sans-serif"
      ctx.textAlign = "left"
      ctx.textBaseline = "top"
      ctx.fillText(item.label, x + 16, y)

      // Draw value
      ctx.fillStyle = "#9ca3af"
      ctx.fillText(`${item.value.toLocaleString()}`, x + 16, y + 14)
    })
  }, [data, centerText, centerSubtext])

  return (
    <div className="flex justify-center">
      <canvas ref={canvasRef} height={350} />
    </div>
  )
}

