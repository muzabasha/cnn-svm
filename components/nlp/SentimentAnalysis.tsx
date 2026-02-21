'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Smile, Frown, Meh } from 'lucide-react'

export function SentimentAnalysis() {
    const [text, setText] = useState("I love this product! It's amazing and works perfectly.")

    const analyzeSentiment = (text: string) => {
        const positive = ['love', 'amazing', 'perfect', 'great', 'excellent', 'wonderful', 'fantastic']
        const negative = ['hate', 'terrible', 'awful', 'bad', 'poor', 'worst', 'horrible']

        const words = text.toLowerCase().split(/\s+/)
        let score = 0

        words.forEach(word => {
            if (positive.some(p => word.includes(p))) score += 1
            if (negative.some(n => word.includes(n))) score -= 1
        })

        if (score > 0) return { label: 'Positive', score: Math.min(score / words.length * 10, 1), color: 'green' }
        if (score < 0) return { label: 'Negative', score: Math.max(score / words.length * 10, -1), color: 'red' }
        return { label: 'Neutral', score: 0, color: 'gray' }
    }

    const sentiment = analyzeSentiment(text)
    const percentage = Math.abs(sentiment.score * 100)

    return (
        <div className="space-y-4 sm:space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Sentiment Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">
                        Sentiment analysis classifies text as positive, negative, or neutral,
                        helping understand emotions and opinions in text data.
                    </p>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Enter Text:</label>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                            rows={4}
                            placeholder="Type something to analyze..."
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-semibold mb-3 text-sm sm:text-base">Sentiment Result</h3>
                            <div className={`p-6 rounded-lg ${sentiment.label === 'Positive' ? 'bg-green-50' :
                                    sentiment.label === 'Negative' ? 'bg-red-50' : 'bg-gray-50'
                                }`}>
                                <div className="flex items-center justify-center mb-4">
                                    {sentiment.label === 'Positive' && <Smile className="w-16 h-16 text-green-600" />}
                                    {sentiment.label === 'Negative' && <Frown className="w-16 h-16 text-red-600" />}
                                    {sentiment.label === 'Neutral' && <Meh className="w-16 h-16 text-gray-600" />}
                                </div>
                                <p className="text-center text-2xl font-bold mb-2">{sentiment.label}</p>
                                <p className="text-center text-sm text-gray-600">
                                    Confidence: {percentage.toFixed(0)}%
                                </p>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-3 text-sm sm:text-base">Sentiment Distribution</h3>
                            <div className="space-y-3">
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-green-700">Positive</span>
                                        <span>{sentiment.label === 'Positive' ? percentage.toFixed(0) : 0}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div
                                            className="bg-green-500 h-3 rounded-full transition-all"
                                            style={{ width: sentiment.label === 'Positive' ? `${percentage}%` : '0%' }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-700">Neutral</span>
                                        <span>{sentiment.label === 'Neutral' ? '100' : '0'}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div
                                            className="bg-gray-500 h-3 rounded-full transition-all"
                                            style={{ width: sentiment.label === 'Neutral' ? '100%' : '0%' }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-red-700">Negative</span>
                                        <span>{sentiment.label === 'Negative' ? percentage.toFixed(0) : 0}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div
                                            className="bg-red-500 h-3 rounded-full transition-all"
                                            style={{ width: sentiment.label === 'Negative' ? `${percentage}%` : '0%' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Applications</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                        <div className="p-3 sm:p-4 bg-blue-50 rounded-lg">
                            <h4 className="font-semibold text-blue-900 mb-1 text-sm">Social Media</h4>
                            <p className="text-xs text-blue-700">Monitor brand perception</p>
                        </div>
                        <div className="p-3 sm:p-4 bg-green-50 rounded-lg">
                            <h4 className="font-semibold text-green-900 mb-1 text-sm">Customer Reviews</h4>
                            <p className="text-xs text-green-700">Analyze product feedback</p>
                        </div>
                        <div className="p-3 sm:p-4 bg-purple-50 rounded-lg">
                            <h4 className="font-semibold text-purple-900 mb-1 text-sm">Market Research</h4>
                            <p className="text-xs text-purple-700">Understand consumer sentiment</p>
                        </div>
                        <div className="p-3 sm:p-4 bg-pink-50 rounded-lg">
                            <h4 className="font-semibold text-pink-900 mb-1 text-sm">Support Tickets</h4>
                            <p className="text-xs text-pink-700">Prioritize urgent issues</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
