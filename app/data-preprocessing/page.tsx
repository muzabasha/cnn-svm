'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function DataPreprocessingPage() {
    const [selectedTask, setSelectedTask] = useState('cleaning')

    const tasks = [
        { id: 'cleaning', name: 'Data Cleaning', icon: '🧹' },
        { id: 'missing', name: 'Handle Missing', icon: '🔧' },
        { id: 'scaling', name: 'Feature Scaling', icon: '⚖️' },
        { id: 'encoding', name: 'Encoding', icon: '🔢' }
    ]

    const renderTask = () => {
        switch (selectedTask) {
            case 'cleaning':
                return <DataCleaning />
            case 'missing':
                return <MissingValues />
            case 'scaling':
                return <FeatureScaling />
            case 'encoding':
                return <Encoding />
            default:
                return <DataCleaning />
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-6 sm:mb-8">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
                        🧹 Data Preprocessing Lab
                    </h1>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                        Prep your ingredients! Clean, chop, and measure before cooking.
                    </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
                    {tasks.map((task) => (
                        <button
                            key={task.id}
                            onClick={() => setSelectedTask(task.id)}
                            className={`p-4 rounded-xl border-2 transition-all ${selectedTask === task.id
                                ? 'border-green-500 bg-green-50 shadow-lg'
                                : 'border-gray-200 bg-white hover:bg-gray-50'
                                }`}
                        >
                            <div className="text-3xl mb-2">{task.icon}</div>
                            <div className="text-sm font-semibold text-gray-900">{task.name}</div>
                        </button>
                    ))}
                </div>

                <div className="mt-6 sm:mt-8">
                    {renderTask()}
                </div>
            </div>
        </div>
    )
}

