'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function TokenizationModule() {
    const [text, setText] = useState("Hello, how are you doing today?")
    const [method, setMethod] = useState<'word' | 'bpe' | 'wordpiece'>('word')

    const tokenizeWord = (text: string) => text.split(/\s+/)

    const tokenizeBPE = (text: string) => {
        // Simplified BPE simulation
        return text.toLowerCase().split('').reduce((acc: string[], char) => {
            if (char === ' ') return [...acc, '▁']
            return [...acc, char]
        }, [])
    }

    const tokenizeWordPiece = (text: string) => {
        // Simplified WordPiece simulation
        const words = text.split(/\s+/)
        return words.flatMap((word, i) => {
            if (word.length <= 4) return [word]
            const mid = Math.floor(word.length / 2)
            return [word.slice(0, mid), '##' + word.slice(mid)]
        })
    }

    const tokens = method === 'word' ? tokenizeWord(text) :
        method === 'bpe' ? tokenizeBPE(text) :
            tokenizeWordPiece(text)

    return (
        <div className="space-y-4 sm:space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Tokenization: Breaking Text into Units</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">
                        Tokenization converts text into smaller units (tokens) that models can process.
                        Different methods balance vocabulary size and representation quality.
                    </p>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Input Text:</label>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                            rows={3}
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
                        <button
                            onClick={() => setMethod('word')}
                            className={`p-3 rounded-lg text-sm font-medium ${method === 'word' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                        >
                            Word-Level
                        </button>
                        <button
                            onClick={() => setMethod('bpe')}
                            className={`p-3 rounded-lg text-sm font-medium ${method === 'bpe' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                        >
                            BPE
                        </button>
                        <button
                            onClick={() => setMethod('wordpiece')}
                            className={`p-3 rounded-lg text-sm font-medium ${method === 'wordpiece' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                        >
                            WordPiece
                        </button>
                    </div>

                    <div className="p-4 bg-indigo-50 rounded-lg">
                        <p className="text-sm font-semibold text-indigo-900 mb-2">Tokens ({tokens.length}):</p>
                        <div className="flex flex-wrap gap-2">
                            {tokens.map((token, i) => (
                                <span key={i} className="px-3 py-1 bg-white border-2 border-indigo-300 rounded-lg text-sm font-mono">
                                    {token}
                                </span>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Tokenization Methods</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <h4 className="font-semibold text-blue-900 mb-2">Word-Level</h4>
                            <p className="text-sm text-blue-700 mb-2">Split by whitespace/punctuation</p>
                            <p className="text-xs text-blue-600">✓ Simple, intuitive</p>
                            <p className="text-xs text-blue-600">✗ Large vocabulary</p>
                            <p className="text-xs text-blue-600">✗ OOV problems</p>
                        </div>
                        <div className="p-4 bg-purple-50 rounded-lg">
                            <h4 className="font-semibold text-purple-900 mb-2">BPE</h4>
                            <p className="text-sm text-purple-700 mb-2">Byte Pair Encoding</p>
                            <p className="text-xs text-purple-600">✓ Subword units</p>
                            <p className="text-xs text-purple-600">✓ Handles rare words</p>
                            <p className="text-xs text-purple-600">Used in: GPT, RoBERTa</p>
                        </div>
                        <div className="p-4 bg-pink-50 rounded-lg">
                            <h4 className="font-semibold text-pink-900 mb-2">WordPiece</h4>
                            <p className="text-sm text-pink-700 mb-2">Likelihood-based merging</p>
                            <p className="text-xs text-pink-600">✓ Balanced vocabulary</p>
                            <p className="text-xs text-pink-600">✓ Good for morphology</p>
                            <p className="text-xs text-pink-600">Used in: BERT</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
