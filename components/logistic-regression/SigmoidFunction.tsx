'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { InlineMath, BlockMath } from 'react-katex'

export function SigmoidFunction() {
    const [weight, setWeight] = useState(1)
    const [bias, setBias] = useState(0)

    const sigmoid = (z: number) => 1 / (1 + Math.exp(-z))

    const generateData = () => {
        const data = []
        for (let x = -10; x <= 10; x += 0.2) {
            const z = weight * x + bias
            const y = sigmoid(z)
            data.push({ x: x.toFixed(2), z: z.toFixed(2), y: y.toFixed(3), xNum: x })
        }
        return data
    }

    const data = generateData()

    return (
        <div className="space-y-4 sm:space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Sigmoid Activation Function</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">
                        The sigmoid function maps any real-valued number to a value between 0 and 1,
                        making it perfect for binary classification probabilities.
                    </p>

                    <div className="bg-blue-50 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6 overflow-x-auto">
                        <BlockMath math="\sigma(z) = \frac{1}{1 + e^{-z}}" />
                        <p className="text-xs sm:text-sm text-gray-700 mt-2">
                            where <InlineMath math="z = wx + b" />
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Adjust Parameters</h3>

                            <Slider
                                label="Weight (w)"
                                value={weight}
                                onChange={setWeight}
                                min={-5}
                                max={5}
                                step={0.1}
                                description="Controls the steepness of the curve"
                            />

                            <Slider
                                label="Bias (b)"
                                value={bias}
                                onChange={setBias}
                                min={-5}
                                max={5}
                                step={0.1}
                                description="Shifts the curve left or right"
                            />

                            <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3 text-xs sm:text-sm">
                                <div className="p-2 sm:p-3 bg-purple-50 rounded-lg">
                                    <p className="font-semibold text-purple-900">Current Function:</p>
                                    <p className="text-purple-700">
                                        σ(z) = 1 / (1 + e<sup>-({weight.toFixed(1)}x + {bias.toFixed(1)})</sup>)
                                    </p>
                                </div>
                                <div className="p-2 sm:p-3 bg-green-50 rounded-lg">
                                    <p className="font-semibold text-green-900">At x = 0:</p>
                                    <p className="text-green-700">
                                        σ(0) = {sigmoid(bias).toFixed(3)} ({(sigmoid(bias) * 100).toFixed(1)}%)
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Sigmoid Curve</h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <LineChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="x"
                                        label={{ value: 'Input (x)', position: 'insideBottom', offset: -5 }}
                                        tick={{ fontSize: 12 }}
                                    />
                                    <YAxis
                                        label={{ value: 'σ(z)', angle: -90, position: 'insideLeft' }}
                                        tick={{ fontSize: 12 }}
                                    />
                                    <Tooltip />
                                    <ReferenceLine y={0.5} stroke="red" strokeDasharray="3 3" label="Threshold" />
                                    <Line type="monotone" dataKey="y" stroke="#8b5cf6" strokeWidth={2} dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Key Properties</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                        <div className="p-3 sm:p-4 bg-blue-50 rounded-lg">
                            <h4 className="font-semibold text-blue-900 mb-2 text-sm sm:text-base">Range</h4>
                            <p className="text-xs sm:text-sm text-blue-700">Output is always between 0 and 1</p>
                        </div>
                        <div className="p-3 sm:p-4 bg-purple-50 rounded-lg">
                            <h4 className="font-semibold text-purple-900 mb-2 text-sm sm:text-base">S-Shape</h4>
                            <p className="text-xs sm:text-sm text-purple-700">Smooth transition from 0 to 1</p>
                        </div>
                        <div className="p-3 sm:p-4 bg-pink-50 rounded-lg">
                            <h4 className="font-semibold text-pink-900 mb-2 text-sm sm:text-base">Threshold</h4>
                            <p className="text-xs sm:text-sm text-pink-700">σ(0) = 0.5 is the decision boundary</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
