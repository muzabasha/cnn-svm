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
        id: 'crop-price',
        title: 'Crop Price Forecasting',
        description: 'Predict agricultural prices',
        icon: '🌾'
    },
    {
        id: 'demand-prediction',
        title: 'Demand Prediction',
        description: 'Forecast product demand',
        icon: '📊'
    },
    {
        id: 'linear',
        title: 'Linear Model',
        description: 'Multiple features regression visualization',
        icon: '📈'
    },
    {
        id: 'scaling',
        title: 'Feature Scaling',
        description: 'Normalization and standardization',
        icon: '⚖️'
    },
    {
        id: 'polynomial',
        title: 'Polynomial Features',
        description: 'Non-linear relationships modeling',
        icon: '🔄'
    },
    {
        id: 'regularization',
        title: 'Regularization',
        description: 'Ridge, Lasso, and Elastic Net',
        icon: '🎯'
    }
]

interface MultipleRegressionTaskSelectorProps {
    selectedTask: string
    onSelectTask: (taskId: string) => void
}

export function MultipleRegressionTaskSelector({ selectedTask, onSelectTask }: MultipleRegressionTaskSelectorProps) {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {tasks.map((task) => (
                <Card
                    key={task.id}
                    className={`p-4 sm:p-6 cursor-pointer transition-all hover:shadow-lg active:scale-98 ${selectedTask === task.id
                        ? 'ring-2 ring-orange-500 bg-orange-50'
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
