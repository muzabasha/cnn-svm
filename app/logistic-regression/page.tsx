'use client'

import { useState } from 'react'
import { LogisticRegressionTaskSelector } from '@/components/logistic-regression/LogisticRegressionTaskSelector'
import { SigmoidFunction } from '@/components/logistic-regression/SigmoidFunction'
import { DecisionBoundary } from '@/components/logistic-regression/DecisionBoundary'
import { CostFunction } from '@/components/logistic-regression/CostFunction'
import { MulticlassClassification } from '@/components/logistic-regression/MulticlassClassification'
import { EnhancedBoundaryPlayground } from '@/components/logistic-regression/EnhancedBoundaryPlayground'

export default function LogisticRegressionPage() {
    const [selectedTask, setSelectedTask] = useState('enhanced')

    const renderTask = () => {
        switch (selectedTask) {
            case 'enhanced':
                return <EnhancedBoundaryPlayground />
            case 'sigmoid':
                return <SigmoidFunction />
            case 'boundary':
                return <DecisionBoundary />
            case 'cost':
                return <CostFunction />
            case 'multiclass':
                return <MulticlassClassification />
            default:
                return <EnhancedBoundaryPlayground />
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-6 sm:mb-8">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
                        Logistic Regression Virtual Lab
                    </h1>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                        Master binary and multiclass classification through interactive exploration
                    </p>
                </div>

                <LogisticRegressionTaskSelector
                    selectedTask={selectedTask}
                    onSelectTask={setSelectedTask}
                />

                <div className="mt-6 sm:mt-8">
                    {renderTask()}
                </div>
            </div>
        </div>
    )
}
