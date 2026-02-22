'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft } from 'lucide-react'
import { BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'

const weatherSequences = [
    { id: 'sunny-rain', name: 'Sunny to Rain', sequence: ['sunny', 'sunny', 'cloudy', 'rain'], icon: '🌦️', description: 'Clear weather turning rainy' },
    { id: 'rain-sunny', name: 'Rain to Sunny', sequence: ['rain', 'cloudy', 'sunny', 'sunny'], icon: '🌤️', description: 'Weather clearing up' },
    { id: 'cloudy-cycle', name: 'Cloudy Cycle', sequence: ['cloudy', 'rain', 'sunny', 'cloudy'], icon: '☁️', description: 'Cyclical pattern' },
    { id: 'winter-storm', name: 'Winter Storm', sequence: ['cloudy', 'snow', 'snow', 'cloudy'], icon: '❄️', description: 'Cold with snow' }
]

type ProcessingStep = 'input' | 'embedding' | 'rnn1' | 'rnn2' | 'rnn3' | 'output'

interface LayerData {
    step: ProcessingStep
    name: string
    operation: string
    inputShape: string
    outputShape: string
    parameters: string
}

export function WeatherPatternRecognition() {
    const [selectedSequence, setSelectedSequence] = useState<typeof weatherSequences[0] | null>(null)
    const [currentStep, setCurrentStep] = useState<ProcessingStep>('input')
    const [isAnimating, setIsAnimating] = useState(false)
    const [animationSpeed, setAnimationSpeed] = useState(3000)
    const [showPixelValues, setShowPixelValues] = useState(true)

    const steps: ProcessingStep[] = ['input', 'embedding', 'rnn1', 'rnn2', 'rnn3', 'output']

    const layerData: Record<ProcessingStep, LayerData> = {
        input: { step: 'input', name: 'Input Layer', operation: 'One-Hot Encoding', inputShape: '1', outputShape: '4', parameters: 'Weather types: 4' },
        embedding: { step: 'embedding', name: 'Embedding Layer', operation: 'Dense Embedding', inputShape: '4', outputShape: '8', parameters: '32 weights' },
        rnn1: { step: 'rnn1', name: 'RNN Cell 1', operation: 'Recurrent Processing', inputShape: '8', outputShape: '16', parameters: '144 weights' },
        rnn2: { step: 'rnn2', name: 'RNN Cell 2', operation: 'Recurrent Processing', inputShape: '16', outputShape: '16', parameters: '256 weights' },
        rnn3: { step: 'rnn3', name: 'RNN Cell 3', operation: 'Recurrent Processing', inputShape: '16', outputShape: '16', parameters: '256 weights' },
        output: { step: 'output', name: 'Output Layer', operation: 'Dense + Softmax', inputShape: '16', outputShape: '4', parameters: '68 weights' }
    }

    const generateOneHot = (weather: string) => {
        const types = ['sunny', 'cloudy', 'rain', 'snow']
        return types.map(t => t === weather ? 1 : 0)
    }

    const generateEmbedding = () => Array(8).fill(0).map(() => Number((Math.random()).toFixed(2)))
    const generateHiddenState = () => Array(16).fill(0).map(() => Number((Math.random() * 0.9).toFixed(2)))

    const handleSequenceSelect = (seq: typeof weatherSequences[0]) => {
        setSelectedSequence(seq)
        setCurrentStep('input')
        setIsAnimating(false)
    }

    const handleNextStep = () => {
        const currentIndex = steps.indexOf(currentStep)
        if (currentIndex < steps.length - 1) setCurrentStep(steps[currentIndex + 1])
    }

    const handlePrevStep = () => {
        const currentIndex = steps.indexOf(currentStep)
        if (currentIndex > 0) setCurrentStep(steps[currentIndex - 1])
    }

    const handleReset = () => {
        setCurrentStep('input')
        setIsAnimating(false)
    }

    const handleAutoPlay = () => {
        if (isAnimating) {
            setIsAnimating(false)
            return
        }
        setIsAnimating(true)
        setCurrentStep('input')
        let stepIndex = 0
        const interval = setInterval(() => {
            stepIndex++
            if (stepIndex >= steps.length) {
                setIsAnimating(false)
                clearInterval(interval)
                return
            }
            setCurrentStep(steps[stepIndex])
        }, animationSpeed)
    }

    const currentLayerData = layerData[currentStep]
    const stepIndex = steps.indexOf(currentStep)

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>🌦️ Weather Pattern Recognition - RNN Visualization</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 mb-6">
                        Select a weather sequence and watch RNN process it step-by-step with detailed state information.
                    </p>

                    <div className="mb-6">
                        <h3 className="font-semibold text-lg mb-4">Step 1: Select Weather Sequence</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {weatherSequences.map((seq) => (
                                <div key={seq.id} onClick={() => handleSequenceSelect(seq)}
                                    className={`cursor-pointer border-2 rounded-xl p-4 transition-all ${selectedSequence?.id === seq.id ? 'border-blue-500 bg-blue-50 shadow-lg' : 'border-gray-200 hover:border-blue-300'
                                        }`}>
                                    <div className="text-4xl mb-2 text-center">{seq.icon}</div>
                                    <p className="text-sm font-semibold text-center">{seq.name}</p>
                                    <p className="text-xs text-gray-500 text-center mt-1">{seq.description}</p>
                                    <div className="mt-2 flex gap-1 justify-center">
                                        {seq.sequence.map((w, i) => (
                                            <span key={i} className="text-xs px-1 py-0.5 bg-gray-100 rounded">{w}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {selectedSequence && (
                        <>
                            <div className="mb-6 bg-gray-50 rounded-xl p-4">
                                <h3 className="font-semibold text-lg mb-4">Step 2: Control Animation</h3>
                                <div className="flex flex-wrap gap-3 items-center">
                                    <Button onClick={handleAutoPlay} className="flex items-center gap-2">
                                        {isAnimating ? <><Pause className="w-4 h-4" />Pause</> : <><Play className="w-4 h-4" />Auto Play</>}
                                    </Button>
                                    <Button onClick={handlePrevStep} disabled={stepIndex === 0 || isAnimating} variant="outline">
                                        <ChevronLeft className="w-4 h-4" />Previous
                                    </Button>
                                    <Button onClick={handleNextStep} disabled={stepIndex === steps.length - 1 || isAnimating} variant="outline">
                                        Next<ChevronRight className="w-4 h-4" />
                                    </Button>
                                    <Button onClick={handleReset} variant="outline"><RotateCcw className="w-4 h-4" />Reset</Button>
                                    <div className="flex items-center gap-2 ml-auto">
                                        <label className="text-sm font-medium">Speed:</label>
                                        <select value={animationSpeed} onChange={(e) => setAnimationSpeed(Number(e.target.value))}
                                            className="border rounded px-3 py-1 text-sm" disabled={isAnimating}>
                                            <option value={3000}>Slow (3s)</option>
                                            <option value={2000}>Medium (2s)</option>
                                            <option value={1000}>Fast (1s)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <div className="flex justify-between mb-2">
                                    {steps.map((step, index) => (
                                        <div key={step} className={`text-xs font-medium ${index <= stepIndex ? 'text-blue-600' : 'text-gray-400'}`}>
                                            {layerData[step].name.split(' ')[0]}
                                        </div>
                                    ))}
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-600 transition-all duration-500"
                                        style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}></div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="font-semibold text-lg mb-4">Step 3: Current Layer Processing</h3>
                                <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border-2 border-purple-200">
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="text-xl font-bold text-purple-900">{currentLayerData.name}</h4>
                                        <span className="px-3 py-1 bg-purple-600 text-white rounded-full text-sm font-semibold">
                                            Step {stepIndex + 1}/{steps.length}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-white rounded-lg p-4">
                                            <div className="flex justify-between items-center mb-3">
                                                <h5 className="font-semibold">Visual Representation</h5>
                                                <button onClick={() => setShowPixelValues(!showPixelValues)}
                                                    className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded">
                                                    {showPixelValues ? 'Hide Values' : 'Show Values'}
                                                </button>
                                            </div>

                                            {currentStep === 'input' && showPixelValues && (
                                                <div>
                                                    <p className="text-xs font-semibold mb-2">One-Hot Encoding:</p>
                                                    <div className="grid grid-cols-4 gap-2">
                                                        {generateOneHot(selectedSequence.sequence[0]).map((val, i) => (
                                                            <div key={i} className="p-3 text-center font-mono text-sm rounded"
                                                                style={{ backgroundColor: val === 1 ? 'rgba(59, 130, 246, 0.8)' : 'rgba(229, 231, 235, 0.5)', color: val === 1 ? 'white' : 'black' }}>
                                                                {val}
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="mt-2 grid grid-cols-4 gap-2 text-xs text-center text-gray-600">
                                                        <div>Sunny</div><div>Cloudy</div><div>Rain</div><div>Snow</div>
                                                    </div>
                                                </div>
                                            )}

                                            {currentStep === 'embedding' && showPixelValues && (
                                                <div>
                                                    <p className="text-xs font-semibold mb-2">Embedding Vector (8D):</p>
                                                    <div className="grid grid-cols-4 gap-1">
                                                        {generateEmbedding().map((val, i) => (
                                                            <div key={i} className="p-2 text-center font-mono text-xs rounded"
                                                                style={{ backgroundColor: `rgba(147, 51, 234, ${val})`, color: val > 0.5 ? 'white' : 'black' }}>
                                                                {val}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {(currentStep === 'rnn1' || currentStep === 'rnn2' || currentStep === 'rnn3') && showPixelValues && (
                                                <div>
                                                    <p className="text-xs font-semibold mb-2">Hidden State (16D):</p>
                                                    <div className="grid grid-cols-4 gap-1">
                                                        {generateHiddenState().map((val, i) => (
                                                            <div key={i} className="p-2 text-center font-mono text-xs rounded"
                                                                style={{ backgroundColor: `rgba(59, 130, 246, ${val})`, color: val > 0.5 ? 'white' : 'black' }}>
                                                                {val}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {currentStep === 'output' && (
                                                <div className="space-y-2">
                                                    {['sunny', 'cloudy', 'rain', 'snow'].map((weather, i) => {
                                                        const prob = weather === selectedSequence.sequence[selectedSequence.sequence.length - 1]
                                                            ? 0.75 + Math.random() * 0.24 : Math.random() * 0.25
                                                        return (
                                                            <div key={i} className="flex items-center gap-3">
                                                                <span className="text-sm w-16 font-medium capitalize">{weather}</span>
                                                                <div className="flex-1 h-6 bg-gray-200 rounded-full overflow-hidden">
                                                                    <div className={`h-full transition-all duration-1000 ${weather === selectedSequence.sequence[selectedSequence.sequence.length - 1] ? 'bg-green-500' : 'bg-gray-400'
                                                                        }`} style={{ width: `${prob * 100}%` }}></div>
                                                                </div>
                                                                <span className="text-sm font-bold w-16 text-right">{(prob * 100).toFixed(1)}%</span>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-3">
                                            <div className="bg-white rounded-lg p-3">
                                                <p className="text-xs text-gray-600 mb-1">Operation</p>
                                                <p className="font-semibold text-gray-900">{currentLayerData.operation}</p>
                                            </div>
                                            <div className="bg-white rounded-lg p-3">
                                                <p className="text-xs text-gray-600 mb-1">Input Shape</p>
                                                <p className="font-mono text-sm text-blue-600">{currentLayerData.inputShape}</p>
                                            </div>
                                            <div className="bg-white rounded-lg p-3">
                                                <p className="text-xs text-gray-600 mb-1">Output Shape</p>
                                                <p className="font-mono text-sm text-green-600">{currentLayerData.outputShape}</p>
                                            </div>
                                            <div className="bg-white rounded-lg p-3">
                                                <p className="text-xs text-gray-600 mb-1">Parameters</p>
                                                <p className="font-semibold text-gray-900">{currentLayerData.parameters}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 bg-white rounded-lg p-4">
                                        <h5 className="font-semibold mb-3">Mathematical Operation</h5>
                                        <div className="overflow-x-auto">
                                            {(currentStep === 'rnn1' || currentStep === 'rnn2' || currentStep === 'rnn3') && (
                                                <div>
                                                    <BlockMath math="h_t = \tanh(W_{hh} h_{t-1} + W_{xh} x_t + b_h)" />
                                                    <p className="text-xs text-gray-600 mt-2">
                                                        RNN cell: combines previous hidden state with current input
                                                    </p>
                                                </div>
                                            )}
                                            {currentStep === 'output' && (
                                                <div>
                                                    <BlockMath math="\text{Softmax}(z_i) = \frac{e^{z_i}}{\sum_{j=1}^{K} e^{z_j}}" />
                                                    <p className="text-xs text-gray-600 mt-2">
                                                        Softmax converts logits to probability distribution
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="font-semibold text-lg mb-4">Step 4: Layer-by-Layer Data Table</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow">
                                        <thead>
                                            <tr className="bg-gray-100">
                                                <th className="border px-4 py-3 text-left text-sm font-semibold">Layer</th>
                                                <th className="border px-4 py-3 text-left text-sm font-semibold">Operation</th>
                                                <th className="border px-4 py-3 text-left text-sm font-semibold">Input Shape</th>
                                                <th className="border px-4 py-3 text-left text-sm font-semibold">Output Shape</th>
                                                <th className="border px-4 py-3 text-left text-sm font-semibold">Parameters</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {steps.map((step, index) => {
                                                const layer = layerData[step]
                                                const isActive = step === currentStep
                                                const isPassed = index < stepIndex
                                                return (
                                                    <tr key={step} className={`transition-all duration-300 ${isActive ? 'bg-blue-100 border-l-4 border-l-blue-600' : isPassed ? 'bg-green-50' : 'bg-white hover:bg-gray-50'
                                                        }`}>
                                                        <td className="border px-4 py-3">
                                                            <div className="flex items-center gap-2">
                                                                {isActive && <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>}
                                                                {isPassed && !isActive && <div className="w-2 h-2 bg-green-600 rounded-full"></div>}
                                                                <span className={`font-medium ${isActive ? 'text-blue-900' : 'text-gray-900'}`}>
                                                                    {layer.name}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="border px-4 py-3 text-sm">{layer.operation}</td>
                                                        <td className="border px-4 py-3 font-mono text-sm text-blue-600">{layer.inputShape}</td>
                                                        <td className="border px-4 py-3 font-mono text-sm text-green-600">{layer.outputShape}</td>
                                                        <td className="border px-4 py-3 text-sm">{layer.parameters}</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
