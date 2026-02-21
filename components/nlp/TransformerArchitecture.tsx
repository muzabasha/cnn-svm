'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { BlockMath } from 'react-katex'
import { ArrowRight, Layers, Zap } from 'lucide-react'

export function TransformerArchitecture() {
    const [model, setModel] = useState<'bert' | 'gpt'>('bert')

    return (
        <div className="space-y-4 sm:space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Transformer Architecture</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">
                        The Transformer revolutionized NLP by using self-attention instead of recurrence,
                        enabling parallel processing and capturing long-range dependencies.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                            <h3 className="font-semibold mb-3 text-sm sm:text-base">Encoder Stack</h3>
                            <div className="space-y-2">
                                {[1, 2, 3, 4, 5, 6].map((layer) => (
                                    <div key={layer} className="p-3 bg-blue-50 rounded-lg border-2 border-blue-200">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-semibold text-blue-900 text-sm">Layer {layer}</span>
                                            <Layers className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <div className="text-xs text-blue-700 space-y-1">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                Multi-Head Self-Attention
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                Feed-Forward Network
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                Layer Normalization
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-3 text-sm sm:text-base">Decoder Stack</h3>
                            <div className="space-y-2">
                                {[1, 2, 3, 4, 5, 6].map((layer) => (
                                    <div key={layer} className="p-3 bg-purple-50 rounded-lg border-2 border-purple-200">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-semibold text-purple-900 text-sm">Layer {layer}</span>
                                            <Layers className="w-4 h-4 text-purple-600" />
                                        </div>
                                        <div className="text-xs text-purple-700 space-y-1">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                                Masked Self-Attention
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                                Cross-Attention (Encoder)
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                                Feed-Forward Network
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 bg-indigo-50 p-4 rounded-lg overflow-x-auto">
                        <p className="text-sm font-semibold text-indigo-900 mb-2">Key Components:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                            <div>
                                <p className="font-semibold text-indigo-900">Positional Encoding</p>
                                <BlockMath math="PE_{(pos,2i)} = \sin(pos/10000^{2i/d})" />
                            </div>
                            <div>
                                <p className="font-semibold text-indigo-900">Layer Norm</p>
                                <p className="text-indigo-700">Stabilizes training</p>
                            </div>
                            <div>
                                <p className="font-semibold text-indigo-900">Residual Connections</p>
                                <p className="text-indigo-700">Enables deep networks</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Modern Transformer Models</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-2 mb-4">
                        <button
                            onClick={() => setModel('bert')}
                            className={`flex-1 p-3 rounded-lg text-sm font-medium transition-all ${model === 'bert'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            BERT (Encoder-Only)
                        </button>
                        <button
                            onClick={() => setModel('gpt')}
                            className={`flex-1 p-3 rounded-lg text-sm font-medium transition-all ${model === 'gpt'
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            GPT (Decoder-Only)
                        </button>
                    </div>

                    {model === 'bert' ? (
                        <div className="space-y-4">
                            <div className="p-4 bg-blue-50 rounded-lg">
                                <h4 className="font-semibold text-blue-900 mb-2">BERT: Bidirectional Encoder Representations</h4>
                                <p className="text-sm text-blue-700 mb-3">
                                    Pre-trained using Masked Language Modeling (MLM) and Next Sentence Prediction (NSP)
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="p-3 bg-white rounded">
                                        <p className="font-semibold text-sm mb-1">Architecture</p>
                                        <p className="text-xs text-gray-600">Encoder-only (12-24 layers)</p>
                                        <p className="text-xs text-gray-600">Bidirectional context</p>
                                    </div>
                                    <div className="p-3 bg-white rounded">
                                        <p className="font-semibold text-sm mb-1">Best For</p>
                                        <p className="text-xs text-gray-600">Classification</p>
                                        <p className="text-xs text-gray-600">Question Answering</p>
                                        <p className="text-xs text-gray-600">Named Entity Recognition</p>
                                    </div>
                                </div>
                                <div className="mt-3 p-3 bg-blue-100 rounded">
                                    <p className="text-xs font-semibold text-blue-900 mb-1">MLM Example:</p>
                                    <p className="text-xs text-blue-700">
                                        Input: "The cat [MASK] on the mat"<br />
                                        Predict: "sat"
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="p-4 bg-purple-50 rounded-lg">
                                <h4 className="font-semibold text-purple-900 mb-2">GPT: Generative Pre-trained Transformer</h4>
                                <p className="text-sm text-purple-700 mb-3">
                                    Pre-trained using Causal Language Modeling (predicting next token)
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="p-3 bg-white rounded">
                                        <p className="font-semibold text-sm mb-1">Architecture</p>
                                        <p className="text-xs text-gray-600">Decoder-only (12-96+ layers)</p>
                                        <p className="text-xs text-gray-600">Unidirectional (left-to-right)</p>
                                    </div>
                                    <div className="p-3 bg-white rounded">
                                        <p className="font-semibold text-sm mb-1">Best For</p>
                                        <p className="text-xs text-gray-600">Text Generation</p>
                                        <p className="text-xs text-gray-600">Completion</p>
                                        <p className="text-xs text-gray-600">Creative Writing</p>
                                    </div>
                                </div>
                                <div className="mt-3 p-3 bg-purple-100 rounded">
                                    <p className="text-xs font-semibold text-purple-900 mb-1">Autoregressive Example:</p>
                                    <p className="text-xs text-purple-700">
                                        Input: "The cat sat"<br />
                                        Predict next: "on" → "the" → "mat"
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Transformer Variants</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                        <div className="p-3 sm:p-4 bg-green-50 rounded-lg">
                            <h4 className="font-semibold text-green-900 mb-2 text-sm">T5</h4>
                            <p className="text-xs text-green-700">Text-to-Text Transfer Transformer</p>
                            <p className="text-xs text-green-600 mt-1">Encoder-Decoder for all tasks</p>
                        </div>
                        <div className="p-3 sm:p-4 bg-orange-50 rounded-lg">
                            <h4 className="font-semibold text-orange-900 mb-2 text-sm">RoBERTa</h4>
                            <p className="text-xs text-orange-700">Robustly Optimized BERT</p>
                            <p className="text-xs text-orange-600 mt-1">Improved BERT training</p>
                        </div>
                        <div className="p-3 sm:p-4 bg-pink-50 rounded-lg">
                            <h4 className="font-semibold text-pink-900 mb-2 text-sm">BART</h4>
                            <p className="text-xs text-pink-700">Denoising Autoencoder</p>
                            <p className="text-xs text-pink-600 mt-1">Seq2seq tasks</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
