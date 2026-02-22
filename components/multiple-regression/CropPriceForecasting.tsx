'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft } from 'lucide-react'
import { BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'

const cropData = [
    { id: 'wheat', name: 'Wheat', icon: '🌾', features: { rainfall: 850, temp: 28, demand: 0.85, season: 'summer', fuel: 95 }, price: 234 },
    { id: 'rice', name: 'Rice', icon: '🌾', features: { rainfall: 1200, temp: 32, demand: 0.92, season: 'monsoon', fuel: 98 }, price: 312 },
    { id: 'corn', name: 'Corn', icon: '🌽', features: { rainfall: 650, temp: 25, demand: 0.78, season: 'spring', fuel: 92 }, price: 198 },
    { id: 'soybean', name: 'Soybeans', icon: '🫘', features: { rainfall: 750, temp: 27, demand: 0.88, season: 'summer', fuel: 96 }, price: 267 }
]

type ProcessingStep = 'input' | 'normalize' | 'linear' | 'output'

interface LayerData {
    step: ProcessingStep
    name: string
    operation: string
    inputShape: string
    outputShape: string
    parameters: string
}

export function CropPriceForecasting() {
    const [selectedCrop, setSelectedCrop] = useState<typeof cropData[0] | null>(null)
    const [currentStep, setCurrentStep] = useState<ProcessingStep>('input')
    const [isAnimating, setIsAnimating] = useState(false)
    const [animationSpeed, setAnimationSpeed] = useState(3000)
    const [showPixelValues, setShowPixelValues] = useState(true)

    const steps: ProcessingStep[] = ['input', 'normalize', 'linear', 'output']

    const layerData: Record<ProcessingStep, LayerData> = {
        input: { step: 'input', name: 'Input Features', operation: 'Raw Feature Values', inputShape: '5 features', outputShape: '5 features', parameters: 'Rainfall, Temp, Demand, Season, Fuel' },
        normalize: { step: 'normalize', name: 'Normalization', operation: 'Min-Max Scaling', inputShape: '5 features', outputShape: '5 features', parameters: 'Scale to [0,1]' },
        linear: { step: 'linear', name: 'Linear Combination', operation: 'Weighted Sum', inputShape: '5 features', outputShape: '1', parameters: '5 weights + bias' },
        output: { step: 'output', name: 'Price Prediction', operation: 'Linear Output', inputShape: '1', outputShape: '1', parameters: 'Price in $/ton' }
    }

    const normalizeValue = (val: number, min: number, max: number) => Number(((val - min) / (max - min)).toFixed(2))

    const getNormalizedFeatures = () => {
        if (!selectedCrop) return []
        return [
            normalizeValue(selectedCrop.features.rainfall, 600, 1300),
            normalizeValue(selectedCrop.features.temp, 20, 35),
            selectedCrop.features.demand,
            selectedCrop.features.season === 'summer' ? 1 : selectedCrop.features.season === 'monsoon' ? 0.75 : 0.5,
            normalizeValue(selectedCrop.features.fuel, 90, 100)
        ]
    }

    const getWeights = () => [0.45, -0.23, 0.67, 0.34, -0.12]

    const calculatePrediction = () => {
        const normalized = getNormalizedFeatures()
        const weights = getWeights()
        const sum = normalized.reduce((acc, val, i) => acc + val * weights[i], 0)
        return Number((sum * 500 + 100).toFixed(2))
    }

    const handleCropSelect = (crop: typeof cropData[0]) => {
        setSelectedCrop(crop)
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
                    <CardTitle>🌾 Crop Price Forecasting - Multiple Regression</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 mb-6">
                        Select a crop and watch how multiple features are combined to predict market price.
                    </p>

                    <div className="mb-6">
                        <h3 className="font-semibold text-lg mb-4">Step 1: Select Crop Type</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {cropData.map((crop) => (
                                <div key={crop.id} onClick={() => handleCropSelect(crop)}
                                    className={`cursor-pointer border-2 rounded-xl p-4 transition-all ${selectedCrop?.id === crop.id ? 'border-green-500 bg-green-50 shadow-lg' : 'border-gray-200 hover:border-green-300'
                                        }`}>
                                    <div className="text-4xl mb-2 text-center">{crop.icon}</div>
                                    <p className="text-sm font-semibold text-center">{crop.name}</p>
                                    <div className="mt-2 text-xs text-gray-600 space-y-1">
                                        <div>Rain: {crop.features.rainfall}mm</div>
                                        <div>Temp: {crop.features.temp}°C</div>
                                        <div>Price: ${crop.price}/ton</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {selectedCrop && (
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
                                        <div key={step} className={`text-xs font-medium ${index <= stepIndex ? 'text-green-600' : 'text-gray-400'}`}>
                                            {layerData[step].name.split(' ')[0]}
                                        </div>
                                    ))}
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-600 transition-all duration-500"
                                        style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}></div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="font-semibold text-lg mb-4">Step 3: Current Processing Step</h3>
                                <div className="bg-gradient-to-br from-green-50 to-yellow-50 rounded-xl p-6 border-2 border-green-200">
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="text-xl font-bold text-green-900">{currentLayerData.name}</h4>
                                        <span className="px-3 py-1 bg-green-600 text-white rounded-full text-sm font-semibold">
                                            Step {stepIndex + 1}/{steps.length}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-white rounded-lg p-4">
                                            <div className="flex justify-between items-center mb-3">
                                                <h5 className="font-semibold">Feature Values</h5>
                                                <button onClick={() => setShowPixelValues(!showPixelValues)}
                                                    className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded">
                                                    {showPixelValues ? 'Hide Values' : 'Show Values'}
                                                </button>
                                            </div>

                                            {currentStep === 'input' && showPixelValues && (
                                                <div className="space-y-2">
                                                    <div className="flex justify-between items-center p-2 bg-orange-50 rounded">
                                                        <span className="text-sm">Rainfall</span>
                                                        <span className="font-mono font-bold">{selectedCrop.features.rainfall} mm</span>
                                                    </div>
                                                    <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                                                        <span className="text-sm">Temperature</span>
                                                        <span className="font-mono font-bold">{selectedCrop.features.temp}°C</span>
                                                    </div>
                                                    <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                                                        <span className="text-sm">Demand</span>
                                                        <span className="font-mono font-bold">{selectedCrop.features.demand}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                                                        <span className="text-sm">Season</span>
                                                        <span className="font-mono font-bold capitalize">{selectedCrop.features.season}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center p-2 bg-purple-50 rounded">
                                                        <span className="text-sm">Fuel Cost</span>
                                                        <span className="font-mono font-bold">${selectedCrop.features.fuel}</span>
                                                    </div>
                                                </div>
                                            )}

                                            {currentStep === 'normalize' && showPixelValues && (
                                                <div className="space-y-2">
                                                    {['Rainfall', 'Temperature', 'Demand', 'Season', 'Fuel'].map((name, i) => {
                                                        const val = getNormalizedFeatures()[i]
                                                        return (
                                                            <div key={i} className="space-y-1">
                                                                <div className="flex justify-between text-xs">
                                                                    <span>{name}</span>
                                                                    <span className="font-mono font-bold">{val}</span>
                                                                </div>
                                                                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                                                                    <div className="h-full bg-gradient-to-r from-yellow-400 to-green-500"
                                                                        style={{ width: `${val * 100}%` }}></div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            )}

                                            {currentStep === 'linear' && showPixelValues && (
                                                <div className="space-y-2">
                                                    <p className="text-xs font-semibold mb-2">Weighted Combination:</p>
                                                    {getNormalizedFeatures().map((val, i) => {
                                                        const weight = getWeights()[i]
                                                        const contribution = val * weight
                                                        return (
                                                            <div key={i} className="text-xs font-mono p-2 bg-gray-50 rounded">
                                                                {val.toFixed(2)} × {weight.toFixed(2)} = {contribution.toFixed(3)}
                                                            </div>
                                                        )
                                                    })}
                                                    <div className="mt-2 p-2 bg-green-100 rounded font-semibold text-sm">
                                                        Sum = {getNormalizedFeatures().reduce((acc, val, i) => acc + val * getWeights()[i], 0).toFixed(3)}
                                                    </div>
                                                </div>
                                            )}

                                            {currentStep === 'output' && (
                                                <div className="space-y-3">
                                                    <div className="p-4 bg-green-100 rounded-lg text-center">
                                                        <p className="text-sm text-gray-600 mb-1">Predicted Price</p>
                                                        <p className="text-3xl font-bold text-green-700">${calculatePrediction()}</p>
                                                        <p className="text-xs text-gray-500 mt-1">per ton</p>
                                                    </div>
                                                    <div className="p-3 bg-blue-50 rounded">
                                                        <p className="text-xs font-semibold mb-1">Actual Price</p>
                                                        <p className="text-lg font-bold text-blue-700">${selectedCrop.price}/ton</p>
                                                    </div>
                                                    <div className="p-3 bg-gray-50 rounded">
                                                        <p className="text-xs font-semibold mb-1">Error</p>
                                                        <p className="text-sm font-mono">
                                                            {Math.abs(calculatePrediction() - selectedCrop.price).toFixed(2)}
                                                            ({((Math.abs(calculatePrediction() - selectedCrop.price) / selectedCrop.price) * 100).toFixed(1)}%)
                                                        </p>
                                                    </div>
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
                                            {currentStep === 'normalize' && (
                                                <div>
                                                    <BlockMath math="x_{norm} = \frac{x - x_{min}}{x_{max} - x_{min}}" />
                                                    <p className="text-xs text-gray-600 mt-2">
                                                        Min-Max normalization scales features to [0,1] range
                                                    </p>
                                                </div>
                                            )}
                                            {currentStep === 'linear' && (
                                                <div>
                                                    <BlockMath math="y = w_1x_1 + w_2x_2 + w_3x_3 + w_4x_4 + w_5x_5 + b" />
                                                    <p className="text-xs text-gray-600 mt-2">
                                                        Linear combination: weighted sum of normalized features
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="font-semibold text-lg mb-4">Step 4: Processing Data Table</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow">
                                        <thead>
                                            <tr className="bg-gray-100">
                                                <th className="border px-4 py-3 text-left text-sm font-semibold">Step</th>
                                                <th className="border px-4 py-3 text-left text-sm font-semibold">Operation</th>
                                                <th className="border px-4 py-3 text-left text-sm font-semibold">Input</th>
                                                <th className="border px-4 py-3 text-left text-sm font-semibold">Output</th>
                                                <th className="border px-4 py-3 text-left text-sm font-semibold">Parameters</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {steps.map((step, index) => {
                                                const layer = layerData[step]
                                                const isActive = step === currentStep
                                                const isPassed = index < stepIndex
                                                return (
                                                    <tr key={step} className={`transition-all duration-300 ${isActive ? 'bg-green-100 border-l-4 border-l-green-600' : isPassed ? 'bg-green-50' : 'bg-white hover:bg-gray-50'
                                                        }`}>
                                                        <td className="border px-4 py-3">
                                                            <div className="flex items-center gap-2">
                                                                {isActive && <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>}
                                                                {isPassed && !isActive && <div className="w-2 h-2 bg-green-600 rounded-full"></div>}
                                                                <span className={`font-medium ${isActive ? 'text-green-900' : 'text-gray-900'}`}>
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
