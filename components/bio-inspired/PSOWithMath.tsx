'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { Play, RotateCcw } from 'lucide-react'
import { LineChart, Line, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'

export function PSOWithMath() {
    const [iteration, setIteration] = useState(0)
    const [numParticles, setNumParticles] = useState(20)
    const [w, setW] = useState(0.7) // Inertia weight
    const [c1, setC1] = useState(1.5) // Cognitive coefficient
    const [c2, setC2] = useState(1.5) // Social coefficient
    const [isRunning, setIsRunning] = useState(false)

    const runSwarm = () => {
        setIsRunning(true)
        setIteration(0)
        const interval = setInterval(() => {
            setIteration(i => {
                if (i >= 50) {
                    setIsRunning(false)
                    clearInterval(interval)
                    return 50
                }
                return i + 1
            })
        }, 100)
    }

    const particles = Array.from({ length: Math.min(15, numParticles) }, (_, i) => {
        const angle = (i / numParticles) * 2 * Math.PI + iteration * 0.1
        const radius = 5 - iteration * 0.08
        return {
            id: i + 1,
            x: Math.cos(angle) * Math.max(0.5, radius),
            y: Math.sin(angle) * Math.max(0.5, radius),
            fitness: 100 - Math.sqrt(Math.pow(Math.cos(angle) * radius, 2) + Math.pow(Math.sin(angle) * radius, 2)) * 10
        }
    })

    const convergenceData = Array.from({ length: iteration + 1 }, (_, i) => ({
        iteration: i,
        globalBest: 100 - 95 * (1 - Math.exp(-i * 0.15)),
        averageFitness: 100 - 95 * (1 - Math.exp(-i * 0.1))
    }))

    return (
        <div className="space-y-6">
            {/* Mathematical Foundation */}
            <Card>
                <CardHeader>
                    <CardTitle>📐 Particle Swarm Optimization Mathematics</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-200 overflow-x-auto">
                            <h3 className="text-lg font-bold text-purple-900 mb-4">PSO Update Equations</h3>

                            <div className="space-y-4">
                                <div className="bg-white p-4 rounded-lg">
                                    <p className="text-sm font-semibold text-gray-900 mb-2">1. Velocity Update</p>
                                    <BlockMath math="v_i^{t+1} = w \cdot v_i^t + c_1 r_1 (p_i - x_i^t) + c_2 r_2 (g - x_i^t)" />
                                    <div className="mt-3 space-y-1 text-xs text-gray-600">
                                        <p><InlineMath math="v_i^t" /> = velocity of particle i at time t</p>
                                        <p><InlineMath math="w" /> = {w.toFixed(2)} (inertia weight - momentum)</p>
                                        <p><InlineMath math="c_1" /> = {c1.toFixed(2)} (cognitive coefficient - personal best attraction)</p>
                                        <p><InlineMath math="c_2" /> = {c2.toFixed(2)} (social coefficient - global best attraction)</p>
                                        <p><InlineMath math="r_1, r_2" /> = random numbers in [0,1]</p>
                                        <p><InlineMath math="p_i" /> = personal best position of particle i</p>
                                        <p><InlineMath math="g" /> = global best position found by swarm</p>
                                    </div>
                                </div>

                                <div className="bg-white p-4 rounded-lg">
                                    <p className="text-sm font-semibold text-gray-900 mb-2">2. Position Update</p>
                                    <BlockMath math="x_i^{t+1} = x_i^t + v_i^{t+1}" />
                                    <p className="text-xs text-gray-600 mt-2">
                                        New position = current position + new velocity
                                    </p>
                                </div>

                                <div className="bg-white p-4 rounded-lg">
                                    <p className="text-sm font-semibold text-gray-900 mb-2">3. Personal Best Update</p>
                                    <BlockMath math="p_i = \begin{cases} x_i^{t+1} & \text{if } f(x_i^{t+1}) > f(p_i) \\ p_i & \text{otherwise} \end{cases}" />
                                    <p className="text-xs text-gray-600 mt-2">
                                        Update personal best if new position is better
                                    </p>
                                </div>

                                <div className="bg-white p-4 rounded-lg">
                                    <p className="text-sm font-semibold text-gray-900 mb-2">4. Global Best Update</p>
                                    <BlockMath math="g = \arg\max_{i} f(p_i)" />
                                    <p className="text-xs text-gray-600 mt-2">
                                        Global best is the best personal best among all particles
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                            <h3 className="text-lg font-bold text-blue-900 mb-4">💡 Velocity Components Explained</h3>
                            <div className="space-y-3">
                                <div className="p-3 bg-white rounded-lg">
                                    <p className="text-sm font-semibold text-gray-900 mb-1">
                                        <InlineMath math="w \cdot v_i^t" /> - Inertia (Momentum)
                                    </p>
                                    <p className="text-xs text-gray-600">
                                        Keeps particle moving in current direction. Higher w = more exploration.
                                        Current: w = {w.toFixed(2)}
                                    </p>
                                </div>
                                <div className="p-3 bg-white rounded-lg">
                                    <p className="text-sm font-semibold text-gray-900 mb-1">
                                        <InlineMath math="c_1 r_1 (p_i - x_i^t)" /> - Cognitive Component
                                    </p>
                                    <p className="text-xs text-gray-600">
                                        Pulls particle toward its own best position. "Remember where I did well!"
                                        Current: c₁ = {c1.toFixed(2)}
                                    </p>
                                </div>
                                <div className="p-3 bg-white rounded-lg">
                                    <p className="text-sm font-semibold text-gray-900 mb-1">
                                        <InlineMath math="c_2 r_2 (g - x_i^t)" /> - Social Component
                                    </p>
                                    <p className="text-xs text-gray-600">
                                        Pulls particle toward swarm's best position. "Follow the leader!"
                                        Current: c₂ = {c2.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200">
                            <h3 className="text-lg font-bold text-green-900 mb-3">🎯 Parameter Guidelines</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                                <div className="p-3 bg-white rounded">
                                    <p className="font-semibold text-gray-900 mb-1">Inertia Weight (w)</p>
                                    <p className="text-gray-600">0.4-0.9: Balance exploration vs exploitation</p>
                                </div>
                                <div className="p-3 bg-white rounded">
                                    <p className="font-semibold text-gray-900 mb-1">Cognitive (c₁)</p>
                                    <p className="text-gray-600">1.5-2.0: Trust own experience</p>
                                </div>
                                <div className="p-3 bg-white rounded">
                                    <p className="font-semibold text-gray-900 mb-1">Social (c₂)</p>
                                    <p className="text-gray-600">1.5-2.0: Trust swarm knowledge</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Interactive Simulation */}
            <Card>
                <CardHeader>
                    <CardTitle>🐝 Interactive Particle Swarm Simulation</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 mb-6">
                        Like bees finding the best flowers! Each bee (particle) remembers the best spot it found,
                        and also follows the swarm toward the best spot anyone found.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-semibold mb-4">Swarm Parameters</h3>

                            <div className="space-y-4 mb-6">
                                <Slider
                                    label={`Number of Particles: ${numParticles}`}
                                    value={numParticles}
                                    onChange={setNumParticles}
                                    min={10}
                                    max={50}
                                    step={5}
                                    description="Swarm size"
                                />
                                <Slider
                                    label={`Inertia Weight (w): ${w.toFixed(2)}`}
                                    value={w}
                                    onChange={setW}
                                    min={0.4}
                                    max={0.9}
                                    step={0.05}
                                    description="Momentum - higher = more exploration"
                                />
                                <Slider
                                    label={`Cognitive (c₁): ${c1.toFixed(2)}`}
                                    value={c1}
                                    onChange={setC1}
                                    min={0.5}
                                    max={2.5}
                                    step={0.1}
                                    description="Personal best attraction"
                                />
                                <Slider
                                    label={`Social (c₂): ${c2.toFixed(2)}`}
                                    value={c2}
                                    onChange={setC2}
                                    min={0.5}
                                    max={2.5}
                                    step={0.1}
                                    description="Global best attraction"
                                />
                            </div>

                            <div className="flex gap-3 mb-6">
                                <Button
                                    onClick={runSwarm}
                                    disabled={isRunning}
                                    className="flex-1 flex items-center justify-center gap-2"
                                >
                                    <Play className="w-4 h-4" />
                                    {isRunning ? `Iteration ${iteration}` : 'Start Swarm'}
                                </Button>
                                <Button
                                    onClick={() => setIteration(0)}
                                    variant="outline"
                                    className="flex items-center gap-2"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                </Button>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-6 h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <ScatterChart>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="x" domain={[-6, 6]} label={{ value: 'x', position: 'insideBottom', offset: -5 }} />
                                        <YAxis dataKey="y" domain={[-6, 6]} label={{ value: 'y', angle: -90, position: 'insideLeft' }} />
                                        <Tooltip />
                                        <Scatter name="Particles" data={particles} fill="#10b981" />
                                        <Scatter name="Target (g)" data={[{ x: 0, y: 0 }]} fill="#ef4444" shape="star" />
                                    </ScatterChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-4">Convergence Progress</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={convergenceData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="iteration" label={{ value: 'Iteration (t)', position: 'insideBottom', offset: -5 }} />
                                    <YAxis label={{ value: 'Fitness f(x)', angle: -90, position: 'insideLeft' }} />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="globalBest" stroke="#10b981" strokeWidth={2} name="Global Best f(g)" />
                                    <Line type="monotone" dataKey="averageFitness" stroke="#3b82f6" strokeWidth={2} name="Average" />
                                </LineChart>
                            </ResponsiveContainer>

                            <div className="mt-4 p-4 bg-green-50 rounded-lg">
                                <h4 className="font-semibold text-green-900 mb-2">Swarm Status</h4>
                                <div className="text-sm text-green-700 space-y-1">
                                    <p>Iteration t: {iteration}</p>
                                    <p>Global Best f(g): {convergenceData[iteration]?.globalBest.toFixed(2) || 0}</p>
                                    <p>Active Particles: {numParticles}</p>
                                    <p>Convergence: {Math.min(100, iteration * 2).toFixed(0)}%</p>
                                    <p className="text-xs mt-2 text-green-600">
                                        Particles converging to target at (0, 0)
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>🎯 PSO Behavior Patterns</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                            <div className="text-2xl mb-2">🎯</div>
                            <h4 className="font-semibold text-blue-900 mb-2">Personal Best (pᵢ)</h4>
                            <p className="text-xs text-blue-700">
                                Each particle remembers its own best position. Cognitive component pulls it back.
                            </p>
                        </div>

                        <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
                            <div className="text-2xl mb-2">👑</div>
                            <h4 className="font-semibold text-green-900 mb-2">Global Best (g)</h4>
                            <p className="text-xs text-green-700">
                                Best position found by entire swarm. Social component attracts all particles.
                            </p>
                        </div>

                        <div className="p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                            <div className="text-2xl mb-2">🚀</div>
                            <h4 className="font-semibold text-purple-900 mb-2">Velocity (vᵢ)</h4>
                            <p className="text-xs text-purple-700">
                                Combines inertia, personal memory, and social learning to determine movement.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
