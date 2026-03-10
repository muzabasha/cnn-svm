'use client'

import { Card } from '@/components/ui/card'

interface Task {
    id: string
    title: string
    description: string
    icon: string
}

const tasks: Task[] = [
    {
        id: 'training',
        title: '🌟 Enhanced Training',
        description: 'Full hyperparameter control & visualization',
        icon: '⚡'
    },
    {
        id: 'basics',
        title: 'RL Basics',
        description: 'Core concepts and terminology',
        icon: '🎮'
    },
    {
        id: 'qlearning',
        title: 'Q-Learning',
        description: 'Value-based learning algorithm',
        icon: '🧠'
    },
    {
        id: 'policy',
        title: 'Policy Gradient',
        description: 'Direct policy optimization',
        icon: '🎯'
    },
    {
        id: 'exploration',
        title: 'Exploration vs Exploitation',
        description: 'Balancing learning strategies',
        icon: '🔍'
    },
    {
        id: 'gridworld',
        title: 'GridWorld Simulator',
        description: 'Interactive environment',
        icon: '🗺️'
    }
]

interface RLTaskSelectorProps {
    selectedTask: string
    onSelectTask: (taskId: string) => void
}

export function RLTaskSelector({ selectedTask, onSelectTask }: RLTaskSelectorProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {tasks.map((task) => (
                <Card
                    key={task.id}
                    className={`p-4 sm:p-6 cursor-pointer transition-all hover:shadow-lg active:scale-98 ${selectedTask === task.id
                        ? 'ring-2 ring-purple-500 bg-purple-50'
                        : task.id === 'training'
                            ? 'bg-gradient-to-r from-yellow-50 to-orange-50 hover:from-yellow-100 hover:to-orange-100'
                            : 'hover:bg-gray-50'
                        }`}
                    onClick={() => onSelectTask(task.id)}
                >
                    <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">{task.icon}</div>
                    <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">
                        {task.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600">
                        {task.description}
                    </p>
                </Card>
            ))}
        </div>
    )
}
