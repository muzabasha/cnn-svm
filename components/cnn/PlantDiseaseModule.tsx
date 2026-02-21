'use client'

import { useState, useRef } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Upload, Image as ImageIcon, Loader2 } from 'lucide-react'
import { InlineMath } from 'react-katex'

interface PredictionResult {
    class: string
    confidence: number
    isHealthy: boolean
}

interface LayerVisualization {
    name: string
    shape: string
    description: string
    imageData?: string
}

export function PlantDiseaseModule() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [prediction, setPrediction] = useState<PredictionResult | null>(null)
    const [layerVisualizations, setLayerVisualizations] = useState<LayerVisualization[]>([])
    const [currentLayer, setCurrentLayer] = useState(0)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Sample diseases for demonstration
    const diseases = [
        'Healthy',
        'Early Blight',
        'Late Blight',
        'Leaf Mold',
        'Septoria Leaf Spot',
        'Spider Mites',
        'Target Spot',
        'Yellow Leaf Curl Virus',
        'Mosaic Virus',
        'Bacterial Spot'
    ]

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setSelectedImage(e.target?.result as string)
                setPrediction(null)
                setLayerVisualizations([])
                setCurrentLayer(0)
            }
            reader.readAsDataURL(file)
        }
    }

    const processImage = async () => {
        if (!selectedImage) return

        setIsProcessing(true)

        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 2000))

        // Simulate CNN layer processing
        const layers: LayerVisualization[] = [
            {
                name: 'Input Image',
                shape: '224×224×3',
                description: 'Original RGB image resized to 224×224 pixels'
            },
            {
                name: 'Conv Layer 1',
                shape: '224×224×32',
                description: '32 filters detecting edges and basic patterns'
            },
            {
                name: 'MaxPool 1',
                shape: '112×112×32',
                description: 'Reduced spatial dimensions by half'
            },
            {
                name: 'Conv Layer 2',
                shape: '112×112×64',
                description: '64 filters detecting textures and shapes'
            },
            {
                name: 'MaxPool 2',
                shape: '56×56×64',
                description: 'Further dimension reduction'
            },
            {
                name: 'Conv Layer 3',
                shape: '56×56×128',
                description: '128 filters detecting complex patterns'
            },
            {
                name: 'MaxPool 3',
                shape: '28×28×128',
                description: 'Spatial dimensions reduced to 28×28'
            },
            {
                name: 'Flatten',
                shape: '100352',
                description: 'Converted to 1D vector for classification'
            },
            {
                name: 'Dense Layer',
                shape: '512',
                description: 'Fully connected layer with 512 neurons'
            },
            {
                name: 'Output Layer',
                shape: '10',
                description: 'Softmax probabilities for 10 classes'
            }
        ]

        setLayerVisualizations(layers)

        // Simulate prediction (random for demo)
        const randomIndex = Math.floor(Math.random() * diseases.length)
        const confidence = 0.75 + Math.random() * 0.24 // 75-99%

        setPrediction({
            class: diseases[randomIndex],
            confidence: confidence,
            isHealthy: diseases[randomIndex] === 'Healthy'
        })

        setIsProcessing(false)
    }

    const getSampleImages = () => {
        return [
            { name: 'Healthy Leaf', url: '/samples/healthy.jpg', type: 'healthy' },
            { name: 'Early Blight', url: '/samples/early-blight.jpg', type: 'diseased' },
            { name: 'Late Blight', url: '/samples/late-blight.jpg', type: 'diseased' },
            { name: 'Leaf Mold', url: '/samples/leaf-mold.jpg', type: 'diseased' }
        ]
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Plant Disease Detection</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 mb-6">
                        Upload a plant leaf image to detect diseases using a pre-trained CNN model.
                        Watch how the image transforms through each layer of the network.
                    </p>

                    <Tabs defaultValue="upload">
                        <TabsList>
                            <TabsTrigger value="upload">Upload Image</TabsTrigger>
                            <TabsTrigger value="samples">Sample Images</TabsTrigger>
                            <TabsTrigger value="model">Model Architecture</TabsTrigger>
                        </TabsList>

                        <TabsContent value="upload">
                            <div className="space-y-6">
                                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center">
                                    {!selectedImage ? (
                                        <div>
                                            <ImageIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                                            <p className="text-gray-600 mb-4">
                                                Upload a plant leaf image (JPG, PNG)
                                            </p>
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="hidden"
                                            />
                                            <Button onClick={() => fileInputRef.current?.click()}>
                                                <Upload className="w-4 h-4 mr-2" />
                                                Choose Image
                                            </Button>
                                        </div>
                                    ) : (
                                        <div>
                                            <img
                                                src={selectedImage}
                                                alt="Selected plant leaf"
                                                className="max-w-md mx-auto rounded-xl shadow-lg mb-4"
                                            />
                                            <div className="flex gap-3 justify-center">
                                                <Button onClick={() => fileInputRef.current?.click()} variant="outline">
                                                    Change Image
                                                </Button>
                                                <Button onClick={processImage} disabled={isProcessing}>
                                                    {isProcessing ? (
                                                        <>
                                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                            Processing...
                                                        </>
                                                    ) : (
                                                        'Analyze Image'
                                                    )}
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {prediction && (
                                    <div className={`rounded-2xl p-6 ${prediction.isHealthy
                                            ? 'bg-green-50 border-2 border-green-200'
                                            : 'bg-red-50 border-2 border-red-200'
                                        }`}>
                                        <h3 className="text-xl font-semibold mb-3">
                                            {prediction.isHealthy ? '✓ Healthy Plant' : '⚠ Disease Detected'}
                                        </h3>
                                        <div className="space-y-2">
                                            <p className="text-lg">
                                                <strong>Classification:</strong> {prediction.class}
                                            </p>
                                            <p className="text-lg">
                                                <strong>Confidence:</strong> {(prediction.confidence * 100).toFixed(2)}%
                                            </p>
                                            <div className="mt-3 h-4 bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full ${prediction.isHealthy ? 'bg-green-500' : 'bg-red-500'
                                                        }`}
                                                    style={{ width: `${prediction.confidence * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {layerVisualizations.length > 0 && (
                                    <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                                        <h3 className="text-xl font-semibold mb-4">
                                            Layer-by-Layer Processing
                                        </h3>

                                        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                                            {layerVisualizations.map((layer, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setCurrentLayer(index)}
                                                    className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${currentLayer === index
                                                            ? 'bg-blue-600 text-white'
                                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                        }`}
                                                >
                                                    {index + 1}. {layer.name}
                                                </button>
                                            ))}
                                        </div>

                                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                                            <h4 className="font-semibold text-blue-900 mb-2">
                                                {layerVisualizations[currentLayer].name}
                                            </h4>
                                            <p className="text-sm text-gray-700 mb-3">
                                                <strong>Output Shape:</strong> {layerVisualizations[currentLayer].shape}
                                            </p>
                                            <p className="text-sm text-gray-700">
                                                {layerVisualizations[currentLayer].description}
                                            </p>

                                            {currentLayer === 0 && selectedImage && (
                                                <div className="mt-4">
                                                    <img
                                                        src={selectedImage}
                                                        alt="Input"
                                                        className="max-w-xs mx-auto rounded-lg"
                                                    />
                                                </div>
                                            )}

                                            {currentLayer > 0 && currentLayer < 7 && (
                                                <div className="mt-4 bg-white p-4 rounded-lg">
                                                    <div className="grid grid-cols-4 gap-2">
                                                        {[...Array(16)].map((_, i) => (
                                                            <div
                                                                key={i}
                                                                className="aspect-square bg-gradient-to-br from-blue-400 to-purple-600 rounded opacity-70"
                                                                style={{
                                                                    opacity: Math.random() * 0.5 + 0.5
                                                                }}
                                                            ></div>
                                                        ))}
                                                    </div>
                                                    <p className="text-xs text-gray-500 mt-2 text-center">
                                                        Feature maps (visualization)
                                                    </p>
                                                </div>
                                            )}

                                            {currentLayer === layerVisualizations.length - 1 && prediction && (
                                                <div className="mt-4 space-y-2">
                                                    {diseases.map((disease, i) => {
                                                        const prob = disease === prediction.class
                                                            ? prediction.confidence
                                                            : (1 - prediction.confidence) / (diseases.length - 1)
                                                        return (
                                                            <div key={i} className="flex items-center gap-3">
                                                                <span className="text-sm w-32">{disease}</span>
                                                                <div className="flex-1 h-6 bg-gray-200 rounded-full overflow-hidden">
                                                                    <div
                                                                        className="h-full bg-blue-500"
                                                                        style={{ width: `${prob * 100}%` }}
                                                                    ></div>
                                                                </div>
                                                                <span className="text-sm font-semibold w-16 text-right">
                                                                    {(prob * 100).toFixed(1)}%
                                                                </span>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            )}
                                        </div>

                                        <div className="mt-4 flex justify-between">
                                            <Button
                                                onClick={() => setCurrentLayer(Math.max(0, currentLayer - 1))}
                                                disabled={currentLayer === 0}
                                                variant="outline"
                                            >
                                                ← Previous Layer
                                            </Button>
                                            <Button
                                                onClick={() => setCurrentLayer(Math.min(layerVisualizations.length - 1, currentLayer + 1))}
                                                disabled={currentLayer === layerVisualizations.length - 1}
                                            >
                                                Next Layer →
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </TabsContent>

                        <TabsContent value="samples">
                            <div className="space-y-4">
                                <p className="text-gray-600">
                                    Try these sample images to see how the model performs:
                                </p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {getSampleImages().map((sample, index) => (
                                        <div
                                            key={index}
                                            className="border-2 border-gray-200 rounded-xl p-4 text-center cursor-pointer hover:border-blue-500 transition-all"
                                            onClick={() => {
                                                // In production, load actual sample images
                                                alert(`Sample images would be loaded here. For demo, please upload your own plant leaf images.`)
                                            }}
                                        >
                                            <div className="w-full aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                                                <ImageIcon className="w-12 h-12 text-gray-400" />
                                            </div>
                                            <p className="text-sm font-medium">{sample.name}</p>
                                            <p className={`text-xs ${sample.type === 'healthy' ? 'text-green-600' : 'text-red-600'
                                                }`}>
                                                {sample.type === 'healthy' ? 'Healthy' : 'Diseased'}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                                    <p className="text-sm text-gray-700">
                                        <strong>Note:</strong> For this demo, please upload your own plant leaf images.
                                        The model will simulate disease detection and show the CNN processing stages.
                                    </p>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="model">
                            <div className="space-y-6">
                                <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                                    <h3 className="font-semibold text-purple-900 mb-3">
                                        CNN Architecture for Plant Disease Detection
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="bg-white p-4 rounded-lg">
                                            <h4 className="font-semibold mb-2">Input Layer</h4>
                                            <p className="text-sm text-gray-700">
                                                <InlineMath math="224 \times 224 \times 3" /> - RGB image
                                            </p>
                                        </div>

                                        <div className="bg-white p-4 rounded-lg">
                                            <h4 className="font-semibold mb-2">Convolutional Blocks</h4>
                                            <ul className="text-sm text-gray-700 space-y-2">
                                                <li>• Conv2D (32 filters, 3×3) + ReLU + MaxPool</li>
                                                <li>• Conv2D (64 filters, 3×3) + ReLU + MaxPool</li>
                                                <li>• Conv2D (128 filters, 3×3) + ReLU + MaxPool</li>
                                            </ul>
                                        </div>

                                        <div className="bg-white p-4 rounded-lg">
                                            <h4 className="font-semibold mb-2">Classification Head</h4>
                                            <ul className="text-sm text-gray-700 space-y-2">
                                                <li>• Flatten layer</li>
                                                <li>• Dense (512 neurons) + ReLU + Dropout(0.5)</li>
                                                <li>• Dense (10 classes) + Softmax</li>
                                            </ul>
                                        </div>

                                        <div className="bg-white p-4 rounded-lg">
                                            <h4 className="font-semibold mb-2">Training Details</h4>
                                            <ul className="text-sm text-gray-700 space-y-1">
                                                <li>• <strong>Dataset:</strong> PlantVillage (simulated)</li>
                                                <li>• <strong>Classes:</strong> 10 (1 healthy + 9 diseases)</li>
                                                <li>• <strong>Optimizer:</strong> Adam</li>
                                                <li>• <strong>Loss:</strong> Categorical Crossentropy</li>
                                                <li>• <strong>Accuracy:</strong> ~95% (simulated)</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                                    <h4 className="font-semibold text-blue-900 mb-2">How It Works</h4>
                                    <ol className="text-sm text-gray-700 space-y-2">
                                        <li>1. <strong>Input:</strong> Upload plant leaf image</li>
                                        <li>2. <strong>Preprocessing:</strong> Resize to 224×224, normalize</li>
                                        <li>3. <strong>Feature Extraction:</strong> Conv layers detect patterns</li>
                                        <li>4. <strong>Classification:</strong> Dense layers predict disease</li>
                                        <li>5. <strong>Output:</strong> Disease name + confidence score</li>
                                    </ol>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}
