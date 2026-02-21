'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { TrendingUp, Target } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { BlockMath, InlineMath } from 'react-katex'

export function PolicyGradient() {
    const [learningRate, setLearningRate] = useState(0.01)
    const [episode, setEpisode] = useState(0)
    const [policyParams, setPolicyParams] = useState({ left: 0.5, right: 0.5 })

    const [rewardHistory, setRewardHistory] = useState<Array<{ episode: number, reward: number }>>([
        { episode: 0, reward: 0 }
    ])

    const trainEpisode = () => {
        // Simulate policy gradient update
        const action = Math.random() < policyParams.left ? 'left' : 'right'
        const reward = action === 'right' ? 10 : -5

        // Update policy parameters
        setPolicyParams(prev => {
            const gradient = action === 'left' ? reward * learningRate : -reward * learningRate
            const newLeft = Math.max(0.1, Math.min(0.9, prev.left + gradient * 0.1))
            return { left: newLeft, right: 1 - newLeft }
        })

        setRewardHistory(prev => [...prev.slice(-19), { episode: episode + 1, reward }])
        setEpisode(prev => prev + 1)
    }

    const reset = () => {
        setPolicyParams({ left: 0.5, right: 0.5 })
        setRewardHistory([{ episode: 0, reward: 0 }])
        setEpisode(0)
    }

    return (
        <div className="space-y-4 sm:space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">🎯 Policy Gradient Methods</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm sm:text-base text-gray-600 mb-6">
                        Unlike Q-Learning which learns values, Policy Gradient methods directly learn the policy
                        (what action to take). They optimize the policy parameters to maximize expected reward.
                    </p>

                    <div className="bg-purple-50 p-6 rounded-xl mb-6 overflow-x-auto">
                        <h3 className="text-lg font-bold text-purple-900 mb-4">Policy Gradient Theorem</h3>
                        <BlockMath math="\nabla_\theta J(\theta) = \mathbb{E}_{\pi_\theta} [\nabla_\theta \log \pi_\theta(a|s) \cdot Q^{\pi_\theta}(s,a)]" />
                        <div className="mt-4 space-y-2 text-sm text-purple-700">
                            <p><InlineMath math="\theta" /> = Policy parameters</p>
                            <p><InlineMath math="J(\theta)" /> = Expected return</p>
                            <p><InlineMath math="\pi_\theta(a|s)" /> = Probability of action a in state s</p>
                            <p><InlineMath math="Q^{\pi_\theta}(s,a)" /> = Action-value function</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-gray-900">Policy Parameters</h3>

                            <div className="p-4 bg-blue-50 rounded-lg">
                                <Slider
                                    label="Learning Rate"
                                    value={learningRate}
                                    onChange={setLearningRate}
                                    min={0.001}
                                    max={0.1}
                                    step={0.001}
                                />
                            </div>

                            <div className="p-6 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl border-2 border-green-200">
                                <h4 className="font-semibold text-green-900 mb-4">Current Policy π(a|s)</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">←</span>
                                        <div className="flex-1">
                                            <div className="flex justify-between mb-1">
                                                <span className="text-sm font-semibold">Left</span>
                                                <span className="text-sm font-bold">{(policyParams.left * 100).toFixed(1)}%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-4">
                                                <div
                                                    className="bg-blue-500 h-4 rounded-full transition-all"
                                                    style={{ width: `${policyParams.left * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">→</span>
                                        <div className="flex-1">
                                            <div className="flex justify-between mb-1">
                                                <span className="text-sm font-semibold">Right</span>
                                                <span className="text-sm font-bold">{(policyParams.right * 100).toFixed(1)}%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-4">
                                                <div
                                                    className="bg-green-500 h-4 rounded-full transition-all"
                                                    style={{ width: `${policyParams.right * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <Button onClick={trainEpisode} className="flex-1">
                                    <Target className="w-4 h-4 mr-2" />
                                    Train Episode
                                </Button>
                                <Button onClick={reset} variant="outline">
                                    Reset
                                </Button>
                            </div>

                            <div className="p-4 bg-yellow-50 rounded-lg text-center">
                                <p className="text-sm text-yellow-700">Episodes</p>
                                <p className="text-3xl font-bold text-yellow-900">{episode}</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Reward History</h3>
                            <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={rewardHistory}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="episode" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line
                                            type="monotone"
                                            dataKey="reward"
                                            stroke="#8b5cf6"
                                            strokeWidth={2}
                                            dot={{ r: 4 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                            <p className="text-xs text-gray-600 mt-2">
                                Policy learns to favor actions with higher rewards
                            </p>
                        </div>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-xl">
                        <h3 className="text-lg font-bold text-blue-900 mb-4">How It Works</h3>
                        <div className="space-y-3 text-sm text-blue-700">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                                <p>Sample actions from current policy π<sub>θ</sub>(a|s)</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                                <p>Execute actions and collect rewards</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                                <p>Compute policy gradient ∇<sub>θ</sub>J(θ)</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                                <p>Update parameters: θ ← θ + α∇<sub>θ</sub>J(θ)</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        Popular Policy Gradient Algorithms
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border-2 border-blue-200">
                            <h4 className="font-semibold text-blue-900 mb-2">REINFORCE</h4>
                            <p className="text-sm text-blue-700">Monte Carlo policy gradient</p>
                        </div>
                        <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border-2 border-green-200">
                            <h4 className="font-semibold text-green-900 mb-2">Actor-Critic</h4>
                            <p className="text-sm text-green-700">Combines policy and value learning</p>
                        </div>
                        <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border-2 border-purple-200">
                            <h4 className="font-semibold text-purple-900 mb-2">PPO</h4>
                            <p className="text-sm text-purple-700">Proximal Policy Optimization</p>
                        </div>
                        <div className="p-4 bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg border-2 border-pink-200">
                            <h4 className="font-semibold text-pink-900 mb-2">TRPO</h4>
                            <p className="text-sm text-pink-700">Trust Region Policy Optimization</p>
                        </div>
                        <div className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg border-2 border-yellow-200">
                            <h4 className="font-semibold text-yellow-900 mb-2">A3C</h4>
                            <p className="text-sm text-yellow-700">Asynchronous Advantage Actor-Critic</p>
                        </div>
                        <div className="p-4 bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg border-2 border-teal-200">
                            <h4 className="font-semibold text-teal-900 mb-2">SAC</h4>
                            <p className="text-sm text-teal-700">Soft Actor-Critic</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
