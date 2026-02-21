'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { BlockMath } from 'react-katex'

export function GradientDescent() {
    const [learningRate, setLearningRate] = useState(0.1)

    const generateLossData = () => {
        const data = []
        for (let epoch = 0; epoch <= 50; epoch++) {
            const loss = 10 * Math.exp(-learningRate * epoch * 0.1) + Math.random() * 0.5
            data.push({ epoch, loss: loss.toFixed(2) })
        }
        return data
    }

    const data = generateLossData()

    return (
        <div className="space-y-4 sm:space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Gradient Descent Optimization</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">
                        Gradient descent iteratively adjusts weights to minimize the loss function.
                    </p>

                    <div className="bg-blue-50 p-4 rounded-lg mb-6 overflow-x-auto">
                        <BlockMath math="\theta := \theta - \alpha \nabla_\theta J(\theta)" />
                        <p className="text-xs text-blue-700 mt-2">θ = parameters, α = learning rate, J = loss function</p>
                    </div>

                    <Slider
                        label="Learning Rate (α)"
                        value={learningRate}
                        onChange={setLearningRate}
                        min={0.01}
                        max={0.5}
                        step={0.01}
                        description="Controls step size in optimization"
                    />

                    <div className="mt-6">
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="epoch" label={{ value: 'Epoch', position: 'insideBottom', offset: -5 }} />
                                <YAxis label={{ value: 'Loss', angle: -90, position: 'insideLeft' }} />
                                <Tooltip />
                                <Line type="monotone" dataKey="loss" stroke="#3b82f6" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                        <div className="p-3 bg-yellow-50 rounded-lg">
                            <p className="text-sm font-semibold text-yellow-900">Too Small α</p>
                            <p className="text-xs text-yellow-700">Slow convergence</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                            <p className="text-sm font-semibold text-green-900">Optimal α</p>
                            <p className="text-xs text-green-700">Fast & stable</p>
                        </div>
                        <div className="p-3 bg-red-50 rounded-lg">
                            <p className="text-sm font-semibold text-red-900">Too Large α</p>
                            <p className="text-xs text-red-700">Overshooting</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
