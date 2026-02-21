'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Play, RotateCcw, ChevronRight } from 'lucide-react'
import { InlineMath, BlockMath } from 'react-katex'

interface TreeNode {
    id: number
    feature?: string
    threshold?: number
    value?: string
    left?: TreeNode
    right?: TreeNode
    samples: number
    gini: number
}

export function TreeVisualization() {
    const [step, setStep] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)

    const dataset = [
        { age: 25, income: 40000, student: true, buys: 'No' },
        { age: 35, income: 60000, student: false, buys: 'Yes' },
        { age: 45, income: 80000, student: false, buys: 'Yes' },
        { age: 20, income: 20000, student: true, buys: 'No' },
        { age: 30, income: 50000, student: true, buys: 'Yes' },
        { age: 50, income: 90000, student: false, buys: 'Yes' }
    ]

    const tree: TreeNode = {
        id: 1,
        feature: 'Age',
        threshold: 30,
        samples: 6,
        gini: 0.444,
        left: {
            id: 2,
            feature: 'Student',
            threshold: 0.5,
            samples: 2,
            gini: 0.5,
            left: { id: 4, value: 'No', samples: 1, gini: 0 },
            right: { id: 5, value: 'Yes', samples: 1, gini: 0 }
        },
        right: {
            id: 3,
            value: 'Yes',
            samples: 4,
            gini: 0
        }
    }

    const steps = [
        {
            title: 'Initial Dataset',
            description: 'We start with 6 samples. Need to find the best feature to split.',
            highlight: []
        },
        {
            title: 'Root Node Split',
            description: 'Split on Age ≤ 30. This gives the best information gain.',
            highlight: [1]
        },
        {
            title: 'Left Branch',
            description: 'Age ≤ 30: 2 samples (mixed classes). Need another split.',
            highlight: [1, 2]
        },
        {
            title: 'Right Branch',
            description: 'Age > 30: 4 samples (all "Yes"). Pure node - stop splitting.',
            highlight: [1, 3]
        },
        {
            title: 'Final Tree',
            description: 'Complete decision tree with 3 decision nodes and 3 leaf nodes.',
            highlight: [1, 2, 3, 4, 5]
        }
    ]

    const animate = () => {
        setIsAnimating(true)
        setStep(0)
        const interval = setInterval(() => {
            setStep((prev) => {
                if (prev >= steps.length - 1) {
                    clearInterval(interval)
                    setIsAnimating(false)
                    return prev
                }
                return prev + 1
            })
        }, 2000)
    }

    const reset = () => {
        setStep(0)
        setIsAnimating(false)
    }

    const renderNode = (node: TreeNode, x: number, y: number, width: number, isHighlighted: boolean) => {
        const isLeaf = !node.left && !node.right
        const nodeColor = isHighlighted ? 'fill-green-500' : isLeaf ? 'fill-blue-500' : 'fill-gray-400'
        const textColor = isHighlighted || isLeaf ? 'fill-white' : 'fill-gray-900'

        return (
            <g key={node.id}>
                <rect
                    x={x - 60}
                    y={y - 30}
                    width="120"
                    height="60"
                    rx="8"
                    className={`${nodeColor} transition-all duration-500`}
                />
                <text x={x} y={y - 5} textAnchor="middle" className={`text-sm font-semibold ${textColor}`}>
                    {node.feature ? `${node.feature} ≤ ${node.threshold}` : node.value}
                </text>
                <text x={x} y={y + 15} textAnchor="middle" className={`text-xs ${textColor}`}>
                    Samples: {node.samples}
                </text>

                {node.left && (
                    <>
                        <line
                            x1={x - 30}
                            y1={y + 30}
                            x2={x - width / 2}
                            y2={y + 100}
                            stroke="#94a3b8"
                            strokeWidth="2"
                        />
                        <text x={x - width / 4} y={y + 60} className="text-xs fill-gray-600">
                            True
                        </text>
                        {renderNode(node.left, x - width / 2, y + 120, width / 2, steps[step].highlight.includes(node.left.id))}
                    </>
                )}

                {node.right && (
                    <>
                        <line
                            x1={x + 30}
                            y1={y + 30}
                            x2={x + width / 2}
                            y2={y + 100}
                            stroke="#94a3b8"
                            strokeWidth="2"
                        />
                        <text x={x + width / 4} y={y + 60} className="text-xs fill-gray-600">
                            False
                        </text>
                        {renderNode(node.right, x + width / 2, y + 120, width / 2, steps[step].highlight.includes(node.right.id))}
                    </>
                )}
            </g>
        )
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Decision Tree Growth Animation</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <div className="flex gap-3">
                            <Button onClick={animate} disabled={isAnimating}>
                                <Play className="w-4 h-4 mr-2" />
                                Animate Tree Building
                            </Button>
                            <Button onClick={reset} variant="outline">
                                <RotateCcw className="w-4 h-4 mr-2" />
                                Reset
                            </Button>
                            <Button
                                onClick={() => setStep(Math.min(step + 1, steps.length - 1))}
                                disabled={step >= steps.length - 1}
                                variant="outline"
                            >
                                Next Step
                                <ChevronRight className="w-4 h-4 ml-2" />
                            </Button>
                        </div>

                        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                            <h4 className="font-semibold text-green-900 mb-2">
                                Step {step + 1}: {steps[step].title}
                            </h4>
                            <p className="text-gray-700">{steps[step].description}</p>
                        </div>

                        <div className="bg-white border-2 border-gray-200 rounded-xl p-6 overflow-x-auto">
                            <svg width="800" height="400" className="mx-auto">
                                {renderNode(tree, 400, 50, 300, steps[step].highlight.includes(1))}
                            </svg>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                            <h4 className="font-semibold text-blue-900 mb-3">Sample Dataset</h4>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b-2 border-blue-200">
                                            <th className="text-left p-2">Age</th>
                                            <th className="text-left p-2">Income</th>
                                            <th className="text-left p-2">Student</th>
                                            <th className="text-left p-2">Buys Computer</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataset.map((row, i) => (
                                            <tr key={i} className="border-b border-blue-100">
                                                <td className="p-2">{row.age}</td>
                                                <td className="p-2">${row.income.toLocaleString()}</td>
                                                <td className="p-2">{row.student ? 'Yes' : 'No'}</td>
                                                <td className="p-2 font-semibold">{row.buys}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                            <h4 className="font-semibold text-purple-900 mb-3">Gini Impurity Formula</h4>
                            <BlockMath math="Gini = 1 - \sum_{i=1}^{n} p_i^2" />
                            <p className="text-sm text-gray-700 mt-3">
                                Where <InlineMath math="p_i" /> is the probability of class <InlineMath math="i" />.
                                Lower Gini means purer node.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
