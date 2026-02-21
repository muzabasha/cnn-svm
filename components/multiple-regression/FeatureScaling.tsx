'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { BlockMath } from 'react-katex'

export function FeatureScaling() {
    const [method, setMethod] = useState<'normalization' | 'standardization'>('normalization')

    const rawData = [10, 50, 100, 200, 500]
    const normalized = rawData.map(x => (x - 10) / (500 - 10))
    const mean = rawData.reduce((a, b) => a + b) / rawData.length
    const std = Math.sqrt(rawData.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / rawData.length)
    const standardized = rawData.map(x => (x - mean) / std)

    return (
        <div className="space-y-4 sm:space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Feature Scaling Techniques</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">
                        Scale features to similar ranges for faster convergence and better model performance.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <button
                            onClick={() => setMethod('normalization')}
                            className={`p-4 rounded-lg text-left ${method === 'normalization' ? 'bg-orange-100 border-2 border-orange-500' : 'bg-gray-50 border-2 border-gray-200'}`}
                        >
                            <h4 className="font-semibold mb-2">Min-Max Normalization</h4>
                            <p className="text-sm text-gray-600">Scale to [0, 1] range</p>
                        </button>
                        <button
                            onClick={() => setMethod('standardization')}
                            className={`p-4 rounded-lg text-left ${method === 'standardization' ? 'bg-orange-100 border-2 border-orange-500' : 'bg-gray-50 border-2 border-gray-200'}`}
                        >
                            <h4 className="font-semibold mb-2">Standardization (Z-score)</h4>
                            <p className="text-sm text-gray-600">Mean=0, Std=1</p>
                        </button>
                    </div>

                    {method === 'normalization' ? (
                        <div className="bg-orange-50 p-4 rounded-lg overflow-x-auto">
                            <BlockMath math="x_{norm} = \frac{x - x_{min}}{x_{max} - x_{min}}" />
                            <div className="mt-4">
                                <p className="text-sm font-semibold text-orange-900 mb-2">Example:</p>
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                    <div>
                                        <p className="font-semibold">Original:</p>
                                        {rawData.map((x, i) => <p key={i}>{x}</p>)}
                                    </div>
                                    <div>
                                        <p className="font-semibold">Normalized:</p>
                                        {normalized.map((x, i) => <p key={i}>{x.toFixed(3)}</p>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-orange-50 p-4 rounded-lg overflow-x-auto">
                            <BlockMath math="x_{std} = \frac{x - \mu}{\sigma}" />
                            <div className="mt-4">
                                <p className="text-sm font-semibold text-orange-900 mb-2">Example:</p>
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                    <div>
                                        <p className="font-semibold">Original:</p>
                                        {rawData.map((x, i) => <p key={i}>{x}</p>)}
                                    </div>
                                    <div>
                                        <p className="font-semibold">Standardized:</p>
                                        {standardized.map((x, i) => <p key={i}>{x.toFixed(3)}</p>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
