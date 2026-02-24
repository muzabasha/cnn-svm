'use client'

import { useState } from 'react'
import { DNNTaskSelector } from '@/components/dnn/DNNTaskSelector'
import { InteractiveNetworkBuilder } from '@/components/dnn/InteractiveNetworkBuilder'
import { LayerVisualization } from '@/components/dnn/LayerVisualization'
import { DropoutRegularization } from '@/components/dnn/DropoutRegularization'
import { BatchNormalization } from '@/components/dnn/BatchNormalization'
import { LearningRateScheduler } from '@/components/dnn/LearningRateScheduler'
import { OverfittingDemo } from '@/components/dnn/OverfittingDemo'
import { EnhancedDNNTraining } from '@/components/dnn/EnhancedDNNTraining'

export default function DNNPage() {
    const [selectedTask, setSelectedTask] = useState('training')

    const renderTask = () => {
        switch (selectedTask) {
            case 'training':
                return <EnhancedDNNTraining />
            case 'builder':
                return <InteractiveNetworkBuilder />
            case 'layers':
                return <LayerVisualization />
            case 'dropout':
                return <DropoutRegularization />
            case 'batchnorm':
                return <BatchNormalization />
            case 'scheduler':
                return <LearningRateScheduler />
            case 'overfitting':
                return <OverfittingDemo />
            default:
                return <EnhancedDNNTraining />
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-6 sm:mb-8">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
                        Deep Neural Networks Virtual Lab
                    </h1>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                        Build, visualize, and experiment with deep learning architectures
                    </p>
                </div>

                <DNNTaskSelector
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
