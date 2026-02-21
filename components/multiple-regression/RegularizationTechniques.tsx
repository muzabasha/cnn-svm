'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { BlockMath } from 'react-katex'

export function RegularizationTechniques() {
    const [method, setMethod] = useState<'ridge' | 'lasso' | 'elastic'>('ridge')
    const [lambda, setLambda] = useState(1)

    return (
        <div className="space-y-4 sm:space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Regularization Techniques</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">
                        Prevent overfitting by adding penalty terms to the cost function.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                        <button
                            onClick={() => setMethod('ridge')}
                            className={`p-3 rounded-lg text-left ${method === 'ridge' ? 'bg-orange-100 border-2 border-orange-500' : 'bg-gray-50 border-2 border-gray-200'}`}
                        >
                            <h4 className="font-semibold text-sm">Ridge (L2)</h4>
                            <p className="text-xs text-gray-600">Shrinks coefficients</p>
                        </button>
                        <button
                            onClick={() => setMethod('lasso')}
                            className={`p-3 rounded-lg text-left ${method === 'lasso' ? 'bg-orange-100 border-2 border-orange-500' : 'bg-gray-50 border-2 border-gray-200'}`}
                        >
                            <h4 className="font-semibold text-sm">Lasso (L1)</h4>
                            <p className="text-xs text-gray-600">Feature selection</p>
                        </button>
                        <button
                            onClick={() => setMethod('elastic')}
                            className={`p-3 rounded-lg text-left ${method === 'elastic' ? 'bg-orange-100 border-2 border-orange-500' : 'bg-gray-50 border-2 border-gray-200'}`}
                        >
                            <h4 className="font-semibold text-sm">Elastic Net</h4>
                            <p className="text-xs text-gray-600">L1 + L2 combo</p>
                        </button>
                    </div>

                    <Slider label="Regularization Strength (λ)" value={lambda} onChange={setLambda} min={0} max={10} step={0.1} description="Higher λ = more regularization" />

                    <div className="mt-4 bg-orange-50 p-4 rounded-lg overflow-x-auto">
                        {method === 'ridge' && (
                            <>
                                <p className="text-sm font-semibold text-orange-900 mb-2">Ridge Regression:</p>
                                <BlockMath math="J(\theta) = MSE + \lambda\sum_{i=1}^{n}\theta_i^2" />
                                <p className="text-xs text-orange-700 mt-2">Penalizes large weights (L2 norm)</p>
                            </>
                        )}
                        {method === 'lasso' && (
                            <>
                                <p className="text-sm font-semibold text-orange-900 mb-2">Lasso Regression:</p>
                                <BlockMath math="J(\theta) = MSE + \lambda\sum_{i=1}^{n}|\theta_i|" />
                                <p className="text-xs text-orange-700 mt-2">Can set weights to zero (L1 norm)</p>
                            </>
                        )}
                        {method === 'elastic' && (
                            <>
                                <p className="text-sm font-semibold text-orange-900 mb-2">Elastic Net:</p>
                                <BlockMath math="J(\theta) = MSE + \lambda_1\sum|\theta_i| + \lambda_2\sum\theta_i^2" />
                                <p className="text-xs text-orange-700 mt-2">Combines L1 and L2 penalties</p>
                            </>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
