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
        id: 'clustering',
        title: 'Clustering Visualization',
        description: 'Watch K-means algorithm cluster data points',
        icon: '🎯'
    },
    {
        id: 'centroid',
        title: 'Centroid Evolution',
        description: 'Track how centroids move during iterations',
        icon: '📍'
    },
    {
        id: 'elbow',
        title: 'Elbow Method',
        description: 'Find optimal number of clusters',
        icon: '📊'
    },
    {
        id: 'initialization',
        title: 'Initialization Methods',
        description: 'Compare random vs K-means++ initialization',
        icon: '🎲'
    }
]

interface KMeansTaskSelectorProps {
    selectedTask: string
    onSelectTask: (taskId: string) => void
}

export function KMeansTaskSelector({ selectedTask, onSelectTask }: KMeansTaskSelectorProps) {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {tasks.map((task) => (
                <Card
                    key={task.id}
                    className={`p-4 sm:p-6 cursor-pointer transition-all hover:shadow-lg active:scale-98 ${selectedTask === task.id
                            ? 'ring-2 ring-cyan-500 bg-cyan-50'
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
