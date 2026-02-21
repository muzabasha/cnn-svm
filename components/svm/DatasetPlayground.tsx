'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from 'recharts'
import { RefreshCw } from 'lucide-react'

interface DataPoint {
    x: number
    y: number
    label: number
}

export function DatasetPlayground() {
    const [datasetType, setDatasetType] = useState<'linear' | 'moon' | 'circular'>('linear')
    const [noise, setNoise] = useState(0.1)
    const [numSamples, setNumSamples] = useState(100)
    const [data, setData] = useState<DataPoint[]>([])

    const generateLinearData = () => {
        const points: DataPoint[] = []
        for (let i = 0; i < numSamples / 2; i++) {
            points.push({
                x: Math.random() * 4 - 2 + (Math.random() - 0.5) * noise,
                y: Math.random() * 4 - 1 + (Math.random() - 0.5) * noise,
                label: 0
            })
            points.push({
                x: Math.random() * 4 + (Math.random() - 0.5) * noise,
                y: Math.random() * 4 + 1 + (Math.random() - 0.5) * noise,
                label: 1
            })
        }
        return points
    }

    const generateMoonData = () => {
        const points: DataPoint[] = []
        for (let i = 0; i < numSamples / 2; i++) {
            const angle = Math.PI * i / (numSamples / 2)
            points.push({
                x: Math.cos(angle) * 2 + (Math.random() - 0.5) * noise,
                y: Math.sin(angle) + (Math.random() - 0.5) * noise,
                label: 0
            })
            points.push({
                x: 1 - Math.cos(angle) * 2 + (Math.random() - 0.5) * noise,
                y: -Math.sin(angle) - 0.5 + (Math.random() - 0.5) * noise,
                label: 1
            })
        }
        return points
    }

    const generateCircularData = () => {
        const points: DataPoint[] = []
        for (let i = 0; i < numSamples / 2; i++) {
            const angle = Math.random() * 2 * Math.PI
            const r = Math.random() * 1.5 + (Math.random() - 0.5) * noise
            points.push({
                x: Math.cos(angle) * r,
                y: Math.sin(angle) * r,
                label: 0
            })
            const r2 = Math.random() * 1.5 + 3 + (Math.random() - 0.5) * noise
            points.push({
                x: Math.cos(angle) * r2,
                y: Math.sin(angle) * r2,
                label: 1
            })
        }
        return points
    }

    const generateData = useCallback(() => {
        if (datasetType === 'linear') return generateLinearData()
        if (datasetType === 'moon') return generateMoonData()
        return generateCircularData()
    }, [datasetType, noise, numSamples])

    useEffect(() => {
        setData(generateData())
    }, [generateData])

    const class0 = data.filter(d => d.label === 0)
    const class1 = data.filter(d => d.label === 1)

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Dataset Playground</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 mb-4">
                        Experiment with different datasets to understand how SVM handles various patterns.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-semibold mb-4">Dataset Configuration</h3>

                            <div className="space-y-4 mb-6">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                                        Dataset Type
                                    </label>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setDatasetType('linear')}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${datasetType === 'linear'
                                                ? 'bg-purple-600 text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                        >
                                            Linear
                                        </button>
                                        <button
                                            onClick={() => setDatasetType('moon')}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${datasetType === 'moon'
                                                ? 'bg-purple-600 text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                        >
                                            Moon
                                        </button>
                                        <button
                                            onClick={() => setDatasetType('circular')}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${datasetType === 'circular'
                                                ? 'bg-purple-600 text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                        >
                                            Circular
                                        </button>
                                    </div>
                                </div>

                                <Slider
                                    label="Noise Level"
                                    value={noise}
                                    onChange={setNoise}
                                    min={0}
                                    max={1}
                                    step={0.1}
                                    description="Add randomness to data points"
                                />

                                <Slider
                                    label="Number of Samples"
                                    value={numSamples}
                                    onChange={setNumSamples}
                                    min={50}
                                    max={200}
                                    step={10}
                                    description="Total data points to generate"
                                />
                            </div>

                            <Button onClick={() => setData(generateData())} variant="outline">
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Regenerate Data
                            </Button>

                            <div className="mt-6 space-y-3">
                                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                                        <span className="text-sm font-medium">Class 0: {class0.length} points</span>
                                    </div>
                                </div>
                                <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                                        <span className="text-sm font-medium">Class 1: {class1.length} points</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-4">Data Visualization</h3>
                            <ResponsiveContainer width="100%" height={400}>
                                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis type="number" dataKey="x" name="Feature 1" />
                                    <YAxis type="number" dataKey="y" name="Feature 2" />
                                    <ZAxis range={[60, 60]} />
                                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                    <Scatter name="Class 0" data={class0} fill="#3b82f6" />
                                    <Scatter name="Class 1" data={class1} fill="#ef4444" />
                                </ScatterChart>
                            </ResponsiveContainer>

                            <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                                <h4 className="font-semibold text-yellow-900 mb-2">Observation</h4>
                                <p className="text-sm text-gray-700">
                                    {datasetType === 'linear' && 'Linear data can be separated by a straight line.'}
                                    {datasetType === 'moon' && 'Moon-shaped data requires non-linear separation.'}
                                    {datasetType === 'circular' && 'Circular data needs radial basis function kernel.'}
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
