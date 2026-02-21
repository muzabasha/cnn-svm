'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { Play, RotateCcw } from 'lucide-react'
import { LineChart, Line, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'

export default function BioInspiredPage() {
    const [selectedAlgorithm, setSelectedAlgorithm] = useState('ga')

    const algorithms = [
        { id: 'ga', name: 'Genetic Algorithm', icon: '🧬' },
        { id: 'pso', name: 'Particle Swarm', icon: '🐝' },
        { id: 'aco', name: 'Ant Colony', icon: '🐜' },
        { id: 'sa', name: 'Simulated Annealing', icon: '🔥' }
    ]

    const renderAlgorithm = () => {
        switch (selectedAlgorithm) {
            case 'ga':
                return <GeneticAlgorithm />
            case 'pso':
                return <ParticleSwarm />
            case 'aco':
                return <AntColony />
            case 'sa':
                return <SimulatedAnnealing />
            default:
                return <GeneticAlgorithm />
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-6 sm:mb-8">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
                        🌿 Bio-Inspired Optimization Lab
                    </h1>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                        Learn from nature! Algorithms inspired by evolution, swarms, and natural processes.
                    </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
                    {algorithms.map((algo) => (
                        <button
                            key={algo.id}
                            onClick={() => setSelectedAlgorithm(algo.id)}
                            className={`p-4 rounded-xl border-2 transition-all ${selectedAlgorithm === algo.id
                                ? 'border-green-500 bg-green-50 shadow-lg'
                                : 'border-gray-200 bg-white hover:bg-gray-50'
                                }`}
                        >
                            <div className="text-3xl mb-2">{algo.icon}</div>
                            <div className="text-sm font-semibold text-gray-900">{algo.name}</div>
                        </button>
                    ))}
                </div>

                <div className="mt-6 sm:mt-8">
                    {renderAlgorithm()}
                </div>
            </div>
        </div>
    )
}

function GeneticAlgorithm() {
    const [generation, setGeneration] = useState(0)
    const [populationSize, setPopulationSize] = useState(20)
    const [mutationRate, setMutationRate] = useState(0.1)
    const [crossoverRate, setCrossoverRate] = useState(0.8)
    const [isRunning, setIsRunning] = useState(false)

    const runEvolution = () => {
        setIsRunning(true)
        setGeneration(0)
        const interval = setInterval(() => {
            setGeneration(g => {
                if (g >= 50) {
                    setIsRunning(false)
                    clearInterval(interval)
                    return 50
                }
                return g + 1
            })
        }, 100)
    }

    const fitnessData = Array.from({ length: generation + 1 }, (_, i) => ({
        generation: i,
        best: 100 - 95 * Math.exp(-i * 0.1),
        average: 100 - 95 * Math.exp(-i * 0.08),
        worst: 100 - 95 * Math.exp(-i * 0.05)
    }))

    const population = Array.from({ length: Math.min(10, populationSize) }, (_, i) => ({
        id: i + 1,
        fitness: Math.random() * (50 + generation * 0.8),
        genes: Array.from({ length: 8 }, () => Math.random() > 0.5 ? 1 : 0).join('')
    })).sort((a, b) => b.fitness - a.fitness)

    return (
        <div className="space-y-6">
            {/* Mathematical Foundation */}
            <Card>
                <CardHeader>
                    <CardTitle>📐 Genetic Algorithm Mathematics</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                            <h3 className="text-lg font-bold text-blue-900 mb-4">Core Formulas</h3>

                            <div className="space-y-4">
                                <div className="bg-white p-4 rounded-lg">
                                    <p className="text-sm font-semibold text-gray-900 mb-2">1. Fitness Function</p>
                                    <BlockMath math="f(x) = \text{objective}(x)" />
                                    <p className="text-xs text-gray-600 mt-2">
                                        Measures solution quality. Higher fitness = better solution.
                                    </p>
                                </div>

                                <div className="bg-white p-4 rounded-lg">
                                    <p className="text-sm font-semibold text-gray-900 mb-2">2. Selection Probability (Roulette Wheel)</p>
                                    <BlockMath math="P(x_i) = \frac{f(x_i)}{\sum_{j=1}^{n} f(x_j)}" />
                                    <p className="text-xs text-gray-600 mt-2">
                                        Probability of selecting individual <InlineMath math="x_i" /> is proportional to its fitness.
                                    </p>
                                    <div className="mt-3 p-3 bg-blue-50 rounded">
                                        <p className="text-xs font-semibold text-blue-900">Example:</p>
                                        <p className="text-xs text-blue-700">
                                            If fitness values are [10, 20, 30], probabilities are [16.7%, 33.3%, 50%]
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-white p-4 rounded-lg">
                                    <p className="text-sm font-semibold text-gray-900 mb-2">3. Crossover (Single-Point)</p>
                                    <BlockMath math="\text{child} = \text{parent}_1[0:k] + \text{parent}_2[k:n]" />
                                    <p className="text-xs text-gray-600 mt-2">
                                        Combine genetic material at crossover point <InlineMath math="k" />
                                    </p>
                                    <div className="mt-3 p-3 bg-green-50 rounded">
                                        <p className="text-xs font-semibold text-green-900">Example:</p>
                                        <p className="text-xs text-green-700 font-mono">
                                            Parent 1: 11001010<br />
                                            Parent 2: 00110101<br />
                                            Child: 1100<span className="text-purple-700">0101</span> (crossover at position 4)
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-white p-4 rounded-lg">
                                    <p className="text-sm font-semibold text-gray-900 mb-2">4. Mutation</p>
                                    <BlockMath math="x_i' = \begin{cases} x_i & \text{with probability } 1-p_m \\ \neg x_i & \text{with probability } p_m \end{cases}" />
                                    <p className="text-xs text-gray-600 mt-2">
                                        Flip bits with mutation probability <InlineMath math="p_m" /> = {(mutationRate * 100).toFixed(0)}%
                                    </p>
                                    <div className="mt-3 p-3 bg-orange-50 rounded">
                                        <p className="text-xs font-semibold text-orange-900">Example:</p>
                                        <p className="text-xs text-orange-700 font-mono">
                                            Before: 11001010<br />
                                            After:  110<span className="text-red-700">1</span>1010 (bit 3 mutated)
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-white p-4 rounded-lg">
                                    <p className="text-sm font-semibold text-gray-900 mb-2">5. Average Fitness Evolution</p>
                                    <BlockMath math="\bar{f}(t) = \frac{1}{N}\sum_{i=1}^{N} f(x_i^{(t)})" />
                                    <p className="text-xs text-gray-600 mt-2">
                                        Average fitness at generation <InlineMath math="t" /> with population size <InlineMath math="N" />
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-yellow-50 p-6 rounded-xl border-2 border-yellow-200">
                            <h3 className="text-lg font-bold text-yellow-900 mb-4">💡 How It Works Together</h3>
                            <div className="space-y-3 text-sm text-yellow-800">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                                    <p><strong>Selection:</strong> Better solutions (higher <InlineMath math="f(x)" />) have higher <InlineMath math="P(x)" />, more likely to reproduce</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                                    <p><strong>Crossover:</strong> Combines good traits from parents (rate = {(crossoverRate * 100).toFixed(0)}%)</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                                    <p><strong>Mutation:</strong> Introduces diversity, prevents premature convergence (rate = {(mutationRate * 100).toFixed(0)}%)</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                                    <p><strong>Result:</strong> Average fitness <InlineMath math="\bar{f}(t)" /> increases over generations</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Interactive Simulation */}
            <Card>
                <CardHeader>
                    <CardTitle>🧬 Interactive Genetic Algorithm Simulation</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 mb-6">
                        Like breeding the perfect recipe! Start with random recipes, keep the best ones,
                        mix them together (crossover), add small changes (mutation), and repeat!
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-semibold mb-4">Evolution Parameters</h3>

                            <div className="space-y-4 mb-6">
                                <Slider
                                    label={`Population Size: ${populationSize}`}
                                    value={populationSize}
                                    onChange={setPopulationSize}
                                    min={10}
                                    max={100}
                                    step={10}
                                    description="Number of solutions in each generation"
                                />
                                <Slider
                                    label={`Crossover Rate: ${(crossoverRate * 100).toFixed(0)}%`}
                                    value={crossoverRate}
                                    onChange={setCrossoverRate}
                                    min={0.5}
                                    max={1}
                                    step={0.05}
                                    description="Probability of combining parent genes"
                                />
                                <Slider
                                    label={`Mutation Rate: ${(mutationRate * 100).toFixed(0)}%`}
                                    value={mutationRate}
                                    onChange={setMutationRate}
                                    min={0.01}
                                    max={0.5}
                                    step={0.01}
                                    description="Probability of random gene changes"
                                />
                            </div>

                            <div className="flex gap-3 mb-6">
                                <Button
                                    onClick={runEvolution}
                                    disabled={isRunning}
                                    className="flex-1 flex items-center justify-center gap-2"
                                >
                                    <Play className="w-4 h-4" />
                                    {isRunning ? `Evolving... Gen ${generation}` : 'Start Evolution'}
                                </Button>
                                <Button
                                    onClick={() => setGeneration(0)}
                                    variant="outline"
                                    className="flex items-center gap-2"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                </Button>
                            </div>

                            <div className="bg-green-50 rounded-lg p-4">
                                <h4 className="font-semibold text-green-900 mb-3">Top 10 Individuals (Chromosomes)</h4>
                                <div className="space-y-2">
                                    {population.map((ind) => (
                                        <div key={ind.id} className="flex items-center justify-between p-2 bg-white rounded">
                                            <span className="text-xs font-mono">{ind.genes}</span>
                                            <span className="text-sm font-semibold text-green-600">
                                                f(x) = {ind.fitness.toFixed(1)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-4">Fitness Evolution Over Generations</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={fitnessData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="generation" label={{ value: 'Generation (t)', position: 'insideBottom', offset: -5 }} />
                                    <YAxis label={{ value: 'Fitness f(x)', angle: -90, position: 'insideLeft' }} />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="best" stroke="#10b981" strokeWidth={2} name="Best" />
                                    <Line type="monotone" dataKey="average" stroke="#3b82f6" strokeWidth={2} name="Average" />
                                    <Line type="monotone" dataKey="worst" stroke="#ef4444" strokeWidth={2} name="Worst" />
                                </LineChart>
                            </ResponsiveContainer>

                            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                                <h4 className="font-semibold text-blue-900 mb-2">Current Generation: {generation}</h4>
                                <div className="text-sm text-blue-700 space-y-1">
                                    <p>Best Fitness: {fitnessData[generation]?.best.toFixed(2) || 0}</p>
                                    <p>Average Fitness <InlineMath math="\bar{f}" />: {fitnessData[generation]?.average.toFixed(2) || 0}</p>
                                    <p>Population Size N: {populationSize}</p>
                                    <p>Improvement: {generation > 0 ? ((fitnessData[generation]?.best - fitnessData[0]?.best) / fitnessData[0]?.best * 100).toFixed(1) : 0}%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>🎯 Genetic Operators Explained</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                            <div className="text-3xl mb-2">🎲</div>
                            <h4 className="font-semibold text-blue-900 mb-2">1. Initialize</h4>
                            <p className="text-xs text-blue-700 mb-2">
                                Create random population of solutions
                            </p>
                            <p className="text-xs text-blue-600 font-mono">
                                N = {populationSize} individuals
                            </p>
                        </div>

                        <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
                            <div className="text-3xl mb-2">⭐</div>
                            <h4 className="font-semibold text-green-900 mb-2">2. Selection</h4>
                            <p className="text-xs text-green-700 mb-2">
                                Choose parents based on fitness
                            </p>
                            <p className="text-xs text-green-600">
                                <InlineMath math="P(x_i) \propto f(x_i)" />
                            </p>
                        </div>

                        <div className="p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                            <div className="text-3xl mb-2">🔀</div>
                            <h4 className="font-semibold text-purple-900 mb-2">3. Crossover</h4>
                            <p className="text-xs text-purple-700 mb-2">
                                Combine parent genes
                            </p>
                            <p className="text-xs text-purple-600 font-mono">
                                Rate = {(crossoverRate * 100).toFixed(0)}%
                            </p>
                        </div>

                        <div className="p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
                            <div className="text-3xl mb-2">⚡</div>
                            <h4 className="font-semibold text-orange-900 mb-2">4. Mutation</h4>
                            <p className="text-xs text-orange-700 mb-2">
                                Random gene changes
                            </p>
                            <p className="text-xs text-orange-600">
                                <InlineMath math="p_m" /> = {(mutationRate * 100).toFixed(0)}%
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

function ParticleSwarm() {
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
                        <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                            <h3 className="text-lg font-bold text-blue-900 mb-4">Core PSO Equations</h3>

                            <div className="space-y-4">
                                <div className="bg-white p-4 rounded-lg">
                                    <p className="text-sm font-semibold text-gray-900 mb-2">1. Velocity Update Equation</p>
                                    <BlockMath math="v_i^{t+1} = w \cdot v_i^t + c_1 r_1 (p_i - x_i^t) + c_2 r_2 (g - x_i^t)" />
                                    <div className="mt-3 space-y-1 text-xs text-gray-700">
                                        <p>• <InlineMath math="v_i^{t+1}" /> = new velocity of particle i</p>
                                        <p>• <InlineMath math="w" /> = {w.toFixed(2)} (inertia weight - momentum)</p>
                                        <p>• <InlineMath math="c_1" /> = {c1.toFixed(2)} (cognitive coefficient - personal best attraction)</p>
                                        <p>• <InlineMath math="c_2" /> = {c2.toFixed(2)} (social coefficient - global best attraction)</p>
                                        <p>• <InlineMath math="r_1, r_2" /> = random numbers in [0,1]</p>
                                        <p>• <InlineMath math="p_i" /> = personal best position of particle i</p>
                                        <p>• <InlineMath math="g" /> = global best position of swarm</p>
                                        <p>• <InlineMath math="x_i^t" /> = current position of particle i</p>
                                    </div>
                                    <div className="mt-3 p-3 bg-blue-50 rounded">
                                        <p className="text-xs font-semibold text-blue-900">Three Components:</p>
                                        <p className="text-xs text-blue-700">
                                            1. <InlineMath math="w \cdot v_i^t" /> - Inertia (keep moving in same direction)<br />
                                            2. <InlineMath math="c_1 r_1 (p_i - x_i^t)" /> - Cognitive (move toward personal best)<br />
                                            3. <InlineMath math="c_2 r_2 (g - x_i^t)" /> - Social (move toward global best)
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-white p-4 rounded-lg">
                                    <p className="text-sm font-semibold text-gray-900 mb-2">2. Position Update Equation</p>
                                    <BlockMath math="x_i^{t+1} = x_i^t + v_i^{t+1}" />
                                    <p className="text-xs text-gray-600 mt-2">
                                        Update particle position by adding the new velocity
                                    </p>
                                    <div className="mt-3 p-3 bg-green-50 rounded">
                                        <p className="text-xs font-semibold text-green-900">Example (1D):</p>
                                        <p className="text-xs text-green-700 font-mono">
                                            Current position: x = 5.0<br />
                                            New velocity: v = 0.8<br />
                                            New position: x = 5.0 + 0.8 = 5.8
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-white p-4 rounded-lg">
                                    <p className="text-sm font-semibold text-gray-900 mb-2">3. Personal Best Update</p>
                                    <BlockMath math="p_i^{t+1} = \begin{cases} x_i^{t+1} & \text{if } f(x_i^{t+1}) < f(p_i^t) \\ p_i^t & \text{otherwise} \end{cases}" />
                                    <p className="text-xs text-gray-600 mt-2">
                                        Update personal best if current position is better (minimization problem)
                                    </p>
                                </div>

                                <div className="bg-white p-4 rounded-lg">
                                    <p className="text-sm font-semibold text-gray-900 mb-2">4. Global Best Update</p>
                                    <BlockMath math="g^{t+1} = \arg\min_{i} f(p_i^{t+1})" />
                                    <p className="text-xs text-gray-600 mt-2">
                                        Global best is the best personal best among all particles
                                    </p>
                                </div>

                                <div className="bg-white p-4 rounded-lg">
                                    <p className="text-sm font-semibold text-gray-900 mb-2">5. Velocity Clamping</p>
                                    <BlockMath math="v_i^{t+1} = \begin{cases} v_{max} & \text{if } v_i^{t+1} > v_{max} \\ -v_{max} & \text{if } v_i^{t+1} < -v_{max} \\ v_i^{t+1} & \text{otherwise} \end{cases}" />
                                    <p className="text-xs text-gray-600 mt-2">
                                        Limit velocity to prevent particles from moving too fast
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-yellow-50 p-6 rounded-xl border-2 border-yellow-200">
                            <h3 className="text-lg font-bold text-yellow-900 mb-4">💡 Parameter Tuning Guide</h3>
                            <div className="space-y-3 text-sm text-yellow-800">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">w</div>
                                    <div>
                                        <p className="font-semibold">Inertia Weight (w = {w.toFixed(2)})</p>
                                        <p className="text-xs">High (0.9): More exploration, slower convergence</p>
                                        <p className="text-xs">Low (0.4): More exploitation, faster convergence</p>
                                        <p className="text-xs">Typical: 0.7 or decrease from 0.9 to 0.4 over time</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">c₁</div>
                                    <div>
                                        <p className="font-semibold">Cognitive Coefficient (c₁ = {c1.toFixed(2)})</p>
                                        <p className="text-xs">Controls attraction to personal best</p>
                                        <p className="text-xs">Typical range: 1.5 - 2.0</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">c₂</div>
                                    <div>
                                        <p className="font-semibold">Social Coefficient (c₂ = {c2.toFixed(2)})</p>
                                        <p className="text-xs">Controls attraction to global best</p>
                                        <p className="text-xs">Typical range: 1.5 - 2.0</p>
                                        <p className="text-xs">Balance: c₁ + c₂ ≈ 4.0 for stability</p>
                                    </div>
                                </div>
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
                                    description="Balance exploration vs exploitation"
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
                                        <XAxis dataKey="x" domain={[-6, 6]} label={{ value: 'x₁', position: 'insideBottom', offset: -5 }} />
                                        <YAxis dataKey="y" domain={[-6, 6]} label={{ value: 'x₂', angle: -90, position: 'insideLeft' }} />
                                        <Tooltip />
                                        <Scatter name="Particles" data={particles} fill="#10b981" />
                                        <Scatter name="Global Best (g)" data={[{ x: 0, y: 0 }]} fill="#ef4444" shape="star" />
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
                                    <Line type="monotone" dataKey="averageFitness" stroke="#3b82f6" strokeWidth={2} name="Average f(x)" />
                                </LineChart>
                            </ResponsiveContainer>

                            <div className="mt-4 p-4 bg-green-50 rounded-lg">
                                <h4 className="font-semibold text-green-900 mb-2">Swarm Status</h4>
                                <div className="text-sm text-green-700 space-y-1">
                                    <p>Iteration t: {iteration}</p>
                                    <p>Global Best f(g): {convergenceData[iteration]?.globalBest.toFixed(2) || 0}</p>
                                    <p>Active Particles: {numParticles}</p>
                                    <p>Parameters: w={w.toFixed(2)}, c₁={c1.toFixed(2)}, c₂={c2.toFixed(2)}</p>
                                    <p>Convergence: {Math.min(100, iteration * 2).toFixed(0)}%</p>
                                </div>
                            </div>

                            <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                                <h4 className="font-semibold text-purple-900 mb-2">📊 Velocity Components</h4>
                                <div className="text-xs text-purple-700 space-y-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-16 h-3 bg-blue-400 rounded"></div>
                                        <span>Inertia: {(w * 100).toFixed(0)}%</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-16 h-3 bg-green-400 rounded"></div>
                                        <span>Cognitive: {(c1 / (w + c1 + c2) * 100).toFixed(0)}%</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-16 h-3 bg-orange-400 rounded"></div>
                                        <span>Social: {(c2 / (w + c1 + c2) * 100).toFixed(0)}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>🎯 PSO Algorithm Steps</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                            <div className="text-3xl mb-2">🎲</div>
                            <h4 className="font-semibold text-blue-900 mb-2">1. Initialize</h4>
                            <p className="text-xs text-blue-700 mb-2">
                                Random positions <InlineMath math="x_i" /> and velocities <InlineMath math="v_i" />
                            </p>
                            <p className="text-xs text-blue-600">
                                Set <InlineMath math="p_i = x_i" /> for all particles
                            </p>
                        </div>

                        <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
                            <div className="text-3xl mb-2">📊</div>
                            <h4 className="font-semibold text-green-900 mb-2">2. Evaluate</h4>
                            <p className="text-xs text-green-700 mb-2">
                                Calculate fitness <InlineMath math="f(x_i)" /> for each particle
                            </p>
                            <p className="text-xs text-green-600">
                                Update <InlineMath math="p_i" /> and <InlineMath math="g" />
                            </p>
                        </div>

                        <div className="p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                            <div className="text-3xl mb-2">🚀</div>
                            <h4 className="font-semibold text-purple-900 mb-2">3. Update Velocity</h4>
                            <p className="text-xs text-purple-700 mb-2">
                                <InlineMath math="v_i^{t+1} = w v_i^t + c_1 r_1 (p_i - x_i^t) + c_2 r_2 (g - x_i^t)" />
                            </p>
                        </div>

                        <div className="p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
                            <div className="text-3xl mb-2">📍</div>
                            <h4 className="font-semibold text-orange-900 mb-2">4. Update Position</h4>
                            <p className="text-xs text-orange-700 mb-2">
                                <InlineMath math="x_i^{t+1} = x_i^t + v_i^{t+1}" />
                            </p>
                            <p className="text-xs text-orange-600">
                                Repeat steps 2-4
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

function AntColony() {
    const [iteration, setIteration] = useState(0)
    const [numAnts, setNumAnts] = useState(20)
    const [alpha, setAlpha] = useState(1.0) // Pheromone importance
    const [beta, setBeta] = useState(2.0) // Heuristic importance
    const [rho, setRho] = useState(0.5) // Evaporation rate
    const [isRunning, setIsRunning] = useState(false)

    const cities = [
        { id: 'A', x: 2, y: 3 },
        { id: 'B', x: 5, y: 1 },
        { id: 'C', x: 7, y: 4 },
        { id: 'D', x: 4, y: 6 },
        { id: 'E', x: 1, y: 5 }
    ]

    const runACO = () => {
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

    const bestPathLength = 15 + 10 * Math.exp(-iteration * 0.1)
    const avgPathLength = 20 + 15 * Math.exp(-iteration * 0.08)

    const pathData = Array.from({ length: iteration + 1 }, (_, i) => ({
        iteration: i,
        best: 15 + 10 * Math.exp(-i * 0.1),
        average: 20 + 15 * Math.exp(-i * 0.08)
    }))

    return (
        <div className="space-y-6">
            {/* Mathematical Foundation */}
            <Card>
                <CardHeader>
                    <CardTitle>📐 Ant Colony Optimization Mathematics</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                            <h3 className="text-lg font-bold text-blue-900 mb-4">Core ACO Equations</h3>

                            <div className="space-y-4">
                                <div className="bg-white p-4 rounded-lg">
                                    <p className="text-sm font-semibold text-gray-900 mb-2">1. Transition Probability</p>
                                    <BlockMath math="p_{ij}^k = \frac{[\tau_{ij}]^\alpha \cdot [\eta_{ij}]^\beta}{\sum_{l \in N_i^k} [\tau_{il}]^\alpha \cdot [\eta_{il}]^\beta}" />
                                    <div className="mt-3 space-y-1 text-xs text-gray-700">
                                        <p>• <InlineMath math="p_{ij}^k" /> = probability ant k moves from city i to city j</p>
                                        <p>• <InlineMath math="\tau_{ij}" /> = pheromone level on edge (i,j)</p>
                                        <p>• <InlineMath math="\eta_{ij} = 1/d_{ij}" /> = heuristic (inverse of distance)</p>
                                        <p>• <InlineMath math="\alpha" /> = {alpha.toFixed(1)} (pheromone importance)</p>
                                        <p>• <InlineMath math="\beta" /> = {beta.toFixed(1)} (heuristic importance)</p>
                                        <p>• <InlineMath math="N_i^k" /> = feasible neighbors of city i for ant k</p>
                                    </div>
                                    <div className="mt-3 p-3 bg-blue-50 rounded">
                                        <p className="text-xs font-semibold text-blue-900">Interpretation:</p>
                                        <p className="text-xs text-blue-700">
                                            Higher pheromone (<InlineMath math="\tau_{ij}" />) and shorter distance (higher <InlineMath math="\eta_{ij}" />)
                                            increase probability of choosing edge (i,j)
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-white p-4 rounded-lg">
                                    <p className="text-sm font-semibold text-gray-900 mb-2">2. Pheromone Update</p>
                                    <BlockMath math="\tau_{ij}^{t+1} = (1-\rho) \cdot \tau_{ij}^t + \sum_{k=1}^{m} \Delta\tau_{ij}^k" />
                                    <div className="mt-3 space-y-1 text-xs text-gray-700">
                                        <p>• <InlineMath math="\rho" /> = {rho.toFixed(2)} (evaporation rate)</p>
                                        <p>• <InlineMath math="(1-\rho) \cdot \tau_{ij}^t" /> = evaporation (forget old trails)</p>
                                        <p>• <InlineMath math="\Delta\tau_{ij}^k" /> = pheromone deposited by ant k</p>
                                        <p>• <InlineMath math="m" /> = {numAnts} (number of ants)</p>
                                    </div>
                                    <div className="mt-3 p-3 bg-green-50 rounded">
                                        <p className="text-xs font-semibold text-green-900">Example:</p>
                                        <p className="text-xs text-green-700">
                                            If τ = 10, ρ = 0.5, Δτ = 2:<br />
                                            τ_new = (1-0.5)×10 + 2 = 5 + 2 = 7
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-white p-4 rounded-lg">
                                    <p className="text-sm font-semibold text-gray-900 mb-2">3. Pheromone Deposit</p>
                                    <BlockMath math="\Delta\tau_{ij}^k = \begin{cases} Q/L_k & \text{if ant } k \text{ uses edge } (i,j) \\ 0 & \text{otherwise} \end{cases}" />
                                    <div className="mt-3 space-y-1 text-xs text-gray-700">
                                        <p>• <InlineMath math="Q" /> = constant (typically 1 or 100)</p>
                                        <p>• <InlineMath math="L_k" /> = total path length of ant k</p>
                                        <p>• Shorter paths deposit more pheromone!</p>
                                    </div>
                                    <div className="mt-3 p-3 bg-purple-50 rounded">
                                        <p className="text-xs font-semibold text-purple-900">Example:</p>
                                        <p className="text-xs text-purple-700">
                                            Ant 1: L = 20, Δτ = 100/20 = 5<br />
                                            Ant 2: L = 10, Δτ = 100/10 = 10 (better path, more pheromone!)
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-white p-4 rounded-lg">
                                    <p className="text-sm font-semibold text-gray-900 mb-2">4. Heuristic Information</p>
                                    <BlockMath math="\eta_{ij} = \frac{1}{d_{ij}} = \frac{1}{\sqrt{(x_i-x_j)^2 + (y_i-y_j)^2}}" />
                                    <p className="text-xs text-gray-600 mt-2">
                                        Heuristic favors shorter edges (closer cities)
                                    </p>
                                </div>

                                <div className="bg-white p-4 rounded-lg">
                                    <p className="text-sm font-semibold text-gray-900 mb-2">5. Pheromone Bounds</p>
                                    <BlockMath math="\tau_{min} \leq \tau_{ij} \leq \tau_{max}" />
                                    <p className="text-xs text-gray-600 mt-2">
                                        Prevent pheromone from becoming too small (stagnation) or too large (premature convergence)
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-yellow-50 p-6 rounded-xl border-2 border-yellow-200">
                            <h3 className="text-lg font-bold text-yellow-900 mb-4">💡 Parameter Tuning Guide</h3>
                            <div className="space-y-3 text-sm text-yellow-800">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">α</div>
                                    <div>
                                        <p className="font-semibold">Pheromone Importance (α = {alpha.toFixed(1)})</p>
                                        <p className="text-xs">High α: Follow pheromone trails more (exploitation)</p>
                                        <p className="text-xs">Low α: More random exploration</p>
                                        <p className="text-xs">Typical: 1.0</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">β</div>
                                    <div>
                                        <p className="font-semibold">Heuristic Importance (β = {beta.toFixed(1)})</p>
                                        <p className="text-xs">High β: Prefer shorter edges (greedy)</p>
                                        <p className="text-xs">Low β: Ignore distance information</p>
                                        <p className="text-xs">Typical: 2.0-5.0</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">ρ</div>
                                    <div>
                                        <p className="font-semibold">Evaporation Rate (ρ = {rho.toFixed(2)})</p>
                                        <p className="text-xs">High ρ (0.7-0.9): Forget quickly, more exploration</p>
                                        <p className="text-xs">Low ρ (0.1-0.3): Remember longer, more exploitation</p>
                                        <p className="text-xs">Typical: 0.5</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Interactive Simulation */}
            <Card>
                <CardHeader>
                    <CardTitle>🐜 Interactive ACO Simulation</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 mb-6">
                        Like ants finding the shortest path to food! Ants leave pheromone trails,
                        and stronger trails attract more ants. The shortest path gets reinforced!
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-semibold mb-4">Colony Parameters</h3>

                            <div className="space-y-4 mb-6">
                                <Slider
                                    label={`Number of Ants: ${numAnts}`}
                                    value={numAnts}
                                    onChange={setNumAnts}
                                    min={10}
                                    max={50}
                                    step={5}
                                    description="Colony size"
                                />
                                <Slider
                                    label={`Pheromone Importance (α): ${alpha.toFixed(1)}`}
                                    value={alpha}
                                    onChange={setAlpha}
                                    min={0.5}
                                    max={3.0}
                                    step={0.1}
                                    description="Weight of pheromone trails"
                                />
                                <Slider
                                    label={`Heuristic Importance (β): ${beta.toFixed(1)}`}
                                    value={beta}
                                    onChange={setBeta}
                                    min={1.0}
                                    max={5.0}
                                    step={0.5}
                                    description="Weight of distance heuristic"
                                />
                                <Slider
                                    label={`Evaporation Rate (ρ): ${rho.toFixed(2)}`}
                                    value={rho}
                                    onChange={setRho}
                                    min={0.1}
                                    max={0.9}
                                    step={0.05}
                                    description="Pheromone decay rate"
                                />
                            </div>

                            <div className="flex gap-3 mb-6">
                                <Button
                                    onClick={runACO}
                                    disabled={isRunning}
                                    className="flex-1 flex items-center justify-center gap-2"
                                >
                                    <Play className="w-4 h-4" />
                                    {isRunning ? `Iteration ${iteration}` : 'Start Colony'}
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
                                <svg viewBox="0 0 10 10" className="w-full h-full">
                                    {/* Draw paths between cities */}
                                    {cities.map((city, i) =>
                                        cities.slice(i + 1).map((otherCity, j) => {
                                            const pheromone = Math.max(0.05, 0.3 - iteration * 0.005)
                                            return (
                                                <line
                                                    key={`${i}-${j}`}
                                                    x1={city.x}
                                                    y1={city.y}
                                                    x2={otherCity.x}
                                                    y2={otherCity.y}
                                                    stroke="#10b981"
                                                    strokeWidth={pheromone}
                                                    opacity={0.3 + iteration * 0.01}
                                                />
                                            )
                                        })
                                    )}

                                    {/* Draw cities */}
                                    {cities.map((city) => (
                                        <g key={city.id}>
                                            <circle cx={city.x} cy={city.y} r="0.3" fill="#ef4444" />
                                            <text x={city.x} y={city.y - 0.5} fontSize="0.5" textAnchor="middle" fill="#000" fontWeight="bold">
                                                {city.id}
                                            </text>
                                        </g>
                                    ))}
                                </svg>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-4">Path Length Evolution</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={pathData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="iteration" label={{ value: 'Iteration (t)', position: 'insideBottom', offset: -5 }} />
                                    <YAxis label={{ value: 'Path Length L', angle: -90, position: 'insideLeft' }} />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="best" stroke="#10b981" strokeWidth={2} name="Best Path" />
                                    <Line type="monotone" dataKey="average" stroke="#3b82f6" strokeWidth={2} name="Average Path" />
                                </LineChart>
                            </ResponsiveContainer>

                            <div className="mt-4 p-4 bg-green-50 rounded-lg">
                                <h4 className="font-semibold text-green-900 mb-2">Colony Status</h4>
                                <div className="text-sm text-green-700 space-y-1">
                                    <p>Iteration t: {iteration}</p>
                                    <p>Best Path Length: {bestPathLength.toFixed(2)}</p>
                                    <p>Average Path Length: {avgPathLength.toFixed(2)}</p>
                                    <p>Active Ants: {numAnts}</p>
                                    <p>Parameters: α={alpha.toFixed(1)}, β={beta.toFixed(1)}, ρ={rho.toFixed(2)}</p>
                                </div>
                            </div>

                            <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                                <h4 className="font-semibold text-purple-900 mb-2">📊 Probability Factors</h4>
                                <div className="text-xs text-purple-700 space-y-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-16 h-3 bg-blue-400 rounded"></div>
                                        <span>Pheromone [τ]^α: {(alpha / (alpha + beta) * 100).toFixed(0)}%</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-16 h-3 bg-green-400 rounded"></div>
                                        <span>Heuristic [η]^β: {(beta / (alpha + beta) * 100).toFixed(0)}%</span>
                                    </div>
                                    <p className="text-xs mt-2">
                                        Balance determines exploration vs exploitation
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>🎯 ACO Algorithm Steps</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                            <div className="text-3xl mb-2">🎲</div>
                            <h4 className="font-semibold text-blue-900 mb-2">1. Initialize</h4>
                            <p className="text-xs text-blue-700 mb-2">
                                Set initial pheromone <InlineMath math="\tau_{ij} = \tau_0" /> on all edges
                            </p>
                            <p className="text-xs text-blue-600">
                                Place m = {numAnts} ants randomly
                            </p>
                        </div>

                        <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
                            <div className="text-3xl mb-2">🚶</div>
                            <h4 className="font-semibold text-green-900 mb-2">2. Construct Solutions</h4>
                            <p className="text-xs text-green-700 mb-2">
                                Each ant builds path using <InlineMath math="p_{ij}^k" />
                            </p>
                            <p className="text-xs text-green-600">
                                Probability based on τ and η
                            </p>
                        </div>

                        <div className="p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                            <div className="text-3xl mb-2">💧</div>
                            <h4 className="font-semibold text-purple-900 mb-2">3. Update Pheromone</h4>
                            <p className="text-xs text-purple-700 mb-2">
                                Evaporate: <InlineMath math="\tau \leftarrow (1-\rho)\tau" />
                            </p>
                            <p className="text-xs text-purple-600">
                                Deposit: <InlineMath math="\tau \leftarrow \tau + \Delta\tau" />
                            </p>
                        </div>

                        <div className="p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
                            <div className="text-3xl mb-2">🔄</div>
                            <h4 className="font-semibold text-orange-900 mb-2">4. Repeat</h4>
                            <p className="text-xs text-orange-700 mb-2">
                                Continue until convergence or max iterations
                            </p>
                            <p className="text-xs text-orange-600">
                                Best path emerges!
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

function SimulatedAnnealing() {
    const [temperature, setTemperature] = useState(100)
    const [coolingRate, setCoolingRate] = useState(0.95)
    const [iteration, setIteration] = useState(0)
    const [isRunning, setIsRunning] = useState(false)

    const runSA = () => {
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

    const annealingData = Array.from({ length: Math.max(1, iteration + 1) }, (_, i) => ({
        iteration: i,
        temperature: temperature * Math.pow(coolingRate, i),
        energy: 100 * Math.exp(-i * 0.1) + Math.random() * 10 * Math.exp(-i * 0.05),
        acceptanceProbability: Math.exp(-5 / (temperature * Math.pow(coolingRate, i)))
    }))

    const currentTemp = temperature * Math.pow(coolingRate, iteration)
    const currentEnergy = annealingData[iteration]?.energy || 100

    return (
        <div className="space-y-6">
            {/* Mathematical Foundation */}
            <Card>
                <CardHeader>
                    <CardTitle>📐 Simulated Annealing Mathematics</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                            <h3 className="text-lg font-bold text-blue-900 mb-4">Core SA Equations</h3>

                            <div className="space-y-4">
                                <div className="bg-white p-4 rounded-lg">
                                    <p className="text-sm font-semibold text-gray-900 mb-2">1. Acceptance Probability (Metropolis Criterion)</p>
                                    <BlockMath math="P(\text{accept}) = \begin{cases} 1 & \text{if } \Delta E \leq 0 \\ e^{-\Delta E / T} & \text{if } \Delta E > 0 \end{cases}" />
                                    <div className="mt-3 space-y-1 text-xs text-gray-700">
                                        <p>• <InlineMath math="\Delta E = E_{new} - E_{current}" /> = energy change</p>
                                        <p>• <InlineMath math="T" /> = current temperature</p>
                                        <p>• Always accept better solutions (<InlineMath math="\Delta E \leq 0" />)</p>
                                        <p>• Sometimes accept worse solutions (<InlineMath math="\Delta E > 0" />)</p>
                                    </div>
                                    <div className="mt-3 p-3 bg-blue-50 rounded">
                                        <p className="text-xs font-semibold text-blue-900">Example:</p>
                                        <p className="text-xs text-blue-700">
                                            ΔE = 5, T = 100: P = e^(-5/100) = 0.951 (95.1% accept)<br />
                                            ΔE = 5, T = 10: P = e^(-5/10) = 0.606 (60.6% accept)<br />
                                            ΔE = 5, T = 1: P = e^(-5/1) = 0.007 (0.7% accept)
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-white p-4 rounded-lg">
                                    <p className="text-sm font-semibold text-gray-900 mb-2">2. Cooling Schedule (Geometric)</p>
                                    <BlockMath math="T_{t+1} = \alpha \cdot T_t" />
                                    <div className="mt-3 space-y-1 text-xs text-gray-700">
                                        <p>• <InlineMath math="\alpha" /> = {coolingRate.toFixed(2)} (cooling rate)</p>
                                        <p>• <InlineMath math="T_0" /> = {temperature} (initial temperature)</p>
                                        <p>• <InlineMath math="T_t" /> = {currentTemp.toFixed(2)} (current temperature at iteration {iteration})</p>
                                    </div>
                                    <div className="mt-3 p-3 bg-green-50 rounded">
                                        <p className="text-xs font-semibold text-green-900">Other Cooling Schedules:</p>
                                        <p className="text-xs text-green-700">
                                            • Linear: <InlineMath math="T_t = T_0 - \alpha t" /><br />
                                            • Logarithmic: <InlineMath math="T_t = T_0 / \log(1 + t)" /><br />
                                            • Exponential: <InlineMath math="T_t = T_0 \cdot \alpha^t" /> (used here)
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-white p-4 rounded-lg">
                                    <p className="text-sm font-semibold text-gray-900 mb-2">3. Energy Function</p>
                                    <BlockMath math="E(x) = f(x)" />
                                    <p className="text-xs text-gray-600 mt-2">
                                        Energy = objective function value. Goal: minimize E(x)
                                    </p>
                                    <div className="mt-3 p-3 bg-purple-50 rounded">
                                        <p className="text-xs font-semibold text-purple-900">Examples:</p>
                                        <p className="text-xs text-purple-700">
                                            • TSP: E = total path length<br />
                                            • Scheduling: E = total completion time<br />
                                            • Function optimization: E = f(x)
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-white p-4 rounded-lg">
                                    <p className="text-sm font-semibold text-gray-900 mb-2">4. Neighbor Generation</p>
                                    <BlockMath math="x_{new} = N(x_{current})" />
                                    <p className="text-xs text-gray-600 mt-2">
                                        Generate neighbor solution by small perturbation
                                    </p>
                                    <div className="mt-3 p-3 bg-orange-50 rounded">
                                        <p className="text-xs font-semibold text-orange-900">Examples:</p>
                                        <p className="text-xs text-orange-700">
                                            • Continuous: x_new = x + random(-δ, δ)<br />
                                            • TSP: Swap two cities<br />
                                            • Binary: Flip random bit
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-white p-4 rounded-lg">
                                    <p className="text-sm font-semibold text-gray-900 mb-2">5. Boltzmann Distribution</p>
                                    <BlockMath math="P(E) = \frac{e^{-E/T}}{\sum_i e^{-E_i/T}}" />
                                    <p className="text-xs text-gray-600 mt-2">
                                        At equilibrium, probability of state with energy E follows Boltzmann distribution
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-yellow-50 p-6 rounded-xl border-2 border-yellow-200">
                            <h3 className="text-lg font-bold text-yellow-900 mb-4">💡 Temperature Effects</h3>
                            <div className="space-y-3 text-sm text-yellow-800">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">🔥</div>
                                    <div>
                                        <p className="font-semibold">High Temperature (T ≈ {temperature})</p>
                                        <p className="text-xs">P(accept worse) ≈ 1 - Almost always accept</p>
                                        <p className="text-xs">Behavior: Random search, high exploration</p>
                                        <p className="text-xs">Purpose: Escape local minima</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">🌡️</div>
                                    <div>
                                        <p className="font-semibold">Medium Temperature (T ≈ {(temperature / 2).toFixed(0)})</p>
                                        <p className="text-xs">P(accept worse) ≈ 0.5 - Balanced acceptance</p>
                                        <p className="text-xs">Behavior: Mix of exploration and exploitation</p>
                                        <p className="text-xs">Purpose: Transition phase</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">❄️</div>
                                    <div>
                                        <p className="font-semibold">Low Temperature (T ≈ 1)</p>
                                        <p className="text-xs">P(accept worse) ≈ 0 - Rarely accept</p>
                                        <p className="text-xs">Behavior: Greedy search, exploitation</p>
                                        <p className="text-xs">Purpose: Fine-tune solution</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Interactive Simulation */}
            <Card>
                <CardHeader>
                    <CardTitle>🔥 Interactive Simulated Annealing</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 mb-6">
                        Like cooling metal to make it stronger! Start hot (accept bad moves),
                        gradually cool down (become more selective), until you reach the optimal state.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-semibold mb-4">Annealing Parameters</h3>

                            <div className="space-y-4 mb-6">
                                <Slider
                                    label={`Initial Temperature (T₀): ${temperature}`}
                                    value={temperature}
                                    onChange={setTemperature}
                                    min={50}
                                    max={200}
                                    step={10}
                                    description="Starting temperature"
                                />
                                <Slider
                                    label={`Cooling Rate (α): ${coolingRate.toFixed(2)}`}
                                    value={coolingRate}
                                    onChange={setCoolingRate}
                                    min={0.8}
                                    max={0.99}
                                    step={0.01}
                                    description="Temperature decay factor"
                                />
                            </div>

                            <div className="flex gap-3 mb-6">
                                <Button
                                    onClick={runSA}
                                    disabled={isRunning}
                                    className="flex-1 flex items-center justify-center gap-2"
                                >
                                    <Play className="w-4 h-4" />
                                    {isRunning ? `Iteration ${iteration}` : 'Start Annealing'}
                                </Button>
                                <Button
                                    onClick={() => setIteration(0)}
                                    variant="outline"
                                    className="flex items-center gap-2"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                </Button>
                            </div>

                            <div className="space-y-4">
                                <div className="p-4 bg-red-50 rounded-lg border-2 border-red-200">
                                    <h4 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
                                        🔥 High Temperature Phase
                                    </h4>
                                    <p className="text-xs text-red-700 mb-2">
                                        T &gt; {(temperature * 0.7).toFixed(0)}: Accept worse solutions with high probability
                                    </p>
                                    <p className="text-xs text-red-600">
                                        P(ΔE=5) = e^(-5/{(temperature * 0.9).toFixed(0)}) = {Math.exp(-5 / (temperature * 0.9)).toFixed(3)}
                                    </p>
                                </div>

                                <div className="p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
                                    <h4 className="font-semibold text-orange-900 mb-2 flex items-center gap-2">
                                        🌡️ Medium Temperature Phase
                                    </h4>
                                    <p className="text-xs text-orange-700 mb-2">
                                        {(temperature * 0.3).toFixed(0)} &lt; T &lt; {(temperature * 0.7).toFixed(0)}: Balanced exploration/exploitation
                                    </p>
                                    <p className="text-xs text-orange-600">
                                        P(ΔE=5) = e^(-5/{(temperature * 0.5).toFixed(0)}) = {Math.exp(-5 / (temperature * 0.5)).toFixed(3)}
                                    </p>
                                </div>

                                <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                                    <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                                        ❄️ Low Temperature Phase
                                    </h4>
                                    <p className="text-xs text-blue-700 mb-2">
                                        T &lt; {(temperature * 0.3).toFixed(0)}: Only accept better solutions
                                    </p>
                                    <p className="text-xs text-blue-600">
                                        P(ΔE=5) = e^(-5/{(temperature * 0.1).toFixed(0)}) = {Math.exp(-5 / (temperature * 0.1)).toFixed(3)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-4">Temperature & Energy Evolution</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={annealingData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="iteration" label={{ value: 'Iteration (t)', position: 'insideBottom', offset: -5 }} />
                                    <YAxis label={{ value: 'Value', angle: -90, position: 'insideLeft' }} />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="temperature" stroke="#ef4444" strokeWidth={2} name="Temperature T" />
                                    <Line type="monotone" dataKey="energy" stroke="#3b82f6" strokeWidth={2} name="Energy E" />
                                </LineChart>
                            </ResponsiveContainer>

                            <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                                <h4 className="font-semibold text-purple-900 mb-2">Current State</h4>
                                <div className="text-sm text-purple-700 space-y-1">
                                    <p>Iteration t: {iteration}</p>
                                    <p>Temperature T: {currentTemp.toFixed(2)}</p>
                                    <p>Energy E: {currentEnergy.toFixed(2)}</p>
                                    <p>Cooling Rate α: {coolingRate.toFixed(2)}</p>
                                    <p>Accept Prob (ΔE=5): {annealingData[iteration]?.acceptanceProbability.toFixed(3) || 1}</p>
                                </div>
                            </div>

                            <div className="mt-4 p-4 bg-green-50 rounded-lg">
                                <h4 className="font-semibold text-green-900 mb-2">📊 Acceptance Probability</h4>
                                <div className="text-xs text-green-700">
                                    <p className="mb-2">For ΔE = 5 at different temperatures:</p>
                                    <div className="space-y-1 font-mono">
                                        <p>T = 100: P = {Math.exp(-5 / 100).toFixed(3)} (95.1%)</p>
                                        <p>T = 50: P = {Math.exp(-5 / 50).toFixed(3)} (90.5%)</p>
                                        <p>T = 10: P = {Math.exp(-5 / 10).toFixed(3)} (60.7%)</p>
                                        <p>T = 1: P = {Math.exp(-5 / 1).toFixed(3)} (0.7%)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>🎯 SA Algorithm Steps</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                            <div className="text-3xl mb-2">🎲</div>
                            <h4 className="font-semibold text-blue-900 mb-2">1. Initialize</h4>
                            <p className="text-xs text-blue-700 mb-2">
                                Random solution x, set T = T₀ = {temperature}
                            </p>
                            <p className="text-xs text-blue-600">
                                Calculate E(x)
                            </p>
                        </div>

                        <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
                            <div className="text-3xl mb-2">🔄</div>
                            <h4 className="font-semibold text-green-900 mb-2">2. Generate Neighbor</h4>
                            <p className="text-xs text-green-700 mb-2">
                                x_new = N(x), calculate ΔE = E(x_new) - E(x)
                            </p>
                        </div>

                        <div className="p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                            <div className="text-3xl mb-2">✅</div>
                            <h4 className="font-semibold text-purple-900 mb-2">3. Accept/Reject</h4>
                            <p className="text-xs text-purple-700 mb-2">
                                If ΔE ≤ 0 or rand() &lt; e^(-ΔE/T): accept x_new
                            </p>
                        </div>

                        <div className="p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
                            <div className="text-3xl mb-2">❄️</div>
                            <h4 className="font-semibold text-orange-900 mb-2">4. Cool Down</h4>
                            <p className="text-xs text-orange-700 mb-2">
                                T = α × T = {coolingRate.toFixed(2)} × T
                            </p>
                            <p className="text-xs text-orange-600">
                                Repeat 2-4
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
