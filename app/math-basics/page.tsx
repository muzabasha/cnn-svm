'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, BarChart, Bar, Legend } from 'recharts'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'

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
                        Master the mathematical foundations for Machine Learning and AI
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
    const cosineSimilarity = magnitude1 * magnitude2 !== 0 ? dotProduct / (magnitude1 * magnitude2) : 0
    const angle = Math.acos(Math.max(-1, Math.min(1, cosineSimilarity))) * (180 / Math.PI)

    return (
        <div className="space-y-6">
            {/* Mathematical Foundation */}
            <Card>
                <CardHeader>
                    <CardTitle>📐 Vector Mathematics</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                            <h3 className="text-lg font-bold text-blue-900 mb-4">Core Vector Equations</h3>

                            <div className="space-y-4">
                                <div className="bg-white p-4 rounded-lg overflow-x-auto">
                                    <p className="text-sm font-semibold text-gray-900 mb-2">1. Vector Representation</p>
                                    <BlockMath math="\vec{v} = \begin{bmatrix} v_1 \\ v_2 \\ \vdots \\ v_n \end{bmatrix} = [v_1, v_2, ..., v_n]" />
                                    <p className="text-xs text-gray-600 mt-2">
                                        A vector is an ordered list of numbers representing magnitude and direction in n-dimensional space.
                                    </p>
                                    <div className="mt-3 p-3 bg-blue-50 rounded">
                                        <p className="text-xs font-semibold text-blue-900">Current Vectors:</p>
                                        <p className="text-xs text-blue-700 font-mono">
                                            v₁ = [{vector1[0]}, {vector1[1]}]<br />
                                            v₂ = [{vector2[0]}, {vector2[1]}]
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-white p-4 rounded-lg overflow-x-auto">
                                    <p className="text-sm font-semibold text-gray-900 mb-2">2. Dot Product (Inner Product)</p>
                                    <BlockMath math="\vec{a} \cdot \vec{b} = \sum_{i=1}^{n} a_i b_i = a_1b_1 + a_2b_2 + ... + a_nb_n" />
                                    <p className="text-xs text-gray-600 mt-2">
                                        Measures how much two vectors point in the same direction. Result is a scalar (single number).
                                    </p>
                                    <div className="mt-3 p-3 bg-green-50 rounded">
                                        <p className="text-xs font-semibold text-green-900">Calculation:</p>
                                        <p className="text-xs text-green-700 font-mono">
                                            v₁ · v₂ = ({vector1[0]})({vector2[0]}) + ({vector1[1]})({vector2[1]}) = {dotProduct.toFixed(2)}
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-white p-4 rounded-lg overflow-x-auto">
                                    <p className="text-sm font-semibold text-gray-900 mb-2">3. Vector Magnitude (Length)</p>
                                    <BlockMath math="||\vec{v}|| = \sqrt{\sum_{i=1}^{n} v_i^2} = \sqrt{v_1^2 + v_2^2 + ... + v_n^2}" />
                                    <p className="text-xs text-gray-600 mt-2">
                                        The length or size of a vector, calculated using the Pythagorean theorem.
                                    </p>
                                    <div className="mt-3 p-3 bg-purple-50 rounded">
                                        <p className="text-xs font-semibold text-purple-900">Calculations:</p>
                                        <p className="text-xs text-purple-700 font-mono">
                                            ||v₁|| = √({vector1[0]}² + {vector1[1]}²) = {magnitude1.toFixed(2)}<br />
                                            ||v₂|| = √({vector2[0]}² + {vector2[1]}²) = {magnitude2.toFixed(2)}
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-white p-4 rounded-lg overflow-x-auto">
                                    <p className="text-sm font-semibold text-gray-900 mb-2">4. Cosine Similarity</p>
                                    <BlockMath math="\cos(\theta) = \frac{\vec{a} \cdot \vec{b}}{||\vec{a}|| \cdot ||\vec{b}||}" />
                                    <p className="text-xs text-gray-600 mt-2">
                                        Measures the angle between vectors. Range: [-1, 1]. Value of 1 means same direction, -1 means opposite, 0 means perpendicular.
                                    </p>
                                    <div className="mt-3 p-3 bg-orange-50 rounded">
                                        <p className="text-xs font-semibold text-orange-900">Result:</p>
                                        <p className="text-xs text-orange-700 font-mono">
                                            cos(θ) = {dotProduct.toFixed(2)} / ({magnitude1.toFixed(2)} × {magnitude2.toFixed(2)}) = {cosineSimilarity.toFixed(3)}<br />
                                            Angle θ = {angle.toFixed(1)}°
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-white p-4 rounded-lg overflow-x-auto">
                                    <p className="text-sm font-semibold text-gray-900 mb-2">5. Unit Vector (Normalization)</p>
                                    <BlockMath math="\hat{v} = \frac{\vec{v}}{||\vec{v}||}" />
                                    <p className="text-xs text-gray-600 mt-2">
                                        A vector with magnitude 1, pointing in the same direction as the original. Used for direction-only comparisons.
                                    </p>
                                </div>

                                <div className="bg-white p-4 rounded-lg overflow-x-auto">
                                    <p className="text-sm font-semibold text-gray-900 mb-2">6. Vector Addition & Scalar Multiplication</p>
                                    <BlockMath math="\vec{a} + \vec{b} = [a_1 + b_1, a_2 + b_2, ..., a_n + b_n]" />
                                    <BlockMath math="c \cdot \vec{v} = [c \cdot v_1, c \cdot v_2, ..., c \cdot v_n]" />
                                    <p className="text-xs text-gray-600 mt-2">
                                        Addition combines vectors element-wise. Scalar multiplication scales the vector's magnitude.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-yellow-50 p-6 rounded-xl border-2 border-yellow-200">
                            <h3 className="text-lg font-bold text-yellow-900 mb-4">🎯 Applications in Machine Learning Algorithms</h3>
                            <div className="space-y-3 text-sm text-yellow-800">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                                    <div>
                                        <p className="font-semibold">K-Nearest Neighbors (KNN)</p>
                                        <p className="text-xs">Uses vector magnitude to calculate Euclidean distance: <InlineMath math="d = ||\vec{x}_1 - \vec{x}_2||" /></p>
                                        <p className="text-xs">Finds k closest data points to classify new samples</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                                    <div>
                                        <p className="font-semibold">Support Vector Machines (SVM)</p>
                                        <p className="text-xs">Decision boundary: <InlineMath math="\vec{w} \cdot \vec{x} + b = 0" /> (dot product)</p>
                                        <p className="text-xs">Maximizes margin between classes using vector operations</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                                    <div>
                                        <p className="font-semibold">Neural Networks</p>
                                        <p className="text-xs">Layer computation: <InlineMath math="\vec{y} = \sigma(W\vec{x} + \vec{b})" /> (matrix-vector multiplication)</p>
                                        <p className="text-xs">Weights are vectors, activations are vectors</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                                    <div>
                                        <p className="font-semibold">Cosine Similarity (Text/Recommendation)</p>
                                        <p className="text-xs">Document similarity: <InlineMath math="\text{sim}(d_1, d_2) = \frac{\vec{d}_1 \cdot \vec{d}_2}{||\vec{d}_1|| \cdot ||\vec{d}_2||}" /></p>
                                        <p className="text-xs">Used in recommendation systems and NLP</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">5</div>
                                    <div>
                                        <p className="font-semibold">Principal Component Analysis (PCA)</p>
                                        <p className="text-xs">Finds principal components (eigenvectors) using vector projections</p>
                                        <p className="text-xs">Dimensionality reduction through vector transformations</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">6</div>
                                    <div>
                                        <p className="font-semibold">Gradient Descent</p>
                                        <p className="text-xs">Update rule: <InlineMath math="\vec{\theta}_{new} = \vec{\theta}_{old} - \alpha \nabla J(\vec{\theta})" /></p>
                                        <p className="text-xs">Gradient is a vector pointing in direction of steepest ascent</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Interactive Visualization */}
            <Card>
                <CardHeader>
                    <CardTitle>🎨 Interactive Vector Visualization</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 mb-6">
                        Adjust the vectors to see how dot product, magnitude, and angle change in real-time.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-semibold mb-4">Adjust Vectors</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                                        Vector 1: [{vector1[0]}, {vector1[1]}]
                                    </label>
                                    <Slider
                                        label="X component"
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
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                                        Vector 2: [{vector2[0]}, {vector2[1]}]
                                    </label>
                                    <Slider
                                        label="X component"
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
                                <h4 className="font-semibold text-pink-900 mb-2">Computed Results:</h4>
                                <div className="text-sm text-pink-700 space-y-1">
                                    <p>Dot Product (v₁ · v₂): {dotProduct.toFixed(2)}</p>
                                    <p>Magnitude ||v₁||: {magnitude1.toFixed(2)}</p>
                                    <p>Magnitude ||v₂||: {magnitude2.toFixed(2)}</p>
                                    <p>Cosine Similarity: {cosineSimilarity.toFixed(3)}</p>
                                    <p>Angle between vectors: {angle.toFixed(1)}°</p>
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

                                    {/* Angle arc */}
                                    {angle > 0 && angle < 180 && (
                                        <path
                                            d={`M 1 0 A 1 1 0 0 ${angle > 90 ? 1 : 0} ${Math.cos(angle * Math.PI / 180)} ${-Math.sin(angle * Math.PI / 180)}`}
                                            fill="none"
                                            stroke="#fbbf24"
                                            strokeWidth="0.08"
                                        />
                                    )}

                                    {/* Vector 1 */}
                                    <line x1="0" y1="0" x2={vector1[0]} y2={-vector1[1]}
                                        stroke="#ec4899" strokeWidth="0.15" markerEnd="url(#arrowhead1)" />
                                    <text x={vector1[0] + 0.3} y={-vector1[1]} fill="#ec4899" fontSize="0.5">v₁</text>

                                    {/* Vector 2 */}
                                    <line x1="0" y1="0" x2={vector2[0]} y2={-vector2[1]}
                                        stroke="#3b82f6" strokeWidth="0.15" markerEnd="url(#arrowhead2)" />
                                    <text x={vector2[0] + 0.3} y={-vector2[1]} fill="#3b82f6" fontSize="0.5">v₂</text>

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
                            <p className="text-xs text-gray-600 mt-2 text-center">
                                Yellow arc shows the angle ({angle.toFixed(1)}°) between vectors
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Matrix Operations */}
            <Card>
                <CardHeader>
                    <CardTitle>📊 Matrix Operations</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200 overflow-x-auto">
                        <h3 className="text-lg font-bold text-blue-900 mb-4">Matrix-Vector Multiplication</h3>
                        <BlockMath math="A\vec{x} = \begin{bmatrix} a_{11} & a_{12} \\ a_{21} & a_{22} \end{bmatrix} \begin{bmatrix} x_1 \\ x_2 \end{bmatrix} = \begin{bmatrix} a_{11}x_1 + a_{12}x_2 \\ a_{21}x_1 + a_{22}x_2 \end{bmatrix}" />
                        <p className="text-sm text-blue-800 mt-4">
                            Used in neural networks for layer transformations, linear regression for predictions, and image transformations.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

