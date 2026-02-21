'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export function InitializationMethods() {
    const [method, setMethod] = useState<'random' | 'kmeans++'>('random')

    return (
        <div className="space-y-4 sm:space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Initialization Methods</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">
                        Compare random initialization vs K-means++ for better convergence.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button
                            onClick={() => setMethod('random')}
                            className={`p-4 rounded-lg text-left ${method === 'random' ? 'bg-cyan-100 border-2 border-cyan-500' : 'bg-gray-50 border-2 border-gray-200'}`}
                        >
                            <h4 className="font-semibold mb-2">Random Initialization</h4>
                            <p className="text-sm text-gray-600">Select K random points as initial centroids</p>
                            <p className="text-xs text-gray-500 mt-2">✗ May converge to local optima</p>
                        </button>
                        <button
                            onClick={() => setMethod('kmeans++')}
                            className={`p-4 rounded-lg text-left ${method === 'kmeans++' ? 'bg-cyan-100 border-2 border-cyan-500' : 'bg-gray-50 border-2 border-gray-200'}`}
                        >
                            <h4 className="font-semibold mb-2">K-means++</h4>
                            <p className="text-sm text-gray-600">Smart initialization for better convergence</p>
                            <p className="text-xs text-gray-500 mt-2">✓ Spreads initial centroids apart</p>
                        </button>
                    </div>

                    {method === 'kmeans++' && (
                        <div className="mt-4 p-4 bg-cyan-50 rounded-lg">
                            <p className="text-sm font-semibold text-cyan-900 mb-2">K-means++ Algorithm:</p>
                            <ol className="text-xs sm:text-sm text-cyan-700 space-y-1">
                                <li>1. Choose first centroid randomly</li>
                                <li>2. For each point, compute distance to nearest centroid</li>
                                <li>3. Choose next centroid with probability proportional to distance²</li>
                                <li>4. Repeat until K centroids selected</li>
                            </ol>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
