'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Vote } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export function VotingMechanism() {
    const [votes, setVotes] = useState<{ tree: number; prediction: string }[]>([])
    const [showResult, setShowResult] = useState(false)

    const runVoting = () => {
        const newVotes = Array.from({ length: 7 }, (_, i) => ({
            tree: i + 1,
            prediction: Math.random() > 0.4 ? 'Class A' : 'Class B'
        }))
        setVotes(newVotes)
        setShowResult(true)
    }

    const classACounts = votes.filter(v => v.prediction === 'Class A').length
    const classBCounts = votes.filter(v => v.prediction === 'Class B').length
    const finalPrediction = classACounts > classBCounts ? 'Class A' : 'Class B'

    const chartData = [
        { name: 'Class A', votes: classACounts, fill: '#10b981' },
        { name: 'Class B', votes: classBCounts, fill: '#ef4444' }
    ]

    return (
        <Card>
            <CardHeader>
                <CardTitle>Voting Mechanism</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div className="bg-sky-50 border border-sky-200 rounded-xl p-6">
                        <h4 className="font-semibold text-sky-900 mb-3">How Voting Works</h4>
                        <div className="space-y-3 text-sm text-gray-700">
                            <div className="bg-white p-3 rounded-lg">
                                <p className="font-semibold mb-1">Classification (Majority Vote)</p>
                                <p className="text-xs">Each tree votes for a class. The class with most votes wins.</p>
                            </div>
                            <div className="bg-white p-3 rounded-lg">
                                <p className="font-semibold mb-1">Regression (Average)</p>
                                <p className="text-xs">Each tree predicts a number. Final prediction = average of all predictions.</p>
                            </div>
                            <div className="bg-white p-3 rounded-lg">
                                <p className="font-semibold mb-1">Weighted Voting (Optional)</p>
                                <p className="text-xs">Trees can have different weights based on their accuracy.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                        <Button onClick={runVoting} className="w-full mb-6">
                            <Vote className="w-4 h-4 mr-2" />
                            Run Voting Simulation
                        </Button>

                        {votes.length > 0 && (
                            <div className="space-y-4">
                                <div className="grid grid-cols-7 gap-2">
                                    {votes.map((vote) => (
                                        <div
                                            key={vote.tree}
                                            className={`p-3 rounded-lg text-center ${vote.prediction === 'Class A'
                                                    ? 'bg-green-100 border-2 border-green-500'
                                                    : 'bg-red-100 border-2 border-red-500'
                                                }`}
                                        >
                                            <div className="text-2xl mb-1">🌳</div>
                                            <p className="text-xs font-semibold">Tree {vote.tree}</p>
                                            <p className={`text-xs font-bold mt-1 ${vote.prediction === 'Class A' ? 'text-green-700' : 'text-red-700'
                                                }`}>
                                                {vote.prediction}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <ResponsiveContainer width="100%" height={250}>
                                    <BarChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="votes" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        )}
                    </div>

                    {showResult && votes.length > 0 && (
                        <div className={`border-2 rounded-xl p-6 ${finalPrediction === 'Class A' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                            }`}>
                            <h4 className="font-semibold mb-3">Final Prediction</h4>
                            <p className="text-3xl font-bold mb-4">{finalPrediction}</p>
                            <div className="space-y-2 text-sm">
                                <p>Class A votes: {classACounts} / {votes.length}</p>
                                <p>Class B votes: {classBCounts} / {votes.length}</p>
                                <p className="text-gray-600 mt-3">
                                    Winner: {finalPrediction} ({Math.round((Math.max(classACounts, classBCounts) / votes.length) * 100)}% agreement)
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <h5 className="font-semibold text-green-900 mb-2">Advantages</h5>
                            <ul className="text-sm text-gray-700 space-y-1">
                                <li>• Reduces impact of individual tree errors</li>
                                <li>• More stable predictions</li>
                                <li>• Handles outliers better</li>
                                <li>• Confidence from vote distribution</li>
                            </ul>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h5 className="font-semibold text-blue-900 mb-2">Confidence Levels</h5>
                            <ul className="text-sm text-gray-700 space-y-1">
                                <li>• 7/7 votes: Very high confidence</li>
                                <li>• 5-6/7 votes: High confidence</li>
                                <li>• 4/7 votes: Low confidence</li>
                                <li>• Close votes suggest uncertainty</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                        <h4 className="font-semibold text-yellow-900 mb-2">💡 Key Insight</h4>
                        <p className="text-sm text-gray-700">
                            The voting mechanism is what makes Random Forest an "ensemble" method. By combining
                            predictions from multiple diverse trees, we get more accurate and robust predictions
                            than any single tree could provide.
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
