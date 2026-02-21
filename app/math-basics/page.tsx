'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from 'recharts'

export default function MathBasicsPage() {
    const [selectedTopic, setSelectedTopic] = useState('vectors')

    const topics = [
        { id: 'vectors', name: 'Vectors & Matrices', icon: '📐' },
        { id: 'calculus', name: 'Derivatives', icon: '📈' },
        { id: 'probability', name: 'Probability', icon: '🎲' },
        { id: 'statistics', name: 'Statistics', icon: '📊' }
    ]

    const renderTopic = () => {
        switch (selectedTopic) {
            case 'vectors':
                return <VectorsModule />
            case 'calculus':
                return <CalculusModule />
            case 'probability':
                return <ProbabilityModule />
            case 'statistics':
                return <StatisticsModule />
            default:
                return <VectorsModule />
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-6 sm:mb-8">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
                        🧮 Math Basics Lab
                    </h1>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                        Master the mathematical ingredients needed for AI cooking!
                    </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
                    {topics.map((topic) => (
                        <button
                            key={topic.id}
                            onClick={() => setSelectedTopic(topic.id)}
                            className={`p-4 rounded-xl border-2 transition-all ${selectedTopic === topic.id
                                    ? 'border-pink-500 bg-pink-50 shadow-lg'
                                    : 'border-gray-200 bg-white hover:bg-gray-50'
                                }`}
                        >
                            <div className="text-3xl mb-2">{topic.icon}</div>
                            <div className="text-sm font-semibold text-gray-900">{topic.name}</div>
                        </button>
                    ))}
                </div>

                <div className="mt-6 sm:mt-8">
                    {renderTopic()}
                </div>
            </div>
        </div>
    )
}

function VectorsModule() {
    const [vector1, setVector1] = useState([3, 2])
    const [vector2, setVector2] = useState([1, 4])

    const dotProduct = vector1[0] * vector2[0] + vector1[1] * vector2[1]
    const magnitude1 = Math.sqrt(vector1[0] ** 2 + vector1[1] ** 2)
    const magnitude2 = Math.sqrt(vector2[0] ** 2 + vector2[1] ** 2)

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Vectors: Ingredients with Direction</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 mb-6">
                        Think of vectors as ingredients with both amount AND direction.
                        "3 cups flour going right, 2 cups sugar going up"
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-semibold mb-4">Adjust Vectors</h3>
                            <div className="space-y-4">
                                <div>
                                    <Slider
                                        label={`Vector 1: [${vector1[0]}, ${vector1[1]}]`}
                                        value={vector1[0]}
                                        onChange={(v) => setVector1([v, vector1[1]])}
                                        min={-5}
                                        max={5}
                                        step={0.5}
                                    />
                                    <Slider
                                        label="Y component"
                                        value={vector1[1]}
                                        onChange={(v) => setVector1([vector1[0], v])}
                                        min={-5}
                                        max={5}
                                        step={0.5}
                                    />
                                </div>
                                <div>
                                    <Slider
                                        label={`Vector 2: [${vector2[0]}, ${vector2[1]}]`}
                                        value={vector2[0]}
                                        onChange={(v) => setVector2([v, vector2[1]])}
                                        min={-5}
                                        max={5}
                                        step={0.5}
                                    />
                                    <Slider
                                        label="Y component"
                                        value={vector2[1]}
                                        onChange={(v) => setVector2([vector2[0], v])}
                                        min={-5}
                                        max={5}
                                        step={0.5}
                                    />
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-pink-50 rounded-lg">
                                <h4 className="font-semibold text-pink-900 mb-2">Results:</h4>
                                <div className="text-sm text-pink-700 space-y-1">
                                    <p>Dot Product: {dotProduct.toFixed(2)}</p>
                                    <p>Magnitude 1: {magnitude1.toFixed(2)}</p>
                                    <p>Magnitude 2: {magnitude2.toFixed(2)}</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-4">Vector Visualization</h3>
                            <div className="bg-gray-50 rounded-lg p-6 h-80 relative">
                                <svg viewBox="-6 -6 12 12" className="w-full h-full">
                                    {/* Grid */}
                                    <line x1="-6" y1="0" x2="6" y2="0" stroke="#ddd" strokeWidth="0.05" />
                                    <line x1="0" y1="-6" x2="0" y2="6" stroke="#ddd" strokeWidth="0.05" />

                                    {/* Vector 1 */}
                                    <line x1="0" y1="0" x2={vector1[0]} y2={-vector1[1]}
                                        stroke="#ec4899" strokeWidth="0.15" markerEnd="url(#arrowhead1)" />
                                    <text x={vector1[0] + 0.3} y={-vector1[1]} fill="#ec4899" fontSize="0.5">V1</text>

                                    {/* Vector 2 */}
                                    <line x1="0" y1="0" x2={vector2[0]} y2={-vector2[1]}
                                        stroke="#3b82f6" strokeWidth="0.15" markerEnd="url(#arrowhead2)" />
                                    <text x={vector2[0] + 0.3} y={-vector2[1]} fill="#3b82f6" fontSize="0.5">V2</text>

                                    <defs>
                                        <marker id="arrowhead1" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
                                            <polygon points="0 0, 10 3, 0 6" fill="#ec4899" />
                                        </marker>
                                        <marker id="arrowhead2" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
                                            <polygon points="0 0, 10 3, 0 6" fill="#3b82f6" />
                                        </marker>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Why Vectors Matter in AI</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <div className="text-2xl mb-2">🎯</div>
                            <h4 className="font-semibold text-blue-900 mb-2">Data Representation</h4>
                            <p className="text-xs text-blue-700">
                                Each data point is a vector: [age, income, credit_score]
                            </p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg">
                            <div className="text-2xl mb-2">📏</div>
                            <h4 className="font-semibold text-green-900 mb-2">Similarity</h4>
                            <p className="text-xs text-green-700">
                                Dot product tells us how similar two items are
                            </p>
                        </div>
                        <div className="p-4 bg-purple-50 rounded-lg">
                            <div className="text-2xl mb-2">🔄</div>
                            <h4 className="font-semibold text-purple-900 mb-2">Transformations</h4>
                            <p className="text-xs text-purple-700">
                                Matrices transform data from one space to another
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

function CalculusModule() {
    const [x, setX] = useState(2)

    const f = (val: number) => val ** 2
    const derivative = 2 * x

    const data = Array.from({ length: 50 }, (_, i) => {
        const xVal = (i - 25) / 5
        return { x: xVal, y: f(xVal) }
    })

    const tangentData = Array.from({ length: 20 }, (_, i) => {
        const xVal = x + (i - 10) / 5
        return { x: xVal, y: f(x) + derivative * (xVal - x) }
    })

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Derivatives: Finding the Perfect Slope</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 mb-6">
                        Derivatives tell us "which way to adjust the heat" to make our dish better.
                        In AI, they guide us to minimize errors!
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <Slider
                                label={`Point: x = ${x.toFixed(2)}`}
                                value={x}
                                onChange={setX}
                                min={-4}
                                max={4}
                                step={0.1}
                            />

                            <div className="mt-6 p-4 bg-pink-50 rounded-lg">
                                <h4 className="font-semibold text-pink-900 mb-2">At x = {x.toFixed(2)}:</h4>
                                <div className="text-sm text-pink-700 space-y-1">
                                    <p>Function value: f(x) = {f(x).toFixed(2)}</p>
                                    <p>Derivative: f'(x) = {derivative.toFixed(2)}</p>
                                    <p className="mt-2 text-xs">
                                        {derivative > 0 ? '📈 Function is increasing' :
                                            derivative < 0 ? '📉 Function is decreasing' :
                                                '➡️ Function is flat'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-4">Function & Tangent Line</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="x" domain={[-5, 5]} />
                                    <YAxis domain={[0, 25]} />
                                    <Tooltip />
                                    <Line data={data} type="monotone" dataKey="y" stroke="#ec4899" strokeWidth={2} dot={false} name="f(x) = x²" />
                                    <Line data={tangentData} type="monotone" dataKey="y" stroke="#3b82f6" strokeWidth={2} dot={false} name="Tangent" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Gradient Descent: Rolling Downhill</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <div className="text-2xl mb-2">⛰️</div>
                            <h4 className="font-semibold text-blue-900 mb-2">The Hill Analogy</h4>
                            <p className="text-xs text-blue-700">
                                Imagine you're blindfolded on a hill. The derivative tells you which way is down.
                                Keep walking downhill until you reach the valley (minimum error)!
                            </p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg">
                            <div className="text-2xl mb-2">🎯</div>
                            <h4 className="font-semibold text-green-900 mb-2">In Machine Learning</h4>
                            <p className="text-xs text-green-700">
                                We use derivatives to adjust model parameters, moving toward lower error
                                with each step. This is how neural networks learn!
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

function ProbabilityModule() {
    const [coinFlips, setCoinFlips] = useState(10)
    const [diceRolls, setDiceRolls] = useState(Array.from({ length: 6 }, (_, i) => ({ value: i + 1, count: Math.floor(Math.random() * 20) + 10 })))

    const totalRolls = diceRolls.reduce((sum, d) => sum + d.count, 0)

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Probability: Predicting the Recipe Outcome</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 mb-6">
                        Probability helps us predict outcomes. "If I add this ingredient, what's the chance my dish will be delicious?"
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-semibold mb-4">Coin Flip Simulation</h3>
                            <Slider
                                label={`Number of flips: ${coinFlips}`}
                                value={coinFlips}
                                onChange={setCoinFlips}
                                min={1}
                                max={100}
                                step={1}
                            />

                            <div className="mt-4 p-4 bg-pink-50 rounded-lg">
                                <h4 className="font-semibold text-pink-900 mb-2">Expected Results:</h4>
                                <div className="text-sm text-pink-700 space-y-1">
                                    <p>Heads: ~{(coinFlips / 2).toFixed(1)} ({((0.5) * 100).toFixed(0)}%)</p>
                                    <p>Tails: ~{(coinFlips / 2).toFixed(1)} ({((0.5) * 100).toFixed(0)}%)</p>
                                    <p className="mt-2 text-xs">
                                        With more flips, results get closer to 50-50!
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-4">Dice Roll Distribution</h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <LineChart data={diceRolls}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="value" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="count" stroke="#ec4899" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                            <p className="text-xs text-gray-600 mt-2">
                                Each number has a 1/6 (16.67%) probability
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Probability in AI</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <div className="text-2xl mb-2">🎲</div>
                            <h4 className="font-semibold text-blue-900 mb-2">Classification</h4>
                            <p className="text-xs text-blue-700">
                                "This email is 95% likely to be spam"
                            </p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg">
                            <div className="text-2xl mb-2">🔮</div>
                            <h4 className="font-semibold text-green-900 mb-2">Prediction</h4>
                            <p className="text-xs text-green-700">
                                "There's a 70% chance of rain tomorrow"
                            </p>
                        </div>
                        <div className="p-4 bg-purple-50 rounded-lg">
                            <div className="text-2xl mb-2">🎯</div>
                            <h4 className="font-semibold text-purple-900 mb-2">Confidence</h4>
                            <p className="text-xs text-purple-700">
                                "I'm 85% confident this is a cat, not a dog"
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

function StatisticsModule() {
    const data = [23, 45, 67, 34, 89, 12, 56, 78, 45, 67, 34, 90, 23, 56, 78]
    const mean = data.reduce((a, b) => a + b, 0) / data.length
    const sorted = [...data].sort((a, b) => a - b)
    const median = sorted[Math.floor(sorted.length / 2)]
    const variance = data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / data.length
    const stdDev = Math.sqrt(variance)

    const histogram = Array.from({ length: 10 }, (_, i) => {
        const min = i * 10
        const max = (i + 1) * 10
        return {
            range: `${min}-${max}`,
            count: data.filter(v => v >= min && v < max).length
        }
    })

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Statistics: Understanding Your Ingredients</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 mb-6">
                        Statistics help us understand our data. "What's the average cooking time? How much does it vary?"
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-semibold mb-4">Key Metrics</h3>
                            <div className="space-y-3">
                                <div className="p-4 bg-blue-50 rounded-lg">
                                    <h4 className="font-semibold text-blue-900 mb-1">Mean (Average)</h4>
                                    <p className="text-2xl font-bold text-blue-700">{mean.toFixed(2)}</p>
                                    <p className="text-xs text-blue-600 mt-1">The center point of all values</p>
                                </div>

                                <div className="p-4 bg-green-50 rounded-lg">
                                    <h4 className="font-semibold text-green-900 mb-1">Median (Middle)</h4>
                                    <p className="text-2xl font-bold text-green-700">{median}</p>
                                    <p className="text-xs text-green-600 mt-1">The middle value when sorted</p>
                                </div>

                                <div className="p-4 bg-purple-50 rounded-lg">
                                    <h4 className="font-semibold text-purple-900 mb-1">Std Deviation</h4>
                                    <p className="text-2xl font-bold text-purple-700">{stdDev.toFixed(2)}</p>
                                    <p className="text-xs text-purple-600 mt-1">How spread out the values are</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-4">Data Distribution</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={histogram}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="range" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="count" stroke="#ec4899" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Statistics in Machine Learning</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <div className="text-2xl mb-2">📊</div>
                            <h4 className="font-semibold text-blue-900 mb-2">Data Understanding</h4>
                            <p className="text-xs text-blue-700">
                                Before cooking (training), understand your ingredients (data):
                                What's typical? What's unusual?
                            </p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg">
                            <div className="text-2xl mb-2">🎯</div>
                            <h4 className="font-semibold text-green-900 mb-2">Feature Scaling</h4>
                            <p className="text-xs text-green-700">
                                Normalize ingredients so one doesn't overpower others.
                                Use mean and std dev to standardize!
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
