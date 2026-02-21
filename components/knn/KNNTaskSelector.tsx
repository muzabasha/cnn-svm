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
        id: 'distance',
        title: 'Distance Metrics',
        description: 'Compare Euclidean, Manhattan, and Minkowski',
        icon: '📏'
    },
    {
        id: 'kvalue',
        title: 'K-Value Explorer',
        description: 'See how K affects classification',
        icon: '🔢'
    },
    {
        id: 'weighted',
        title: 'Weighted Voting',
        description: 'Distance-weighted vs uniform voting',
        icon: '⚖️'
    },
    {
        id: 'interactive',
        title: 'Interactive Classifier',
        description: 'Click to add points and classify',
        icon: '🖱️'
    }
]

interface KNNTaskSelectorProps {
    selectedTask: string
    onSelectTask: (taskId: string) => void
}

export function KNNTaskSelector({ selectedTask, onSelectTask }: KNNTaskSelectorProps) {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {tasks.map((task) => (
                <Card
                    key={task.id}
                    className={`p-4 sm:p-6 cursor-pointer transition-all hover:shadow-lg active:scale-98 ${selectedTask === task.id
                            ? 'ring-2 ring-green-500 bg-green-50'
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
