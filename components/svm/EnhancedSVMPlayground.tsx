'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { InteractiveCanvas, DataPoint } from '@/components/interactive/InteractiveCanvas'
import { ChallengeCard, Challenge } from '@/components/interactive/ChallengeCard'
import { Info, Target, Zap, Maximize2 } from 'lucide-react'
import { InlineMath, BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'

interface SVMResult {
    supportVectors: DataPoint[]
    margin: number
    w: { x: number, y: number }
    b: number
}

export function EnhancedSVMPlayground() {
    const [points, setPoints] = useState<DataPoint[]>([])
    const [kernel, setKernel] = useState<'linear' | 'rbf'>('linear')
    const [C, setC] = useState(1.0)
    const [gamma, setGamma] = useState(0.5)
    const [svmResult, setSvmResult] = useState<SVMResult | null>(null)
    const [completedChallenges, setCompletedChallenges] = useState<string[]>([])
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (points.length >= 4) {
            trainSVM()
        }
    }, [points, kernel, C, gamma])

    useEffect(() => {
        drawDecisionBoundary()
    }, [svmResult, points])

    const trainSVM = () => {
        // Simplified SVM for demonstration
        const class0 = points.filter(p => p.class === 0)
        const class1 = points.filter(p => p.class === 1)

        if (class0.length === 0 || class1.length === 0) return

        // Calculate mean centers
        const mean0 = {
            x: class0.reduce((sum, p) => sum + p.x, 0) / class0.length,
            y: class0.reduce((sum, p) => sum + p.y, 0) / class0.length
        }
        const mean1 = {
            x: class1.reduce((sum, p) => sum + p.x, 0) / class1.length,
            y: class1.reduce((sum, p) => sum + p.y, 0) / class1.length
        }

        // Calculate separating hyperplane (simplified)
        const w = {
            x: mean1.x - mean0.x,
            y: mean1.y - mean0.y
        }
        const norm = Math.sqrt(w.x ** 2 + w.y ** 2)
        w.x /= norm
        w.y /= norm

        const b = -(w.x * (mean0.x + mean1.x) / 2 + w.y * (mean0.y + mean1.y) / 2)

        // Find support vectors (points closest to boundary)
        const distances = points.map(p => ({
            point: p,
            distance: Math.abs(w.x * p.x + w.y * p.y + b)
        }))
        distances.sort((a, b) => a.distance - b.distance)
        const supportVectors = distances.slice(0, Math.min(6, distances.length)).map(d => d.point)

        // Calculate margin
        const margin = distances[0]?.distance || 0

        setSvmResult({ supportVectors, margin, w, b })
    }

    const drawDecisionBoundary = () => {
        const canvas = canvasRef.current
        if (!canvas || !svmResult) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        ctx.clearRect(0, 0, 600, 400)

        // Draw grid
        ctx.strokeStyle = '#e5e7eb'
        ctx.lineWidth = 1
        for (let i = 0; i <= 600; i += 50) {
            ctx.beginPath()
            ctx.moveTo(i, 0)
            ctx.lineTo(i, 400)
            ctx.stroke()
        }
        for (let i = 0; i <= 400; i += 50) {
            ctx.beginPath()
            ctx.moveTo(0, i)
            ctx.lineTo(600, i)
            ctx.stroke()
        }

        // Draw decision boundary
        const { w, b } = svmResult
        if (Math.abs(w.y) > 0.001) {
            const x1 = 0
            const y1 = -(w.x * x1 + b) / w.y
            const x2 = 600
            const y2 = -(w.x * x2 + b) / w.y

            // Main boundary
            ctx.strokeStyle = '#8b5cf6'
            ctx.lineWidth = 3
            ctx.beginPath()
            ctx.moveTo(x1, y1)
            ctx.lineTo(x2, y2)
            ctx.stroke()

            // Margin boundaries
            const margin = svmResult.margin * 50 // Scale for visualization
            ctx.strokeStyle = '#8b5cf6'
            ctx.lineWidth = 1
            ctx.setLineDash([5, 5])

            // Upper margin
            const offset = margin / Math.sqrt(w.x ** 2 + w.y ** 2)
            const y1_upper = y1 - offset * w.x
            const y2_upper = y2 - offset * w.x
            ctx.beginPath()
            ctx.moveTo(x1, y1_upper)
            ctx.lineTo(x2, y2_upper)
            ctx.stroke()

            // Lower margin
            const y1_lower = y1 + offset * w.x
            const y2_lower = y2 + offset * w.x
            ctx.beginPath()
            ctx.moveTo(x1, y1_lower)
            ctx.lineTo(x2, y2_lower)
            ctx.stroke()

            ctx.setLineDash([])
        }

        // Draw points
        points.forEach(point => {
            const isSupportVector = svmResult.supportVectors.some(sv => sv.id === point.id)

            ctx.fillStyle = point.class === 0 ? '#ef4444' : '#3b82f6'
            ctx.beginPath()
            ctx.arc(point.x, point.y, isSupportVector ? 10 : 6, 0, 2 * Math.PI)
            ctx.fill()

            if (isSupportVector) {
                ctx.strokeStyle = '#000'
                ctx.lineWidth = 2
                ctx.stroke()
            }
        })
    }

    const handlePointsChange = (newPoints: DataPoint[]) => {
        setPoints(newPoints)
    }

    const challenges: Challenge[] = [
        {
            id: 'first-svm',
            title: 'Create Your First SVM',
            description: 'Add at least 6 points (3 of each class) and watch SVM find the optimal separating hyperplane.',
            difficulty: 'easy',
            hints: [
                'Click to add red and blue points',
                'Try to place them in two separate groups',
                'The algorithm will find the best line to separate them'
            ],
            successCriteria: 'Have at least 6 points with both classes represented',
            points: 10
        },
        {
            id: 'maximize-margin',
            title: 'Maximize the Margin',
            description: 'Create a dataset where the margin (distance between classes) is as large as possible.',
            difficulty: 'medium',
            hints: [
                'Place points far apart from each other',
                'Keep classes well separated',
                'The margin is the distance between the decision boundary and nearest points'
            ],
            successCriteria: 'Create a dataset with clear separation',
            points: 20
        },
        {
            id: 'support-vectors',
            title: 'Identify Support Vectors',
            description: 'Create a dataset and identify which points become support vectors (marked with black circles).',
            difficulty: 'medium',
            hints: [
                'Support vectors are the points closest to the decision boundary',
                'They have black circles around them',
                'Only a few points typically become support vectors'
            ],
            successCriteria: 'Have at least 3 support vectors identified',
            points: 15
        },
        {
            id: 'non-linear',
            title: 'Non-Linear Separation',
            description: 'Create a dataset that cannot be separated by a straight line, then switch to RBF kernel.',
            difficulty: 'hard',
            hints: [
                'Try creating overlapping or circular patterns',
                'Linear kernel will struggle with this',
                'Switch to RBF kernel to see non-linear separation'
            ],
            successCriteria: 'Use RBF kernel with a non-linearly separable dataset',
            points: 30
        }
    ]

    const checkChallengeSuccess = (challengeId: string) => {
        switch (challengeId) {
            case 'first-svm':
                return points.length >= 6 &&
                    points.some(p => p.class === 0) &&
                    points.some(p => p.class === 1)
            case 'maximize-margin':
                return svmResult !== null && svmResult.margin > 0.5
            case 'support-vectors':
                return svmResult !== null && svmResult.supportVectors.length >= 3
            case 'non-linear':
                return kernel === 'rbf' && points.length >= 10
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
                        Interactive SVM Playground - Learn by Doing!
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
                                    <p>Click to add points and watch SVM find the optimal decision boundary with maximum margin!</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                <div className="lg:col-span-2 space-y-4">
                                    <div className="relative">
                                        <canvas
                                            ref={canvasRef}
                                            width={600}
                                            height={400}
                                            className="border-2 border-gray-300 rounded-lg bg-white absolute top-0 left-0 pointer-events-none"
                                        />
                                        <InteractiveCanvas
                                            width={600}
                                            height={400}
                                            onPointsChange={handlePointsChange}
                                            initialPoints={points}
                                            numClasses={2}
                                            classColors={['#ef4444', '#3b82f6']}
                                            instructions="Add points to see SVM decision boundary"
                                            showGrid={false}
                                        />
                                    </div>

                                    {svmResult && (
                                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                            <p className="text-sm font-semibold text-green-900 mb-2">SVM Results:</p>
                                            <div className="grid grid-cols-2 gap-3 text-sm text-green-800">
                                                <div>
                                                    <span className="font-medium">Support Vectors:</span> {svmResult.supportVectors.length}
                                                </div>
                                                <div>
                                                    <span className="font-medium">Margin:</span> {svmResult.margin.toFixed(3)}
                                                </div>
                                                <div className="col-span-2">
                                                    <span className="font-medium">Kernel:</span> {kernel.toUpperCase()}
                                                </div>
                                            </div>
                                            <p className="text-xs text-green-700 mt-2">
                                                Points with black circles are support vectors - they define the decision boundary!
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    <div className="p-4 bg-white rounded-lg border border-gray-200">
                                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                                            <Maximize2 className="w-4 h-4" />
                                            SVM Parameters
                                        </h4>

                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-sm font-medium mb-2">Kernel Type</p>
                                                <div className="space-y-2">
                                                    <button
                                                        onClick={() => setKernel('linear')}
                                                        className={`w-full p-2 text-sm rounded-lg border-2 transition-all ${kernel === 'linear'
                                                                ? 'border-purple-500 bg-purple-50'
                                                                : 'border-gray-200'
                                                            }`}
                                                    >
                                                        Linear (straight line)
                                                    </button>
                                                    <button
                                                        onClick={() => setKernel('rbf')}
                                                        className={`w-full p-2 text-sm rounded-lg border-2 transition-all ${kernel === 'rbf'
                                                                ? 'border-purple-500 bg-purple-50'
                                                                : 'border-gray-200'
                                                            }`}
                                                    >
                                                        RBF (curved boundary)
                                                    </button>
                                                </div>
                                            </div>

                                            <Slider
                                                label="C (Regularization)"
                                                value={C}
                                                onChange={setC}
                                                min={0.1}
                                                max={10}
                                                step={0.1}
                                            />

                                            {kernel === 'rbf' && (
                                                <Slider
                                                    label="Gamma (RBF width)"
                                                    value={gamma}
                                                    onChange={setGamma}
                                                    min={0.1}
                                                    max={2}
                                                    step={0.1}
                                                />
                                            )}
                                        </div>
                                    </div>

                                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                                        <p className="text-sm font-semibold text-purple-900 mb-2">Statistics</p>
                                        <div className="space-y-1 text-xs text-purple-800">
                                            <p>Total points: {points.length}</p>
                                            <p>Class 0 (Red): {points.filter(p => p.class === 0).length}</p>
                                            <p>Class 1 (Blue): {points.filter(p => p.class === 1).length}</p>
                                            {svmResult && (
                                                <p className="pt-2 border-t border-purple-200">
                                                    Support vectors: {svmResult.supportVectors.length}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                                        <p className="text-sm font-semibold text-yellow-900 mb-2">💡 Try This</p>
                                        <ul className="text-xs text-yellow-800 space-y-1 list-disc list-inside">
                                            <li>Add points close to the boundary</li>
                                            <li>See which become support vectors</li>
                                            <li>Try different kernel types</li>
                                            <li>Adjust C to see margin changes</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="learn" className="space-y-4">
                            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                                <h3 className="text-lg font-semibold mb-3">How Support Vector Machines Work</h3>

                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm font-semibold mb-2">1. The Optimization Problem</p>
                                        <p className="text-sm text-gray-700 mb-2">
                                            SVM finds the hyperplane that maximizes the margin between classes:
                                        </p>
                                        <div className="overflow-x-auto bg-white p-3 rounded">
                                            <BlockMath math="\min_{w,b} \frac{1}{2}||w||^2 + C\sum_{i=1}^{n}\xi_i" />
                                        </div>
                                        <p className="text-xs text-gray-600 mt-2">
                                            Subject to: <InlineMath math="y_i(w \cdot x_i + b) \geq 1 - \xi_i" />
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold mb-2">2. Decision Function</p>
                                        <p className="text-sm text-gray-700 mb-2">
                                            Classification is based on which side of the hyperplane a point falls:
                                        </p>
                                        <div className="overflow-x-auto bg-white p-3 rounded">
                                            <BlockMath math="f(x) = \text{sign}(w \cdot x + b)" />
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold mb-2">3. Kernel Trick</p>
                                        <p className="text-sm text-gray-700 mb-2">
                                            For non-linear separation, use kernel functions:
                                        </p>
                                        <div className="overflow-x-auto bg-white p-3 rounded mb-2">
                                            <p className="text-xs font-semibold mb-1">Linear Kernel:</p>
                                            <BlockMath math="K(x_i, x_j) = x_i \cdot x_j" />
                                        </div>
                                        <div className="overflow-x-auto bg-white p-3 rounded">
                                            <p className="text-xs font-semibold mb-1">RBF Kernel:</p>
                                            <BlockMath math="K(x_i, x_j) = e^{-\gamma||x_i - x_j||^2}" />
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold mb-2">4. Support Vectors</p>
                                        <p className="text-sm text-gray-700">
                                            Only the points closest to the decision boundary (support vectors) matter.
                                            These points define the optimal hyperplane and have <InlineMath math="\alpha_i > 0" /> in the dual formulation.
                                        </p>
                                    </div>

                                    <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                                        <p className="text-sm font-semibold text-yellow-900 mb-1">💡 Key Insight</p>
                                        <p className="text-sm text-yellow-800">
                                            SVM finds the "widest street" between classes. The margin is the width of this street,
                                            and support vectors are the points on the edge of the street!
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                    <p className="text-sm font-semibold text-green-900 mb-2">✅ Advantages</p>
                                    <ul className="text-sm text-green-800 space-y-1 list-disc list-inside">
                                        <li>Effective in high dimensions</li>
                                        <li>Memory efficient (uses support vectors)</li>
                                        <li>Versatile (different kernels)</li>
                                        <li>Works well with clear margins</li>
                                    </ul>
                                </div>
                                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                                    <p className="text-sm font-semibold text-red-900 mb-2">⚠️ Limitations</p>
                                    <ul className="text-sm text-red-800 space-y-1 list-disc list-inside">
                                        <li>Slow with large datasets</li>
                                        <li>Sensitive to noise</li>
                                        <li>Requires feature scaling</li>
                                        <li>Difficult to interpret</li>
                                    </ul>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="challenge" className="space-y-4">
                            <div className="flex items-start gap-2 p-3 bg-purple-50 rounded-lg border border-purple-200">
                                <Target className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                                <div className="text-sm text-purple-800">
                                    <p className="font-semibold mb-1">Challenge Mode</p>
                                    <p>Complete these challenges to master SVM! Experiment with margins, support vectors, and kernels.</p>
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
                                            You've completed all SVM challenges!
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
