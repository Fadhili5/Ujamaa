"use client"

import { useEffect, useRef } from "react"

interface LineChartProps {
  data: number[]
  labels: string[]
  color?: string
  height?: number
}

export function LineChart({ data, labels, color = "#22c55e", height = 200 }: LineChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const width = canvas.parentElement?.offsetWidth || 300
    canvas.width = width
    canvas.height = height

    // Find min and max values
    const max = Math.max(...data) * 1.1 // Add 10% padding
    const min = Math.min(0, ...data) // Start from 0 or lower if there are negative values

    // Calculate scales
    const xScale = width / (data.length - 1)
    const yScale = height / (max - min)

    // Draw grid lines
    ctx.strokeStyle = "#374151" // gray-700
    ctx.lineWidth = 1

    // Horizontal grid lines
    const gridLines = 5
    for (let i = 0; i <= gridLines; i++) {
      const y = height - i * (height / gridLines)

      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }

    // Draw line
    ctx.strokeStyle = color
    ctx.lineWidth = 2
    ctx.beginPath()

    // Create points
    data.forEach((value, index) => {
      const x = index * xScale
      const y = height - (value - min) * yScale

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.stroke()

    // Fill area under the line
    ctx.lineTo(width, height)
    ctx.lineTo(0, height)
    ctx.closePath()

    const gradient = ctx.createLinearGradient(0, 0, 0, height)
    gradient.addColorStop(0, `${color}33`) // 20% opacity
    gradient.addColorStop(1, `${color}00`) // 0% opacity

    ctx.fillStyle = gradient
    ctx.fill()

    // Draw points
    ctx.fillStyle = color
    data.forEach((value, index) => {
      const x = index * xScale
      const y = height - (value - min) * yScale

      ctx.beginPath()
      ctx.arc(x, y, 3, 0, Math.PI * 2)
      ctx.fill()
    })

    // Draw labels
    if (labels.length > 0) {
      ctx.fillStyle = "#9ca3af" // gray-400
      ctx.font = "10px Inter, sans-serif"
      ctx.textAlign = "center"

      // Only show a subset of labels to avoid overcrowding
      const labelStep = Math.ceil(labels.length / 5)

      labels.forEach((label, index) => {
        if (index % labelStep === 0 || index === labels.length - 1) {
          const x = index * xScale
          ctx.fillText(label, x, height - 5)
        }
      })
    }
  }, [data, labels, color, height])

  return <canvas ref={canvasRef} height={height} />
}

