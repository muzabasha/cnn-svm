'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Scatter, ScatterChart } from 'recharts'

export function PolynomialFeatures() {
    const [degree, setDegree] = useState(2)

    const generateData = () => {
        const data = []
        for (let x = -5; x <= 5; x += 0.5) {
            let y = 0
            for (let d = 0; d <= degree; d++) {
                y += Math.pow(x, d) * (d % 2 === 0 ? 0.5 : -0.3)
            }
            data.push({ x, y })
        }
        return data
    }

    const data = generateData()

    return (
        <div className="space-y-4 sm:space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Polynomial Features</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">
                        Transform linear regression into polynomial regression to model non-linear relationships.
                    </p>

                    <Slider label="Polynomial Degree" value={degree} onChange={setDegree} min={1} max={5} step={1} description="Higher degree = more complex curves" />

                    <div className="mt-6">
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="x" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="y" stroke="#f97316" strokeWidth={2} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="mt-4 p-4 bg-orange-50 rounded-lg">
                        <p className="text-sm font-semibold text-orange-900 mb-2">Degree {degree} Polynomial:</p>
                        <p className="text-sm text-orange-700">
                            y = w₀ + w₁x + w₂x² {degree >= 3 && '+ w₃x³'} {degree >= 4 && '+ w₄x⁴'} {degree >= 5 && '+ w₅x⁵'}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
