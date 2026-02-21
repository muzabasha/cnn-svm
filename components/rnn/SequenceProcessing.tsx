'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { BlockMath } from 'react-katex'

export function SequenceProcessing() {
    const [currentStep, setCurrentStep] = useState(0)
    const sequence = ['Hello', 'how', 'are', 'you']

    return (
        <div className="space-y-4 sm:space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">RNN Sequence Processing</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">
                        RNNs process sequences one element at a time, maintaining a hidden state that captures information from previous steps.
                    </p>

                    <div className="bg-purple-50 p-4 rounded-lg mb-6 overflow-x-auto">
                        <p className="text-sm font-semibold text-purple-900 mb-2">RNN Formula:</p>
                        <BlockMath math="h_t = \tanh(W_{hh}h_{t-1} + W_{xh}x_t + b_h)" />
                        <BlockMath math="y_t = W_{hy}h_t + b_y" />
                        <p className="text-xs text-purple-700 mt-2">h = hidden state, x = input, y = output</p>
                    </div>

                    <div className="flex items-center justify-between mb-6">
                        <Button
                            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                            disabled={currentStep === 0}
                        >
                            Previous
                        </Button>
                        <div className="text-center">
                            <p className="text-sm text-gray-600">Time Step {currentStep + 1} of {sequence.length}</p>
                            <p className="font-semibold text-lg">Processing: "{sequence[currentStep]}"</p>
                        </div>
                        <Button
                            onClick={() => setCurrentStep(Math.min(sequence.length - 1, currentStep + 1))}
                            disabled={currentStep === sequence.length - 1}
                        >
                            Next
                        </Button>
                    </div>

                    <div className="flex items-center justify-center gap-4 overflow-x-auto pb-4">
                        {sequence.map((word, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                                <div className={`p-4 rounded-lg border-2 ${idx === currentStep ? 'bg-purple-100 border-purple-500' :
                                        idx < currentStep ? 'bg-green-100 border-green-500' :
                                            'bg-gray-100 border-gray-300'
                                    }`}>
                                    <p className="text-sm font-semibold">{word}</p>
                                    <p className="text-xs text-gray-600">t = {idx + 1}</p>
                                </div>
                                {idx < sequence.length - 1 && <ArrowRight className="w-5 h-5 text-gray-400" />}
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm font-semibold text-purple-900 mb-2">Hidden State Evolution:</p>
                        <p className="text-xs text-purple-700">
                            The hidden state h<sub>{currentStep + 1}</sub> contains information from all previous words:
                            {sequence.slice(0, currentStep + 1).join(', ')}
                        </p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">RNN Applications</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <h4 className="font-semibold text-blue-900 mb-1 text-sm">Language Modeling</h4>
                            <p className="text-xs text-blue-700">Predict next word</p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg">
                            <h4 className="font-semibold text-green-900 mb-1 text-sm">Sentiment Analysis</h4>
                            <p className="text-xs text-green-700">Classify text emotion</p>
                        </div>
                        <div className="p-4 bg-purple-50 rounded-lg">
                            <h4 className="font-semibold text-purple-900 mb-1 text-sm">Machine Translation</h4>
                            <p className="text-xs text-purple-700">Translate languages</p>
                        </div>
                        <div className="p-4 bg-pink-50 rounded-lg">
                            <h4 className="font-semibold text-pink-900 mb-1 text-sm">Speech Recognition</h4>
                            <p className="text-xs text-pink-700">Audio to text</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
