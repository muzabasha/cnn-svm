'use client'

import { useState } from 'react'
import { RLTaskSelector } from '@/components/reinforcement-learning/RLTaskSelector'
import { RLBasics } from '@/components/reinforcement-learning/RLBasics'
import { QLearning } from '@/components/reinforcement-learning/QLearning'
import { PolicyGradient } from '@/components/reinforcement-learning/PolicyGradient'
import { ExplorationExploitation } from '@/components/reinforcement-learning/ExplorationExploitation'
import { GridWorldSimulator } from '@/components/reinforcement-learning/GridWorldSimulator'

export default function ReinforcementLearningPage() {
    const [selectedTask, setSelectedTask] = useState('basics')

    const renderTask = () => {
        switch (selectedTask) {
            case 'basics':
                return <RLBasics />
            case 'qlearning':
                return <QLearning />
            case 'policy':
                return <PolicyGradient />
            case 'exploration':
                return <ExplorationExploitation />
            case 'gridworld':
                return <GridWorldSimulator />
            default:
                return <RLBasics />
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-6 sm:mb-8">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
                        🎮 Reinforcement Learning Virtual Lab
                    </h1>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                        Master RL through interactive simulations and hands-on experiments
                    </p>
                </div>

                <RLTaskSelector
                    selectedTask={selectedTask}
                    onSelectTask={setSelectedTask}
                />

                <div className="mt-6 sm:mt-8">
                    {renderTask()}
                </div>
            </div>
        </div>
    )

}
