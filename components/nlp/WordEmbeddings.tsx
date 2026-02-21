'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from 'recharts'
import { BlockMath, InlineMath } from 'react-katex'

export function WordEmbeddings() {
    const [dimensions, setDimensions] = useState(2)
    const [selectedWord, setSelectedWord] = useState('king')

    // Simulated word embeddings (in reality, these would be 300D vectors)
    const wordVectors: Record<string, { x: number, y: number, label: string }> = {
        'king': { x: 2, y: 3, label: 'king' },
        'queen': { x: 2.5, y: 2.8, label: 'queen' },
        'man': { x: 1, y: 1, label: 'man' },
        'woman': { x: 1.5, y: 0.8, label: 'woman' },
        'prince': { x: 2.2, y: 2.5, label: 'prince' },
        'princess': { x: 2.7, y: 2.3, label: 'princess' },
        'boy': { x: 0.8, y: 1.2, label: 'boy' },
        'girl': { x: 1.3, y: 1, label: 'girl' }
    }

    const data = Object.values(wordVectors)

    const cosineSimilarity = (word1: string, word2: string) => {
        const v1 = wordVectors[word1]
        const v2 = wordVectors[word2]
        if (!v1 || !v2) return 0

        const dotProduct = v1.x * v2.x + v1.y * v2.y
        const mag1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y)
        const mag2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y)
        return dotProduct / (mag1 * mag2)
    }

    const similarities = Object.keys(wordVectors)
        .filter(w => w !== selectedWord)
        .map(w => ({ word: w, similarity: cosineSimilarity(selectedWord, w) }))
        .sort((a, b) => b.similarity - a.similarity)

    return (
        <div className="space-y-4 sm:space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Word Embeddings: Semantic Vector Spaces</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">
                        Word embeddings represent words as dense vectors in a continuous space where semantically similar words are closer together.
                    </p>

                    <div className="bg-indigo-50 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6 overflow-x-auto">
                        <p className="text-xs sm:text-sm font-semibold text-indigo-900 mb-2">Famous Word Analogy:</p>
                        <BlockMath math="\text{king} - \text{man} + \text{woman} \approx \text{queen}" />
                        <p className="text-xs text-indigo-700 mt-2">Vector arithmetic captures semantic relationships!</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Select Word</h3>

                            <div className="grid grid-cols-2 gap-2 mb-4">
                                {Object.keys(wordVectors).map(word => (
                                    <button
                                        key={word}
                                        onClick={() => setSelectedWord(word)}
                                        className={`p-2 sm:p-3 rounded-lg text-sm font-medium transition-all ${selectedWord === word
                                                ? 'bg-indigo-600 text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {word}
                                    </button>
                                ))}
                            </div>

                            <div className="mt-4 sm:mt-6">
                                <h4 className="font-semibold mb-2 text-sm sm:text-base">Most Similar Words:</h4>
                                <div className="space-y-2">
                                    {similarities.slice(0, 3).map((item, i) => (
                                        <div key={i} className="p-2 sm:p-3 bg-indigo-50 rounded-lg flex justify-between items-center">
                                            <span className="font-medium text-sm sm:text-base">{item.word}</span>
                                            <span className="text-xs sm:text-sm text-indigo-700">
                                                {(item.similarity * 100).toFixed(1)}% similar
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">2D Embedding Space</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis type="number" dataKey="x" domain={[0, 4]} tick={{ fontSize: 12 }}>
                                        <Label value="Dimension 1" position="insideBottom" offset={-10} />
                                    </XAxis>
                                    <YAxis type="number" dataKey="y" domain={[0, 4]} tick={{ fontSize: 12 }}>
                                        <Label value="Dimension 2" angle={-90} position="insideLeft" />
                                    </YAxis>
                                    <Tooltip
                                        content={({ payload }) => {
                                            if (payload && payload.length > 0) {
                                                const data = payload[0].payload
                                                return (
                                                    <div className="bg-white p-2 border rounded shadow-lg">
                                                        <p className="font-semibold">{data.label}</p>
                                                        <p className="text-xs">({data.x.toFixed(2)}, {data.y.toFixed(2)})</p>
                                                    </div>
                                                )
                                            }
                                            return null
                                        }}
                                    />
                                    <Scatter
                                        data={data}
                                        fill="#6366f1"
                                        shape={(props: any) => {
                                            const { cx, cy, payload } = props
                                            const isSelected = payload.label === selectedWord
                                            return (
                                                <g>
                                                    <circle
                                                        cx={cx}
                                                        cy={cy}
                                                        r={isSelected ? 8 : 6}
                                                        fill={isSelected ? '#ef4444' : '#6366f1'}
                                                        stroke={isSelected ? '#dc2626' : '#4f46e5'}
                                                        strokeWidth={2}
                                                    />
                                                    <text
                                                        x={cx}
                                                        y={cy - 12}
                                                        textAnchor="middle"
                                                        fontSize={11}
                                                        fontWeight={isSelected ? 'bold' : 'normal'}
                                                        fill={isSelected ? '#ef4444' : '#374151'}
                                                    >
                                                        {payload.label}
                                                    </text>
                                                </g>
                                            )
                                        }}
                                    />
                                </ScatterChart>
                            </ResponsiveContainer>
                            <p className="text-xs text-gray-500 mt-2 text-center">
                                Red = Selected word | Blue = Other words
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Embedding Techniques</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                        <div className="p-3 sm:p-4 bg-blue-50 rounded-lg">
                            <h4 className="font-semibold text-blue-900 mb-2 text-sm sm:text-base">Word2Vec</h4>
                            <p className="text-xs sm:text-sm text-blue-700 mb-2">Skip-gram & CBOW models</p>
                            <p className="text-xs text-blue-600">Predicts context from word or vice versa</p>
                        </div>
                        <div className="p-3 sm:p-4 bg-purple-50 rounded-lg">
                            <h4 className="font-semibold text-purple-900 mb-2 text-sm sm:text-base">GloVe</h4>
                            <p className="text-xs sm:text-sm text-purple-700 mb-2">Global Vectors</p>
                            <p className="text-xs text-purple-600">Uses word co-occurrence statistics</p>
                        </div>
                        <div className="p-3 sm:p-4 bg-pink-50 rounded-lg">
                            <h4 className="font-semibold text-pink-900 mb-2 text-sm sm:text-base">FastText</h4>
                            <p className="text-xs sm:text-sm text-pink-700 mb-2">Subword embeddings</p>
                            <p className="text-xs text-pink-600">Handles out-of-vocabulary words</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
