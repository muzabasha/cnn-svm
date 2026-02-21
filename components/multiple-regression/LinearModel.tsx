'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { BlockMath } from 'react-katex'

export function LinearModel() {
    const [w1, setW1] = useState(2)
    const [w2, setW2] = useState(1.5)
    const [bias, setBias] = useState(3)

    const sampleData = [
        { x1: 1, x2: 2, y: w1 * 1 + w2 * 2 + bias },
        { x1: 2, x2: 3, y: w1 * 2 + w2 * 3 + bias },
        { x1: 3, x2: 1, y: w1 * 3 + w2 * 1 + bias }
    ]

    return (
        <div className="space-y-4 sm:space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Multiple Linear Regression Model</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">
                        Model the relationship between multiple input features and a continuous output variable.
                    </p>

                    <div className="bg-orange-50 p-4 rounded-lg mb-4 overflow-x-auto">
                        <BlockMath math="y = w_1x_1 + w_2x_2 + ... + w_nx_n + b" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                            <h3 className="font-semibold mb-3 text-sm sm:text-base">Model Parameters</h3>

                            <Slider label="Weight 1 (w₁)" value={w1} onChange={setW1} min={-5} max={5} step={0.1} />
                            <Slider label="Weight 2 (w₂)" value={w2} onChange={setW2} min={-5} max={5} step={0.1} />
                            <Slider label="Bias (b)" value={bias} onChange={setBias} min={-10} max={10} step={0.5} />

                            <div className="mt-4 p-4 bg-orange-50 rounded-lg">
                                <p className="text-sm font-semibold text-orange-900 mb-2">Current Model:</p>
                                <p className="text-sm text-orange-700">
                                    y = {w1.toFixed(1)}x₁ + {w2.toFixed(1)}x₂ + {bias.toFixed(1)}
                                </p>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-3 text-sm sm:text-base">Sample Predictions</h3>
                            <div className="space-y-2">
                                {sampleData.map((d, i) => (
                                    <div key={i} className="p-3 bg-gray-50 rounded-lg text-sm">
                                        <p>x₁={d.x1}, x₂={d.x2} → y = {d.y.toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                                <p className="text-xs sm:text-sm font-semibold text-blue-900 mb-2">Key Concepts:</p>
                                <ul className="text-xs text-blue-700 space-y-1">
                                    <li>• Each feature has its own weight</li>
                                    <li>• Weights determine feature importance</li>
                                    <li>• Bias shifts the prediction baseline</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