function DataCleaning() {
    const [showCleaned, setShowCleaned] = useState(false)

    const dirtyData = [
        { id: 1, name: 'Alice', age: '25', salary: '50,000', email: 'alice@email.com' },
        { id: 2, name: 'BOB', age: '30', salary: '$60000', email: 'bob@EMAIL.COM' },
        { id: 3, name: 'charlie', age: 'thirty-five', salary: '75000', email: 'charlie@email' },
        { id: 4, name: 'Diana  ', age: '28', salary: '55k', email: 'diana@email.com' }
    ]

    const cleanData = [
        { id: 1, name: 'Alice', age: 25, salary: 50000, email: 'alice@email.com' },
        { id: 2, name: 'Bob', age: 30, salary: 60000, email: 'bob@email.com' },
        { id: 3, name: 'Charlie', age: 35, salary: 75000, email: 'charlie@email.com' },
        { id: 4, name: 'Diana', age: 28, salary: 55000, email: 'diana@email.com' }
    ]

    const displayData = showCleaned ? cleanData : dirtyData

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Cleaning Your Ingredients</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 mb-6">
                        Just like washing vegetables before cooking, we need to clean our data!
                        Remove dirt, fix inconsistencies, standardize formats.
                    </p>

                    <div className="flex justify-center mb-4">
                        <Button
                            onClick={() => setShowCleaned(!showCleaned)}
                            className="flex items-center gap-2"
                        >
                            {showCleaned ? '👀 Show Dirty Data' : '✨ Clean Data'}
                        </Button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className={showCleaned ? 'bg-green-100' : 'bg-red-100'}>
                                    <th className="border px-4 py-2 text-left">ID</th>
                                    <th className="border px-4 py-2 text-left">Name</th>
                                    <th className="border px-4 py-2 text-left">Age</th>
                                    <th className="border px-4 py-2 text-left">Salary</th>
                                    <th className="border px-4 py-2 text-left">Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayData.map((row: any) => (
                                    <tr key={row.id} className="hover:bg-gray-50">
                                        <td className="border px-4 py-2">{row.id}</td>
                                        <td className="border px-4 py-2">{row.name}</td>
                                        <td className="border px-4 py-2">{row.age}</td>
                                        <td className="border px-4 py-2">{row.salary}</td>
                                        <td className="border px-4 py-2">{row.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <div className="text-2xl mb-2">🔤</div>
                            <h4 className="font-semibold text-blue-900 mb-2">Standardize Text</h4>
                            <p className="text-xs text-blue-700">
                                BOB → Bob, charlie → Charlie. Consistent capitalization!
                            </p>
                        </div>

                        <div className="p-4 bg-green-50 rounded-lg">
                            <div className="text-2xl mb-2">🔢</div>
                            <h4 className="font-semibold text-green-900 mb-2">Fix Formats</h4>
                            <p className="text-xs text-green-700">
                                $60000 → 60000, 55k → 55000. Remove symbols, convert to numbers!
                            </p>
                        </div>

                        <div className="p-4 bg-purple-50 rounded-lg">
                            <div className="text-2xl mb-2">✂️</div>
                            <h4 className="font-semibold text-purple-900 mb-2">Trim Spaces</h4>
                            <p className="text-xs text-purple-700">
                                "Diana  " → "Diana". Remove extra whitespace!
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

function MissingValues() {
    const [strategy, setStrategy] = useState<'remove' | 'mean' | 'median' | 'mode'>('mean')

    const originalData = [
        { name: 'Alice', age: 25, salary: 50 },
        { name: 'Bob', age: null, salary: 60 },
        { name: 'Charlie', age: 35, salary: null },
        { name: 'Diana', age: 28, salary: 55 },
        { name: 'Eve', age: 32, salary: 70 }
    ]

    const meanAge = 30
    const meanSalary = 58.75

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Handling Missing Ingredients</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 mb-6">
                        What if you're missing an ingredient? You can skip the recipe, substitute with something similar,
                        or use the most common alternative!
                    </p>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                        {[
                            { id: 'remove', name: 'Remove Row', icon: '🗑️' },
                            { id: 'mean', name: 'Use Average', icon: '📊' },
                            { id: 'median', name: 'Use Median', icon: '📈' },
                            { id: 'mode', name: 'Use Most Common', icon: '🎯' }
                        ].map((strat) => (
                            <button
                                key={strat.id}
                                onClick={() => setStrategy(strat.id as any)}
                                className={`p-3 rounded-lg border-2 transition-all ${strategy === strat.id
                                    ? 'border-green-500 bg-green-50'
                                    : 'border-gray-200 bg-white'
                                    }`}
                            >
                                <div className="text-2xl mb-1">{strat.icon}</div>
                                <div className="text-xs font-semibold">{strat.name}</div>
                            </button>
                        ))}
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-green-100">
                                    <th className="border px-4 py-2 text-left">Name</th>
                                    <th className="border px-4 py-2 text-left">Age</th>
                                    <th className="border px-4 py-2 text-left">Salary (k)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {originalData.map((row, idx) => {
                                    if (strategy === 'remove' && (row.age === null || row.salary === null)) {
                                        return null
                                    }
                                    return (
                                        <tr key={idx} className="hover:bg-gray-50">
                                            <td className="border px-4 py-2">{row.name}</td>
                                            <td className="border px-4 py-2">
                                                {row.age === null ? (
                                                    <span className="text-green-600 font-semibold">
                                                        {strategy === 'remove' ? '—' : meanAge}
                                                    </span>
                                                ) : (
                                                    row.age
                                                )}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {row.salary === null ? (
                                                    <span className="text-green-600 font-semibold">
                                                        {strategy === 'remove' ? '—' : meanSalary.toFixed(0)}
                                                    </span>
                                                ) : (
                                                    row.salary
                                                )}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <h4 className="font-semibold text-yellow-900 mb-2">💡 Strategy Guide</h4>
                        <ul className="text-xs text-yellow-700 space-y-1 list-disc list-inside">
                            <li>Remove: When you have lots of data and few missing values</li>
                            <li>Mean: For numerical data without outliers</li>
                            <li>Median: For numerical data with outliers</li>
                            <li>Mode: For categorical data (most frequent value)</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

function FeatureScaling() {
    const [scalingMethod, setScalingMethod] = useState<'original' | 'normalized' | 'standardized'>('original')

    const originalData = [
        { feature: 'Age', value: 25, normalized: 0.0, standardized: -1.26 },
        { feature: 'Age', value: 30, normalized: 0.25, standardized: -0.63 },
        { feature: 'Age', value: 35, normalized: 0.5, standardized: 0.0 },
        { feature: 'Age', value: 40, normalized: 0.75, standardized: 0.63 },
        { feature: 'Age', value: 45, normalized: 1.0, standardized: 1.26 }
    ]

    const getValue = (row: any) => {
        if (scalingMethod === 'normalized') return row.normalized
        if (scalingMethod === 'standardized') return row.standardized
        return row.value
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Feature Scaling: Balancing Ingredients</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 mb-6">
                        Imagine a recipe with 1000g flour and 2g salt. The flour would dominate!
                        We scale features so each has equal influence.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                        {[
                            { id: 'original', name: 'Original', desc: 'Raw values' },
                            { id: 'normalized', name: 'Normalized', desc: 'Scale to 0-1' },
                            { id: 'standardized', name: 'Standardized', desc: 'Mean=0, Std=1' }
                        ].map((method) => (
                            <button
                                key={method.id}
                                onClick={() => setScalingMethod(method.id as any)}
                                className={`p-4 rounded-lg border-2 transition-all ${scalingMethod === method.id
                                    ? 'border-green-500 bg-green-50'
                                    : 'border-gray-200 bg-white'
                                    }`}
                            >
                                <h4 className="font-semibold text-gray-900 mb-1">{method.name}</h4>
                                <p className="text-xs text-gray-600">{method.desc}</p>
                            </button>
                        ))}
                    </div>

                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={originalData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="feature" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey={(row) => getValue(row)} fill="#10b981" />
                        </BarChart>
                    </ResponsiveContainer>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <div className="text-2xl mb-2">📏</div>
                            <h4 className="font-semibold text-blue-900 mb-2">Normalization (0-1)</h4>
                            <p className="text-xs text-blue-700 mb-2">
                                Formula: (x - min) / (max - min)
                            </p>
                            <p className="text-xs text-blue-600">
                                Squeezes all values between 0 and 1. Like converting all measurements to the same unit!
                            </p>
                        </div>

                        <div className="p-4 bg-green-50 rounded-lg">
                            <div className="text-2xl mb-2">📊</div>
                            <h4 className="font-semibold text-green-900 mb-2">Standardization (Z-score)</h4>
                            <p className="text-xs text-green-700 mb-2">
                                Formula: (x - mean) / std_dev
                            </p>
                            <p className="text-xs text-green-600">
                                Centers data around 0. Like adjusting recipes to a standard serving size!
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

function Encoding() {
    const categories = ['Red', 'Blue', 'Green']
    const oneHot = [
        { color: 'Red', red: 1, blue: 0, green: 0 },
        { color: 'Blue', red: 0, blue: 1, green: 0 },
        { color: 'Green', red: 0, blue: 0, green: 1 }
    ]

    const label = [
        { color: 'Red', encoded: 0 },
        { color: 'Blue', encoded: 1 },
        { color: 'Green', encoded: 2 }
    ]

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Encoding: Translating for the Machine</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 mb-6">
                        Computers don't understand "Red" or "Blue". We need to translate categories into numbers!
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-semibold mb-4">🏷️ Label Encoding</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-blue-100">
                                            <th className="border px-4 py-2">Color</th>
                                            <th className="border px-4 py-2">Encoded</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {label.map((row, idx) => (
                                            <tr key={idx}>
                                                <td className="border px-4 py-2">{row.color}</td>
                                                <td className="border px-4 py-2 font-semibold">{row.encoded}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-xs text-gray-600 mt-2">
                                Simple numbering: Red=0, Blue=1, Green=2
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-4">🎯 One-Hot Encoding</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-green-100">
                                            <th className="border px-4 py-2">Color</th>
                                            <th className="border px-4 py-2">Red</th>
                                            <th className="border px-4 py-2">Blue</th>
                                            <th className="border px-4 py-2">Green</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {oneHot.map((row, idx) => (
                                            <tr key={idx}>
                                                <td className="border px-4 py-2">{row.color}</td>
                                                <td className="border px-4 py-2 font-semibold">{row.red}</td>
                                                <td className="border px-4 py-2 font-semibold">{row.blue}</td>
                                                <td className="border px-4 py-2 font-semibold">{row.green}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-xs text-gray-600 mt-2">
                                Binary columns: 1 = yes, 0 = no for each category
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <h4 className="font-semibold text-yellow-900 mb-2">💡 When to Use Each</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-yellow-700">
                            <div>
                                <p className="font-semibold mb-1">Label Encoding:</p>
                                <ul className="list-disc list-inside space-y-1">
                                    <li>Ordinal data (Small, Medium, Large)</li>
                                    <li>Tree-based models</li>
                                    <li>When order matters</li>
                                </ul>
                            </div>
                            <div>
                                <p className="font-semibold mb-1">One-Hot Encoding:</p>
                                <ul className="list-disc list-inside space-y-1">
                                    <li>Nominal data (Red, Blue, Green)</li>
                                    <li>Neural networks</li>
                                    <li>When no order exists</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
