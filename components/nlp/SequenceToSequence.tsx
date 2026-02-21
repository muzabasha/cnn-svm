'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'
import { BlockMath } from 'react-katex'

export function SequenceToSequence() {
    const [sourceText, setSourceText] = useState("Hello, how are you?")

    // Simulated translation
    const translations: Record<string, string> = {
        "Hello, how are you?": "Bonjour, comment allez-vous?",
        "Good morning": "Bonjour",
        "Thank you": "Merci",
        "I love programming": "J'aime la programmation"
    }

    const targetText = translations[sourceText] || "Translation..."

    return (
        <div className="space-y-4 sm:space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Sequence-to-Sequence Models</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">
                        Seq2Seq models transform one sequence into another, enabling tasks like translation,
                        summarization, and dialogue generation.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center mb-6">
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <p className="text-xs font-semibold text-blue-900 mb-2">Source (English)</p>
                            <textarea
                                value={sourceText}
                                onChange={(e) => setSourceText(e.target.value)}
                                className="w-full p-2 border rounded text-sm"
                                rows={3}
                            />
                        </div>

                        <div className="flex justify-center">
                            <ArrowRight className="w-8 h-8 text-indigo-600" />
                        </div>

                        <div className="p-4 bg-purple-50 rounded-lg">
                            <p className="text-xs font-semibold text-purple-900 mb-2">Target (French)</p>
                            <div className="p-2 bg-white border rounded text-sm min-h-[72px]">
                                {targetText}
                            </div>
                        </div>
                    </div>

                    <div className="bg-indigo-50 p-4 rounded-lg overflow-x-auto">
                        <p className="text-sm font-semibold text-indigo-900 mb-2">Seq2Seq Architecture:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                            <div>
                                <p className="font-semibold text-indigo-900 mb-1">1. Encoder</p>
                                <p className="text-indigo-700">Processes source sequence</p>
                                <p className="text-indigo-700">Creates context vector</p>
                            </div>
                            <div>
                                <p className="font-semibold text-indigo-900 mb-1">2. Context</p>
                                <p className="text-indigo-700">Fixed-size representation</p>
                                <p className="text-indigo-700">Captures meaning</p>
                            </div>
                            <div>
                                <p className="font-semibold text-indigo-900 mb-1">3. Decoder</p>
                                <p className="text-indigo-700">Generates target sequence</p>
                                <p className="text-indigo-700">One token at a time</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Decoding Strategies</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="p-4 bg-green-50 rounded-lg">
                            <h4 className="font-semibold text-green-900 mb-2">Greedy Decoding</h4>
                            <p className="text-sm text-green-700 mb-2">Pick highest probability token</p>
                            <p className="text-xs text-green-600">✓ Fast</p>
                            <p className="text-xs text-green-600">✗ May miss better sequences</p>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <h4 className="font-semibold text-blue-900 mb-2">Beam Search</h4>
                            <p className="text-sm text-blue-700 mb-2">Keep top-k candidates</p>
                            <p className="text-xs text-blue-600">✓ Better quality</p>
                            <p className="text-xs text-blue-600">✓ Explores alternatives</p>
                        </div>
                        <div className="p-4 bg-purple-50 rounded-lg">
                            <h4 className="font-semibold text-purple-900 mb-2">Sampling</h4>
                            <p className="text-sm text-purple-700 mb-2">Sample from distribution</p>
                            <p className="text-xs text-purple-600">✓ More diverse</p>
                            <p className="text-xs text-purple-600">✓ Creative outputs</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
