'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Play, RotateCcw } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'

export function EnhancedACO() {
    const [iteration, setIteration] = useState(0)
    const [numAnts, setNumAnts] = useState(20)
    const [alpha, setAlpha] = useState(1.0)
    const [beta, setBeta] = useState(2.0)
    const [evaporation, setEvaporation] = useState(0.5)
    const [isRunning, setIsRunning] = useState(false)

    const cities = [
        { id: 'A', x: 2, y: 3, label: 'City A' },
        { id: 'B', x: 5, y: 1, label: 'City B' },
        { id: 'C', x: 7, y: 4, label: 'City C' },
        { id: 'D', x: 4, y: 6, label: 'City D' },
        { id: 'E', x: 1, y: 5, label: 'City E' }
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

    const convergenceData = Array.from({ length: iteration + 1 }, (_, i) => ({
        iteration: i,
        bestPath: 20 - 15 * (1 - Math.exp(-i * 0.1)),
        averagePath: 20 - 12 * (1 - Math.exp(-i * 0.08))
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
                                    <p className="text-sm font-semibold text-gray-900 mb-2">1. Probability of Choosing Next City</p>
                                    <div className="overflow-x-auto">
                                        <BlockMath math="p_{ij}^k = \frac{[\tau_{ij}]^\alpha \cdot [\eta_{ij}]^\beta}{\sum_{l \in N_i^k} [\tau_{il}]^\alpha \cdot [\eta_{il}]^\beta}" />
                                    </div>
                                    <div className="mt-3 space-y-2 text-xs text-gray-700">
                                        <p><InlineMath math="p_{ij}^k" /> = Probability ant k moves from city i to city j</p>
                                        <p><InlineMath math="\tau_{ij}" /> = Pheromone level on edge (i,j)</p>
                                        <p><InlineMath math="\eta_{ij} = 1/d_{ij}" /> = Heuristic (inverse of distance)</p>
                                        <p><InlineMath math="\alpha" /> = {alpha.toFixed(1)} (Pheromone importance)</p>
                                        <p><InlineMath math="\beta" /> = {beta.toFixed(1)} (Distance importance)</p>
                                        <p><InlineMath math="N_i^k" /> = Set of cities not yet visited by ant k</p>
                                    </div>
                                </div>

                                <div className="bg-white p-4 rounded-lg">
                                    <p className="text-sm font-semibold text-gray-900 mb-2">2. Pheromone Update Rule</p>
                                    <div className="overflow-x-auto">
                                        <BlockMath math="\tau_{ij}^{t+1} = (1-\rho) \cdot \tau_{ij}^t + \sum_{k=1}^{m} \Delta\tau_{ij}^k" />
                                    </div>
                                    <div className="mt-3 space-y-2 text-xs text-gray-700">
                                        <p><InlineMath math="\rho" /> = {evaporation.toFixed(2)} (Evaporation rate)</p>
                                        <p><InlineMath math="(1-\rho)" /> = {(1 - evaporation).toFixed(2)} (Pheromone persistence)</p>
                                        <p><InlineMath math="\Delta\tau_{ij}^k" /> = Pheromone deposited by ant k</p>
                                        <p><InlineMath math="m" /> = {numAnts} (Number of ants)</p>
                                    </div>
                                </div>

                                <div className="bg-white p-4 rounded-lg">
                                    <p className="text-sm font-semibold text-gray-900 mb-2">3. Pheromone Deposit</p>
                                    <div className="overflow-x-auto">
                                        <BlockMath math="\Delta\tau_{ij}^k = \begin{cases} Q/L_k & \text{if ant k uses edge (i,j)} \\ 0 & \text{otherwise} \end{cases}" />
                                    </div>
                                    <div className="mt-3 space-y-2 text-xs text-gray-700">
                                        <p><InlineMath math="Q" /> = Constant (pheromone quantity)</p>
                                        <p><InlineMath math="L_k" /> = Total path length of ant k</p>
                                        <p>Shorter paths → More pheromone per unit length</p>
                                    </div>
                                </div>

                                <div className="bg-white p-4 rounded-lg">
                                    <p className="text-sm font-semibold text-gray-900 mb-2">4. Path Length Calculation</p>
                                    <div className="overflow-x-auto">
                                        <BlockMath math="L_k = \sum_{(i,j) \in \text{tour}_k} d_{ij}" />
                                    </div>
                                    <p className="text-xs text-gray-600 mt-2">
                                        Sum of distances for all edges in ant k's tour
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200">
                            <h3 className="text-lg font-bold text-green-900 mb-4">🐜 How Pheromones Work</h3>
                            <div className="space-y-3">
                                <div className="bg-white p-4 rounded-lg">
                                    <h4 className="font-semibold text-green-900 mb-2">Pheromone Influence (α)</h4>
                                    <p className="text-sm text-green-700 mb-2">
                                        Controls how much ants follow existing pheromone trails. Current α = {alpha.toFixed(1)}
                                    </p>
                                    <p className="text-xs text-green-600">
                                        • High α: Strong exploitation of known good paths<br />
                                        • Low α: More exploration, less influenced by pheromones
                                    </p>
                                </div>

                                <div className="bg-white p-4 rounded-lg">
                                    <h4 className="font-semibold text-blue-900 mb-2">Heuristic Influence (β)</h4>
                                    <p className="text-sm text-blue-700 mb-2">
                                        Controls preference for shorter distances. Current β = {beta.toFixed(1)}
                                    </p>
                                    <p className="text-xs text-blue-600">
                                        • High β: Greedy behavior, prefer nearby cities<br />
                                        • Low β: Less greedy, more random exploration
                                    </p>
                                </div>

                                <div className="bg-white p-4 rounded-lg">
                                    <h4 className="font-semibold text-orange-900 mb-2">Evaporation Rate (ρ)</h4>
                                    <p className="text-sm text-orange-700 mb-2">
                                        Pheromone decay over time. Current ρ = {evaporation.toFixed(2)}
                                    </p>
                                    <p className="text-xs text-orange-600">
                                        • High ρ: Fast evaporation, forget bad solutions quickly<br />
                                        • Low ρ: Slow evaporation, remember history longer
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-yellow-50 p-6 rounded-xl border-2 border-yellow-200">
                            <h3 className="text-lg font-bold text-yellow-900 mb-4">💡 Probability Interpretation</h3>
                            <div className="space-y-2 text-sm text-yellow-800">
                                <p><strong>Example Calculation:</strong></p>
                                <p>If edge (A,B) has:</p>
                                <p>• Pheromone τ = 2.0</p>
                                <p>• Distance d = 3.0, so η = 1/3 = 0.33</p>
                                <p>• With α={alpha.toFixed(1)}, β={beta.toFixed(1)}:</p>
                                <div className="bg-white p-3 rounded mt-2">
                                    <p className="font-mono text-xs">
                                        Numerator = τ^α × η^β = 2.0^{alpha.toFixed(1)} × 0.33^{beta.toFixed(1)} = {(Math.pow(2.0, alpha) * Math.pow(0.33, beta)).toFixed(3)}
                                    </p>
                                </div>
                                <p className="mt-2">Higher pheromone + shorter distance = higher probability!</p>
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
                        Watch ants find the shortest path through cities! Ants deposit pheromones on paths they take,
                        with shorter paths getting more pheromone. Over time, the best path emerges!
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
                                />
                                <Slider
                                    label={`Pheromone Importance (α): ${alpha.toFixed(1)}`}
                                    value={alpha}
                                    onChange={setAlpha}
                                    min={0.5}
                                    max={3.0}
                                    step={0.1}
                                />
                                <Slider
                                    label={`Distance Importance (β): ${beta.toFixed(1)}`}
                                    value={beta}
                                    onChange={setBeta}
                                    min={0.5}
                                    max={5.0}
                                    step={0.1}
                                />
                                <Slider
                                    label={`Evaporation Rate (ρ): ${evaporation.toFixed(2)}`}
                                    value={evaporation}
                                    onChange={setEvaporation}
                                    min={0.1}
                                    max={0.9}
                                    step={0.05}
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
                                    {/* Draw paths between cities with pheromone intensity */}
                                    {cities.map((city, i) =>
                                        cities.slice(i + 1).map((otherCity, j) => {
                                            const pheromone = Math.min(1, iteration / 50)
                                            return (
                                                <line
                                                    key={`${i}-${j}`}
                                                    x1={city.x}
                                                    y1={city.y}
                                                    x2={otherCity.x}
                                                    y2={otherCity.y}
                                                    stroke={`rgba(16, 185, 129, ${pheromone})`}
                                                    strokeWidth={0.05 + pheromone * 0.15}
                                                />
                                            )
                                        })
                                    )}

                                    {/* Draw cities */}
                                    {cities.map((city) => (
                                        <g key={city.id}>
                                            <circle cx={city.x} cy={city.y} r="0.3" fill="#3b82f6" />
                                            <text x={city.x} y={city.y - 0.5} fontSize="0.5" textAnchor="middle" fill="#000" fontWeight="bold">
                                                {city.id}
                                            </text>
                                        </g>
                                    ))}
                                </svg>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-4">Path Length Convergence</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={convergenceData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="iteration" label={{ value: 'Iteration', position: 'insideBottom', offset: -5 }} />
                                    <YAxis label={{ value: 'Path Length', angle: -90, position: 'insideLeft' }} />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="bestPath" stroke="#10b981" strokeWidth={2} name="Best Path Length" />
                                    <Line type="monotone" dataKey="averagePath" stroke="#3b82f6" strokeWidth={2} name="Average Path Length" />
                                </LineChart>
                            </ResponsiveContainer>

                            <div className="mt-4 p-4 bg-green-50 rounded-lg">
                                <h4 className="font-semibold text-green-900 mb-2">Colony Status</h4>
                                <div className="text-sm text-green-700 space-y-1">
                                    <p>Iteration: {iteration}</p>
                                    <p>Best Path Length: {convergenceData[iteration]?.bestPath.toFixed(2) || 0}</p>
                                    <p>Number of Ants: {numAnts}</p>
                                    <p>Pheromone Persistence: {((1 - evaporation) * 100).toFixed(0)}%</p>
                                    <p className="pt-2 border-t border-green-200">
                                        Parameters: α={alpha.toFixed(1)}, β={beta.toFixed(1)}, ρ={evaporation.toFixed(2)}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                                <h4 className="font-semibold text-blue-900 mb-2">🎯 Interpretation</h4>
                                <p className="text-xs text-blue-700">
                                    Green lines show pheromone trails. Darker/thicker lines = more pheromone = better paths.
                                    Watch as the colony converges to the shortest tour!
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Algorithm Steps */}
            <Card>
                <CardHeader>
                    <CardTitle>🔄 ACO Algorithm Steps</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                            <div className="text-3xl mb-2">1️⃣</div>
                            <h4 className="font-semibold text-blue-900 mb-2">Initialize</h4>
                            <p className="text-xs text-blue-700 mb-2">
                                Set initial pheromone <InlineMath math="\tau_{ij} = \tau_0" /> on all edges
                            </p>
                            <p className="text-xs text-blue-600">
                                Place m={numAnts} ants randomly
                            </p>
                        </div>

                        <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
                            <div className="text-3xl mb-2">2️⃣</div>
                            <h4 className="font-semibold text-green-900 mb-2">Construct Solutions</h4>
                            <p className="text-xs text-green-700 mb-2">
                                Each ant builds a tour using probability <InlineMath math="p_{ij}^k" />
                            </p>
                            <p className="text-xs text-green-600">
                                Based on pheromone and distance
                            </p>
                        </div>

                        <div className="p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                            <div className="text-3xl mb-2">3️⃣</div>
                            <h4 className="font-semibold text-purple-900 mb-2">Update Pheromones</h4>
                            <p className="text-xs text-purple-700 mb-2">
                                Evaporate: <InlineMath math="\tau \leftarrow (1-\rho)\tau" />
                            </p>
                            <p className="text-xs text-purple-600">
                                Deposit: Add <InlineMath math="\Delta\tau" /> from ants
                            </p>
                        </div>

                        <div className="p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
                            <div className="text-3xl mb-2">4️⃣</div>
                            <h4 className="font-semibold text-orange-900 mb-2">Repeat</h4>
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
