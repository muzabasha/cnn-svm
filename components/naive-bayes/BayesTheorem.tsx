'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { BlockMath, InlineMath } from 'react-katex'

export function BayesTheorem() {
    const [priorDisease, setPriorDisease] = useState(0.01) // P(Disease) = 1%
    const [sensitivity, setSensitivity] = useState(0.95) // P(Positive|Disease) = 95%
    const [specificity, setSpecificity] = useState(0.90) // P(Negative|No Disease) = 90%

    const falsePositiveRate = 1 - specificity
    const pPositive = (sensitivity * priorDisease) + (falsePositiveRate * (1 - priorDisease))
    const posterior = (sensitivity * priorDisease) / pPositive

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Bayes' Theorem Explained</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                            <h4 className="font-semibold text-purple-900 mb-3">The Formula</h4>
                            <BlockMath math="P(A|B) = \frac{P(B|A) \cdot P(A)}{P(B)}" />
                            <div className="mt-4 space-y-2 text-sm text-gray-700">
                                <p><InlineMath math="P(A|B)" /> = Posterior probability (what we want to find)</p>
                                <p><InlineMath math="P(B|A)" /> = Likelihood (probability of evidence given hypothesis)</p>
                                <p><InlineMath math="P(A)" /> = Prior probability (initial belief)</p>
                                <p><InlineMath math="P(B)" /> = Marginal probability (total probability of evidence)</p>
                            </div>
                        </div>

                        <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                            <h4 className="font-semibold mb-4">Medical Test Example</h4>
                            <p className="text-sm text-gray-700 mb-4">
                                A patient tests positive for a rare disease. What's the probability they actually have it?
                            </p>

                            <div className="space-y-6">
                                <div>
                                    <label className="text-sm font-medium mb-2 block">
                                        Disease Prevalence (Prior): {(priorDisease * 100).toFixed(1)}%
                                    </label>
                                    <Slider
                                        value={[priorDisease * 100]}
                                        onValueChange={(v) => setPriorDisease(v[0] / 100)}
                                        min={0.1}
                                        max={10}
                                        step={0.1}
                                    />
                                    <p className="text-xs text-gray-600 mt-1">
                                        <InlineMath math="P(Disease)" /> = {priorDisease.toFixed(4)}
                                    </p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium mb-2 block">
                                        Test Sensitivity: {(sensitivity * 100).toFixed(0)}%
                                    </label>
                                    <Slider
                                        value={[sensitivity * 100]}
                                        onValueChange={(v) => setSensitivity(v[0] / 100)}
                                        min={50}
                                        max={100}
                                        step={1}
                                    />
                                    <p className="text-xs text-gray-600 mt-1">
                                        <InlineMath math="P(Positive|Disease)" /> = {sensitivity.toFixed(2)} (True Positive Rate)
                                    </p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium mb-2 block">
                                        Test Specificity: {(specificity * 100).toFixed(0)}%
                                    </label>
                                    <Slider
                                        value={[specificity * 100]}
                                        onValueChange={(v) => setSpecificity(v[0] / 100)}
                                        min={50}
                                        max={100}
                                        step={1}
                                    />
                                    <p className="text-xs text-gray-600 mt-1">
                                        <InlineMath math="P(Negative|No\\ Disease)" /> = {specificity.toFixed(2)} (True Negative Rate)
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                            <h4 className="font-semibold text-blue-900 mb-3">Step-by-Step Calculation</h4>

                            <div className="space-y-4">
                                <div className="bg-white p-4 rounded-lg">
                                    <p className="text-sm font-semibold mb-2">Step 1: Calculate P(Positive)</p>
                                    <BlockMath math={`P(Pos) = P(Pos|Dis) \\cdot P(Dis) + P(Pos|No\\ Dis) \\cdot P(No\\ Dis)`} />
                                    <BlockMath math={`= ${sensitivity.toFixed(2)} \\times ${priorDisease.toFixed(4)} + ${falsePositiveRate.toFixed(2)} \\times ${(1 - priorDisease).toFixed(4)}`} />
                                    <BlockMath math={`= ${pPositive.toFixed(4)}`} />
                                </div>

                                <div className="bg-white p-4 rounded-lg">
                                    <p className="text-sm font-semibold mb-2">Step 2: Apply Bayes' Theorem</p>
                                    <BlockMath math={`P(Dis|Pos) = \\frac{P(Pos|Dis) \\cdot P(Dis)}{P(Pos)}`} />
                                    <BlockMath math={`= \\frac{${sensitivity.toFixed(2)} \\times ${priorDisease.toFixed(4)}}{${pPositive.toFixed(4)}}`} />
                                    <BlockMath math={`= ${posterior.toFixed(4)}`} />
                                </div>
                            </div>
                        </div>

                        <div className={`border-2 rounded-xl p-6 ${posterior > 0.5 ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'
                            }`}>
                            <h4 className="font-semibold mb-3">Result</h4>
                            <p className="text-2xl font-bold mb-2">
                                {(posterior * 100).toFixed(2)}% chance of having the disease
                            </p>
                            <p className="text-sm text-gray-700">
                                Even with a positive test result, the actual probability depends heavily on the
                                disease prevalence (prior probability). This is why rare diseases often have
                                surprisingly low posterior probabilities even with positive tests!
                            </p>
                        </div>

                        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                            <h4 className="font-semibold text-yellow-900 mb-2">💡 Key Insight</h4>
                            <p className="text-sm text-gray-700">
                                Try setting disease prevalence to 0.1% (very rare). Even with 95% sensitivity,
                                a positive test might only mean ~1% actual probability! This counterintuitive
                                result shows why understanding Bayes' theorem is crucial in medicine and ML.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
