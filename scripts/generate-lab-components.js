// Script to generate remaining lab component files
// Run with: node scripts/generate-lab-components.js

const fs = require('fs');
const path = require('path');

const componentTemplates = {
    // KNN Components
    'components/knn/DistanceMetrics.tsx': `'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { BlockMath } from 'react-katex'

export function DistanceMetrics() {
    const [x1, setX1] = useState(2)
    const [y1, setY1] = useState(3)
    const [x2, setX2] = useState(5)
    const [y2, setY2] = useState(7)
    const [p, setP] = useState(2)

    const euclidean = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
    const manhattan = Math.abs(x2 - x1) + Math.abs(y2 - y1)
    const minkowski = Math.pow(Math.pow(Math.abs(x2 - x1), p) + Math.pow(Math.abs(y2 - y1), p), 1/p)

    return (
        <div className="space-y-4 sm:space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Distance Metrics in KNN</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">
                        KNN uses distance metrics to find the nearest neighbors. Different metrics work better for different data types.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Point Coordinates</h3>
                            
                            <Slider label="Point 1 - X" value={x1} onChange={setX1} min={0} max={10} step={0.5} />
                            <Slider label="Point 1 - Y" value={y1} onChange={setY1} min={0} max={10} step={0.5} />
                            <Slider label="Point 2 - X" value={x2} onChange={setX2} min={0} max={10} step={0.5} />
                            <Slider label="Point 2 - Y" value={y2} onChange={setY2} min={0} max={10} step={0.5} />
                            <Slider label="Minkowski p" value={p} onChange={setP} min={1} max={5} step={0.5} />
                        </div>

                        <div>
                            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Distance Results</h3>
                            <div className="space-y-3">
                                <div className="p-3 sm:p-4 bg-blue-50 rounded-lg">
                                    <p className="text-xs sm:text-sm font-semibold text-blue-900">Euclidean (L2):</p>
                                    <p className="text-xl sm:text-2xl font-bold text-blue-700">{euclidean.toFixed(3)}</p>
                                    <div className="text-xs mt-2 overflow-x-auto">
                                        <BlockMath math="d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}" />
                                    </div>
                                </div>
                                <div className="p-3 sm:p-4 bg-green-50 rounded-lg">
                                    <p className="text-xs sm:text-sm font-semibold text-green-900">Manhattan (L1):</p>
                                    <p className="text-xl sm:text-2xl font-bold text-green-700">{manhattan.toFixed(3)}</p>
                                    <div className="text-xs mt-2 overflow-x-auto">
                                        <BlockMath math="d = |x_2-x_1| + |y_2-y_1|" />
                                    </div>
                                </div>
                                <div className="p-3 sm:p-4 bg-purple-50 rounded-lg">
                                    <p className="text-xs sm:text-sm font-semibold text-purple-900">Minkowski (p={p}):</p>
                                    <p className="text-xl sm:text-2xl font-bold text-purple-700">{minkowski.toFixed(3)}</p>
                                    <div className="text-xs mt-2 overflow-x-auto">
                                        <BlockMath math="d = (|x_2-x_1|^p + |y_2-y_1|^p)^{1/p}" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}`,

    'components/knn/KValueExplorer.tsx': `'use client'

import { useState, useCallback, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export function KValueExplorer() {
    const [k, setK] = useState(3)
    const [data, setData] = useState<any[]>([])

    const generateData = useCallback(() => {
        const points = []
        for (let i = 0; i < 30; i++) {
            points.push({ x: Math.random() * 10, y: Math.random() * 10, label: Math.random() > 0.5 ? 1 : 0 })
        }
        return points
    }, [])

    useEffect(() => {
        setData(generateData())
    }, [generateData])

    const class0 = data.filter(d => d.label === 0)
    const class1 = data.filter(d => d.label === 1)

    return (
        <div className="space-y-4 sm:space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">K-Value Impact on Classification</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">
                        The value of K determines how many neighbors vote on the classification. Small K = more sensitive to noise, Large K = smoother boundaries.
                    </p>

                    <Slider label="Number of Neighbors (K)" value={k} onChange={setK} min={1} max={15} step={1} description="How many neighbors to consider" />

                    <div className="mt-6">
                        <ResponsiveContainer width="100%" height={300}>
                            <ScatterChart>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" dataKey="x" domain={[0, 10]} />
                                <YAxis type="number" dataKey="y" domain={[0, 10]} />
                                <Tooltip />
                                <Scatter name="Class 0" data={class0} fill="#3b82f6" />
                                <Scatter name="Class 1" data={class1} fill="#ef4444" />
                            </ScatterChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                        <div className="p-3 bg-yellow-50 rounded-lg">
                            <p className="text-xs sm:text-sm font-semibold text-yellow-900">K = 1</p>
                            <p className="text-xs text-yellow-700">Most flexible, prone to overfitting</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                            <p className="text-xs sm:text-sm font-semibold text-green-900">K = 3-7</p>
                            <p className="text-xs text-green-700">Good balance for most problems</p>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <p className="text-xs sm:text-sm font-semibold text-blue-900">K = Large</p>
                            <p className="text-xs text-blue-700">Smooth boundaries, may underfit</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}`,

    'components/knn/WeightedVoting.tsx': `'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { BlockMath } from 'react-katex'

export function WeightedVoting() {
    const [method, setMethod] = useState<'uniform' | 'distance'>('uniform')

    const neighbors = [
        { distance: 1.2, class: 'A' },
        { distance: 1.8, class: 'A' },
        { distance: 2.5, class: 'B' },
        { distance: 3.1, class: 'B' },
        { distance: 3.8, class: 'B' }
    ]

    const uniformVotes = { A: 2, B: 3 }
    const distanceWeights = neighbors.reduce((acc, n) => {
        const weight = 1 / (n.distance + 0.001)
        acc[n.class] = (acc[n.class] || 0) + weight
        return acc
    }, {} as Record<string, number>)

    return (
        <div className="space-y-4 sm:space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Weighted vs Uniform Voting</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">
                        Weighted voting gives more importance to closer neighbors, while uniform voting treats all K neighbors equally.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                            <h3 className="font-semibold mb-3 text-sm sm:text-base">Voting Method</h3>
                            <div className="space-y-2">
                                <button onClick={() => setMethod('uniform')} className={\`w-full p-3 rounded-lg text-left \${method === 'uniform' ? 'bg-green-100 border-2 border-green-500' : 'bg-gray-50 border-2 border-gray-200'}\`}>
                                    <h4 className="font-semibold text-sm">Uniform Voting</h4>
                                    <p className="text-xs text-gray-600">Each neighbor gets 1 vote</p>
                                </button>
                                <button onClick={() => setMethod('distance')} className={\`w-full p-3 rounded-lg text-left \${method === 'distance' ? 'bg-green-100 border-2 border-green-500' : 'bg-gray-50 border-2 border-gray-200'}\`}>
                                    <h4 className="font-semibold text-sm">Distance-Weighted</h4>
                                    <p className="text-xs text-gray-600">Closer neighbors have more influence</p>
                                </button>
                            </div>

                            {method === 'distance' && (
                                <div className="mt-4 bg-blue-50 p-3 rounded-lg overflow-x-auto">
                                    <BlockMath math="w_i = \\frac{1}{d_i}" />
                                    <p className="text-xs text-blue-700 mt-2">Weight inversely proportional to distance</p>
                                </div>
                            )}
                        </div>

                        <div>
                            <h3 className="font-semibold mb-3 text-sm sm:text-base">Example Neighbors</h3>
                            <div className="space-y-2 mb-4">
                                {neighbors.map((n, i) => (
                                    <div key={i} className="p-2 bg-gray-50 rounded flex justify-between text-xs sm:text-sm">
                                        <span>Neighbor {i+1}: Class {n.class}</span>
                                        <span className="text-gray-600">d = {n.distance}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="p-4 bg-green-50 rounded-lg">
                                <p className="font-semibold text-green-900 mb-2 text-sm">Results:</p>
                                {method === 'uniform' ? (
                                    <div className="text-sm">
                                        <p>Class A: {uniformVotes.A} votes</p>
                                        <p>Class B: {uniformVotes.B} votes</p>
                                        <p className="font-bold mt-2">Winner: Class B</p>
                                    </div>
                                ) : (
                                    <div className="text-sm">
                                        <p>Class A: {distanceWeights.A.toFixed(2)} weight</p>
                                        <p>Class B: {distanceWeights.B.toFixed(2)} weight</p>
                                        <p className="font-bold mt-2">Winner: Class {distanceWeights.A > distanceWeights.B ? 'A' : 'B'}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}`,

    'components/knn/InteractiveClassifier.tsx': `'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'

export function InteractiveClassifier() {
    const [points, setPoints] = useState<Array<{x: number, y: number, label: number}>>([])
    const [currentClass, setCurrentClass] = useState(0)

    const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 10
        const y = ((e.clientY - rect.top) / rect.height) * 10
        setPoints([...points, { x, y, label: currentClass }])
    }

    return (
        <div className="space-y-4 sm:space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Interactive KNN Classifier</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">
                        Click on the canvas to add training points. Switch between classes and see how KNN classifies new points.
                    </p>

                    <div className="flex gap-2 mb-4">
                        <Button onClick={() => setCurrentClass(0)} className={\`\${currentClass === 0 ? 'bg-blue-600' : 'bg-gray-400'}\`}>
                            Class 0 (Blue)
                        </Button>
                        <Button onClick={() => setCurrentClass(1)} className={\`\${currentClass === 1 ? 'bg-red-600' : 'bg-gray-400'}\`}>
                            Class 1 (Red)
                        </Button>
                        <Button onClick={() => setPoints([])} className="flex items-center gap-2">
                            <RefreshCw className="w-4 h-4" />
                            Clear
                        </Button>
                    </div>

                    <div 
                        onClick={handleCanvasClick}
                        className="w-full h-96 bg-gray-50 border-2 border-gray-300 rounded-lg relative cursor-crosshair"
                    >
                        {points.map((point, i) => (
                            <div
                                key={i}
                                className="absolute w-3 h-3 rounded-full"
                                style={{
                                    left: \`\${(point.x / 10) * 100}%\`,
                                    top: \`\${(point.y / 10) * 100}%\`,
                                    backgroundColor: point.label === 0 ? '#3b82f6' : '#ef4444',
                                    transform: 'translate(-50%, -50%)'
                                }}
                            />
                        ))}
                    </div>

                    <p className="text-xs text-gray-500 mt-2">
                        Points added: {points.length} | Current class: {currentClass}
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}`
};

// Write all files
Object.entries(componentTemplates).forEach(([filePath, content]) => {
    const fullPath = path.join(__dirname, '..', filePath);
    const dir = path.dirname(fullPath);

    // Create directory if it doesn't exist
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(fullPath, content);
    console.log(\`Created: \${filePath}\`);
});

console.log('All KNN components generated successfully!');
