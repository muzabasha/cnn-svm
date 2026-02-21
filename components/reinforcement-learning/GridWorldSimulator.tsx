'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Play, RotateCcw, Trophy, Skull, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react'

type CellType = 'empty' | 'agent' | 'goal' | 'obstacle' | 'pit'

export function GridWorldSimulator() {
    const gridSize = 5
    const [agentPos, setAgentPos] = useState({ x: 0, y: 0 })
    const [goalPos] = useState({ x: 4, y: 4 })
    const [obstacles] = useState([
        { x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 1 }
    ])
    const [pits] = useState([
        { x: 1, y: 3 }, { x: 3, y: 3 }
    ])
    const [score, setScore] = useState(0)
    const [moves, setMoves] = useState(0)
    const [gameOver, setGameOver] = useState(false)
    const [message, setMessage] = useState('')
    const [autoPlay, setAutoPlay] = useState(false)

    const getCellType = (x: number, y: number): CellType => {
        if (agentPos.x === x && agentPos.y === y) return 'agent'
        if (goalPos.x === x && goalPos.y === y) return 'goal'
        if (obstacles.some(o => o.x === x && o.y === y)) return 'obstacle'
        if (pits.some(p => p.x === x && p.y === y)) return 'pit'
        return 'empty'
    }

    const getCellStyle = (type: CellType) => {
        switch (type) {
            case 'agent':
                return 'bg-blue-500 text-white'
            case 'goal':
                return 'bg-green-500 text-white'
            case 'obstacle':
                return 'bg-gray-700'
            case 'pit':
                return 'bg-red-500 text-white'
            default:
                return 'bg-gray-100 hover:bg-gray-200'
        }
    }

    const getCellIcon = (type: CellType) => {
        switch (type) {
            case 'agent':
                return '🤖'
            case 'goal':
                return <Trophy className="w-6 h-6" />
            case 'pit':
                return <Skull className="w-6 h-6" />
            default:
                return null
        }
    }

    const moveAgent = useCallback((dx: number, dy: number) => {
        if (gameOver) return

        const newX = agentPos.x + dx
        const newY = agentPos.y + dy

        // Check boundaries
        if (newX < 0 || newX >= gridSize || newY < 0 || newY >= gridSize) {
            setMessage('Hit wall! -1 point')
            setScore(prev => prev - 1)
            return
        }

        // Check obstacles
        if (obstacles.some(o => o.x === newX && o.y === newY)) {
            setMessage('Hit obstacle! -1 point')
            setScore(prev => prev - 1)
            return
        }

        // Move agent
        setAgentPos({ x: newX, y: newY })
        setMoves(prev => prev + 1)
        setScore(prev => prev - 0.1) // Small penalty for each move

        // Check pits
        if (pits.some(p => p.x === newX && p.y === newY)) {
            setMessage('Fell in pit! Game Over! -10 points')
            setScore(prev => prev - 10)
            setGameOver(true)
            return
        }

        // Check goal
        if (newX === goalPos.x && newY === goalPos.y) {
            setMessage('🎉 Reached goal! +100 points!')
            setScore(prev => prev + 100)
            setGameOver(true)
            return
        }

        setMessage(`Moved to (${newX}, ${newY})`)
    }, [agentPos, gameOver, goalPos, obstacles, pits])

    const reset = () => {
        setAgentPos({ x: 0, y: 0 })
        setScore(0)
        setMoves(0)
        setGameOver(false)
        setMessage('')
        setAutoPlay(false)
    }

    // Simple AI: move towards goal
    const aiMove = useCallback(() => {
        const dx = goalPos.x - agentPos.x
        const dy = goalPos.y - agentPos.y

        if (Math.abs(dx) > Math.abs(dy)) {
            moveAgent(dx > 0 ? 1 : -1, 0)
        } else {
            moveAgent(0, dy > 0 ? 1 : -1)
        }
    }, [agentPos, goalPos, moveAgent])

    useEffect(() => {
        if (autoPlay && !gameOver) {
            const timer = setTimeout(aiMove, 500)
            return () => clearTimeout(timer)
        }
    }, [autoPlay, gameOver, aiMove])

    return (
        <div className="space-y-4 sm:space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">🗺️ GridWorld Environment</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm sm:text-base text-gray-600 mb-6">
                        A classic RL environment where an agent navigates a grid to reach a goal while
                        avoiding obstacles and pits. Each action has consequences!
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <div className="bg-white p-4 rounded-xl border-2 border-gray-200 mb-4">
                                <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
                                    {Array.from({ length: gridSize }).map((_, y) =>
                                        Array.from({ length: gridSize }).map((_, x) => {
                                            const cellType = getCellType(x, y)
                                            return (
                                                <div
                                                    key={`${x}-${y}`}
                                                    className={`aspect-square flex items-center justify-center rounded-lg border-2 transition-all ${getCellStyle(cellType)}`}
                                                >
                                                    {getCellIcon(cellType)}
                                                </div>
                                            )
                                        })
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
                                <div></div>
                                <Button
                                    onClick={() => moveAgent(0, -1)}
                                    disabled={gameOver}
                                    variant="outline"
                                >
                                    <ArrowUp className="w-5 h-5" />
                                </Button>
                                <div></div>
                                <Button
                                    onClick={() => moveAgent(-1, 0)}
                                    disabled={gameOver}
                                    variant="outline"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                </Button>
                                <Button
                                    onClick={() => moveAgent(0, 1)}
                                    disabled={gameOver}
                                    variant="outline"
                                >
                                    <ArrowDown className="w-5 h-5" />
                                </Button>
                                <Button
                                    onClick={() => moveAgent(1, 0)}
                                    disabled={gameOver}
                                    variant="outline"
                                >
                                    <ArrowRight className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
                                <h3 className="font-semibold text-purple-900 mb-3">Game Stats</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Score:</span>
                                        <span className="font-bold text-purple-900">{score.toFixed(1)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Moves:</span>
                                        <span className="font-bold text-purple-900">{moves}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Position:</span>
                                        <span className="font-bold text-purple-900">
                                            ({agentPos.x}, {agentPos.y})
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {message && (
                                <div className={`p-4 rounded-xl border-2 ${message.includes('goal') ? 'bg-green-50 border-green-200' :
                                    message.includes('pit') ? 'bg-red-50 border-red-200' :
                                        'bg-yellow-50 border-yellow-200'
                                    }`}>
                                    <p className="text-sm font-semibold">{message}</p>
                                </div>
                            )}

                            <div className="space-y-2">
                                <Button
                                    onClick={() => setAutoPlay(!autoPlay)}
                                    disabled={gameOver}
                                    className="w-full"
                                    variant={autoPlay ? "secondary" : "default"}
                                >
                                    {autoPlay ? 'Stop' : <><Play className="w-4 h-4 mr-2" />Auto Play</>}
                                </Button>
                                <Button onClick={reset} variant="outline" className="w-full">
                                    <RotateCcw className="w-4 h-4 mr-2" />
                                    Reset
                                </Button>
                            </div>

                            <div className="p-4 bg-blue-50 rounded-xl">
                                <h4 className="font-semibold text-blue-900 mb-2">Legend</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 bg-blue-500 rounded"></div>
                                        <span>Agent (you)</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 bg-green-500 rounded"></div>
                                        <span>Goal (+100)</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 bg-gray-700 rounded"></div>
                                        <span>Obstacle (-1)</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 bg-red-500 rounded"></div>
                                        <span>Pit (-10)</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 bg-purple-50 rounded-xl">
                                <h4 className="font-semibold text-purple-900 mb-2">Rewards</h4>
                                <div className="space-y-1 text-sm text-purple-700">
                                    <p>• Each move: -0.1</p>
                                    <p>• Hit wall/obstacle: -1</p>
                                    <p>• Fall in pit: -10 (game over)</p>
                                    <p>• Reach goal: +100 (win!)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">🎓 Learning Objectives</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <h4 className="font-semibold text-blue-900 mb-2">State Space</h4>
                            <p className="text-sm text-blue-700">
                                Each grid position is a state. The agent must learn the value of being in each state.
                            </p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg">
                            <h4 className="font-semibold text-green-900 mb-2">Action Space</h4>
                            <p className="text-sm text-green-700">
                                Four possible actions: up, down, left, right. Not all actions are valid in all states.
                            </p>
                        </div>
                        <div className="p-4 bg-purple-50 rounded-lg">
                            <h4 className="font-semibold text-purple-900 mb-2">Reward Shaping</h4>
                            <p className="text-sm text-purple-700">
                                Small negative rewards encourage efficient paths. Large rewards/penalties for terminal states.
                            </p>
                        </div>
                        <div className="p-4 bg-pink-50 rounded-lg">
                            <h4 className="font-semibold text-pink-900 mb-2">Policy Learning</h4>
                            <p className="text-sm text-pink-700">
                                The agent learns which action to take in each state to maximize cumulative reward.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
