'use client'

import { useState } from 'react'
import { RandomForestTaskSelector } from '@/components/random-forest/RandomForestTaskSelector'
import { ForestVisualization } from '@/components/random-forest/ForestVisualization'
import { BootstrappingModule } from '@/components/random-forest/BootstrappingModule'
import { VotingMechanism } from '@/components/random-forest/VotingMechanism'
import { FeatureImportance } from '@/components/random-forest/FeatureImportance'

export default function RandomForestLab() {
    const [activeModule, setActiveModule] = useState<string>('forest-viz')

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-3">
                        🌲 Random Forest Virtual Lab
                    </h1>
                    <p className="text-lg text-gray-600">
                        Explore ensemble learning through multiple decision trees working together
                    </p>
                </div>

                <RandomForestTaskSelector
                    activeModule={activeModule}
                    onModuleChange={setActiveModule}
                />

                <div className="mt-6">
                    {activeModule === 'forest-viz' && <ForestVisualization />}
                    {activeModule === 'bootstrapping' && <BootstrappingModule />}
                    {activeModule === 'voting' && <VotingMechanism />}
                    {activeModule === 'importance' && <FeatureImportance />}
                </div>
            </div>
        </div>
    )
}
