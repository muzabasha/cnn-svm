'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'
import { BlockMath } from 'react-katex'

export function TextClassification() {
    const [inputText, setInputText] = useState('')
    const [result, setResult] = useState<{ class: string; spamProb: number; hamProb: number } | null>(null)

    const vocabulary = {
        spam: ['free', 'win', 'prize', 'click', 'offer', 'money', 'buy', 'discount'],
        ham: ['meeting', 'schedule', 'project', 'report', 'team', 'work', 'please', 'thanks']
    }

    const classify = () => {
        const words = inputText.toLowerCase().split(/\s+/)
        let spamScore = 0.5 // Prior
        let hamScore = 0.5

        words.forEach(word => {
            if (vocabulary.spam.includes(word)) spamScore += 0.15
            if (vocabulary.ham.includes(word)) hamScore += 0.15
        })

        const total = spamScore + hamScore
        const spamProb = spamScore / total
        const hamProb = hamScore / total

        setResult({
            class: spamProb > hamProb ? 'SPAM' : 'HAM',
            spamProb,
            hamProb
        })
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Text Classification: Spam vs Ham</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div className="bg-violet-50 border border-violet-200 rounded-xl p-6">
                        <h4 className="font-semibold text-violet-900 mb-3">How It Works</h4>
                        <BlockMath math="P(Spam|words) = \frac{P(words|Spam) \cdot P(Spam)}{P(words)}" />
                        <p className="text-sm text-gray-700 mt-3">
                            Naive Bayes assumes word independence: P(w₁,w₂|Spam) = P(w₁|Spam) × P(w₂|Spam)
                        </p>
                    </div>

                    <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                        <h4 className="font-semibold mb-4">Enter Text to Classify</h4>
                        <textarea
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Type a message... (e.g., 'Free prize! Click now to win money!')"
                            className="w-full p-3 border rounded-lg mb-4 h-24"
                        />
                        <Button onClick={classify} disabled={!inputText.trim()} className="w-full">
                            <Send className="w-4 h-4 mr-2" />
                            Classify Text
                        </Button>
                    </div>

                    {result && (
                        <div className={`border-2 rounded-xl p-6 ${result.class === 'SPAM' ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'
                            }`}>
                            <h4 className="font-semibold mb-4">Classification Result</h4>
                            <p className="text-3xl font-bold mb-4">
                                {result.class === 'SPAM' ? '🚫 SPAM' : '✅ HAM (Not Spam)'}
                            </p>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm mb-1">Spam Probability</p>
                                    <div className="h-6 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-red-500"
                                            style={{ width: `${result.spamProb * 100}%` }}
                                        />
                                    </div>
                                    <p className="text-xs text-gray-600 mt-1">{(result.spamProb * 100).toFixed(1)}%</p>
                                </div>
                                <div>
                                    <p className="text-sm mb-1">Ham Probability</p>
                                    <div className="h-6 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-green-500"
                                            style={{ width: `${result.hamProb * 100}%` }}
                                        />
                                    </div>
                                    <p className="text-xs text-gray-600 mt-1">{(result.hamProb * 100).toFixed(1)}%</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <h5 className="font-semibold text-red-900 mb-2">Spam Keywords</h5>
                            <div className="flex flex-wrap gap-2">
                                {vocabulary.spam.map(word => (
                                    <span key={word} className="px-2 py-1 bg-red-200 text-red-800 text-xs rounded">
                                        {word}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <h5 className="font-semibold text-green-900 mb-2">Ham Keywords</h5>
                            <div className="flex flex-wrap gap-2">
                                {vocabulary.ham.map(word => (
                                    <span key={word} className="px-2 py-1 bg-green-200 text-green-800 text-xs rounded">
                                        {word}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
