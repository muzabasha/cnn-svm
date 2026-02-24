'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft, Settings } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts'
import { BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'

interface TrainingData {
    tree: number
    oobError: number
    trainAccuracy: number
    valAccuracy: number
    treeDepth: number
    numLeaves: number
}

interface FeatureImportance {
    feature: string
    importance: number
    color: string
}

export function EnhancedRandomForestTraining() {
    // Hyperparameters
    const [nEstimators, setNEstimators] = useState(50)
    const [maxDepth, setMaxDepth] = useState(10)
    const [minSamplesSplit, setMinSamplesSplit] = useState(2)
    const [maxFeatures, setMaxFeatures] = useState<'sqrt' | 'log2' | 'all'>('sqrt')
    const [bootstrap, setBootstrap] = useState(true)
    const [criterion, setCriterion] = useState<'gini' | 'entropy'>('gini')

    // Training state
    const [currentTree, setCurrentTree] = useState(0)
    const [isTraining, setIsTraining] = useState(false)
    const [trainingSpeed, setTrainingSpeed] = useState(500)
    const [trainingData, setTrainingData] = useState<TrainingData[]>([])
    const [featureImportance, setFeatureImportance] = useState<FeatureImportance[]>([])
    const [showSettings, setShowSettings] = useState(true)
    const [showGraphs, setShowGraphs] = useState(true)
    const [showTable, setShowTable] = useState(true)

    // Feature names
    const features = ['Temperature', 'Humidity', 'Rainfall', 'Soil pH', 'Sunlight']
    const featureColors = ['#ef4444', '#f97316', '#3b82f6', '#22c55e', '#a855f7']

    // Generate synthetic training data
    const generateTrainingData = () => {
        const data: TrainingData[] = []
        const baseOOBError = 0.35
        const baseTrainAcc = 0.6
        const baseValAcc = 0.55

        const depthFactor = maxDepth / 10
        const samplesFactor = 1 / minSamplesSplit

        for (let i = 0; i <= nEstimators; i++) {
            const progress = i / nEstimators

            // OOB error decreases with more trees
            const oobError = baseOOBError * Math.exp(-2 * progress) + 0.05 + 0.02 * Math.random()

            // Training accuracy increases
            const trainAccuracy = baseTrainAcc + (0.35 * progress * depthFactor) + 0.02 * Math.random()

            // Validation accuracy increases but plateaus
            const valAccuracy = baseValAcc + (0.3 * progress * (1 - 0.3 * progress)) + 0.02 * Math.random()

            // Tree depth varies
            const treeDepth = Math.min(maxDepth, Math.floor(5 + Math.random() * (maxDepth - 4)))

            // Number of leaves
            const numLeaves = Math.floor(Math.pow(2, treeDepth * 0.6) * samplesFactor)

            data.push({
                tree: i,
                oobError: Number(Math.max(0.05, oobError).toFixed(3)),
                trainAccuracy: Number(Math.min(0.99, trainAccuracy).toFixed(3)),
                valAccuracy: Number(Math.min(0.95, valAccuracy).toFixed(3)),
                treeDepth,
                numLeaves
            })
        }

        return data
    }

    // Generate feature importance
    const generateFeatureImportance = (tree: number) => {
        const progress = tree / nEstimators
        const importance: FeatureImportance[] = features.map((feature, i) => {
            // Different features become more important as training progresses
            let baseImportance = 0.15 + 0.1 * Math.random()

            if (i === 0) baseImportance += 0.2 * progress // Temperature becomes more important
            if (i === 2) baseImportance += 0.15 * progress // Rainfall becomes more important
            if (i === 4) baseImportance += 0.1 * (1 - progress) // Sunlight less important later

            return {
                feature,
                importance: Number(baseImportance.toFixed(3)),
                color: featureColors[i]
            }
        })

        // Normalize to sum to 1
        const total = importance.reduce((sum, f) => sum + f.importance, 0)
        return importance.map(f => ({
            ...f,
            importance: Number((f.importance / total).toFixed(3))
        }))
    }

    // Initialize training data
    useEffect(() => {
        const data = generateTrainingData()
        setTrainingData(data)
        setCurrentTree(0)
        setFeatureImportance(generateFeatureImportance(0))
    }, [nEstimators, maxDepth, minSamplesSplit, maxFeatures, bootstrap, criterion])

    // Auto-play training
    useEffect(() => {
        if (!isTraining) return

        const interval = setInterval(() => {
            setCurrentTree(prev => {
                if (prev >= nEstimators) {
                    setIsTraining(false)
                    return prev
                }
                const nextTree = prev + 1
                setFeatureImportance(generateFeatureImportance(nextTree))
                return nextTree
            })
        }, trainingSpeed)

        return () => clearInterval(interval)
    }, [isTraining, trainingSpeed, nEstimators])

    const handlePlayPause = () => {
        if (currentTree >= nEstimators) {
            setCurrentTree(0)
        }
        setIsTraining(!isTraining)
    }

    const handleNext = () => {
        if (currentTree < nEstimators) {
            const nextTree = currentTree + 1
            setCurrentTree(nextTree)
            setFeatureImportance(generateFeatureImportance(nextTree))
        }
    }

    const handlePrevious = () => {
        if (currentTree > 0) {
            const prevTree = currentTree - 1
            setCurrentTree(prevTree)
            setFeatureImportance(generateFeatureImportance(prevTree))
        }
    }

    const handleReset = () => {
        setCurrentTree(0)
        setIsTraining(false)
        setFeatureImportance(generateFeatureImportance(0))
    }

    const currentData = trainingData[currentTree] || { tree: 0, oobError: 0, trainAccuracy: 0, valAccuracy: 0, treeDepth: 0, numLeaves: 0 }
    const visibleData = trainingData.slice(0, currentTree + 1)

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>🌲 Enhanced Random Forest Training - Ensemble Learning</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 mb-6">
                        Build a Random Forest tree-by-tree with full control over hyperparameters and watch ensemble performance improve.
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
                                        Number of Trees: {nEstimators}
                                    </label>
                                    <input
                                        type="range"
                                        min="10"
                                        max="200"
                                        step="10"
                                        value={nEstimators}
                                        onChange={(e) => setNEstimators(Number(e.target.value))}
                                        disabled={isTraining}
                                        className="w-full"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">More trees = better performance</p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium block mb-2">
                                        Max Depth: {maxDepth === 100 ? 'None' : maxDepth}
                                    </label>
                                    <input
                                        type="range"
                                        min="3"
                                        max="20"
                                        step="1"
                                        value={maxDepth}
                                        onChange={(e) => setMaxDepth(Number(e.target.value))}
                                        disabled={isTraining}
                                        className="w-full"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Maximum tree depth</p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium block mb-2">
                                        Min Samples Split: {minSamplesSplit}
                                    </label>
                                    <select
                                        value={minSamplesSplit}
                                        onChange={(e) => setMinSamplesSplit(Number(e.target.value))}
                                        disabled={isTraining}
                                        className="w-full border rounded px-3 py-2"
                                    >
                                        <option value={2}>2</option>
                                        <option value={5}>5</option>
                                        <option value={10}>10</option>
                                        <option value={20}>20</option>
                                    </select>
                                    <p className="text-xs text-gray-500 mt-1">Min samples to split node</p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium block mb-2">
                                        Max Features: {maxFeatures}
                                    </label>
                                    <select
                                        value={maxFeatures}
                                        onChange={(e) => setMaxFeatures(e.target.value as 'sqrt' | 'log2' | 'all')}
                                        disabled={isTraining}
                                        className="w-full border rounded px-3 py-2"
                                    >
                                        <option value="sqrt">sqrt (√n)</option>
                                        <option value="log2">log2 (log₂n)</option>
                                        <option value="all">all (n)</option>
                                    </select>
                                    <p className="text-xs text-gray-500 mt-1">Features per split</p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium block mb-2">
                                        Criterion: {criterion}
                                    </label>
                                    <select
                                        value={criterion}
                                        onChange={(e) => setCriterion(e.target.value as 'gini' | 'entropy')}
                                        disabled={isTraining}
                                        className="w-full border rounded px-3 py-2"
                                    >
                                        <option value="gini">Gini Impurity</option>
                                        <option value="entropy">Entropy (Information Gain)</option>
                                    </select>
                                    <p className="text-xs text-gray-500 mt-1">Split quality measure</p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium block mb-2">
                                        Bootstrap: {bootstrap ? 'Yes' : 'No'}
                                    </label>
                                    <button
                                        onClick={() => setBootstrap(!bootstrap)}
                                        disabled={isTraining}
                                        className={`w-full px-4 py-2 rounded font-medium transition-colors ${bootstrap
                                            ? 'bg-green-500 text-white hover:bg-green-600'
                                            : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                                            }`}
                                    >
                                        {bootstrap ? 'Enabled' : 'Disabled'}
                                    </button>
                                    <p className="text-xs text-gray-500 mt-1">Sample with replacement</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Training Controls */}
                    <div className="mb-6 bg-gray-50 rounded-xl p-4">
                        <h3 className="font-semibold text-lg mb-4">🎮 Training Controls</h3>
                        <div className="flex flex-wrap gap-3 items-center">
                            <Button onClick={handlePlayPause} className="flex items-center gap-2">
                                {isTraining ? <><Pause className="w-4 h-4" />Pause</> : <><Play className="w-4 h-4" />Build Forest</>}
                            </Button>
                            <Button onClick={handlePrevious} disabled={currentTree === 0 || isTraining} variant="outline">
                                <ChevronLeft className="w-4 h-4" />Previous
                            </Button>
                            <Button onClick={handleNext} disabled={currentTree >= nEstimators || isTraining} variant="outline">
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
                                <span className="font-medium">Tree {currentTree} / {nEstimators}</span>
                                <span className="text-gray-600">{((currentTree / nEstimators) * 100).toFixed(1)}% Complete</span>
                            </div>
                            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300"
                                    style={{ width: `${(currentTree / nEstimators) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    {/* Current Metrics */}
                    <div className="mb-6 grid grid-cols-2 md:grid-cols-5 gap-4">
                        <div className="p-4 bg-red-50 rounded-lg border-2 border-red-200">
                            <p className="text-xs text-gray-600 mb-1">OOB Error</p>
                            <p className="text-2xl font-bold text-red-700">{(currentData.oobError * 100).toFixed(1)}%</p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
                            <p className="text-xs text-gray-600 mb-1">Train Accuracy</p>
                            <p className="text-2xl font-bold text-green-700">{(currentData.trainAccuracy * 100).toFixed(1)}%</p>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                            <p className="text-xs text-gray-600 mb-1">Val Accuracy</p>
                            <p className="text-2xl font-bold text-blue-700">{(currentData.valAccuracy * 100).toFixed(1)}%</p>
                        </div>
                        <div className="p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                            <p className="text-xs text-gray-600 mb-1">Tree Depth</p>
                            <p className="text-2xl font-bold text-purple-700">{currentData.treeDepth}</p>
                        </div>
                        <div className="p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
                            <p className="text-xs text-gray-600 mb-1">Num Leaves</p>
                            <p className="text-2xl font-bold text-orange-700">{currentData.numLeaves}</p>
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
                                    <h4 className="font-semibold mb-3 text-center">OOB Error vs Number of Trees</h4>
                                    <ResponsiveContainer width="100%" height={250}>
                                        <LineChart data={visibleData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="tree" label={{ value: 'Number of Trees', position: 'insideBottom', offset: -5 }} />
                                            <YAxis label={{ value: 'OOB Error', angle: -90, position: 'insideLeft' }} />
                                            <Tooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey="oobError" stroke="#ef4444" name="OOB Error" strokeWidth={2} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className="bg-white p-4 rounded-lg border">
                                    <h4 className="font-semibold mb-3 text-center">Accuracy vs Number of Trees</h4>
                                    <ResponsiveContainer width="100%" height={250}>
                                        <LineChart data={visibleData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="tree" label={{ value: 'Number of Trees', position: 'insideBottom', offset: -5 }} />
                                            <YAxis label={{ value: 'Accuracy', angle: -90, position: 'insideLeft' }} />
                                            <Tooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey="trainAccuracy" stroke="#22c55e" name="Train Acc" strokeWidth={2} />
                                            <Line type="monotone" dataKey="valAccuracy" stroke="#3b82f6" name="Val Acc" strokeWidth={2} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className="bg-white p-4 rounded-lg border lg:col-span-2">
                                    <h4 className="font-semibold mb-3 text-center">Feature Importance (Tree {currentTree})</h4>
                                    <ResponsiveContainer width="100%" height={250}>
                                        <BarChart data={featureImportance}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="feature" />
                                            <YAxis label={{ value: 'Importance', angle: -90, position: 'insideLeft' }} />
                                            <Tooltip />
                                            <Bar dataKey="importance" fill="#22c55e" name="Importance">
                                                {featureImportance.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Bar>
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
                                            <th className="border px-4 py-3 text-left text-sm font-semibold">Tree #</th>
                                            <th className="border px-4 py-3 text-left text-sm font-semibold">OOB Error</th>
                                            <th className="border px-4 py-3 text-left text-sm font-semibold">Train Acc</th>
                                            <th className="border px-4 py-3 text-left text-sm font-semibold">Val Acc</th>
                                            <th className="border px-4 py-3 text-left text-sm font-semibold">Depth</th>
                                            <th className="border px-4 py-3 text-left text-sm font-semibold">Leaves</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {visibleData.slice(-10).reverse().map((data) => (
                                            <tr
                                                key={data.tree}
                                                className={`transition-all ${data.tree === currentTree
                                                    ? 'bg-green-100 border-l-4 border-l-green-600'
                                                    : 'hover:bg-gray-50'
                                                    }`}
                                            >
                                                <td className="border px-4 py-3">
                                                    <div className="flex items-center gap-2">
                                                        {data.tree === currentTree && (
                                                            <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                                                        )}
                                                        <span className="font-medium">{data.tree}</span>
                                                    </div>
                                                </td>
                                                <td className="border px-4 py-3 font-mono text-sm text-red-600">
                                                    {(data.oobError * 100).toFixed(1)}%
                                                </td>
                                                <td className="border px-4 py-3 font-mono text-sm text-green-600">
                                                    {(data.trainAccuracy * 100).toFixed(1)}%
                                                </td>
                                                <td className="border px-4 py-3 font-mono text-sm text-blue-600">
                                                    {(data.valAccuracy * 100).toFixed(1)}%
                                                </td>
                                                <td className="border px-4 py-3 font-mono text-sm text-purple-600">
                                                    {data.treeDepth}
                                                </td>
                                                <td className="border px-4 py-3 font-mono text-sm text-orange-600">
                                                    {data.numLeaves}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {visibleData.length > 10 && (
                                    <p className="text-xs text-gray-500 mt-2 text-center">
                                        Showing last 10 trees (Total: {visibleData.length})
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Mathematical Equations */}
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                        <h4 className="font-semibold text-green-900 mb-3">📐 Random Forest Equations</h4>
                        <div className="space-y-4 overflow-x-auto">
                            {criterion === 'gini' ? (
                                <div>
                                    <p className="text-sm font-semibold mb-2">Gini Impurity:</p>
                                    <BlockMath math="\text{Gini}(D) = 1 - \sum_{i=1}^{C} p_i^2" />
                                    <p className="text-xs text-gray-600 mt-2">
                                        where p_i is the proportion of class i in dataset D
                                    </p>
                                </div>
                            ) : (
                                <div>
                                    <p className="text-sm font-semibold mb-2">Entropy (Information Gain):</p>
                                    <BlockMath math="\text{Entropy}(D) = -\sum_{i=1}^{C} p_i \log_2(p_i)" />
                                    <p className="text-xs text-gray-600 mt-2">
                                        where p_i is the proportion of class i in dataset D
                                    </p>
                                </div>
                            )}
                            <div>
                                <p className="text-sm font-semibold mb-2">Information Gain:</p>
                                <BlockMath math="\text{IG}(D, A) = \text{Impurity}(D) - \sum_{v \in \text{Values}(A)} \frac{|D_v|}{|D|} \text{Impurity}(D_v)" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold mb-2">Out-of-Bag (OOB) Error:</p>
                                <BlockMath math="\text{OOB Error} = \frac{1}{N} \sum_{i=1}^{N} \mathbb{1}[\hat{y}_i^{\text{OOB}} \neq y_i]" />
                                <p className="text-xs text-gray-600 mt-2">
                                    Estimated using samples not in bootstrap sample (~37% of data)
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-semibold mb-2">Ensemble Prediction (Classification):</p>
                                <BlockMath math="\hat{y} = \text{mode}\{h_1(x), h_2(x), ..., h_T(x)\}" />
                                <p className="text-xs text-gray-600 mt-2">
                                    Majority vote from T trees
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-semibold mb-2">Feature Importance:</p>
                                <BlockMath math="\text{Importance}(f) = \frac{1}{T} \sum_{t=1}^{T} \sum_{n \in \text{splits on } f} \Delta \text{Impurity}_n" />
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                        <h4 className="font-semibold text-blue-900 mb-2">💡 Understanding Random Forest</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                            <li>• <strong>Ensemble Method</strong>: Combines multiple decision trees for better predictions</li>
                            <li>• <strong>Bootstrap Aggregating (Bagging)</strong>: Each tree trained on random sample with replacement</li>
                            <li>• <strong>Random Feature Selection</strong>: Each split considers random subset of features</li>
                            <li>• <strong>OOB Error</strong>: Built-in validation using out-of-bag samples (~37% per tree)</li>
                            <li>• <strong>Feature Importance</strong>: Measures how much each feature contributes to predictions</li>
                            <li>• <strong>Bias-Variance Tradeoff</strong>: More trees reduce variance without increasing bias</li>
                            <li>• <strong>Advantages</strong>: Robust to overfitting, handles missing data, works with mixed data types</li>
                            <li>• <strong>Use Cases</strong>: Classification, regression, feature selection, outlier detection</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
