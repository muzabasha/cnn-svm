'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft } from 'lucide-react'
import { BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'

const productData = [
    { id: 'electronics', name: 'Electronics', icon: '📱', features: { day: 'monday', holiday: 0, weather: 0.8, price: 49.99, promo: 0.20, stock: 150 }, demand: 245 },
    { id: 'groceries', name: 'Groceries', icon: '🛒', features: { day: 'saturday', holiday: 0, weather: 0.6, price: 12.99, promo: 0, stock: 500 }, demand: 680 },
    { id: 'clothing', name: 'Clothing', icon: '👕', features: { day: 'friday', holiday: 0, weather: 0.7, price: 29.99, promo: 0.30, stock: 200 }, demand: 320 },
    { id: 'home', name: 'Home Goods', icon: '🏠', features: { day: 'sunday', holiday: 1, weather: 0.5, price: 89.99, promo: 0.15, stock: 80 }, demand: 156 }
]

type ProcessingStep = 'input' | 'scaling' | 'regression' | 'output'

interface LayerData {
    step: ProcessingStep
    name: string
    operation: string
    inputShape: string
    outputShape: string
    parameters: string
}

export function DemandPrediction() {
    const [selectedProduct, setSelectedProduct] = useState<typeof productData[0] | null>(null)
    const [currentStep, setCurrentStep] = useState<ProcessingStep>('input')
    const [isAnimating, setIsAnimating] = useState(false)
    const [animationSpeed, setAnimationSpeed] = useState(3000)
    const [showPixelValues, setShowPixelValues] = useState(true)

    const steps: ProcessingStep[] = ['input', 'scaling', 'regression', 'output']

    const layerData: Record<ProcessingStep, LayerData> = {
        input: { step: 'input', name: 'Input Features', operation: 'Raw Feature Collection', inputShape: '6 features', outputShape: '6 features', parameters: 'Day, Holiday, Weather, Price, Promo, Stock' },
        scaling: { step: 'scaling', name: 'Feature Scaling', operation: 'Standardization', inputShape: '6 features', outputShape: '6 features', parameters: 'Z-score normalization' },
        regression: { step: 'regression', name: 'Linear Regression', operation: 'Weighted Combination', inputShape: '6 features', outputShape: '1', parameters: '6 coefficients + intercept' },
        output: { step: 'output', name: 'Demand Forecast', operation: 'Prediction Output', inputShape: '1', outputShape: '1', parameters: 'Units demanded' }
    }

    const getDayEncoding = (day: string) => {
        const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
        return days.indexOf(day) / 6
    }

    const getScaledFeatures = () => {
        if (!selectedProduct) return []
        return [
            getDayEncoding(selectedProduct.features.day),
            selectedProduct.features.holiday,
            selectedProduct.features.weather,
            1 - (selectedProduct.features.price / 100),
            selectedProduct.features.promo,
            selectedProduct.features.stock / 500
        ]
    }

    const getCoefficients = () => [0.15, -0.45, 0.23, -0.67, 0.89, 0.34]

    const calculateDemand = () => {
        const scaled = getScaledFeatures()
        const coef = getCoefficients()
        const sum = scaled.reduce((acc, val, i) => acc + val * coef[i], 0)
        return Math.round((sum + 1) * 200)
    }

    const handleProductSelect = (product: typeof productData[0]) => {
        setSelectedProduct(product)
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
                    <CardTitle>📊 Demand Prediction - Multiple Regression Model</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 mb-6">
                        Select a product category and see how various factors predict customer demand.
                    </p>

                    <div className="mb-6">
                        <h3 className="font-semibold text-lg mb-4">Step 1: Select Product Category</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {productData.map((product) => (
                                <div key={product.id} onClick={() => handleProductSelect(product)}
                                    className={`cursor-pointer border-2 rounded-xl p-4 transition-all ${selectedProduct?.id === product.id ? 'border-blue-500 bg-blue-50 shadow-lg' : 'border-gray-200 hover:border-blue-300'
                                        }`}>
                                    <div className="text-4xl mb-2 text-center">{product.icon}</div>
                                    <p className="text-sm font-semibold text-center">{product.name}</p>
                                    <div className="mt-2 text-xs text-gray-600 space-y-1">
                                        <div>Price: ${product.features.price}</div>
                                        <div>Promo: {(product.features.promo * 100).toFixed(0)}%</div>
                                        <div>Demand: {product.demand} units</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {selectedProduct && (
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
                                <h3 className="font-semibold text-lg mb-4">Step 3: Current Processing Step</h3>
                                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200">
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="text-xl font-bold text-blue-900">{currentLayerData.name}</h4>
                                        <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-semibold">
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
                                                    <div className="flex justify-between items-center p-2 bg-purple-50 rounded">
                                                        <span className="text-sm">Day of Week</span>
                                                        <span className="font-mono font-bold capitalize">{selectedProduct.features.day}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                                                        <span className="text-sm">Holiday</span>
                                                        <span className="font-mono font-bold">{selectedProduct.features.holiday ? 'Yes' : 'No'}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                                                        <span className="text-sm">Weather</span>
                                                        <span className="font-mono font-bold">{selectedProduct.features.weather}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                                                        <span className="text-sm">Price</span>
                                                        <span className="font-mono font-bold">${selectedProduct.features.price}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                                                        <span className="text-sm">Promotion</span>
                                                        <span className="font-mono font-bold">{(selectedProduct.features.promo * 100).toFixed(0)}%</span>
                                                    </div>
                                                    <div className="flex justify-between items-center p-2 bg-orange-50 rounded">
                                                        <span className="text-sm">Stock Level</span>
                                                        <span className="font-mono font-bold">{selectedProduct.features.stock} units</span>
                                                    </div>
                                                </div>
                                            )}

                                            {currentStep === 'scaling' && showPixelValues && (
                                                <div className="space-y-2">
                                                    {['Day', 'Holiday', 'Weather', 'Price', 'Promo', 'Stock'].map((name, i) => {
                                                        const val = getScaledFeatures()[i]
                                                        return (
                                                            <div key={i} className="space-y-1">
                                                                <div className="flex justify-between text-xs">
                                                                    <span>{name}</span>
                                                                    <span className="font-mono font-bold">{val.toFixed(2)}</span>
                                                                </div>
                                                                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                                                                    <div className="h-full bg-gradient-to-r from-blue-400 to-purple-500"
                                                                        style={{ width: `${Math.abs(val) * 100}%` }}></div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            )}

                                            {currentStep === 'regression' && showPixelValues && (
                                                <div className="space-y-2">
                                                    <p className="text-xs font-semibold mb-2">Feature × Coefficient:</p>
                                                    {getScaledFeatures().map((val, i) => {
                                                        const coef = getCoefficients()[i]
                                                        const contribution = val * coef
                                                        return (
                                                            <div key={i} className="text-xs font-mono p-2 bg-gray-50 rounded flex justify-between">
                                                                <span>{val.toFixed(2)} × {coef.toFixed(2)}</span>
                                                                <span className="font-bold">{contribution.toFixed(3)}</span>
                                                            </div>
                                                        )
                                                    })}
                                                    <div className="mt-2 p-2 bg-blue-100 rounded font-semibold text-sm">
                                                        Sum = {getScaledFeatures().reduce((acc, val, i) => acc + val * getCoefficients()[i], 0).toFixed(3)}
                                                    </div>
                                                </div>
                                            )}

                                            {currentStep === 'output' && (
                                                <div className="space-y-3">
                                                    <div className="p-4 bg-blue-100 rounded-lg text-center">
                                                        <p className="text-sm text-gray-600 mb-1">Predicted Demand</p>
                                                        <p className="text-3xl font-bold text-blue-700">{calculateDemand()}</p>
                                                        <p className="text-xs text-gray-500 mt-1">units</p>
                                                    </div>
                                                    <div className="p-3 bg-green-50 rounded">
                                                        <p className="text-xs font-semibold mb-1">Actual Demand</p>
                                                        <p className="text-lg font-bold text-green-700">{selectedProduct.demand} units</p>
                                                    </div>
                                                    <div className="p-3 bg-gray-50 rounded">
                                                        <p className="text-xs font-semibold mb-1">Prediction Error</p>
                                                        <p className="text-sm font-mono">
                                                            {Math.abs(calculateDemand() - selectedProduct.demand)} units
                                                            ({((Math.abs(calculateDemand() - selectedProduct.demand) / selectedProduct.demand) * 100).toFixed(1)}%)
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
                                            {currentStep === 'scaling' && (
                                                <div>
                                                    <BlockMath math="z = \frac{x - \mu}{\sigma}" />
                                                    <p className="text-xs text-gray-600 mt-2">
                                                        Z-score standardization: centers data around mean with unit variance
                                                    </p>
                                                </div>
                                            )}
                                            {currentStep === 'regression' && (
                                                <div>
                                                    <BlockMath math="y = \beta_0 + \beta_1x_1 + \beta_2x_2 + ... + \beta_6x_6" />
                                                    <p className="text-xs text-gray-600 mt-2">
                                                        Multiple linear regression: combines all features with learned coefficients
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
