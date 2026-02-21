'use client'

import { useState, useCallback, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Play, Pause, RefreshCw } from 'lucide-react'

export function ClusteringVisualization() {
    const [k, setK] = useState(3)
    const [data, setData] = useState<any[]>([])
    const [isRunning, setIsRunning] = useState(false)

    const generateData = useCallback(() => {
        const points = []
        for (let i = 0; i < 100; i++) {
            points.push({
                x: Math.random() * 10,
                y: Math.random() * 10,
                cluster: Math.floor(Math.random() * k)
            })
        }
        return points
    }, [k])

    useEffect(() => {
        setData(generateData())
    }, [generateData])

    const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6']

    return (
        <div className="space-y-4 sm:space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">K-Means Clustering Visualization</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">
                        Watch how K-means algorithm iteratively assigns points to clusters and updates centroids.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                            <Slider label="Number of Clusters (K)" value={k} onChange={setK} min={2} max={5} step={1} />

                            <div className="flex gap-2 mt-4">
                                <Button onClick={() => setIsRunning(!isRunning)} className="flex items-center gap-2">
                                    {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                                    {isRunning ? 'Pause' : 'Start'}
                                </Button>
                                <Button onClick={() => setData(generateData())} className="flex items-center gap-2">
                                    <RefreshCw className="w-4 h-4" />
                                    Reset
                                </Button>
                            </div>

                            <div className="mt-4 p-4 bg-cyan-50 rounded-lg">
                                <p className="text-sm font-semibold text-cyan-900 mb-2">Algorithm Steps:</p>
                                <ol className="text-xs sm:text-sm text-cyan-700 space-y-1">
                                    <li>1. Initialize K centroids randomly</li>
                                    <li>2. Assign each point to nearest centroid</li>
                                    <li>3. Update centroids to cluster means</li>
                                    <li>4. Repeat until convergence</li>
                                </ol>
                            </div>
                        </div>

                        <div>
                            <ResponsiveContainer width="100%" height={300}>
                                <ScatterChart>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis type="number" dataKey="x" domain={[0, 10]} />
                                    <YAxis type="number" dataKey="y" domain={[0, 10]} />
                                    <Tooltip />
                                    {Array.from({ length: k }).map((_, i) => (
                                        <Scatter
                                            key={i}
                                            name={`Cluster ${i}`}
                                            data={data.filter(d => d.cluster === i)}
                                            fill={colors[i]}
                                        />
                                    ))}
                                </ScatterChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
