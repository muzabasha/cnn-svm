'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft, Droplets, ThermometerSun, CloudRain } from 'lucide-react'
import { BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'

const sensorScenarios = [
    {
        id: 'dry-hot',
        name: 'Dry & Hot Day',
        icon: '🌵',
        sensors: { moisture: 25, temperature: 38, rainfall: 0 },
        decision: 'WATER',
        description: 'Low moisture, high temp, no rain'
    },
    {
        id: 'optimal',
        name: 'Optimal Conditions',
        icon: '🌱',
        sensors: { moisture: 65, temperature: 28, rainfall: 5 },
        decision: 'NO_WATER',
        description: 'Good moisture, moderate temp'
    },
    {
        id: 'rainy',
        name: 'Rainy Season',
        icon: '🌧️',
        sensors: { moisture: 80, temperature: 24, rainfall: 45 },
        decision: 'NO_WATER',
        description: 'High moisture, recent rainfall'
    },
    {
        id: 'moderate',
        name: 'Moderate Dry',
        icon: '🌾',
        sensors: { moisture: 45, temperature: 32, rainfall: 2 },
        decision: 'WATER',
        description: 'Moderate moisture, warm temp'
    }
]

type ProcessingStep = 'sensors' | 'normalize' | 'decision_tree' | 'output'

interface LayerData {
    step: ProcessingStep
    name: string
    operation: string
    inputShape: string
    outputShape: string
    parameters: string
}

interface DecisionNode {
    feature: string
    threshold: number
    left?: DecisionNode | string
    right?: DecisionNode | string
}

export function SmartIrrigationSystem() {
    const [selectedScenario, setSelectedScenario] = useState<typeof sensorScenarios[0] | null>(null)
    const [currentStep, setCurrentStep] = useState<ProcessingStep>('sensors')
    const [isAnimating, setIsAnimating] = useState(false)
    const [animationSpeed, setAnimationSpeed] = useState(3000)
    const [showPixelValues, setShowPixelValues] = useState(true)
    const [decisionPath, setDecisionPath] = useState<string[]>([])

    const steps: ProcessingStep[] = ['sensors', 'normalize', 'decision_tree', 'output']

    const layerData: Record<ProcessingStep, LayerData> = {
        sensors: {
            step: 'sensors',
            name: 'IoT Sensors',
            operation: 'Data Collection',
            inputShape: 'Physical sensors',
            outputShape: '3 readings',
            parameters: 'Moisture, Temp, Rainfall'
        },
        normalize: {
            step: 'normalize',
            name: 'Data Normalization',
            operation: 'Feature Scaling',
            inputShape: '3 readings',
            outputShape: '3 normalized',
            parameters: 'Scale to [0,1]'
        },
        decision_tree: {
            step: 'decision_tree',
            name: 'Decision Tree',
            operation: 'Rule-Based Classification',
            inputShape: '3 features',
            outputShape: 'Decision path',
            parameters: '3 decision nodes'
        },
        output: {
            step: 'output',
            name: 'Irrigation Control',
            operation: 'Actuator Command',
            inputShape: 'Decision',
            outputShape: 'Action',
            parameters: 'WATER / NO_WATER'
        }
    }

    // Decision Tree Structure
    const decisionTree: DecisionNode = {
        feature: 'moisture',
        threshold: 50,
        left: {
            feature: 'temperature',
            threshold: 30,
            left: 'NO_WATER',
            right: 'WATER'
        },
        right: {
            feature: 'rainfall',
            threshold: 10,
            left: 'NO_WATER',
            right: 'NO_WATER'
        }
    }

    const normalizeValue = (val: number, min: number, max: number) =>
        Number(((val - min) / (max - min)).toFixed(2))

    const getNormalizedSensors = () => {
        if (!selectedScenario) return []
        return [
            normalizeValue(selectedScenario.sensors.moisture, 0, 100),
            normalizeValue(selectedScenario.sensors.temperature, 15, 45),
            normalizeValue(selectedScenario.sensors.rainfall, 0, 100)
        ]
    }

    const traverseDecisionTree = (node: DecisionNode | string, sensors: any, path: string[] = []): { decision: string, path: string[] } => {
        if (typeof node === 'string') {
            return { decision: node, path }
        }

        const value = sensors[node.feature]
        const threshold = node.threshold

        if (value < threshold) {
            path.push(`${node.feature} < ${threshold}? YES`)
            return traverseDecisionTree(node.left!, sensors, path)
        } else {
            path.push(`${node.feature} < ${threshold}? NO`)
            return traverseDecisionTree(node.right!, sensors, path)
        }
    }

    const getDecision = () => {
        if (!selectedScenario) return { decision: 'NO_WATER', path: [] }
        const result = traverseDecisionTree(decisionTree, selectedScenario.sensors, [])
        return result
    }

    const handleScenarioSelect = (scenario: typeof sensorScenarios[0]) => {
        setSelectedScenario(scenario)
        setCurrentStep('sensors')
        setIsAnimating(false)
        const result = traverseDecisionTree(decisionTree, scenario.sensors, [])
        setDecisionPath(result.path)
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
        setCurrentStep('sensors')
        setIsAnimating(false)
    }

    const handleAutoPlay = () => {
        if (isAnimating) {
            setIsAnimating(false)
            return
        }
        setIsAnimating(true)
        setCurrentStep('sensors')
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
                    <CardTitle>💧 Smart Irrigation System - IoT Decision Making</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 mb-6">
                        Simulate an IoT system that uses sensor data and decision trees to optimize crop watering.
                    </p>

                    <div className="mb-6">
                        <h3 className="font-semibold text-lg mb-4">Step 1: Select Sensor Scenario</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {sensorScenarios.map((scenario) => (
                                <div
                                    key={scenario.id}
                                    onClick={() => handleScenarioSelect(scenario)}
                                    className={`cursor-pointer border-2 rounded-xl p-4 transition-all ${selectedScenario?.id === scenario.id
                                            ? 'border-green-500 bg-green-50 shadow-lg'
                                            : 'border-gray-200 hover:border-green-300'
                                        }`}
                                >
                                    <div className="text-4xl mb-2 text-center">{scenario.icon}</div>
                                    <p className="text-sm font-semibold text-center">{scenario.name}</p>
                                    <p className="text-xs text-gray-500 text-center mt-1">{scenario.description}</p>
                                    <div className="mt-2 space-y-1 text-xs">
                                        <div className="flex justify-between">
                                            <span>Moisture:</span>
                                            <span className="font-bold">{scenario.sensors.moisture}%</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Temp:</span>
                                            <span className="font-bold">{scenario.sensors.temperature}°C</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Rain:</span>
                                            <span className="font-bold">{scenario.sensors.rainfall}mm</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {selectedScenario && (
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
                                        <select
                                            value={animationSpeed}
                                            onChange={(e) => setAnimationSpeed(Number(e.target.value))}
                                            className="border rounded px-3 py-1 text-sm"
                                            disabled={isAnimating}
                                        >
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
                                        <div
                                            key={step}
                                            className={`text-xs font-medium ${index <= stepIndex ? 'text-green-600' : 'text-gray-400'
                                                }`}
                                        >
                                            {layerData[step].name.split(' ')[0]}
                                        </div>
                                    ))}
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-green-600 transition-all duration-500"
                                        style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="font-semibold text-lg mb-4">Step 3: Current Processing Step</h3>
                                <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border-2 border-green-200">
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="text-xl font-bold text-green-900">{currentLayerData.name}</h4>
                                        <span className="px-3 py-1 bg-green-600 text-white rounded-full text-sm font-semibold">
                                            Step {stepIndex + 1}/{steps.length}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-white rounded-lg p-4">
                                            <div className="flex justify-between items-center mb-3">
                                                <h5 className="font-semibold">Sensor Data</h5>
                                                <button
                                                    onClick={() => setShowPixelValues(!showPixelValues)}
                                                    className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded"
                                                >
                                                    {showPixelValues ? 'Hide Values' : 'Show Values'}
                                                </button>
                                            </div>

                                            {currentStep === 'sensors' && showPixelValues && (
                                                <div className="space-y-3">
                                                    <div className="p-3 bg-blue-50 rounded-lg">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <Droplets className="w-5 h-5 text-blue-600" />
                                                            <span className="text-sm font-semibold">Soil Moisture</span>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex-1 h-6 bg-gray-200 rounded-full overflow-hidden">
                                                                <div
                                                                    className="h-full bg-blue-500 transition-all"
                                                                    style={{ width: `${selectedScenario.sensors.moisture}%` }}
                                                                ></div>
                                                            </div>
                                                            <span className="font-mono font-bold text-lg w-16 text-right">
                                                                {selectedScenario.sensors.moisture}%
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="p-3 bg-orange-50 rounded-lg">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <ThermometerSun className="w-5 h-5 text-orange-600" />
                                                            <span className="text-sm font-semibold">Temperature</span>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex-1 h-6 bg-gray-200 rounded-full overflow-hidden">
                                                                <div
                                                                    className="h-full bg-orange-500 transition-all"
                                                                    style={{ width: `${(selectedScenario.sensors.temperature / 45) * 100}%` }}
                                                                ></div>
                                                            </div>
                                                            <span className="font-mono font-bold text-lg w-16 text-right">
                                                                {selectedScenario.sensors.temperature}°C
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="p-3 bg-purple-50 rounded-lg">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <CloudRain className="w-5 h-5 text-purple-600" />
                                                            <span className="text-sm font-semibold">Rainfall (24h)</span>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex-1 h-6 bg-gray-200 rounded-full overflow-hidden">
                                                                <div
                                                                    className="h-full bg-purple-500 transition-all"
                                                                    style={{ width: `${(selectedScenario.sensors.rainfall / 100) * 100}%` }}
                                                                ></div>
                                                            </div>
                                                            <span className="font-mono font-bold text-lg w-16 text-right">
                                                                {selectedScenario.sensors.rainfall}mm
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {currentStep === 'normalize' && showPixelValues && (
                                                <div className="space-y-2">
                                                    {['Moisture', 'Temperature', 'Rainfall'].map((name, i) => {
                                                        const val = getNormalizedSensors()[i]
                                                        return (
                                                            <div key={i} className="space-y-1">
                                                                <div className="flex justify-between text-xs">
                                                                    <span className="font-semibold">{name}</span>
                                                                    <span className="font-mono font-bold">{val}</span>
                                                                </div>
                                                                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                                                                    <div
                                                                        className="h-full bg-gradient-to-r from-green-400 to-blue-500"
                                                                        style={{ width: `${val * 100}%` }}
                                                                    ></div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            )}

                                            {currentStep === 'decision_tree' && showPixelValues && (
                                                <div className="space-y-2">
                                                    <p className="text-xs font-semibold mb-3">Decision Path:</p>
                                                    {decisionPath.map((step, i) => (
                                                        <div
                                                            key={i}
                                                            className="flex items-center gap-2 p-2 bg-green-50 rounded border-l-4 border-green-500"
                                                        >
                                                            <span className="text-xs font-mono bg-green-200 px-2 py-1 rounded">
                                                                {i + 1}
                                                            </span>
                                                            <span className="text-sm">{step}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {currentStep === 'output' && (
                                                <div className="space-y-4">
                                                    <div className={`p-6 rounded-lg text-center ${getDecision().decision === 'WATER'
                                                            ? 'bg-blue-100 border-2 border-blue-500'
                                                            : 'bg-gray-100 border-2 border-gray-400'
                                                        }`}>
                                                        <p className="text-sm text-gray-600 mb-2">Irrigation Decision</p>
                                                        <p className={`text-4xl font-bold ${getDecision().decision === 'WATER'
                                                                ? 'text-blue-700'
                                                                : 'text-gray-700'
                                                            }`}>
                                                            {getDecision().decision === 'WATER' ? '💧 WATER' : '🚫 NO WATER'}
                                                        </p>
                                                        <p className="text-xs text-gray-500 mt-2">
                                                            {getDecision().decision === 'WATER'
                                                                ? 'Activating irrigation system'
                                                                : 'Irrigation not needed'}
                                                        </p>
                                                    </div>

                                                    <div className="p-4 bg-gray-50 rounded">
                                                        <p className="text-xs font-semibold mb-2">System Status</p>
                                                        <div className="space-y-1 text-xs">
                                                            <div className="flex justify-between">
                                                                <span>Expected Decision:</span>
                                                                <span className="font-bold">{selectedScenario.decision}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span>Actual Decision:</span>
                                                                <span className="font-bold">{getDecision().decision}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span>Match:</span>
                                                                <span className={`font-bold ${selectedScenario.decision === getDecision().decision
                                                                        ? 'text-green-600'
                                                                        : 'text-red-600'
                                                                    }`}>
                                                                    {selectedScenario.decision === getDecision().decision ? '✓ Correct' : '✗ Mismatch'}
                                                                </span>
                                                            </div>
                                                        </div>
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
                                                <p className="text-xs text-gray-600 mb-1">Input</p>
                                                <p className="font-mono text-sm text-blue-600">{currentLayerData.inputShape}</p>
                                            </div>
                                            <div className="bg-white rounded-lg p-3">
                                                <p className="text-xs text-gray-600 mb-1">Output</p>
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
                                                        Min-Max normalization scales sensor readings to [0,1] range
                                                    </p>
                                                </div>
                                            )}
                                            {currentStep === 'decision_tree' && (
                                                <div>
                                                    <BlockMath math="\text{Decision} = \begin{cases} \text{WATER} & \text{if conditions met} \\ \text{NO\_WATER} & \text{otherwise} \end{cases}" />
                                                    <p className="text-xs text-gray-600 mt-2">
                                                        Decision tree uses if-then rules based on sensor thresholds
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
                                                    <tr
                                                        key={step}
                                                        className={`transition-all duration-300 ${isActive
                                                                ? 'bg-green-100 border-l-4 border-l-green-600'
                                                                : isPassed
                                                                    ? 'bg-green-50'
                                                                    : 'bg-white hover:bg-gray-50'
                                                            }`}
                                                    >
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

                            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                                <h4 className="font-semibold text-blue-900 mb-2">💡 How It Works</h4>
                                <ul className="text-sm text-blue-800 space-y-1">
                                    <li>• <strong>IoT Sensors</strong> continuously monitor soil moisture, temperature, and rainfall</li>
                                    <li>• <strong>Data Normalization</strong> scales readings to comparable ranges</li>
                                    <li>• <strong>Decision Tree</strong> applies learned rules to determine irrigation needs</li>
                                    <li>• <strong>Actuator Control</strong> activates or deactivates the irrigation system</li>
                                    <li>• This saves water, reduces costs, and optimizes crop health</li>
                                </ul>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
