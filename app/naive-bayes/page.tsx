'use client'

import { useState } from 'react'
import { NaiveBayesTaskSelector } from '@/components/naive-bayes/NaiveBayesTaskSelector'
import { BayesTheorem } from '@/components/naive-bayes/BayesTheorem'
import { ProbabilityCalculator } from '@/components/naive-bayes/ProbabilityCalculator'
import { TextClassification } from '@/components/naive-bayes/TextClassification'
import { ConditionalProbability } from '@/components/naive-bayes/ConditionalProbability'

export default function NaiveBayesLab() {
    const [activeModule, setActiveModule] = useState<string>('bayes-theorem')

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-3">
                        🎲 Naive Bayes Classifier Virtual Lab
                    </h1>
                    <p className="text-lg text-gray-600">
                        Understand probabilistic classification through Bayes' theorem and real-world examples
                    </p>
                </div>

                <NaiveBayesTaskSelector
                    activeModule={activeModule}
                    onModuleChange={setActiveModule}
                />

                <div className="mt-6">
                    {activeModule === 'bayes-theorem' && <BayesTheorem />}
                    {activeModule === 'probability' && <ProbabilityCalculator />}
                    {activeModule === 'text-classification' && <TextClassification />}
                    {activeModule === 'conditional' && <ConditionalProbability />}
                </div>
            </div>
        </div>
    )
}
