'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { InteractiveCanvas, DataPoint } from '@/components/interactive/InteractiveCanvas'
import { ChallengeCard, Challenge } from '@/components/interactive/ChallengeCard'
import { Info, Target, Zap } from 'lucide-react'
import { InlineMath, BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'

export function EnhancedBoundaryPlayground() {
    const [points, setPoints] = useState<DataPoint[]>([])
    const [threshold, setThreshold] = useState(0.5)
    const [completedChallenges, setCompletedChallenges] = useState<string[]>([])

    const challenges: Challenge[] = [
        {
            id: 'first-boundary',
            title: 'Create Decision Boundary',
            description: 'Add at least 10 points (5 of each class) and observe the logistic regression boundary.',
            difficulty: 'easy',
            hints: [
                'Click to add red and blue points',
                'Try to separate them clearly',
                'The boundary will appear automatically'
            ],
            successCriteria: 'Have at least 10 points with both classes',
            points: 10
        },
        {
            id: 'threshold-experiment',
            title: 'Adjust Classification Threshold',
            description: 'Experiment with different threshold values and see how it affects classification.',
            difficulty: 'medium',
            hints: [
                'Use the threshold slider',
                'Try values from 0.3 to 0.7',
                'Observe how the boundary shifts'
            ],
            successCriteria: 'Adjust threshold at least 3 times',
            points: 20
        },
        {
            id: 'complex-boundary',
            title: 'Non-Linear Patterns',
            description: 'Create a dataset that would benefit from polynomial features.',
            difficulty: 'hard',
            hints: [
                'Try circular or curved patterns',
                'Linear boundary may not fit well',
                'This shows the limitation of linear models'
            ],
            successCriteria: 'Create a non-linearly separable dataset',
            points: 30
        }
    ]

    const checkChallengeSuccess = (challengeId: string) => {
        switch (challengeId) {
            case 'first-boundary':
                return points.length >= 10 && points.some(p => p.class === 0) && points.some(p => p.class === 1)
            case 'threshold-experiment':
                return points.length >= 10
            case 'complex-boundary':
                return points.length >= 15
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
                        Interactive Logistic Regression - Learn by Doing!
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
                                    <p>Add points and watch logistic regression find the optimal decision boundary!</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                <div className="lg:col-span-2">
                                    <InteractiveCanvas
                                        width={600}
                                        height={400}
                                        onPointsChange={setPoints}
                                        initialPoints={points}
                                        numClasses={2}
                                        classColors={['#ef4444', '#3b82f6']}
                                        instructions="Click to add points and see the decision boundary"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <div className="p-4 bg-white rounded-lg border border-gray-200">
                                        <Slider
                                            label="Classification Threshold"
                                            value={threshold}
                                            onChange={setThreshold}
                                            min={0.1}
                                            max={0.9}
                                            step={0.05}
                                        />
                                        <p className="text-xs text-gray-600 mt-2">
                                            Current: {threshold.toFixed(2)}
                                        </p>
                                    </div>

                                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                                        <p className="text-sm font-semibold text-purple-900 mb-2">Statistics</p>
                                        <div className="space-y-1 text-xs text-purple-800">
                                            <p>Total points: {points.length}</p>
                                            <p>Class 0 (Red): {points.filter(p => p.class === 0).length}</p>
                                            <p>Class 1 (Blue): {points.filter(p => p.class === 1).length}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="learn" className="space-y-4">
                            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                                <h3 className="text-lg font-semibold mb-3">How Logistic Regression Works</h3>

                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm font-semibold mb-2">1. Sigmoid Function</p>
                                        <div className="overflow-x-auto bg-white p-3 rounded">
                                            <BlockMath math="\sigma(z) = \frac{1}{1 + e^{-z}}" />
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold mb-2">2. Linear Combination</p>
                                        <div className="overflow-x-auto bg-white p-3 rounded">
                                            <BlockMath math="z = w_1x_1 + w_2x_2 + ... + w_nx_n + b" />
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold mb-2">3. Probability Prediction</p>
                                        <div className="overflow-x-auto bg-white p-3 rounded">
                                            <BlockMath math="P(y=1|x) = \sigma(w^Tx + b)" />
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold mb-2">4. Log Loss (Cross-Entropy)</p>
                                        <div className="overflow-x-auto bg-white p-3 rounded">
                                            <BlockMath math="L = -\frac{1}{m}\sum_{i=1}^{m}[y_i\log(\hat{y}_i) + (1-y_i)\log(1-\hat{y}_i)]" />
                                        </div>
                                    </div>

                                    <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                                        <p className="text-sm font-semibold text-yellow-900 mb-1">💡 Key Insight</p>
                                        <p className="text-sm text-yellow-800">
                                            Logistic regression outputs probabilities between 0 and 1, making it perfect for binary classification!
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                    <p className="text-sm font-semibold text-green-900 mb-2">✅ Advantages</p>
                                    <ul className="text-sm text-green-800 space-y-1 list-disc list-inside">
                                        <li>Probabilistic interpretation</li>
                                        <li>Fast training and prediction</li>
                                        <li>Works well with linearly separable data</li>
                                        <li>Less prone to overfitting</li>
                                    </ul>
                                </div>
                                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                                    <p className="text-sm font-semibold text-red-900 mb-2">⚠️ Limitations</p>
                                    <ul className="text-sm text-red-800 space-y-1 list-disc list-inside">
                                        <li>Assumes linear decision boundary</li>
                                        <li>Sensitive to outliers</li>
                                        <li>Requires feature scaling</li>
                                        <li>Not suitable for complex patterns</li>
                                    </ul>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="challenge" className="space-y-4">
                            <div className="flex items-start gap-2 p-3 bg-purple-50 rounded-lg border border-purple-200">
                                <Target className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                                <div className="text-sm text-purple-800">
                                    <p className="font-semibold mb-1">Challenge Mode</p>
                                    <p>Complete these challenges to master logistic regression!</p>
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
                                            You've completed all Logistic Regression challenges!
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
