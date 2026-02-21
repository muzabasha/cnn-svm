'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { RotateCcw, Trash2, Info } from 'lucide-react'

export interface DataPoint {
    x: number
    y: number
    class: number
    id: string
}

interface InteractiveCanvasProps {
    width?: number
    height?: number
    onPointsChange?: (points: DataPoint[]) => void
    initialPoints?: DataPoint[]
    numClasses?: number
    classColors?: string[]
    showGrid?: boolean
    instructions?: string
}

export function InteractiveCanvas({
    width = 600,
    height = 400,
    onPointsChange,
    initialPoints = [],
    numClasses = 2,
    classColors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b'],
    showGrid = true,
    instructions = 'Click to add points. Right-click to delete.'
}: InteractiveCanvasProps) {
    const [points, setPoints] = useState<DataPoint[]>(initialPoints)
    const [selectedClass, setSelectedClass] = useState(0)
    const [hoveredPoint, setHoveredPoint] = useState<string | null>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        drawCanvas()
    }, [points, hoveredPoint, showGrid])

    useEffect(() => {
        if (onPointsChange) {
            onPointsChange(points)
        }
    }, [points])

    const drawCanvas = () => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Clear canvas
        ctx.clearRect(0, 0, width, height)

        // Draw grid
        if (showGrid) {
            ctx.strokeStyle = '#e5e7eb'
            ctx.lineWidth = 1
            for (let i = 0; i <= width; i += 50) {
                ctx.beginPath()
                ctx.moveTo(i, 0)
                ctx.lineTo(i, height)
                ctx.stroke()
            }
            for (let i = 0; i <= height; i += 50) {
                ctx.beginPath()
                ctx.moveTo(0, i)
                ctx.lineTo(width, i)
                ctx.stroke()
            }
        }

        // Draw points
        points.forEach(point => {
            const isHovered = point.id === hoveredPoint
            ctx.fillStyle = classColors[point.class]
            ctx.beginPath()
            ctx.arc(point.x, point.y, isHovered ? 10 : 8, 0, 2 * Math.PI)
            ctx.fill()

            if (isHovered) {
                ctx.strokeStyle = '#000'
                ctx.lineWidth = 2
                ctx.stroke()
            }
        })
    }

    const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current
        if (!canvas) return

        const rect = canvas.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        // Check if clicking on existing point
        const clickedPoint = points.find(p =>
            Math.sqrt((p.x - x) ** 2 + (p.y - y) ** 2) < 10
        )

        if (clickedPoint) {
            // Toggle class on left click
            if (e.button === 0) {
                setPoints(points.map(p =>
                    p.id === clickedPoint.id
                        ? { ...p, class: (p.class + 1) % numClasses }
                        : p
                ))
            }
        } else {
            // Add new point
            const newPoint: DataPoint = {
                x,
                y,
                class: selectedClass,
                id: `point-${Date.now()}-${Math.random()}`
            }
            setPoints([...points, newPoint])
        }
    }

    const handleCanvasRightClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        e.preventDefault()
        const canvas = canvasRef.current
        if (!canvas) return

        const rect = canvas.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        // Find and remove point
        const clickedPoint = points.find(p =>
            Math.sqrt((p.x - x) ** 2 + (p.y - y) ** 2) < 10
        )

        if (clickedPoint) {
            setPoints(points.filter(p => p.id !== clickedPoint.id))
        }
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current
        if (!canvas) return

        const rect = canvas.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const hoveredPoint = points.find(p =>
            Math.sqrt((p.x - x) ** 2 + (p.y - y) ** 2) < 10
        )

        setHoveredPoint(hoveredPoint?.id || null)
    }

    const clearCanvas = () => {
        setPoints([])
    }

    const generateRandomPoints = (count: number = 20) => {
        const newPoints: DataPoint[] = []
        for (let i = 0; i < count; i++) {
            newPoints.push({
                x: Math.random() * (width - 40) + 20,
                y: Math.random() * (height - 40) + 20,
                class: Math.floor(Math.random() * numClasses),
                id: `point-${Date.now()}-${i}`
            })
        }
        setPoints(newPoints)
    }

    return (
        <div className="space-y-4">
            {instructions && (
                <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-blue-800">{instructions}</p>
                </div>
            )}

            <div className="flex gap-3 items-center flex-wrap">
                <div className="flex gap-2">
                    {Array.from({ length: numClasses }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setSelectedClass(i)}
                            className={`w-10 h-10 rounded-full border-2 transition-all ${selectedClass === i
                                ? 'border-gray-900 scale-110'
                                : 'border-gray-300'
                                }`}
                            style={{ backgroundColor: classColors[i] }}
                            title={`Class ${i + 1}`}
                        />
                    ))}
                </div>

                <div className="flex gap-2">
                    <Button
                        onClick={clearCanvas}
                        variant="outline"
                        className="flex items-center gap-2 px-3 py-1.5 text-sm"
                    >
                        <Trash2 className="w-4 h-4" />
                        Clear
                    </Button>
                    <Button
                        onClick={() => generateRandomPoints()}
                        variant="outline"
                        className="flex items-center gap-2 px-3 py-1.5 text-sm"
                    >
                        <RotateCcw className="w-4 h-4" />
                        Random
                    </Button>
                </div>

                <div className="text-sm text-gray-600">
                    Points: {points.length}
                </div>
            </div>

            <div className="relative inline-block">
                <canvas
                    ref={canvasRef}
                    width={width}
                    height={height}
                    onClick={handleCanvasClick}
                    onContextMenu={handleCanvasRightClick}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={() => setHoveredPoint(null)}
                    className="border-2 border-gray-300 rounded-lg cursor-crosshair bg-white"
                    style={{ touchAction: 'none' }}
                />
            </div>

            <div className="flex gap-4 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-200 rounded border border-gray-400"></div>
                    <span>Left-click: Add/Change class</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-200 rounded border border-gray-400"></div>
                    <span>Right-click: Delete point</span>
                </div>
            </div>
        </div>
    )
}
