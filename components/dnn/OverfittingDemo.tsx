'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from 'recharts'

export function OverfittingDemo() {
    const [modelComplexity, setModelComplexity] = useState(3)
    const [datasetSize, setDatasetSize] = useState(100)

    // Generate synthetic data points
    const generateDataPoints = () => {
        return Array.from({ length: datasetSize }, (_, i) => {
            const x = (i / datasetSize) * 10
            const y = Math.sin(x) + (Math.random() - 0.5) * 0.5
            return { x, y }
        })
    }

    // Generate model predictions
    const generatePredictions = () => {
        return Array.from({ length: 100 }, (_, i) => {
            const x = (i / 100) * 10
            let y = Math.sin(x)

            // Add complexity based on model
            if (modelComplexity > 3) {
                y += Math.sin(x * 3) * 0.3 * (modelComplexity - 3) / 7
            }
            if (modelComplexity > 6) {
                y += Math.sin(x * 5) * 0.2 * (modelComplexity - 6) / 4
            }

            return { x, prediction: y }
        })
    }

    // Training curves based on complexity
    const generateTrainingCurves = () => {
        return Array.from({ length: 50 }, (_, i) => {
            const epoch = i + 1
            const baseTrainLoss = 2 * Math.exp(-epoch * 0.1)
            const baseValLoss = 2 * Math.exp(-epoch * 0.08)

            // Adjust based on complexity
            const complexityFactor = (modelComplexity - 5) / 5
            const trainLoss = baseTrainLoss * (1 - complexityFactor * 0.3) + 0.05
            const valLoss = baseValLoss * (1 + complexityFactor * 0.5) + 0.1

            return {
                epoch,
                trainLoss: Math.max(0.05, trainLoss),
                valLoss: Math.max(0.1, valLoss)
            }
        })
    }

    const dataPoints = generateDataPoints()
    const predictions = generatePredictions()
    const trainingCurves = generateTrainingCurves()

    const getComplexityLabel = () => {
        if (modelComplexity <= 3) return 'Underfitting'
        if (modelComplexity <= 6) return 'Good Fit'
        return 'Overfitting'
    }

    const getComplexityColor = () => {
        if (modelComplexity <= 3) return 'blue'
        if (modelComplexity <= 6) return 'green'
        return 'red'
    }

    return (
        <div className="space-y-4 sm:space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Bias-Variance Tradeoff</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm sm:text-base text-gray-600 mb-6">
                        Explore the balance between model complexity and generalization. Too simple models underfit,
                        too complex models overfit. Find the sweet spot for optimal performance.
                    </p>

                    <div className="space-y-6">
                        {/* Controls */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Slider
                                    label={`Model Complexity: ${modelComplexity} (${getComplexityLabel()})`}
                                    value={modelComplexity}
                                    onChange={setModelComplexity}
                                    min={1}
                                    max={10}
                                    step={1}
                                />
                            </div>
                            <div>
                                <Slider
                                    label={`Training Data Size: ${datasetSize} samples`}
                                    value={datasetSize}
                                    onChange={setDatasetSize}
                                    min={20}
                                    max={200}
                                    step={10}
                                />
                            </div>
                        </div>

                        {/* Status indicator */}
                        <div className={`p-4 rounded-lg bg-${getComplexityColor()}-50 border-2 border-${getComplexityColor()}-300`}>
                            <h4 className={`font-semibold text-${getComplexityColor()}-900 mb-2 text-sm`}>
                                Current State: {getComplexityLabel()}
                            </h4>
                            <p className={`text-xs text-${getComplexityColor()}-700`}>
                                {modelComplexity <= 3 && 'Model is too simple to capture the underlying pattern. Increase complexity.'}
                                {modelComplexity > 3 && modelComplexity <= 6 && 'Model complexity is well-balanced. Good generalization expected.'}
                                {modelComplexity > 6 && 'Model is too complex and memorizing training data. Reduce complexity or add regularization.'}
                            </p>
                        </div>

                        {/* Visualizations */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Model Fit */}
                            <div>
                                <h3 className="font-semibold mb-4 text-sm sm:text-base">Model Fit to Data</h3>
                                <ResponsiveContainer width="100%" height={250}>
                                    <ScatterChart>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="x" domain={[0, 10]} />
                                        <YAxis domain={[-2, 2]} />
                                        <Tooltip />
                                        <Scatter name="Training Data" data={dataPoints} fill="#3b82f6" />
                                        <Line
                                            type="monotone"
                                            dataKey="prediction"
                                            data={predictions}
                                            stroke="#ef4444"
                                            strokeWidth={2}
                                            dot={false}
                                            name="Model Prediction"
                                        />
                                    </ScatterChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Training Curves */}
                            <div>
                                <h3 className="font-semibold mb-4 text-sm sm:text-base">Training vs Validation Loss</h3>
                                <ResponsiveContainer width="100%" height={250}>
                                    <LineChart data={trainingCurves}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="epoch" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="trainLoss" stroke="#3b82f6" name="Train Loss" strokeWidth={2} />
                                        <Line type="monotone" dataKey="valLoss" stroke="#ef4444" name="Val Loss" strokeWidth={2} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Understanding the Tradeoff</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <div className="text-2xl mb-2">📉</div>
                            <h4 className="font-semibold text-blue-900 mb-2 text-sm">Underfitting (High Bias)</h4>
                            <p className="text-xs text-blue-700 mb-2">
                                Model is too simple to capture patterns
                            </p>
                            <ul className="text-xs text-blue-600 list-disc list-inside space-y-1">
                                <li>High training error</li>
                                <li>High validation error</li>
                                <li>Poor performance overall</li>
                            </ul>
                        </div>

                        <div className="p-4 bg-green-50 rounded-lg">
                            <div className="text-2xl mb-2">✅</div>
                            <h4 className="font-semibold text-green-900 mb-2 text-sm">Good Fit (Balanced)</h4>
                            <p className="text-xs text-green-700 mb-2">
                                Model captures patterns without memorizing
                            </p>
                            <ul className="text-xs text-green-600 list-disc list-inside space-y-1">
                                <li>Low training error</li>
                                <li>Low validation error</li>
                                <li>Good generalization</li>
                            </ul>
                        </div>

                        <div className="p-4 bg-red-50 rounded-lg">
                            <div className="text-2xl mb-2">📈</div>
                            <h4 className="font-semibold text-red-900 mb-2 text-sm">Overfitting (High Variance)</h4>
                            <p className="text-xs text-red-700 mb-2">
                                Model memorizes training data
                            </p>
                            <ul className="text-xs text-red-600 list-disc list-inside space-y-1">
                                <li>Very low training error</li>
                                <li>High validation error</li>
                                <li>Poor generalization</li>
                            </ul>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="p-4 bg-purple-50 rounded-lg">
                            <h4 className="font-semibold text-purple-900 mb-3 text-sm">Solutions to Overfitting:</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="flex items-start gap-2">
                                    <span className="text-purple-600">•</span>
                                    <div>
                                        <p className="text-xs font-semibold text-purple-900">More Training Data</p>
                                        <p className="text-xs text-purple-700">Collect more diverse examples</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-purple-600">•</span>
                                    <div>
                                        <p className="text-xs font-semibold text-purple-900">Regularization</p>
                                        <p className="text-xs text-purple-700">L1, L2, or elastic net penalties</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-purple-600">•</span>
                                    <div>
                                        <p className="text-xs font-semibold text-purple-900">Dropout</p>
                                        <p className="text-xs text-purple-700">Randomly deactivate neurons</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-purple-600">•</span>
                                    <div>
                                        <p className="text-xs font-semibold text-purple-900">Early Stopping</p>
                                        <p className="text-xs text-purple-700">Stop when validation loss increases</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-purple-600">•</span>
                                    <div>
                                        <p className="text-xs font-semibold text-purple-900">Reduce Complexity</p>
                                        <p className="text-xs text-purple-700">Fewer layers or neurons</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-purple-600">•</span>
                                    <div>
                                        <p className="text-xs font-semibold text-purple-900">Data Augmentation</p>
                                        <p className="text-xs text-purple-700">Create variations of training data</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                            <h4 className="font-semibold text-yellow-900 mb-2 text-sm">💡 Key Insights</h4>
                            <ul className="text-xs text-yellow-700 space-y-1 list-disc list-inside">
                                <li>Always split data into train/validation/test sets</li>
                                <li>Monitor both training and validation metrics</li>
                                <li>Use cross-validation for robust evaluation</li>
                                <li>Start simple and add complexity gradually</li>
                                <li>Regularization is often better than reducing model size</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
