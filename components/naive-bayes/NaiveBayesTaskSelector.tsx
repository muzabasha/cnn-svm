'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Calculator, Percent, MessageSquare, GitBranch } from 'lucide-react'

interface Props {
    activeModule: string
    onModuleChange: (module: string) => void
}

export function NaiveBayesTaskSelector({ activeModule, onModuleChange }: Props) {
    const modules = [
        {
            id: 'bayes-theorem',
            name: 'Bayes\' Theorem',
            icon: Calculator,
            description: 'Understand the foundation of probabilistic reasoning',
            color: 'bg-purple-500'
        },
        {
            id: 'probability',
            name: 'Probability Calculator',
            icon: Percent,
            description: 'Calculate prior, likelihood, and posterior probabilities',
            color: 'bg-indigo-500'
        },
        {
            id: 'text-classification',
            name: 'Text Classification',
            icon: MessageSquare,
            description: 'Classify text as spam or ham using Naive Bayes',
            color: 'bg-violet-500'
        },
        {
            id: 'conditional',
            name: 'Conditional Probability',
            icon: GitBranch,
            description: 'Explore independence assumption and its impact',
            color: 'bg-fuchsia-500'
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
                                ? 'ring-2 ring-purple-500 shadow-lg'
                                : 'hover:ring-2 hover:ring-purple-300'
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
