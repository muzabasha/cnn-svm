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
        id: 'neuron',
        title: 'Neuron & Perceptron',
        description: 'Basic building block of neural networks',
        icon: '🧠'
    },
    {
        id: 'backprop',
        title: 'Backpropagation',
        description: 'How networks learn from errors',
        icon: '🔄'
    },
    {
        id: 'architecture',
        title: 'Network Architecture',
        description: 'Design multi-layer networks',
        icon: '🏗️'
    },
    {
        id: 'gradient',
        title: 'Gradient Descent',
        description: 'Optimization algorithms',
        icon: '📉'
    },
    {
        id: 'activation',
        title: 'Activation Functions',
        description: 'ReLU, Sigmoid, Tanh comparison',
        icon: '⚡'
    }
]

interface ANNTaskSelectorProps {
    selectedTask: string
    onSelectTask: (taskId: string) => void
}

export function ANNTaskSelector({ selectedTask, onSelectTask }: ANNTaskSelectorProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {tasks.map((task) => (
                <Card
                    key={task.id}
                    className={`p-4 sm:p-6 cursor-pointer transition-all hover:shadow-lg active:scale-98 ${selectedTask === task.id
                            ? 'ring-2 ring-blue-500 bg-blue-50'
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
