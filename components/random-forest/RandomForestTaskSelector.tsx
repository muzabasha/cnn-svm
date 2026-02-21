'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Trees, Shuffle, Vote, TrendingUp } from 'lucide-react'

interface Props {
    activeModule: string
    onModuleChange: (module: string) => void
}

export function RandomForestTaskSelector({ activeModule, onModuleChange }: Props) {
    const modules = [
        {
            id: 'forest-viz',
            name: 'Forest Visualization',
            icon: Trees,
            description: 'See how multiple trees work together',
            color: 'bg-teal-500'
        },
        {
            id: 'bootstrapping',
            name: 'Bootstrapping',
            icon: Shuffle,
            description: 'Understand random sampling with replacement',
            color: 'bg-cyan-500'
        },
        {
            id: 'voting',
            name: 'Voting Mechanism',
            icon: Vote,
            description: 'Learn how trees vote for final prediction',
            color: 'bg-sky-500'
        },
        {
            id: 'importance',
            name: 'Feature Importance',
            icon: TrendingUp,
            description: 'Discover which features matter most',
            color: 'bg-blue-500'
        }
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {modules.map((module) => {
                const Icon = module.icon
                return (
                    <Card
                        key={module.id}
                        className={`cursor-pointer transition-all hover:shadow-lg ${activeModule === module.id
                                ? 'ring-2 ring-teal-500 shadow-lg'
                                : 'hover:ring-2 hover:ring-teal-300'
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
