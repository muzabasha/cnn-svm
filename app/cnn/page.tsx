'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { CNNTaskSelector } from '@/components/cnn/CNNTaskSelector'
import { EnhancedPlantDiseaseModule } from '@/components/cnn/EnhancedPlantDiseaseModule'
import { ConvolutionModule } from '@/components/cnn/ConvolutionModule'
import { PoolingModule } from '@/components/cnn/PoolingModule'
import { ActivationModule } from '@/components/cnn/ActivationModule'
import { FullyConnectedModule } from '@/components/cnn/FullyConnectedModule'

export default function CNNLab() {
    const [selectedTask, setSelectedTask] = useState<string>('plant-disease')

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-gray-600 hover:text-gray-900">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">CNN Virtual Lab</h1>
                    </div>
                    <div className="text-sm text-gray-500">Learn by Doing</div>
                </div>
            </header>

            <div className="flex">
                <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)] p-4">
                    <CNNTaskSelector
                        selectedTask={selectedTask}
                        onSelectTask={setSelectedTask}
                    />
                </aside>

                <main className="flex-1 p-6">
                    {selectedTask === 'plant-disease' && <EnhancedPlantDiseaseModule />}
                    {selectedTask === 'convolution' && <ConvolutionModule />}
                    {selectedTask === 'pooling' && <PoolingModule />}
                    {selectedTask === 'activation' && <ActivationModule />}
                    {selectedTask === 'fully-connected' && <FullyConnectedModule />}
                </main>
            </div>
        </div>
    )
}
