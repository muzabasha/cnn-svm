'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ChallengeCard, Challenge } from '@/components/interactive/ChallengeCard'
import { Info, Target, Zap, Brain, Plus, Minus } from 'lucide-react'
import { InlineMath, BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'

interface Layer {
    neurons: number
    activation: 'relu' | 'sigmoid' | 'tanh'
}

export function EnhancedNetworkBuilder() {
    const [layers, setLayers] = useState<Layer[]>([
        { neurons: 4, activation: 'relu' },
        { neurons: 3, activation: 'sigmoid' }
    ])
    const [inputSize, setInputSize] = useState(2)
    const [learningRate, setLearningRate] = useState(0.01)
    const [isTraining, setIsTraining] = useState(false)
    const [epoch, setEpoch] = useState(0)
    const [loss, setLoss] = useState(1.0)
    const [completedChallenges, setCompletedChallenges] = useState<string[]>([])

    const addLayer = () => {
        if (layers.length < 5) {
            setLayers([...layers, { neurons: 3, activation: 'relu' }])
        }
    }

    const removeLayer = (index: number) => {
        if (layers.length > 1) {
            setLayers(layers.filter((_, i) => i !== index))
        }
    }

    const updateLayer = (index: number, field: keyof Layer, value: any) => {
        const newLayers = [...layers]
        newLayers[index] = { ...newLayers[index], [field]: value }
        setLayers(newLayers)
    }

    const simulateTraining = () => {
        setIsTraining(true)
        setEpoch(0)
        setLoss(1.0)

        const interval = setInterval(() => {
            setEpoch(e => {
                const newEpoch = e + 1
                if (newEpoch >= 100) {
                    clearInterval(interval)
                    setIsTraining(false)
                }
                return newEpoch
            })
            setLoss(l => Math.max(0.01, l * 0.95 + (Math.random() - 0.5) * 0.05))
        }, 50)
    }

    const getTotalParameters = () => {
        let total = 0
        let prevSize = inputSize

        layers.forEach(layer => {
            total += prevSize * layer.neurons + layer.neurons // weights + biases
            prevSize = layer.neurons
        })

        return total
    }

    const challenges: Challenge[] = [
        {
            id: 'first-network',
            title: 'Build Your First Network',
            description: 'Create a simple neural network with at least 2 hidden layers and train it.',
            difficulty: 'easy',
            hints: [
                'Use the default configuration',
                'Click "Train Network" to start',
                'Watch the loss decrease over epochs'
            ],
            successCriteria: 'Train a network with 2+ layers',
            points: 10
        },
        {
            id: 'deep-network',
            title: 'Go Deeper',
            description: 'Create a deep network with at least 4 layers and observe how depth affects learning.',
            difficulty: 'medium',
            hints: [
                'Click "Add Layer" to increase depth',
                'Try different numbers of neurons per layer',
                'Deeper networks can learn more complex patterns'
            ],
            successCriteria: 'Create and train a network with 4+ layers',
            points: 20
        },
        {
            id: 'activation-experiment',
            title: 'Activation Function Experiment',
            description: 'Build a network using different activation functions in different layers.',
            difficulty: 'hard',
            hints: [
                'Try ReLU in hidden layers',
                'Use sigmoid in the output layer',
                'Experiment with tanh as well'
            ],
            successCriteria: 'Use at least 2 different activation functions',
            points: 30
        }
    ]

    const checkChallengeSuccess = (challengeId: string) => {
        switch (challengeId) {
            case 'first-network':
                return layers.length >= 2 && epoch >= 100
            case 'deep-network':
                return layers.length >= 4 && epoch >= 100
            case 'activation-experiment':
                const uniqueActivations = new Set(layers.map(l => l.activation))
                return uniqueActivations.size >= 2 && epoch >= 100
            default:
                return false
        }
    }

    const handleChallengeComplete = (challengeId: string) => {
        if (!completedChallenges.includes(challengeId)) {
            setCompletedChallenges([...completedChallenges, challengeId])
        }
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Zap className="w-6 h-6 text-yellow-500" />
                        Interactive Network Builder - Learn by Doing!
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="explore" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="explore">🔍 Explore</TabsTrigger>
                            <TabsTrigger value="learn">📚 Learn</TabsTrigger>
                            <TabsTrigger value="challenge">🏆 Challenges</TabsTrigger>
                        </TabsList>

                        <TabsContent value="explore" className="space-y-4">
                            <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                <div className="text-sm text-blue-800">
                                    <p className="font-semibold mb-1">Free Exploration Mode</p>
                                    <p>Design your own neural network architecture! Add layers, adjust neurons, and watch it train.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="lg:col-span-2 space-y-4">
                                    <div className="p-6 bg-white rounded-lg border-2 border-gray-200">
                                        <h3 className="font-semibold mb-4 flex items-center gap-2">
                                            <Brain className="w-5 h-5 text-blue-600" />
                                            Network Architecture
                                        </h3>

                                        <div className="space-y-4">
                                            {/* Input Layer */}
                                            <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg border-2 border-green-200">
                                                <div className="flex-1">
                                                    <p className="text-sm font-semibold text-green-900">Input Layer</p>
                                                    <p className="text-xs text-green-700">{inputSize} features</p>
                                                </div>
                                                <div className="flex gap-2">
                                                    {Array.from({ length: Math.min(inputSize, 4) }).map((_, i) => (
                                                        <div key={i} className="w-8 h-8 rounded-full bg-green-500 border-2 border-green-700" />
                                                    ))}
                                                    {inputSize > 4 && <span className="text-green-700">...</span>}
                                                </div>
                                            </div>

                                            {/* Hidden Layers */}
                                            {layers.map((layer, idx) => (
                                                <div key={idx} className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                                                    <div className="flex-1 space-y-2">
                                                        <div className="flex items-center justify-between">
                                                            <p className="text-sm font-semibold text-blue-900">
                                                                {idx === layers.length - 1 ? 'Output Layer' : `Hidden Layer ${idx + 1}`}
                                                            </p>
                                                            {layers.length > 1 && (
                                                                <button
                                                                    onClick={() => removeLayer(idx)}
                                                                    className="text-red-600 hover:text-red-800"
                                                                >
                                                                    <Minus className="w-4 h-4" />
                                                                </button>
                                                            )}
                                                        </div>
                                                        <div className="flex gap-4">
                                                            <div className="flex-1">
                                                                <label className="text-xs text-blue-700">Neurons</label>
                                                                <input
                                                                    type="number"
                                                                    value={layer.neurons}
                                                                    onChange={(e) => updateLayer(idx, 'neurons', parseInt(e.target.value) || 1)}
                                                                    min={1}
                                                                    max={10}
                                                                    className="w-full p-1 border border-blue-300 rounded text-sm"
                                                                />
                                                            </div>
                                                            <div className="flex-1">
                                                                <label className="text-xs text-blue-700">Activation</label>
                                                                <select
                                                                    value={layer.activation}
                                                                    onChange={(e) => updateLayer(idx, 'activation', e.target.value)}
                                                                    className="w-full p-1 border border-blue-300 rounded text-sm"
                                                                >
                                                                    <option value="relu">ReLU</option>
                                                                    <option value="sigmoid">Sigmoid</option>
                                                                    <option value="tanh">Tanh</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        {Array.from({ length: Math.min(layer.neurons, 4) }).map((_, i) => (
                                                            <div key={i} className="w-8 h-8 rounded-full bg-blue-500 border-2 border-blue-700" />
                                                        ))}
                                                        {layer.neurons > 4 && <span className="text-blue-700">...</span>}
                                                    </div>
                                                </div>
                                            ))}

                                            {layers.length < 5 && (
                                                <button
                                                    onClick={addLayer}
                                                    className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all flex items-center justify-center gap-2 text-gray-600 hover:text-blue-600"
                                                >
                                                    <Plus className="w-5 h-5" />
                                                    Add Hidden Layer
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {epoch > 0 && (
                                        <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                                            <h4 className="font-semibold mb-3">Training Progress</h4>
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <span>Epoch: {epoch}/100</span>
                                                    <span>Loss: {loss.toFixed(4)}</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-3">
                                                    <div
                                                        className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all"
                                                        style={{ width: `${epoch}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    <div className="p-4 bg-white rounded-lg border border-gray-200">
                                        <h4 className="font-semibold mb-3">Training Settings</h4>
                                        <div className="space-y-4">
                                            <Slider
                                                label="Input Features"
                                                value={inputSize}
                                                onChange={setInputSize}
                                                min={1}
                                                max={10}
                                                step={1}
                                            />
                                            <Slider
                                                label="Learning Rate"
                                                value={learningRate}
                                                onChange={setLearningRate}
                                                min={0.001}
                                                max={0.1}
                                                step={0.001}
                                            />
                                            <Button
                                                onClick={simulateTraining}
                                                disabled={isTraining}
                                                className="w-full"
                                            >
                                                {isTraining ? 'Training...' : 'Train Network'}
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                                        <p className="text-sm font-semibold text-purple-900 mb-2">Network Stats</p>
                                        <div className="space-y-1 text-xs text-purple-800">
                                            <p>Total layers: {layers.length + 1}</p>
                                            <p>Hidden layers: {layers.length - 1}</p>
                                            <p>Total parameters: {getTotalParameters()}</p>
                                            <p>Depth: {layers.length}</p>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                                        <p className="text-sm font-semibold text-yellow-900 mb-2">💡 Tips</p>
                                        <ul className="text-xs text-yellow-800 space-y-1 list-disc list-inside">
                                            <li>More layers = deeper network</li>
                                            <li>More neurons = more capacity</li>
                                            <li>ReLU is popular for hidden layers</li>
                                            <li>Sigmoid/Tanh for output layer</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="learn" className="space-y-4">
                            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                                <h3 className="text-lg font-semibold mb-3">How Neural Networks Work</h3>

                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm font-semibold mb-2">1. Forward Propagation</p>
                                        <p className="text-sm text-gray-700 mb-2">
                                            Each neuron computes a weighted sum and applies an activation function:
                                        </p>
                                        <div className="overflow-x-auto bg-white p-3 rounded">
                                            <BlockMath math="z = \sum_{i=1}^{n} w_i x_i + b" />
                                            <BlockMath math="a = f(z)" />
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold mb-2">2. Activation Functions</p>
                                        <div className="space-y-2">
                                            <div className="overflow-x-auto bg-white p-3 rounded">
                                                <p className="text-xs font-semibold mb-1">ReLU:</p>
                                                <BlockMath math="f(x) = \max(0, x)" />
                                            </div>
                                            <div className="overflow-x-auto bg-white p-3 rounded">
                                                <p className="text-xs font-semibold mb-1">Sigmoid:</p>
                                                <BlockMath math="f(x) = \frac{1}{1 + e^{-x}}" />
                                            </div>
                                            <div className="overflow-x-auto bg-white p-3 rounded">
                                                <p className="text-xs font-semibold mb-1">Tanh:</p>
                                                <BlockMath math="f(x) = \frac{e^x - e^{-x}}{e^x + e^{-x}}" />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold mb-2">3. Backpropagation</p>
                                        <p className="text-sm text-gray-700 mb-2">
                                            Update weights using gradient descent:
                                        </p>
                                        <div className="overflow-x-auto bg-white p-3 rounded">
                                            <BlockMath math="w_{new} = w_{old} - \eta \frac{\partial L}{\partial w}" />
                                        </div>
                                        <p className="text-xs text-gray-600 mt-2">
                                            Where <InlineMath math="\eta" /> is the learning rate
                                        </p>
                                    </div>

                                    <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                                        <p className="text-sm font-semibold text-yellow-900 mb-1">💡 Key Insight</p>
                                        <p className="text-sm text-yellow-800">
                                            Deep networks can learn hierarchical representations: early layers learn simple features, deeper layers learn complex patterns!
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                    <p className="text-sm font-semibold text-green-900 mb-2">✅ Advantages</p>
                                    <ul className="text-sm text-green-800 space-y-1 list-disc list-inside">
                                        <li>Learn complex patterns</li>
                                        <li>Automatic feature extraction</li>
                                        <li>Flexible architecture</li>
                                        <li>Works with various data types</li>
                                    </ul>
                                </div>
                                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                                    <p className="text-sm font-semibold text-red-900 mb-2">⚠️ Limitations</p>
                                    <ul className="text-sm text-red-800 space-y-1 list-disc list-inside">
                                        <li>Requires large datasets</li>
                                        <li>Computationally expensive</li>
                                        <li>Black box nature</li>
                                        <li>Prone to overfitting</li>
                                    </ul>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="challenge" className="space-y-4">
                            <div className="flex items-start gap-2 p-3 bg-purple-50 rounded-lg border border-purple-200">
                                <Target className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                                <div className="text-sm text-purple-800">
                                    <p className="font-semibold mb-1">Challenge Mode</p>
                                    <p>Complete these challenges to master neural network architecture design!</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {challenges.map(challenge => (
                                    <ChallengeCard
                                        key={challenge.id}
                                        challenge={challenge}
                                        onComplete={handleChallengeComplete}
                                        checkSuccess={() => checkChallengeSuccess(challenge.id)}
                                        isCompleted={completedChallenges.includes(challenge.id)}
                                    />
                                ))}
                            </div>

                            {completedChallenges.length === challenges.length && (
                                <div className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border-2 border-yellow-400">
                                    <div className="text-center">
                                        <p className="text-2xl mb-2">🎉 Congratulations!</p>
                                        <p className="text-lg font-semibold text-gray-800 mb-2">
                                            You've completed all ANN challenges!
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Total points earned: {challenges.reduce((sum, c) => sum + c.points, 0)}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}
