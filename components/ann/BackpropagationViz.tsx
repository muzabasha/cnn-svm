'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { BlockMath } from 'react-katex'

export function BackpropagationViz() {
    const [step, setStep] = useState(0)

    const steps = [
        { title: 'Forward Pass', desc: 'Compute predictions from input to output' },
        { title: 'Calculate Loss', desc: 'Measure error between prediction and target' },
        { title: 'Backward Pass', desc: 'Compute gradients using chain rule' },
        { title: 'Update Weights', desc: 'Adjust weights to minimize loss' }
    ]

    return (
        <div className="space-y-4 sm:space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Backpropagation: How Neural Networks Learn</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">
                        Backpropagation efficiently computes gradients by propagating errors backward through the network.
                    </p>

                    <div className="flex items-center justify-between mb-6">
                        <Button
                            onClick={() => setStep(Math.max(0, step - 1))}
                            disabled={step === 0}
                            className="flex items-center gap-2"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Previous
                        </Button>
                        <div className="text-center">
                            <p className="text-sm text-gray-600">Step {step + 1} of {steps.length}</p>
                            <p className="font-semibold text-lg">{steps[step].title}</p>
                        </div>
                        <Button
                            onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
                            disabled={step === steps.length - 1}
                            className="flex items-center gap-2"
                        >
                            Next
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </div>

                    <div className="p-6 bg-blue-50 rounded-lg">
                        <p className="text-sm font-semibold text-blue-900 mb-3">{steps[step].desc}</p>

                        {step === 0 && (
                            <div className="space-y-3">
                                <BlockMath math="a^{[l]} = g^{[l]}(z^{[l]})" />
                                <BlockMath math="z^{[l]} = W^{[l]}a^{[l-1]} + b^{[l]}" />
                                <p className="text-xs text-blue-700">Compute activations layer by layer</p>
                            </div>
                        )}

                        {step === 1 && (
                            <div className="space-y-3">
                                <BlockMath math="L = \frac{1}{m}\sum_{i=1}^{m}(y^{(i)} - \hat{y}^{(i)})^2" />
                                <p className="text-xs text-blue-700">Mean Squared Error (MSE) for regression</p>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-3">
                                <BlockMath math="\frac{\partial L}{\partial W^{[l]}} = \frac{\partial L}{\partial a^{[l]}} \cdot \frac{\partial a^{[l]}}{\partial z^{[l]}} \cdot \frac{\partial z^{[l]}}{\partial W^{[l]}}" />
                                <p className="text-xs text-blue-700">Chain rule to compute gradients</p>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-3">
                                <BlockMath math="W^{[l]} := W^{[l]} - \alpha \frac{\partial L}{\partial W^{[l]}}" />
                                <p className="text-xs text-blue-700">α = learning rate</p>
                            </div>
                        )}
                    </div>

                    <div className="mt-6 grid grid-cols-4 gap-2">
                        {steps.map((s, i) => (
                            <div
                                key={i}
                                className={`p-2 rounded text-center text-xs ${i === step ? 'bg-blue-600 text-white' :
                                        i < step ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                    }`}
                            >
                                {s.title}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
