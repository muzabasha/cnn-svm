'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

export function EvaluationDashboard() {
    const [taskType] = useState<'classification' | 'regression'>('classification')

    const classificationMetrics = {
        accuracy: 0.92,
        precision: 0.89,
        recall: 0.94,
        f1Score: 0.91
    }

    const confusionMatrix = [
        [45, 5],
        [3, 47]
    ]

    const metricsData = [
        { name: 'Accuracy', value: classificationMetrics.accuracy * 100 },
        { name: 'Precision', value: classificationMetrics.precision * 100 },
        { name: 'Recall', value: classificationMetrics.recall * 100 },
        { name: 'F1-Score', value: classificationMetrics.f1Score * 100 }
    ]

    const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981']

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Evaluation Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 mb-6">
                        Analyze model performance using comprehensive metrics and visualizations.
                    </p>

                    <Tabs defaultValue="metrics">
                        <TabsList>
                            <TabsTrigger value="metrics">Performance Metrics</TabsTrigger>
                            <TabsTrigger value="confusion">Confusion Matrix</TabsTrigger>
                            <TabsTrigger value="interpretation">Interpretation</TabsTrigger>
                        </TabsList>

                        <TabsContent value="metrics">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-semibold mb-4">Classification Metrics</h3>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart data={metricsData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis domain={[0, 100]} />
                                            <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
                                            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                                                {metricsData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={colors[index]} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className="space-y-4">
                                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <h4 className="font-semibold text-blue-900">Accuracy</h4>
                                            <span className="text-2xl font-bold text-blue-600">
                                                {(classificationMetrics.accuracy * 100).toFixed(1)}%
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-700">
                                            Overall correctness of predictions
                                        </p>
                                        <div className="mt-2 h-2 bg-blue-200 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-blue-600"
                                                style={{ width: `${classificationMetrics.accuracy * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <h4 className="font-semibold text-purple-900">Precision</h4>
                                            <span className="text-2xl font-bold text-purple-600">
                                                {(classificationMetrics.precision * 100).toFixed(1)}%
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-700">
                                            Of predicted positives, how many are correct
                                        </p>
                                        <div className="mt-2 h-2 bg-purple-200 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-purple-600"
                                                style={{ width: `${classificationMetrics.precision * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div className="bg-pink-50 border border-pink-200 rounded-xl p-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <h4 className="font-semibold text-pink-900">Recall</h4>
                                            <span className="text-2xl font-bold text-pink-600">
                                                {(classificationMetrics.recall * 100).toFixed(1)}%
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-700">
                                            Of actual positives, how many were found
                                        </p>
                                        <div className="mt-2 h-2 bg-pink-200 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-pink-600"
                                                style={{ width: `${classificationMetrics.recall * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <h4 className="font-semibold text-green-900">F1-Score</h4>
                                            <span className="text-2xl font-bold text-green-600">
                                                {(classificationMetrics.f1Score * 100).toFixed(1)}%
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-700">
                                            Harmonic mean of precision and recall
                                        </p>
                                        <div className="mt-2 h-2 bg-green-200 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-green-600"
                                                style={{ width: `${classificationMetrics.f1Score * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="confusion">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-semibold mb-4">Confusion Matrix</h3>
                                    <div className="inline-block">
                                        <div className="grid grid-cols-3 gap-2">
                                            <div></div>
                                            <div className="text-center font-semibold text-sm text-gray-600">Predicted 0</div>
                                            <div className="text-center font-semibold text-sm text-gray-600">Predicted 1</div>

                                            <div className="flex items-center justify-end pr-3 font-semibold text-sm text-gray-600">
                                                Actual 0
                                            </div>
                                            <div className="w-24 h-24 bg-green-100 border-2 border-green-300 rounded-xl flex items-center justify-center">
                                                <div className="text-center">
                                                    <div className="text-3xl font-bold text-green-700">{confusionMatrix[0][0]}</div>
                                                    <div className="text-xs text-green-600">True Neg</div>
                                                </div>
                                            </div>
                                            <div className="w-24 h-24 bg-red-100 border-2 border-red-300 rounded-xl flex items-center justify-center">
                                                <div className="text-center">
                                                    <div className="text-3xl font-bold text-red-700">{confusionMatrix[0][1]}</div>
                                                    <div className="text-xs text-red-600">False Pos</div>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-end pr-3 font-semibold text-sm text-gray-600">
                                                Actual 1
                                            </div>
                                            <div className="w-24 h-24 bg-red-100 border-2 border-red-300 rounded-xl flex items-center justify-center">
                                                <div className="text-center">
                                                    <div className="text-3xl font-bold text-red-700">{confusionMatrix[1][0]}</div>
                                                    <div className="text-xs text-red-600">False Neg</div>
                                                </div>
                                            </div>
                                            <div className="w-24 h-24 bg-green-100 border-2 border-green-300 rounded-xl flex items-center justify-center">
                                                <div className="text-center">
                                                    <div className="text-3xl font-bold text-green-700">{confusionMatrix[1][1]}</div>
                                                    <div className="text-xs text-green-600">True Pos</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                                        <h4 className="font-semibold text-green-900 mb-2">True Positives (TP)</h4>
                                        <p className="text-sm text-gray-700 mb-2">
                                            Correctly predicted as positive: <strong>{confusionMatrix[1][1]}</strong>
                                        </p>
                                        <p className="text-xs text-gray-600">
                                            Model correctly identified class 1 samples
                                        </p>
                                    </div>

                                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                                        <h4 className="font-semibold text-green-900 mb-2">True Negatives (TN)</h4>
                                        <p className="text-sm text-gray-700 mb-2">
                                            Correctly predicted as negative: <strong>{confusionMatrix[0][0]}</strong>
                                        </p>
                                        <p className="text-xs text-gray-600">
                                            Model correctly identified class 0 samples
                                        </p>
                                    </div>

                                    <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                                        <h4 className="font-semibold text-red-900 mb-2">False Positives (FP)</h4>
                                        <p className="text-sm text-gray-700 mb-2">
                                            Incorrectly predicted as positive: <strong>{confusionMatrix[0][1]}</strong>
                                        </p>
                                        <p className="text-xs text-gray-600">
                                            Type I Error - predicted 1 but was actually 0
                                        </p>
                                    </div>

                                    <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                                        <h4 className="font-semibold text-red-900 mb-2">False Negatives (FN)</h4>
                                        <p className="text-sm text-gray-700 mb-2">
                                            Incorrectly predicted as negative: <strong>{confusionMatrix[1][0]}</strong>
                                        </p>
                                        <p className="text-xs text-gray-600">
                                            Type II Error - predicted 0 but was actually 1
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="interpretation">
                            <div className="space-y-4">
                                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                                    <h4 className="font-semibold text-blue-900 mb-3">Formula Breakdown</h4>
                                    <div className="space-y-3 text-sm">
                                        <div className="bg-white p-3 rounded-lg">
                                            <p className="font-mono mb-1">Accuracy = (TP + TN) / (TP + TN + FP + FN)</p>
                                            <p className="text-gray-600">= ({confusionMatrix[1][1]} + {confusionMatrix[0][0]}) / 100 = {classificationMetrics.accuracy.toFixed(2)}</p>
                                        </div>
                                        <div className="bg-white p-3 rounded-lg">
                                            <p className="font-mono mb-1">Precision = TP / (TP + FP)</p>
                                            <p className="text-gray-600">= {confusionMatrix[1][1]} / ({confusionMatrix[1][1]} + {confusionMatrix[0][1]}) = {classificationMetrics.precision.toFixed(2)}</p>
                                        </div>
                                        <div className="bg-white p-3 rounded-lg">
                                            <p className="font-mono mb-1">Recall = TP / (TP + FN)</p>
                                            <p className="text-gray-600">= {confusionMatrix[1][1]} / ({confusionMatrix[1][1]} + {confusionMatrix[1][0]}) = {classificationMetrics.recall.toFixed(2)}</p>
                                        </div>
                                        <div className="bg-white p-3 rounded-lg">
                                            <p className="font-mono mb-1">F1-Score = 2 × (Precision × Recall) / (Precision + Recall)</p>
                                            <p className="text-gray-600">= {classificationMetrics.f1Score.toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                                    <h4 className="font-semibold text-yellow-900 mb-3">When to Use Which Metric?</h4>
                                    <ul className="space-y-2 text-sm text-gray-700">
                                        <li className="flex items-start gap-2">
                                            <span className="text-yellow-600 mt-0.5">•</span>
                                            <span><strong>Accuracy:</strong> Use when classes are balanced</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-yellow-600 mt-0.5">•</span>
                                            <span><strong>Precision:</strong> When false positives are costly (spam detection)</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-yellow-600 mt-0.5">•</span>
                                            <span><strong>Recall:</strong> When false negatives are costly (disease detection)</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-yellow-600 mt-0.5">•</span>
                                            <span><strong>F1-Score:</strong> When you need balance between precision and recall</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                                    <h4 className="font-semibold text-purple-900 mb-2">Model Performance Summary</h4>
                                    <p className="text-sm text-gray-700">
                                        This SVM model achieves {(classificationMetrics.accuracy * 100).toFixed(1)}% accuracy with
                                        high recall ({(classificationMetrics.recall * 100).toFixed(1)}%), meaning it successfully
                                        identifies most positive cases. The balanced F1-score of {(classificationMetrics.f1Score * 100).toFixed(1)}%
                                        indicates good overall performance.
                                    </p>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}
