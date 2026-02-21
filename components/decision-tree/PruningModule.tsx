'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Scissors, AlertTriangle } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export function PruningModule() {
    const [maxDepth, setMaxDepth] = useState(5)
    const [minSamples, setMinSamples] = useState(2)

    const performanceData = [
        { depth: 1, training: 65, validation: 64 },
        { depth: 2, training: 75, validation: 74 },
        { depth: 3, training: 85, validation: 83 },
        { depth: 4, training: 92, validation: 87 },
        { depth: 5, training: 96, validation: 85 },
        { depth: 6, training: 98, validation: 82 },
        { depth: 7, training: 99, validation: 78 },
        { depth: 8, training: 100, validation: 75 }
    ]

    const optimalDepth = 4

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Tree Pruning & Overfitting Prevention</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                            <div className="flex items-start gap-3">
                                <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-semibold text-red-900 mb-2">The Overfitting Problem</h4>
                                    <p className="text-sm text-gray-700">
                                        Deep trees memorize training data but fail on new data. Pruning removes
                                        unnecessary branches to improve generalization.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                            <h4 className="font-semibold mb-4">Training vs Validation Accuracy</h4>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={performanceData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="depth" label={{ value: 'Tree Depth', position: 'insideBottom', offset: -5 }} />
                                    <YAxis label={{ value: 'Accuracy (%)', angle: -90, position: 'insideLeft' }} />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="training" stroke="#10b981" strokeWidth={2} name="Training Accuracy" />
                                    <Line type="monotone" dataKey="validation" stroke="#8b5cf6" strokeWidth={2} name="Validation Accuracy" />
                                </LineChart>
                            </ResponsiveContainer>
                            <div className="mt-4 bg-green-50 p-4 rounded-lg">
                                <p className="text-sm text-gray-700">
                                    <strong>Optimal Depth:</strong> {optimalDepth} (where validation accuracy peaks)
                                </p>
                                <p className="text-xs text-gray-600 mt-1">
                                    Beyond depth {optimalDepth}, the tree overfits - training accuracy increases but validation decreases.
                                </p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                                <h4 className="font-semibold text-blue-900 mb-4 flex items-center gap-2">
                                    <Scissors className="w-5 h-5" />
                                    Pre-Pruning (Early Stopping)
                                </h4>

                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium mb-2 block">
                                            Max Depth: {maxDepth}
                                        </label>
                                        <Slider
                                            value={[maxDepth]}
                                            onValueChange={(v) => setMaxDepth(v[0])}
                                            min={1}
                                            max={10}
                                            step={1}
                                        />
                                        <p className="text-xs text-gray-600 mt-1">
                                            Stop growing tree after {maxDepth} levels
                                        </p>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium mb-2 block">
                                            Min Samples per Leaf: {minSamples}
                                        </label>
                                        <Slider
                                            value={[minSamples]}
                                            onValueChange={(v) => setMinSamples(v[0])}
                                            min={1}
                                            max={20}
                                            step={1}
                                        />
                                        <p className="text-xs text-gray-600 mt-1">
                                            Require at least {minSamples} samples to create a leaf
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4 bg-white p-3 rounded-lg">
                                    <p className="text-xs text-gray-700">
                                        <strong>Advantages:</strong> Fast, simple to implement
                                    </p>
                                    <p className="text-xs text-gray-700 mt-1">
                                        <strong>Disadvantages:</strong> May stop too early
                                    </p>
                                </div>
                            </div>

                            <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                                <h4 className="font-semibold text-purple-900 mb-4 flex items-center gap-2">
                                    <Scissors className="w-5 h-5" />
                                    Post-Pruning (Cost Complexity)
                                </h4>

                                <div className="space-y-3">
                                    <div className="bg-white p-3 rounded-lg">
                                        <p className="text-sm font-semibold mb-1">Step 1: Grow Full Tree</p>
                                        <p className="text-xs text-gray-600">
                                            Build complete tree without restrictions
                                        </p>
                                    </div>

                                    <div className="bg-white p-3 rounded-lg">
                                        <p className="text-sm font-semibold mb-1">Step 2: Calculate Cost</p>
                                        <p className="text-xs text-gray-600">
                                            For each subtree: Cost = Error + α × Leaves
                                        </p>
                                    </div>

                                    <div className="bg-white p-3 rounded-lg">
                                        <p className="text-sm font-semibold mb-1">Step 3: Prune Weakest</p>
                                        <p className="text-xs text-gray-600">
                                            Remove subtrees that don't reduce error enough
                                        </p>
                                    </div>

                                    <div className="bg-white p-3 rounded-lg">
                                        <p className="text-sm font-semibold mb-1">Step 4: Validate</p>
                                        <p className="text-xs text-gray-600">
                                            Test on validation set, keep best tree
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4 bg-white p-3 rounded-lg">
                                    <p className="text-xs text-gray-700">
                                        <strong>Advantages:</strong> More accurate, data-driven
                                    </p>
                                    <p className="text-xs text-gray-700 mt-1">
                                        <strong>Disadvantages:</strong> Computationally expensive
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                            <h4 className="font-semibold text-yellow-900 mb-3">Pruning Strategies Comparison</h4>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b-2 border-yellow-200">
                                            <th className="text-left p-2">Strategy</th>
                                            <th className="text-left p-2">When Applied</th>
                                            <th className="text-left p-2">Speed</th>
                                            <th className="text-left p-2">Accuracy</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-yellow-100">
                                            <td className="p-2 font-semibold">Pre-Pruning</td>
                                            <td className="p-2">During tree growth</td>
                                            <td className="p-2">⚡ Fast</td>
                                            <td className="p-2">Good</td>
                                        </tr>
                                        <tr className="border-b border-yellow-100">
                                            <td className="p-2 font-semibold">Post-Pruning</td>
                                            <td className="p-2">After full tree built</td>
                                            <td className="p-2">🐌 Slower</td>
                                            <td className="p-2">⭐ Better</td>
                                        </tr>
                                        <tr>
                                            <td className="p-2 font-semibold">Hybrid</td>
                                            <td className="p-2">Both stages</td>
                                            <td className="p-2">Medium</td>
                                            <td className="p-2">⭐⭐ Best</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                            <h4 className="font-semibold text-green-900 mb-2">💡 Best Practices</h4>
                            <ul className="text-sm text-gray-700 space-y-1">
                                <li>• Use cross-validation to find optimal pruning parameters</li>
                                <li>• Start with max_depth between 3-7 for most problems</li>
                                <li>• Set min_samples_leaf to 1-5% of training data</li>
                                <li>• Monitor both training and validation accuracy</li>
                                <li>• Combine pre-pruning and post-pruning for best results</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
