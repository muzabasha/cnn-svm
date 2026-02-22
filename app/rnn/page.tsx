'use client'

import { useState } from 'react'
import { RNNTaskSelector } from '@/components/rnn/RNNTaskSelector'
import { SequenceProcessing } from '@/components/rnn/SequenceProcessing'
import { LSTMArchitecture } from '@/components/rnn/LSTMArchitecture'
import { GRUComparison } from '@/components/rnn/GRUComparison'
import { VanishingGradient } from '@/components/rnn/VanishingGradient'
import { TimeSeriesPrediction } from '@/components/rnn/TimeSeriesPrediction'
import { WeatherPatternRecognition } from '@/components/rnn/WeatherPatternRecognition'

export default function RNNPage() {
    const [selectedTask, setSelectedTask] = useState('weather-pattern')

    const renderTask = () => {
        switch (selectedTask) {
            case 'weather-pattern':
                return <WeatherPatternRecognition />
            case 'sequence':
                return <SequenceProcessing />
            case 'lstm':
                return <LSTMArchitecture />
            case 'gru':
                return <GRUComparison />
            case 'gradient':
                return <VanishingGradient />
            case 'timeseries':
                return <TimeSeriesPrediction />
            default:
                return <WeatherPatternRecognition />
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-6 sm:mb-8">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
                        Recurrent Neural Networks Virtual Lab
                    </h1>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                        Explore sequential data processing with RNNs, LSTMs, and GRUs
                    </p>
                </div>

                <RNNTaskSelector
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
