'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { InlineMath, BlockMath } from 'react-katex'

export function ActivationModule() {
    const [activationType, setActivationType] = useState<'relu' | 'sigmoid' | 'tanh'>('relu')

    const generateData = () => {
        const data = []
        for (let x = -5; x <= 5; x += 0.2) {
            let y = 0
            if (activationType === 'relu') {
                y = Math.max(0, x)
            } else if (activationType === 'sigmoid') {
                y = 1 / (1 + Math.exp(-x))
            } else if (activationType === 'tanh') {
                y = Math.tanh(x)
            }
            data.push({ x: parseFloat(x.toFixed(2)), y: parseFloat(y.toFixed(3)) })
        }
        return data
    }

    const inputValues = [-2, -1, 0, 1, 2, 3]
    const applyActivation = (x: number) => {
        if (activationType === 'relu') return Math.max(0, x)
        if (activationType === 'sigmoid') return 1 / (1 + Math.exp(-x))
        return Math.tanh(x)
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Activation Functions</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 mb-4">
                        Activation functions introduce non-linearity, enabling networks to learn complex patterns.
                    </p>

                    <div className="flex gap-3 mb-6">
                        <button
                            onClick={() => setActivationType('relu')}
                            className={`px-4 py-2 rounded-xl font-medium transition-all ${activationType === 'relu'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            ReLU
                        </button>
                        <button
                            onClick={() => setActivationType('sigmoid')}
                            className={`px-4 py-2 rounded-xl font-medium transition-all ${activationType === 'sigmoid'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            Sigmoid
                        </button>
                        <button
                            onClick={() => setActivationType('tanh')}
                            className={`px-4 py-2 rounded-xl font-medium transition-all ${activationType === 'tanh'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            Tanh
                        </button>
                    </div>

                    <Tabs defaultValue="visual">
                        <TabsList>
                            <TabsTrigger value="visual">Visual</TabsTrigger>
                            <TabsTrigger value="formula">Formula</TabsTrigger>
                            <TabsTrigger value="code">Python Code</TabsTrigger>
                        </TabsList>

                        <TabsContent value="visual">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-semibold mb-3">Function Graph</h3>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <LineChart data={generateData()}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="x" label={{ value: 'Input (x)', position: 'insideBottom', offset: -5 }} />
                                            <YAxis label={{ value: 'Output', angle: -90, position: 'insideLeft' }} />
                                            <Tooltip />
                                            <Line type="monotone" dataKey="y" stroke="#3b82f6" strokeWidth={2} dot={false} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>

                                <div>
                                    <h3 className="font-semibold mb-3">Input → Output Transformation</h3>
                                    <div className="space-y-2">
                                        {inputValues.map((x) => {
                                            const y = applyActivation(x)
                                            return (
                                                <div key={x} className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg">
                                                    <div className="w-16 text-center font-semibold text-gray-700">
                                                        {x}
                                                    </div>
                                                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-blue-500 transition-all"
                                                            style={{ width: `${Math.abs(y) * 50}%` }}
                                                        />
                                                    </div>
                                                    <div className="w-20 text-center font-semibold text-blue-600">
                                                        {y.toFixed(3)}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="formula">
                            <div className="space-y-6">
                                {activationType === 'relu' && (
                                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                                        <h3 className="font-semibold text-blue-900 mb-3">ReLU (Rectified Linear Unit)</h3>
                                        <div className="bg-white p-4 rounded-lg mb-3">
                                            <BlockMath math="f(x) = \max(0, x) = \begin{cases} x & \text{if } x > 0 \\ 0 & \text{if } x \leq 0 \end{cases}" />
                                        </div>
                                        <div className="space-y-2 text-sm text-gray-700">
                                            <p><strong>Interpretation:</strong> Passes positive values unchanged, zeros out negative values.</p>
                                            <p><strong>Why useful:</strong> Simple, fast, prevents vanishing gradient problem.</p>
                                            <p><strong>Example:</strong> Input = -2 → Output = 0, Input = 3 → Output = 3</p>
                                        </div>
                                    </div>
                                )}

                                {activationType === 'sigmoid' && (
                                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                                        <h3 className="font-semibold text-blue-900 mb-3">Sigmoid</h3>
                                        <div className="bg-white p-4 rounded-lg mb-3">
                                            <BlockMath math="f(x) = \frac{1}{1 + e^{-x}}" />
                                        </div>
                                        <div className="space-y-2 text-sm text-gray-700">
                                            <p><strong>Interpretation:</strong> Squashes values to range (0, 1).</p>
                                            <p><strong>Why useful:</strong> Good for binary classification, outputs probabilities.</p>
                                            <p><strong>Example:</strong> Input = 0 → Output = 0.5, Input = 2 → Output = 0.88</p>
                                        </div>
                                    </div>
                                )}

                                {activationType === 'tanh' && (
                                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                                        <h3 className="font-semibold text-blue-900 mb-3">Tanh (Hyperbolic Tangent)</h3>
                                        <div className="bg-white p-4 rounded-lg mb-3">
                                            <BlockMath math="f(x) = \frac{e^x - e^{-x}}{e^x + e^{-x}}" />
                                        </div>
                                        <div className="space-y-2 text-sm text-gray-700">
                                            <p><strong>Interpretation:</strong> Squashes values to range (-1, 1).</p>
                                            <p><strong>Why useful:</strong> Zero-centered, stronger gradients than sigmoid.</p>
                                            <p><strong>Example:</strong> Input = 0 → Output = 0, Input = 2 → Output = 0.96</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </TabsContent>

                        <TabsContent value="code">
                            <div className="bg-gray-900 text-gray-100 p-4 rounded-xl font-mono text-sm overflow-x-auto">
                                <pre>{`import numpy as np

# Input values (could be from convolution layer)
x = np.array([-2, -1, 0, 1, 2, 3])

${activationType === 'relu' ? `# ReLU activation
output = np.maximum(0, x)
# Result: [0, 0, 0, 1, 2, 3]
# Negative values become 0` : ''}${activationType === 'sigmoid' ? `# Sigmoid activation
output = 1 / (1 + np.exp(-x))
# Result: [0.119, 0.269, 0.5, 0.731, 0.881, 0.953]
# All values between 0 and 1` : ''}${activationType === 'tanh' ? `# Tanh activation
output = np.tanh(x)
# Result: [-0.964, -0.762, 0, 0.762, 0.964, 0.995]
# All values between -1 and 1` : ''}

print(output)`}</pre>
                            </div>
                        </TabsContent>
                    </Tabs>

                    <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                        <h4 className="font-semibold text-yellow-900 mb-2">Key Insight</h4>
                        <p className="text-sm text-gray-700">
                            Without activation functions, neural networks would just be linear transformations.
                            Activation functions enable learning of complex, non-linear patterns like curves, edges, and textures.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
