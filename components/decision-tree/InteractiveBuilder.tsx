'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Trash2, Play } from 'lucide-react'

interface DataPoint {
    id: number
    age: number
    income: string
    student: boolean
    buys: string
}

export function InteractiveBuilder() {
    const [dataset, setDataset] = useState<DataPoint[]>([
        { id: 1, age: 25, income: 'Low', student: true, buys: 'No' },
        { id: 2, age: 35, income: 'Medium', student: false, buys: 'Yes' },
        { id: 3, age: 45, income: 'High', student: false, buys: 'Yes' }
    ])
    const [prediction, setPrediction] = useState<string | null>(null)
    const [testAge, setTestAge] = useState(30)
    const [testIncome, setTestIncome] = useState('Medium')
    const [testStudent, setTestStudent] = useState(false)

    const addDataPoint = () => {
        const newId = Math.max(...dataset.map(d => d.id)) + 1
        setDataset([...dataset, {
            id: newId,
            age: 30,
            income: 'Medium',
            student: false,
            buys: 'No'
        }])
    }

    const removeDataPoint = (id: number) => {
        setDataset(dataset.filter(d => d.id !== id))
    }

    const updateDataPoint = (id: number, field: keyof DataPoint, value: any) => {
        setDataset(dataset.map(d => d.id === id ? { ...d, [field]: value } : d))
    }

    const makePrediction = () => {
        // Simple rule-based prediction for demonstration
        if (testAge <= 30) {
            setPrediction(testStudent ? 'Yes' : 'No')
        } else {
            setPrediction('Yes')
        }
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Build Your Own Decision Tree</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                            <h4 className="font-semibold text-blue-900 mb-3">Training Dataset</h4>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b-2 border-blue-200">
                                            <th className="text-left p-2">Age</th>
                                            <th className="text-left p-2">Income</th>
                                            <th className="text-left p-2">Student</th>
                                            <th className="text-left p-2">Buys Computer</th>
                                            <th className="text-left p-2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataset.map((row) => (
                                            <tr key={row.id} className="border-b border-blue-100">
                                                <td className="p-2">
                                                    <input
                                                        type="number"
                                                        value={row.age}
                                                        onChange={(e) => updateDataPoint(row.id, 'age', parseInt(e.target.value))}
                                                        className="w-20 px-2 py-1 border rounded"
                                                    />
                                                </td>
                                                <td className="p-2">
                                                    <select
                                                        value={row.income}
                                                        onChange={(e) => updateDataPoint(row.id, 'income', e.target.value)}
                                                        className="px-2 py-1 border rounded"
                                                    >
                                                        <option>Low</option>
                                                        <option>Medium</option>
                                                        <option>High</option>
                                                    </select>
                                                </td>
                                                <td className="p-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={row.student}
                                                        onChange={(e) => updateDataPoint(row.id, 'student', e.target.checked)}
                                                        className="w-4 h-4"
                                                    />
                                                </td>
                                                <td className="p-2">
                                                    <select
                                                        value={row.buys}
                                                        onChange={(e) => updateDataPoint(row.id, 'buys', e.target.value)}
                                                        className="px-2 py-1 border rounded"
                                                    >
                                                        <option>Yes</option>
                                                        <option>No</option>
                                                    </select>
                                                </td>
                                                <td className="p-2">
                                                    <Button
                                                        variant="outline"
                                                        onClick={() => removeDataPoint(row.id)}
                                                        className="px-2 py-1"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Button onClick={addDataPoint} className="mt-4">
                                <Plus className="w-4 h-4 mr-2" />
                                Add Data Point
                            </Button>
                        </div>

                        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                            <h4 className="font-semibold text-green-900 mb-4">Test Your Tree</h4>
                            <div className="grid md:grid-cols-3 gap-4 mb-4">
                                <div>
                                    <label className="text-sm font-medium mb-2 block">Age</label>
                                    <input
                                        type="number"
                                        value={testAge}
                                        onChange={(e) => setTestAge(parseInt(e.target.value))}
                                        className="w-full px-3 py-2 border rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-2 block">Income</label>
                                    <select
                                        value={testIncome}
                                        onChange={(e) => setTestIncome(e.target.value)}
                                        className="w-full px-3 py-2 border rounded-lg"
                                    >
                                        <option>Low</option>
                                        <option>Medium</option>
                                        <option>High</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-2 block">Student</label>
                                    <div className="flex items-center h-10">
                                        <input
                                            type="checkbox"
                                            checked={testStudent}
                                            onChange={(e) => setTestStudent(e.target.checked)}
                                            className="w-5 h-5"
                                        />
                                        <span className="ml-2 text-sm">{testStudent ? 'Yes' : 'No'}</span>
                                    </div>
                                </div>
                            </div>
                            <Button onClick={makePrediction} className="w-full">
                                <Play className="w-4 h-4 mr-2" />
                                Make Prediction
                            </Button>

                            {prediction && (
                                <div className="mt-4 bg-white p-4 rounded-lg">
                                    <p className="text-lg font-semibold">
                                        Prediction: <span className={prediction === 'Yes' ? 'text-green-600' : 'text-red-600'}>
                                            {prediction}
                                        </span>
                                    </p>
                                    <p className="text-sm text-gray-600 mt-2">
                                        Based on your training data, a person with these characteristics would
                                        {prediction === 'Yes' ? ' likely buy' : ' likely not buy'} a computer.
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                            <h4 className="font-semibold text-yellow-900 mb-2">🎯 Try This</h4>
                            <ol className="text-sm text-gray-700 space-y-1">
                                <li>1. Add more data points with different patterns</li>
                                <li>2. Try to create clear decision boundaries</li>
                                <li>3. Test edge cases (very young/old, different incomes)</li>
                                <li>4. Observe how the tree adapts to your data</li>
                            </ol>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
