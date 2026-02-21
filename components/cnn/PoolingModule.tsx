'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Slider } from '@/components/ui/slider'
import { generateHeatmapColor } from '@/lib/utils'
import { Play } from 'lucide-react'
import { InlineMath, BlockMath } from 'react-katex'

export function PoolingModule() {
    const [input, setInput] = useState<number[][]>([
        [8, 3, 4, 2],
        [1, 9, 2, 7],
        [5, 6, 3, 1],
        [2, 4, 8, 5]
    ])

    const [poolType, setPoolType] = useState<'max' | 'avg'>('max')
    const [poolSize, setPoolSize] = useState(2)
    const [output, setOutput] = useState<number[][]>([])
    const [currentStep, setCurrentStep] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)

    const computePooling = useCallback(() => {
        const outputSize = Math.floor(input.length / poolSize)
        const result: number[][] = []

        for (let i = 0; i < outputSize; i++) {
            result[i] = []
            for (let j = 0; j < outputSize; j++) {
                const values: number[] = []
                for (let m = 0; m < poolSize; m++) {
                    for (let n = 0; n < poolSize; n++) {
                        values.push(input[i * poolSize + m][j * poolSize + n])
                    }
                }
                result[i][j] = poolType === 'max' ? Math.max(...values) : values.reduce((a, b) => a + b) / values.length
            }
        }
        setOutput(result)
    }, [input, poolType, poolSize])

    useEffect(() => {
        computePooling()
    }, [computePooling])

    const animate = () => {
        setIsAnimating(true)
        setCurrentStep(0)
        const maxSteps = output.length * output[0].length
        let step = 0
        const interval = setInterval(() => {
            step++
            setCurrentStep(step)
            if (step >= maxSteps) {
                clearInterval(interval)
                setIsAnimating(false)
            }
        }, 1000)
    }

    const getCurrentPosition = () => {
        if (!isAnimating || currentStep === 0) return null
        const step = currentStep - 1
        const cols = output[0].length
        return {
            row: Math.floor(step / cols),
            col: step % cols
        }
    }

    const pos = getCurrentPosition()

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Pooling Operation</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 mb-4">
                        Pooling reduces spatial dimensions while retaining important features.
                    </p>

                    <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-6">
                        <h3 className="font-semibold text-purple-900 mb-2">Mathematical Formula</h3>
                        <div className="bg-white p-4 rounded-lg space-y-3">
                            <div>
                                <p className="text-sm font-semibold mb-1">Max Pooling:</p>
                                <BlockMath math="Y(i,j) = \max_{m,n \in \text{pool}} X(i \cdot s + m, j \cdot s + n)" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold mb-1">Average Pooling:</p>
                                <BlockMath math="Y(i,j) = \frac{1}{k^2} \sum_{m,n \in \text{pool}} X(i \cdot s + m, j \cdot s + n)" />
                            </div>
                        </div>
                        <div className="mt-3 space-y-1 text-sm text-gray-700">
                            <p><InlineMath math="Y(i,j)" /> = Output value at position (i,j)</p>
                            <p><InlineMath math="s" /> = Stride (usually equals pool size)</p>
                            <p><InlineMath math="k" /> = Pool size</p>
                        </div>
                    </div>

                    <Tabs defaultValue="visual">
                        <TabsList>
                            <TabsTrigger value="visual">Visual</TabsTrigger>
                            <TabsTrigger value="code">Python Code</TabsTrigger>
                            <TabsTrigger value="comparison">Max vs Avg</TabsTrigger>
                        </TabsList>

                        <TabsContent value="visual">
                            <div className="grid grid-cols-2 gap-8 mt-4">
                                <div>
                                    <h3 className="font-semibold mb-3 text-center">Input Feature Map (4×4)</h3>
                                    <div className="inline-grid gap-1" style={{ gridTemplateColumns: `repeat(4, 1fr)` }}>
                                        {input.map((row, i) =>
                                            row.map((val, j) => {
                                                const isHighlighted = pos &&
                                                    i >= pos.row * poolSize && i < (pos.row + 1) * poolSize &&
                                                    j >= pos.col * poolSize && j < (pos.col + 1) * poolSize
                                                return (
                                                    <div
                                                        key={`${i}-${j}`}
                                                        className={`w-14 h-14 flex items-center justify-center border-2 rounded-lg font-semibold transition-all ${isHighlighted ? 'border-purple-500 bg-purple-100 scale-105' : 'border-gray-300'
                                                            }`}
                                                        style={{ backgroundColor: isHighlighted ? undefined : generateHeatmapColor(val, 1, 9) }}
                                                    >
                                                        {val}
                                                    </div>
                                                )
                                            })
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-semibold mb-3 text-center">Output (2×2)</h3>
                                    {output.length > 0 && (
                                        <div className="inline-grid gap-1" style={{ gridTemplateColumns: `repeat(${output[0].length}, 1fr)` }}>
                                            {output.map((row, i) =>
                                                row.map((val, j) => {
                                                    const isActive = pos && pos.row === i && pos.col === j
                                                    return (
                                                        <div
                                                            key={`${i}-${j}`}
                                                            className={`w-14 h-14 flex items-center justify-center border-2 rounded-lg font-semibold transition-all ${isActive ? 'border-green-500 bg-green-100 scale-110' : 'border-gray-300'
                                                                }`}
                                                            style={{ backgroundColor: isActive ? undefined : generateHeatmapColor(val, 1, 9) }}
                                                        >
                                                            {poolType === 'avg' ? val.toFixed(1) : val}
                                                        </div>
                                                    )
                                                })
                                            )}
                                        </div>
                                    )}
                                    <div className="mt-4 space-y-2">
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="radio"
                                                checked={poolType === 'max'}
                                                onChange={() => setPoolType('max')}
                                                className="accent-purple-600"
                                            />
                                            <span className="text-sm">Max Pooling</span>
                                        </label>
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="radio"
                                                checked={poolType === 'avg'}
                                                onChange={() => setPoolType('avg')}
                                                className="accent-purple-600"
                                            />
                                            <span className="text-sm">Average Pooling</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <Button onClick={animate} disabled={isAnimating} className="mt-6">
                                <Play className="w-4 h-4 mr-2" />
                                Animate
                            </Button>
                        </TabsContent>

                        <TabsContent value="code">
                            <div className="bg-gray-900 text-gray-100 p-4 rounded-xl font-mono text-sm overflow-x-auto">
                                <pre>{`import numpy as np

# Input feature map
feature_map = np.array([
  [8, 3, 4, 2],
  [1, 9, 2, 7],
  [5, 6, 3, 1],
  [2, 4, 8, 5]
])

pool_size = 2
output = []

# Max pooling
for i in range(0, 4, pool_size):
    row = []
    for j in range(0, 4, pool_size):
        # Extract 2x2 patch
        patch = feature_map[i:i+2, j:j+2]
        # Take maximum value
        max_val = np.max(patch)
        row.append(max_val)
    output.append(row)

print(output)
# [[9, 7], [6, 8]]
# Spatial dimensions reduced by half`}</pre>
                            </div>
                        </TabsContent>

                        <TabsContent value="comparison">
                            <div className="space-y-4">
                                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                                    <h4 className="font-semibold text-blue-900 mb-2">Max Pooling</h4>
                                    <p className="text-sm text-gray-700 mb-2">
                                        Selects the maximum value from each region.
                                    </p>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                        <li>✓ Preserves strongest features</li>
                                        <li>✓ Better for edge detection</li>
                                        <li>✓ Most commonly used</li>
                                    </ul>
                                </div>

                                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                                    <h4 className="font-semibold text-green-900 mb-2">Average Pooling</h4>
                                    <p className="text-sm text-gray-700 mb-2">
                                        Computes the average of all values in each region.
                                    </p>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                        <li>✓ Smoother downsampling</li>
                                        <li>✓ Reduces noise</li>
                                        <li>✓ Used in some architectures</li>
                                    </ul>
                                </div>

                                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                                    <h4 className="font-semibold text-yellow-900 mb-2">Experiment</h4>
                                    <p className="text-sm text-gray-700">
                                        Switch between Max and Average pooling. Notice how max pooling preserves larger values while average pooling smooths them out.
                                    </p>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}
