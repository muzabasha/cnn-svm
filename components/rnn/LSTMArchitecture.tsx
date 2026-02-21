'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { BlockMath } from 'react-katex'

export function LSTMArchitecture() {
    return (
        <div className="space-y-4 sm:space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">LSTM: Long Short-Term Memory</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">
                        LSTMs solve the vanishing gradient problem using gates that control information flow.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="p-4 bg-red-50 rounded-lg">
                                <h4 className="font-semibold text-red-900 mb-2">Forget Gate</h4>
                                <div className="overflow-x-auto">
                                    <BlockMath math="f_t = \sigma(W_f \cdot [h_{t-1}, x_t] + b_f)" />
                                </div>
                                <p className="text-xs text-red-700 mt-2">Decides what to forget from cell state</p>
                            </div>

                            <div className="p-4 bg-blue-50 rounded-lg">
                                <h4 className="font-semibold text-blue-900 mb-2">Input Gate</h4>
                                <div className="overflow-x-auto">
                                    <BlockMath math="i_t = \sigma(W_i \cdot [h_{t-1}, x_t] + b_i)" />
                                </div>
                                <p className="text-xs text-blue-700 mt-2">Decides what new information to store</p>
                            </div>

                            <div className="p-4 bg-green-50 rounded-lg">
                                <h4 className="font-semibold text-green-900 mb-2">Output Gate</h4>
                                <div className="overflow-x-auto">
                                    <BlockMath math="o_t = \sigma(W_o \cdot [h_{t-1}, x_t] + b_o)" />
                                </div>
                                <p className="text-xs text-green-700 mt-2">Decides what to output</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="p-4 bg-purple-50 rounded-lg">
                                <h4 className="font-semibold text-purple-900 mb-2">Cell State Update</h4>
                                <div className="overflow-x-auto">
                                    <BlockMath math="C_t = f_t * C_{t-1} + i_t * \tilde{C}_t" />
                                </div>
                                <p className="text-xs text-purple-700 mt-2">Long-term memory</p>
                            </div>

                            <div className="p-4 bg-pink-50 rounded-lg">
                                <h4 className="font-semibold text-pink-900 mb-2">Hidden State</h4>
                                <div className="overflow-x-auto">
                                    <BlockMath math="h_t = o_t * \tanh(C_t)" />
                                </div>
                                <p className="text-xs text-pink-700 mt-2">Short-term memory</p>
                            </div>

                            <div className="p-4 bg-indigo-50 rounded-lg">
                                <h4 className="font-semibold text-indigo-900 mb-2">Key Advantages</h4>
                                <ul className="text-xs text-indigo-700 space-y-1">
                                    <li>✓ Captures long-term dependencies</li>
                                    <li>✓ Mitigates vanishing gradient</li>
                                    <li>✓ Selective memory retention</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