function CalculusModule() {
    const [x, setX] = useState(2)
    const [learningRate, setLearningRate] = useState(0.1)
    const [gdSteps, setGdSteps] = useState(0)

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

    const gdPath = Array.from({ length: Math.min(gdSteps + 1, 20) }, (_, i) => {
        let xPos = 4
        for (let j = 0; j < i; j++) {
            const grad = 2 * xPos
            xPos = xPos - learningRate * grad
        }
        return { x: xPos, y: f(xPos), step: i }
    })

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>📐 Calculus & Derivatives Mathematics</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                            <h3 className="text-lg font-bold text-blue-900 mb-4">Core Derivative Equations</h3>
                            <div className="space-y-4">
                                <div className="bg-white p-4 rounded-lg overflow-x-auto">
                                    <p className="text-sm font-semibold text-gray-900 mb-2">1. Definition of Derivative</p>
                                    <BlockMath math="f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}" />
                                    <p className="text-xs text-gray-600 mt-2">
                                        The derivative measures the instantaneous rate of change - the slope of the tangent line at a point.
                                    </p>
                                </div>
                                <div className="bg-white p-4 rounded-lg overflow-x-auto">
                                    <p className="text-sm font-semibold text-gray-900 mb-2">2. Power Rule</p>
                                    <BlockMath math="\frac{d}{dx}(x^n) = n \cdot x^{n-1}" />
                                    <p className="text-xs text-gray-600 mt-2">Most common derivative rule.</p>
                                    <div className="mt-3 p-3 bg-green-50 rounded">
                                        <p className="text-xs font-semibold text-green-900">Example: f(x) = x²</p>
                                        <p className="text-xs text-green-700 font-mono">
                                            f'(x) = 2x, At x = {x.toFixed(2)}: f'({x.toFixed(2)}) = {derivative.toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-white p-4 rounded-lg overflow-x-auto">
                                    <p className="text-sm font-semibold text-gray-900 mb-2">3. Gradient Descent Update Rule</p>
                                    <BlockMath math="\theta_{new} = \theta_{old} - \alpha \cdot \nabla J(\theta)" />
                                    <p className="text-xs text-gray-600 mt-2">Core optimization algorithm.</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-yellow-50 p-6 rounded-xl border-2 border-yellow-200">
                            <h3 className="text-lg font-bold text-yellow-900 mb-4">🎯 Applications in Machine Learning</h3>
                            <div className="space-y-3 text-sm text-yellow-800">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                                    <div>
                                        <p className="font-semibold">Backpropagation (Neural Networks)</p>
                                        <p className="text-xs">Uses chain rule to compute gradients</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                                    <div>
                                        <p className="font-semibold">Gradient Descent Optimization</p>
                                        <p className="text-xs">Minimizes loss function by following negative gradient</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>🎨 Interactive Derivative Visualization</CardTitle>
                </CardHeader>
                <CardContent>
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
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Function f(x) = x² & Tangent Line</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="x" domain={[-5, 5]} />
                                    <YAxis domain={[0, 25]} />
                                    <Tooltip />
                                    <Legend />
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
                    <CardTitle>⛰️ Gradient Descent Simulation</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <div className="space-y-4">
                                <Slider
                                    label={`Learning Rate α: ${learningRate.toFixed(2)}`}
                                    value={learningRate}
                                    onChange={setLearningRate}
                                    min={0.01}
                                    max={0.5}
                                    step={0.01}
                                />
                                <Slider
                                    label={`Steps: ${gdSteps}`}
                                    value={gdSteps}
                                    onChange={setGdSteps}
                                    min={0}
                                    max={20}
                                    step={1}
                                />
                            </div>
                            <div className="mt-6 p-4 bg-green-50 rounded-lg">
                                <h4 className="font-semibold text-green-900 mb-2">Progress:</h4>
                                <div className="text-sm text-green-700 space-y-1">
                                    <p>Current position: x = {gdPath[gdPath.length - 1]?.x.toFixed(3) || '4.000'}</p>
                                    <p>Steps taken: {gdSteps}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <ResponsiveContainer width="100%" height={300}>
                                <ScatterChart>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="x" domain={[-5, 5]} />
                                    <YAxis domain={[0, 25]} />
                                    <Tooltip />
                                    <Line data={data} type="monotone" dataKey="y" stroke="#e5e7eb" strokeWidth={1} dot={false} />
                                    <Scatter data={gdPath} fill="#10b981" />
                                </ScatterChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

function ProbabilityModule() {
    const [coinFlips, setCoinFlips] = useState(10)
    const [pSuccess, setPSuccess] = useState(0.7)

    const binomialData = Array.from({ length: coinFlips + 1 }, (_, k) => {
        const nCk = factorial(coinFlips) / (factorial(k) * factorial(coinFlips - k))
        const prob = nCk * Math.pow(pSuccess, k) * Math.pow(1 - pSuccess, coinFlips - k)
        return { k, probability: prob * 100 }
    })

    const expectedValue = coinFlips * pSuccess

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>📐 Probability Mathematics</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                            <h3 className="text-lg font-bold text-blue-900 mb-4">Core Probability Equations</h3>
                            <div className="space-y-4">
                                <div className="bg-white p-4 rounded-lg overflow-x-auto">
                                    <p className="text-sm font-semibold text-gray-900 mb-2">1. Bayes' Theorem</p>
                                    <BlockMath math="P(A|B) = \frac{P(B|A) \cdot P(A)}{P(B)}" />
                                    <p className="text-xs text-gray-600 mt-2">Update beliefs based on new evidence.</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg overflow-x-auto">
                                    <p className="text-sm font-semibold text-gray-900 mb-2">2. Binomial Distribution</p>
                                    <BlockMath math="P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}" />
                                    <p className="text-xs text-gray-600 mt-2">Probability of k successes in n trials.</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-yellow-50 p-6 rounded-xl border-2 border-yellow-200">
                            <h3 className="text-lg font-bold text-yellow-900 mb-4">🎯 Applications in ML</h3>
                            <div className="space-y-3 text-sm text-yellow-800">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                                    <div>
                                        <p className="font-semibold">Naive Bayes Classifier</p>
                                        <p className="text-xs">Uses Bayes' theorem for classification</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                                    <div>
                                        <p className="font-semibold">Logistic Regression</p>
                                        <p className="text-xs">Outputs probability for classification</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>🎲 Interactive Binomial Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <div className="space-y-4">
                                <Slider
                                    label={`Number of trials (n): ${coinFlips}`}
                                    value={coinFlips}
                                    onChange={setCoinFlips}
                                    min={1}
                                    max={20}
                                    step={1}
                                />
                                <Slider
                                    label={`Success probability (p): ${pSuccess.toFixed(2)}`}
                                    value={pSuccess}
                                    onChange={setPSuccess}
                                    min={0.1}
                                    max={0.9}
                                    step={0.05}
                                />
                            </div>
                            <div className="mt-6 p-4 bg-pink-50 rounded-lg">
                                <h4 className="font-semibold text-pink-900 mb-2">Distribution Properties:</h4>
                                <div className="text-sm text-pink-700 space-y-1">
                                    <p>Expected value E[X] = {expectedValue.toFixed(2)}</p>
                                    <p>Variance = {(coinFlips * pSuccess * (1 - pSuccess)).toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={binomialData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="k" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="probability" fill="#ec4899" />
                                </BarChart>
                            </ResponsiveContainer>
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
                    <CardTitle>📐 Statistics Mathematics</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                            <h3 className="text-lg font-bold text-blue-900 mb-4">Core Statistical Equations</h3>
                            <div className="space-y-4">
                                <div className="bg-white p-4 rounded-lg overflow-x-auto">
                                    <p className="text-sm font-semibold text-gray-900 mb-2">1. Mean (Average)</p>
                                    <BlockMath math="\mu = \bar{x} = \frac{1}{n}\sum_{i=1}^{n} x_i" />
                                    <p className="text-xs text-gray-600 mt-2">The central tendency.</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg overflow-x-auto">
                                    <p className="text-sm font-semibold text-gray-900 mb-2">2. Standard Deviation</p>
                                    <BlockMath math="\sigma = \sqrt{\frac{1}{n}\sum_{i=1}^{n} (x_i - \mu)^2}" />
                                    <p className="text-xs text-gray-600 mt-2">Measures spread of data.</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg overflow-x-auto">
                                    <p className="text-sm font-semibold text-gray-900 mb-2">3. Z-Score</p>
                                    <BlockMath math="z = \frac{x - \mu}{\sigma}" />
                                    <p className="text-xs text-gray-600 mt-2">Standardization for normalization.</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-yellow-50 p-6 rounded-xl border-2 border-yellow-200">
                            <h3 className="text-lg font-bold text-yellow-900 mb-4">🎯 Applications in ML</h3>
                            <div className="space-y-3 text-sm text-yellow-800">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                                    <div>
                                        <p className="font-semibold">Feature Scaling</p>
                                        <p className="text-xs">Z-score normalization for gradient descent</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                                    <div>
                                        <p className="font-semibold">Outlier Detection</p>
                                        <p className="text-xs">Flag points with |z| &gt; 2 as outliers</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                                    <div>
                                        <p className="font-semibold">Batch Normalization</p>
                                        <p className="text-xs">Normalize activations in neural networks</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>📊 Interactive Statistical Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <div className="space-y-3">
                                <div className="p-4 bg-blue-50 rounded-lg">
                                    <h4 className="font-semibold text-blue-900 mb-1">Mean (μ)</h4>
                                    <p className="text-2xl font-bold text-blue-700">{mean.toFixed(2)}</p>
                                </div>
                                <div className="p-4 bg-green-50 rounded-lg">
                                    <h4 className="font-semibold text-green-900 mb-1">Median</h4>
                                    <p className="text-2xl font-bold text-green-700">{median}</p>
                                </div>
                                <div className="p-4 bg-purple-50 rounded-lg">
                                    <h4 className="font-semibold text-purple-900 mb-1">Std Deviation (σ)</h4>
                                    <p className="text-2xl font-bold text-purple-700">{stdDev.toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={histogram}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="range" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="count" fill="#ec4899" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

function factorial(n: number): number {
    if (n <= 1) return 1
    return n * factorial(n - 1)
}
