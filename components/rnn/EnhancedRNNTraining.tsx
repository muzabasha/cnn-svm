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
    trainPerplexity: number
    valPerplexity: number
    gradientNorm: number
}

interface CellGates {
    epoch: number
    forgetGate: number
    inputGate: number
    outputGate: number
    cellState: number
}

export function EnhancedRNNTraining() {
    // Hyperparameters
    const [learningRate, setLearningRate] = useState(0.001)
    const [hiddenSize, setHiddenSize] = useState(128)
    const [sequenceLength, setSequenceLength] = useState(20)
    const [cellType, setCellType] = useState<'RNN' | 'LSTM' | 'GRU'>('LSTM')
    const [epochs, setEpochs] = useState(50)
    const [batchSize, setBatchSize] = useState(32)
    const [dropout, setDropout] = useState(0.2)

    // Training state
    const [currentEpoch, setCurrentEpoch] = useState(0)
    const [isTraining, setIsTraining] = useState(false)
    const [trainingSpeed, setTrainingSpeed] = useState(500)
    const [trainingData, setTrainingData] = useState<TrainingData[]>([])
    const [cellGatesData, setCellGatesData] = useState<CellGates[]>([])
    const [showSettings, setShowSettings] = useState(true)
    const [showGraphs, setShowGraphs] = useState(true)
    const [showTable, setShowTable] = useState(true)

    // Generate synthetic training data
    const generateTrainingData = () => {
        const data: TrainingData[] = []
        const baseTrainLoss = 4.5
        const baseValLoss = 4.8

        const convergenceRate = learningRate * 100
        const complexityFactor = hiddenSize / 128
        const sequenceFactor = sequenceLength / 20

        for (let i = 0; i <= epochs; i++) {
            const progress = i / epochs

            const trainLoss = baseTrainLoss * Math.exp(-convergenceRate * progress * complexityFactor) +
                0.2 * Math.random()

            const valLoss = baseValLoss * Math.exp(-convergenceRate * progress * complexityFactor * 0.85) +
                (1 - dropout) * 0.4 * progress +
                0.25 * Math.random()

            const trainPerplexity = Math.exp(trainLoss)
            const valPerplexity = Math.exp(valLoss)

            const gradientNorm = learningRate * 10 * (1 - progress) * sequenceFactor +
                0.1 * Math.random()

            data.push({
                epoch: i,
                trainLoss: Number(trainLoss.toFixed(3)),
                valLoss: Number(valLoss.toFixed(3)),
                trainPerplexity: Number(trainPerplexity.toFixed(2)),
                valPerplexity: Number(valPerplexity.toFixed(2)),
                gradientNorm: Number(gradientNorm.toFixed(4))
            })
        }

        return data
    }

    // Generate LSTM/GRU gate activations
    const generateCellGates = (epoch: number) => {
        const progress = epoch / epochs
        const data: CellGates[] = []

        for (let i = 0; i <= Math.min(epoch, 10); i++) {
            const p = i / epochs
            data.push({
                epoch: i,
                forgetGate: Number((0.3 + 0.4 * (1 - p) + 0.1 * Math.random()).toFixed(3)),
                inputGate: Number((0.4 + 0.3 * p + 0.1 * Math.random()).toFixed(3)),
                outputGate: Number((0.5 + 0.2 * p + 0.1 * Math.random()).toFixed(3)),
                cellState: Number((0.6 + 0.3 * p + 0.1 * Math.random()).toFixed(3))
            })
        }

        return data
    }

    // Initialize training data
    useEffect(() => {
        const data = generateTrainingData()
        setTrainingData(data)
        setCurrentEpoch(0)
        setCellGatesData(generateCellGates(0))
    }, [learningRate, hiddenSize, sequenceLength, cellType, epochs, batchSize, dropout])

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
                setCellGatesData(generateCellGates(nextEpoch))
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
            setCellGatesData(generateCellGates(nextEpoch))
        }
    }

    const handlePrevious = () => {
        if (currentEpoch > 0) {
            const prevEpoch = currentEpoch - 1
            setCurrentEpoch(prevEpoch)
            setCellGatesData(generateCellGates(prevEpoch))
        }
    }

    const handleReset = () => {
        setCurrentEpoch(0)
        setIsTraining(false)
        setCellGatesData(generateCellGates(0))
    }

    const currentData = trainingData[currentEpoch] || { trainLoss: 0, valLoss: 0, trainPerplexity: 0, valPerplexity: 0, gradientNorm: 0, epoch: 0 }
    const visibleData = trainingData.slice(0, currentEpoch + 1)

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>🔄 Enhanced RNN Training - Recurrent Neural Networks</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 mb-6">
                        Train RNN, LSTM, or GRU networks with full control over hyperparameters and watch sequence learning in real-time.
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
                                        Cell Type: {cellType}
                                    </label>
                                    <select
                                        value={cellType}
                                        onChange={(e) => setCellType(e.target.value as 'RNN' | 'LSTM' | 'GRU')}
                                        disabled={isTraining}
                                        className="w-full border rounded px-3 py-2"
                                    >
                                        <option value="RNN">RNN (Basic)</option>
                                        <option value="LSTM">LSTM (Long Short-Term Memory)</option>
                                        <option value="GRU">GRU (Gated Recurrent Unit)</option>
                                    </select>
                                    <p className="text-xs text-gray-500 mt-1">Recurrent cell architecture</p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium block mb-2">
                                        Learning Rate: {learningRate}
                                    </label>
                                    <input
                                        type="range"
                                        min="0.0001"
                                        max="0.01"
                                        step="0.0001"
                                        value={learningRate}
                                        onChange={(e) => setLearningRate(Number(e.target.value))}
                                        disabled={isTraining}
                                        className="w-full"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Controls convergence speed</p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium block mb-2">
                                        Hidden Size: {hiddenSize}
                                    </label>
                                    <select
                                        value={hiddenSize}
                                        onChange={(e) => setHiddenSize(Number(e.target.value))}
                                        disabled={isTraining}
                                        className="w-full border rounded px-3 py-2"
                                    >
                                        <option value={64}>64</option>
                                        <option value={128}>128</option>
                                        <option value={256}>256</option>
                                        <option value={512}>512</option>
                                    </select>
                                    <p className="text-xs text-gray-500 mt-1">Hidden state dimension</p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium block mb-2">
                                        Sequence Length: {sequenceLength}
                                    </label>
                                    <input
                                        type="range"
                                        min="10"
                                        max="50"
                                        step="5"
                                        value={sequenceLength}
                                        onChange={(e) => setSequenceLength(Number(e.target.value))}
                                        disabled={isTraining}
                                        className="w-full"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Input sequence length</p>
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
                                    <p className="text-xs text-gray-500 mt-1">Sequences per batch</p>
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
                                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                                    style={{ width: `${(currentEpoch / epochs) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    {/* Current Metrics */}
                    <div className="mb-6 grid grid-cols-2 md:grid-cols-5 gap-4">
                        <div className="p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                            <p className="text-xs text-gray-600 mb-1">Train Loss</p>
                            <p className="text-2xl font-bold text-purple-700">{currentData.trainLoss}</p>
                        </div>
                        <div className="p-4 bg-pink-50 rounded-lg border-2 border-pink-200">
                            <p className="text-xs text-gray-600 mb-1">Val Loss</p>
                            <p className="text-2xl font-bold text-pink-700">{currentData.valLoss}</p>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                            <p className="text-xs text-gray-600 mb-1">Train Perplexity</p>
                            <p className="text-2xl font-bold text-blue-700">{currentData.trainPerplexity}</p>
                        </div>
                        <div className="p-4 bg-indigo-50 rounded-lg border-2 border-indigo-200">
                            <p className="text-xs text-gray-600 mb-1">Val Perplexity</p>
                            <p className="text-2xl font-bold text-indigo-700">{currentData.valPerplexity}</p>
                        </div>
                        <div className="p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
                            <p className="text-xs text-gray-600 mb-1">Gradient Norm</p>
                            <p className="text-2xl font-bold text-orange-700">{currentData.gradientNorm}</p>
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
                                            <Line type="monotone" dataKey="trainLoss" stroke="#a855f7" name="Train Loss" strokeWidth={2} />
                                            <Line type="monotone" dataKey="valLoss" stroke="#ec4899" name="Val Loss" strokeWidth={2} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className="bg-white p-4 rounded-lg border">
                                    <h4 className="font-semibold mb-3 text-center">Perplexity Over Epochs</h4>
                                    <ResponsiveContainer width="100%" height={250}>
                                        <LineChart data={visibleData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="epoch" label={{ value: 'Epoch', position: 'insideBottom', offset: -5 }} />
                                            <YAxis label={{ value: 'Perplexity', angle: -90, position: 'insideLeft' }} />
                                            <Tooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey="trainPerplexity" stroke="#3b82f6" name="Train PPL" strokeWidth={2} />
                                            <Line type="monotone" dataKey="valPerplexity" stroke="#6366f1" name="Val PPL" strokeWidth={2} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className="bg-white p-4 rounded-lg border">
                                    <h4 className="font-semibold mb-3 text-center">Gradient Norm Over Epochs</h4>
                                    <ResponsiveContainer width="100%" height={250}>
                                        <LineChart data={visibleData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="epoch" label={{ value: 'Epoch', position: 'insideBottom', offset: -5 }} />
                                            <YAxis label={{ value: 'Gradient Norm', angle: -90, position: 'insideLeft' }} />
                                            <Tooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey="gradientNorm" stroke="#f97316" name="Gradient Norm" strokeWidth={2} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>

                                {cellType !== 'RNN' && (
                                    <div className="bg-white p-4 rounded-lg border">
                                        <h4 className="font-semibold mb-3 text-center">
                                            {cellType} Gate Activations (Last 10 Epochs)
                                        </h4>
                                        <ResponsiveContainer width="100%" height={250}>
                                            <BarChart data={cellGatesData}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="epoch" />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                {cellType === 'LSTM' && (
                                                    <>
                                                        <Bar dataKey="forgetGate" fill="#ef4444" name="Forget Gate" />
                                                        <Bar dataKey="inputGate" fill="#3b82f6" name="Input Gate" />
                                                        <Bar dataKey="outputGate" fill="#22c55e" name="Output Gate" />
                                                        <Bar dataKey="cellState" fill="#a855f7" name="Cell State" />
                                                    </>
                                                )}
                                                {cellType === 'GRU' && (
                                                    <>
                                                        <Bar dataKey="forgetGate" fill="#ef4444" name="Reset Gate" />
                                                        <Bar dataKey="inputGate" fill="#3b82f6" name="Update Gate" />
                                                        <Bar dataKey="cellState" fill="#a855f7" name="Hidden State" />
                                                    </>
                                                )}
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                )}
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
                                            <th className="border px-4 py-3 text-left text-sm font-semibold">Train PPL</th>
                                            <th className="border px-4 py-3 text-left text-sm font-semibold">Val PPL</th>
                                            <th className="border px-4 py-3 text-left text-sm font-semibold">Grad Norm</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {visibleData.slice(-10).reverse().map((data) => (
                                            <tr
                                                key={data.epoch}
                                                className={`transition-all ${data.epoch === currentEpoch
                                                    ? 'bg-purple-100 border-l-4 border-l-purple-600'
                                                    : 'hover:bg-gray-50'
                                                    }`}
                                            >
                                                <td className="border px-4 py-3">
                                                    <div className="flex items-center gap-2">
                                                        {data.epoch === currentEpoch && (
                                                            <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></div>
                                                        )}
                                                        <span className="font-medium">{data.epoch}</span>
                                                    </div>
                                                </td>
                                                <td className="border px-4 py-3 font-mono text-sm text-purple-600">{data.trainLoss}</td>
                                                <td className="border px-4 py-3 font-mono text-sm text-pink-600">{data.valLoss}</td>
                                                <td className="border px-4 py-3 font-mono text-sm text-blue-600">{data.trainPerplexity}</td>
                                                <td className="border px-4 py-3 font-mono text-sm text-indigo-600">{data.valPerplexity}</td>
                                                <td className="border px-4 py-3 font-mono text-sm text-orange-600">{data.gradientNorm}</td>
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
                    <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
                        <h4 className="font-semibold text-purple-900 mb-3">📐 {cellType} Equations</h4>
                        <div className="space-y-4 overflow-x-auto">
                            {cellType === 'RNN' && (
                                <>
                                    <div>
                                        <p className="text-sm font-semibold mb-2">RNN Cell:</p>
                                        <BlockMath math="h_t = \tanh(W_{hh} h_{t-1} + W_{xh} x_t + b_h)" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold mb-2">Output:</p>
                                        <BlockMath math="y_t = W_{hy} h_t + b_y" />
                                    </div>
                                </>
                            )}
                            {cellType === 'LSTM' && (
                                <>
                                    <div>
                                        <p className="text-sm font-semibold mb-2">Forget Gate:</p>
                                        <BlockMath math="f_t = \sigma(W_f \cdot [h_{t-1}, x_t] + b_f)" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold mb-2">Input Gate:</p>
                                        <BlockMath math="i_t = \sigma(W_i \cdot [h_{t-1}, x_t] + b_i)" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold mb-2">Cell State Update:</p>
                                        <BlockMath math="C_t = f_t * C_{t-1} + i_t * \tanh(W_C \cdot [h_{t-1}, x_t] + b_C)" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold mb-2">Output Gate:</p>
                                        <BlockMath math="o_t = \sigma(W_o \cdot [h_{t-1}, x_t] + b_o)" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold mb-2">Hidden State:</p>
                                        <BlockMath math="h_t = o_t * \tanh(C_t)" />
                                    </div>
                                </>
                            )}
                            {cellType === 'GRU' && (
                                <>
                                    <div>
                                        <p className="text-sm font-semibold mb-2">Reset Gate:</p>
                                        <BlockMath math="r_t = \sigma(W_r \cdot [h_{t-1}, x_t] + b_r)" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold mb-2">Update Gate:</p>
                                        <BlockMath math="z_t = \sigma(W_z \cdot [h_{t-1}, x_t] + b_z)" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold mb-2">Candidate Hidden State:</p>
                                        <BlockMath math="\tilde{h}_t = \tanh(W_h \cdot [r_t * h_{t-1}, x_t] + b_h)" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold mb-2">Hidden State:</p>
                                        <BlockMath math="h_t = (1 - z_t) * h_{t-1} + z_t * \tilde{h}_t" />
                                    </div>
                                </>
                            )}
                            <div>
                                <p className="text-sm font-semibold mb-2">Cross-Entropy Loss:</p>
                                <BlockMath math="\mathcal{L} = -\frac{1}{T} \sum_{t=1}^{T} \log P(y_t | x_1, ..., x_t)" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold mb-2">Perplexity:</p>
                                <BlockMath math="\text{PPL} = \exp(\mathcal{L})" />
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                        <h4 className="font-semibold text-blue-900 mb-2">💡 Understanding {cellType}</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                            {cellType === 'RNN' && (
                                <>
                                    <li>• <strong>Basic RNN</strong>: Simple recurrent connections, prone to vanishing gradients</li>
                                    <li>• <strong>Hidden State</strong>: Carries information from previous time steps</li>
                                    <li>• <strong>Use Case</strong>: Short sequences, simple patterns</li>
                                </>
                            )}
                            {cellType === 'LSTM' && (
                                <>
                                    <li>• <strong>LSTM</strong>: Uses gates to control information flow, solves vanishing gradient</li>
                                    <li>• <strong>Forget Gate</strong>: Decides what to forget from cell state</li>
                                    <li>• <strong>Input Gate</strong>: Decides what new information to store</li>
                                    <li>• <strong>Output Gate</strong>: Decides what to output from cell state</li>
                                    <li>• <strong>Use Case</strong>: Long sequences, complex dependencies</li>
                                </>
                            )}
                            {cellType === 'GRU' && (
                                <>
                                    <li>• <strong>GRU</strong>: Simplified LSTM with fewer parameters, faster training</li>
                                    <li>• <strong>Reset Gate</strong>: Controls how much past information to forget</li>
                                    <li>• <strong>Update Gate</strong>: Controls how much new information to add</li>
                                    <li>• <strong>Use Case</strong>: Balance between RNN and LSTM, good for most tasks</li>
                                </>
                            )}
                            <li>• <strong>Perplexity</strong>: Lower is better, measures prediction uncertainty</li>
                            <li>• <strong>Gradient Norm</strong>: Monitors gradient flow, helps detect vanishing/exploding gradients</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
