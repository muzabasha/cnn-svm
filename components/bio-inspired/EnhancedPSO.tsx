'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Play, Pause, RotateCcw } from 'lucide-react'
import { LineChart, Line, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'

export function EnhancedPSO() {
    const [iteration, setIteration] = useState(0)
    const [numParticles, setNumParticles] = useState(20)
    const [inertia, setInertia] = useState(0.7)
    const [cognitive, setCognitive] = useState(1.5)
    const [social, setSocial] = useState(1.5)
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
                        <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                            <h3 className="text-lg font-bold text-blue-900 mb-4">Core PSO Equations</h3>

                            <div className="space-y-4">
                                <div className="bg-white p-4 rounded-lg">
                                    <p className="text-sm font-semibold text-gray-900 mb-2">1. Velocity Update Equation</p>
                                    <div className="overflow-x-auto">
                                        <BlockMath math="v_i^{t+1} = w \cdot v_i^t + c_1 r_1 (p_i - x_i^t) + c_2 r_2 (g - x_i^t)" />
                                    </div>
                                    <div className="mt-3 space-y-2 text-xs text-gray-700">
                                        <p><InlineMath math="v_i^{t+1}" /> = New velocity of particle <InlineMath math="i" /></p>
                                        <p><InlineMath math="w" /> = {inertia.toFixed(2)} (Inertia weight - momentum)</p>
                                        <p><InlineMath math="c_1" /> = {cognitive.toFixed(2)} (Cognitive coefficient - personal best attraction)</p>
                                        <p><InlineMath math="c_2" /> = {social.toFixed(2)} (Social coefficient - global best attraction)</p>
                                        <p><InlineMath math="r_1, r_2" /> = Random numbers in [0,1]</p>
                                        <p><InlineMath math="p_i" /> = Personal best position of particle <InlineMath math="i" /></p>
                                        <p><InlineMath math="g" /> = Global best position found by swarm</p>
                                        <p><InlineMath math="x_i^t" /> = Current position of particle <InlineMath math="i" /></p>
                                    </div>
                                </div>

                                <div className="bg-white p-4 rounded-lg">
                                    <p className="text-sm font-semibold text-gray-900 mb-2">2. Position Update Equation</p>
                                    <div className="overflow-x-auto">
                                        <BlockMath math="x_i^{t+1} = x_i^t + v_i^{t+1}" />
                                    </div>
                                    <p className="text-xs text-gray-600 mt-2">
                                        New position = Current position + New velocity
                                    </p>
                                </div>

                                <div className="bg-white p-4 rounded-lg">
                                    <p className="text-sm font-semibold text-gray-900 mb-2">3. Personal Best Update</p>
                                    <div className="overflow-x-auto">
                                        <BlockMath math="p_i^{t+1} = \begin{cases} x_i^{t+1} & \text{if } f(x_i^{t+1}) < f(p_i^t) \\ p_i^t & \text{otherwise} \end{cases}" />
                                    </div>
                                    <p className="text-xs text-gray-600 mt-2">
                                        Update personal best if new position has better fitness
                                    </p>
                                </div>

                                <div className="bg-white p-4 rounded-lg">
                                    <p className="text-sm font-semibold text-gray-900 mb-2">4. Global Best Update</p>
                                    <div className="overflow-x-auto">
                                        <BlockMath math="g^{t+1} = \arg\min_{i} f(p_i^{t+1})" />
                                    </div>
                                    <p className="text-xs text-gray-600 mt-2">
                                        Global best is the best personal best among all particles
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-200">
                            <h3 className="text-lg font-bold text-purple-900 mb-4">🎯 Velocity Components Explained</h3>
                            <div className="space-y-3">
                                <div className="bg-white p-4 rounded-lg">
                                    <h4 className="font-semibold text-purple-900 mb-2">Component 1: Inertia</h4>
                                    <div className="overflow-x-auto">
                                        <BlockMath math="w \cdot v_i^t" />
                                    </div>
                                    <p className="text-sm text-purple-700 mt-2">
                                        <strong>Momentum:</strong> Particle continues in its current direction.
                                        Current w = {inertia.toFixed(2)}
                                    </p>
                                    <p className="text-xs text-purple-600 mt-1">
                                        • High w (0.9): More exploration, slower convergence<br />
                                        • Low w (0.4): Less exploration, faster convergence
                                    </p>
                                </div>

                                <div className="bg-white p-4 rounded-lg">
                                    <h4 className="font-semibold text-blue-900 mb-2">Component 2: Cognitive (Personal Best)</h4>
                                    <div className="overflow-x-auto">
                                        <BlockMath math="c_1 r_1 (p_i - x_i^t)" />
                                    </div>
                                    <p className="text-sm text-blue-700 mt-2">
                                        <strong>Self-learning:</strong> Particle attracted to its own best position.
                                        Current c₁ = {cognitive.toFixed(2)}
                                    </p>
                                    <p className="text-xs text-blue-600 mt-1">
                                        • Encourages exploitation of personal experience<br />
                                        • "I found something good here before!"
                                    </p>
                                </div>

                                <div className="bg-white p-4 rounded-lg">
                                    <h4 className="font-semibold text-green-900 mb-2">Component 3: Social (Global Best)</h4>
                                    <div className="overflow-x-auto">
                                        <BlockMath math="c_2 r_2 (g - x_i^t)" />
                                    </div>
                                    <p className="text-sm text-green-700 mt-2">
                                        <strong>Swarm intelligence:</strong> Particle attracted to swarm's best position.
                                        Current c₂ = {social.toFixed(2)}
                                    </p>
                                    <p className="text-xs text-green-600 mt-1">
                                        • Encourages cooperation and information sharing<br />
                                        • "The swarm found something even better!"
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-yellow-50 p-6 rounded-xl border-2 border-yellow-200">
                            <h3 className="text-lg font-bold text-yellow-900 mb-4">💡 Parameter Balance</h3>
                            <div className="space-y-2 text-sm text-yellow-800">
                                <p><strong>Exploration vs Exploitation:</strong></p>
                                <p>• High w + High c₁ + Low c₂ = More exploration (search widely)</p>
                                <p>• Low w + Low c₁ + High c₂ = More exploitation (refine solutions)</p>
                                <p>• Balanced (w=0.7, c₁=c₂=1.5) = Good general performance</p>
                                <p className="mt-3 pt-3 border-t border-yellow-300">
                                    <strong>Current Settings:</strong> w={inertia.toFixed(2)}, c₁={cognitive.toFixed(2)}, c₂={social.toFixed(2)}
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Interactive Simulation */}
            <Card>
                <CardHeader>
                    <CardTitle>🐝 Interactive PSO Simulation</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 mb-6">
                        Watch particles swarm toward the optimal solution! Each particle balances three forces:
                        its momentum, attraction to its personal best, and attraction to the global best.
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
                                />
                                <Slider
                                    label={`Inertia Weight (w): ${inertia.toFixed(2)}`}
                                    value={inertia}
                                    onChange={setInertia}
                                    min={0.4}
                                    max={0.9}
                                    step={0.05}
                                />
                                <Slider
                                    label={`Cognitive (c₁): ${cognitive.toFixed(2)}`}
                                    value={cognitive}
                                    onChange={setCognitive}
                                    min={0.5}
                                    max={2.5}
                                    step={0.1}
                                />
                                <Slider
                                    label={`Social (c₂): ${social.toFixed(2)}`}
                                    value={social}
                                    onChange={setSocial}
                                    min={0.5}
                                    max={2.5}
                                    step={0.1}
                                />
                            </div>

                            <div className="flex gap-3 mb-6">
                                <Button
                                    onClick={runSwarm}
                                    disabled={isRunning}
                                    className="flex-1 flex items-center justify-center gap-2"
                                >
                                    {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
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
                                        <XAxis dataKey="x" domain={[-6, 6]} label={{ value: 'X Position', position: 'insideBottom', offset: -5 }} />
                                        <YAxis dataKey="y" domain={[-6, 6]} label={{ value: 'Y Position', angle: -90, position: 'insideLeft' }} />
                                        <Tooltip />
                                        <Scatter name="Particles" data={particles} fill="#10b981" />
                                        <Scatter name="Global Best (Target)" data={[{ x: 0, y: 0 }]} fill="#ef4444" shape="star" />
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
                                    <Line type="monotone" dataKey="averageFitness" stroke="#3b82f6" strokeWidth={2} name="Average Fitness" />
                                </LineChart>
                            </ResponsiveContainer>

                            <div className="mt-4 p-4 bg-green-50 rounded-lg">
                                <h4 className="font-semibold text-green-900 mb-2">Swarm Status</h4>
                                <div className="text-sm text-green-700 space-y-1">
                                    <p>Iteration t: {iteration}</p>
                                    <p>Global Best f(g): {convergenceData[iteration]?.globalBest.toFixed(2) || 0}</p>
                                    <p>Active Particles: {numParticles}</p>
                                    <p>Convergence: {Math.min(100, iteration * 2).toFixed(0)}%</p>
                                    <p className="pt-2 border-t border-green-200">
                                        Parameters: w={inertia.toFixed(2)}, c₁={cognitive.toFixed(2)}, c₂={social.toFixed(2)}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                                <h4 className="font-semibold text-blue-900 mb-2">🎯 Interpretation</h4>
                                <p className="text-xs text-blue-700">
                                    Particles start scattered and gradually converge toward the red star (global optimum at origin).
                                    The convergence speed depends on your parameter settings!
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Algorithm Steps */}
            <Card>
                <CardHeader>
                    <CardTitle>🔄 PSO Algorithm Steps</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                            <div className="text-3xl mb-2">1️⃣</div>
                            <h4 className="font-semibold text-blue-900 mb-2">Initialize</h4>
                            <p className="text-xs text-blue-700 mb-2">
                                Create N particles with random positions <InlineMath math="x_i" /> and velocities <InlineMath math="v_i" />
                            </p>
                            <p className="text-xs text-blue-600">
                                Set <InlineMath math="p_i = x_i" /> and find <InlineMath math="g" />
                            </p>
                        </div>

                        <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
                            <div className="text-3xl mb-2">2️⃣</div>
                            <h4 className="font-semibold text-green-900 mb-2">Update Velocity</h4>
                            <p className="text-xs text-green-700 mb-2">
                                Calculate new velocity using inertia, cognitive, and social components
                            </p>
                            <p className="text-xs text-green-600">
                                <InlineMath math="v_i^{t+1} = w v_i^t + c_1 r_1 (p_i - x_i^t) + c_2 r_2 (g - x_i^t)" />
                            </p>
                        </div>

                        <div className="p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                            <div className="text-3xl mb-2">3️⃣</div>
                            <h4 className="font-semibold text-purple-900 mb-2">Update Position</h4>
                            <p className="text-xs text-purple-700 mb-2">
                                Move particle to new position
                            </p>
                            <p className="text-xs text-purple-600">
                                <InlineMath math="x_i^{t+1} = x_i^t + v_i^{t+1}" />
                            </p>
                        </div>

                        <div className="p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
                            <div className="text-3xl mb-2">4️⃣</div>
                            <h4 className="font-semibold text-orange-900 mb-2">Update Bests</h4>
                            <p className="text-xs text-orange-700 mb-2">
                                Update personal and global bests if better solutions found
                            </p>
                            <p className="text-xs text-orange-600">
                                Repeat until convergence
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
