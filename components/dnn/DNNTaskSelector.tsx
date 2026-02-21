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
        id: 'builder',
        title: 'Network Builder',
        description: 'Build custom DNNs interactively',
        icon: '🏗️'
    },
    {
        id: 'layers',
        title: 'Layer Visualization',
        description: 'See data flow through layers',
        icon: '📊'
    },
    {
        id: 'dropout',
        title: 'Dropout',
        description: 'Prevent overfitting with dropout',
        icon: '🎲'
    },
    {
        id: 'batchnorm',
        title: 'Batch Normalization',
        description: 'Stabilize training with BatchNorm',
        icon: '⚖️'
    },
    {
        id: 'scheduler',
        title: 'Learning Rate Scheduler',
        description: 'Optimize training dynamics',
        icon: '📈'
    },
    {
        id: 'overfitting',
        title: 'Overfitting Demo',
        description: 'Understand bias-variance tradeoff',
        icon: '⚠️'
    }
]

interface DNNTaskSelectorProps {
    selectedTask: string
    onSelectTask: (taskId: string) => void
}

export function DNNTaskSelector({ selectedTask, onSelectTask }: DNNTaskSelectorProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {tasks.map((task) => (
                <Card
                    key={task.id}
                    className={`p-4 sm:p-6 cursor-pointer transition-all hover:shadow-lg active:scale-98 ${selectedTask === task.id
                            ? 'ring-2 ring-emerald-500 bg-emerald-50'
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
