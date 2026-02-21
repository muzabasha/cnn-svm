'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { BlockMath } from 'react-katex'

export function ActivationFunctions() {
    const [selectedFunction, setSelectedFunction] = useState<'sigmoid' | 'relu' | 'tanh' | 'leaky'>('relu')

    const generateData = () => {
        const data = []
        for (let x = -5; x <= 5; x += 0.2) {
            data.push({
                x: x.toFixed(2),
                sigmoid: 1 / (1 + Math.exp(-x)),
                relu: Math.max(0, x),
                tanh: Math.tanh(x),
                leaky: x > 0 ? x : 0.01 * x
            })
        }
        return data
    }

    const data = generateData()

    const functions = {
        sigmoid: {
            name: 'Sigmoid',
            formula: '\\sigma(x) = \\frac{1}{1 + e^{-x}}',
            range: '(0, 1)',
            pros: ['Smooth gradient', 'Output interpretable as probability'],
            cons: ['Vanishing gradient problem', 'Not zero-centered'],
            color: '#3b82f6'
        },
        relu: {
            name: 'ReLU',
            formula: 'f(x) = \\max(0, x)',
            range: '[0, ∞)',
            pros: ['Computationally efficient', 'Reduces vanishing gradient', 'Sparse activation'],
            cons: ['Dying ReLU problem', 'Not zero-centered'],
            color: '#10b981'
        },
        tanh: {
            name: 'Tanh',
            formula: '\\tanh(x) = \\frac{e^x - e^{-x}}{e^x + e^{-x}}',
            range: '(-1, 1)',
            pros: ['Zero-centered', 'Stronger gradients than sigmoid'],
            cons: ['Vanishing gradient problem'],
            color: '#8b5cf6'
        },
        leaky: {
            name: 'Leaky ReLU',
            formula: 'f(x) = \\begin{cases} x & x > 0 \\\\ 0.01x & x \\leq 0 \\end{cases}',
            range: '(-∞, ∞)',
            pros: ['Fixes dying ReLU', 'Allows small negative values'],
            cons: ['Inconsistent predictions for negative values'],
            color: '#f59e0b'
        }
    }

    const current = functions[selectedFunction]

    return (
        <div className="space-y-4 sm:space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Activation Functions Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">
                        Activation functions introduce non-linearity, enabling neural networks to learn complex patterns.
                    </p>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-6">
                        {Object.entries(functions).map(([key, func]) => (
                            <button
                                key={key}
                                onClick={() => setSelectedFunction(key as any)}
                                className={`p-3 rounded-lg text-sm font-medium transition-all ${selectedFunction === key
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {func.name}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="x" tick={{ fontSize: 12 }} />
                                    <YAxis tick={{ fontSize: 12 }} />
                                    <Tooltip />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey={selectedFunction}
                                        stroke={current.color}
                                        strokeWidth={3}
                                        dot={false}
                                        name={current.name}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        <div>
                            <div className="bg-blue-50 p-4 rounded-lg mb-4 overflow-x-auto">
                                <p className="text-sm font-semibold text-blue-900 mb-2">{current.name} Formula:</p>
                                <BlockMath math={current.formula} />
                                <p className="text-xs text-blue-700 mt-2">Range: {current.range}</p>
                            </div>

                            <div className="space-y-3">
                                <div className="p-3 bg-green-50 rounded-lg">
                                    <p className="text-sm font-semibold text-green-900 mb-2">Advantages:</p>
                                    <ul className="text-xs text-green-700 space-y-1">
                                        {current.pros.map((pro, i) => (
                                            <li key={i}>✓ {pro}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="p-3 bg-red-50 rounded-lg">
                                    <p className="text-sm font-semibold text-red-900 mb-2">Disadvantages:</p>
                                    <ul className="text-xs text-red-700 space-y-1">
                                        {current.cons.map((con, i) => (
                                            <li key={i}>✗ {con}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">When to Use Each Function</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <h4 className="font-semibold text-blue-900 mb-2">Hidden Layers</h4>
                            <p className="text-sm text-blue-700 mb-2">ReLU (most common)</p>
                            <p className="text-xs text-blue-600">Fast, effective, prevents vanishing gradient</p>
                        </div>
                        <div className="p-4 bg-purple-50 rounded-lg">
                            <h4 className="font-semibold text-purple-900 mb-2">Output Layer (Binary)</h4>
                            <p className="text-sm text-purple-700 mb-2">Sigmoid</p>
                            <p className="text-xs text-purple-600">Outputs probability between 0 and 1</p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg">
                            <h4 className="font-semibold text-green-900 mb-2">Output Layer (Multiclass)</h4>
                            <p className="text-sm text-green-700 mb-2">Softmax</p>
                            <p className="text-xs text-green-600">Probability distribution over classes</p>
                        </div>
                        <div className="p-4 bg-orange-50 rounded-lg">
                            <h4 className="font-semibold text-orange-900 mb-2">Regression</h4>
                            <p className="text-sm text-orange-700 mb-2">Linear (no activation)</p>
                            <p className="text-xs text-orange-600">Continuous output values</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
