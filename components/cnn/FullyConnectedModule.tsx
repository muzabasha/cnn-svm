'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { InlineMath, BlockMath } from 'react-katex'

export function FullyConnectedModule() {
    const [input] = useState<number[]>([0.8, 0.3, 0.6, 0.9])
    const [weights] = useState<number[][]>([
        [0.5, -0.3, 0.2],
        [0.1, 0.8, -0.4],
        [-0.2, 0.4, 0.7],
        [0.6, -0.1, 0.3]
    ])
    const [bias] = useState<number[]>([0.1, -0.2, 0.3])

    const computeOutput = () => {
        const output: number[] = []
        for (let j = 0; j < weights[0].length; j++) {
            let sum = bias[j]
            for (let i = 0; i < input.length; i++) {
                sum += input[i] * weights[i][j]
            }
            output.push(sum)
        }
        return output
    }

    const output = computeOutput()

    const softmax = (values: number[]) => {
        const expValues = values.map(v => Math.exp(v))
        const sum = expValues.reduce((a, b) => a + b, 0)
        return expValues.map(v => v / sum)
    }

    const probabilities = softmax(output)
    const classes = ['Cat', 'Dog', 'Bird']

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Fully Connected Layer</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 mb-4">
                        The fully connected layer combines all features to make final predictions.
                    </p>

                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                        <h3 className="font-semibold text-green-900 mb-2">Mathematical Formula</h3>
                        <div className="bg-white p-4 rounded-lg">
                            <BlockMath math="y_j = \sum_{i=1}^{n} w_{ij} \cdot x_i + b_j" />
                        </div>
                        <div className="mt-3 space-y-1 text-sm text-gray-700">
                            <p><InlineMath math="y_j" /> = Output for class j</p>
                            <p><InlineMath math="x_i" /> = Input feature i</p>
                            <p><InlineMath math="w_{ij}" /> = Weight connecting input i to output j</p>
                            <p><InlineMath math="b_j" /> = Bias for output j</p>
                        </div>
                    </div>

                    <Tabs defaultValue="visual">
                        <TabsList>
                            <TabsTrigger value="visual">Visual</TabsTrigger>
                            <TabsTrigger value="computation">Step-by-Step</TabsTrigger>
                            <TabsTrigger value="code">Python Code</TabsTrigger>
                        </TabsList>

                        <TabsContent value="visual">
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <div className="space-y-3">
                                        <h3 className="font-semibold text-center mb-4">Input Features</h3>
                                        {input.map((val, i) => (
                                            <div key={i} className="flex items-center gap-3">
                                                <div className="w-24 h-12 bg-blue-100 border-2 border-blue-300 rounded-lg flex items-center justify-center font-semibold">
                                                    {val.toFixed(2)}
                                                </div>
                                                <span className="text-sm text-gray-500">Feature {i + 1}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex-1 flex items-center justify-center">
                                        <svg width="200" height="200" className="opacity-30">
                                            {input.map((_, i) =>
                                                output.map((_, j) => (
                                                    <line
                                                        key={`${i}-${j}`}
                                                        x1="0"
                                                        y1={i * 50 + 25}
                                                        x2="200"
                                                        y2={j * 60 + 30}
                                                        stroke="#3b82f6"
                                                        strokeWidth="1"
                                                    />
                                                ))
                                            )}
                                        </svg>
                                    </div>

                                    <div className="space-y-3">
                                        <h3 className="font-semibold text-center mb-4">Class Scores</h3>
                                        {output.map((val, i) => (
                                            <div key={i} className="flex items-center gap-3">
                                                <span className="text-sm text-gray-500 w-12">{classes[i]}</span>
                                                <div className="w-24 h-12 bg-green-100 border-2 border-green-300 rounded-lg flex items-center justify-center font-semibold">
                                                    {val.toFixed(2)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                                    <h3 className="font-semibold text-purple-900 mb-3">After Softmax (Probabilities)</h3>
                                    <div className="space-y-2">
                                        {probabilities.map((prob, i) => (
                                            <div key={i} className="flex items-center gap-3">
                                                <span className="text-sm font-medium w-16">{classes[i]}</span>
                                                <div className="flex-1 h-8 bg-gray-200 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-purple-500 flex items-center justify-end pr-2 text-white text-xs font-semibold transition-all"
                                                        style={{ width: `${prob * 100}%` }}
                                                    >
                                                        {prob > 0.1 && `${(prob * 100).toFixed(1)}%`}
                                                    </div>
                                                </div>
                                                <span className="text-sm font-semibold w-16 text-right">
                                                    {(prob * 100).toFixed(1)}%
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-sm text-gray-600 mt-3">
                                        Prediction: <strong className="text-purple-900">{classes[probabilities.indexOf(Math.max(...probabilities))]}</strong>
                                    </p>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="computation">
                            <div className="space-y-4">
                                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                                    <h4 className="font-semibold mb-3">Computing Output for "Cat" (Class 0)</h4>
                                    <div className="space-y-2 text-sm font-mono">
                                        <p>y₀ = (0.8 × 0.5) + (0.3 × 0.1) + (0.6 × -0.2) + (0.9 × 0.6) + 0.1</p>
                                        <p className="text-blue-600">y₀ = 0.4 + 0.03 - 0.12 + 0.54 + 0.1</p>
                                        <p className="text-green-600 font-bold">y₀ = {output[0].toFixed(2)}</p>
                                    </div>
                                </div>

                                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                                    <h4 className="font-semibold mb-3">Computing Output for "Dog" (Class 1)</h4>
                                    <div className="space-y-2 text-sm font-mono">
                                        <p>y₁ = (0.8 × -0.3) + (0.3 × 0.8) + (0.6 × 0.4) + (0.9 × -0.1) - 0.2</p>
                                        <p className="text-blue-600">y₁ = -0.24 + 0.24 + 0.24 - 0.09 - 0.2</p>
                                        <p className="text-green-600 font-bold">y₁ = {output[1].toFixed(2)}</p>
                                    </div>
                                </div>

                                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                                    <h4 className="font-semibold mb-3">Computing Output for "Bird" (Class 2)</h4>
                                    <div className="space-y-2 text-sm font-mono">
                                        <p>y₂ = (0.8 × 0.2) + (0.3 × -0.4) + (0.6 × 0.7) + (0.9 × 0.3) + 0.3</p>
                                        <p className="text-blue-600">y₂ = 0.16 - 0.12 + 0.42 + 0.27 + 0.3</p>
                                        <p className="text-green-600 font-bold">y₂ = {output[2].toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="code">
                            <div className="bg-gray-900 text-gray-100 p-4 rounded-xl font-mono text-sm overflow-x-auto">
                                <pre>{`import numpy as np

# Flattened features from previous layers
input_features = np.array([0.8, 0.3, 0.6, 0.9])

# Weights matrix (4 inputs × 3 classes)
weights = np.array([
  [0.5, -0.3, 0.2],
  [0.1, 0.8, -0.4],
  [-0.2, 0.4, 0.7],
  [0.6, -0.1, 0.3]
])

# Bias for each class
bias = np.array([0.1, -0.2, 0.3])

# Matrix multiplication
output = np.dot(input_features, weights) + bias
print("Class scores:", output)
# [${output.map(v => v.toFixed(2)).join(', ')}]

# Apply softmax for probabilities
exp_output = np.exp(output)
probabilities = exp_output / np.sum(exp_output)
print("Probabilities:", probabilities)
# [${probabilities.map(v => (v * 100).toFixed(1) + '%').join(', ')}]

# Prediction
predicted_class = np.argmax(probabilities)
print("Predicted:", ["Cat", "Dog", "Bird"][predicted_class])`}</pre>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}
