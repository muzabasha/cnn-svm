'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { BlockMath, InlineMath } from 'react-katex'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export function SplittingCriteria() {
    const [selectedSplit, setSelectedSplit] = useState<'age' | 'income'>('age')

    const dataset = [
        { age: 25, income: 'Low', buys: 'No' },
        { age: 35, income: 'Medium', buys: 'Yes' },
        { age: 45, income: 'High', buys: 'Yes' },
        { age: 20, income: 'Low', buys: 'No' },
        { age: 30, income: 'Medium', buys: 'Yes' },
        { age: 50, income: 'High', buys: 'Yes' }
    ]

    const calculateGini = (yesCount: number, noCount: number) => {
        const total = yesCount + noCount
        if (total === 0) return 0
        const pYes = yesCount / total
        const pNo = noCount / total
        return 1 - (pYes ** 2 + pNo ** 2)
    }

    const calculateEntropy = (yesCount: number, noCount: number) => {
        const total = yesCount + noCount
        if (total === 0) return 0
        const pYes = yesCount / total
        const pNo = noCount / total
        const entropyYes = pYes > 0 ? -pYes * Math.log2(pYes) : 0
        const entropyNo = pNo > 0 ? -pNo * Math.log2(pNo) : 0
        return entropyYes + entropyNo
    }

    const ageSplit = {
        left: { yes: 1, no: 2 },
        right: { yes: 3, no: 0 }
    }

    const incomeSplit = {
        low: { yes: 0, no: 2 },
        medium: { yes: 2, no: 0 },
        high: { yes: 2, no: 0 }
    }

    const parentGini = calculateGini(4, 2)
    const parentEntropy = calculateEntropy(4, 2)

    const ageGiniLeft = calculateGini(ageSplit.left.yes, ageSplit.left.no)
    const ageGiniRight = calculateGini(ageSplit.right.yes, ageSplit.right.no)
    const ageWeightedGini = (3 / 6) * ageGiniLeft + (3 / 6) * ageGiniRight
    const ageGiniGain = parentGini - ageWeightedGini

    const ageEntropyLeft = calculateEntropy(ageSplit.left.yes, ageSplit.left.no)
    const ageEntropyRight = calculateEntropy(ageSplit.right.yes, ageSplit.right.no)
    const ageWeightedEntropy = (3 / 6) * ageEntropyLeft + (3 / 6) * ageEntropyRight
    const ageInfoGain = parentEntropy - ageWeightedEntropy

    const comparisonData = [
        {
            name: 'Age Split',
            giniGain: ageGiniGain,
            infoGain: ageInfoGain
        },
        {
            name: 'Income Split',
            giniGain: 0.25,
            infoGain: 0.35
        }
    ]

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Splitting Criteria Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="gini">
                        <TabsList>
                            <TabsTrigger value="gini">Gini Impurity</TabsTrigger>
                            <TabsTrigger value="entropy">Entropy & Information Gain</TabsTrigger>
                            <TabsTrigger value="comparison">Compare Splits</TabsTrigger>
                        </TabsList>

                        <TabsContent value="gini">
                            <div className="space-y-6">
                                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                                    <h4 className="font-semibold text-green-900 mb-3">Gini Impurity Formula</h4>
                                    <BlockMath math="Gini(D) = 1 - \sum_{i=1}^{n} p_i^2" />
                                    <p className="text-sm text-gray-700 mt-3">
                                        Measures the probability of incorrectly classifying a randomly chosen element.
                                        Range: [0, 0.5] for binary classification. Lower is better (more pure).
                                    </p>
                                </div>

                                <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                                    <h4 className="font-semibold mb-4">Example: Split on Age ≤ 30</h4>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="bg-blue-50 p-4 rounded-lg">
                                            <h5 className="font-semibold text-blue-900 mb-2">Left Node (Age ≤ 30)</h5>
                                            <p className="text-sm mb-2">Yes: 1, No: 2</p>
                                            <BlockMath math="Gini = 1 - \left(\frac{1}{3}\right)^2 - \left(\frac{2}{3}\right)^2" />
                                            <BlockMath math="= 1 - 0.111 - 0.444 = 0.444" />
                                        </div>

                                        <div className="bg-purple-50 p-4 rounded-lg">
                                            <h5 className="font-semibold text-purple-900 mb-2">Right Node (Age &gt; 30)</h5>
                                            <p className="text-sm mb-2">Yes: 3, No: 0</p>
                                            <BlockMath math="Gini = 1 - \left(\frac{3}{3}\right)^2 - \left(\frac{0}{3}\right)^2" />
                                            <BlockMath math="= 1 - 1 - 0 = 0" />
                                            <p className="text-xs text-purple-700 mt-2">✓ Pure node!</p>
                                        </div>
                                    </div>

                                    <div className="bg-yellow-50 p-4 rounded-lg mt-4">
                                        <h5 className="font-semibold text-yellow-900 mb-2">Weighted Gini</h5>
                                        <BlockMath math="Gini_{weighted} = \frac{3}{6} \times 0.444 + \frac{3}{6} \times 0 = 0.222" />
                                        <p className="text-sm text-gray-700 mt-2">
                                            <strong>Gini Gain:</strong> {parentGini.toFixed(3)} - {ageWeightedGini.toFixed(3)} = {ageGiniGain.toFixed(3)}
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                                    <h4 className="font-semibold text-blue-900 mb-2">💡 Key Insight</h4>
                                    <p className="text-sm text-gray-700">
                                        Choose the split with the <strong>lowest weighted Gini</strong> or <strong>highest Gini gain</strong>.
                                        This creates the purest child nodes.
                                    </p>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="entropy">
                            <div className="space-y-6">
                                <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                                    <h4 className="font-semibold text-purple-900 mb-3">Entropy Formula</h4>
                                    <BlockMath math="Entropy(D) = -\sum_{i=1}^{n} p_i \log_2(p_i)" />
                                    <p className="text-sm text-gray-700 mt-3">
                                        Measures the amount of disorder or uncertainty in the data.
                                        Range: [0, 1] for binary classification. Lower is better (more pure).
                                    </p>
                                </div>

                                <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                                    <h4 className="font-semibold mb-4">Parent Node Entropy</h4>
                                    <p className="text-sm mb-2">Total: Yes: 4, No: 2</p>
                                    <BlockMath math="Entropy = -\frac{4}{6}\log_2\left(\frac{4}{6}\right) - \frac{2}{6}\log_2\left(\frac{2}{6}\right)" />
                                    <BlockMath math="= -0.667 \times (-0.585) - 0.333 \times (-1.585)" />
                                    <BlockMath math="= 0.390 + 0.528 = 0.918" />
                                </div>

                                <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                                    <h4 className="font-semibold mb-4">Information Gain</h4>
                                    <BlockMath math="IG = Entropy_{parent} - \sum \frac{|D_i|}{|D|} \times Entropy_i" />

                                    <div className="bg-green-50 p-4 rounded-lg mt-4">
                                        <h5 className="font-semibold text-green-900 mb-2">For Age ≤ 30 Split</h5>
                                        <p className="text-sm mb-2">
                                            Left Entropy: {ageEntropyLeft.toFixed(3)}, Right Entropy: {ageEntropyRight.toFixed(3)}
                                        </p>
                                        <BlockMath math={`IG = ${parentEntropy.toFixed(3)} - ${ageWeightedEntropy.toFixed(3)} = ${ageInfoGain.toFixed(3)}`} />
                                        <p className="text-sm text-green-700 mt-2">
                                            ✓ Higher information gain means better split!
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                                    <h4 className="font-semibold text-yellow-900 mb-2">Gini vs Entropy</h4>
                                    <ul className="text-sm text-gray-700 space-y-1">
                                        <li>• Both measure node impurity</li>
                                        <li>• Gini is faster to compute (no logarithm)</li>
                                        <li>• Entropy is more sensitive to changes</li>
                                        <li>• Both usually produce similar trees</li>
                                    </ul>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="comparison">
                            <div className="space-y-6">
                                <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                                    <h4 className="font-semibold mb-4">Split Comparison</h4>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart data={comparisonData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis domain={[0, 1]} />
                                            <Tooltip formatter={(value: number) => value.toFixed(3)} />
                                            <Legend />
                                            <Bar dataKey="giniGain" fill="#10b981" name="Gini Gain" />
                                            <Bar dataKey="infoGain" fill="#8b5cf6" name="Information Gain" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                                        <h5 className="font-semibold text-green-900 mb-2">Age Split</h5>
                                        <p className="text-sm text-gray-700 mb-2">Split at Age ≤ 30</p>
                                        <p className="text-sm">Gini Gain: <strong>{ageGiniGain.toFixed(3)}</strong></p>
                                        <p className="text-sm">Info Gain: <strong>{ageInfoGain.toFixed(3)}</strong></p>
                                        <p className="text-xs text-green-700 mt-2">✓ Better split</p>
                                    </div>

                                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                                        <h5 className="font-semibold text-gray-900 mb-2">Income Split</h5>
                                        <p className="text-sm text-gray-700 mb-2">Split by Income Level</p>
                                        <p className="text-sm">Gini Gain: <strong>0.250</strong></p>
                                        <p className="text-sm">Info Gain: <strong>0.350</strong></p>
                                        <p className="text-xs text-gray-600 mt-2">Lower gain</p>
                                    </div>
                                </div>

                                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                                    <h4 className="font-semibold text-blue-900 mb-2">🎯 Decision</h4>
                                    <p className="text-sm text-gray-700">
                                        Choose <strong>Age</strong> as the splitting feature because it has higher Gini gain
                                        and information gain, creating purer child nodes.
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
