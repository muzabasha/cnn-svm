import { Layers, Droplet, Zap, Network } from 'lucide-react'

interface Task {
    id: string
    name: string
    icon: React.ReactNode
}

const tasks: Task[] = [
    { id: 'convolution', name: 'Convolution Operation', icon: <Layers className="w-4 h-4" /> },
    { id: 'pooling', name: 'Pooling Operation', icon: <Droplet className="w-4 h-4" /> },
    { id: 'activation', name: 'Activation Functions', icon: <Zap className="w-4 h-4" /> },
    { id: 'fully-connected', name: 'Fully Connected Layer', icon: <Network className="w-4 h-4" /> },
]

interface CNNTaskSelectorProps {
    selectedTask: string
    onSelectTask: (task: string) => void
}

export function CNNTaskSelector({ selectedTask, onSelectTask }: CNNTaskSelectorProps) {
    return (
        <div className="space-y-2">
            <h2 className="text-sm font-semibold text-gray-500 uppercase mb-4">
                Select Module
            </h2>
            {tasks.map((task) => (
                <button
                    key={task.id}
                    onClick={() => onSelectTask(task.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${selectedTask === task.id
                            ? 'bg-blue-50 text-blue-700 font-medium'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                >
                    {task.icon}
                    <span className="text-sm">{task.name}</span>
                </button>
            ))}
        </div>
    )
}
