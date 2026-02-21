'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { BlockMath, InlineMath } from 'react-katex'

export function CostFunction() {
    const [theta, setTheta] = useState(0)

    const sigmoid = (z: number) => 1 / (1 + Math.exp(-z))

    const logLoss = (y: number, yPred: number) => {
        const epsilon = 1e-15
        yPred = Math.max(epsilon, Math.min(1 - epsilon, yPred))
        return -(y * Math.log(yPred) + (1 - y) * Math.log(1 - yPred))
    }

    const generateCostData = () => {
        const data = []
        for (let t = -5; t <= 5; t += 0.1) {
            let totalCost = 0
            // Sample data points
            const samples = [
                { x: -2, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 0 },
                { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }
            ]
            samples.forEach(sample => {
                const pred = sigmoid(t * sample.x)
                totalCost += logLoss(sample.y, pred)
            })
            data.push({ theta: t.toFixed(2), cost: (totalCost / samples.length).toFixed(3) })
        }
        return data
    }

    const costData = generateCostData()
    const currentCost = costData.find(d => Math.abs(parseFloat(d.theta) - theta) < 0.15)

    return (
        <div className="space-y-4 sm:space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Logistic Regression Cost Function</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">
                        The log loss (cross-entropy) cost function measures how well the model's predictions match the actual labels.
                    </p>

                    <div className="bg-purple-50 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6 overflow-x-auto">
                        <BlockMath math="J(\theta) = -\frac{1}{m}\sum_{i=1}^{m}[y^{(i)}\log(h_\theta(x^{(i)})) + (1-y^{(i)})\log(1-h_\theta(x^{(i)}))]" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Adjust Parameter</h3>

                            <Slider
                                label="Theta (θ)"
                                value={theta}
                                onChange={setTheta}
                                min={-5}
                                max={5}
                                step={0.1}
                                description="Model parameter to optimize"
                            />

                            <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
                                <div className="p-3 sm:p-4 bg-blue-50 rounded-lg">
                                    <p className="text-xs sm:text-sm font-semibold text-blue-900 mb-1">Current Cost:</p>
                                    <p className="text-xl sm:text-2xl font-bold text-blue-700">
                                        {currentCost?.cost || '0.000'}
                                    </p>
                                </div>
                                <div className="p-3 sm:p-4 bg-green-50 rounded-lg">
                                    <p className="text-xs sm:text-sm font-semibold text-green-900 mb-1">Goal:</p>
                                    <p className="text-xs sm:text-sm text-green-700">
                                        Minimize cost by finding optimal θ
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Cost vs Parameter</h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <LineChart data={costData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="theta"
                                        label={{ value: 'θ', position: 'insideBottom', offset: -5 }}
                                        tick={{ fontSize: 12 }}
                                    />
                                    <YAxis
                                        label={{ value: 'Cost J(θ)', angle: -90, position: 'insideLeft' }}
                                        tick={{ fontSize: 12 }}
                                    />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="cost" stroke="#8b5cf6" strokeWidth={2} dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Why Log Loss?</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div className="p-3 sm:p-4 bg-purple-50 rounded-lg">
                            <h4 className="font-semibold text-purple-900 mb-2 text-sm sm:text-base">Convex Function</h4>
                            <p className="text-xs sm:text-sm text-purple-700">Guarantees finding global minimum</p>
                        </div>
                        <div className="p-3 sm:p-4 bg-pink-50 rounded-lg">
                            <h4 className="font-semibold text-pink-900 mb-2 text-sm sm:text-base">Probabilistic</h4>
                            <p className="text-xs sm:text-sm text-pink-700">Penalizes confident wrong predictions heavily</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
