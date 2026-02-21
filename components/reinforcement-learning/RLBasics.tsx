'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Brain, Target, Trophy } from 'lucide-react'
import { BlockMath } from 'react-katex'

export function RLBasics() {
    const [step, setStep] = useState(0)

    const rlCycle = [
        { state: 'Kitchen', action: 'Add Salt', reward: -5, next: 'Too Salty' },
        { state: 'Kitchen', action: 'Add Sugar', reward: +10, next: 'Perfect!' },
        { state: 'Kitchen', action: 'Add Spice', reward: +8, next: 'Good!' }
    ]

    return (
        <div className="space-y-4 sm:space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">🎮 What is Reinforcement Learning?</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm sm:text-base text-gray-600 mb-6">
                        Reinforcement Learning is like training a pet or learning to ride a bike.
                        An agent learns by interacting with an environment, receiving rewards for good actions
                        and penalties for bad ones.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200">
                            <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                                <Brain className="w-5 h-5" />
                                The RL Loop
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                                    <div>
                                        <p className="font-semibold text-gray-900">Observe State</p>
                                        <p className="text-sm text-gray-600">Agent sees current situation</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                                    <div>
                                        <p className="font-semibold text-gray-900">Take Action</p>
                                        <p className="text-sm text-gray-600">Agent chooses what to do</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                                    <div>
                                        <p className="font-semibold text-gray-900">Receive Reward</p>
                                        <p className="text-sm text-gray-600">Environment gives feedback</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                                    <div>
                                        <p className="font-semibold text-gray-900">Update Policy</p>
                                        <p className="text-sm text-gray-600">Learn from experience</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl border-2 border-green-200">
                            <h3 className="text-lg font-bold text-green-900 mb-4 flex items-center gap-2">
                                <Target className="w-5 h-5" />
                                Key Components
                            </h3>
                            <div className="space-y-3">
                                <div className="p-3 bg-white rounded-lg">
                                    <p className="font-semibold text-gray-900">Agent 🤖</p>
                                    <p className="text-sm text-gray-600">The learner/decision maker</p>
                                </div>
                                <div className="p-3 bg-white rounded-lg">
                                    <p className="font-semibold text-gray-900">Environment 🌍</p>
                                    <p className="text-sm text-gray-600">The world agent interacts with</p>
                                </div>
                                <div className="p-3 bg-white rounded-lg">
                                    <p className="font-semibold text-gray-900">State 📍</p>
                                    <p className="text-sm text-gray-600">Current situation</p>
                                </div>
                                <div className="p-3 bg-white rounded-lg">
                                    <p className="font-semibold text-gray-900">Action ⚡</p>
                                    <p className="text-sm text-gray-600">What agent can do</p>
                                </div>
                                <div className="p-3 bg-white rounded-lg">
                                    <p className="font-semibold text-gray-900">Reward 🎁</p>
                                    <p className="text-sm text-gray-600">Feedback signal</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-200 mb-6">
                        <h3 className="text-lg font-bold text-purple-900 mb-4">Interactive Example: Chef Training</h3>
                        <div className="flex items-center justify-center gap-4 mb-4 flex-wrap">
                            <div className="p-4 bg-white rounded-lg border-2 border-blue-300">
                                <p className="text-sm font-semibold text-gray-600">State</p>
                                <p className="text-lg font-bold text-blue-900">{rlCycle[step].state}</p>
                            </div>
                            <ArrowRight className="w-6 h-6 text-gray-400" />
                            <div className="p-4 bg-white rounded-lg border-2 border-green-300">
                                <p className="text-sm font-semibold text-gray-600">Action</p>
                                <p className="text-lg font-bold text-green-900">{rlCycle[step].action}</p>
                            </div>
                            <ArrowRight className="w-6 h-6 text-gray-400" />
                            <div className={`p-4 bg-white rounded-lg border-2 ${rlCycle[step].reward > 0 ? 'border-green-500' : 'border-red-500'}`}>
                                <p className="text-sm font-semibold text-gray-600">Reward</p>
                                <p className={`text-lg font-bold ${rlCycle[step].reward > 0 ? 'text-green-900' : 'text-red-900'}`}>
                                    {rlCycle[step].reward > 0 ? '+' : ''}{rlCycle[step].reward}
                                </p>
                            </div>
                            <ArrowRight className="w-6 h-6 text-gray-400" />
                            <div className="p-4 bg-white rounded-lg border-2 border-purple-300">
                                <p className="text-sm font-semibold text-gray-600">Next State</p>
                                <p className="text-lg font-bold text-purple-900">{rlCycle[step].next}</p>
                            </div>
                        </div>
                        <div className="flex justify-center gap-3">
                            <Button onClick={() => setStep((step + 1) % rlCycle.length)}>
                                Try Different Action
                            </Button>
                        </div>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-xl overflow-x-auto">
                        <h3 className="text-lg font-bold text-blue-900 mb-4">The Goal: Maximize Cumulative Reward</h3>
                        <BlockMath math="G_t = R_{t+1} + \gamma R_{t+2} + \gamma^2 R_{t+3} + ... = \sum_{k=0}^{\infty} \gamma^k R_{t+k+1}" />
                        <p className="text-sm text-blue-700 mt-3">
                            Where γ (gamma) is the discount factor (0 ≤ γ ≤ 1) that determines how much we value future rewards
                        </p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
                        <Trophy className="w-5 h-5" />
                        Real-World Applications
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                            <h4 className="font-semibold text-blue-900 mb-2">🎮 Game AI</h4>
                            <p className="text-sm text-blue-700">AlphaGo, Dota 2, Chess engines</p>
                        </div>
                        <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                            <h4 className="font-semibold text-green-900 mb-2">🤖 Robotics</h4>
                            <p className="text-sm text-green-700">Robot navigation, manipulation</p>
                        </div>
                        <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                            <h4 className="font-semibold text-purple-900 mb-2">🚗 Autonomous Vehicles</h4>
                            <p className="text-sm text-purple-700">Self-driving cars</p>
                        </div>
                        <div className="p-4 bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg">
                            <h4 className="font-semibold text-pink-900 mb-2">💰 Finance</h4>
                            <p className="text-sm text-pink-700">Trading algorithms</p>
                        </div>
                        <div className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg">
                            <h4 className="font-semibold text-yellow-900 mb-2">🏥 Healthcare</h4>
                            <p className="text-sm text-yellow-700">Treatment optimization</p>
                        </div>
                        <div className="p-4 bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg">
                            <h4 className="font-semibold text-teal-900 mb-2">📱 Recommendation</h4>
                            <p className="text-sm text-teal-700">Personalized content</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
