'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'

export function InteractiveClassifier() {
    const [points, setPoints] = useState<Array<{ x: number, y: number, label: number }>>([])
    const [currentClass, setCurrentClass] = useState(0)

    const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 10
        const y = ((e.clientY - rect.top) / rect.height) * 10
        setPoints([...points, { x, y, label: currentClass }])
    }

    return (
        <div className="space-y-4 sm:space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Interactive KNN Classifier</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">
                        Click on the canvas to add training points. Switch between classes and see how KNN classifies new points.
                    </p>

                    <div className="flex gap-2 mb-4">
                        <Button onClick={() => setCurrentClass(0)} className={`${currentClass === 0 ? 'bg-blue-600' : 'bg-gray-400'}`}>
                            Class 0 (Blue)
                        </Button>
                        <Button onClick={() => setCurrentClass(1)} className={`${currentClass === 1 ? 'bg-red-600' : 'bg-gray-400'}`}>
                            Class 1 (Red)
                        </Button>
                        <Button onClick={() => setPoints([])} className="flex items-center gap-2">
                            <RefreshCw className="w-4 h-4" />
                            Clear
                        </Button>
                    </div>

                    <div
                        onClick={handleCanvasClick}
                        className="w-full h-96 bg-gray-50 border-2 border-gray-300 rounded-lg relative cursor-crosshair"
                    >
                        {points.map((point, i) => (
                            <div
                                key={i}
                                className="absolute w-3 h-3 rounded-full"
                                style={{
                                    left: `${(point.x / 10) * 100}%`,
                                    top: `${(point.y / 10) * 100}%`,
                                    backgroundColor: point.label === 0 ? '#3b82f6' : '#ef4444',
                                    transform: 'translate(-50%, -50%)'
                                }}
                            />
                        ))}
                    </div>

                    <p className="text-xs text-gray-500 mt-2">
                        Points added: {points.length} | Current class: {currentClass}
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
