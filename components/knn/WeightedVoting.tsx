'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { BlockMath } from 'react-katex'

export function WeightedVoting() {
    const [method, setMethod] = useState<'uniform' | 'distance'>('uniform')

    const neighbors = [
        { distance: 1.2, class: 'A' },
        { distance: 1.8, class: 'A' },
        { distance: 2.5, class: 'B' },
        { distance: 3.1, class: 'B' },
        { distance: 3.8, class: 'B' }
    ]

    const uniformVotes = { A: 2, B: 3 }
    const distanceWeights = neighbors.reduce((acc, n) => {
        const weight = 1 / (n.distance + 0.001)
        acc[n.class] = (acc[n.class] || 0) + weight
        return acc
    }, {} as Record<string, number>)

    return (
        <div className="space-y-4 sm:space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Weighted vs Uniform Voting</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">
                        Weighted voting gives more importance to closer neighbors, while uniform voting treats all K neighbors equally.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                            <h3 className="font-semibold mb-3 text-sm sm:text-base">Voting Method</h3>
                            <div className="space-y-2">
                                <button onClick={() => setMethod('uniform')} className={`w-full p-3 rounded-lg text-left ${method === 'uniform' ? 'bg-green-100 border-2 border-green-500' : 'bg-gray-50 border-2 border-gray-200'}`}>
                                    <h4 className="font-semibold text-sm">Uniform Voting</h4>
                                    <p className="text-xs text-gray-600">Each neighbor gets 1 vote</p>
                                </button>
                                <button onClick={() => setMethod('distance')} className={`w-full p-3 rounded-lg text-left ${method === 'distance' ? 'bg-green-100 border-2 border-green-500' : 'bg-gray-50 border-2 border-gray-200'}`}>
                                    <h4 className="font-semibold text-sm">Distance-Weighted</h4>
                                    <p className="text-xs text-gray-600">Closer neighbors have more influence</p>
                                </button>
                            </div>

                            {method === 'distance' && (
                                <div className="mt-4 bg-blue-50 p-3 rounded-lg overflow-x-auto">
                                    <BlockMath math="w_i = \frac{1}{d_i}" />
                                    <p className="text-xs text-blue-700 mt-2">Weight inversely proportional to distance</p>
                                </div>
                            )}
                        </div>

                        <div>
                            <h3 className="font-semibold mb-3 text-sm sm:text-base">Example Neighbors</h3>
                            <div className="space-y-2 mb-4">
                                {neighbors.map((n, i) => (
                                    <div key={i} className="p-2 bg-gray-50 rounded flex justify-between text-xs sm:text-sm">
                                        <span>Neighbor {i + 1}: Class {n.class}</span>
                                        <span className="text-gray-600">d = {n.distance}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="p-4 bg-green-50 rounded-lg">
                                <p className="font-semibold text-green-900 mb-2 text-sm">Results:</p>
                                {method === 'uniform' ? (
                                    <div className="text-sm">
                                        <p>Class A: {uniformVotes.A} votes</p>
                                        <p>Class B: {uniformVotes.B} votes</p>
                                        <p className="font-bold mt-2">Winner: Class B</p>
                                    </div>
                                ) : (
                                    <div className="text-sm">
                                        <p>Class A: {distanceWeights.A.toFixed(2)} weight</p>
                                        <p>Class B: {distanceWeights.B.toFixed(2)} weight</p>
                                        <p className="font-bold mt-2">Winner: Class {distanceWeights.A > distanceWeights.B ? 'A' : 'B'}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
