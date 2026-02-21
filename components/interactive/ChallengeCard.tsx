'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trophy, Lightbulb, CheckCircle, XCircle, Target } from 'lucide-react'

export interface Challenge {
    id: string
    title: string
    description: string
    difficulty: 'easy' | 'medium' | 'hard'
    hints: string[]
    successCriteria: string
    points: number
}

interface ChallengeCardProps {
    challenge: Challenge
    onComplete?: (challengeId: string) => void
    checkSuccess?: () => boolean
    isCompleted?: boolean
}

export function ChallengeCard({
    challenge,
    onComplete,
    checkSuccess,
    isCompleted = false
}: ChallengeCardProps) {
    const [showHints, setShowHints] = useState(false)
    const [currentHint, setCurrentHint] = useState(0)
    const [attemptResult, setAttemptResult] = useState<'success' | 'failure' | null>(null)

    const difficultyColors = {
        easy: 'bg-green-100 text-green-800 border-green-300',
        medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
        hard: 'bg-red-100 text-red-800 border-red-300'
    }

    const difficultyIcons = {
        easy: '⭐',
        medium: '⭐⭐',
        hard: '⭐⭐⭐'
    }

    const handleCheckSolution = () => {
        if (checkSuccess) {
            const success = checkSuccess()
            setAttemptResult(success ? 'success' : 'failure')

            if (success && onComplete) {
                setTimeout(() => {
                    onComplete(challenge.id)
                }, 1500)
            }
        }
    }

    const showNextHint = () => {
        if (currentHint < challenge.hints.length - 1) {
            setCurrentHint(currentHint + 1)
        }
        setShowHints(true)
    }

    return (
        <Card className={`border-2 ${isCompleted ? 'border-green-500 bg-green-50' : 'border-purple-300'}`}>
            <CardHeader>
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <Target className="w-5 h-5 text-purple-600" />
                            <CardTitle className="text-lg">{challenge.title}</CardTitle>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className={`text-xs px-2 py-1 rounded-full border ${difficultyColors[challenge.difficulty]}`}>
                                {difficultyIcons[challenge.difficulty]} {challenge.difficulty.toUpperCase()}
                            </span>
                            <span className="text-xs text-gray-600">
                                {challenge.points} points
                            </span>
                            {isCompleted && (
                                <span className="flex items-center gap-1 text-xs text-green-600 font-semibold">
                                    <CheckCircle className="w-4 h-4" />
                                    Completed!
                                </span>
                            )}
                        </div>
                    </div>
                    <Trophy className={`w-8 h-8 ${isCompleted ? 'text-yellow-500' : 'text-gray-300'}`} />
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {/* Challenge Description */}
                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <p className="text-sm text-gray-800">{challenge.description}</p>
                    </div>

                    {/* Success Criteria */}
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-xs font-semibold text-blue-900 mb-1">Success Criteria:</p>
                        <p className="text-xs text-blue-800">{challenge.successCriteria}</p>
                    </div>

                    {/* Hints Section */}
                    {challenge.hints.length > 0 && (
                        <div className="space-y-2">
                            {!showHints ? (
                                <Button
                                    onClick={() => setShowHints(true)}
                                    variant="outline"
                                    className="w-full flex items-center justify-center gap-2 px-3 py-1.5 text-sm"
                                >
                                    <Lightbulb className="w-4 h-4" />
                                    Need a hint?
                                </Button>
                            ) : (
                                <div className="space-y-2">
                                    {challenge.hints.slice(0, currentHint + 1).map((hint, index) => (
                                        <div
                                            key={index}
                                            className="p-3 bg-yellow-50 rounded-lg border border-yellow-200 animate-in fade-in slide-in-from-top-2"
                                        >
                                            <div className="flex items-start gap-2">
                                                <Lightbulb className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <p className="text-xs font-semibold text-yellow-900">
                                                        Hint {index + 1}:
                                                    </p>
                                                    <p className="text-xs text-yellow-800">{hint}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {currentHint < challenge.hints.length - 1 && (
                                        <Button
                                            onClick={showNextHint}
                                            variant="outline"
                                            className="w-full px-3 py-1.5 text-sm"
                                        >
                                            Show next hint ({currentHint + 1}/{challenge.hints.length})
                                        </Button>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Check Solution Button */}
                    {checkSuccess && !isCompleted && (
                        <Button
                            onClick={handleCheckSolution}
                            className="w-full"
                            disabled={attemptResult === 'success'}
                        >
                            Check My Solution
                        </Button>
                    )}

                    {/* Result Message */}
                    {attemptResult && (
                        <div className={`p-4 rounded-lg border-2 animate-in fade-in slide-in-from-bottom-2 ${attemptResult === 'success'
                            ? 'bg-green-50 border-green-500'
                            : 'bg-red-50 border-red-500'
                            }`}>
                            <div className="flex items-center gap-2">
                                {attemptResult === 'success' ? (
                                    <>
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                        <div>
                                            <p className="font-semibold text-green-900">Success! 🎉</p>
                                            <p className="text-sm text-green-800">
                                                You've completed the challenge! +{challenge.points} points
                                            </p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <XCircle className="w-5 h-5 text-red-600" />
                                        <div>
                                            <p className="font-semibold text-red-900">Not quite there yet</p>
                                            <p className="text-sm text-red-800">
                                                Review the success criteria and try again. Need a hint?
                                            </p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
