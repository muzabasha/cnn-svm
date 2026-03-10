'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft, Settings } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'

interface TrainingData {
    epoch: number
    trainMSE: number
    valMSE: number
    trainR2: number
    valR2: number
    trainMAE: number
}

interface CoefficientData {
    feature: string
    coefficient: number
    color: string
}

export function EnhancedRegressionTraining() {
    const [regressionType, setRegressionType] = useState<'linear' | 'ridge' | 'lasso' | 'elastic'>('linear')
    const [learningRate, setLearningRate] = useState(0.01)
    const [epochs, setEpochs] = useState(50)
    const [alpha, setAlpha] = useState(0.1)
    const [polynomialDegree, setPolynomialDegree] = useState(1)
    const [l1Ratio, setL1Ratio] = useState(0.5)

    const [currentEpoch, setCurrentEpoch] = useState(0)
    const [isTraining, setIsTraining] = useState(false)
    const [trainingSpeed, setTrainingSpeed] = useState(500)
    const [trainingData, setTrainingData] = useState<TrainingData[]>([])
    const [coefficients, setCoefficients] = useState<CoefficientData[]>([])
    const [showSettings, setShowSettings] = useState(true)
    const [showGraphs, setShowGraphs] = useState(true)
    const [showTable, setShowTable] = useState(true)

    const features = ['Temperature', 'Rainfall', 'Soil pH', 'Fertilizer', 'Sunlight']
    const featureColors = ['#ef4444', '#3b82f6', '#22c55e', '#f97316', '#a855f7']

    const generateTrainingData = () => {
        const data: TrainingData[] = []
        const lr = learningRate * 100
        const regStrength = regressionType === 'linear' ? 0 : alpha
        const polyFactor = polynomialDegree

        for (let i = 0; i <= epochs; i++) {
            const p = i / epochs
            const trainMSE = 100 * Math.exp(-lr * p) + 5 + 3 * Math.random() + polyFactor * 2 * (1 - p)
            const valMSE = 110 * Math.exp(-lr * p * 0.8) + 8 + regStrength * 5 * p + 4 * Math.random()
            const trainR2 = Math.min(0.99, 0.3 + 0.65 * (1 - Math.exp(-lr * p * 1.5)) + 0.02 * Math.random())
            const valR2 = Math.min(0.95, 0.25 + 0.6 * (1 - Math.exp(-lr * p * 1.2)) + 0.02 * Math.random())
            const trainMAE = Math.sqrt(trainMSE) * 0.8 + Math.random()

            data.push({
                epoch: i,
                trainMSE: Number(trainMSE.toFixed(2)),
                valMSE: Number(valMSE.toFixed(2)),
                trainR2: Number(trainR2.toFixed(3)),
                valR2: Number(valR2.toFixed(3)),
                trainMAE: Number(trainMAE.toFixed(2))
            })
        }
        return data
    }

    const generateCoefficients = (epoch: number) => {
        const p = epoch / epochs
        const regFactor = regressionType === 'lasso' ? alpha * 2 : regressionType === 'ridge' ? alpha * 0.5 : 0
        return features.map((f, i) => {
            let coef = (0.5 + Math.random() * 0.5) * (1 - regFactor * p)
            if (regressionType === 'lasso' && i >= 3) coef *= Math.max(0, 1 - regFactor * p * 3)
            if (i === 0) coef *= 1.5
            if (i === 1) coef *= 1.3
            return { feature: f, coefficient: Number(coef.toFixed(3)), color: featureColors[i] }
        })
    }

    useEffect(() => {
        setTrainingData(generateTrainingData())
        setCurrentEpoch(0)
        setCoefficients(generateCoefficients(0))
    }, [regressionType, learningRate, epochs, alpha, polynomialDegree, l1Ratio])

    useEffect(() => {
        if (!isTraining) return
        const interval = setInterval(() => {
            setCurrentEpoch(prev => {
                if (prev >= epochs) { setIsTraining(false); return prev }
                const next = prev + 1
                setCoefficients(generateCoefficients(next))
                return next
            })
        }, trainingSpeed)
        return () => clearInterval(interval)
    }, [isTraining, trainingSpeed, epochs])

    const handlePlayPause = () => { if (currentEpoch >= epochs) setCurrentEpoch(0); setIsTraining(!isTraining) }
    const handleNext = () => { if (currentEpoch < epochs) { setCurrentEpoch(currentEpoch + 1); setCoefficients(generateCoefficients(currentEpoch + 1)) } }
    const handlePrev = () => { if (currentEpoch > 0) { setCurrentEpoch(currentEpoch - 1); setCoefficients(generateCoefficients(currentEpoch - 1)) } }
    const handleReset = () => { setCurrentEpoch(0); setIsTraining(false); setCoefficients(generateCoefficients(0)) }

    const currentData = trainingData[currentEpoch] || { epoch: 0, trainMSE: 0, valMSE: 0, trainR2: 0, valR2: 0, trainMAE: 0 }
    const visibleData = trainingData.slice(0, currentEpoch + 1)

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>📈 Enhanced Regression Training - Gradient Descent Optimizer</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 mb-6">
                        Train regression models with different regularization techniques. Watch coefficients evolve and compare MSE, R², and MAE metrics in real-time.
                    </p>

                    {/* Hyperparameters */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-lg">⚙️ Model Configuration</h3>
                            <button onClick={() => setShowSettings(!showSettings)} className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded flex items-center gap-2">
                                <Settings className="w-4 h-4" />{showSettings ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        {showSettings && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl">
                                <div>
                                    <label className="text-sm font-medium block mb-2">Regression Type</label>
                                    <select value={regressionType} onChange={e => setRegressionType(e.target.value as any)} disabled={isTraining} className="w-full border rounded px-3 py-2">
                                        <option value="linear">Linear (OLS)</option>
                                        <option value="ridge">Ridge (L2)</option>
                                        <option value="lasso">Lasso (L1)</option>
                                        <option value="elastic">Elastic Net (L1+L2)</option>
                                    </select>
                                    <p className="text-xs text-gray-500 mt-1">Regularization method</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium block mb-2">Learning Rate: {learningRate}</label>
                                    <input type="range" min="0.001" max="0.1" step="0.001" value={learningRate} onChange={e => setLearningRate(Number(e.target.value))} disabled={isTraining} className="w-full" />
                                    <p className="text-xs text-gray-500 mt-1">Gradient descent step size</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium block mb-2">Epochs: {epochs}</label>
                                    <input type="range" min="10" max="100" step="10" value={epochs} onChange={e => setEpochs(Number(e.target.value))} disabled={isTraining} className="w-full" />
                                    <p className="text-xs text-gray-500 mt-1">Training iterations</p>
                                </div>
                                {regressionType !== 'linear' && (
                                    <div>
                                        <label className="text-sm font-medium block mb-2">Alpha (λ): {alpha}</label>
                                        <input type="range" min="0.01" max="1" step="0.01" value={alpha} onChange={e => setAlpha(Number(e.target.value))} disabled={isTraining} className="w-full" />
                                        <p className="text-xs text-gray-500 mt-1">Regularization strength</p>
                                    </div>
                                )}
                                <div>
                                    <label className="text-sm font-medium block mb-2">Polynomial Degree: {polynomialDegree}</label>
                                    <select value={polynomialDegree} onChange={e => setPolynomialDegree(Number(e.target.value))} disabled={isTraining} className="w-full border rounded px-3 py-2">
                                        <option value={1}>1 (Linear)</option><option value={2}>2 (Quadratic)</option><option value={3}>3 (Cubic)</option>
                                    </select>
                                    <p className="text-xs text-gray-500 mt-1">Feature polynomial expansion</p>
                                </div>
                                {regressionType === 'elastic' && (
                                    <div>
                                        <label className="text-sm font-medium block mb-2">L1 Ratio: {l1Ratio}</label>
                                        <input type="range" min="0" max="1" step="0.1" value={l1Ratio} onChange={e => setL1Ratio(Number(e.target.value))} disabled={isTraining} className="w-full" />
                                        <p className="text-xs text-gray-500 mt-1">Balance between L1 and L2</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Controls */}
                    <div className="mb-6 bg-gray-50 rounded-xl p-4">
                        <h3 className="font-semibold text-lg mb-4">🎮 Training Controls</h3>
                        <div className="flex flex-wrap gap-3 items-center">
                            <Button onClick={handlePlayPause} className="flex items-center gap-2">
                                {isTraining ? <><Pause className="w-4 h-4" />Pause</> : <><Play className="w-4 h-4" />Train</>}
                            </Button>
                            <Button onClick={handlePrev} disabled={currentEpoch === 0 || isTraining} variant="outline"><ChevronLeft className="w-4 h-4" />Prev</Button>
                            <Button onClick={handleNext} disabled={currentEpoch >= epochs || isTraining} variant="outline">Next<ChevronRight className="w-4 h-4" /></Button>
                            <Button onClick={handleReset} variant="outline"><RotateCcw className="w-4 h-4" />Reset</Button>
                            <div className="flex items-center gap-2 ml-auto">
                                <label className="text-sm font-medium">Speed:</label>
                                <select value={trainingSpeed} onChange={e => setTrainingSpeed(Number(e.target.value))} className="border rounded px-3 py-1 text-sm" disabled={isTraining}>
                                    <option value={1000}>Slow</option><option value={500}>Medium</option><option value={200}>Fast</option>
                                </select>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="font-medium">Epoch {currentEpoch} / {epochs}</span>
                                <span className="text-gray-600">{((currentEpoch / epochs) * 100).toFixed(1)}%</span>
                            </div>
                            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-orange-500 to-yellow-500 transition-all duration-300" style={{ width: `${(currentEpoch / epochs) * 100}%` }}></div>
                            </div>
                        </div>
                    </div>

                    {/* Metrics */}
                    <div className="mb-6 grid grid-cols-2 md:grid-cols-5 gap-4">
                        <div className="p-4 bg-red-50 rounded-lg border-2 border-red-200">
                            <p className="text-xs text-gray-600 mb-1">Train MSE</p>
                            <p className="text-2xl font-bold text-red-700">{currentData.trainMSE.toFixed(1)}</p>
                        </div>
                        <div className="p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
                            <p className="text-xs text-gray-600 mb-1">Val MSE</p>
                            <p className="text-2xl font-bold text-orange-700">{currentData.valMSE.toFixed(1)}</p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
                            <p className="text-xs text-gray-600 mb-1">Train R²</p>
                            <p className="text-2xl font-bold text-green-700">{currentData.trainR2.toFixed(3)}</p>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                            <p className="text-xs text-gray-600 mb-1">Val R²</p>
                            <p className="text-2xl font-bold text-blue-700">{currentData.valR2.toFixed(3)}</p>
                        </div>
                        <div className="p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                            <p className="text-xs text-gray-600 mb-1">Train MAE</p>
                            <p className="text-2xl font-bold text-purple-700">{currentData.trainMAE.toFixed(1)}</p>
                        </div>
                    </div>

                    {/* Graphs */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-lg">📊 Training Metrics</h3>
                            <button onClick={() => setShowGraphs(!showGraphs)} className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded">
                                {showGraphs ? 'Hide Graphs' : 'Show Graphs'}
                            </button>
                        </div>
                        {showGraphs && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="bg-white p-4 rounded-lg border">
                                    <h4 className="font-semibold mb-3 text-center">MSE Loss Curves</h4>
                                    <ResponsiveContainer width="100%" height={250}>
                                        <LineChart data={visibleData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="epoch" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey="trainMSE" stroke="#ef4444" name="Train MSE" strokeWidth={2} />
                                            <Line type="monotone" dataKey="valMSE" stroke="#f97316" name="Val MSE" strokeWidth={2} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="bg-white p-4 rounded-lg border">
                                    <h4 className="font-semibold mb-3 text-center">R² Score</h4>
                                    <ResponsiveContainer width="100%" height={250}>
                                        <LineChart data={visibleData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="epoch" />
                                            <YAxis domain={[0, 1]} />
                                            <Tooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey="trainR2" stroke="#22c55e" name="Train R²" strokeWidth={2} />
                                            <Line type="monotone" dataKey="valR2" stroke="#3b82f6" name="Val R²" strokeWidth={2} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="bg-white p-4 rounded-lg border lg:col-span-2">
                                    <h4 className="font-semibold mb-3 text-center">Feature Coefficients (Epoch {currentEpoch})</h4>
                                    <ResponsiveContainer width="100%" height={200}>
                                        <BarChart data={coefficients}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="feature" />
                                            <YAxis />
                                            <Tooltip />
                                            <Bar dataKey="coefficient" fill="#f97316" name="Coefficient" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Table */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-lg">📋 Training History</h3>
                            <button onClick={() => setShowTable(!showTable)} className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded">
                                {showTable ? 'Hide Table' : 'Show Table'}
                            </button>
                        </div>
                        {showTable && (
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="border px-4 py-3 text-left text-sm font-semibold">Epoch</th>
                                            <th className="border px-4 py-3 text-left text-sm font-semibold">Train MSE</th>
                                            <th className="border px-4 py-3 text-left text-sm font-semibold">Val MSE</th>
                                            <th className="border px-4 py-3 text-left text-sm font-semibold">Train R²</th>
                                            <th className="border px-4 py-3 text-left text-sm font-semibold">Val R²</th>
                                            <th className="border px-4 py-3 text-left text-sm font-semibold">MAE</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {visibleData.slice(-10).reverse().map(d => (
                                            <tr key={d.epoch} className={`transition-all ${d.epoch === currentEpoch ? 'bg-orange-100 border-l-4 border-l-orange-600' : 'hover:bg-gray-50'}`}>
                                                <td className="border px-4 py-3">
                                                    <div className="flex items-center gap-2">
                                                        {d.epoch === currentEpoch && <div className="w-2 h-2 bg-orange-600 rounded-full animate-pulse"></div>}
                                                        <span className="font-medium">{d.epoch}</span>
                                                    </div>
                                                </td>
                                                <td className="border px-4 py-3 font-mono text-sm text-red-600">{d.trainMSE.toFixed(2)}</td>
                                                <td className="border px-4 py-3 font-mono text-sm text-orange-600">{d.valMSE.toFixed(2)}</td>
                                                <td className="border px-4 py-3 font-mono text-sm text-green-600">{d.trainR2.toFixed(3)}</td>
                                                <td className="border px-4 py-3 font-mono text-sm text-blue-600">{d.valR2.toFixed(3)}</td>
                                                <td className="border px-4 py-3 font-mono text-sm text-purple-600">{d.trainMAE.toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {/* Equations */}
                    <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded">
                        <h4 className="font-semibold text-orange-900 mb-3">📐 {regressionType === 'linear' ? 'Linear' : regressionType === 'ridge' ? 'Ridge' : regressionType === 'lasso' ? 'Lasso' : 'Elastic Net'} Regression Equations</h4>
                        <div className="space-y-4 overflow-x-auto">
                            <div>
                                <p className="text-sm font-semibold mb-2">Multiple Regression Model:</p>
                                <BlockMath math="\hat{y} = \beta_0 + \beta_1 x_1 + \beta_2 x_2 + ... + \beta_p x_p" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold mb-2">MSE Loss:</p>
                                <BlockMath math="\text{MSE} = \frac{1}{n}\sum_{i=1}^{n}(y_i - \hat{y}_i)^2" />
                            </div>
                            {regressionType === 'ridge' && (
                                <div>
                                    <p className="text-sm font-semibold mb-2">Ridge (L2) Penalty:</p>
                                    <BlockMath math="\mathcal{L}_{Ridge} = \text{MSE} + \lambda \sum_{j=1}^{p} \beta_j^2" />
                                </div>
                            )}
                            {regressionType === 'lasso' && (
                                <div>
                                    <p className="text-sm font-semibold mb-2">Lasso (L1) Penalty:</p>
                                    <BlockMath math="\mathcal{L}_{Lasso} = \text{MSE} + \lambda \sum_{j=1}^{p} |\beta_j|" />
                                </div>
                            )}
                            {regressionType === 'elastic' && (
                                <div>
                                    <p className="text-sm font-semibold mb-2">Elastic Net Penalty:</p>
                                    <BlockMath math="\mathcal{L}_{EN} = \text{MSE} + \lambda \left[ \rho \sum |\beta_j| + (1-\rho) \sum \beta_j^2 \right]" />
                                </div>
                            )}
                            <div>
                                <p className="text-sm font-semibold mb-2">R² Score:</p>
                                <BlockMath math="R^2 = 1 - \frac{\sum(y_i - \hat{y}_i)^2}{\sum(y_i - \bar{y})^2}" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold mb-2">Gradient Descent Update:</p>
                                <BlockMath math="\beta_j \leftarrow \beta_j - \alpha \frac{\partial \mathcal{L}}{\partial \beta_j}" />
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                        <h4 className="font-semibold text-blue-900 mb-2">💡 Understanding Regression</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                            <li>• <strong>Linear (OLS)</strong>: No regularization, minimizes MSE directly</li>
                            <li>• <strong>Ridge (L2)</strong>: Shrinks coefficients, prevents overfitting, keeps all features</li>
                            <li>• <strong>Lasso (L1)</strong>: Can zero out coefficients, performs feature selection</li>
                            <li>• <strong>Elastic Net</strong>: Combines L1 and L2, best of both worlds</li>
                            <li>• <strong>R² Score</strong>: 1.0 = perfect fit, 0.0 = no better than mean prediction</li>
                            <li>• <strong>Polynomial Degree</strong>: Higher degrees capture non-linear patterns but risk overfitting</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
