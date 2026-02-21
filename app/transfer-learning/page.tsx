'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Play, RotateCcw, Download, Upload } from 'lucide-react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function TransferLearningPage() {
    const [selectedModule, setSelectedModule] = useState('concept')

    const modules = [
        { id: 'concept', name: 'Transfer Learning Concept', icon: '🎓' },
        { id: 'pretrained', name: 'Pre-trained Models', icon: '🏛️' },
        { id: 'fine-tuning', name: 'Fine-Tuning', icon: '🎯' },
        { id: 'feature-extraction', name: 'Feature Extraction', icon: '🔍' }
    ]

    const renderModule = () => {
        switch (selectedModule) {
            case 'concept':
                return <ConceptModule />
            case 'pretrained':
                return <PretrainedModels />
            case 'fine-tuning':
                return <FineTuningModule />
            case 'feature-extraction':
                return <FeatureExtractionModule />
            default:
                return <ConceptModule />
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-6 sm:mb-8">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
                        🎓 Transfer Learning Lab
                    </h1>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                        Don't start from scratch! Use recipes from master chefs and adapt them to your kitchen.
                    </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
                    {modules.map((module) => (
                        <button
                            key={module.id}
                            onClick={() => setSelectedModule(module.id)}
                            className={`p-4 rounded-xl border-2 transition-all ${selectedModule === module.id
                                ? 'border-indigo-500 bg-indigo-50 shadow-lg'
                                : 'border-gray-200 bg-white hover:bg-gray-50'
                                }`}
                        >
                            <div className="text-3xl mb-2">{module.icon}</div>
                            <div className="text-sm font-semibold text-gray-900">{module.name}</div>
                        </button>
                    ))}
                </div>

                <div className="mt-6 sm:mt-8">
                    {renderModule()}
                </div>
            </div>
        </div>
    )
}

function ConceptModule() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>🎓 What is Transfer Learning?</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 mb-6">
                        Imagine learning to cook Italian food after mastering French cuisine. You don't start from zero!
                        You transfer your knife skills, understanding of flavors, and cooking techniques. That's transfer learning!
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="p-6 bg-red-50 rounded-xl border-2 border-red-200">
                                <h3 className="text-xl font-bold text-red-900 mb-3">❌ Training from Scratch</h3>
                                <div className="space-y-2 text-sm text-red-700">
                                    <p>• Need millions of images</p>
                                    <p>• Takes days/weeks to train</p>
                                    <p>• Requires expensive GPUs</p>
                                    <p>• Like learning to cook with no experience</p>
                                </div>
                                <div className="mt-4 p-3 bg-red-100 rounded-lg">
                                    <p className="text-xs font-semibold text-red-800">Training Time: 2-4 weeks</p>
                                    <p className="text-xs font-semibold text-red-800">Data Needed: 1M+ images</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="p-6 bg-green-50 rounded-xl border-2 border-green-200">
                                <h3 className="text-xl font-bold text-green-900 mb-3">✅ Transfer Learning</h3>
                                <div className="space-y-2 text-sm text-green-700">
                                    <p>• Need only hundreds of images</p>
                                    <p>• Takes minutes/hours to train</p>
                                    <p>• Works on regular computers</p>
                                    <p>• Like adapting a master chef's recipe</p>
                                </div>
                                <div className="mt-4 p-3 bg-green-100 rounded-lg">
                                    <p className="text-xs font-semibold text-green-800">Training Time: 10-30 minutes</p>
                                    <p className="text-xs font-semibold text-green-800">Data Needed: 100-1000 images</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>🍳 The Kitchen Analogy</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <div className="text-3xl mb-2">👨‍🍳</div>
                            <h4 className="font-semibold text-blue-900 mb-2">Master Chef's Recipe</h4>
                            <p className="text-xs text-blue-700">
                                Pre-trained model learned from millions of dishes (ImageNet, BERT, etc.)
                            </p>
                        </div>

                        <div className="p-4 bg-purple-50 rounded-lg">
                            <div className="text-3xl mb-2">🔧</div>
                            <h4 className="font-semibold text-purple-900 mb-2">Adapt to Your Kitchen</h4>
                            <p className="text-xs text-purple-700">
                                Fine-tune the recipe for your specific ingredients and taste preferences
                            </p>
                        </div>

                        <div className="p-4 bg-green-50 rounded-lg">
                            <div className="text-3xl mb-2">⚡</div>
                            <h4 className="font-semibold text-green-900 mb-2">Quick Results</h4>
                            <p className="text-xs text-green-700">
                                Get restaurant-quality dishes in a fraction of the time!
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

function PretrainedModels() {
    const models = [
        { name: 'ResNet-50', params: '25M', accuracy: 76, domain: 'Images', icon: '🖼️' },
        { name: 'VGG-16', params: '138M', accuracy: 71, domain: 'Images', icon: '🎨' },
        { name: 'BERT', params: '110M', accuracy: 88, domain: 'Text', icon: '📝' },
        { name: 'GPT-3', params: '175B', accuracy: 92, domain: 'Text', icon: '💬' },
        { name: 'YOLO', params: '62M', accuracy: 82, domain: 'Detection', icon: '🎯' }
    ]

    return (
        <Card>
            <CardHeader>
                <CardTitle>🏛️ Famous Pre-trained Models: Master Chef Recipes</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-gray-600 mb-6">
                    These models are like famous recipes from Michelin-star chefs, trained on millions of examples.
                    You can use them as a starting point for your own dishes!
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        {models.map((model) => (
                            <div key={model.name} className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border-2 border-indigo-200">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-3">
                                        <div className="text-3xl">{model.icon}</div>
                                        <div>
                                            <h4 className="font-bold text-gray-900">{model.name}</h4>
                                            <p className="text-xs text-gray-600 mb-2">{model.domain} Domain</p>
                                            <div className="flex gap-3 text-xs">
                                                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                                                    {model.params} params
                                                </span>
                                                <span className="px-2 py-1 bg-green-100 text-green-700 rounded">
                                                    {model.accuracy}% accuracy
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Model Comparison</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={models}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="accuracy" fill="#6366f1" name="Accuracy %" />
                            </BarChart>
                        </ResponsiveContainer>

                        <div className="mt-4 p-4 bg-yellow-50 rounded-lg border-2 border-yellow-200">
                            <h4 className="font-semibold text-yellow-900 mb-2">💡 Pro Tip</h4>
                            <p className="text-sm text-yellow-700">
                                Choose a model trained on similar data to your task. For food images, use models
                                trained on ImageNet. For recipes, use language models like BERT!
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

function FineTuningModule() {
    const [frozenLayers, setFrozenLayers] = useState(3)
    const [learningRate, setLearningRate] = useState(0.001)
    const [epoch, setEpoch] = useState(0)
    const [isTraining, setIsTraining] = useState(false)

    const startTraining = () => {
        setIsTraining(true)
        setEpoch(0)
        const interval = setInterval(() => {
            setEpoch(e => {
                if (e >= 20) {
                    setIsTraining(false)
                    clearInterval(interval)
                    return 20
                }
                return e + 1
            })
        }, 200)
    }

    const layers = [
        { name: 'Input Layer', frozen: frozenLayers >= 1, color: 'blue' },
        { name: 'Conv Layer 1', frozen: frozenLayers >= 2, color: 'green' },
        { name: 'Conv Layer 2', frozen: frozenLayers >= 3, color: 'purple' },
        { name: 'Conv Layer 3', frozen: frozenLayers >= 4, color: 'orange' },
        { name: 'Dense Layer', frozen: false, color: 'red' },
        { name: 'Output Layer', frozen: false, color: 'pink' }
    ]

    const trainingData = Array.from({ length: epoch + 1 }, (_, i) => ({
        epoch: i,
        accuracy: 60 + 35 * (1 - Math.exp(-i * 0.3)),
        loss: 2 * Math.exp(-i * 0.2)
    }))

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>🎯 Fine-Tuning: Adapting the Recipe</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 mb-6">
                        Take a master chef's recipe and tweak it for your ingredients! Freeze the basic techniques
                        (early layers) and only adjust the final touches (last layers).
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-semibold mb-4">Network Architecture</h3>
                            <div className="space-y-3 mb-6">
                                {layers.map((layer, idx) => (
                                    <div
                                        key={idx}
                                        className={`p-4 rounded-lg border-2 transition-all ${layer.frozen
                                            ? 'bg-gray-100 border-gray-300'
                                            : 'bg-gradient-to-r from-orange-50 to-red-50 border-orange-300'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="font-semibold text-gray-900">{layer.name}</span>
                                            <span className={`text-xs px-2 py-1 rounded ${layer.frozen
                                                ? 'bg-gray-200 text-gray-700'
                                                : 'bg-orange-200 text-orange-700'
                                                }`}>
                                                {layer.frozen ? '❄️ Frozen' : '🔥 Training'}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4">
                                <Slider
                                    label={`Frozen Layers: ${frozenLayers}/4`}
                                    value={frozenLayers}
                                    onChange={setFrozenLayers}
                                    min={0}
                                    max={4}
                                    step={1}
                                />
                                <Slider
                                    label={`Learning Rate: ${learningRate.toFixed(4)}`}
                                    value={learningRate}
                                    onChange={setLearningRate}
                                    min={0.0001}
                                    max={0.01}
                                    step={0.0001}
                                />
                            </div>

                            <div className="flex gap-3 mt-6">
                                <Button
                                    onClick={startTraining}
                                    disabled={isTraining}
                                    className="flex-1 flex items-center justify-center gap-2"
                                >
                                    <Play className="w-4 h-4" />
                                    {isTraining ? `Training... Epoch ${epoch}` : 'Start Fine-Tuning'}
                                </Button>
                                <Button
                                    onClick={() => setEpoch(0)}
                                    className="flex items-center gap-2"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-4">Training Progress</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={trainingData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="epoch" />
                                    <YAxis yAxisId="left" />
                                    <YAxis yAxisId="right" orientation="right" />
                                    <Tooltip />
                                    <Legend />
                                    <Line yAxisId="left" type="monotone" dataKey="accuracy" stroke="#10b981" strokeWidth={2} name="Accuracy %" />
                                    <Line yAxisId="right" type="monotone" dataKey="loss" stroke="#ef4444" strokeWidth={2} name="Loss" />
                                </LineChart>
                            </ResponsiveContainer>

                            <div className="mt-4 p-4 bg-green-50 rounded-lg">
                                <h4 className="font-semibold text-green-900 mb-2">Current Performance</h4>
                                <div className="text-sm text-green-700 space-y-1">
                                    <p>Epoch: {epoch}/20</p>
                                    <p>Accuracy: {trainingData[epoch]?.accuracy.toFixed(1) || 60}%</p>
                                    <p>Loss: {trainingData[epoch]?.loss.toFixed(3) || 2.0}</p>
                                    <p>Trainable Layers: {6 - frozenLayers}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Fine-Tuning Strategies</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <div className="text-2xl mb-2">❄️</div>
                            <h4 className="font-semibold text-blue-900 mb-2">Freeze Early Layers</h4>
                            <p className="text-xs text-blue-700">
                                Keep basic features (edges, textures) - they work for most tasks
                            </p>
                        </div>

                        <div className="p-4 bg-orange-50 rounded-lg">
                            <div className="text-2xl mb-2">🔥</div>
                            <h4 className="font-semibold text-orange-900 mb-2">Train Last Layers</h4>
                            <p className="text-xs text-orange-700">
                                Adapt high-level features to your specific task
                            </p>
                        </div>

                        <div className="p-4 bg-green-50 rounded-lg">
                            <div className="text-2xl mb-2">⚡</div>
                            <h4 className="font-semibold text-green-900 mb-2">Lower Learning Rate</h4>
                            <p className="text-xs text-green-700">
                                Make small adjustments to preserve pre-trained knowledge
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

function FeatureExtractionModule() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>🔍 Feature Extraction: Using Chef's Techniques</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-gray-600 mb-6">
                    Use the pre-trained model as a feature extractor. It's like using a master chef's knife skills
                    and prep techniques, but creating your own unique dish at the end!
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
                            <h3 className="text-lg font-bold text-blue-900 mb-4">Process Flow</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
                                    <div>
                                        <p className="font-semibold text-gray-900">Load Pre-trained Model</p>
                                        <p className="text-xs text-gray-600">Get the master chef's recipe</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
                                    <div>
                                        <p className="font-semibold text-gray-900">Remove Last Layer</p>
                                        <p className="text-xs text-gray-600">Keep the techniques, remove the final dish</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
                                    <div>
                                        <p className="font-semibold text-gray-900">Extract Features</p>
                                        <p className="text-xs text-gray-600">Get rich representations from your data</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">4</div>
                                    <div>
                                        <p className="font-semibold text-gray-900">Train New Classifier</p>
                                        <p className="text-xs text-gray-600">Create your own unique final dish</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
                            <h4 className="font-semibold text-green-900 mb-2">✅ Advantages</h4>
                            <ul className="text-sm text-green-700 space-y-1">
                                <li>• Very fast - no backpropagation through network</li>
                                <li>• Works with small datasets</li>
                                <li>• Can use simple classifiers (SVM, Logistic Regression)</li>
                                <li>• Preserves all pre-trained knowledge</li>
                            </ul>
                        </div>

                        <div className="p-4 bg-yellow-50 rounded-lg border-2 border-yellow-200">
                            <h4 className="font-semibold text-yellow-900 mb-2">⚠️ When to Use</h4>
                            <ul className="text-sm text-yellow-700 space-y-1">
                                <li>• Very small dataset (100-500 examples)</li>
                                <li>• Limited computational resources</li>
                                <li>• Task similar to pre-training task</li>
                                <li>• Need quick results</li>
                            </ul>
                        </div>

                        <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                            <h4 className="font-semibold text-blue-900 mb-2">🎯 Example Use Cases</h4>
                            <ul className="text-sm text-blue-700 space-y-1">
                                <li>• Medical image classification (limited data)</li>
                                <li>• Custom object detection</li>
                                <li>• Specialized document classification</li>
                                <li>• Quick prototyping</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
