'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Play, RotateCcw } from 'lucide-react'

export function LayerVisualization() {
    const [step, setStep] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)

    const layers = [
        { name: 'Input', neurons: 784, color: 'green' },
        { name: 'Dense 1', neurons: 128, color: 'blue' },
        { name: 'Dense 2', neurons: 64, color: 'blue' },
        { name: 'Output', neurons: 10, color: 'purple' }
    ]

    const startAnimation = () => {
        setIsAnimating(true)
        setStep(0)
        const interval = setInterval(() => {
            setStep(s => {
                if (s >= layers.length - 1) {
                    setIsAnimating(false)
                    clearInterval(interval)
                    return layers.length - 1
                }
                return s + 1
            })
        }, 1500)
    }

    const reset = () => {
        setStep(0)
        setIsAnimating(false)
    }

    return (
        <div className="space-y-4 sm:space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Layer-by-Layer Data Flow</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm sm:text-base text-gray-600 mb-6">
                        Watch how data flows through each layer of a deep neural network. Each layer transforms
                        the input data, extracting increasingly complex features.
                    </p>

                    <div className="bg-gray-50 rounded-lg p-6 mb-6">
                        <div className="flex flex-col items-center space-y-8">
                            {layers.map((layer, idx) => (
                                <div key={idx} className="w-full">
                                    <div className="flex flex-col items-center">
                                        {/* Layer visualization */}
                                        <div className={`w-full max-w-md p-4 rounded-lg border-2 transition-all duration-500 ${step >= idx
                                            ? `bg-${layer.color}-100 border-${layer.color}-500 shadow-lg scale-105`
                                            : 'bg-white border-gray-300'
                                            }`}>
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="font-semibold text-sm">{layer.name}</span>
                                                <span className="text-xs text-gray-600">{layer.neurons} neurons</span>
                                            </div>

                                            {/* Neuron representation */}
                                            <div className="flex flex-wrap gap-1 justify-center">
                                                {Array.from({ length: Math.min(20, layer.neurons) }).map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${step >= idx
                                                            ? `bg-${layer.color}-500 animate-pulse`
                                                            : 'bg-gray-300'
                                                            }`}
                                                    />
                                                ))}
                                                {layer.neurons > 20 && (
                                                    <span className="text-xs text-gray-500 ml-2">
                                                        +{layer.neurons - 20} more
                                                    </span>
                                                )}
                                            </div>

                                            {/* Activation info */}
                                            {step >= idx && idx > 0 && idx < layers.length - 1 && (
                                                <div className="mt-3 text-xs text-center text-gray-700">
                                                    Activation: ReLU | Output shape: ({layer.neurons},)
                                                </div>
                                            )}
                                            {step >= idx && idx === layers.length - 1 && (
                                                <div className="mt-3 text-xs text-center text-gray-700">
                                                    Activation: Softmax | Probabilities: [0.1, 0.05, ..., 0.85]
                                                </div>
                                            )}
                                        </div>

                                        {/* Arrow between layers */}
                                        {idx < layers.length - 1 && (
                                            <div className="my-4">
                                                <div className={`w-1 h-12 mx-auto transition-all duration-500 ${step > idx
                                                    ? 'bg-emerald-500'
                                                    : 'bg-gray-300'
                                                    }`} />
                                                {step > idx && (
                                                    <div className="text-xs text-center text-emerald-600 font-semibold mt-1">
                                                        Transform
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-3 justify-center">
                        <Button
                            onClick={startAnimation}
                            disabled={isAnimating}
                            className="flex items-center gap-2"
                        >
                            <Play className="w-4 h-4" />
                            {isAnimating ? 'Animating...' : 'Start Animation'}
                        </Button>
                        <Button onClick={reset} className="flex items-center gap-2">
                            <RotateCcw className="w-4 h-4" />
                            Reset
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Understanding Layer Transformations</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <h4 className="font-semibold text-blue-900 mb-2 text-sm">Dense Layer</h4>
                            <p className="text-xs text-blue-700 mb-2">
                                Each neuron connects to all neurons in the previous layer
                            </p>
                            <code className="text-xs bg-blue-100 p-2 rounded block">
                                output = activation(W × input + b)
                            </code>
                        </div>

                        <div className="p-4 bg-green-50 rounded-lg">
                            <h4 className="font-semibold text-green-900 mb-2 text-sm">Feature Extraction</h4>
                            <p className="text-xs text-green-700">
                                Early layers learn simple features (edges, colors), deeper layers learn complex patterns
                            </p>
                        </div>

                        <div className="p-4 bg-purple-50 rounded-lg">
                            <h4 className="font-semibold text-purple-900 mb-2 text-sm">Dimensionality</h4>
                            <p className="text-xs text-purple-700">
                                Layers can expand or compress data dimensions based on neuron count
                            </p>
                        </div>

                        <div className="p-4 bg-orange-50 rounded-lg">
                            <h4 className="font-semibold text-orange-900 mb-2 text-sm">Non-linearity</h4>
                            <p className="text-xs text-orange-700">
                                Activation functions add non-linearity, enabling complex pattern learning
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
