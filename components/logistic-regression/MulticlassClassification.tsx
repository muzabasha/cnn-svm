'use client'

import { useState, useCallback, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { RefreshCw } from 'lucide-react'
import { BlockMath } from 'react-katex'

interface DataPoint {
    x: number
    y: number
    label: number
}

export function MulticlassClassification() {
    const [data, setData] = useState<DataPoint[]>([])
    const [method, setMethod] = useState<'ovr' | 'softmax'>('ovr')

    const generateData = useCallback(() => {
        const points: DataPoint[] = []
        const numClasses = 3
        const pointsPerClass = 30

        for (let c = 0; c < numClasses; c++) {
            const angle = (c * 2 * Math.PI) / numClasses
            const centerX = Math.cos(angle) * 3
            const centerY = Math.sin(angle) * 3

            for (let i = 0; i < pointsPerClass; i++) {
                points.push({
                    x: centerX + (Math.random() - 0.5) * 2,
                    y: centerY + (Math.random() - 0.5) * 2,
                    label: c
                })
            }
        }
        return points
    }, [])

    useEffect(() => {
        setData(generateData())
    }, [generateData])

    const class0 = data.filter(d => d.label === 0)
    const class1 = data.filter(d => d.label === 1)
    const class2 = data.filter(d => d.label === 2)

    const colors = ['#3b82f6', '#ef4444', '#10b981']

    return (
        <div className="space-y-4 sm:space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Multiclass Classification</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">
                        Extend binary logistic regression to handle multiple classes using One-vs-Rest or Softmax approaches.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                            <div className="flex items-center justify-between mb-3 sm:mb-4">
                                <h3 className="font-semibold text-sm sm:text-base">Method Selection</h3>
                                <Button
                                    onClick={() => setData(generateData())}
                                    className="flex items-center gap-2 text-xs sm:text-sm"
                                >
                                    <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4" />
                                    New Data
                                </Button>
                            </div>

                            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                                <button
                                    onClick={() => setMethod('ovr')}
                                    className={`w-full p-3 sm:p-4 rounded-lg text-left transition-all ${method === 'ovr'
                                            ? 'bg-purple-100 border-2 border-purple-500'
                                            : 'bg-gray-50 border-2 border-gray-200 hover:bg-gray-100'
                                        }`}
                                >
                                    <h4 className="font-semibold text-sm sm:text-base mb-1">One-vs-Rest (OvR)</h4>
                                    <p className="text-xs sm:text-sm text-gray-600">
                                        Train K binary classifiers, one for each class
                                    </p>
                                </button>
                                <button
                                    onClick={() => setMethod('softmax')}
                                    className={`w-full p-3 sm:p-4 rounded-lg text-left transition-all ${method === 'softmax'
                                            ? 'bg-purple-100 border-2 border-purple-500'
                                            : 'bg-gray-50 border-2 border-gray-200 hover:bg-gray-100'
                                        }`}
                                >
                                    <h4 className="font-semibold text-sm sm:text-base mb-1">Softmax Regression</h4>
                                    <p className="text-xs sm:text-sm text-gray-600">
                                        Generalization of logistic regression to K classes
                                    </p>
                                </button>
                            </div>

                            {method === 'ovr' && (
                                <div className="bg-blue-50 p-3 sm:p-4 rounded-lg overflow-x-auto">
                                    <p className="text-xs sm:text-sm font-semibold text-blue-900 mb-2">One-vs-Rest:</p>
                                    <p className="text-xs sm:text-sm text-blue-700 mb-2">
                                        For each class k, train a binary classifier:
                                    </p>
                                    <BlockMath math="h_k(x) = P(y=k|x)" />
                                    <p className="text-xs sm:text-sm text-blue-700 mt-2">
                                        Predict: argmax<sub>k</sub> h<sub>k</sub>(x)
                                    </p>
                                </div>
                            )}

                            {method === 'softmax' && (
                                <div className="bg-purple-50 p-3 sm:p-4 rounded-lg overflow-x-auto">
                                    <p className="text-xs sm:text-sm font-semibold text-purple-900 mb-2">Softmax:</p>
                                    <BlockMath math="P(y=k|x) = \frac{e^{z_k}}{\sum_{j=1}^{K}e^{z_j}}" />
                                    <p className="text-xs sm:text-sm text-purple-700 mt-2">
                                        Outputs sum to 1 (probability distribution)
                                    </p>
                                </div>
                            )}
                        </div>

                        <div>
                            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">3-Class Dataset</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis type="number" dataKey="x" domain={[-5, 5]} tick={{ fontSize: 12 }} />
                                    <YAxis type="number" dataKey="y" domain={[-5, 5]} tick={{ fontSize: 12 }} />
                                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                    <Scatter name="Class 0" data={class0} fill={colors[0]} />
                                    <Scatter name="Class 1" data={class1} fill={colors[1]} />
                                    <Scatter name="Class 2" data={class2} fill={colors[2]} />
                                </ScatterChart>
                            </ResponsiveContainer>
                            <div className="flex justify-center gap-4 mt-2 text-xs">
                                <span className="flex items-center gap-1">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[0] }}></div>
                                    Class 0
                                </span>
                                <span className="flex items-center gap-1">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[1] }}></div>
                                    Class 1
                                </span>
                                <span className="flex items-center gap-1">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[2] }}></div>
                                    Class 2
                                </span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
