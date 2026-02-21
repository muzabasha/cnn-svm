'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Shuffle } from 'lucide-react'

export function BootstrappingModule() {
    const [samples, setSamples] = useState<number[][]>([])

    const originalData = [1, 2, 3, 4, 5, 6, 7, 8]

    const bootstrap = () => {
        const newSamples: number[][] = []
        for (let i = 0; i < 3; i++) {
            const sample: number[] = []
            for (let j = 0; j < originalData.length; j++) {
                const randomIndex = Math.floor(Math.random() * originalData.length)
                sample.push(originalData[randomIndex])
            }
            newSamples.push(sample)
        }
        setSamples(newSamples)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Bootstrapping: Random Sampling with Replacement</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-6">
                        <h4 className="font-semibold text-cyan-900 mb-3">What is Bootstrapping?</h4>
                        <p className="text-sm text-gray-700 mb-3">
                            Bootstrapping creates multiple training datasets by randomly sampling from the original
                            data <strong>with replacement</strong>. This means the same data point can appear multiple
                            times in a bootstrap sample.
                        </p>
                        <p className="text-sm text-gray-700">
                            Each tree in the random forest trains on a different bootstrap sample, creating diversity
                            among the trees.
                        </p>
                    </div>

                    <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                        <h4 className="font-semibold mb-4">Original Dataset</h4>
                        <div className="flex gap-2 mb-6 justify-center flex-wrap">
                            {originalData.map((val, i) => (
                                <div key={i} className="w-12 h-12 bg-blue-500 text-white rounded-lg flex items-center justify-center font-semibold">
                                    {val}
                                </div>
                            ))}
                        </div>

                        <Button onClick={bootstrap} className="w-full">
                            <Shuffle className="w-4 h-4 mr-2" />
                            Generate Bootstrap Samples
                        </Button>
                    </div>

                    {samples.length > 0 && (
                        <div className="space-y-4">
                            {samples.map((sample, i) => {
                                const counts = sample.reduce((acc, val) => {
                                    acc[val] = (acc[val] || 0) + 1
                                    return acc
                                }, {} as Record<number, number>)

                                return (
                                    <div key={i} className="bg-green-50 border border-green-200 rounded-xl p-6">
                                        <h5 className="font-semibold text-green-900 mb-3">Bootstrap Sample {i + 1}</h5>
                                        <div className="flex gap-2 mb-3 flex-wrap">
                                            {sample.map((val, j) => (
                                                <div
                                                    key={j}
                                                    className={`w-12 h-12 rounded-lg flex items-center justify-center font-semibold ${counts[val] > 1 ? 'bg-orange-500 text-white' : 'bg-green-500 text-white'
                                                        }`}
                                                >
                                                    {val}
                                                </div>
                                            ))}
                                        </div>
                                        <p className="text-xs text-gray-600">
                                            🟠 Orange = appears multiple times (with replacement)
                                        </p>
                                    </div>
                                )
                            })}
                        </div>
                    )}

                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                        <h4 className="font-semibold text-yellow-900 mb-3">Key Observations</h4>
                        <ul className="text-sm text-gray-700 space-y-2">
                            <li>• Each bootstrap sample has the same size as original dataset</li>
                            <li>• Some data points appear multiple times (duplicates)</li>
                            <li>• Some data points don't appear at all (~37% on average)</li>
                            <li>• Each sample is different, creating diverse trees</li>
                            <li>• Out-of-bag (OOB) samples can be used for validation</li>
                        </ul>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                        <h4 className="font-semibold text-blue-900 mb-2">💡 Why This Matters</h4>
                        <p className="text-sm text-gray-700">
                            By training each tree on a different bootstrap sample, Random Forest creates diverse
                            trees that make different errors. When combined through voting, these diverse predictions
                            lead to better overall accuracy and reduced overfitting.
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
