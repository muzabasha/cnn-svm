'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { BlockMath, InlineMath } from 'react-katex'

export function AttentionMechanism() {
    const [selectedWord, setSelectedWord] = useState(2)

    const sentence = ['The', 'cat', 'sat', 'on', 'the', 'mat']

    // Simulated attention weights (how much each word attends to others)
    const attentionWeights = [
        [0.8, 0.1, 0.05, 0.02, 0.02, 0.01], // The
        [0.1, 0.7, 0.15, 0.02, 0.02, 0.01], // cat
        [0.05, 0.2, 0.6, 0.1, 0.03, 0.02],  // sat
        [0.02, 0.05, 0.15, 0.6, 0.15, 0.03], // on
        [0.02, 0.02, 0.05, 0.2, 0.6, 0.11],  // the
        [0.01, 0.02, 0.05, 0.1, 0.2, 0.62]   // mat
    ]

    const currentAttention = attentionWeights[selectedWord]

    return (
        <div className="space-y-4 sm:space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Attention Mechanism: Focus on What Matters</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">
                        Attention allows models to focus on relevant parts of the input when processing each word,
                        enabling better understanding of context and relationships.
                    </p>

                    <div className="bg-indigo-50 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6 overflow-x-auto">
                        <p className="text-xs sm:text-sm font-semibold text-indigo-900 mb-2">Attention Formula:</p>
                        <BlockMath math="\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V" />
                        <p className="text-xs text-indigo-700 mt-2">Q = Query, K = Key, V = Value, d<sub>k</sub> = dimension</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Select Query Word</h3>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {sentence.map((word, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedWord(idx)}
                                        className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedWord === idx
                                                ? 'bg-indigo-600 text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {word}
                                    </button>
                                ))}
                            </div>

                            <div className="p-4 bg-purple-50 rounded-lg">
                                <p className="text-sm font-semibold text-purple-900 mb-2">How Attention Works:</p>
                                <ol className="text-xs sm:text-sm text-purple-700 space-y-1">
                                    <li>1. Compute Query (Q) from current word</li>
                                    <li>2. Compute Keys (K) from all words</li>
                                    <li>3. Calculate attention scores: Q · K</li>
                                    <li>4. Apply softmax to get weights</li>
                                    <li>5. Weighted sum of Values (V)</li>
                                </ol>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
                                Attention Weights for "{sentence[selectedWord]}"
                            </h3>

                            <div className="space-y-2">
                                {sentence.map((word, idx) => {
                                    const weight = currentAttention[idx]
                                    const percentage = (weight * 100).toFixed(1)
                                    return (
                                        <div key={idx} className="space-y-1">
                                            <div className="flex justify-between text-xs sm:text-sm">
                                                <span className="font-medium">{word}</span>
                                                <span className="text-gray-600">{percentage}%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4">
                                                <div
                                                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 sm:h-4 rounded-full transition-all duration-300"
                                                    style={{ width: `${percentage}%` }}
                                                />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            <div className="mt-4 p-3 bg-indigo-50 rounded-lg">
                                <p className="text-xs sm:text-sm text-indigo-700">
                                    Higher weights = more attention. The model focuses most on "{sentence[currentAttention.indexOf(Math.max(...currentAttention))]}"
                                    when processing "{sentence[selectedWord]}".
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Multi-Head Attention</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">
                        Multiple attention heads allow the model to attend to different aspects of the input simultaneously.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                        <div className="p-3 sm:p-4 bg-blue-50 rounded-lg">
                            <h4 className="font-semibold text-blue-900 mb-2 text-sm">Head 1</h4>
                            <p className="text-xs text-blue-700">Focuses on syntax</p>
                        </div>
                        <div className="p-3 sm:p-4 bg-green-50 rounded-lg">
                            <h4 className="font-semibold text-green-900 mb-2 text-sm">Head 2</h4>
                            <p className="text-xs text-green-700">Captures semantics</p>
                        </div>
                        <div className="p-3 sm:p-4 bg-purple-50 rounded-lg">
                            <h4 className="font-semibold text-purple-900 mb-2 text-sm">Head 3</h4>
                            <p className="text-xs text-purple-700">Long-range dependencies</p>
                        </div>
                        <div className="p-3 sm:p-4 bg-pink-50 rounded-lg">
                            <h4 className="font-semibold text-pink-900 mb-2 text-sm">Head 4</h4>
                            <p className="text-xs text-pink-700">Local context</p>
                        </div>
                    </div>

                    <div className="mt-4 bg-indigo-50 p-4 rounded-lg overflow-x-auto">
                        <p className="text-sm font-semibold text-indigo-900 mb-2">Multi-Head Formula:</p>
                        <BlockMath math="\text{MultiHead}(Q,K,V) = \text{Concat}(\text{head}_1,...,\text{head}_h)W^O" />
                        <p className="text-xs text-indigo-700 mt-2">where head<sub>i</sub> = Attention(QW<sub>i</sub><sup>Q</sup>, KW<sub>i</sub><sup>K</sup>, VW<sub>i</sub><sup>V</sup>)</p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Self-Attention vs Cross-Attention</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <h4 className="font-semibold text-blue-900 mb-2">Self-Attention</h4>
                            <p className="text-sm text-blue-700 mb-2">Q, K, V from same sequence</p>
                            <p className="text-xs text-blue-600">Used in: BERT, GPT encoders</p>
                            <p className="text-xs text-blue-600 mt-2">Purpose: Understand relationships within input</p>
                        </div>
                        <div className="p-4 bg-purple-50 rounded-lg">
                            <h4 className="font-semibold text-purple-900 mb-2">Cross-Attention</h4>
                            <p className="text-sm text-purple-700 mb-2">Q from one sequence, K,V from another</p>
                            <p className="text-xs text-purple-600">Used in: Translation, image captioning</p>
                            <p className="text-xs text-purple-600 mt-2">Purpose: Connect encoder and decoder</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
