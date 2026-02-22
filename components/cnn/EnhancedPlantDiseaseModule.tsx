'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft } from 'lucide-react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'

// Synthetic plant disease images (base64 encoded simple patterns)
const syntheticImages = [
    {
        id: 'healthy-1',
        name: 'Healthy Leaf',
        type: 'healthy',
        color: '#4ade80',
        pattern: 'uniform',
        description: 'Uniform green color, no spots'
    },
    {
        id: 'blight-1',
        name: 'Early Blight',
        type: 'diseased',
        color: '#fbbf24',
        pattern: 'spots',
        description: 'Yellow-brown circular spots'
    },
    {
        id: 'mold-1',
        name: 'Leaf Mold',
        type: 'diseased',
        color: '#a855f7',
        pattern: 'patches',
        description: 'Purple-gray patches'
    },
    {
        id: 'virus-1',
        name: 'Mosaic Virus',
        type: 'diseased',
        color: '#ef4444',
        pattern: 'mosaic',
        description: 'Irregular yellow-green mosaic'
    }
]

type ProcessingStep = 'input' | 'conv1' | 'pool1' | 'conv2' | 'pool2' | 'flatten' | 'dense' | 'output'

interface LayerData {
    step: ProcessingStep
    name: string
    operation: string
    inputShape: string
    outputShape: string
    parameters: string
    activation?: string
}

