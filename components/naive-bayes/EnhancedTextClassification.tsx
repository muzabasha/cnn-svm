'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ChallengeCard, Challenge } from '@/components/interactive/ChallengeCard'
import { Info, Target, Zap, Mail, MessageSquare } from 'lucide-react'
import { InlineMath, BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'

interface TrainingExample {
    text: string
    label: 'spam' | 'ham'
}

export function EnhancedTextClassification() {
    const [trainingData, setTrainingData] = useState<TrainingExample[]>([
        { text: 'win free money now', label: 'spam' },
        { text: 'meeting at 3pm tomorrow', label: 'ham' },
        { text: 'click here for prize', label: 'spam' },
        { text: 'lunch with team today', label: 'ham' }
    ])
    const [testText, setTestText] = useState('')
    const [prediction, setPrediction] = useState<{ label: string, probabilities: { spam: number, ham: number } } | null>(null)
    const [completedChallenges, setCompletedChallenges] = useState<string[]>([])
    const [newText, setNewText] = useState('')
    const [newLabel, setNewLabel] = useState<'spam' | 'ham'>('spam')

    const classifyText = (text: string) => {
        if (!text.trim() || trainingData.length === 0) return

        const words = text.toLowerCase().split(/\s+/)
        const spamDocs = trainingData.filter(d => d.label === 'spam')
        const hamDocs = trainingData.filter(d => d.label === 'ham')

        const pSpam = spamDocs.length / trainingData.length
        const pHam = hamDocs.length / trainingData.length

        // Calculate word probabilities
        let spamScore = Math.log(pSpam)
        let hamScore = Math.log(pHam)

        words.forEach(word => {
            const spamCount = spamDocs.filter(d => d.text.toLowerCase().includes(word)).length
            const hamCount = hamDocs.filter(d => d.text.toLowerCase().includes(word)).length

            // Laplace smoothing
            const pWordGivenSpam = (spamCount + 1) / (spamDocs.length + 2)
            const pWordGivenHam = (hamCount + 1) / (hamDocs.length + 2)

            spamScore += Math.log(pWordGivenSpam)
            hamScore += Math.log(pWordGivenHam)
        })

        // Convert log scores to probabilities
        const maxScore = Math.max(spamScore, hamScore)
        const spamProb = Math.exp(spamScore - maxScore)
        const hamProb = Math.exp(hamScore - maxScore)
        const total = spamProb + hamProb

        setPrediction({
            label: spamScore > hamScore ? 'spam' : 'ham',
            probabilities: {
                spam: spamProb / total,
                ham: hamProb / total
            }
        })
    }

    const addTrainingExample = () => {
        if (newText.trim()) {
            setTrainingData([...trainingData, { text: newText, label: newLabel }])
            setNewText('')
        }
    }

    const removeExample = (index: number) => {
        setTrainingData(trainingData.filter((_, i) => i !== index))
    }

    const challenges: Challenge[] = [
        {
            id: 'first-classification',
            title: 'First Text Classification',
            description: 'Use the default training data to classify a test message. Try both spam and ham examples.',
            difficulty: 'easy',
            hints: [
                'Type a message in the test box',
                'Click "Classify" to see the prediction',
                'Try messages with words like "free", "win" for spam'
            ],
            successCriteria: 'Classify at least one message',
            points: 10
        },
        {
            id: 'custom-training',
            title: 'Build Your Own Classifier',
            description: 'Add at least 3 custom training examples and test your classifier.',
            difficulty: 'medium',
            hints: [
                'Think of common spam words',
                'Add normal conversation examples',
                'Balance spam and ham examples'
            ],
            successCriteria: 'Add 3+ custom examples and classify a message',
            points: 20
        },
        {
            id: 'edge-cases',
            title: 'Handle Edge Cases',
            description: 'Test your classifier with ambiguous messages that could be either spam or ham.',
            difficulty: 'hard',
            hints: [
                'Try messages with mixed signals',
                'Test with very short messages',
                'See how the classifier handles uncertainty'
            ],
            successCriteria: 'Classify 3+ different test messages',
            points: 30
        }
    ]

    const checkChallengeSuccess = (challengeId: string) => {
        switch (challengeId) {
            case 'first-classification':
                return prediction !== null
            case 'custom-training':
                return trainingData.length >= 7 && prediction !== null
            case 'edge-cases':
                return prediction !== null && trainingData.length >= 6
            default:
                return false
        }
    }

    const handleChallengeComplete = (challengeId: string) => {
        if (!completedChallenges.includes(challengeId)) {
            setCompletedChallenges([...completedChallenges, challengeId])
        }
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Zap className="w-6 h-6 text-yellow-500" />
                        Interactive Text Classification - Learn by Doing!
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="explore" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="explore">🔍 Explore</TabsTrigger>
                            <TabsTrigger value="learn">📚 Learn</TabsTrigger>
                            <TabsTrigger value="challenge">🏆 Challenges</TabsTrigger>
                        </TabsList>

                        <TabsContent value="explore" className="space-y-4">
                            <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                <div className="text-sm text-blue-800">
                                    <p className="font-semibold mb-1">Free Exploration Mode</p>
                                    <p>Train your own spam classifier! Add training examples and test with custom messages.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="p-4 bg-white rounded-lg border-2 border-gray-200">
                                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                                            <MessageSquare className="w-5 h-5 text-blue-600" />
                                            Training Data
                                        </h3>
                                        <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
                                            {trainingData.map((example, idx) => (
                                                <div
                                                    key={idx}
                                                    className={`p-3 rounded-lg border-2 flex justify-between items-start ${example.label === 'spam'
                                                        ? 'bg-red-50 border-red-200'
                                                        : 'bg-green-50 border-green-200'
                                                        }`}
                                                >
                                                    <div className="flex-1">
                                                        <p className="text-sm font-medium">{example.text}</p>
                                                        <p className="text-xs text-gray-600 mt-1">
                                                            Label: {example.label}
                                                        </p>
                                                    </div>
                                                    <button
                                                        onClick={() => removeExample(idx)}
                                                        className="text-red-600 hover:text-red-800 text-xs ml-2"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="space-y-2 pt-4 border-t border-gray-200">
                                            <input
                                                type="text"
                                                value={newText}
                                                onChange={(e) => setNewText(e.target.value)}
                                                placeholder="Enter training text..."
                                                className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                                            />
                                            <div className="flex gap-2">
                                                <select
                                                    value={newLabel}
                                                    onChange={(e) => setNewLabel(e.target.value as 'spam' | 'ham')}
                                                    className="flex-1 p-2 border border-gray-300 rounded-lg text-sm"
                                                >
                                                    <option value="spam">Spam</option>
                                                    <option value="ham">Ham (Not Spam)</option>
                                                </select>
                                                <Button onClick={addTrainingExample} className="px-4">
                                                    Add
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                                        <p className="text-sm font-semibold text-purple-900 mb-2">Statistics</p>
                                        <div className="space-y-1 text-xs text-purple-800">
                                            <p>Total examples: {trainingData.length}</p>
                                            <p>Spam: {trainingData.filter(d => d.label === 'spam').length}</p>
                                            <p>Ham: {trainingData.filter(d => d.label === 'ham').length}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="p-4 bg-white rounded-lg border-2 border-gray-200">
                                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                                            <Mail className="w-5 h-5 text-purple-600" />
                                            Test Your Classifier
                                        </h3>
                                        <textarea
                                            value={testText}
                                            onChange={(e) => setTestText(e.target.value)}
                                            placeholder="Enter a message to classify..."
                                            className="w-full p-3 border border-gray-300 rounded-lg text-sm h-32 resize-none"
                                        />
                                        <Button
                                            onClick={() => classifyText(testText)}
                                            className="w-full mt-3"
                                        >
                                            Classify Message
                                        </Button>
                                    </div>

                                    {prediction && (
                                        <div className={`p-4 rounded-lg border-2 ${prediction.label === 'spam'
                                            ? 'bg-red-50 border-red-300'
                                            : 'bg-green-50 border-green-300'
                                            }`}>
                                            <p className="text-sm font-semibold mb-2">
                                                Prediction: <span className="text-lg">{prediction.label.toUpperCase()}</span>
                                            </p>
                                            <div className="space-y-2">
                                                <div>
                                                    <div className="flex justify-between text-xs mb-1">
                                                        <span>Spam</span>
                                                        <span>{(prediction.probabilities.spam * 100).toFixed(1)}%</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div
                                                            className="bg-red-500 h-2 rounded-full transition-all"
                                                            style={{ width: `${prediction.probabilities.spam * 100}%` }}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex justify-between text-xs mb-1">
                                                        <span>Ham</span>
                                                        <span>{(prediction.probabilities.ham * 100).toFixed(1)}%</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div
                                                            className="bg-green-500 h-2 rounded-full transition-all"
                                                            style={{ width: `${prediction.probabilities.ham * 100}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="learn" className="space-y-4">
                            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                                <h3 className="text-lg font-semibold mb-3">How Naive Bayes Classification Works</h3>

                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm font-semibold mb-2">1. Bayes' Theorem</p>
                                        <p className="text-sm text-gray-700 mb-2">
                                            Calculate the probability of each class given the text:
                                        </p>
                                        <div className="overflow-x-auto bg-white p-3 rounded">
                                            <BlockMath math="P(C|D) = \frac{P(D|C) \cdot P(C)}{P(D)}" />
                                        </div>
                                        <p className="text-xs text-gray-600 mt-2">
                                            Where C is the class (spam/ham) and D is the document (message)
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold mb-2">2. Naive Independence Assumption</p>
                                        <p className="text-sm text-gray-700 mb-2">
                                            Assume words are independent (naive assumption):
                                        </p>
                                        <div className="overflow-x-auto bg-white p-3 rounded">
                                            <BlockMath math="P(D|C) = P(w_1|C) \cdot P(w_2|C) \cdot ... \cdot P(w_n|C)" />
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold mb-2">3. Word Probability with Laplace Smoothing</p>
                                        <p className="text-sm text-gray-700 mb-2">
                                            Calculate probability of each word in the class:
                                        </p>
                                        <div className="overflow-x-auto bg-white p-3 rounded">
                                            <BlockMath math="P(w_i|C) = \frac{\text{count}(w_i, C) + 1}{\text{count}(C) + |V|}" />
                                        </div>
                                        <p className="text-xs text-gray-600 mt-2">
                                            Adding 1 prevents zero probabilities (Laplace smoothing)
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold mb-2">4. Final Classification</p>
                                        <p className="text-sm text-gray-700 mb-2">
                                            Choose the class with highest probability:
                                        </p>
                                        <div className="overflow-x-auto bg-white p-3 rounded">
                                            <BlockMath math="\text{class} = \arg\max_{C} P(C|D)" />
                                        </div>
                                    </div>

                                    <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                                        <p className="text-sm font-semibold text-yellow-900 mb-1">💡 Key Insight</p>
                                        <p className="text-sm text-yellow-800">
                                            Despite the "naive" assumption that words are independent, Naive Bayes works surprisingly well for text classification!
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                    <p className="text-sm font-semibold text-green-900 mb-2">✅ Advantages</p>
                                    <ul className="text-sm text-green-800 space-y-1 list-disc list-inside">
                                        <li>Fast training and prediction</li>
                                        <li>Works well with small datasets</li>
                                        <li>Handles high-dimensional data</li>
                                        <li>Probabilistic predictions</li>
                                    </ul>
                                </div>
                                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                                    <p className="text-sm font-semibold text-red-900 mb-2">⚠️ Limitations</p>
                                    <ul className="text-sm text-red-800 space-y-1 list-disc list-inside">
                                        <li>Assumes feature independence</li>
                                        <li>Sensitive to feature distribution</li>
                                        <li>Zero-frequency problem</li>
                                        <li>Not ideal for complex relationships</li>
                                    </ul>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="challenge" className="space-y-4">
                            <div className="flex items-start gap-2 p-3 bg-purple-50 rounded-lg border border-purple-200">
                                <Target className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                                <div className="text-sm text-purple-800">
                                    <p className="font-semibold mb-1">Challenge Mode</p>
                                    <p>Complete these challenges to master Naive Bayes text classification!</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {challenges.map(challenge => (
                                    <ChallengeCard
                                        key={challenge.id}
                                        challenge={challenge}
                                        onComplete={handleChallengeComplete}
                                        checkSuccess={() => checkChallengeSuccess(challenge.id)}
                                        isCompleted={completedChallenges.includes(challenge.id)}
                                    />
                                ))}
                            </div>

                            {completedChallenges.length === challenges.length && (
                                <div className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border-2 border-yellow-400">
                                    <div className="text-center">
                                        <p className="text-2xl mb-2">🎉 Congratulations!</p>
                                        <p className="text-lg font-semibold text-gray-800 mb-2">
                                            You've completed all Naive Bayes challenges!
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Total points earned: {challenges.reduce((sum, c) => sum + c.points, 0)}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}
