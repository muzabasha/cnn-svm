'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { Play, RotateCcw } from 'lucide-react'
import { LineChart, Line, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

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
            <Card>
                <CardHeader>
                    <CardTitle>🧬 Genetic Algorithm: Evolution in Action</CardTitle>
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
                                />
                                <Slider
                                    label={`Mutation Rate: ${(mutationRate * 100).toFixed(0)}%`}
                                    value={mutationRate}
                                    onChange={setMutationRate}
                                    min={0.01}
                                    max={0.5}
                                    step={0.01}
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
                                    className="flex items-center gap-2"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                </Button>
                            </div>

                            <div className="bg-green-50 rounded-lg p-4">
                                <h4 className="font-semibold text-green-900 mb-3">Top 10 Individuals</h4>
                                <div className="space-y-2">
                                    {population.map((ind) => (
                                        <div key={ind.id} className="flex items-center justify-between p-2 bg-white rounded">
                                            <span className="text-xs font-mono">{ind.genes}</span>
                                            <span className="text-sm font-semibold text-green-600">
                                                {ind.fitness.toFixed(1)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-4">Fitness Evolution</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={fitnessData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="generation" />
                                    <YAxis />
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
                                    <p>Average Fitness: {fitnessData[generation]?.average.toFixed(2) || 0}</p>
                                    <p>Population: {populationSize} individuals</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>How Genetic Algorithms Work</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <div className="text-3xl mb-2">🎲</div>
                            <h4 className="font-semibold text-blue-900 mb-2">1. Initialize</h4>
                            <p className="text-xs text-blue-700">
                                Create random population of solutions (like random recipes)
                            </p>
                        </div>

                        <div className="p-4 bg-green-50 rounded-lg">
                            <div className="text-3xl mb-2">⭐</div>
                            <h4 className="font-semibold text-green-900 mb-2">2. Selection</h4>
                            <p className="text-xs text-green-700">
                                Choose best individuals to be parents (survival of the fittest)
                            </p>
                        </div>

                        <div className="p-4 bg-purple-50 rounded-lg">
                            <div className="text-3xl mb-2">🔀</div>
                            <h4 className="font-semibold text-purple-900 mb-2">3. Crossover</h4>
                            <p className="text-xs text-purple-700">
                                Combine parents to create offspring (mix recipes)
                            </p>
                        </div>

                        <div className="p-4 bg-orange-50 rounded-lg">
                            <div className="text-3xl mb-2">⚡</div>
                            <h4 className="font-semibold text-orange-900 mb-2">4. Mutation</h4>
                            <p className="text-xs text-orange-700">
                                Random small changes (add a pinch of innovation)
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
            <Card>
                <CardHeader>
                    <CardTitle>🐝 Particle Swarm Optimization: Follow the Leader</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 mb-6">
                        Like bees finding the best flowers! Each bee (particle) remembers the best spot it found,
                        and also follows the swarm toward the best spot anyone found.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-semibold mb-4">Swarm Parameters</h3>

                            <div className="mb-6">
                                <Slider
                                    label={`Number of Particles: ${numParticles}`}
                                    value={numParticles}
                                    onChange={setNumParticles}
                                    min={10}
                                    max={50}
                                    step={5}
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
                                    className="flex items-center gap-2"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                </Button>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-6 h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <ScatterChart>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="x" domain={[-6, 6]} />
                                        <YAxis dataKey="y" domain={[-6, 6]} />
                                        <Tooltip />
                                        <Scatter name="Particles" data={particles} fill="#10b981" />
                                        <Scatter name="Target" data={[{ x: 0, y: 0 }]} fill="#ef4444" shape="star" />
                                    </ScatterChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-4">Convergence Progress</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={convergenceData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="iteration" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="globalBest" stroke="#10b981" strokeWidth={2} name="Global Best" />
                                    <Line type="monotone" dataKey="averageFitness" stroke="#3b82f6" strokeWidth={2} name="Average" />
                                </LineChart>
                            </ResponsiveContainer>

                            <div className="mt-4 p-4 bg-green-50 rounded-lg">
                                <h4 className="font-semibold text-green-900 mb-2">Swarm Status</h4>
                                <div className="text-sm text-green-700 space-y-1">
                                    <p>Iteration: {iteration}</p>
                                    <p>Global Best: {convergenceData[iteration]?.globalBest.toFixed(2) || 0}</p>
                                    <p>Active Particles: {numParticles}</p>
                                    <p>Convergence: {Math.min(100, iteration * 2).toFixed(0)}%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>PSO Principles</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <div className="text-2xl mb-2">🎯</div>
                            <h4 className="font-semibold text-blue-900 mb-2">Personal Best</h4>
                            <p className="text-xs text-blue-700">
                                Each particle remembers its own best position found so far
                            </p>
                        </div>

                        <div className="p-4 bg-green-50 rounded-lg">
                            <div className="text-2xl mb-2">👑</div>
                            <h4 className="font-semibold text-green-900 mb-2">Global Best</h4>
                            <p className="text-xs text-green-700">
                                The swarm shares the best position found by any particle
                            </p>
                        </div>

                        <div className="p-4 bg-purple-50 rounded-lg">
                            <div className="text-2xl mb-2">🚀</div>
                            <h4 className="font-semibold text-purple-900 mb-2">Velocity Update</h4>
                            <p className="text-xs text-purple-700">
                                Particles move based on personal best, global best, and inertia
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

    const cities = [
        { id: 'A', x: 2, y: 3 },
        { id: 'B', x: 5, y: 1 },
        { id: 'C', x: 7, y: 4 },
        { id: 'D', x: 4, y: 6 },
        { id: 'E', x: 1, y: 5 }
    ]

    return (
        <Card>
            <CardHeader>
                <CardTitle>🐜 Ant Colony Optimization: Following Pheromone Trails</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-gray-600 mb-6">
                    Like ants finding the shortest path to food! Ants leave pheromone trails,
                    and stronger trails attract more ants. The shortest path gets reinforced!
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                        <h3 className="font-semibold mb-4">Colony Parameters</h3>
                        <Slider
                            label={`Number of Ants: ${numAnts}`}
                            value={numAnts}
                            onChange={setNumAnts}
                            min={10}
                            max={50}
                            step={5}
                        />

                        <div className="mt-6 bg-gray-50 rounded-lg p-6 h-80">
                            <svg viewBox="0 0 10 10" className="w-full h-full">
                                {/* Draw paths between cities */}
                                {cities.map((city, i) =>
                                    cities.slice(i + 1).map((otherCity, j) => (
                                        <line
                                            key={`${i}-${j}`}
                                            x1={city.x}
                                            y1={city.y}
                                            x2={otherCity.x}
                                            y2={otherCity.y}
                                            stroke="#ddd"
                                            strokeWidth="0.05"
                                        />
                                    ))
                                )}

                                {/* Draw cities */}
                                {cities.map((city) => (
                                    <g key={city.id}>
                                        <circle cx={city.x} cy={city.y} r="0.3" fill="#10b981" />
                                        <text x={city.x} y={city.y - 0.5} fontSize="0.5" textAnchor="middle" fill="#000">
                                            {city.id}
                                        </text>
                                    </g>
                                ))}
                            </svg>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">How ACO Works</h3>
                        <div className="space-y-4">
                            <div className="p-4 bg-blue-50 rounded-lg">
                                <h4 className="font-semibold text-blue-900 mb-2">1. Ants Explore</h4>
                                <p className="text-xs text-blue-700">
                                    Each ant randomly constructs a solution (path through cities)
                                </p>
                            </div>

                            <div className="p-4 bg-green-50 rounded-lg">
                                <h4 className="font-semibold text-green-900 mb-2">2. Deposit Pheromones</h4>
                                <p className="text-xs text-green-700">
                                    Shorter paths get more pheromone (inversely proportional to distance)
                                </p>
                            </div>

                            <div className="p-4 bg-purple-50 rounded-lg">
                                <h4 className="font-semibold text-purple-900 mb-2">3. Evaporation</h4>
                                <p className="text-xs text-purple-700">
                                    Pheromones evaporate over time, preventing premature convergence
                                </p>
                            </div>

                            <div className="p-4 bg-orange-50 rounded-lg">
                                <h4 className="font-semibold text-orange-900 mb-2">4. Repeat</h4>
                                <p className="text-xs text-orange-700">
                                    New ants prefer paths with more pheromone, reinforcing good solutions
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

function SimulatedAnnealing() {
    const [temperature, setTemperature] = useState(100)
    const [coolingRate, setCoolingRate] = useState(0.95)

    const annealingData = Array.from({ length: 50 }, (_, i) => ({
        iteration: i,
        temperature: temperature * Math.pow(coolingRate, i),
        energy: 100 * Math.exp(-i * 0.1) + Math.random() * 10 * Math.exp(-i * 0.05)
    }))

    return (
        <Card>
            <CardHeader>
                <CardTitle>🔥 Simulated Annealing: Cooling to Perfection</CardTitle>
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
                                label={`Initial Temperature: ${temperature}`}
                                value={temperature}
                                onChange={setTemperature}
                                min={50}
                                max={200}
                                step={10}
                            />
                            <Slider
                                label={`Cooling Rate: ${coolingRate.toFixed(2)}`}
                                value={coolingRate}
                                onChange={setCoolingRate}
                                min={0.8}
                                max={0.99}
                                step={0.01}
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="p-4 bg-red-50 rounded-lg">
                                <h4 className="font-semibold text-red-900 mb-2">🔥 High Temperature</h4>
                                <p className="text-xs text-red-700">
                                    Accept worse solutions with high probability. Explore widely!
                                </p>
                            </div>

                            <div className="p-4 bg-orange-50 rounded-lg">
                                <h4 className="font-semibold text-orange-900 mb-2">🌡️ Medium Temperature</h4>
                                <p className="text-xs text-orange-700">
                                    Balance between exploration and exploitation
                                </p>
                            </div>

                            <div className="p-4 bg-blue-50 rounded-lg">
                                <h4 className="font-semibold text-blue-900 mb-2">❄️ Low Temperature</h4>
                                <p className="text-xs text-blue-700">
                                    Only accept better solutions. Fine-tune the result!
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Temperature & Energy Over Time</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={annealingData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="iteration" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="temperature" stroke="#ef4444" strokeWidth={2} name="Temperature" />
                                <Line type="monotone" dataKey="energy" stroke="#3b82f6" strokeWidth={2} name="Energy" />
                            </LineChart>
                        </ResponsiveContainer>

                        <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                            <h4 className="font-semibold text-purple-900 mb-2">Acceptance Probability</h4>
                            <p className="text-sm text-purple-700 mb-2">
                                P(accept worse) = e^(-ΔE / T)
                            </p>
                            <p className="text-xs text-purple-600">
                                Where ΔE is energy increase and T is temperature.
                                Higher T = more likely to accept worse solutions.
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
