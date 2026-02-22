'use client'

import { useState } from 'react'
import { MultipleRegressionTaskSelector } from '@/components/multiple-regression/MultipleRegressionTaskSelector'
import { LinearModel } from '@/components/multiple-regression/LinearModel'
import { FeatureScaling } from '@/components/multiple-regression/FeatureScaling'
import { PolynomialFeatures } from '@/components/multiple-regression/PolynomialFeatures'
import { RegularizationTechniques } from '@/components/multiple-regression/RegularizationTechniques'
import { CropPriceForecasting } from '@/components/multiple-regression/CropPriceForecasting'
import { DemandPrediction } from '@/components/multiple-regression/DemandPrediction'

export default function MultipleRegressionPage() {
    const [selectedTask, setSelectedTask] = useState('crop-price')

    const renderTask = () => {
        switch (selectedTask) {
            case 'crop-price':
                return <CropPriceForecasting />
            case 'demand-prediction':
                return <DemandPrediction />
            case 'linear':
                return <LinearModel />
            case 'scaling':
                return <FeatureScaling />
            case 'polynomial':
                return <PolynomialFeatures />
            case 'regularization':
                return <RegularizationTechniques />
            default:
                return <CropPriceForecasting />
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-6 sm:mb-8">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
                        Multiple Regression Virtual Lab
                    </h1>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                        Master multivariate regression through interactive experimentation
                    </p>
                </div>

                <MultipleRegressionTaskSelector
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
