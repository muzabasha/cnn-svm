'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export function ElbowMethod() {
    const data = [
        { k: 1, wcss: 850 },
        { k: 2, wcss: 450 },
        { k: 3, wcss: 250 },
        { k: 4, wcss: 180 },
        { k: 5, wcss: 150 },
        { k: 6, wcss: 135 },
        { k: 7, wcss: 125 },
        { k: 8, wcss: 120 }
    ]

    return (
        <div className="space-y-4 sm:space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Elbow Method for Optimal K</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">
                        The elbow method helps find the optimal number of clusters by plotting within-cluster sum of squares (WCSS) against K.
                    </p>

                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="k" label={{ value: 'Number of Clusters (K)', position: 'insideBottom', offset: -5 }} />
                            <YAxis label={{ value: 'WCSS', angle: -90, position: 'insideLeft' }} />
                            <Tooltip />
                            <Line type="monotone" dataKey="wcss" stroke="#06b6d4" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>

                    <div className="mt-4 p-4 bg-cyan-50 rounded-lg">
                        <p className="text-sm font-semibold text-cyan-900 mb-2">How to Use:</p>
                        <p className="text-xs sm:text-sm text-cyan-700">
                            Look for the "elbow" point where the rate of decrease sharply changes. This suggests the optimal K value.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
