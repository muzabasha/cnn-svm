'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

export function TimeSeriesPrediction() {
    const data = Array.from({ length: 30 }, (_, i) => ({
        time: i,
        actual: 50 + 20 * Math.sin(i * 0.3) + Math.random() * 5,
        predicted: i < 20 ? 50 + 20 * Math.sin(i * 0.3) : 50 + 20 * Math.sin(i * 0.3) + (Math.random() - 0.5) * 3
    }))

    return (
        <div className="space-y-4 sm:space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Time Series Forecasting with RNNs</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">
                        RNNs excel at predicting future values in sequential data like stock prices, weather, and sensor readings.
                    </p>

                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" label={{ value: 'Time', position: 'insideBottom', offset: -5 }} />
                            <YAxis label={{ value: 'Value', angle: -90, position: 'insideLeft' }} />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="actual" stroke="#3b82f6" strokeWidth={2} name="Actual" />
                            <Line type="monotone" dataKey="predicted" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" name="Predicted" />
                        </LineChart>
                    </ResponsiveContainer>

                    <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm font-semibold text-purple-900 mb-2">Training Process:</p>
                        <ol className="text-xs text-purple-700 space-y-1">
                            <li>1. Feed historical sequence to RNN</li>
                            <li>2. Predict next value</li>
                            <li>3. Compare with actual value</li>
                            <li>4. Update weights via backpropagation</li>
                            <li>5. Repeat for all sequences</li>
                        </ol>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <h4 className="font-semibold text-blue-900 text-sm">Stock Prices</h4>
                            <p className="text-xs text-blue-700">Financial forecasting</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                            <h4 className="font-semibold text-green-900 text-sm">Weather</h4>
                            <p className="text-xs text-green-700">Temperature prediction</p>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-lg">
                            <h4 className="font-semibold text-purple-900 text-sm">Energy</h4>
                            <p className="text-xs text-purple-700">Demand forecasting</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
