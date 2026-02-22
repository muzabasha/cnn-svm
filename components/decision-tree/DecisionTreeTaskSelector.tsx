'use client'

import { Card, CardContent } from '@/components/ui/card'
import { TreeDeciduous, GitBranch, Scissors, Hammer, Droplets } from 'lucide-react'

interface Props {
    activeModule: string
    onModuleChange: (module: string) => void
}

export function DecisionTreeTaskSelector({ activeModule, onModuleChange }: Props) {
    const modules = [
        {
            id: 'enhanced',
            name: '🌟 Learn by Doing',
            icon: Hammer,
            description: 'Interactive exploration with challenges',
            color: 'bg-gradient-to-br from-yellow-400 to-orange-400'
        },
        {
            id: 'irrigation',
            name: '💧 Smart Irrigation',
            icon: Droplets,
            description: 'IoT system for crop watering decisions',
            color: 'bg-blue-500'
        },
        {
            id: 'tree-viz',
            name: 'Tree Visualization',
            icon: TreeDeciduous,
            description: 'See how trees split data step-by-step',
            color: 'bg-green-500'
        },
        {
            id: 'splitting',
            name: 'Splitting Criteria',
            icon: GitBranch,
            description: 'Learn Gini, Entropy, and Information Gain',
            color: 'bg-emerald-500'
        },
        {
            id: 'pruning',
            name: 'Pruning',
            icon: Scissors,
            description: 'Prevent overfitting with tree pruning',
            color: 'bg-teal-500'
        },
        {
            id: 'builder',
            name: 'Interactive Builder',
            icon: Hammer,
            description: 'Build your own decision tree',
            color: 'bg-lime-500'
        }
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {modules.map((module) => {
                const Icon = module.icon
                return (
                    <Card
                        key={module.id}
                        className={`cursor-pointer transition-all hover:shadow-lg ${module.id === 'enhanced'
                            ? activeModule === module.id
                                ? 'ring-2 ring-yellow-500 shadow-lg'
                                : 'hover:ring-2 hover:ring-yellow-400 shadow-md'
                            : activeModule === module.id
                                ? 'ring-2 ring-green-500 shadow-lg'
                                : 'hover:ring-2 hover:ring-green-300'
                            }`}
                        onClick={() => onModuleChange(module.id)}
                    >
                        <CardContent className="p-6">
                            <div className={`${module.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                                <Icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-semibold text-lg mb-2">{module.name}</h3>
                            <p className="text-sm text-gray-600">{module.description}</p>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    )
}
