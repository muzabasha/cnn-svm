'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { InteractiveCanvas, DataPoint } from '@/components/interactive/InteractiveCanvas'
import { ChallengeCard, Challenge } from '@/components/interactive/ChallengeCard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Info, Target, Zap } from 'lucide-react'
import { InlineMath, BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'

export function EnhancedInteractiveClassifier() {
    const [k, setK] = useState(3)
    const [points, setPoints] = useState<DataPoint[]>([])
    const [testPoint, setTestPoint] = useState<{ x: number, y: number } | null>(null)
    const [neighbors, setNeighbors] = useState<DataPoint[]>([])
    const [prediction, setPrediction] = useState<number | null>(null)
    const [distanceMetric, setDistanceMetric] = useState<'euclidean' | 'manhattan'>('euclidean')
    const [completedChallenges, setCompletedChallenges] = useState<string[]>([])

    const calculateDistance = (p1: { x: number, y: number }, p2: { x: number, y: number }) => {
        if (distanceMetric === 'euclidean') {
            return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
        } else {
            return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y)
        }
    }

    const classifyPoint = (testX: number, testY: number) => {
        if (points.length === 0) return

        // Calculate distances
        const distances = points.map(p => ({
            point: p,
            distance: calculateDistance({ x: testX, y: testY }, { x: p.x, y: p.y })
        }))

        // Sort by distance and get k nearest
        distances.sort((a, b) => a.distance - b.distance)
        const kNearest = distances.slice(0, Math.min(k, distances.length))

        setNeighbors(kNearest.map(d => d.point))

        // Vote
        const votes: { [key: number]: number } = {}
        kNearest.forEach(({ point }) => {
            votes[point.class] = (votes[point.class] || 0) + 1
        })

        const predictedClass = Object.entries(votes).reduce((a, b) =>
            votes[parseInt(a[0])] > votes[parseInt(b[0])] ? a : b
        )[0]

        setPrediction(parseInt(predictedClass))
        setTestPoint({ x: testX, y: testY })
    }

    const handlePointsChange = (newPoints: DataPoint[]) => {
        setPoints(newPoints)
        if (testPoint) {
            classifyPoint(testPoint.x, testPoint.y)
        }
    }

    const challenges: Challenge[] = [
        {
            id: 'first-classification',
            title: 'First Classification',
            description: 'Add at least 5 points of each class (red and blue), then click anywhere to classify a new point.',
            difficulty: 'easy',
            hints: [
                'Use the color buttons to switch between classes',
                'Click on the canvas to add points',
                'After adding points, click anywhere to see the classification'
            ],
            successCriteria: 'Have at least 10 training points and make 1 classification',
            points: 10
        },
        {
            id: 'k-value-experiment',
            title: 'The K Value Matters',
            description: 'Create a dataset where K=1 gives different results than K=5. Observe how K affects the decision boundary.',
            difficulty: 'medium',
            hints: [
                'Try creating clusters with some outliers',
                'Place a test point near an outlier',
                'Compare predictions with K=1 vs K=5'
            ],
            successCriteria: 'Make classifications with both K=1 and K=5 showing different results',
            points: 20
        },
        {
            id: 'overlapping-classes',
            title: 'Handle Overlapping Classes',
            description: 'Create a dataset where the two classes overlap significantly. Find the optimal K value that gives the best separation.',
            difficulty: 'hard',
            hints: [
                'Place red and blue points close together',
                'Try different K values (1, 3, 5, 7)',
                'Observe which K handles the overlap best'
            ],
            successCriteria: 'Create overlapping classes and test with at least 3 different K values',
            points: 30
        }
    ]

    const checkChallengeSuccess = (challengeId: string) => {
        switch (challengeId) {
            case 'first-classification':
                return points.length >= 10 && testPoint !== null
            case 'k-value-experiment':
                return points.length >= 15 && testPoint !== null
            case 'overlapping-classes':
                return points.length >= 20 && testPoint !== null
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
                        Interactive KNN Classifier - Learn by Doing!
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
                                    <p>Click to add training points (red/blue), then click anywhere to classify a new point. Watch how the K nearest neighbors vote!</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                <div className="lg:col-span-2">
                                    <InteractiveCanvas
                                        width={600}
                                        height={400}
                                        onPointsChange={handlePointsChange}
                                        initialPoints={points}
                                        numClasses={2}
                                        classColors={['#ef4444', '#3b82f6']}
                                        instructions="Left-click: Add/change class | Right-click: Delete | Click empty space: Classify"
                                    />

                                    {testPoint && (
                                        <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                                            <p className="text-sm font-semibold text-green-900 mb-2">
                                                Classification Result:
                                            </p>
                                            <p className="text-sm text-green-800">
                                                Test point at ({testPoint.x.toFixed(1)}, {testPoint.y.toFixed(1)}) is classified as{' '}
                                                <span className="font-bold" style={{ color: prediction === 0 ? '#ef4444' : '#3b82f6' }}>
                                                    Class {prediction}
                                                </span>
                                            </p>
                                            <p className="text-xs text-green-700 mt-1">
                                                Based on {neighbors.length} nearest neighbors
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    <div className="p-4 bg-white rounded-lg border border-gray-200">
                                        <Slider
                                            label="K (Number of Neighbors)"
                                            value={k}
                                            onChange={setK}
                                            min={1}
                                            max={Math.min(15, points.length || 15)}
                                            step={1}
                                        />
                                        <p className="text-xs text-gray-600 mt-2">
                                            Current K: {k}
                                        </p>
                                    </div>

                                    <div className="p-4 bg-white rounded-lg border border-gray-200">
                                        <p className="text-sm font-semibold mb-2">Distance Metric</p>
                                        <div className="space-y-2">
                                            <button
                                                onClick={() => setDistanceMetric('euclidean')}
                                                className={`w-full p-2 text-sm rounded-lg border-2 transition-all ${distanceMetric === 'euclidean'
                                                        ? 'border-blue-500 bg-blue-50'
                                                        : 'border-gray-200'
                                                    }`}
                                            >
                                                Euclidean (straight line)
                                            </button>
                                            <button
                                                onClick={() => setDistanceMetric('manhattan')}
                                                className={`w-full p-2 text-sm rounded-lg border-2 transition-all ${distanceMetric === 'manhattan'
                                                        ? 'border-blue-500 bg-blue-50'
                                                        : 'border-gray-200'
                                                    }`}
                                            >
                                                Manhattan (grid path)
                                            </button>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                                        <p className="text-sm font-semibold text-purple-900 mb-2">Statistics</p>
                                        <div className="space-y-1 text-xs text-purple-800">
                                            <p>Training points: {points.length}</p>
                                            <p>Class 0 (Red): {points.filter(p => p.class === 0).length}</p>
                                            <p>Class 1 (Blue): {points.filter(p => p.class === 1).length}</p>
                                            <p>Classifications made: {testPoint ? '1' : '0'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="learn" className="space-y-4">
                            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                                <h3 className="text-lg font-semibold mb-3">How K-Nearest Neighbors Works</h3>

                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm font-semibold mb-2">1. Distance Calculation</p>
                                        <p className="text-sm text-gray-700 mb-2">
                                            For each training point, calculate the distance to the test point:
                                        </p>
                                        <div className="overflow-x-auto bg-white p-3 rounded">
                                            <BlockMath math="d_{euclidean} = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}" />
                                        </div>
                                        <div className="overflow-x-auto bg-white p-3 rounded mt-2">
                                            <BlockMath math="d_{manhattan} = |x_2 - x_1| + |y_2 - y_1|" />
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold mb-2">2. Find K Nearest Neighbors</p>
                                        <p className="text-sm text-gray-700">
                                            Sort all training points by distance and select the <InlineMath math="K" /> closest ones.
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold mb-2">3. Majority Vote</p>
                                        <p className="text-sm text-gray-700 mb-2">
                                            Count the classes of the K neighbors and assign the most common class:
                                        </p>
                                        <div className="overflow-x-auto bg-white p-3 rounded">
                                            <BlockMath math="\text{predicted class} = \arg\max_{c} \sum_{i=1}^{K} \mathbb{1}(y_i = c)" />
                                        </div>
                                    </div>

                                    <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                                        <p className="text-sm font-semibold text-yellow-900 mb-1">💡 Key Insight</p>
                                        <p className="text-sm text-yellow-800">
                                            The choice of K is crucial: Small K (like 1) is sensitive to noise, while large K smooths the decision boundary but may ignore local patterns.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                    <p className="text-sm font-semibold text-green-900 mb-2">✅ Advantages</p>
                                    <ul className="text-sm text-green-800 space-y-1 list-disc list-inside">
                                        <li>Simple and intuitive</li>
                                        <li>No training phase</li>
                                        <li>Works with any number of classes</li>
                                        <li>Naturally handles multi-class problems</li>
                                    </ul>
                                </div>
                                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                                    <p className="text-sm font-semibold text-red-900 mb-2">⚠️ Limitations</p>
                                    <ul className="text-sm text-red-800 space-y-1 list-disc list-inside">
                                        <li>Slow for large datasets</li>
                                        <li>Sensitive to irrelevant features</li>
                                        <li>Requires choosing K</li>
                                        <li>Affected by imbalanced data</li>
                                    </ul>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="challenge" className="space-y-4">
                            <div className="flex items-start gap-2 p-3 bg-purple-50 rounded-lg border border-purple-200">
                                <Target className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                                <div className="text-sm text-purple-800">
                                    <p className="font-semibold mb-1">Challenge Mode</p>
                                    <p>Complete these challenges to master KNN! Each challenge tests a different aspect of the algorithm.</p>
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
                                            You've completed all KNN challenges!
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
