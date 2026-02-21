'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calculator } from 'lucide-react'
import { BlockMath } from 'react-katex'

export function ProbabilityCalculator() {
    const [weather, setWeather] = useState<'Sunny' | 'Rainy'>('Sunny')
    const [result, setResult] = useState<{ play: number; noPlay: number } | null>(null)

    const data = {
        Sunny: { Yes: 2, No: 3 },
        Rainy: { Yes: 3, No: 2 }
    }

    const totalYes = 5
    const totalNo = 5
    const total = 10

    const calculate = () => {
        const pYes = totalYes / total
        const pNo = totalNo / total
        const pWeatherGivenYes = data[weather].Yes / totalYes
        const pWeatherGivenNo = data[weather].No / totalNo

        const pYesGivenWeather = (pWeatherGivenYes * pYes) /
            ((pWeatherGivenYes * pYes) + (pWeatherGivenNo * pNo))
        const pNoGivenWeather = 1 - pYesGivenWeather

        setResult({ play: pYesGivenWeather, noPlay: pNoGivenWeather })
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Probability Calculator</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
                        <h4 className="font-semibold mb-4">Training Data: Play Tennis?</h4>
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b-2">
                                    <th className="p-2 text-left">Weather</th>
                                    <th className="p-2 text-center">Play=Yes</th>
                                    <th className="p-2 text-center">Play=No</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b">
                                    <td className="p-2">Sunny</td>
                                    <td className="p-2 text-center">{data.Sunny.Yes}</td>
                                    <td className="p-2 text-center">{data.Sunny.No}</td>
                                </tr>
                                <tr>
                                    <td className="p-2">Rainy</td>
                                    <td className="p-2 text-center">{data.Rainy.Yes}</td>
                                    <td className="p-2 text-center">{data.Rainy.No}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                        <h4 className="font-semibold mb-4">Make a Prediction</h4>
                        <div className="flex gap-4 mb-4">
                            <Button
                                variant={weather === 'Sunny' ? 'default' : 'outline'}
                                onClick={() => setWeather('Sunny')}
                            >
                                ☀️ Sunny
                            </Button>
                            <Button
                                variant={weather === 'Rainy' ? 'default' : 'outline'}
                                onClick={() => setWeather('Rainy')}
                            >
                                🌧️ Rainy
                            </Button>
                        </div>
                        <Button onClick={calculate} className="w-full">
                            <Calculator className="w-4 h-4 mr-2" />
                            Calculate Probabilities
                        </Button>
                    </div>

                    {result && (
                        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                            <h4 className="font-semibold text-green-900 mb-4">Results for {weather} Weather</h4>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm mb-2">P(Play=Yes | {weather})</p>
                                    <div className="h-8 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-green-500 flex items-center justify-end pr-2"
                                            style={{ width: `${result.play * 100}%` }}
                                        >
                                            <span className="text-white text-sm font-semibold">
                                                {(result.play * 100).toFixed(1)}%
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm mb-2">P(Play=No | {weather})</p>
                                    <div className="h-8 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-red-500 flex items-center justify-end pr-2"
                                            style={{ width: `${result.noPlay * 100}%` }}
                                        >
                                            <span className="text-white text-sm font-semibold">
                                                {(result.noPlay * 100).toFixed(1)}%
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-gray-700 mt-4">
                                <strong>Prediction:</strong> {result.play > result.noPlay ? 'Play Tennis ✓' : 'Don\'t Play ✗'}
                            </p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
