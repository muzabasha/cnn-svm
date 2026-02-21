'use client'

import { useState, useCallback, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export function KValueExplorer() {
    const [k, setK] = useState(3)
    const [data, setData] = useState<any[]>([])

    const generateData = useCallback(() => {
        const points = []
        for (let i = 0; i < 30; i++) {
            points.push({ x: Math.random() * 10, y: Math.random() * 10, label: Math.random() > 0.5 ? 1 : 0 })
        }
        return points
    }, [])

    useEffect(() => {
        setData(generateData())
    }, [generateData])

    const class0 = data.filter(d => d.label === 0)
    const class1 = data.filter(d => d.label === 1)

    return (
        <div className="space-y-4 sm:space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">K-Value Impact on Classification</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">
                        The value of K determines how many neighbors vote on the classification. Small K = more sensitive to noise, Large K = smoother boundaries.
                    </p>

                    <Slider label="Number of Neighbors (K)" value={k} onChange={setK} min={1} max={15} step={1} description="How many neighbors to consider" />

                    <div className="mt-6">
                        <ResponsiveContainer width="100%" height={300}>
                            <ScatterChart>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" dataKey="x" domain={[0, 10]} />
                                <YAxis type="number" dataKey="y" domain={[0, 10]} />
                                <Tooltip />
                                <Scatter name="Class 0" data={class0} fill="#3b82f6" />
                                <Scatter name="Class 1" data={class1} fill="#ef4444" />
                            </ScatterChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                        <div className="p-3 bg-yellow-50 rounded-lg">
                            <p className="text-xs sm:text-sm font-semibold text-yellow-900">K = 1</p>
                            <p className="text-xs text-yellow-700">Most flexible, prone to overfitting</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                            <p className="text-xs sm:text-sm font-semibold text-green-900">K = 3-7</p>
                            <p className="text-xs text-green-700">Good balance for most problems</p>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <p className="text-xs sm:text-sm font-semibold text-blue-900">K = Large</p>
                            <p className="text-xs text-blue-700">Smooth boundaries, may underfit</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
