'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft, Settings } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'

interface EpisodeData {
    episode: number
    totalReward: number
    avgReward: number
    epsilon: number
    steps: number
    qValueMax: number
}

export function EnhancedRLTraining() {
    const [algorithm, setAlgorithm] = useState<'q-learning' | 'sarsa' | 'dqn'>('q-learning')
    const [learningRate, setLearningRate] = useState(0.1)
    const [discountFactor, setDiscountFactor] = useState(0.99)
    const [epsilonStart, setEpsilonStart] = useState(1.0)
    const [epsilonDecay, setEpsilonDecay] = useState(0.995)
    const [episodes, setEpisodes] = useState(100)
    const [replayBuffer, setReplayBuffer] = useState(1000)

    const [currentEpisode, setCurrentEpisode] = useState(0)
    const [isTraining, setIsTraining] = useState(false)
    const [trainingSpeed, setTrainingSpeed] = useState(500)
    const [episodeData, setEpisodeData] = useState<EpisodeData[]>([])
    const [showSettings, setShowSettings] = useState(true)
    const [showGraphs, setShowGraphs] = useState(true)
    const [showTable, setShowTable] = useState(true)

    const actions = ['Up', 'Down', 'Left', 'Right']

    const generateEpisodeData = () => {
        const data: EpisodeData[] = []
        const lrFactor = learningRate * 10
        const gammaFactor = discountFactor

        for (let i = 0; i <= episodes; i++) {
            const p = i / episodes
            const epsilon = epsilonStart * Math.pow(epsilonDecay, i)
            const totalReward = -200 + 400 * (1 - Math.exp(-lrFactor * p * gammaFactor)) + 30 * Math.random() - 15
            const avgReward = -200 + 380 * (1 - Math.exp(-lrFactor * p * gammaFactor * 0.8)) + 20 * Math.random() - 10
            const steps = Math.max(10, Math.floor(200 - 180 * (1 - Math.exp(-lrFactor * p)) + 20 * Math.random()))
            const qValueMax = 50 * (1 - Math.exp(-lrFactor * p * 1.5)) + 5 * Math.random()

            data.push({
                episode: i,
                totalReward: Number(totalReward.toFixed(1)),
                avgReward: Number(avgReward.toFixed(1)),
                epsilon: Number(Math.max(0.01, epsilon).toFixed(4)),
                steps,
                qValueMax: Number(qValueMax.toFixed(2))
            })
        }
        return data
    }

    useEffect(() => {
        setEpisodeData(generateEpisodeData())
        setCurrentEpisode(0)
    }, [algorithm, learningRate, discountFactor, epsilonStart, epsilonDecay, episodes, replayBuffer])

    useEffect(() => {
        if (!isTraining) return
        const interval = setInterval(() => {
            setCurrentEpisode(prev => {
                if (prev >= episodes) { setIsTraining(false); return prev }
                return prev + 1
            })
        }, trainingSpeed)
        return () => clearInterval(interval)
    }, [isTraining, trainingSpeed, episodes])

    const handlePlayPause = () => { if (currentEpisode >= episodes) setCurrentEpisode(0); setIsTraining(!isTraining) }
    const handleNext = () => { if (currentEpisode < episodes) setCurrentEpisode(currentEpisode + 1) }
    const handlePrev = () => { if (currentEpisode > 0) setCurrentEpisode(currentEpisode - 1) }
    const handleReset = () => { setCurrentEpisode(0); setIsTraining(false) }

    const currentData = episodeData[currentEpisode] || { episode: 0, totalReward: 0, avgReward: 0, epsilon: 1, steps: 0, qValueMax: 0 }
    const visibleData = episodeData.slice(0, currentEpisode + 1)

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>🎮 Enhanced RL Training - Agent Learning Simulator</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 mb-6">
                        Train an RL agent episode-by-episode. Control exploration vs exploitation, learning rate, and discount factor. Watch the agent learn optimal policies.
                    </p>

                    {/* Hyperparameters */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-lg">⚙️ Agent Configuration</h3>
                            <button onClick={() => setShowSettings(!showSettings)} className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded flex items-center gap-2">
                                <Settings className="w-4 h-4" />{showSettings ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        {showSettings && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl">
                                <div>
                                    <label className="text-sm font-medium block mb-2">Algorithm</label>
                                    <select value={algorithm} onChange={e => setAlgorithm(e.target.value as any)} disabled={isTraining} className="w-full border rounded px-3 py-2">
                                        <option value="q-learning">Q-Learning (Off-policy)</option>
                                        <option value="sarsa">SARSA (On-policy)</option>
                                        <option value="dqn">DQN (Deep Q-Network)</option>
                                    </select>
                                    <p className="text-xs text-gray-500 mt-1">RL algorithm type</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium block mb-2">Learning Rate (α): {learningRate}</label>
                                    <input type="range" min="0.01" max="1" step="0.01" value={learningRate} onChange={e => setLearningRate(Number(e.target.value))} disabled={isTraining} className="w-full" />
                                    <p className="text-xs text-gray-500 mt-1">Q-value update step size</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium block mb-2">Discount Factor (γ): {discountFactor}</label>
                                    <input type="range" min="0.5" max="1" step="0.01" value={discountFactor} onChange={e => setDiscountFactor(Number(e.target.value))} disabled={isTraining} className="w-full" />
                                    <p className="text-xs text-gray-500 mt-1">Future reward importance</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium block mb-2">Epsilon Start (ε₀): {epsilonStart}</label>
                                    <input type="range" min="0.1" max="1" step="0.1" value={epsilonStart} onChange={e => setEpsilonStart(Number(e.target.value))} disabled={isTraining} className="w-full" />
                                    <p className="text-xs text-gray-500 mt-1">Initial exploration rate</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium block mb-2">Epsilon Decay: {epsilonDecay}</label>
                                    <input type="range" min="0.9" max="0.999" step="0.001" value={epsilonDecay} onChange={e => setEpsilonDecay(Number(e.target.value))} disabled={isTraining} className="w-full" />
                                    <p className="text-xs text-gray-500 mt-1">Exploration decay rate</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium block mb-2">Episodes: {episodes}</label>
                                    <input type="range" min="50" max="500" step="50" value={episodes} onChange={e => setEpisodes(Number(e.target.value))} disabled={isTraining} className="w-full" />
                                    <p className="text-xs text-gray-500 mt-1">Training episodes</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Controls */}
                    <div className="mb-6 bg-gray-50 rounded-xl p-4">
                        <h3 className="font-semibold text-lg mb-4">🎮 Training Controls</h3>
                        <div className="flex flex-wrap gap-3 items-center">
                            <Button onClick={handlePlayPause} className="flex items-center gap-2">
                                {isTraining ? <><Pause className="w-4 h-4" />Pause</> : <><Play className="w-4 h-4" />Train Agent</>}
                            </Button>
                            <Button onClick={handlePrev} disabled={currentEpisode === 0 || isTraining} variant="outline"><ChevronLeft className="w-4 h-4" />Prev</Button>
                            <Button onClick={handleNext} disabled={currentEpisode >= episodes || isTraining} variant="outline">Next<ChevronRight className="w-4 h-4" /></Button>
                            <Button onClick={handleReset} variant="outline"><RotateCcw className="w-4 h-4" />Reset</Button>
                            <div className="flex items-center gap-2 ml-auto">
                                <label className="text-sm font-medium">Speed:</label>
                                <select value={trainingSpeed} onChange={e => setTrainingSpeed(Number(e.target.value))} className="border rounded px-3 py-1 text-sm" disabled={isTraining}>
                                    <option value={1000}>Slow</option><option value={500}>Medium</option><option value={200}>Fast</option>
                                </select>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="font-medium">Episode {currentEpisode} / {episodes}</span>
                                <span className="text-gray-600">{((currentEpisode / episodes) * 100).toFixed(1)}%</span>
                            </div>
                            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300" style={{ width: `${(currentEpisode / episodes) * 100}%` }}></div>
                            </div>
                        </div>
                    </div>

                    {/* Metrics */}
                    <div className="mb-6 grid grid-cols-2 md:grid-cols-5 gap-4">
                        <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
                            <p className="text-xs text-gray-600 mb-1">Total Reward</p>
                            <p className="text-2xl font-bold text-green-700">{currentData.totalReward.toFixed(0)}</p>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                            <p className="text-xs text-gray-600 mb-1">Avg Reward</p>
                            <p className="text-2xl font-bold text-blue-700">{currentData.avgReward.toFixed(0)}</p>
                        </div>
                        <div className="p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
                            <p className="text-xs text-gray-600 mb-1">Epsilon (ε)</p>
                            <p className="text-2xl font-bold text-orange-700">{currentData.epsilon.toFixed(3)}</p>
                        </div>
                        <div className="p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                            <p className="text-xs text-gray-600 mb-1">Steps</p>
                            <p className="text-2xl font-bold text-purple-700">{currentData.steps}</p>
                        </div>
                        <div className="p-4 bg-red-50 rounded-lg border-2 border-red-200">
                            <p className="text-xs text-gray-600 mb-1">Max Q-Value</p>
                            <p className="text-2xl font-bold text-red-700">{currentData.qValueMax.toFixed(1)}</p>
                        </div>
                    </div>

                    {/* Graphs */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-lg">📊 Training Metrics</h3>
                            <button onClick={() => setShowGraphs(!showGraphs)} className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded">
                                {showGraphs ? 'Hide Graphs' : 'Show Graphs'}
                            </button>
                        </div>
                        {showGraphs && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="bg-white p-4 rounded-lg border">
                                    <h4 className="font-semibold mb-3 text-center">Reward per Episode</h4>
                                    <ResponsiveContainer width="100%" height={250}>
                                        <LineChart data={visibleData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="episode" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey="totalReward" stroke="#22c55e" name="Total Reward" strokeWidth={2} />
                                            <Line type="monotone" dataKey="avgReward" stroke="#3b82f6" name="Avg Reward (100ep)" strokeWidth={2} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="bg-white p-4 rounded-lg border">
                                    <h4 className="font-semibold mb-3 text-center">Exploration (ε) & Steps</h4>
                                    <ResponsiveContainer width="100%" height={250}>
                                        <LineChart data={visibleData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="episode" />
                                            <YAxis yAxisId="left" />
                                            <YAxis yAxisId="right" orientation="right" />
                                            <Tooltip />
                                            <Legend />
                                            <Line yAxisId="left" type="monotone" dataKey="epsilon" stroke="#f97316" name="Epsilon (ε)" strokeWidth={2} />
                                            <Line yAxisId="right" type="monotone" dataKey="steps" stroke="#a855f7" name="Steps" strokeWidth={2} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="bg-white p-4 rounded-lg border lg:col-span-2">
                                    <h4 className="font-semibold mb-3 text-center">Q-Value Action Distribution (Episode {currentEpisode})</h4>
                                    <ResponsiveContainer width="100%" height={200}>
                                        <BarChart data={actions.map((a, i) => ({ action: a, qValue: Number((currentData.qValueMax * (0.5 + 0.5 * Math.random())).toFixed(2)) }))}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="action" />
                                            <YAxis />
                                            <Tooltip />
                                            <Bar dataKey="qValue" fill="#8b5cf6" name="Q-Value" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Table */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-lg">📋 Episode History</h3>
                            <button onClick={() => setShowTable(!showTable)} className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded">
                                {showTable ? 'Hide Table' : 'Show Table'}
                            </button>
                        </div>
                        {showTable && (
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="border px-4 py-3 text-left text-sm font-semibold">Episode</th>
                                            <th className="border px-4 py-3 text-left text-sm font-semibold">Total Reward</th>
                                            <th className="border px-4 py-3 text-left text-sm font-semibold">Avg Reward</th>
                                            <th className="border px-4 py-3 text-left text-sm font-semibold">Epsilon</th>
                                            <th className="border px-4 py-3 text-left text-sm font-semibold">Steps</th>
                                            <th className="border px-4 py-3 text-left text-sm font-semibold">Max Q</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {visibleData.slice(-10).reverse().map(d => (
                                            <tr key={d.episode} className={`transition-all ${d.episode === currentEpisode ? 'bg-purple-100 border-l-4 border-l-purple-600' : 'hover:bg-gray-50'}`}>
                                                <td className="border px-4 py-3">
                                                    <div className="flex items-center gap-2">
                                                        {d.episode === currentEpisode && <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></div>}
                                                        <span className="font-medium">{d.episode}</span>
                                                    </div>
                                                </td>
                                                <td className="border px-4 py-3 font-mono text-sm text-green-600">{d.totalReward.toFixed(0)}</td>
                                                <td className="border px-4 py-3 font-mono text-sm text-blue-600">{d.avgReward.toFixed(0)}</td>
                                                <td className="border px-4 py-3 font-mono text-sm text-orange-600">{d.epsilon.toFixed(4)}</td>
                                                <td className="border px-4 py-3 font-mono text-sm text-purple-600">{d.steps}</td>
                                                <td className="border px-4 py-3 font-mono text-sm text-red-600">{d.qValueMax.toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {/* Equations */}
                    <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
                        <h4 className="font-semibold text-purple-900 mb-3">📐 {algorithm === 'q-learning' ? 'Q-Learning' : algorithm === 'sarsa' ? 'SARSA' : 'DQN'} Equations</h4>
                        <div className="space-y-4 overflow-x-auto">
                            {algorithm === 'q-learning' && (
                                <div>
                                    <p className="text-sm font-semibold mb-2">Q-Learning Update (Off-policy):</p>
                                    <BlockMath math="Q(s,a) \leftarrow Q(s,a) + \alpha \left[ r + \gamma \max_{a'} Q(s',a') - Q(s,a) \right]" />
                                </div>
                            )}
                            {algorithm === 'sarsa' && (
                                <div>
                                    <p className="text-sm font-semibold mb-2">SARSA Update (On-policy):</p>
                                    <BlockMath math="Q(s,a) \leftarrow Q(s,a) + \alpha \left[ r + \gamma Q(s',a') - Q(s,a) \right]" />
                                </div>
                            )}
                            {algorithm === 'dqn' && (
                                <div>
                                    <p className="text-sm font-semibold mb-2">DQN Loss:</p>
                                    <BlockMath math="\mathcal{L} = \mathbb{E}\left[\left(r + \gamma \max_{a'} Q_{\theta^-}(s',a') - Q_\theta(s,a)\right)^2\right]" />
                                </div>
                            )}
                            <div>
                                <p className="text-sm font-semibold mb-2">ε-Greedy Policy:</p>
                                <BlockMath math="a = \begin{cases} \arg\max_a Q(s,a) & \text{with probability } 1-\varepsilon \\ \text{random action} & \text{with probability } \varepsilon \end{cases}" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold mb-2">Epsilon Decay:</p>
                                <BlockMath math="\varepsilon_t = \varepsilon_0 \cdot d^t \quad \text{where } d = {epsilonDecay}" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold mb-2">Bellman Optimality:</p>
                                <BlockMath math="Q^*(s,a) = \mathbb{E}\left[r + \gamma \max_{a'} Q^*(s',a')\right]" />
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                        <h4 className="font-semibold text-blue-900 mb-2">💡 Understanding RL Training</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                            <li>• <strong>Q-Learning</strong>: Off-policy, learns optimal Q-values regardless of current policy</li>
                            <li>• <strong>SARSA</strong>: On-policy, learns Q-values for the policy being followed</li>
                            <li>• <strong>DQN</strong>: Uses neural network to approximate Q-function for large state spaces</li>
                            <li>• <strong>Epsilon (ε)</strong>: Balances exploration (random) vs exploitation (greedy)</li>
                            <li>• <strong>Discount Factor (γ)</strong>: Higher values prioritize long-term rewards</li>
                            <li>• <strong>Learning Rate (α)</strong>: Controls how fast Q-values are updated</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
