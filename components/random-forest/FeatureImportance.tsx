'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { BlockMath } from 'react-katex'

export function FeatureImportance() {
    const importanceData = [
        { feature: 'Age', importance: 0.35, color: '#10b981' },
        { feature: 'Income', importance: 0.28, color: '#3b82f6' },
        { feature: 'Credit Score', importance: 0.22, color: '#8b5cf6' },
        { feature: 'Employment', importance: 0.10, color: '#f59e0b' },
        { feature: 'Education', importance: 0.05, color: '#ef4444' }
    ]

    return (
        <Card>
            <CardHeader>
                <CardTitle>Feature Importance</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                        <h4 className="font-semibold text-blue-900 mb-3">What is Feature Importance?</h4>
                        <p className="text-sm text-gray-700 mb-3">
                            Feature importance measures how much each feature contributes to the model's predictions.
                            Random Forest calculates this by measuring how much each feature decreases impurity
                            (Gini or entropy) across all trees.
                        </p>
                        <BlockMath math="Importance(f) = \frac{1}{T} \sum_{t=1}^{T} \Delta Impurity_t(f)" />
                        <p className="text-xs text-gray-600 mt-2">
                            Where T = number of trees, and ΔImpurity = reduction in impurity when splitting on feature f
                        </p>
                    </div>

                    <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                        <h4 className="font-semibold mb-4">Feature Importance Rankings</h4>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={importanceData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" domain={[0, 0.4]} />
                                <YAxis dataKey="feature" type="category" width={100} />
                                <Tooltip formatter={(value: number) => `${(value * 100).toFixed(1)}%`} />
                                <Bar dataKey="importance" fill="#10b981" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="space-y-3">
                        {importanceData.map((item, i) => (
                            <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-semibold">{item.feature}</span>
                                    <span className="text-sm font-bold" style={{ color: item.color }}>
                                        {(item.importance * 100).toFixed(1)}%
                                    </span>
                                </div>
                                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full transition-all"
                                        style={{
                                            width: `${item.importance * 100}%`,
                                            backgroundColor: item.color
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                        <h4 className="font-semibold text-green-900 mb-3">How to Calculate</h4>
                        <ol className="text-sm text-gray-700 space-y-2">
                            <li>1. For each tree, track impurity decrease when splitting on each feature</li>
                            <li>2. Sum the decreases for each feature across all nodes in the tree</li>
                            <li>3. Average the importance scores across all trees in the forest</li>
                            <li>4. Normalize so all importances sum to 1.0 (100%)</li>
                        </ol>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                            <h5 className="font-semibold text-purple-900 mb-2">Use Cases</h5>
                            <ul className="text-sm text-gray-700 space-y-1">
                                <li>• Feature selection (remove low importance)</li>
                                <li>• Model interpretation</li>
                                <li>• Domain insights</li>
                                <li>• Debugging predictions</li>
                                <li>• Regulatory compliance</li>
                            </ul>
                        </div>

                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                            <h5 className="font-semibold text-orange-900 mb-2">Limitations</h5>
                            <ul className="text-sm text-gray-700 space-y-1">
                                <li>• Biased toward high-cardinality features</li>
                                <li>• Doesn't show feature interactions</li>
                                <li>• Can be misleading with correlated features</li>
                                <li>• Importance ≠ causation</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                        <h4 className="font-semibold text-yellow-900 mb-2">💡 Practical Tips</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Use permutation importance for more reliable results</li>
                            <li>• Check feature importance stability across different random seeds</li>
                            <li>• Consider SHAP values for better interpretability</li>
                            <li>• Remove features with near-zero importance to simplify model</li>
                            <li>• Validate importance with domain experts</li>
                        </ul>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
