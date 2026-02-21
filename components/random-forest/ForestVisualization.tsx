'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Play, RotateCcw } from 'lucide-react'

export function ForestVisualization() {
    const [numTrees, setNumTrees] = useState(5)
    const [isAnimating, setIsAnimating] = useState(false)
    const [predictions, setPredictions] = useState<string[]>([])

    const animate = () => {
        setIsAnimating(true)
        setPredictions([])

        const preds: string[] = []
        let count = 0
        const interval = setInterval(() => {
            const pred = Math.random() > 0.4 ? 'Yes' : 'No'
            preds.push(pred)
            setPredictions([...preds])
            count++

            if (count >= numTrees) {
                clearInterval(interval)
                setIsAnimating(false)
            }
        }, 500)
    }

    const finalPrediction = predictions.length === numTrees
        ? predictions.filter(p => p === 'Yes').length > predictions.filter(p => p === 'No').length
            ? 'Yes'
            : 'No'
        : null

    return (
        <Card>
            <CardHeader>
                <CardTitle>Random Forest Visualization</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div className="bg-teal-50 border border-teal-200 rounded-xl p-6">
                        <h4 className="font-semibold text-teal-900 mb-3">How Random Forest Works</h4>
                        <ol className="text-sm text-gray-700 space-y-2">
                            <li>1. Create multiple decision trees (the "forest")</li>
                            <li>2. Each tree trains on a random subset of data (bootstrapping)</li>
                            <li>3. Each tree uses random subset of features at each split</li>
                            <li>4. All trees make predictions independently</li>
                            <li>5. Final prediction = majority vote (classification) or average (regression)</li>
                        </ol>
                    </div>

                    <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                        <div className="mb-6">
                            <Slider
                                label={`Number of Trees: ${numTrees}`}
                                value={numTrees}
                                onChange={setNumTrees}
                                min={3}
                                max={10}
                                step={1}
                            />
                        </div>

                        <div className="flex gap-3 mb-6">
                            <Button onClick={animate} disabled={isAnimating}>
                                <Play className="w-4 h-4 mr-2" />
                                Run Forest Prediction
                            </Button>
                            <Button onClick={() => setPredictions([])} variant="outline">
                                <RotateCcw className="w-4 h-4 mr-2" />
                                Reset
                            </Button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            {Array.from({ length: numTrees }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`p-4 rounded-xl border-2 transition-all ${predictions[i]
                                        ? predictions[i] === 'Yes'
                                            ? 'bg-green-50 border-green-500'
                                            : 'bg-red-50 border-red-500'
                                        : 'bg-gray-50 border-gray-200'
                                        }`}
                                >
                                    <div className="text-center">
                                        <div className="text-3xl mb-2">🌳</div>
                                        <p className="text-xs font-semibold mb-1">Tree {i + 1}</p>
                                        {predictions[i] && (
                                            <p className={`text-sm font-bold ${predictions[i] === 'Yes' ? 'text-green-600' : 'text-red-600'
                                                }`}>
                                                {predictions[i]}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {finalPrediction && (
                        <div className={`border-2 rounded-xl p-6 ${finalPrediction === 'Yes' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                            }`}>
                            <h4 className="font-semibold mb-3">Final Prediction (Majority Vote)</h4>
                            <p className="text-3xl font-bold mb-2">{finalPrediction}</p>
                            <p className="text-sm text-gray-700">
                                Yes votes: {predictions.filter(p => p === 'Yes').length} / {numTrees}
                            </p>
                            <p className="text-sm text-gray-700">
                                No votes: {predictions.filter(p => p === 'No').length} / {numTrees}
                            </p>
                        </div>
                    )}

                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                        <h4 className="font-semibold text-blue-900 mb-2">💡 Why Random Forest Works</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Reduces overfitting compared to single decision tree</li>
                            <li>• More robust to noise and outliers</li>
                            <li>• Handles missing values well</li>
                            <li>• Works for both classification and regression</li>
                            <li>• Provides feature importance rankings</li>
                        </ul>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
