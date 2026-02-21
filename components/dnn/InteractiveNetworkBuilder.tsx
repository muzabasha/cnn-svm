'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Plus, Trash2, Play, RotateCcw } from 'lucide-react'

interface Layer {
    id: number
    type: 'dense' | 'dropout' | 'batchnorm'
    neurons?: number
    activation?: string
    dropoutRate?: number
}

export function InteractiveNetworkBuilder() {
    const [layers, setLayers] = useState<Layer[]>([
        { id: 1, type: 'dense', neurons: 128, activation: 'relu' },
        { id: 2, type: 'dense', neurons: 64, activation: 'relu' },
        { id: 3, type: 'dense', neurons: 10, activation: 'softmax' }
    ])
    const [isTraining, setIsTraining] = useState(false)
    const [epoch, setEpoch] = useState(0)

    const addLayer = (type: 'dense' | 'dropout' | 'batchnorm') => {
        const newLayer: Layer = {
            id: Date.now(),
            type,
            ...(type === 'dense' && { neurons: 64, activation: 'relu' }),
            ...(type === 'dropout' && { dropoutRate: 0.5 })
        }
        setLayers([...layers.slice(0, -1), newLayer, layers[layers.length - 1]])
    }

    const removeLayer = (id: number) => {
        if (layers.length > 2) {
            setLayers(layers.filter(l => l.id !== id))
        }
    }

    const updateLayer = (id: number, updates: Partial<Layer>) => {
        setLayers(layers.map(l => l.id === id ? { ...l, ...updates } : l))
    }

    const trainNetwork = () => {
        setIsTraining(true)
        setEpoch(0)
        const interval = setInterval(() => {
            setEpoch(e => {
                if (e >= 50) {
                    setIsTraining(false)
                    clearInterval(interval)
                    return 50
                }
                return e + 1
            })
        }, 100)
    }

    const totalParams = layers.reduce((sum, layer, idx) => {
        if (layer.type === 'dense' && layer.neurons) {
            const prevNeurons = idx === 0 ? 784 :
                (layers[idx - 1].type === 'dense' ? layers[idx - 1].neurons || 0 :
                    layers.slice(0, idx).reverse().find(l => l.type === 'dense')?.neurons || 0)
            return sum + (prevNeurons * layer.neurons + layer.neurons)
        }
        return sum
    }, 0)

    return (
        <div className="space-y-4 sm:space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Interactive Network Builder</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">
                        Build your own deep neural network by adding, removing, and configuring layers.
                        Watch the network architecture update in real-time!
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Layer Configuration */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-sm sm:text-base">Network Layers</h3>
                                <div className="flex gap-2">
                                    <Button
                                        onClick={() => addLayer('dense')}
                                        className="flex items-center gap-1 text-xs sm:text-sm px-3 py-1.5"
                                    >
                                        <Plus className="w-3 h-3" />
                                        Dense
                                    </Button>
                                    <Button
                                        onClick={() => addLayer('dropout')}
                                        className="flex items-center gap-1 text-xs sm:text-sm px-3 py-1.5"
                                    >
                                        <Plus className="w-3 h-3" />
                                        Dropout
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-3 max-h-96 overflow-y-auto">
                                {/* Input Layer */}
                                <div className="p-3 bg-green-50 border-2 border-green-300 rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-semibold text-sm text-green-900">Input Layer</span>
                                        <span className="text-xs text-green-700">784 neurons (28×28)</span>
                                    </div>
                                </div>

                                {/* Hidden Layers */}
                                {layers.slice(0, -1).map((layer, idx) => (
                                    <div key={layer.id} className="p-3 bg-blue-50 border-2 border-blue-300 rounded-lg">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-semibold text-sm text-blue-900">
                                                {layer.type === 'dense' ? 'Dense Layer' :
                                                    layer.type === 'dropout' ? 'Dropout Layer' : 'BatchNorm Layer'}
                                            </span>
                                            <Button
                                                onClick={() => removeLayer(layer.id)}
                                                className="h-6 w-6 p-0"
                                            >
                                                <Trash2 className="w-3 h-3" />
                                            </Button>
                                        </div>

                                        {layer.type === 'dense' && (
                                            <>
                                                <Slider
                                                    label="Neurons"
                                                    value={layer.neurons || 64}
                                                    onChange={(v) => updateLayer(layer.id, { neurons: v })}
                                                    min={16}
                                                    max={512}
                                                    step={16}
                                                />
                                                <div className="mt-2">
                                                    <label className="text-xs font-medium text-gray-700">Activation:</label>
                                                    <div className="flex gap-2 mt-1">
                                                        {['relu', 'tanh', 'sigmoid'].map(act => (
                                                            <button
                                                                key={act}
                                                                onClick={() => updateLayer(layer.id, { activation: act })}
                                                                className={`px-2 py-1 text-xs rounded ${layer.activation === act
                                                                    ? 'bg-blue-600 text-white'
                                                                    : 'bg-gray-200 text-gray-700'
                                                                    }`}
                                                            >
                                                                {act}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        {layer.type === 'dropout' && (
                                            <Slider
                                                label="Dropout Rate"
                                                value={layer.dropoutRate || 0.5}
                                                onChange={(v) => updateLayer(layer.id, { dropoutRate: v })}
                                                min={0.1}
                                                max={0.9}
                                                step={0.1}
                                            />
                                        )}
                                    </div>
                                ))}

                                {/* Output Layer */}
                                {layers.length > 0 && (
                                    <div className="p-3 bg-purple-50 border-2 border-purple-300 rounded-lg">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-semibold text-sm text-purple-900">Output Layer</span>
                                            <span className="text-xs text-purple-700">{layers[layers.length - 1].neurons} classes</span>
                                        </div>
                                        <Slider
                                            label="Classes"
                                            value={layers[layers.length - 1].neurons || 10}
                                            onChange={(v) => updateLayer(layers[layers.length - 1].id, { neurons: v })}
                                            min={2}
                                            max={100}
                                            step={1}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Visual Network */}
                        <div>
                            <h3 className="font-semibold mb-4 text-sm sm:text-base">Network Visualization</h3>

                            <div className="bg-gray-50 rounded-lg p-4 min-h-96 flex flex-col justify-center items-center space-y-4">
                                {/* Input */}
                                <div className="flex flex-col items-center">
                                    <div className="text-xs font-semibold text-green-700 mb-2">Input (784)</div>
                                    <div className="flex gap-1">
                                        {Array.from({ length: 8 }).map((_, i) => (
                                            <div key={i} className="w-2 h-8 bg-green-500 rounded"></div>
                                        ))}
                                    </div>
                                </div>

                                {/* Hidden Layers */}
                                {layers.slice(0, -1).map((layer, idx) => (
                                    <div key={layer.id} className="flex flex-col items-center">
                                        <div className="text-xs font-semibold text-blue-700 mb-2">
                                            {layer.type === 'dense' ? `Dense (${layer.neurons})` :
                                                layer.type === 'dropout' ? `Dropout (${(layer.dropoutRate || 0.5) * 100}%)` :
                                                    'BatchNorm'}
                                        </div>
                                        {layer.type === 'dense' && (
                                            <div className="flex gap-1">
                                                {Array.from({ length: Math.min(12, Math.ceil((layer.neurons || 64) / 10)) }).map((_, i) => (
                                                    <div key={i} className="w-2 h-8 bg-blue-500 rounded"></div>
                                                ))}
                                            </div>
                                        )}
                                        {layer.type === 'dropout' && (
                                            <div className="text-xs text-gray-600">Regularization</div>
                                        )}
                                    </div>
                                ))}

                                {/* Output */}
                                <div className="flex flex-col items-center">
                                    <div className="text-xs font-semibold text-purple-700 mb-2">
                                        Output ({layers[layers.length - 1]?.neurons || 10})
                                    </div>
                                    <div className="flex gap-1">
                                        {Array.from({ length: Math.min(10, layers[layers.length - 1]?.neurons || 10) }).map((_, i) => (
                                            <div key={i} className="w-2 h-8 bg-purple-500 rounded"></div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 p-4 bg-emerald-50 rounded-lg">
                                <p className="text-sm font-semibold text-emerald-900 mb-2">Network Summary:</p>
                                <div className="text-xs text-emerald-700 space-y-1">
                                    <p>Total Layers: {layers.length + 1}</p>
                                    <p>Total Parameters: {totalParams.toLocaleString()}</p>
                                    <p>Trainable: Yes</p>
                                </div>
                            </div>

                            <div className="mt-4 flex gap-2">
                                <Button
                                    onClick={trainNetwork}
                                    disabled={isTraining}
                                    className="flex-1 flex items-center justify-center gap-2"
                                >
                                    <Play className="w-4 h-4" />
                                    {isTraining ? `Training... Epoch ${epoch}/50` : 'Train Network'}
                                </Button>
                                <Button
                                    onClick={() => setEpoch(0)}
                                    className="flex items-center gap-2"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                </Button>
                            </div>

                            {epoch > 0 && (
                                <div className="mt-4">
                                    <div className="flex justify-between text-xs mb-1">
                                        <span>Training Progress</span>
                                        <span>{epoch}/50 epochs</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div
                                            className="bg-emerald-600 h-3 rounded-full transition-all duration-300"
                                            style={{ width: `${(epoch / 50) * 100}%` }}
                                        />
                                    </div>
                                    <div className="mt-2 text-xs text-gray-600">
                                        <p>Loss: {(2 / (1 + epoch * 0.1)).toFixed(4)}</p>
                                        <p>Accuracy: {Math.min(95, 60 + epoch * 0.7).toFixed(2)}%</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Tips for Building DNNs</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <h4 className="font-semibold text-blue-900 mb-1 text-sm">Start Simple</h4>
                            <p className="text-xs text-blue-700">Begin with 2-3 layers, then add complexity</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                            <h4 className="font-semibold text-green-900 mb-1 text-sm">Use Dropout</h4>
                            <p className="text-xs text-green-700">Add dropout (0.2-0.5) to prevent overfitting</p>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-lg">
                            <h4 className="font-semibold text-purple-900 mb-1 text-sm">ReLU Activation</h4>
                            <p className="text-xs text-purple-700">Use ReLU for hidden layers, softmax for output</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
