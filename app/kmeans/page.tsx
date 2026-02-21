'use client'

import { useState } from 'react'
import { KMeansTaskSelector } from '@/components/kmeans/KMeansTaskSelector'
import { ClusteringVisualization } from '@/components/kmeans/ClusteringVisualization'
import { CentroidEvolution } from '@/components/kmeans/CentroidEvolution'
import { ElbowMethod } from '@/components/kmeans/ElbowMethod'
import { InitializationMethods } from '@/components/kmeans/InitializationMethods'

export default function KMeansPage() {
    const [selectedTask, setSelectedTask] = useState('clustering')

    const renderTask = () => {
        switch (selectedTask) {
            case 'clustering':
                return <ClusteringVisualization />
            case 'centroid':
                return <CentroidEvolution />
            case 'elbow':
                return <ElbowMethod />
            case 'initialization':
                return <InitializationMethods />
            default:
                return <ClusteringVisualization />
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-6 sm:mb-8">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
                        K-Means Clustering Virtual Lab
                    </h1>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                        Explore unsupervised learning through interactive clustering
                    </p>
                </div>

                <KMeansTaskSelector
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
