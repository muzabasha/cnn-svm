'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

type SchedulerType = 'constant' | 'step' | 'exponential' | 'cosine'

export function LearningRateScheduler() {
    const [schedulerType, setSchedulerType] = useState<SchedulerType>('step')
    const [initialLR, setInitialLR] = useState(0.1)

    const generateSchedule = (type: SchedulerType) => {
        return Array.from({ length: 100 }, (_, i) => {
            const epoch = i + 1
            let lr = initialLR

            switch (type) {
                case 'constant':
                    lr = initialLR
                    break
                case 'step':
                    lr = initialLR * Math.pow(0.5, Math.floor(epoch / 20))
                    break
                case 'exponential':
                    lr = initialLR * Math.exp(-0.03 * epoch)
                    break
                case 'cosine':
                    lr = initialLR * 0.5 * (1 + Math.cos((Math.PI * epoch) / 100))
                    break
            }

            return { epoch, lr: lr }
        })
    }

    const generateLoss = (type: SchedulerType) => {
        return Array.from({ length: 100 }, (_, i) => {
            const epoch = i + 1
            let loss = 2

            switch (type) {
                case 'constant':
                    loss = 2 * Math.exp(-epoch * 0.02) + 0.5
                    break
                case 'step':
                    loss = 2 * Math.exp(-epoch * 0.04) + 0.2
                    break
                case 'exponential':
                    loss = 2 * Math.exp(-epoch * 0.045) + 0.15
                    break
                case 'cosine':
                    loss = 2 * Math.exp(-epoch * 0.05) + 0.1
                    break
            }

            return { epoch, loss }
        })
    }

    const scheduleData = generateSchedule(schedulerType)
    const lossData = generateLoss(schedulerType)

    const schedulers = [
        { id: 'constant', name: 'Constant', icon: '➡️', color: 'gray' },
        { id: 'step', name: 'Step Decay', icon: '📉', color: 'blue' },
        { id: 'exponential', name: 'Exponential', icon: '📊', color: 'green' },
        { id: 'cosine', name: 'Cosine Annealing', icon: '🌊', color: 'purple' }
    ]

    return (
        <div className="space-y-4 sm:space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Learning Rate Schedulers</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm sm:text-base text-gray-600 mb-6">
                        Learning rate schedulers adjust the learning rate during training to improve convergence
                        and final model performance. Different schedules work better for different problems.
                    </p>

                    <div className="mb-6">
                        <Slider
                            label={`Initial Learning Rate: ${initialLR.toFixed(3)}`}
                            value={initialLR}
                            onChange={setInitialLR}
                            min={0.001}
                            max={0.5}
                            step={0.001}
                        />
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                        {schedulers.map((scheduler) => (
                            <button
                                key={scheduler.id}
                                onClick={() => setSchedulerType(scheduler.id as SchedulerType)}
                                className={`p-4 rounded-lg border-2 transition-all ${schedulerType === scheduler.id
                                    ? `border-${scheduler.color}-500 bg-${scheduler.color}-50`
                                    : 'border-gray-200 bg-white hover:bg-gray-50'
                                    }`}
                            >
                                <div className="text-2xl mb-2">{scheduler.icon}</div>
                                <div className="text-sm font-semibold">{scheduler.name}</div>
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Learning Rate Schedule */}
                        <div>
                            <h3 className="font-semibold mb-4 text-sm sm:text-base">Learning Rate Over Time</h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <LineChart data={scheduleData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="epoch" label={{ value: 'Epoch', position: 'insideBottom', offset: -5 }} />
                                    <YAxis label={{ value: 'Learning Rate', angle: -90, position: 'insideLeft' }} />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="lr" stroke="#8b5cf6" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Training Loss */}
                        <div>
                            <h3 className="font-semibold mb-4 text-sm sm:text-base">Training Loss</h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <LineChart data={lossData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="epoch" label={{ value: 'Epoch', position: 'insideBottom', offset: -5 }} />
                                    <YAxis label={{ value: 'Loss', angle: -90, position: 'insideLeft' }} />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="loss" stroke="#ef4444" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Scheduler Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h4 className="font-semibold text-gray-900 mb-2 text-sm flex items-center gap-2">
                                ➡️ Constant
                            </h4>
                            <p className="text-xs text-gray-700 mb-2">
                                Maintains the same learning rate throughout training
                            </p>
                            <div className="text-xs text-gray-600">
                                <p className="font-semibold">Pros:</p>
                                <ul className="list-disc list-inside">
                                    <li>Simple and predictable</li>
                                    <li>Good for small datasets</li>
                                </ul>
                                <p className="font-semibold mt-2">Cons:</p>
                                <ul className="list-disc list-inside">
                                    <li>May not converge optimally</li>
                                    <li>Can oscillate near minimum</li>
                                </ul>
                            </div>
                        </div>

                        <div className="p-4 bg-blue-50 rounded-lg">
                            <h4 className="font-semibold text-blue-900 mb-2 text-sm flex items-center gap-2">
                                📉 Step Decay
                            </h4>
                            <p className="text-xs text-blue-700 mb-2">
                                Reduces learning rate by a factor at fixed intervals
                            </p>
                            <div className="text-xs text-blue-600">
                                <p className="font-semibold">Pros:</p>
                                <ul className="list-disc list-inside">
                                    <li>Easy to implement</li>
                                    <li>Works well in practice</li>
                                </ul>
                                <p className="font-semibold mt-2">Cons:</p>
                                <ul className="list-disc list-inside">
                                    <li>Requires tuning step size</li>
                                    <li>Sudden drops can be disruptive</li>
                                </ul>
                            </div>
                        </div>

                        <div className="p-4 bg-green-50 rounded-lg">
                            <h4 className="font-semibold text-green-900 mb-2 text-sm flex items-center gap-2">
                                📊 Exponential Decay
                            </h4>
                            <p className="text-xs text-green-700 mb-2">
                                Smoothly decreases learning rate exponentially
                            </p>
                            <div className="text-xs text-green-600">
                                <p className="font-semibold">Pros:</p>
                                <ul className="list-disc list-inside">
                                    <li>Smooth decay</li>
                                    <li>Mathematically elegant</li>
                                </ul>
                                <p className="font-semibold mt-2">Cons:</p>
                                <ul className="list-disc list-inside">
                                    <li>May decay too quickly</li>
                                    <li>Requires decay rate tuning</li>
                                </ul>
                            </div>
                        </div>

                        <div className="p-4 bg-purple-50 rounded-lg">
                            <h4 className="font-semibold text-purple-900 mb-2 text-sm flex items-center gap-2">
                                🌊 Cosine Annealing
                            </h4>
                            <p className="text-xs text-purple-700 mb-2">
                                Follows a cosine curve, allowing periodic restarts
                            </p>
                            <div className="text-xs text-purple-600">
                                <p className="font-semibold">Pros:</p>
                                <ul className="list-disc list-inside">
                                    <li>Often best performance</li>
                                    <li>Smooth convergence</li>
                                </ul>
                                <p className="font-semibold mt-2">Cons:</p>
                                <ul className="list-disc list-inside">
                                    <li>Requires knowing total epochs</li>
                                    <li>More complex</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <h4 className="font-semibold text-yellow-900 mb-2 text-sm">💡 Choosing a Scheduler</h4>
                        <ul className="text-xs text-yellow-700 space-y-1 list-disc list-inside">
                            <li>Start with Step Decay for most problems</li>
                            <li>Use Cosine Annealing for best results on large datasets</li>
                            <li>Exponential works well for fine-tuning pre-trained models</li>
                            <li>Combine with warmup for very deep networks</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
