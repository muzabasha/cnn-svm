'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Play, SkipForward } from 'lucide-react'

export function TrainingVisualization() {
    const [step, setStep] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)

    const steps = [
        {
            title: 'Input Data',
            description: 'Start with labeled training data points from two classes.',
            visual: 'data-points'
        },
        {
            title: 'Kernel Mapping',
            description: 'Transform data to higher dimensional space using kernel function.',
            visual: 'kernel-transform'
        },
        {
            title: 'Optimization',
            description: 'Find optimal hyperplane by maximizing margin between classes.',
            visual: 'optimization'
        },
        {
            title: 'Support Vector Selection',
            description: 'Identify support vectors - points closest to decision boundary.',
            visual: 'support-vectors'
        },
        {
            title: 'Hyperplane Formation',
            description: 'Final decision boundary with maximum margin.',
            visual: 'final-hyperplane'
        }
    ]

    const animate = () => {
        setIsAnimating(true)
        setStep(0)
        const interval = setInterval(() => {
            setStep(prev => {
                if (prev >= steps.length - 1) {
                    clearInterval(interval)
                    setIsAnimating(false)
                    return prev
                }
                return prev + 1
            })
        }, 2000)
    }

    const nextStep = () => {
        if (step < steps.length - 1) {
            setStep(step + 1)
        }
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Training & Optimization Visualization</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 mb-6">
                        Watch how SVM transforms data and finds the optimal decision boundary.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-6 h-96 flex items-center justify-center">
                                {step === 0 && (
                                    <div className="text-center">
                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            <div className="space-y-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <div key={i} className="w-4 h-4 bg-blue-500 rounded-full mx-auto"></div>
                                                ))}
                                            </div>
                                            <div className="space-y-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <div key={i} className="w-4 h-4 bg-red-500 rounded-full mx-auto"></div>
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600">Two classes of data points</p>
                                    </div>
                                )}

                                {step === 1 && (
                                    <div className="text-center">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-red-200 opacity-30 rounded-xl"></div>
                                            <div className="relative p-8">
                                                <p className="text-lg font-semibold text-purple-900">φ(x)</p>
                                                <p className="text-sm text-gray-600 mt-2">Kernel transformation</p>
                                                <p className="text-xs text-gray-500 mt-1">Maps to higher dimension</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {step === 2 && (
                                    <div className="text-center space-y-4">
                                        <div className="text-4xl font-bold text-purple-600">max</div>
                                        <div className="text-xl">Margin = 2/||w||</div>
                                        <div className="flex justify-center gap-8 mt-4">
                                            <div className="text-center">
                                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                                                    <span className="text-2xl">📊</span>
                                                </div>
                                                <p className="text-xs text-gray-600">Maximize</p>
                                            </div>
                                            <div className="text-center">
                                                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-2">
                                                    <span className="text-2xl">⚖️</span>
                                                </div>
                                                <p className="text-xs text-gray-600">Subject to</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {step === 3 && (
                                    <div className="text-center">
                                        <div className="relative">
                                            <svg width="200" height="200" viewBox="0 0 200 200">
                                                <line x1="100" y1="0" x2="100" y2="200" stroke="#9333ea" strokeWidth="3" strokeDasharray="5,5" />
                                                <circle cx="80" cy="80" r="8" fill="#3b82f6" stroke="#1e40af" strokeWidth="3" />
                                                <circle cx="85" cy="120" r="8" fill="#3b82f6" stroke="#1e40af" strokeWidth="3" />
                                                <circle cx="120" cy="70" r="8" fill="#ef4444" stroke="#991b1b" strokeWidth="3" />
                                                <circle cx="115" cy="130" r="8" fill="#ef4444" stroke="#991b1b" strokeWidth="3" />
                                            </svg>
                                            <p className="text-sm text-gray-600 mt-2">Support vectors highlighted</p>
                                        </div>
                                    </div>
                                )}

                                {step === 4 && (
                                    <div className="text-center">
                                        <svg width="250" height="200" viewBox="0 0 250 200">
                                            <line x1="125" y1="0" x2="125" y2="200" stroke="#9333ea" strokeWidth="4" />
                                            <line x1="95" y1="0" x2="95" y2="200" stroke="#9333ea" strokeWidth="2" strokeDasharray="5,5" opacity="0.5" />
                                            <line x1="155" y1="0" x2="155" y2="200" stroke="#9333ea" strokeWidth="2" strokeDasharray="5,5" opacity="0.5" />

                                            {[...Array(6)].map((_, i) => (
                                                <circle key={`b${i}`} cx={Math.random() * 60 + 20} cy={Math.random() * 180 + 10} r="6" fill="#3b82f6" />
                                            ))}
                                            {[...Array(6)].map((_, i) => (
                                                <circle key={`r${i}`} cx={Math.random() * 60 + 170} cy={Math.random() * 180 + 10} r="6" fill="#ef4444" />
                                            ))}

                                            <text x="125" y="195" textAnchor="middle" fontSize="12" fill="#9333ea">Decision Boundary</text>
                                        </svg>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className="space-y-4">
                                <div className="bg-white border border-gray-200 rounded-xl p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="font-semibold text-lg">
                                            Step {step + 1} of {steps.length}
                                        </h3>
                                        <div className="flex gap-2">
                                            {steps.map((_, i) => (
                                                <div
                                                    key={i}
                                                    className={`w-2 h-2 rounded-full transition-all ${i === step ? 'bg-purple-600 w-6' : i < step ? 'bg-purple-300' : 'bg-gray-300'
                                                        }`}
                                                ></div>
                                            ))}
                                        </div>
                                    </div>
                                    <h4 className="font-semibold text-purple-900 mb-2">
                                        {steps[step].title}
                                    </h4>
                                    <p className="text-gray-700 text-sm">
                                        {steps[step].description}
                                    </p>
                                </div>

                                <div className="flex gap-3">
                                    <Button onClick={animate} disabled={isAnimating}>
                                        <Play className="w-4 h-4 mr-2" />
                                        Animate All Steps
                                    </Button>
                                    <Button onClick={nextStep} variant="outline" disabled={step >= steps.length - 1}>
                                        <SkipForward className="w-4 h-4 mr-2" />
                                        Next Step
                                    </Button>
                                </div>

                                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-6">
                                    <h4 className="font-semibold text-blue-900 mb-3">Key Concepts</h4>
                                    <ul className="space-y-2 text-sm text-gray-700">
                                        <li className="flex items-start gap-2">
                                            <span className="text-blue-600 mt-0.5">•</span>
                                            <span><strong>Support Vectors:</strong> Training points closest to the hyperplane</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-blue-600 mt-0.5">•</span>
                                            <span><strong>Margin:</strong> Distance between hyperplane and nearest points</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-blue-600 mt-0.5">•</span>
                                            <span><strong>Hyperplane:</strong> Decision boundary separating classes</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-blue-600 mt-0.5">•</span>
                                            <span><strong>Kernel Trick:</strong> Implicitly maps data to higher dimensions</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                                    <h4 className="font-semibold text-yellow-900 mb-2">Think About It</h4>
                                    <p className="text-sm text-gray-700">
                                        Why do we only need support vectors for prediction?
                                        Other points don't affect the decision boundary!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
