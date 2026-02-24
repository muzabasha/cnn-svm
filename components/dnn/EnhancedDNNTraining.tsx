'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft, Settings } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'

interface TrainingData {
    epoch: number
    trainLoss: number
    valLoss: number
    trainAcc: number
    valAcc: number
}

interface LayerWeights {
    layer: string
    avgWeight: number
    avgGradient: number
}

export function EnhancedDNNTraining() {
    // Hyperparameters
    const [learningRate, setLearningRate] = useState(0.01)
    const [batchSize, setBatchSize] = useState(32)
    const [epochs, setEpochs] = useState(50)
    const [hiddenLayers, setHiddenLayers] = useState(2)
    const [neuronsPerLayer, setNeuronsPerLayer] = useState(64)
    const [dropout, setDropout] = useState(0.2)

    // Training state
    const [currentEpoch, setCurrentEpoch] = useState(0)
    const [isTraining, setIsTraining] = useState(false)
    const [trainingSpeed, setTrainingSpeed] = useState(500)
    const [trainingData, setTrainingData] = useState<TrainingData[]>([])
    const [layerWeights, setLayerWeights] = useState<LayerWeights[]>([])
    const [showSettings, setShowSettings] = useState(true)
    const [showGraphs, setShowGraphs] = useState(true)
    const [showTable, setShowTable] = useState(true)

    // Generate synthetic training data based on hyperparameters
    const generateTrainingData = () => {
        const data: TrainingData[] = []
        const baseTrainLoss = 2.5
        const baseValLoss = 2.7

        // Learning rate affects convergence speed
        const convergenceRate = learningRate * 10

        // Dropout affects overfitting
        const overfitFactor = 1 - dropout

        for (let i = 0; i <= epochs; i++) {
            const progress = i / epochs

            // Training loss decreases faster with higher learning rate
            const trainLoss = baseTrainLoss * Math.exp(-convergenceRate * progress) +
                0.1 * Math.random()

            // Validation loss with potential overfitting
            const valLoss = baseValLoss * Math.exp(-convergenceRate * progress * 0.8) +
                overfitFactor * 0.3 * progress +
                0.15 * Math.random()

            // Accuracy increases inversely to loss
            const trainAcc = Math.min(98, (1 - trainLoss / baseTrainLoss) * 100)
            const valAcc = Math.min(95, (1 - valLoss / baseValLoss) * 100)

            data.push({
                epoch: i,
                trainLoss: Number(trainLoss.toFixed(3)),
                valLoss: Number(valLoss.toFixed(3)),
                trainAcc: Number(trainAcc.toFixed(2)),
                valAcc: Number(valAcc.toFixed(2))
            })
        }

        return data
    }

    // Generate layer weights data
    const generateLayerWeights = (epoch: number) => {
        const layers: LayerWeights[] = []
        const progress = epoch / epochs

        layers.push({
            layer: 'Input Layer',
            avgWeight: Number((0.5 + 0.3 * Math.random()).toFixed(3)),
            avgGradient: Number((learningRate * (1 - progress) * 0.1).toFixed(4))
        })

        for (let i = 1; i <= hiddenLayers; i++) {
            layers.push({
                layer: `Hidden ${i}`,
                avgWeight: Number((0.3 + 0.4 * Math.random()).toFixed(3)),
                avgGradient: Number((learningRate * (1 - progress) * 0.05).toFixed(4))
            })
        }

        layers.push({
            layer: 'Output Layer',
            avgWeight: Number((0.4 + 0.3 * Math.random()).toFixed(3)),
            avgGradient: Number((learningRate * (1 - progress) * 0.02).toFixed(4))
        })

        return layers
    }

    // Initialize training data when hyperparameters change
    useEffect(() => {
        const data = generateTrainingData()
        setTrainingData(data)
        setCurrentEpoch(0)
        setLayerWeights(generateLayerWeights(0))
    }, [learningRate, batchSize, epochs, hiddenLayers, neuronsPerLayer, dropout])

    // Auto-play training
    useEffect(() => {
        if (!isTraining) return

        const interval = setInterval(() => {
            setCurrentEpoch(prev => {
                if (prev >= epochs) {
                    setIsTraining(false)
                    return prev
                }
                const nextEpoch = prev + 1
                setLayerWeights(generateLayerWeights(nextEpoch))
                return nextEpoch
            })
        }, trainingSpeed)

        return () => clearInterval(interval)
    }, [isTraining, trainingSpeed, epochs])

    const handlePlayPause = () => {
        if (currentEpoch >= epochs) {
            setCurrentEpoch(0)
        }
        setIsTraining(!isTraining)
    }

    const handleNext = () => {
        if (currentEpoch < epochs) {
            const nextEpoch = currentEpoch + 1
            setCurrentEpoch(nextEpoch)
            setLayerWeights(generateLayerWeights(nextEpoch))
        }
    }

    const handlePrevious = () => {
        if (currentEpoch > 0) {
            const prevEpoch = currentEpoch - 1
            setCurrentEpoch(prevEpoch)
            setLayerWeights(generateLayerWeights(prevEpoch))
        }
    }

    const handleReset = () => {
        setCurrentEpoch(0)
        setIsTraining(false)
        setLayerWeights(generateLayerWeights(0))
    }

    const currentData = trainingData[currentEpoch] || { trainLoss: 0, valLoss: 0, trainAcc: 0, valAcc: 0, epoch: 0 }
    const visibleData = trainingData.slice(0, currentEpoch + 1)

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>🧠 Enhanced DNN Training - Interactive Deep Learning</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 mb-6">
                        Train a deep neural network with full control over hyperparameters and watch the training process in real-time.
                    </p>

                    {/* Hyperparameter Controls */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-lg">⚙️ Hyperparameters</h3>
                            <button
                                onClick={() => setShowSettings(!showSettings)}
                                className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded flex items-center gap-2"
                            >
                                <Settings className="w-4 h-4" />
                                {showSettings ? 'Hide' : 'Show'}
                            </button>
                        </div>

                        {showSettings && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl">
                                <div>
                                    <label className="text-sm font-medium block mb-2">
                                        Learning Rate: {learningRate}
                                    </label>
                                    <input
                                        type="range"
                                        min="0.001"
                                        max="0.1"
                                        step="0.001"
                                        value={learningRate}
                                        onChange={(e) => setLearningRate(Number(e.target.value))}
                                        disabled={isTraining}
                                        className="w-full"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Controls convergence speed</p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium block mb-2">
                                        Batch Size: {batchSize}
                                    </label>
                                    <select
                                        value={batchSize}
                                        onChange={(e) => setBatchSize(Number(e.target.value))}
                                        disabled={isTraining}
                                        className="w-full border rounded px-3 py-2"
                                    >
                                        <option value={16}>16</option>
                                        <option value={32}>32</option>
                                        <option value={64}>64</option>
                                        <option value={128}>128</option>
                                    </select>
                                    <p className="text-xs text-gray-500 mt-1">Samples per update</p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium block mb-2">
                                        Epochs: {epochs}
                                    </label>
                                    <input
                                        type="range"
                                        min="10"
                                        max="100"
                                        step="10"
                                        value={epochs}
                                        onChange={(e) => setEpochs(Number(e.target.value))}
                                        disabled={isTraining}
                                        className="w-full"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Training iterations</p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium block mb-2">
                                        Hidden Layers: {hiddenLayers}
                                    </label>
                                    <input
                                        type="range"
                                        min="1"
                                        max="5"
                                        step="1"
                                        value={hiddenLayers}
                                        onChange={(e) => setHiddenLayers(Number(e.target.value))}
                                        disabled={isTraining}
                                        className="w-full"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Network depth</p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium block mb-2">
                                        Neurons per Layer: {neuronsPerLayer}
                                    </label>
                                    <select
                                        value={neuronsPerLayer}
                                        onChange={(e) => setNeuronsPerLayer(Number(e.target.value))}
                                        disabled={isTraining}
                                        className="w-full border rounded px-3 py-2"
                                    >
                                        <option value={32}>32</option>
                                        <option value={64}>64</option>
                                        <option value={128}>128</option>
                                        <option value={256}>256</option>
                                    </select>
                                    <p className="text-xs text-gray-500 mt-1">Network width</p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium block mb-2">
                                        Dropout: {dropout}
                                    </label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="0.5"
                                        step="0.1"
                                        value={dropout}
                                        onChange={(e) => setDropout(Number(e.target.value))}
                                        disabled={isTraining}
                                        className="w-full"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Prevents overfitting</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Training Controls */}
                    <div className="mb-6 bg-gray-50 rounded-xl p-4">
                        <h3 className="font-semibold text-lg mb-4">🎮 Training Controls</h3>
                        <div className="flex flex-wrap gap-3 items-center">
                            <Button onClick={handlePlayPause} className="flex items-center gap-2">
                                {isTraining ? <><Pause className="w-4 h-4" />Pause</> : <><Play className="w-4 h-4" />Train</>}
                            </Button>
                            <Button onClick={handlePrevious} disabled={currentEpoch === 0 || isTraining} variant="outline">
                                <ChevronLeft className="w-4 h-4" />Previous
                            </Button>
                            <Button onClick={handleNext} disabled={currentEpoch >= epochs || isTraining} variant="outline">
                                Next<ChevronRight className="w-4 h-4" />
                            </Button>
                            <Button onClick={handleReset} variant="outline"><RotateCcw className="w-4 h-4" />Reset</Button>

                            <div className="flex items-center gap-2 ml-auto">
                                <label className="text-sm font-medium">Speed:</label>
                                <select
                                    value={trainingSpeed}
                                    onChange={(e) => setTrainingSpeed(Number(e.target.value))}
                                    className="border rounded px-3 py-1 text-sm"
                                    disabled={isTraining}
                                >
                                    <option value={1000}>Slow (1s)</option>
                                    <option value={500}>Medium (0.5s)</option>
                                    <option value={200}>Fast (0.2s)</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-4">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="font-medium">Epoch {currentEpoch} / {epochs}</span>
                                <span className="text-gray-600">{((currentEpoch / epochs) * 100).toFixed(1)}% Complete</span>
                            </div>
                            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                                    style={{ width: `${(currentEpoch / epochs) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    {/* Current Metrics */}
                    <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                            <p className="text-xs text-gray-600 mb-1">Train Loss</p>
                            <p className="text-2xl font-bold text-blue-700">{currentData.trainLoss}</p>
                        </div>
                        <div className="p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                            <p className="text-xs text-gray-600 mb-1">Val Loss</p>
                            <p className="text-2xl font-bold text-purple-700">{currentData.valLoss}</p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
                            <p className="text-xs text-gray-600 mb-1">Train Accuracy</p>
                            <p className="text-2xl font-bold text-green-700">{currentData.trainAcc}%</p>
                        </div>
                        <div className="p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
                            <p className="text-xs text-gray-600 mb-1">Val Accuracy</p>
                            <p className="text-2xl font-bold text-orange-700">{currentData.valAcc}%</p>
                        </div>
                    </div>

                    {/* Graphs */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-lg">📊 Training Metrics</h3>
                            <button
                                onClick={() => setShowGraphs(!showGraphs)}
                                className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded"
                            >
                                {showGraphs ? 'Hide Graphs' : 'Show Graphs'}
                            </button>
                        </div>

                        {showGraphs && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="bg-white p-4 rounded-lg border">
                                    <h4 className="font-semibold mb-3 text-center">Loss Over Epochs</h4>
                                    <ResponsiveContainer width="100%" height={250}>
                                        <LineChart data={visibleData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="epoch" label={{ value: 'Epoch', position: 'insideBottom', offset: -5 }} />
                                            <YAxis label={{ value: 'Loss', angle: -90, position: 'insideLeft' }} />
                                            <Tooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey="trainLoss" stroke="#3b82f6" name="Train Loss" strokeWidth={2} />
                                            <Line type="monotone" dataKey="valLoss" stroke="#a855f7" name="Val Loss" strokeWidth={2} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className="bg-white p-4 rounded-lg border">
                                    <h4 className="font-semibold mb-3 text-center">Accuracy Over Epochs</h4>
                                    <ResponsiveContainer width="100%" height={250}>
                                        <LineChart data={visibleData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="epoch" label={{ value: 'Epoch', position: 'insideBottom', offset: -5 }} />
                                            <YAxis label={{ value: 'Accuracy (%)', angle: -90, position: 'insideLeft' }} />
                                            <Tooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey="trainAcc" stroke="#22c55e" name="Train Acc" strokeWidth={2} />
                                            <Line type="monotone" dataKey="valAcc" stroke="#f97316" name="Val Acc" strokeWidth={2} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className="bg-white p-4 rounded-lg border lg:col-span-2">
                                    <h4 className="font-semibold mb-3 text-center">Layer Weights & Gradients (Epoch {currentEpoch})</h4>
                                    <ResponsiveContainer width="100%" height={250}>
                                        <BarChart data={layerWeights}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="layer" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="avgWeight" fill="#3b82f6" name="Avg Weight" />
                                            <Bar dataKey="avgGradient" fill="#f97316" name="Avg Gradient" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Data Table */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-lg">📋 Training History</h3>
                            <button
                                onClick={() => setShowTable(!showTable)}
                                className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded"
                            >
                                {showTable ? 'Hide Table' : 'Show Table'}
                            </button>
                        </div>

                        {showTable && (
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="border px-4 py-3 text-left text-sm font-semibold">Epoch</th>
                                            <th className="border px-4 py-3 text-left text-sm font-semibold">Train Loss</th>
                                            <th className="border px-4 py-3 text-left text-sm font-semibold">Val Loss</th>
                                            <th className="border px-4 py-3 text-left text-sm font-semibold">Train Acc</th>
                                            <th className="border px-4 py-3 text-left text-sm font-semibold">Val Acc</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {visibleData.slice(-10).reverse().map((data) => (
                                            <tr
                                                key={data.epoch}
                                                className={`transition-all ${data.epoch === currentEpoch
                                                    ? 'bg-blue-100 border-l-4 border-l-blue-600'
                                                    : 'hover:bg-gray-50'
                                                    }`}
                                            >
                                                <td className="border px-4 py-3">
                                                    <div className="flex items-center gap-2">
                                                        {data.epoch === currentEpoch && (
                                                            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                                                        )}
                                                        <span className="font-medium">{data.epoch}</span>
                                                    </div>
                                                </td>
                                                <td className="border px-4 py-3 font-mono text-sm text-blue-600">{data.trainLoss}</td>
                                                <td className="border px-4 py-3 font-mono text-sm text-purple-600">{data.valLoss}</td>
                                                <td className="border px-4 py-3 font-mono text-sm text-green-600">{data.trainAcc}%</td>
                                                <td className="border px-4 py-3 font-mono text-sm text-orange-600">{data.valAcc}%</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {visibleData.length > 10 && (
                                    <p className="text-xs text-gray-500 mt-2 text-center">
                                        Showing last 10 epochs (Total: {visibleData.length})
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Mathematical Equations */}
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                        <h4 className="font-semibold text-blue-900 mb-3">📐 Training Equations</h4>
                        <div className="space-y-4 overflow-x-auto">
                            <div>
                                <p className="text-sm font-semibold mb-2">Forward Propagation:</p>
                                <BlockMath math="a^{[l]} = g^{[l]}(W^{[l]} a^{[l-1]} + b^{[l]})" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold mb-2">Loss Function (Cross-Entropy):</p>
                                <BlockMath math="\mathcal{L} = -\frac{1}{m} \sum_{i=1}^{m} [y^{(i)} \log(\hat{y}^{(i)}) + (1-y^{(i)}) \log(1-\hat{y}^{(i)})]" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold mb-2">Gradient Descent Update:</p>
                                <BlockMath math="W^{[l]} := W^{[l]} - \alpha \frac{\partial \mathcal{L}}{\partial W^{[l]}}" />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
