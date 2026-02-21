'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { BlockMath, InlineMath } from 'react-katex'

export function NeuronActivation() {
    const [w1, setW1] = useState(0.5)
    const [w2, setW2] = useState(0.3)
    const [w3, setW3] = useState(0.2)
    const [bias, setBias] = useState(0.1)
    const [x1, setX1] = useState(1)
    const [x2, setX2] = useState(0.5)
    const [x3, setX3] = useState(0.8)

    const weightedSum = w1 * x1 + w2 * x2 + w3 * x3 + bias
    const sigmoid = 1 / (1 + Math.exp(-weightedSum))
    const relu = Math.max(0, weightedSum)
    const tanh = Math.tanh(weightedSum)

    return (
        <div className="space-y-4 sm:space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Artificial Neuron: The Building Block</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">
                        An artificial neuron mimics biological neurons by taking weighted inputs,
                        summing them, and applying an activation function to produce an output.
                    </p>

                    <div className="bg-blue-50 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6 overflow-x-auto">
                        <p className="text-xs sm:text-sm font-semibold text-blue-900 mb-2">Neuron Formula:</p>
                        <BlockMath math="y = f(\sum_{i=1}^{n} w_i x_i + b)" />
                        <p className="text-xs text-blue-700 mt-2">
                            where f = activation function, w = weights, x = inputs, b = bias
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Input Values</h3>
                            <Slider label="Input x₁" value={x1} onChange={setX1} min={0} max={2} step={0.1} />
                            <Slider label="Input x₂" value={x2} onChange={setX2} min={0} max={2} step={0.1} />
                            <Slider label="Input x₃" value={x3} onChange={setX3} min={0} max={2} step={0.1} />

                            <h3 className="font-semibold mb-3 mt-4 text-sm sm:text-base">Weights & Bias</h3>
                            <Slider label="Weight w₁" value={w1} onChange={setW1} min={-1} max={1} step={0.1} />
                            <Slider label="Weight w₂" value={w2} onChange={setW2} min={-1} max={1} step={0.1} />
                            <Slider label="Weight w₃" value={w3} onChange={setW3} min={-1} max={1} step={0.1} />
                            <Slider label="Bias b" value={bias} onChange={setBias} min={-1} max={1} step={0.1} />
                        </div>

                        <div>
                            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Neuron Computation</h3>

                            <div className="space-y-3">
                                <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                                    <p className="text-xs sm:text-sm font-semibold text-gray-900 mb-2">Weighted Sum (z):</p>
                                    <p className="text-lg sm:text-xl font-bold text-blue-600">{weightedSum.toFixed(3)}</p>
                                    <p className="text-xs text-gray-600 mt-1">
                                        {w1.toFixed(1)}×{x1.toFixed(1)} + {w2.toFixed(1)}×{x2.toFixed(1)} + {w3.toFixed(1)}×{x3.toFixed(1)} + {bias.toFixed(1)}
                                    </p>
                                </div>

                                <div className="p-3 sm:p-4 bg-blue-50 rounded-lg">
                                    <p className="text-xs sm:text-sm font-semibold text-blue-900 mb-2">Sigmoid Output:</p>
                                    <p className="text-lg sm:text-xl font-bold text-blue-600">{sigmoid.toFixed(3)}</p>
                                    <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                                        <div
                                            className="bg-blue-600 h-3 rounded-full transition-all"
                                            style={{ width: `${sigmoid * 100}%` }}
                                        />
                                    </div>
                                </div>

                                <div className="p-3 sm:p-4 bg-green-50 rounded-lg">
                                    <p className="text-xs sm:text-sm font-semibold text-green-900 mb-2">ReLU Output:</p>
                                    <p className="text-lg sm:text-xl font-bold text-green-600">{relu.toFixed(3)}</p>
                                </div>

                                <div className="p-3 sm:p-4 bg-purple-50 rounded-lg">
                                    <p className="text-xs sm:text-sm font-semibold text-purple-900 mb-2">Tanh Output:</p>
                                    <p className="text-lg sm:text-xl font-bold text-purple-600">{tanh.toFixed(3)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Perceptron: The First Neural Network</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <h4 className="font-semibold text-blue-900 mb-2">Single Layer Perceptron</h4>
                            <p className="text-sm text-blue-700 mb-2">Binary classification</p>
                            <p className="text-xs text-blue-600">✓ Simple and fast</p>
                            <p className="text-xs text-blue-600">✗ Only linearly separable problems</p>
                        </div>
                        <div className="p-4 bg-purple-50 rounded-lg">
                            <h4 className="font-semibold text-purple-900 mb-2">Multi-Layer Perceptron</h4>
                            <p className="text-sm text-purple-700 mb-2">Complex patterns</p>
                            <p className="text-xs text-purple-600">✓ Universal approximator</p>
                            <p className="text-xs text-purple-600">✓ Non-linear problems</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
