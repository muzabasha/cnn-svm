'use client'

import { useState } from 'react'
import { ANNTaskSelector } from '@/components/ann/ANNTaskSelector'
import { NeuronActivation } from '@/components/ann/NeuronActivation'
import { BackpropagationViz } from '@/components/ann/BackpropagationViz'
import { NetworkArchitecture } from '@/components/ann/NetworkArchitecture'
import { GradientDescent } from '@/components/ann/GradientDescent'
import { ActivationFunctions } from '@/components/ann/ActivationFunctions'
import { EnhancedNetworkBuilder } from '@/components/ann/EnhancedNetworkBuilder'

export default function ANNPage() {
    const [selectedTask, setSelectedTask] = useState('enhanced')

    const renderTask = () => {
        switch (selectedTask) {
            case 'enhanced':
                return <EnhancedNetworkBuilder />
            case 'neuron':
                return <NeuronActivation />
            case 'backprop':
                return <BackpropagationViz />
            case 'architecture':
                return <NetworkArchitecture />
            case 'gradient':
                return <GradientDescent />
            case 'activation':
                return <ActivationFunctions />
            default:
                return <EnhancedNetworkBuilder />
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-6 sm:mb-8">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
                        Artificial Neural Networks Virtual Lab
                    </h1>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                        Master the fundamentals of neural networks through interactive visualization
                    </p>
                </div>

                <ANNTaskSelector
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
