'use client'

import { useState, useCallback, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, LineChart } from 'recharts'
import { RefreshCw } from 'lucide-react'

interface DataPoint {
    x: number
    y: number
    label: number
}

export function DecisionBoundary() {
    const [w1, setW1] = useState(1)
    const [w2, setW2] = useState(1)
    const [bias, setBias] = useState(0)
    const [data, setData] = useState<DataPoint[]>([])

    const generateData = useCallback(() => {
        const points: DataPoint[] = []
        for (let i = 0; i < 50; i++) {
            // Class 0 (bottom-left)
            points.push({
                x: Math.random() * 4 - 2,
                y: Math.random() * 4 - 2,
                label: 0
            })
            // Class 1 (top-right)
            points.push({
                x: Math.random() * 4 + 1,
                y: Math.random() * 4 + 1,
                label: 1
            })
        }
        return points
    }, [])

    useEffect(() => {
        setData(generateData())
    }, [generateData])

    const class0 = data.filter(d => d.label === 0)
    const class1 = data.filter(d => d.label === 1)

    // Decision boundary: w1*x + w2*y + b = 0 => y = -(w1*x + b)/w2
    const boundaryData = []
    for (let x = -3; x <= 6; x += 0.5) {
        const y = w2 !== 0 ? -(w1 * x + bias) / w2 : 0
        boundaryData.push({ x, y })
    }

    const accuracy = data.reduce((acc, point) => {
        const prediction = w1 * point.x + w2 * point.y + bias
        const predictedClass = prediction >= 0 ? 1 : 0
        return acc + (predictedClass === point.label ? 1 : 0)
    }, 0) / data.length

    return (
        <div className="space-y-4 sm:space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Decision Boundary Visualization</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">
                        The decision boundary is the line that separates different classes.
                        Adjust the weights to find the optimal separation.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                            <div className="flex items-center justify-between mb-3 sm:mb-4">
                                <h3 className="font-semibold text-sm sm:text-base">Parameters</h3>
                                <Button
                                    onClick={() => setData(generateData())}
                                    className="flex items-center gap-2 text-xs sm:text-sm"
                                >
                                    <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4" />
                                    New Data
                                </Button>
                            </div>

                            <Slider
                                label="Weight 1 (w₁)"
                                value={w1}
                                onChange={setW1}
                                min={-3}
                                max={3}
                                step={0.1}
                                description="Coefficient for x-axis"
                            />

                            <Slider
                                label="Weight 2 (w₂)"
                                value={w2}
                                onChange={setW2}
                                min={-3}
                                max={3}
                                step={0.1}
                                description="Coefficient for y-axis"
                            />

                            <Slider
                                label="Bias (b)"
                                value={bias}
                                onChange={setBias}
                                min={-5}
                                max={5}
                                step={0.1}
                                description="Intercept term"
                            />

                            <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
                                <div className="p-3 sm:p-4 bg-purple-50 rounded-lg">
                                    <p className="text-xs sm:text-sm font-semibold text-purple-900 mb-1">Decision Rule:</p>
                                    <p className="text-xs sm:text-sm text-purple-700">
                                        {w1.toFixed(1)}x + {w2.toFixed(1)}y + {bias.toFixed(1)} ≥ 0 → Class 1
                                    </p>
                                    <p className="text-xs sm:text-sm text-purple-700">
                                        {w1.toFixed(1)}x + {w2.toFixed(1)}y + {bias.toFixed(1)} &lt; 0 → Class 0
                                    </p>
                                </div>
                                <div className="p-3 sm:p-4 bg-green-50 rounded-lg">
                                    <p className="text-xs sm:text-sm font-semibold text-green-900 mb-1">Accuracy:</p>
                                    <p className="text-xl sm:text-2xl font-bold text-green-700">
                                        {(accuracy * 100).toFixed(1)}%
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Classification Space</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis type="number" dataKey="x" domain={[-3, 6]} tick={{ fontSize: 12 }} />
                                    <YAxis type="number" dataKey="y" domain={[-3, 6]} tick={{ fontSize: 12 }} />
                                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                    <Scatter name="Class 0" data={class0} fill="#3b82f6" />
                                    <Scatter name="Class 1" data={class1} fill="#ef4444" />
                                    <Line
                                        data={boundaryData}
                                        dataKey="y"
                                        stroke="#8b5cf6"
                                        strokeWidth={3}
                                        dot={false}
                                        type="monotone"
                                    />
                                </ScatterChart>
                            </ResponsiveContainer>
                            <p className="text-xs text-gray-500 mt-2 text-center">
                                Purple line = Decision Boundary | Blue = Class 0 | Red = Class 1
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
