'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

export function VanishingGradient() {
    const data = Array.from({ length: 20 }, (_, i) => ({
        layer: i + 1,
        vanilla: Math.pow(0.5, i),
        lstm: 0.8 - i * 0.02
    }))

    return (
        <div className="space-y-4 sm:space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Vanishing Gradient Problem</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">
                        In vanilla RNNs, gradients diminish exponentially as they backpropagate through time,
                        making it difficult to learn long-term dependencies.
                    </p>

                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="layer" label={{ value: 'Time Steps Back', position: 'insideBottom', offset: -5 }} />
                            <YAxis label={{ value: 'Gradient Magnitude', angle: -90, position: 'insideLeft' }} />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="vanilla" stroke="#ef4444" strokeWidth={2} name="Vanilla RNN" />
                            <Line type="monotone" dataKey="lstm" stroke="#10b981" strokeWidth={2} name="LSTM" />
                        </LineChart>
                    </ResponsiveContainer>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        <div className="p-4 bg-red-50 rounded-lg">
                            <h4 className="font-semibold text-red-900 mb-2">Problem in Vanilla RNN</h4>
                            <ul className="text-sm text-red-700 space-y-1">
                                <li>• Gradients decay exponentially</li>
                                <li>• Can't learn long-term patterns</li>
                                <li>• Early layers barely update</li>
                            </ul>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg">
                            <h4 className="font-semibold text-green-900 mb-2">LSTM Solution</h4>
                            <ul className="text-sm text-green-700 space-y-1">
                                <li>• Constant error carousel</li>
                                <li>• Gates control gradient flow</li>
                                <li>• Maintains gradient magnitude</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
