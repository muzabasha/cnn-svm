'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { BarChart, Bar, LineChart, Line, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

export default function DataExplorationPage() {
    const [selectedView, setSelectedView] = useState('overview')

    const views = [
        { id: 'overview', name: 'Data Overview', icon: '👀' },
        { id: 'types', name: 'Data Types', icon: '🏷️' },
        { id: 'visualization', name: 'Visualizations', icon: '📊' },
        { id: 'patterns', name: 'Find Patterns', icon: '🔍' }
    ]

    const renderView = () => {
        switch (selectedView) {
            case 'overview':
                return <DataOverview />
            case 'types':
                return <DataTypes />
            case 'visualization':
                return <DataVisualization />
            case 'patterns':
                return <PatternFinding />
            default:
                return <DataOverview />
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-6 sm:mb-8">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
                        🔍 Data Exploration Lab
                    </h1>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                        Inspect your ingredients before cooking! Know your data inside out.
                    </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
                    {views.map((view) => (
                        <button
                            key={view.id}
                            onClick={() => setSelectedView(view.id)}
                            className={`p-4 rounded-xl border-2 transition-all ${selectedView === view.id
                                    ? 'border-cyan-500 bg-cyan-50 shadow-lg'
                                    : 'border-gray-200 bg-white hover:bg-gray-50'
                                }`}
                        >
                            <div className="text-3xl mb-2">{view.icon}</div>
                            <div className="text-sm font-semibold text-gray-900">{view.name}</div>
                        </button>
                    ))}
                </div>

                <div className="mt-6 sm:mt-8">
                    {renderView()}
                </div>
            </div>
        </div>
    )
}

function DataOverview() {
    const sampleData = [
        { id: 1, name: 'Alice', age: 25, salary: 50000, department: 'Engineering' },
        { id: 2, name: 'Bob', age: 30, salary: 60000, department: 'Marketing' },
        { id: 3, name: 'Charlie', age: 35, salary: 75000, department: 'Engineering' },
        { id: 4, name: 'Diana', age: 28, salary: 55000, department: 'Sales' },
        { id: 5, name: 'Eve', age: 32, salary: 70000, department: 'Engineering' }
    ]

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Your Data Kitchen: First Look</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 mb-6">
                        Just like a chef inspects ingredients before cooking, we need to look at our data first!
                    </p>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-cyan-100">
                                    <th className="border border-cyan-300 px-4 py-2 text-left">ID</th>
                                    <th className="border border-cyan-300 px-4 py-2 text-left">Name</th>
                                    <th className="border border-cyan-300 px-4 py-2 text-left">Age</th>
                                    <th className="border border-cyan-300 px-4 py-2 text-left">Salary</th>
                                    <th className="border border-cyan-300 px-4 py-2 text-left">Department</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sampleData.map((row) => (
                                    <tr key={row.id} className="hover:bg-cyan-50">
                                        <td className="border border-gray-300 px-4 py-2">{row.id}</td>
                                        <td className="border border-gray-300 px-4 py-2">{row.name}</td>
                                        <td className="border border-gray-300 px-4 py-2">{row.age}</td>
                                        <td className="border border-gray-300 px-4 py-2">${row.salary.toLocaleString()}</td>
                                        <td className="border border-gray-300 px-4 py-2">{row.department}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <div className="text-2xl mb-2">📏</div>
                            <h4 className="font-semibold text-blue-900 mb-1">Shape</h4>
                            <p className="text-sm text-blue-700">5 rows × 5 columns</p>
                            <p className="text-xs text-blue-600 mt-1">Like knowing how many ingredients you have</p>
                        </div>

                        <div className="p-4 bg-green-50 rounded-lg">
                            <div className="text-2xl mb-2">🏷️</div>
                            <h4 className="font-semibold text-green-900 mb-1">Columns</h4>
                            <p className="text-sm text-green-700">ID, Name, Age, Salary, Dept</p>
                            <p className="text-xs text-green-600 mt-1">Each column is a feature/attribute</p>
                        </div>

                        <div className="p-4 bg-purple-50 rounded-lg">
                            <div className="text-2xl mb-2">✅</div>
                            <h4 className="font-semibold text-purple-900 mb-1">Missing Values</h4>
                            <p className="text-sm text-purple-700">0 missing</p>
                            <p className="text-xs text-purple-600 mt-1">All ingredients present!</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Quick Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold mb-3">Age Statistics</h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between p-2 bg-gray-50 rounded">
                                    <span>Mean:</span>
                                    <span className="font-semibold">30 years</span>
                                </div>
                                <div className="flex justify-between p-2 bg-gray-50 rounded">
                                    <span>Min:</span>
                                    <span className="font-semibold">25 years</span>
                                </div>
                                <div className="flex justify-between p-2 bg-gray-50 rounded">
                                    <span>Max:</span>
                                    <span className="font-semibold">35 years</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-3">Salary Statistics</h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between p-2 bg-gray-50 rounded">
                                    <span>Mean:</span>
                                    <span className="font-semibold">$62,000</span>
                                </div>
                                <div className="flex justify-between p-2 bg-gray-50 rounded">
                                    <span>Min:</span>
                                    <span className="font-semibold">$50,000</span>
                                </div>
                                <div className="flex justify-between p-2 bg-gray-50 rounded">
                                    <span>Max:</span>
                                    <span className="font-semibold">$75,000</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

function DataTypes() {
    const dataTypes = [
        { type: 'Numerical', icon: '🔢', examples: ['Age: 25', 'Salary: 50000', 'Temperature: 98.6'], color: 'blue' },
        { type: 'Categorical', icon: '🏷️', examples: ['Department: Engineering', 'Color: Red', 'Size: Large'], color: 'green' },
        { type: 'Text', icon: '📝', examples: ['Name: Alice', 'Review: "Great product!"', 'Address: "123 Main St"'], color: 'purple' },
        { type: 'Date/Time', icon: '📅', examples: ['Date: 2024-01-15', 'Time: 14:30:00', 'Timestamp: 1705334400'], color: 'orange' }
    ]

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Types of Ingredients (Data Types)</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 mb-6">
                        Just like ingredients come in different forms (solid, liquid, powder), data comes in different types!
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {dataTypes.map((dt) => (
                            <div key={dt.type} className={`p-6 bg-${dt.color}-50 border-2 border-${dt.color}-200 rounded-xl`}>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="text-4xl">{dt.icon}</div>
                                    <h3 className="text-xl font-bold text-gray-900">{dt.type}</h3>
                                </div>
                                <div className="space-y-2">
                                    {dt.examples.map((ex, idx) => (
                                        <div key={idx} className="p-2 bg-white rounded text-sm">
                                            {ex}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Why Data Types Matter</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <div className="text-2xl mb-2">🔢</div>
                            <h4 className="font-semibold text-blue-900 mb-2">Numerical Data</h4>
                            <p className="text-xs text-blue-700">
                                Can do math! Calculate average, find patterns, make predictions.
                                Like measuring cups - you can add, subtract, compare.
                            </p>
                        </div>

                        <div className="p-4 bg-green-50 rounded-lg">
                            <div className="text-2xl mb-2">🏷️</div>
                            <h4 className="font-semibold text-green-900 mb-2">Categorical Data</h4>
                            <p className="text-xs text-green-700">
                                Labels and groups! Count how many, find most common.
                                Like ingredient types - you can't add "salt" + "pepper"!
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

function DataVisualization() {
    const ageData = [
        { name: 'Alice', age: 25 },
        { name: 'Bob', age: 30 },
        { name: 'Charlie', age: 35 },
        { name: 'Diana', age: 28 },
        { name: 'Eve', age: 32 }
    ]

    const deptData = [
        { name: 'Engineering', value: 3, color: '#3b82f6' },
        { name: 'Marketing', value: 1, color: '#10b981' },
        { name: 'Sales', value: 1, color: '#f59e0b' }
    ]

    const scatterData = [
        { age: 25, salary: 50 },
        { age: 30, salary: 60 },
        { age: 35, salary: 75 },
        { age: 28, salary: 55 },
        { age: 32, salary: 70 }
    ]

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Visualizing Your Data Kitchen</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 mb-6">
                        A picture is worth a thousand numbers! Let's see our data visually.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-semibold mb-4">📊 Bar Chart: Age Distribution</h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={ageData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="age" fill="#06b6d4" />
                                </BarChart>
                            </ResponsiveContainer>
                            <p className="text-xs text-gray-600 mt-2">
                                Compare values across categories - like comparing ingredient quantities
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-4">🥧 Pie Chart: Department Split</h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={deptData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={(entry) => entry.name}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {deptData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                            <p className="text-xs text-gray-600 mt-2">
                                Show proportions - like a recipe showing ingredient ratios
                            </p>
                        </div>

                        <div className="lg:col-span-2">
                            <h3 className="font-semibold mb-4">📈 Scatter Plot: Age vs Salary</h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <ScatterChart>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="age" name="Age" unit=" yrs" />
                                    <YAxis dataKey="salary" name="Salary" unit="k" />
                                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                    <Scatter name="Employees" data={scatterData} fill="#06b6d4" />
                                </ScatterChart>
                            </ResponsiveContainer>
                            <p className="text-xs text-gray-600 mt-2">
                                Find relationships - does age affect salary? Like testing if cooking time affects taste!
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

function PatternFinding() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Finding Patterns in Your Data</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 mb-6">
                        Like a chef noticing "dishes with garlic always taste better", we look for patterns in data!
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 bg-blue-50 rounded-xl">
                            <div className="text-4xl mb-3">📈</div>
                            <h3 className="text-lg font-bold text-blue-900 mb-3">Trends</h3>
                            <p className="text-sm text-blue-700 mb-4">
                                Things going up or down over time
                            </p>
                            <div className="space-y-2 text-xs text-blue-600">
                                <p>✓ Sales increasing each month</p>
                                <p>✓ Temperature rising in summer</p>
                                <p>✓ Website traffic growing</p>
                            </div>
                        </div>

                        <div className="p-6 bg-green-50 rounded-xl">
                            <div className="text-4xl mb-3">🔗</div>
                            <h3 className="text-lg font-bold text-green-900 mb-3">Correlations</h3>
                            <p className="text-sm text-green-700 mb-4">
                                Two things changing together
                            </p>
                            <div className="space-y-2 text-xs text-green-600">
                                <p>✓ More experience → Higher salary</p>
                                <p>✓ More study time → Better grades</p>
                                <p>✓ Hotter weather → More ice cream sales</p>
                            </div>
                        </div>

                        <div className="p-6 bg-purple-50 rounded-xl">
                            <div className="text-4xl mb-3">🎯</div>
                            <h3 className="text-lg font-bold text-purple-900 mb-3">Outliers</h3>
                            <p className="text-sm text-purple-700 mb-4">
                                Values that don't fit the pattern
                            </p>
                            <div className="space-y-2 text-xs text-purple-600">
                                <p>✓ One person earning 10x more</p>
                                <p>✓ Unusually high temperature</p>
                                <p>✓ Suspicious transaction amount</p>
                            </div>
                        </div>

                        <div className="p-6 bg-orange-50 rounded-xl">
                            <div className="text-4xl mb-3">👥</div>
                            <h3 className="text-lg font-bold text-orange-900 mb-3">Clusters</h3>
                            <p className="text-sm text-orange-700 mb-4">
                                Groups of similar items
                            </p>
                            <div className="space-y-2 text-xs text-orange-600">
                                <p>✓ Customer segments (budget/premium)</p>
                                <p>✓ Product categories</p>
                                <p>✓ Geographic regions</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Pattern Recognition Tips</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <div className="text-2xl mb-2">👀</div>
                            <h4 className="font-semibold text-blue-900 mb-2">Look First</h4>
                            <p className="text-xs text-blue-700">
                                Always visualize before analyzing. Your eyes can spot patterns computers might miss!
                            </p>
                        </div>

                        <div className="p-4 bg-green-50 rounded-lg">
                            <div className="text-2xl mb-2">❓</div>
                            <h4 className="font-semibold text-green-900 mb-2">Ask Questions</h4>
                            <p className="text-xs text-green-700">
                                Why is this value high? What causes this pattern? Question everything!
                            </p>
                        </div>

                        <div className="p-4 bg-purple-50 rounded-lg">
                            <div className="text-2xl mb-2">🔍</div>
                            <h4 className="font-semibold text-purple-900 mb-2">Dig Deeper</h4>
                            <p className="text-xs text-purple-700">
                                One pattern often hides another. Keep exploring different views!
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
