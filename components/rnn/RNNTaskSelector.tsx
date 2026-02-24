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
        description: 'Full RNN/LSTM/GRU training',
        icon: '🎯'
    },
    {
        id: 'weather-pattern',
        title: 'Weather Pattern Recognition',
        description: 'Predict weather using RNN',
        icon: '🌦️'
    },
    {
        id: 'sequence',
        title: 'Sequence Processing',
        description: 'How RNNs handle sequential data',
        icon: '🔗'
    },
    {
        id: 'lstm',
        title: 'LSTM Architecture',
        description: 'Long Short-Term Memory cells',
        icon: '🧮'
    },
    {
        id: 'gru',
        title: 'GRU Comparison',
        description: 'Gated Recurrent Units vs LSTM',
        icon: '⚙️'
    },
    {
        id: 'gradient',
        title: 'Vanishing Gradient',
        description: 'Understanding the problem',
        icon: '📉'
    },
    {
        id: 'timeseries',
        title: 'Time Series Prediction',
        description: 'Forecasting with RNNs',
        icon: '📈'
    }
]

interface RNNTaskSelectorProps {
    selectedTask: string
    onSelectTask: (taskId: string) => void
}

export function RNNTaskSelector({ selectedTask, onSelectTask }: RNNTaskSelectorProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3 sm:gap-4">
            {tasks.map((task) => (
                <Card
                    key={task.id}
                    className={`p-4 sm:p-6 cursor-pointer transition-all hover:shadow-lg active:scale-98 ${task.id === 'training'
                            ? selectedTask === task.id
                                ? 'ring-2 ring-yellow-500 bg-yellow-50 shadow-lg'
                                : 'hover:ring-2 hover:ring-yellow-400 shadow-md'
                            : selectedTask === task.id
                                ? 'ring-2 ring-purple-500 bg-purple-50'
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
