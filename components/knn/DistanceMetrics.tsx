'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { BlockMath } from 'react-katex'

export function DistanceMetrics() {
    const [x1, setX1] = useState(2)
    const [y1, setY1] = useState(3)
    const [x2, setX2] = useState(5)
    const [y2, setY2] = useState(7)
    const [p, setP] = useState(2)

    const euclidean = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
    const manhattan = Math.abs(x2 - x1) + Math.abs(y2 - y1)
    const minkowski = Math.pow(Math.pow(Math.abs(x2 - x1), p) + Math.pow(Math.abs(y2 - y1), p), 1 / p)

    return (
        <div className="space-y-4 sm:space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Distance Metrics in KNN</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">
                        KNN uses distance metrics to find the nearest neighbors. Different metrics work better for different data types.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Point Coordinates</h3>

                            <Slider label="Point 1 - X" value={x1} onChange={setX1} min={0} max={10} step={0.5} />
                            <Slider label="Point 1 - Y" value={y1} onChange={setY1} min={0} max={10} step={0.5} />
                            <Slider label="Point 2 - X" value={x2} onChange={setX2} min={0} max={10} step={0.5} />
                            <Slider label="Point 2 - Y" value={y2} onChange={setY2} min={0} max={10} step={0.5} />
                            <Slider label="Minkowski p" value={p} onChange={setP} min={1} max={5} step={0.5} />
                        </div>

                        <div>
                            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Distance Results</h3>
                            <div className="space-y-3">
                                <div className="p-3 sm:p-4 bg-blue-50 rounded-lg">
                                    <p className="text-xs sm:text-sm font-semibold text-blue-900">Euclidean (L2):</p>
                                    <p className="text-xl sm:text-2xl font-bold text-blue-700">{euclidean.toFixed(3)}</p>
                                    <div className="text-xs mt-2 overflow-x-auto">
                                        <BlockMath math="d = \sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}" />
                                    </div>
                                </div>
                                <div className="p-3 sm:p-4 bg-green-50 rounded-lg">
                                    <p className="text-xs sm:text-sm font-semibold text-green-900">Manhattan (L1):</p>
                                    <p className="text-xl sm:text-2xl font-bold text-green-700">{manhattan.toFixed(3)}</p>
                                    <div className="text-xs mt-2 overflow-x-auto">
                                        <BlockMath math="d = |x_2-x_1| + |y_2-y_1|" />
                                    </div>
                                </div>
                                <div className="p-3 sm:p-4 bg-purple-50 rounded-lg">
                                    <p className="text-xs sm:text-sm font-semibold text-purple-900">Minkowski (p={p}):</p>
                                    <p className="text-xl sm:text-2xl font-bold text-purple-700">{minkowski.toFixed(3)}</p>
                                    <div className="text-xs mt-2 overflow-x-auto">
                                        <BlockMath math="d = (|x_2-x_1|^p + |y_2-y_1|^p)^{1/p}" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
