import { Database, Cpu, TrendingUp, BarChart3, Zap } from 'lucide-react'

interface Task {
    id: string
    name: string
    icon: React.ReactNode
}

const tasks: Task[] = [
    { id: 'enhanced', name: '🌟 Learn by Doing', icon: <Zap className="w-4 h-4" /> },
    { id: 'dataset', name: 'Dataset Playground', icon: <Database className="w-4 h-4" /> },
    { id: 'kernel', name: 'Kernel & Hyperparameters', icon: <Cpu className="w-4 h-4" /> },
    { id: 'training', name: 'Training Visualization', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'evaluation', name: 'Evaluation Dashboard', icon: <BarChart3 className="w-4 h-4" /> },
]

interface SVMTaskSelectorProps {
    selectedTask: string
    onSelectTask: (task: string) => void
}

export function SVMTaskSelector({ selectedTask, onSelectTask }: SVMTaskSelectorProps) {
    return (
        <div className="space-y-2">
            <h2 className="text-sm font-semibold text-gray-500 uppercase mb-4">
                Select Module
            </h2>
            {tasks.map((task) => (
                <button
                    key={task.id}
                    onClick={() => onSelectTask(task.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${task.id === 'enhanced'
                            ? selectedTask === task.id
                                ? 'bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 font-medium'
                                : 'bg-gradient-to-r from-yellow-50 to-orange-50 text-orange-600 hover:from-yellow-100 hover:to-orange-100'
                            : selectedTask === task.id
                                ? 'bg-purple-50 text-purple-700 font-medium'
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
