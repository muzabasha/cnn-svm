'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'

export function NetworkArchitecture() {
    const [hiddenLayers, setHiddenLayers] = useState(2)
    const [neuronsPerLayer, setNeuronsPerLayer] = useState(4)

    return (
        <div className="space-y-4 sm:space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Design Your Neural Network</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">
                        Experiment with different network architectures by adjusting layers and neurons.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <Slider
                                label="Hidden Layers"
                                value={hiddenLayers}
                                onChange={setHiddenLayers}
                                min={1}
                                max={5}
                                step={1}
                                description="Number of hidden layers"
                            />
                            <Slider
                                label="Neurons per Layer"
                                value={neuronsPerLayer}
                                onChange={setNeuronsPerLayer}
                                min={2}
                                max={8}
                                step={1}
                                description="Neurons in each hidden layer"
                            />

                            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                                <p className="text-sm font-semibold text-blue-900 mb-2">Network Summary:</p>
                                <p className="text-xs text-blue-700">Input Layer: 3 neurons</p>
                                <p className="text-xs text-blue-700">Hidden Layers: {hiddenLayers} × {neuronsPerLayer} neurons</p>
                                <p className="text-xs text-blue-700">Output Layer: 1 neuron</p>
                                <p className="text-xs text-blue-700 mt-2 font-semibold">
                                    Total Parameters: {(3 * neuronsPerLayer + neuronsPerLayer) +
                                        (hiddenLayers - 1) * (neuronsPerLayer * neuronsPerLayer + neuronsPerLayer) +
                                        (neuronsPerLayer + 1)}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-center">
                            <div className="space-y-4">
                                {/* Input Layer */}
                                <div className="flex items-center gap-4">
                                    <div className="text-xs font-semibold w-16">Input</div>
                                    <div className="flex flex-col gap-2">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="w-8 h-8 rounded-full bg-green-500 border-2 border-green-700"></div>
                                        ))}
                                    </div>
                                </div>

                                {/* Hidden Layers */}
                                {Array.from({ length: hiddenLayers }).map((_, layerIdx) => (
                                    <div key={layerIdx} className="flex items-center gap-4">
                                        <div className="text-xs font-semibold w-16">Hidden {layerIdx + 1}</div>
                                        <div className="flex flex-col gap-2">
                                            {Array.from({ length: neuronsPerLayer }).map((_, neuronIdx) => (
                                                <div key={neuronIdx} className="w-8 h-8 rounded-full bg-blue-500 border-2 border-blue-700"></div>
                                            ))}
                                        </div>
                                    </div>
                                ))}

                                {/* Output Layer */}
                                <div className="flex items-center gap-4">
                                    <div className="text-xs font-semibold w-16">Output</div>
                                    <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-purple-700"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
