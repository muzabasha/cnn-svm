'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'

export function BatchNormalization() {
    const [useBatchNorm, setUseBatchNorm] = useState(true)

    // Generate distribution data
    const generateDistribution = (normalized: boolean) => {
        if (normalized) {
            return Array.from({ length: 50 }, (_, i) => ({
                value: i - 25,
                frequency: Math.exp(-Math.pow(i - 25, 2) / 50) * 100
            }))
        } else {
            return Array.from({ length: 50 }, (_, i) => ({
                value: i * 2 - 50,
                frequency: Math.exp(-Math.pow(i - 35, 2) / 200) * 80 + Math.random() * 20
            }))
        }
    }

    // Training convergence data
    const trainingData = Array.from({ length: 30 }, (_, i) => {
        const epoch = i + 1
        return {
            epoch,
            withBN: 2 * Math.exp(-epoch * 0.15) + 0.1,
            withoutBN: 2 * Math.exp(-epoch * 0.08) + 0.3
        }
    })

    const distributionData = generateDistribution(useBatchNorm)

    return (
        <div className="space-y-4 sm:space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Batch Normalization</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm sm:text-base text-gray-600 mb-6">
                        Batch Normalization normalizes layer inputs to have zero mean and unit variance,
                        stabilizing training and allowing higher learning rates.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Distribution Visualization */}
                        <div>
                            <h3 className="font-semibold mb-4 text-sm sm:text-base">Activation Distribution</h3>

                            <div className="flex gap-2 mb-4">
                                <button
                                    onClick={() => setUseBatchNorm(true)}
                                    className={`flex-1 py-2 px-4 rounded text-sm font-medium transition-colors ${useBatchNorm
                                        ? 'bg-emerald-600 text-white'
                                        : 'bg-gray-200 text-gray-700'
                                        }`}
                                >
                                    With BatchNorm
                                </button>
                                <button
                                    onClick={() => setUseBatchNorm(false)}
                                    className={`flex-1 py-2 px-4 rounded text-sm font-medium transition-colors ${!useBatchNorm
                                        ? 'bg-red-600 text-white'
                                        : 'bg-gray-200 text-gray-700'
                                        }`}
                                >
                                    Without BatchNorm
                                </button>
                            </div>

                            <ResponsiveContainer width="100%" height={200}>
                                <BarChart data={distributionData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="value" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="frequency" fill={useBatchNorm ? '#10b981' : '#ef4444'} />
                                </BarChart>
                            </ResponsiveContainer>

                            <div className={`mt-4 p-4 rounded-lg ${useBatchNorm ? 'bg-emerald-50' : 'bg-red-50'}`}>
                                <h4 className="font-semibold mb-2 text-sm" style={{ color: useBatchNorm ? '#047857' : '#dc2626' }}>
                                    {useBatchNorm ? '✓ Normalized Distribution' : '⚠️ Unstable Distribution'}
                                </h4>
                                <div className="text-xs" style={{ color: useBatchNorm ? '#059669' : '#ef4444' }}>
                                    <p>Mean: {useBatchNorm ? '0.00' : '15.32'}</p>
                                    <p>Std Dev: {useBatchNorm ? '1.00' : '8.47'}</p>
                                    <p className="mt-2">
                                        {useBatchNorm
                                            ? 'Activations are centered and scaled, preventing gradient issues'
                                            : 'Activations have high variance, leading to unstable gradients'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Training Convergence */}
                        <div>
                            <h3 className="font-semibold mb-4 text-sm sm:text-base">Training Convergence</h3>

                            <ResponsiveContainer width="100%" height={200}>
                                <LineChart data={trainingData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="epoch" label={{ value: 'Epoch', position: 'insideBottom', offset: -5 }} />
                                    <YAxis label={{ value: 'Loss', angle: -90, position: 'insideLeft' }} />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="withBN" stroke="#10b981" name="With BatchNorm" strokeWidth={2} />
                                    <Line type="monotone" dataKey="withoutBN" stroke="#ef4444" name="Without BatchNorm" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>

                            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                                <h4 className="font-semibold text-blue-900 mb-2 text-sm">Training Benefits</h4>
                                <ul className="text-xs text-blue-700 space-y-1 list-disc list-inside">
                                    <li>Faster convergence (2-3x speedup)</li>
                                    <li>Higher learning rates possible</li>
                                    <li>Less sensitive to initialization</li>
                                    <li>Acts as regularization</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">How Batch Normalization Works</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h4 className="font-semibold text-gray-900 mb-3 text-sm">Algorithm Steps:</h4>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                                        1
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">Calculate Batch Statistics</p>
                                        <code className="text-xs bg-white p-2 rounded block mt-1">
                                            μ = (1/m) Σ xᵢ &nbsp;&nbsp; σ² = (1/m) Σ (xᵢ - μ)²
                                        </code>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                                        2
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">Normalize</p>
                                        <code className="text-xs bg-white p-2 rounded block mt-1">
                                            x̂ᵢ = (xᵢ - μ) / √(σ² + ε)
                                        </code>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                                        3
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">Scale and Shift</p>
                                        <code className="text-xs bg-white p-2 rounded block mt-1">
                                            yᵢ = γ x̂ᵢ + β
                                        </code>
                                        <p className="text-xs text-gray-600 mt-1">γ and β are learnable parameters</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 bg-blue-50 rounded-lg">
                                <div className="text-2xl mb-2">📊</div>
                                <h4 className="font-semibold text-blue-900 mb-2 text-sm">Reduces Covariate Shift</h4>
                                <p className="text-xs text-blue-700">
                                    Keeps layer inputs stable as previous layers update
                                </p>
                            </div>

                            <div className="p-4 bg-green-50 rounded-lg">
                                <div className="text-2xl mb-2">⚡</div>
                                <h4 className="font-semibold text-green-900 mb-2 text-sm">Faster Training</h4>
                                <p className="text-xs text-green-700">
                                    Allows higher learning rates without divergence
                                </p>
                            </div>

                            <div className="p-4 bg-purple-50 rounded-lg">
                                <div className="text-2xl mb-2">🎯</div>
                                <h4 className="font-semibold text-purple-900 mb-2 text-sm">Regularization Effect</h4>
                                <p className="text-xs text-purple-700">
                                    Adds noise through batch statistics, reducing overfitting
                                </p>
                            </div>
                        </div>

                        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                            <h4 className="font-semibold text-yellow-900 mb-2 text-sm">💡 Best Practices</h4>
                            <ul className="text-xs text-yellow-700 space-y-1 list-disc list-inside">
                                <li>Apply BatchNorm after linear transformation, before activation</li>
                                <li>Use larger batch sizes (32-256) for stable statistics</li>
                                <li>During inference, use running averages instead of batch statistics</li>
                                <li>Can reduce or eliminate need for dropout</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
