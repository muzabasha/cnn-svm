'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export function DropoutRegularization() {
    const [dropoutRate, setDropoutRate] = useState(0.5)
    const [showDropout, setShowDropout] = useState(true)

    // Generate training curves
    const generateData = (withDropout: boolean) => {
        return Array.from({ length: 50 }, (_, i) => {
            const epoch = i + 1
            if (withDropout) {
                return {
                    epoch,
                    trainLoss: 2 * Math.exp(-epoch * 0.08) + 0.1,
                    valLoss: 2 * Math.exp(-epoch * 0.07) + 0.15,
                    trainAcc: Math.min(95, 60 + epoch * 0.7),
                    valAcc: Math.min(93, 58 + epoch * 0.68)
                }
            } else {
                return {
                    epoch,
                    trainLoss: 2 * Math.exp(-epoch * 0.12) + 0.05,
                    valLoss: 2 * Math.exp(-epoch * 0.04) + 0.5,
                    trainAcc: Math.min(98, 65 + epoch * 0.8),
                    valAcc: Math.min(85, 60 + epoch * 0.5)
                }
            }
        })
    }

    const data = generateData(showDropout)

    // Neuron visualization
    const neurons = Array.from({ length: 16 }, (_, i) => ({
        id: i,
        active: showDropout ? Math.random() > dropoutRate : true
    }))

    return (
        <div className="space-y-4 sm:space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Dropout Regularization</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm sm:text-base text-gray-600 mb-6">
                        Dropout randomly deactivates neurons during training to prevent overfitting. This forces
                        the network to learn robust features that work with different neuron combinations.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Interactive Dropout Visualization */}
                        <div>
                            <h3 className="font-semibold mb-4 text-sm sm:text-base">Neuron Dropout Visualization</h3>

                            <div className="mb-4">
                                <Slider
                                    label={`Dropout Rate: ${(dropoutRate * 100).toFixed(0)}%`}
                                    value={dropoutRate}
                                    onChange={setDropoutRate}
                                    min={0}
                                    max={0.9}
                                    step={0.1}
                                />
                            </div>

                            <div className="bg-gray-50 rounded-lg p-6 mb-4">
                                <div className="grid grid-cols-4 gap-3">
                                    {neurons.map((neuron) => (
                                        <div
                                            key={neuron.id}
                                            className={`aspect-square rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${neuron.active
                                                ? 'bg-blue-500 text-white shadow-lg'
                                                : 'bg-gray-300 text-gray-500 opacity-30'
                                                }`}
                                        >
                                            {neuron.active ? '✓' : '✗'}
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-4 text-center">
                                    <p className="text-sm text-gray-700">
                                        Active: {neurons.filter(n => n.active).length} / {neurons.length} neurons
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {showDropout ? 'Dropout enabled during training' : 'All neurons active'}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => setShowDropout(true)}
                                    className={`flex-1 py-2 px-4 rounded text-sm font-medium transition-colors ${showDropout
                                        ? 'bg-emerald-600 text-white'
                                        : 'bg-gray-200 text-gray-700'
                                        }`}
                                >
                                    With Dropout
                                </button>
                                <button
                                    onClick={() => setShowDropout(false)}
                                    className={`flex-1 py-2 px-4 rounded text-sm font-medium transition-colors ${!showDropout
                                        ? 'bg-red-600 text-white'
                                        : 'bg-gray-200 text-gray-700'
                                        }`}
                                >
                                    Without Dropout
                                </button>
                            </div>
                        </div>

                        {/* Training Curves */}
                        <div>
                            <h3 className="font-semibold mb-4 text-sm sm:text-base">Training vs Validation Loss</h3>

                            <ResponsiveContainer width="100%" height={250}>
                                <LineChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="epoch" label={{ value: 'Epoch', position: 'insideBottom', offset: -5 }} />
                                    <YAxis label={{ value: 'Loss', angle: -90, position: 'insideLeft' }} />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="trainLoss" stroke="#3b82f6" name="Train Loss" strokeWidth={2} />
                                    <Line type="monotone" dataKey="valLoss" stroke="#ef4444" name="Val Loss" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>

                            <div className="mt-4 p-4 bg-emerald-50 rounded-lg">
                                <h4 className="font-semibold text-emerald-900 mb-2 text-sm">
                                    {showDropout ? '✓ Good Generalization' : '⚠️ Overfitting Detected'}
                                </h4>
                                <p className="text-xs text-emerald-700">
                                    {showDropout
                                        ? 'Training and validation losses converge. The model generalizes well to unseen data.'
                                        : 'Large gap between training and validation loss indicates overfitting. The model memorizes training data.'}
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">How Dropout Works</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <div className="text-2xl mb-2">🎲</div>
                            <h4 className="font-semibold text-blue-900 mb-2 text-sm">Random Deactivation</h4>
                            <p className="text-xs text-blue-700">
                                During training, each neuron has a probability p of being temporarily removed
                            </p>
                        </div>

                        <div className="p-4 bg-green-50 rounded-lg">
                            <div className="text-2xl mb-2">🔄</div>
                            <h4 className="font-semibold text-green-900 mb-2 text-sm">Ensemble Effect</h4>
                            <p className="text-xs text-green-700">
                                Creates an ensemble of different network architectures, improving robustness
                            </p>
                        </div>

                        <div className="p-4 bg-purple-50 rounded-lg">
                            <div className="text-2xl mb-2">🎯</div>
                            <h4 className="font-semibold text-purple-900 mb-2 text-sm">Inference Time</h4>
                            <p className="text-xs text-purple-700">
                                All neurons are active during testing, with outputs scaled by (1-p)
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <h4 className="font-semibold text-yellow-900 mb-2 text-sm">💡 Best Practices</h4>
                        <ul className="text-xs text-yellow-700 space-y-1 list-disc list-inside">
                            <li>Use dropout rates between 0.2 and 0.5 for hidden layers</li>
                            <li>Apply dropout after activation functions</li>
                            <li>Don't use dropout on the output layer</li>
                            <li>Combine with other regularization techniques for best results</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
