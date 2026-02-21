'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { BlockMath } from 'react-katex'

export function GRUComparison() {
    return (
        <div className="space-y-4 sm:space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">GRU vs LSTM</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">
                        GRU (Gated Recurrent Unit) is a simpler alternative to LSTM with fewer parameters.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-semibold mb-3 text-lg">LSTM</h3>
                            <div className="space-y-3">
                                <div className="p-3 bg-blue-50 rounded-lg">
                                    <p className="text-sm font-semibold text-blue-900">3 Gates</p>
                                    <p className="text-xs text-blue-700">Forget, Input, Output</p>
                                </div>
                                <div className="p-3 bg-purple-50 rounded-lg">
                                    <p className="text-sm font-semibold text-purple-900">2 States</p>
                                    <p className="text-xs text-purple-700">Cell state + Hidden state</p>
                                </div>
                                <div className="p-3 bg-green-50 rounded-lg">
                                    <p className="text-sm font-semibold text-green-900">More Parameters</p>
                                    <p className="text-xs text-green-700">Better for complex tasks</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-3 text-lg">GRU</h3>
                            <div className="space-y-3">
                                <div className="p-3 bg-orange-50 rounded-lg">
                                    <p className="text-sm font-semibold text-orange-900">2 Gates</p>
                                    <p className="text-xs text-orange-700">Reset, Update</p>
                                </div>
                                <div className="p-3 bg-pink-50 rounded-lg">
                                    <p className="text-sm font-semibold text-pink-900">1 State</p>
                                    <p className="text-xs text-pink-700">Hidden state only</p>
                                </div>
                                <div className="p-3 bg-teal-50 rounded-lg">
                                    <p className="text-sm font-semibold text-teal-900">Fewer Parameters</p>
                                    <p className="text-xs text-teal-700">Faster training</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 bg-indigo-50 p-4 rounded-lg overflow-x-auto">
                        <p className="text-sm font-semibold text-indigo-900 mb-2">GRU Equations:</p>
                        <BlockMath math="z_t = \sigma(W_z \cdot [h_{t-1}, x_t])" />
                        <BlockMath math="r_t = \sigma(W_r \cdot [h_{t-1}, x_t])" />
                        <BlockMath math="h_t = (1-z_t) * h_{t-1} + z_t * \tilde{h}_t" />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">When to Use Each</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <h4 className="font-semibold text-blue-900 mb-2">Use LSTM When:</h4>
                            <ul className="text-sm text-blue-700 space-y-1">
                                <li>• Very long sequences</li>
                                <li>• Complex dependencies</li>
                                <li>• Sufficient training data</li>
                            </ul>
                        </div>
                        <div className="p-4 bg-orange-50 rounded-lg">
                            <h4 className="font-semibold text-orange-900 mb-2">Use GRU When:</h4>
                            <ul className="text-sm text-orange-700 space-y-1">
                                <li>• Limited data</li>
                                <li>• Need faster training</li>
                                <li>• Moderate sequence length</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
