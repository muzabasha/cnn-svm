'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { SVMTaskSelector } from '@/components/svm/SVMTaskSelector'
import { DatasetPlayground } from '@/components/svm/DatasetPlayground'
import { KernelLab } from '@/components/svm/KernelLab'
import { TrainingVisualization } from '@/components/svm/TrainingVisualization'
import { EvaluationDashboard } from '@/components/svm/EvaluationDashboard'
import { EnhancedSVMPlayground } from '@/components/svm/EnhancedSVMPlayground'

export default function SVMLab() {
    const [selectedTask, setSelectedTask] = useState<string>('enhanced')

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-gray-600 hover:text-gray-900">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">SVM Virtual Lab</h1>
                    </div>
                    <div className="text-sm text-gray-500">Experiential Learning</div>
                </div>
            </header>

            <div className="flex">
                <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)] p-4">
                    <SVMTaskSelector
                        selectedTask={selectedTask}
                        onSelectTask={setSelectedTask}
                    />
                </aside>

                <main className="flex-1 p-6">
                    {selectedTask === 'enhanced' && <EnhancedSVMPlayground />}
                    {selectedTask === 'dataset' && <DatasetPlayground />}
                    {selectedTask === 'kernel' && <KernelLab />}
                    {selectedTask === 'training' && <TrainingVisualization />}
                    {selectedTask === 'evaluation' && <EvaluationDashboard />}
                </main>
            </div>
        </div>
    )
}
