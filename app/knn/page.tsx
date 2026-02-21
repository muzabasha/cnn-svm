'use client'

import { useState } from 'react'
import { KNNTaskSelector } from '@/components/knn/KNNTaskSelector'
import { DistanceMetrics } from '@/components/knn/DistanceMetrics'
import { KValueExplorer } from '@/components/knn/KValueExplorer'
import { WeightedVoting } from '@/components/knn/WeightedVoting'
import { InteractiveClassifier } from '@/components/knn/InteractiveClassifier'
import { EnhancedInteractiveClassifier } from '@/components/knn/EnhancedInteractiveClassifier'

export default function KNNPage() {
    const [selectedTask, setSelectedTask] = useState('enhanced')

    const renderTask = () => {
        switch (selectedTask) {
            case 'enhanced':
                return <EnhancedInteractiveClassifier />
            case 'distance':
                return <DistanceMetrics />
            case 'kvalue':
                return <KValueExplorer />
            case 'weighted':
                return <WeightedVoting />
            case 'interactive':
                return <InteractiveClassifier />
            default:
                return <EnhancedInteractiveClassifier />
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-6 sm:mb-8">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
                        K-Nearest Neighbors Virtual Lab
                    </h1>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                        Understand instance-based learning through interactive visualization
                    </p>
                </div>

                <KNNTaskSelector
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
