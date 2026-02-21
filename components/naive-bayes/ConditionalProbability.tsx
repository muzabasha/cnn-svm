'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { BlockMath, InlineMath } from 'react-katex'
import { AlertCircle } from 'lucide-react'

export function ConditionalProbability() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Conditional Probability & Independence</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div className="bg-fuchsia-50 border border-fuchsia-200 rounded-xl p-6">
                        <h4 className="font-semibold text-fuchsia-900 mb-3">Conditional Probability</h4>
                        <BlockMath math="P(A|B) = \frac{P(A \cap B)}{P(B)}" />
                        <p className="text-sm text-gray-700 mt-3">
                            The probability of A occurring given that B has occurred.
                        </p>
                    </div>

                    <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                        <h4 className="font-semibold mb-4">Example: Weather and Tennis</h4>
                        <div className="space-y-4">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <p className="text-sm font-semibold mb-2">Joint Probability</p>
                                <p className="text-sm text-gray-700">
                                    P(Play=Yes AND Sunny) = 2/10 = 0.2
                                </p>
                                <p className="text-xs text-gray-600 mt-1">
                                    Out of 10 days, 2 were sunny AND we played
                                </p>
                            </div>

                            <div className="bg-purple-50 p-4 rounded-lg">
                                <p className="text-sm font-semibold mb-2">Marginal Probability</p>
                                <p className="text-sm text-gray-700">
                                    P(Sunny) = 5/10 = 0.5
                                </p>
                                <p className="text-xs text-gray-600 mt-1">
                                    Out of 10 days, 5 were sunny
                                </p>
                            </div>

                            <div className="bg-green-50 p-4 rounded-lg">
                                <p className="text-sm font-semibold mb-2">Conditional Probability</p>
                                <BlockMath math="P(Play=Yes|Sunny) = \frac{0.2}{0.5} = 0.4" />
                                <p className="text-xs text-gray-600 mt-1">
                                    Given it's sunny, 40% chance we play
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                        <div className="flex items-start gap-3">
                            <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                            <div>
                                <h4 className="font-semibold text-yellow-900 mb-2">The "Naive" Assumption</h4>
                                <p className="text-sm text-gray-700 mb-3">
                                    Naive Bayes assumes features are conditionally independent given the class:
                                </p>
                                <BlockMath math="P(x_1, x_2, ..., x_n|C) = P(x_1|C) \cdot P(x_2|C) \cdot ... \cdot P(x_n|C)" />
                                <p className="text-sm text-gray-700 mt-3">
                                    This is rarely true in reality, but it simplifies computation and often works well!
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <h5 className="font-semibold text-green-900 mb-2">✓ Advantages</h5>
                            <ul className="text-sm text-gray-700 space-y-1">
                                <li>• Fast training and prediction</li>
                                <li>• Works well with high dimensions</li>
                                <li>• Requires less training data</li>
                                <li>• Handles missing values well</li>
                                <li>• Good for text classification</li>
                            </ul>
                        </div>

                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <h5 className="font-semibold text-red-900 mb-2">✗ Limitations</h5>
                            <ul className="text-sm text-gray-700 space-y-1">
                                <li>• Independence assumption often violated</li>
                                <li>• Zero probability problem</li>
                                <li>• Not good for correlated features</li>
                                <li>• Probability estimates can be poor</li>
                                <li>• Sensitive to feature distribution</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                        <h4 className="font-semibold text-blue-900 mb-2">💡 When to Use Naive Bayes</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Text classification (spam detection, sentiment analysis)</li>
                            <li>• Document categorization</li>
                            <li>• Real-time prediction (very fast)</li>
                            <li>• When you have limited training data</li>
                            <li>• As a baseline model for comparison</li>
                        </ul>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
