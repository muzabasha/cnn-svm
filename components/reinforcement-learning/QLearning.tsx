'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Play, RotateCcw, Zap } from 'lucide-react'
import { BlockMath, InlineMath } from 'react-katex'

export function QLearning() {
    const [alpha, setAlpha] = useState(0.1)
    const [gamma, setGamma] = useState(0.9)
    const [epsilon, setEpsilon] = useState(0.1)
    const [episode, setEpisode] = useState(0)
    const [isTraining, setIsTraining] = useState(false)

    // Simple 3x3 grid Q-table
    const [qTable, setQTable] = useState<number[][]>([
        [0, 0, 0, 0], // State 0: [up, down, left, right]
        [0, 0, 0, 0], // State 1
        [0, 0, 0, 0], // State 2
        [0, 0, 0, 0], // State 3
        [0, 0, 0, 0], // State 4
        [0, 0, 0, 0], // State 5
        [0, 0, 0, 0], // State 6
        [0, 0, 0, 0], // State 7
        [0, 0, 0, 0], // State 8 (goal)
    ])

    const actions = ['↑', '↓', '←', '→']

    const trainStep = useCallback(() => {
        setQTable(prev => {
            const newTable = prev.map(row => [...row])
            // Simulate Q-learning update
            const state = Math.floor(Math.random() * 8)
            const action = Math.floor(Math.random() * 4)
            const reward = state === 7 ? 100 : -1
            const nextState = Math.min(8, state + 1)
            const maxNextQ = Math.max(...newTable[nextState])

            // Q-learning update rule
            newTable[state][action] = newTable[state][action] +
                alpha * (reward + gamma * maxNextQ - newTable[state][action])

            return newTable
        })
        setEpisode(prev => prev + 1)
    }, [alpha, gamma])

    const reset = () => {
        setQTable([
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ])
        setEpisode(0)
        setIsTraining(false)
    }

    useEffect(() => {
        let interval: NodeJS.Timeout
        if (isTraining) {
            interval = setInterval(trainStep, 100)
        }
        return () => clearInterval(interval)
    }, [isTraining, trainStep])

    return (
        <div className="space-y-4 sm:space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">🧠 Q-Learning Algorithm</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm sm:text-base text-gray-600 mb-6">
                        Q-Learning is a value-based RL algorithm that learns the quality (Q-value) of actions
                        in different states. It builds a Q-table that maps state-action pairs to expected rewards.
                    </p>

                    <div className="bg-blue-50 p-6 rounded-xl mb-6 overflow-x-auto">
                        <h3 className="text-lg font-bold text-blue-900 mb-4">Q-Learning Update Rule</h3>
                        <BlockMath math="Q(s,a) \leftarrow Q(s,a) + \alpha [r + \gamma \max_{a'} Q(s',a') - Q(s,a)]" />
                        <div className="mt-4 space-y-2 text-sm text-blue-700">
                            <p><InlineMath math="Q(s,a)" /> = Q-value for state s and action a</p>
                            <p><InlineMath math="\alpha" /> = Learning rate (how much to update)</p>
                            <p><InlineMath math="r" /> = Immediate reward</p>
                            <p><InlineMath math="\gamma" /> = Discount factor (future reward importance)</p>
                            <p><InlineMath math="s'" /> = Next state</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-gray-900">Hyperparameters</h3>

                            <div className="p-4 bg-purple-50 rounded-lg">
                                <Slider
                                    label="Learning Rate (α)"
                                    value={alpha}
                                    onChange={setAlpha}
                                    min={0.01}
                                    max={1}
                                    step={0.01}
                                    description="How quickly the agent learns"
                                />
                            </div>

                            <div className="p-4 bg-green-50 rounded-lg">
                                <Slider
                                    label="Discount Factor (γ)"
                                    value={gamma}
                                    onChange={setGamma}
                                    min={0}
                                    max={1}
                                    step={0.01}
                                    description="Importance of future rewards"
                                />
                            </div>

                            <div className="p-4 bg-blue-50 rounded-lg">
                                <Slider
                                    label="Exploration Rate (ε)"
                                    value={epsilon}
                                    onChange={setEpsilon}
                                    min={0}
                                    max={1}
                                    step={0.01}
                                    description="Probability of random action"
                                />
                            </div>

                            <div className="flex gap-3">
                                <Button
                                    onClick={() => setIsTraining(!isTraining)}
                                    className="flex-1"
                                    variant={isTraining ? "secondary" : "default"}
                                >
                                    {isTraining ? 'Stop' : <><Play className="w-4 h-4 mr-2" />Start</>} Training
                                </Button>
                                <Button onClick={reset} variant="outline">
                                    <RotateCcw className="w-4 h-4 mr-2" />
                                    Reset
                                </Button>
                            </div>

                            <div className="p-4 bg-yellow-50 rounded-lg text-center">
                                <p className="text-sm text-yellow-700">Episodes Trained</p>
                                <p className="text-3xl font-bold text-yellow-900">{episode}</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Q-Table Visualization</h3>
                            <div className="bg-white p-4 rounded-lg border-2 border-gray-200 overflow-x-auto">
                                <table className="w-full text-xs">
                                    <thead>
                                        <tr className="border-b-2 border-gray-300">
                                            <th className="p-2 text-left">State</th>
                                            {actions.map((action, idx) => (
                                                <th key={idx} className="p-2 text-center">{action}</th>
                                            ))}
                                            <th className="p-2 text-center">Best</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {qTable.map((row, stateIdx) => {
                                            const maxQ = Math.max(...row)
                                            const bestAction = row.indexOf(maxQ)
                                            return (
                                                <tr key={stateIdx} className="border-b border-gray-200">
                                                    <td className="p-2 font-semibold">S{stateIdx}</td>
                                                    {row.map((qValue, actionIdx) => (
                                                        <td
                                                            key={actionIdx}
                                                            className={`p-2 text-center ${qValue === maxQ && qValue !== 0
                                                                ? 'bg-green-100 font-bold'
                                                                : ''
                                                                }`}
                                                        >
                                                            {qValue.toFixed(1)}
                                                        </td>
                                                    ))}
                                                    <td className="p-2 text-center font-bold text-green-700">
                                                        {actions[bestAction]}
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-xs text-gray-600 mt-2">
                                Green cells show the best action for each state
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
                        <Zap className="w-5 h-5" />
                        Q-Learning Properties
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
                            <h4 className="font-semibold text-green-900 mb-2">✅ Advantages</h4>
                            <ul className="text-sm text-green-700 space-y-1">
                                <li>• Off-policy learning (learns from any policy)</li>
                                <li>• Model-free (no environment model needed)</li>
                                <li>• Guaranteed convergence</li>
                                <li>• Simple to implement</li>
                            </ul>
                        </div>
                        <div className="p-4 bg-red-50 rounded-lg border-2 border-red-200">
                            <h4 className="font-semibold text-red-900 mb-2">⚠️ Limitations</h4>
                            <ul className="text-sm text-red-700 space-y-1">
                                <li>• Doesn't scale to large state spaces</li>
                                <li>• Requires discrete actions</li>
                                <li>• Slow convergence in complex environments</li>
                                <li>• Memory intensive for large Q-tables</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
