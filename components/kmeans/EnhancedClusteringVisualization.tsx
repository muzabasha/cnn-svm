'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { StepController } from '@/components/interactive/StepController'
import { ChallengeCard, Challenge } from '@/components/interactive/ChallengeCard'
import { Play, Pause, RotateCcw, Info, Target, Zap } from 'lucide-react'
import { InlineMath, BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'

interface Point {
    x: number
    y: number
    cluster: number
    id: string
}

interface Centroid {
    x: number
    y: number
    cluster: number
}

export function EnhancedClusteringVisualization() {
    const [k, setK] = useState(3)
    const [points, setPoints] = useState<Point[]>([])
    const [centroids, setCentroids] = useState<Centroid[]>([])
    const [iteration, setIteration] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [mode, setMode] = useState<'auto' | 'manual'>('auto')
    const [currentStep, setCurrentStep] = useState(0)
    const [completedChallenges, setCompletedChallenges] = useState<string[]>([])
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const colors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6']

    useEffect(() => {
        generateRandomData()
    }, [])

    useEffect(() => {
        drawCanvas()
    }, [points, centroids, mode])

    const generateRandomData = () => {
        const newPoints: Point[] = []
        // Generate 3 clusters
        for (let cluster = 0; cluster < 3; cluster++) {
            const centerX = 100 + cluster * 200 + Math.random() * 50
            const centerY = 200 + Math.random() * 100
            for (let i = 0; i < 20; i++) {
                newPoints.push({
                    x: centerX + (Math.random() - 0.5) * 80,
                    y: centerY + (Math.random() - 0.5) * 80,
                    cluster: 0,
                    id: `point-${cluster}-${i}`
                })
            }
        }
        setPoints(newPoints)
        initializeCentroids(newPoints, k)
        setIteration(0)
        setCurrentStep(0)
    }

    const initializeCentroids = (dataPoints: Point[], numClusters: number) => {
        const newCentroids: Centroid[] = []
        const shuffled = [...dataPoints].sort(() => Math.random() - 0.5)
        for (let i = 0; i < numClusters; i++) {
            if (shuffled[i]) {
                newCentroids.push({
                    x: shuffled[i].x,
                    y: shuffled[i].y,
                    cluster: i
                })
            }
        }
        setCentroids(newCentroids)
    }

    const drawCanvas = () => {
        const canvas = canvasRef.current
        if (!canvas) return

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

        // Draw points
        points.forEach(point => {
            ctx.fillStyle = colors[point.cluster]
            ctx.beginPath()
            ctx.arc(point.x, point.y, 6, 0, 2 * Math.PI)
            ctx.fill()
        })

        // Draw centroids
        centroids.forEach(centroid => {
            ctx.fillStyle = colors[centroid.cluster]
            ctx.strokeStyle = '#000'
            ctx.lineWidth = 3
            ctx.beginPath()
            ctx.arc(centroid.x, centroid.y, 12, 0, 2 * Math.PI)
            ctx.fill()
            ctx.stroke()

            // Draw X mark
            ctx.strokeStyle = '#fff'
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.moveTo(centroid.x - 6, centroid.y - 6)
            ctx.lineTo(centroid.x + 6, centroid.y + 6)
            ctx.moveTo(centroid.x + 6, centroid.y - 6)
            ctx.lineTo(centroid.x - 6, centroid.y + 6)
            ctx.stroke()
        })
    }

    const calculateDistance = (p1: { x: number, y: number }, p2: { x: number, y: number }) => {
        return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
    }

    const assignClusters = () => {
        const newPoints = points.map(point => {
            let minDist = Infinity
            let closestCluster = 0
            centroids.forEach(centroid => {
                const dist = calculateDistance(point, centroid)
                if (dist < minDist) {
                    minDist = dist
                    closestCluster = centroid.cluster
                }
            })
            return { ...point, cluster: closestCluster }
        })
        setPoints(newPoints)
        return newPoints
    }

    const updateCentroids = (clusteredPoints: Point[]) => {
        const newCentroids = centroids.map(centroid => {
            const clusterPoints = clusteredPoints.filter(p => p.cluster === centroid.cluster)
            if (clusterPoints.length === 0) return centroid

            const sumX = clusterPoints.reduce((sum, p) => sum + p.x, 0)
            const sumY = clusterPoints.reduce((sum, p) => sum + p.y, 0)
            return {
                ...centroid,
                x: sumX / clusterPoints.length,
                y: sumY / clusterPoints.length
            }
        })
        setCentroids(newCentroids)
    }

    const runOneIteration = () => {
        const clusteredPoints = assignClusters()
        updateCentroids(clusteredPoints)
        setIteration(prev => prev + 1)
    }

    const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (mode !== 'manual') return

        const canvas = canvasRef.current
        if (!canvas) return

        const rect = canvas.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        if (centroids.length < k) {
            setCentroids([...centroids, { x, y, cluster: centroids.length }])
        }
    }

    const challenges: Challenge[] = [
        {
            id: 'first-clustering',
            title: 'Run Your First Clustering',
            description: 'Generate random data and run the K-means algorithm to see how it groups similar points together.',
            difficulty: 'easy',
            hints: [
                'Click the "Generate Data" button to create random points',
                'Click "Run Iteration" to see one step of the algorithm',
                'Watch how points change colors as they get assigned to clusters'
            ],
            successCriteria: 'Run at least 3 iterations of the algorithm',
            points: 10
        },
        {
            id: 'manual-centroids',
            title: 'Place Centroids Strategically',
            description: 'Switch to manual mode and place initial centroids yourself. Try to place them in good starting positions.',
            difficulty: 'medium',
            hints: [
                'Switch to "Manual Mode"',
                'Click on the canvas to place centroids',
                'Try placing them in the center of visible clusters'
            ],
            successCriteria: 'Place centroids manually and run the algorithm',
            points: 20
        },
        {
            id: 'bad-initialization',
            title: 'The Worst Initialization',
            description: 'Can you find the worst possible initial centroid placement? Place all centroids close together and see what happens!',
            difficulty: 'hard',
            hints: [
                'Place all centroids in the same small area',
                'Run the algorithm and observe the results',
                'Compare with a good initialization'
            ],
            successCriteria: 'Place centroids poorly and observe suboptimal clustering',
            points: 30
        }
    ]

    const checkChallengeSuccess = (challengeId: string) => {
        switch (challengeId) {
            case 'first-clustering':
                return iteration >= 3
            case 'manual-centroids':
                return mode === 'manual' && centroids.length === k && iteration >= 1
            case 'bad-initialization':
                return mode === 'manual' && iteration >= 2
            default:
                return false
        }
    }

    const handleChallengeComplete = (challengeId: string) => {
        if (!completedChallenges.includes(challengeId)) {
            setCompletedChallenges([...completedChallenges, challengeId])
        }
    }

    const stepDescriptions = [
        'Initial state: Points are unassigned, centroids are randomly placed',
        'Step 1: Assign each point to the nearest centroid',
        'Step 2: Update centroids to the mean of their assigned points',
        'Step 3: Repeat assignment with new centroid positions',
        'Convergence: Centroids stabilize, clustering complete!'
    ]

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Zap className="w-6 h-6 text-yellow-500" />
                        Interactive K-Means Clustering - Learn by Doing!
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
                                    <p>Watch K-means cluster data step-by-step. Try manual mode to place your own initial centroids!</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                <div className="lg:col-span-2 space-y-4">
                                    <div className="flex gap-2 flex-wrap">
                                        <Button
                                            onClick={() => setMode(mode === 'auto' ? 'manual' : 'auto')}
                                            variant="outline"
                                        >
                                            {mode === 'auto' ? '🤖 Auto Mode' : '✋ Manual Mode'}
                                        </Button>
                                        <Button onClick={generateRandomData} variant="outline">
                                            <RotateCcw className="w-4 h-4 mr-2" />
                                            Generate Data
                                        </Button>
                                        <Button onClick={runOneIteration}>
                                            Run Iteration
                                        </Button>
                                        {mode === 'manual' && centroids.length < k && (
                                            <span className="text-sm text-orange-600 flex items-center">
                                                Click canvas to place centroid {centroids.length + 1}/{k}
                                            </span>
                                        )}
                                    </div>

                                    <canvas
                                        ref={canvasRef}
                                        width={600}
                                        height={400}
                                        onClick={handleCanvasClick}
                                        className={`border-2 border-gray-300 rounded-lg bg-white ${mode === 'manual' && centroids.length < k ? 'cursor-crosshair' : ''
                                            }`}
                                    />

                                    <div className="flex items-center gap-4 text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                            <span>Data Point</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-black"></div>
                                            <span>Centroid</span>
                                        </div>
                                        <div className="ml-auto text-gray-600">
                                            Iteration: {iteration}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="p-4 bg-white rounded-lg border border-gray-200">
                                        <Slider
                                            label="Number of Clusters (K)"
                                            value={k}
                                            onChange={(val) => {
                                                setK(val)
                                                initializeCentroids(points, val)
                                                setIteration(0)
                                            }}
                                            min={2}
                                            max={5}
                                            step={1}
                                        />
                                        <p className="text-xs text-gray-600 mt-2">
                                            Current K: {k}
                                        </p>
                                    </div>

                                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                                        <p className="text-sm font-semibold text-purple-900 mb-2">Statistics</p>
                                        <div className="space-y-1 text-xs text-purple-800">
                                            <p>Total points: {points.length}</p>
                                            {centroids.map((c, i) => (
                                                <p key={i}>
                                                    Cluster {i}: {points.filter(p => p.cluster === i).length} points
                                                </p>
                                            ))}
                                            <p className="pt-2 border-t border-purple-200">
                                                Iterations: {iteration}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                                        <p className="text-sm font-semibold text-yellow-900 mb-2">💡 Try This</p>
                                        <ul className="text-xs text-yellow-800 space-y-1 list-disc list-inside">
                                            <li>Change K and see how clustering changes</li>
                                            <li>Use manual mode to place bad initial centroids</li>
                                            <li>Run multiple iterations to see convergence</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="learn" className="space-y-4">
                            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                                <h3 className="text-lg font-semibold mb-3">How K-Means Clustering Works</h3>

                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm font-semibold mb-2">Algorithm Steps</p>
                                        <ol className="text-sm text-gray-700 space-y-2 list-decimal list-inside">
                                            <li>Initialize K centroids randomly (or manually)</li>
                                            <li>Assign each point to the nearest centroid</li>
                                            <li>Update centroids to the mean of assigned points</li>
                                            <li>Repeat steps 2-3 until convergence</li>
                                        </ol>
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold mb-2">Distance Calculation</p>
                                        <p className="text-sm text-gray-700 mb-2">
                                            Euclidean distance between point and centroid:
                                        </p>
                                        <div className="overflow-x-auto bg-white p-3 rounded">
                                            <BlockMath math="d(p, c) = \sqrt{(x_p - x_c)^2 + (y_p - y_c)^2}" />
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold mb-2">Centroid Update</p>
                                        <p className="text-sm text-gray-700 mb-2">
                                            New centroid position is the mean of all assigned points:
                                        </p>
                                        <div className="overflow-x-auto bg-white p-3 rounded">
                                            <BlockMath math="c_k = \frac{1}{|S_k|} \sum_{p \in S_k} p" />
                                        </div>
                                        <p className="text-xs text-gray-600 mt-2">
                                            where <InlineMath math="S_k" /> is the set of points assigned to cluster <InlineMath math="k" />
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold mb-2">Objective Function</p>
                                        <p className="text-sm text-gray-700 mb-2">
                                            K-means minimizes the within-cluster sum of squares:
                                        </p>
                                        <div className="overflow-x-auto bg-white p-3 rounded">
                                            <BlockMath math="J = \sum_{k=1}^{K} \sum_{p \in S_k} ||p - c_k||^2" />
                                        </div>
                                    </div>

                                    <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                                        <p className="text-sm font-semibold text-yellow-900 mb-1">💡 Key Insight</p>
                                        <p className="text-sm text-yellow-800">
                                            K-means is sensitive to initial centroid placement. Poor initialization can lead to suboptimal clustering. Try the "bad initialization" challenge to see this in action!
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                    <p className="text-sm font-semibold text-green-900 mb-2">✅ Advantages</p>
                                    <ul className="text-sm text-green-800 space-y-1 list-disc list-inside">
                                        <li>Simple and fast</li>
                                        <li>Scales well to large datasets</li>
                                        <li>Guaranteed to converge</li>
                                        <li>Easy to interpret results</li>
                                    </ul>
                                </div>
                                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                                    <p className="text-sm font-semibold text-red-900 mb-2">⚠️ Limitations</p>
                                    <ul className="text-sm text-red-800 space-y-1 list-disc list-inside">
                                        <li>Must choose K in advance</li>
                                        <li>Sensitive to initialization</li>
                                        <li>Assumes spherical clusters</li>
                                        <li>Affected by outliers</li>
                                    </ul>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="challenge" className="space-y-4">
                            <div className="flex items-start gap-2 p-3 bg-purple-50 rounded-lg border border-purple-200">
                                <Target className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                                <div className="text-sm text-purple-800">
                                    <p className="font-semibold mb-1">Challenge Mode</p>
                                    <p>Complete these challenges to master K-Means! Experiment with different initializations and parameters.</p>
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
                                            You've completed all K-Means challenges!
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
