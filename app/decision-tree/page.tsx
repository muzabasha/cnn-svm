'use client'

import { useState } from 'react'
import { DecisionTreeTaskSelector } from '@/components/decision-tree/DecisionTreeTaskSelector'
import { TreeVisualization } from '@/components/decision-tree/TreeVisualization'
import { SplittingCriteria } from '@/components/decision-tree/SplittingCriteria'
import { PruningModule } from '@/components/decision-tree/PruningModule'
import { InteractiveBuilder } from '@/components/decision-tree/InteractiveBuilder'

export default function DecisionTreeLab() {
    const [activeModule, setActiveModule] = useState<string>('tree-viz')

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-3">
                        🌳 Decision Tree Virtual Lab
                    </h1>
                    <p className="text-lg text-gray-600">
                        Learn how decision trees make predictions through interactive tree building and visualization
                    </p>
                </div>

                <DecisionTreeTaskSelector
                    activeModule={activeModule}
                    onModuleChange={setActiveModule}
                />

                <div className="mt-6">
                    {activeModule === 'tree-viz' && <TreeVisualization />}
                    {activeModule === 'splitting' && <SplittingCriteria />}
                    {activeModule === 'pruning' && <PruningModule />}
                    {activeModule === 'builder' && <InteractiveBuilder />}
                </div>
            </div>
        </div>
    )
}
