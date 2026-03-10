'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft, Settings } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'

interface TrainingData {
    epoch: number
    trainLoss: number
    valLoss: number
    trainAcc: number
    valAcc: number
    bleuScore: number
}

interface AttentionWeight {
    token: string
    weight: number
}

export function EnhancedNLPTraining() {
    const [modelType, setModelType] = useState<'transformer' | 'lstm-seq2seq' | 'bert-finetune'>('transformer')
    const [learningRate, setLearningRate] = useState(0.0001)
    const [batchSize, setBatchSize] = useState(32)
    const [epochs, setEpochs] = useState(50)
    const [embeddingDim, setEmbeddingDim] = useState(256)
    const [numHeads, setNumHeads] = useState(8)
    const [dropout, setDropout] = useState(0.1)

    const [currentEpoch, setCurrentEpoch] = useState(0)
    const [isTraining, setIsTraining] = useState(false)
    const [trainingSpeed, setTrainingSpeed] = useState(500)
    const [trainingData, setTrainingData] = useState<TrainingData[]>([])
    const [attentionWeights, setAttentionWeights] = useState<AttentionWeight[]>([])
    const [showSettings, setShowSettings] = useState(true)
    const [showGraphs, setShowGraphs] = useState(true)
    const [showTable, setShowTable] = useState(true)

    const tokens = ['The', 'cat', 'sat', 'on', 'the', 'mat', '.']

    const generateTrainingData = () => {
        const data: TrainingData[] = []
        const lr = learningRate * 10000
        const headFactor = numHeads / 8
        const dimFactor = embeddingDim / 256

        for (let i = 0; i <= epochs; i++) {
            const p = i / epochs
            const trainLoss = 4.0 * Math.exp(-lr * p * headFactor * dimFactor) + 0.3 + 0.1 * Math.random()
            const valLoss = 4.2 * Math.exp(-lr * p * headFactor * dimFactor * 0.85) + (1 - dropout) * 0.3 * p + 0.15 * Math.random()
            const trainAcc = Math.min(0.95, 0.3 + 0.65 * (1 - Math.exp(-lr * p * 2)) + 0.02 * Math.random())
            const valAcc = Math.min(0.90, 0.25 + 0.6 * (1 - Math.exp(-lr * p * 1.5)) + 0.02 * Math.random())
            const bleuScore = Math.min(0.85, 0.1 + 0.7 * (1 - Math.exp(-lr * p * 1.8)) + 0.03 * Math.random())

            data.push({
                epoch: i,
                trainLoss: Number(trainLoss.toFixed(3)),
                valLoss: Number(valLoss.toFixed(3)),
                trainAcc: Number(trainAcc.toFixed(3)),
                valAcc: Number(valAcc.toFixed(3)),
                bleuScore: Number(bleuScore.toFixed(3))
            })
        }
        return data
    }

    const generateAttentionWeights = (epoch: number) => {
        const p = epoch / epochs
        return tokens.map((token, i) => ({
            token,
            weight: Number((0.05 + Math.random() * 0.3 + (i === 1 || i === 5 ? 0.3 * p : 0)).toFixed(3))
        }))
    }

    useEffect(() => {
        const data = generateTrainingData()
        setTrainingData(data)
        setCurrentEpoch(0)
        setAttentionWeights(generateAttentionWeights(0))
    }, [modelType, learningRate, batchSize, epochs, embeddingDim, numHeads, dropout])

    useEffect(() => {
        if (!isTraining) return
        const interval = setInterval(() => {
            setCurrentEpoch(prev => {
                if (prev >= epochs) { setIsTraining(false); return prev }
                const next = prev + 1
                setAttentionWeights(generateAttentionWeights(next))
                return next
            })
        }, trainingSpeed)
        return () => clearInterval(interval)
    }, [isTraining, trainingSpeed, epochs])

    const handlePlayPause = () => {
        if (currentEpoch >= epochs) setCurrentEpoch(0)
        setIsTraining(!isTraining)
    }
    const handleNext = () => { if (currentEpoch < epochs) { setCurrentEpoch(currentEpoch + 1); setAttentionWeights(generateAttentionWeights(currentEpoch + 1)) } }
    const handlePrev = () => { if (currentEpoch > 0) { setCurrentEpoch(currentEpoch - 1); setAttentionWeights(generateAttentionWeights(currentEpoch - 1)) } }
    const handleReset = () => { setCurrentEpoch(0); setIsTraining(false); setAttentionWeights(generateAttentionWeights(0)) }

    const currentData = trainingData[currentEpoch] || { epoch: 0, trainLoss: 0, valLoss: 0, trainAcc: 0, valAcc: 0, bleuScore: 0 }
    const visibleData = trainingData.slice(0, currentEpoch + 1)

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>🗣️ Enhanced NLP Training - Language Model Training Simulator</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 mb-6">
                        Train NLP models step-by-step with full control over architecture and hyperparameters. Watch attention patterns evolve and performance improve.
                    </p>

                    {/* Hyperparameters */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-lg">⚙️ Model Configuration</h3>
                            <button onClick={() => setShowSettings(!showSettings)} className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded flex items-center gap-2">
                                <Settings className="w-4 h-4" />{showSettings ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        {showSettings && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl">
                                <div>
                                    <label className="text-sm font-medium block mb-2">Model Architecture</label>
                                    <select value={modelType} onChange={e => setModelType(e.target.value as any)} disabled={isTraining} className="w-full border rounded px-3 py-2">
                                        <option value="transformer">Transformer</option>
                                        <option value="lstm-seq2seq">LSTM Seq2Seq</option>
                                        <option value="bert-finetune">BERT Fine-tune</option>
                                    </select>
                                    <p className="text-xs text-gray-500 mt-1">Core model architecture</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium block mb-2">Learning Rate: {learningRate}</label>
                                    <input type="range" min="0.00001" max="0.001" step="0.00001" value={learningRate} onChange={e => setLearningRate(Number(e.target.value))} disabled={isTraining} className="w-full" />
                                    <p className="text-xs text-gray-500 mt-1">Lower for fine-tuning</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium block mb-2">Batch Size: {batchSize}</label>
                                    <select value={batchSize} onChange={e => setBatchSize(Number(e.target.value))} disabled={isTraining} className="w-full border rounded px-3 py-2">
                                        <option value={8}>8</option><option value={16}>16</option><option value={32}>32</option><option value={64}>64</option>
                                    </select>
                                    <p className="text-xs text-gray-500 mt-1">Samples per gradient update</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium block mb-2">Epochs: {epochs}</label>
                                    <input type="range" min="10" max="100" step="10" value={epochs} onChange={e => setEpochs(Number(e.target.value))} disabled={isTraining} className="w-full" />
                                    <p className="text-xs text-gray-500 mt-1">Training iterations</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium block mb-2">Embedding Dim: {embeddingDim}</label>
                                    <select value={embeddingDim} onChange={e => setEmbeddingDim(Number(e.target.value))} disabled={isTraining} className="w-full border rounded px-3 py-2">
                                        <option value={64}>64</option><option value={128}>128</option><option value={256}>256</option><option value={512}>512</option>
                                    </select>
                                    <p className="text-xs text-gray-500 mt-1">Token representation size</p>
                                </div>
                                {modelType === 'transformer' && (
                                    <div>
                                        <label className="text-sm font-medium block mb-2">Attention Heads: {numHeads}</label>
                                        <select value={numHeads} onChange={e => setNumHeads(Number(e.target.value))} disabled={isTraining} className="w-full border rounded px-3 py-2">
                                            <option value={2}>2</option><option value={4}>4</option><option value={8}>8</option><option value={16}>16</option>
                                        </select>
                                        <p className="text-xs text-gray-500 mt-1">Multi-head attention</p>
                                    </div>
                                )}
                                <div>
                                    <label className="text-sm font-medium block mb-2">Dropout: {dropout}</label>
                                    <input type="range" min="0" max="0.5" step="0.05" value={dropout} onChange={e => setDropout(Number(e.target.value))} disabled={isTraining} className="w-full" />
                                    <p className="text-xs text-gray-500 mt-1">Regularization strength</p>
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
                            <Button onClick={handlePrev} disabled={currentEpoch === 0 || isTraining} variant="outline"><ChevronLeft className="w-4 h-4" />Prev</Button>
                            <Button onClick={handleNext} disabled={currentEpoch >= epochs || isTraining} variant="outline">Next<ChevronRight className="w-4 h-4" /></Button>
                            <Button onClick={handleReset} variant="outline"><RotateCcw className="w-4 h-4" />Reset</Button>
                            <div className="flex items-center gap-2 ml-auto">
                                <label className="text-sm font-medium">Speed:</label>
                                <select value={trainingSpeed} onChange={e => setTrainingSpeed(Number(e.target.value))} className="border rounded px-3 py-1 text-sm" disabled={isTraining}>
                                    <option value={1000}>Slow</option><option value={500}>Medium</option><option value={200}>Fast</option>
                                </select>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="font-medium">Epoch {currentEpoch} / {epochs}</span>
                                <span className="text-gray-600">{((currentEpoch / epochs) * 100).toFixed(1)}%</span>
                            </div>
                            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300" style={{ width: `${(currentEpoch / epochs) * 100}%` }}></div>
                            </div>
                        </div>
                    </div>

                    {/* Metrics */}
                    <div className="mb-6 grid grid-cols-2 md:grid-cols-5 gap-4">
                        <div className="p-4 bg-red-50 rounded-lg border-2 border-red-200">
                            <p className="text-xs text-gray-600 mb-1">Train Loss</p>
                            <p className="text-2xl font-bold text-red-700">{currentData.trainLoss.toFixed(3)}</p>
                        </div>
                        <div className="p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
                            <p className="text-xs text-gray-600 mb-1">Val Loss</p>
                            <p className="text-2xl font-bold text-orange-700">{currentData.valLoss.toFixed(3)}</p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
                            <p className="text-xs text-gray-600 mb-1">Train Acc</p>
                            <p className="text-2xl font-bold text-green-700">{(currentData.trainAcc * 100).toFixed(1)}%</p>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                            <p className="text-xs text-gray-600 mb-1">Val Acc</p>
                            <p className="text-2xl font-bold text-blue-700">{(currentData.valAcc * 100).toFixed(1)}%</p>
                        </div>
                        <div className="p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                            <p className="text-xs text-gray-600 mb-1">BLEU Score</p>
                            <p className="text-2xl font-bold text-purple-700">{(currentData.bleuScore * 100).toFixed(1)}</p>
                        </div>
                    </div>

                    {/* Graphs */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-lg">📊 Training Metrics</h3>
                            <button onClick={() => setShowGraphs(!showGraphs)} className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded">
                                {showGraphs ? 'Hide Graphs' : 'Show Graphs'}
                            </button>
                        </div>
                        {showGraphs && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="bg-white p-4 rounded-lg border">
                                    <h4 className="font-semibold mb-3 text-center">Loss Curves</h4>
                                    <ResponsiveContainer width="100%" height={250}>
                                        <LineChart data={visibleData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="epoch" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey="trainLoss" stroke="#ef4444" name="Train Loss" strokeWidth={2} />
                                            <Line type="monotone" dataKey="valLoss" stroke="#f97316" name="Val Loss" strokeWidth={2} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="bg-white p-4 rounded-lg border">
                                    <h4 className="font-semibold mb-3 text-center">Accuracy & BLEU Score</h4>
                                    <ResponsiveContainer width="100%" height={250}>
                                        <LineChart data={visibleData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="epoch" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey="trainAcc" stroke="#22c55e" name="Train Acc" strokeWidth={2} />
                                            <Line type="monotone" dataKey="valAcc" stroke="#3b82f6" name="Val Acc" strokeWidth={2} />
                                            <Line type="monotone" dataKey="bleuScore" stroke="#a855f7" name="BLEU" strokeWidth={2} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="bg-white p-4 rounded-lg border lg:col-span-2">
                                    <h4 className="font-semibold mb-3 text-center">Attention Weights (Epoch {currentEpoch})</h4>
                                    <ResponsiveContainer width="100%" height={200}>
                                        <BarChart data={attentionWeights}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="token" />
                                            <YAxis />
                                            <Tooltip />
                                            <Bar dataKey="weight" fill="#6366f1" name="Attention Weight" />
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
                            <button onClick={() => setShowTable(!showTable)} className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded">
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
                                            <th className="border px-4 py-3 text-left text-sm font-semibold">BLEU</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {visibleData.slice(-10).reverse().map(d => (
                                            <tr key={d.epoch} className={`transition-all ${d.epoch === currentEpoch ? 'bg-indigo-100 border-l-4 border-l-indigo-600' : 'hover:bg-gray-50'}`}>
                                                <td className="border px-4 py-3">
                                                    <div className="flex items-center gap-2">
                                                        {d.epoch === currentEpoch && <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></div>}
                                                        <span className="font-medium">{d.epoch}</span>
                                                    </div>
                                                </td>
                                                <td className="border px-4 py-3 font-mono text-sm text-red-600">{d.trainLoss}</td>
                                                <td className="border px-4 py-3 font-mono text-sm text-orange-600">{d.valLoss}</td>
                                                <td className="border px-4 py-3 font-mono text-sm text-green-600">{(d.trainAcc * 100).toFixed(1)}%</td>
                                                <td className="border px-4 py-3 font-mono text-sm text-blue-600">{(d.valAcc * 100).toFixed(1)}%</td>
                                                <td className="border px-4 py-3 font-mono text-sm text-purple-600">{(d.bleuScore * 100).toFixed(1)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {/* Equations */}
                    <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded">
                        <h4 className="font-semibold text-indigo-900 mb-3">📐 {modelType === 'transformer' ? 'Transformer' : modelType === 'lstm-seq2seq' ? 'LSTM Seq2Seq' : 'BERT'} Equations</h4>
                        <div className="space-y-4 overflow-x-auto">
                            {modelType === 'transformer' && (
                                <>
                                    <div>
                                        <p className="text-sm font-semibold mb-2">Scaled Dot-Product Attention:</p>
                                        <BlockMath math="\text{Attention}(Q,K,V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold mb-2">Multi-Head Attention:</p>
                                        <BlockMath math="\text{MultiHead}(Q,K,V) = \text{Concat}(\text{head}_1,...,\text{head}_h)W^O" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold mb-2">Positional Encoding:</p>
                                        <BlockMath math="PE_{(pos,2i)} = \sin\left(\frac{pos}{10000^{2i/d}}\right)" />
                                    </div>
                                </>
                            )}
                            {modelType === 'lstm-seq2seq' && (
                                <>
                                    <div>
                                        <p className="text-sm font-semibold mb-2">LSTM Cell:</p>
                                        <BlockMath math="f_t = \sigma(W_f \cdot [h_{t-1}, x_t] + b_f)" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold mb-2">Context Vector:</p>
                                        <BlockMath math="c = \sum_{i=1}^{T} \alpha_i h_i" />
                                    </div>
                                </>
                            )}
                            {modelType === 'bert-finetune' && (
                                <>
                                    <div>
                                        <p className="text-sm font-semibold mb-2">Masked Language Model:</p>
                                        <BlockMath math="\mathcal{L}_{MLM} = -\sum_{i \in M} \log P(x_i | x_{\backslash M})" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold mb-2">Fine-tuning Loss:</p>
                                        <BlockMath math="\mathcal{L} = -\sum_{i=1}^{C} y_i \log(\hat{y}_i)" />
                                    </div>
                                </>
                            )}
                            <div>
                                <p className="text-sm font-semibold mb-2">Cross-Entropy Loss:</p>
                                <BlockMath math="\mathcal{L} = -\frac{1}{N}\sum_{i=1}^{N}\sum_{c=1}^{V} y_{i,c} \log(\hat{y}_{i,c})" />
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                        <h4 className="font-semibold text-blue-900 mb-2">💡 Understanding NLP Models</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                            <li>• <strong>Transformer</strong>: Self-attention mechanism processes all tokens in parallel</li>
                            <li>• <strong>LSTM Seq2Seq</strong>: Encoder-decoder with sequential processing and attention</li>
                            <li>• <strong>BERT Fine-tune</strong>: Pre-trained bidirectional model adapted for specific tasks</li>
                            <li>• <strong>Attention Heads</strong>: Multiple heads capture different linguistic relationships</li>
                            <li>• <strong>Embedding Dim</strong>: Higher dimensions capture richer token representations</li>
                            <li>• <strong>BLEU Score</strong>: Measures translation/generation quality (0-100)</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