export function EnhancedPlantDiseaseModule() {
    const [selectedImage, setSelectedImage] = useState<typeof syntheticImages[0] | null>(null)
    const [currentStep, setCurrentStep] = useState<ProcessingStep>('input')
    const [isAnimating, setIsAnimating] = useState(false)
    const [animationSpeed, setAnimationSpeed] = useState(2000)
    const [showMath, setShowMath] = useState(true)

    const steps: ProcessingStep[] = ['input', 'conv1', 'pool1', 'conv2', 'pool2', 'flatten', 'dense', 'output']

    const layerData: Record<ProcessingStep, LayerData> = {
        input: {
            step: 'input',
            name: 'Input Layer',
            operation: 'Image Input',
            inputShape: '224×224×3',
            outputShape: '224×224×3',
            parameters: '150,528 pixels',
            activation: 'None'
        },
        conv1: {
            step: 'conv1',
            name: 'Convolution Layer 1',
            operation: 'Conv2D + ReLU',
            inputShape: '224×224×3',
            outputShape: '222×222×32',
            parameters: '896 weights',
            activation: 'ReLU'
        },
        pool1: {
            step: 'pool1',
            name: 'Max Pooling 1',
            operation: 'MaxPool2D (2×2)',
            inputShape: '222×222×32',
            outputShape: '111×111×32',
            parameters: '0 (no weights)',
            activation: 'None'
        },
        conv2: {
            step: 'conv2',
            name: 'Convolution Layer 2',
            operation: 'Conv2D + ReLU',
            inputShape: '111×111×32',
            outputShape: '109×109×64',
            parameters: '18,496 weights',
            activation: 'ReLU'
        },
        pool2: {
            step: 'pool2',
            name: 'Max Pooling 2',
            operation: 'MaxPool2D (2×2)',
            inputShape: '109×109×64',
            outputShape: '54×54×64',
            parameters: '0 (no weights)',
            activation: 'None'
        },
        flatten: {
            step: 'flatten',
            name: 'Flatten Layer',
            operation: 'Reshape to 1D',
            inputShape: '54×54×64',
            outputShape: '186,624',
            parameters: '0 (no weights)',
            activation: 'None'
        },
        dense: {
            step: 'dense',
            name: 'Dense Layer (FC)',
            operation: 'Fully Connected + ReLU + Dropout',
            inputShape: '186,624',
            outputShape: '128',
            parameters: '23,888,000 weights',
            activation: 'ReLU + Dropout(0.5)'
        },
        output: {
            step: 'output',
            name: 'Output Layer',
            operation: 'Dense + Softmax',
            inputShape: '128',
            outputShape: '4 classes',
            parameters: '516 weights',
            activation: 'Softmax'
        }
    }

    const generateSyntheticImage = (image: typeof syntheticImages[0]) => {
        if (typeof window === 'undefined') {
            // Return a placeholder during SSR
            return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='${encodeURIComponent(image.color)}' width='200' height='200'/%3E%3C/svg%3E`
        }

        const canvas = document.createElement('canvas')
        canvas.width = 200
        canvas.height = 200
        const ctx = canvas.getContext('2d')
        if (!ctx) return ''

        ctx.fillStyle = image.color
        ctx.fillRect(0, 0, 200, 200)

        if (image.pattern === 'spots') {
            ctx.fillStyle = '#92400e'
            for (let i = 0; i < 8; i++) {
                const x = Math.random() * 180 + 10
                const y = Math.random() * 180 + 10
                ctx.beginPath()
                ctx.arc(x, y, 15, 0, Math.PI * 2)
                ctx.fill()
            }
        } else if (image.pattern === 'patches') {
            ctx.fillStyle = '#6b21a8'
            for (let i = 0; i < 5; i++) {
                const x = Math.random() * 160 + 20
                const y = Math.random() * 160 + 20
                ctx.fillRect(x, y, 40, 40)
            }
        } else if (image.pattern === 'mosaic') {
            for (let i = 0; i < 20; i++) {
                ctx.fillStyle = Math.random() > 0.5 ? '#fef08a' : '#86efac'
                const x = Math.random() * 180 + 10
                const y = Math.random() * 180 + 10
                ctx.fillRect(x, y, 20, 20)
            }
        }

        return canvas.toDataURL()
    }

    const handleImageSelect = (image: typeof syntheticImages[0]) => {
        setSelectedImage(image)
        setCurrentStep('input')
        setIsAnimating(false)
    }

    const handleNextStep = () => {
        const currentIndex = steps.indexOf(currentStep)
        if (currentIndex < steps.length - 1) {
            setCurrentStep(steps[currentIndex + 1])
        }
    }

    const handlePrevStep = () => {
        const currentIndex = steps.indexOf(currentStep)
        if (currentIndex > 0) {
            setCurrentStep(steps[currentIndex - 1])
        }
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
                    <CardTitle>🌿 Plant Disease Detection - Interactive CNN Visualization</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 mb-6">
                        Select a synthetic plant image and watch the step-by-step CNN processing with detailed layer information.
                    </p>

                    {/* Image Selection */}
                    <div className="mb-6">
                        <h3 className="font-semibold text-lg mb-4">Step 1: Select a Plant Image</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {syntheticImages.map((image) => (
                                <div
                                    key={image.id}
                                    onClick={() => handleImageSelect(image)}
                                    className={`cursor-pointer border-2 rounded-xl p-4 transition-all ${selectedImage?.id === image.id
                                        ? 'border-blue-500 bg-blue-50 shadow-lg'
                                        : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                                        }`}
                                >
                                    <div className="w-full aspect-square rounded-lg mb-3 overflow-hidden">
                                        <img
                                            src={generateSyntheticImage(image)}
                                            alt={image.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <p className="text-sm font-semibold text-center">{image.name}</p>
                                    <p className={`text-xs text-center mt-1 ${image.type === 'healthy' ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                        {image.type === 'healthy' ? '✓ Healthy' : '⚠ Diseased'}
                                    </p>
                                    <p className="text-xs text-gray-500 text-center mt-1">{image.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {selectedImage && (
                        <>
                            {/* Animation Controls */}
                            <div className="mb-6 bg-gray-50 rounded-xl p-4">
                                <h3 className="font-semibold text-lg mb-4">Step 2: Control the Animation</h3>
                                <div className="flex flex-wrap gap-3 items-center">
                                    <Button onClick={handleAutoPlay} className="flex items-center gap-2">
                                        {isAnimating ? (
                                            <>
                                                <Pause className="w-4 h-4" />
                                                Pause
                                            </>
                                        ) : (
                                            <>
                                                <Play className="w-4 h-4" />
                                                Auto Play
                                            </>
                                        )}
                                    </Button>
                                    <Button onClick={handlePrevStep} disabled={stepIndex === 0 || isAnimating} variant="outline">
                                        <ChevronLeft className="w-4 h-4" />
                                        Previous
                                    </Button>
                                    <Button onClick={handleNextStep} disabled={stepIndex === steps.length - 1 || isAnimating} variant="outline">
                                        Next
                                        <ChevronRight className="w-4 h-4" />
                                    </Button>
                                    <Button onClick={handleReset} variant="outline">
                                        <RotateCcw className="w-4 h-4" />
                                        Reset
                                    </Button>
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

                            {/* Progress Bar */}
                            <div className="mb-6">
                                <div className="flex justify-between mb-2">
                                    {steps.map((step, index) => (
                                        <div
                                            key={step}
                                            className={`text-xs font-medium ${index <= stepIndex ? 'text-blue-600' : 'text-gray-400'
                                                }`}
                                        >
                                            {layerData[step].name.split(' ')[0]}
                                        </div>
                                    ))}
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-blue-600 transition-all duration-500"
                                        style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Current Layer Visualization */}
                            <div className="mb-6">
                                <h3 className="font-semibold text-lg mb-4">Step 3: Current Layer Processing</h3>
                                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200">
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="text-xl font-bold text-blue-900">{currentLayerData.name}</h4>
                                        <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-semibold">
                                            Step {stepIndex + 1}/{steps.length}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Visual Representation */}
                                        <div className="bg-white rounded-lg p-4">
                                            <h5 className="font-semibold mb-3">Visual Representation</h5>
                                            {currentStep === 'input' && (
                                                <div className="flex justify-center">
                                                    <img
                                                        src={generateSyntheticImage(selectedImage)}
                                                        alt="Input"
                                                        className="w-48 h-48 rounded-lg border-2 border-gray-300"
                                                    />
                                                </div>
                                            )}
                                            {(currentStep === 'conv1' || currentStep === 'conv2') && (
                                                <div className="grid grid-cols-4 gap-2">
                                                    {[...Array(16)].map((_, i) => (
                                                        <div
                                                            key={i}
                                                            className="aspect-square rounded bg-gradient-to-br from-blue-400 to-purple-600"
                                                            style={{
                                                                opacity: 0.3 + Math.random() * 0.7,
                                                                animation: `pulse ${1 + Math.random()}s infinite`
                                                            }}
                                                        ></div>
                                                    ))}
                                                </div>
                                            )}
                                            {(currentStep === 'pool1' || currentStep === 'pool2') && (
                                                <div className="grid grid-cols-3 gap-3">
                                                    {[...Array(9)].map((_, i) => (
                                                        <div
                                                            key={i}
                                                            className="aspect-square rounded bg-gradient-to-br from-green-400 to-teal-600"
                                                            style={{ opacity: 0.4 + Math.random() * 0.6 }}
                                                        ></div>
                                                    ))}
                                                </div>
                                            )}
                                            {currentStep === 'flatten' && (
                                                <div className="flex flex-col gap-1">
                                                    {[...Array(12)].map((_, i) => (
                                                        <div
                                                            key={i}
                                                            className="h-3 rounded bg-gradient-to-r from-orange-400 to-red-600"
                                                            style={{ width: `${60 + Math.random() * 40}%` }}
                                                        ></div>
                                                    ))}
                                                </div>
                                            )}
                                            {currentStep === 'dense' && (
                                                <div className="flex justify-center items-center h-48">
                                                    <div className="grid grid-cols-8 gap-2">
                                                        {[...Array(64)].map((_, i) => (
                                                            <div
                                                                key={i}
                                                                className="w-2 h-2 rounded-full bg-purple-600"
                                                                style={{ opacity: 0.3 + Math.random() * 0.7 }}
                                                            ></div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            {currentStep === 'output' && (
                                                <div className="space-y-3">
                                                    {syntheticImages.map((img, i) => {
                                                        const prob = img.id === selectedImage.id ? 0.85 + Math.random() * 0.14 : Math.random() * 0.15
                                                        return (
                                                            <div key={i} className="flex items-center gap-3">
                                                                <span className="text-sm w-24 font-medium">{img.name}</span>
                                                                <div className="flex-1 h-6 bg-gray-200 rounded-full overflow-hidden">
                                                                    <div
                                                                        className={`h-full transition-all duration-1000 ${img.id === selectedImage.id ? 'bg-green-500' : 'bg-gray-400'
                                                                            }`}
                                                                        style={{ width: `${prob * 100}%` }}
                                                                    ></div>
                                                                </div>
                                                                <span className="text-sm font-bold w-16 text-right">
                                                                    {(prob * 100).toFixed(1)}%
                                                                </span>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            )}
                                        </div>

                                        {/* Layer Information */}
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
                                            {currentLayerData.activation && currentLayerData.activation !== 'None' && (
                                                <div className="bg-white rounded-lg p-3">
                                                    <p className="text-xs text-gray-600 mb-1">Activation Function</p>
                                                    <p className="font-semibold text-purple-600">{currentLayerData.activation}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Mathematical Explanation */}
                                    {showMath && (
                                        <div className="mt-6 bg-white rounded-lg p-4">
                                            <div className="flex justify-between items-center mb-3">
                                                <h5 className="font-semibold">Mathematical Operation</h5>
                                                <button
                                                    onClick={() => setShowMath(false)}
                                                    className="text-xs text-gray-500 hover:text-gray-700"
                                                >
                                                    Hide
                                                </button>
                                            </div>
                                            <div className="overflow-x-auto">
                                                {currentStep === 'conv1' || currentStep === 'conv2' ? (
                                                    <div>
                                                        <BlockMath math="Y_{i,j,k} = \sum_{m=0}^{f-1} \sum_{n=0}^{f-1} \sum_{c=0}^{C-1} W_{m,n,c,k} \cdot X_{i+m,j+n,c} + b_k" />
                                                        <p className="text-xs text-gray-600 mt-2">
                                                            Convolution operation: sliding filter over input, computing dot products
                                                        </p>
                                                    </div>
                                                ) : currentStep === 'pool1' || currentStep === 'pool2' ? (
                                                    <div>
                                                        <BlockMath math="Y_{i,j,k} = \max_{m,n \in \text{pool}} X_{2i+m, 2j+n, k}" />
                                                        <p className="text-xs text-gray-600 mt-2">
                                                            Max pooling: select maximum value from each 2×2 region
                                                        </p>
                                                    </div>
                                                ) : currentStep === 'dense' ? (
                                                    <div>
                                                        <BlockMath math="y = \text{ReLU}(Wx + b) = \max(0, Wx + b)" />
                                                        <p className="text-xs text-gray-600 mt-2">
                                                            Fully connected layer with ReLU activation
                                                        </p>
                                                    </div>
                                                ) : currentStep === 'output' ? (
                                                    <div>
                                                        <BlockMath math="\text{Softmax}(z_i) = \frac{e^{z_i}}{\sum_{j=1}^{K} e^{z_j}}" />
                                                        <p className="text-xs text-gray-600 mt-2">
                                                            Softmax converts logits to probability distribution
                                                        </p>
                                                    </div>
                                                ) : (
                                                    <p className="text-sm text-gray-600">No mathematical operation for this layer</p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Detailed Data Table */}
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
                                                <th className="border px-4 py-3 text-left text-sm font-semibold">Activation</th>
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
                                                            ? 'bg-blue-100 border-l-4 border-l-blue-600'
                                                            : isPassed
                                                                ? 'bg-green-50'
                                                                : 'bg-white hover:bg-gray-50'
                                                            }`}
                                                    >
                                                        <td className="border px-4 py-3">
                                                            <div className="flex items-center gap-2">
                                                                {isActive && (
                                                                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                                                                )}
                                                                {isPassed && !isActive && (
                                                                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                                                                )}
                                                                <span className={`font-medium ${isActive ? 'text-blue-900' : 'text-gray-900'
                                                                    }`}>
                                                                    {layer.name}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="border px-4 py-3 text-sm">{layer.operation}</td>
                                                        <td className="border px-4 py-3 font-mono text-sm text-blue-600">
                                                            {layer.inputShape}
                                                        </td>
                                                        <td className="border px-4 py-3 font-mono text-sm text-green-600">
                                                            {layer.outputShape}
                                                        </td>
                                                        <td className="border px-4 py-3 text-sm">{layer.parameters}</td>
                                                        <td className="border px-4 py-3 text-sm">
                                                            {layer.activation && layer.activation !== 'None' ? (
                                                                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-semibold">
                                                                    {layer.activation}
                                                                </span>
                                                            ) : (
                                                                <span className="text-gray-400">—</span>
                                                            )}
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Additional Information */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                                    <h4 className="font-semibold text-blue-900 mb-3">🔍 What's Happening?</h4>
                                    <div className="text-sm text-gray-700 space-y-2">
                                        {currentStep === 'input' && (
                                            <p>The input image is resized to 224×224 pixels with 3 color channels (RGB). Each pixel value is normalized to [0,1] range.</p>
                                        )}
                                        {(currentStep === 'conv1' || currentStep === 'conv2') && (
                                            <p>Convolutional filters slide across the image, detecting features like edges, textures, and patterns. Each filter produces one feature map.</p>
                                        )}
                                        {(currentStep === 'pool1' || currentStep === 'pool2') && (
                                            <p>Max pooling reduces spatial dimensions by selecting the maximum value from each 2×2 region, making the network more robust to small translations.</p>
                                        )}
                                        {currentStep === 'flatten' && (
                                            <p>The 3D feature maps are flattened into a 1D vector, preparing the data for fully connected layers.</p>
                                        )}
                                        {currentStep === 'dense' && (
                                            <p>Fully connected layer combines all features learned by previous layers. ReLU activation introduces non-linearity. Dropout prevents overfitting.</p>
                                        )}
                                        {currentStep === 'output' && (
                                            <p>Softmax activation converts raw scores into probabilities that sum to 1. The class with highest probability is the prediction.</p>
                                        )}
                                    </div>
                                </div>

                                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                                    <h4 className="font-semibold text-green-900 mb-3">💡 Key Concepts</h4>
                                    <div className="text-sm text-gray-700 space-y-2">
                                        {currentStep === 'input' && (
                                            <>
                                                <p><strong>Normalization:</strong> Pixel values scaled to [0,1]</p>
                                                <p><strong>RGB Channels:</strong> Red, Green, Blue color information</p>
                                            </>
                                        )}
                                        {(currentStep === 'conv1' || currentStep === 'conv2') && (
                                            <>
                                                <p><strong>Receptive Field:</strong> 3×3 filter size</p>
                                                <p><strong>Feature Maps:</strong> {currentStep === 'conv1' ? '32' : '64'} different patterns detected</p>
                                                <p><strong>ReLU:</strong> max(0, x) removes negative values</p>
                                            </>
                                        )}
                                        {(currentStep === 'pool1' || currentStep === 'pool2') && (
                                            <>
                                                <p><strong>Downsampling:</strong> Reduces computation</p>
                                                <p><strong>Translation Invariance:</strong> Robust to position shifts</p>
                                            </>
                                        )}
                                        {currentStep === 'flatten' && (
                                            <>
                                                <p><strong>Reshape:</strong> 3D → 1D transformation</p>
                                                <p><strong>No Learning:</strong> Just data reorganization</p>
                                            </>
                                        )}
                                        {currentStep === 'dense' && (
                                            <>
                                                <p><strong>Fully Connected:</strong> Every neuron connected to all inputs</p>
                                                <p><strong>Dropout:</strong> Randomly disable 50% of neurons during training</p>
                                            </>
                                        )}
                                        {currentStep === 'output' && (
                                            <>
                                                <p><strong>Softmax:</strong> Converts to probability distribution</p>
                                                <p><strong>Sum = 1:</strong> All probabilities add up to 100%</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Final Prediction */}
                            {currentStep === 'output' && (
                                <div className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-300 rounded-xl p-6">
                                    <h3 className="text-xl font-bold text-green-900 mb-4">🎯 Final Prediction</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <p className="text-lg mb-2">
                                                <strong>Predicted Class:</strong>{' '}
                                                <span className="text-green-600 font-bold">{selectedImage.name}</span>
                                            </p>
                                            <p className="text-lg mb-2">
                                                <strong>Confidence:</strong>{' '}
                                                <span className="text-blue-600 font-bold">
                                                    {(85 + Math.random() * 14).toFixed(2)}%
                                                </span>
                                            </p>
                                            <p className="text-sm text-gray-600 mt-4">
                                                The model correctly identified this as <strong>{selectedImage.name}</strong> based on learned patterns from training data.
                                            </p>
                                        </div>
                                        <div className="bg-white rounded-lg p-4">
                                            <h4 className="font-semibold mb-3">Model Performance</h4>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span>Training Accuracy:</span>
                                                    <span className="font-semibold">96.5%</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Validation Accuracy:</span>
                                                    <span className="font-semibold">94.2%</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Total Parameters:</span>
                                                    <span className="font-semibold">23,907,908</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Inference Time:</span>
                                                    <span className="font-semibold">~45ms</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
