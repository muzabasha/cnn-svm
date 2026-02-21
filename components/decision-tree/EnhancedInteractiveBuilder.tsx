'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ChallengeCard, Challenge } from '@/components/interactive/ChallengeCard'
import { Plus, Trash2, Play, Info, Target, Zap, GitBranch } from 'lucide-react'
import { InlineMath, BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'

interface DataPoint {
    id: number
    age: number
    income: string
    student: boolean
    buys: string
}

interface TreeNode {
    id: string
    feature?: string
    threshold?: number | string
    value?: string
    left?: TreeNode
    right?: TreeNode
    samples: DataPoint[]
    gini?: number
    entropy?: number
}

export function EnhancedInteractiveBuilder() {
    const [dataset, setDataset] = useState<DataPoint[]>([
        { id: 1, age: 25, income: 'Low', student: true, buys: 'No' },
        { id: 2, age: 35, income: 'Medium', student: false, buys: 'Yes' },
        { id: 3, age: 45, income: 'High', student: false, buys: 'Yes' },
        { id: 4, age: 22, income: 'Low', student: true, buys: 'No' },
        { id: 5, age: 50, income: 'High', student: false, buys: 'Yes' },
        { id: 6, age: 28, income: 'Medium', student: true, buys: 'Yes' }
    ])
    const [tree, setTree] = useState<TreeNode | null>(null)
    const [selectedNode, setSelectedNode] = useState<string | null>(null)
    const [splitMetric, setSplitMetric] = useState<'gini' | 'entropy'>('gini')
    const [completedChallenges, setCompletedChallenges] = useState<string[]>([])
    const [testAge, setTestAge] = useState(30)
    const [testIncome, setTestIncome] = useState('Medium')
    const [testStudent, setTestStudent] = useState(false)
    const [prediction, setPrediction] = useState<string | null>(null)

    const calculateGini = (samples: DataPoint[]): number => {
        if (samples.length === 0) return 0
        const yesCount = samples.filter(s => s.buys === 'Yes').length
        const noCount = samples.length - yesCount
        const pYes = yesCount / samples.length
        const pNo = noCount / samples.length
        return 1 - (pYes ** 2 + pNo ** 2)
    }

    const calculateEntropy = (samples: DataPoint[]): number => {
        if (samples.length === 0) return 0
        const yesCount = samples.filter(s => s.buys === 'Yes').length
        const noCount = samples.length - yesCount
        const pYes = yesCount / samples.length
        const pNo = noCount / samples.length
        const eYes = pYes > 0 ? -pYes * Math.log2(pYes) : 0
        const eNo = pNo > 0 ? -pNo * Math.log2(pNo) : 0
        return eYes + eNo
    }

    const calculateInformationGain = (parent: DataPoint[], left: DataPoint[], right: DataPoint[]): number => {
        const parentEntropy = calculateEntropy(parent)
        const leftWeight = left.length / parent.length
        const rightWeight = right.length / parent.length
        const childrenEntropy = leftWeight * calculateEntropy(left) + rightWeight * calculateEntropy(right)
        return parentEntropy - childrenEntropy
    }

    const buildTree = () => {
        const rootNode: TreeNode = {
            id: 'root',
            samples: dataset,
            gini: calculateGini(dataset),
            entropy: calculateEntropy(dataset)
        }

        // Simple split on age <= 30
        const leftSamples = dataset.filter(d => d.age <= 30)
        const rightSamples = dataset.filter(d => d.age > 30)

        if (leftSamples.length > 0 && rightSamples.length > 0) {
            rootNode.feature = 'age'
            rootNode.threshold = 30
            rootNode.left = {
                id: 'left',
                samples: leftSamples,
                gini: calculateGini(leftSamples),
                entropy: calculateEntropy(leftSamples),
                value: leftSamples.filter(s => s.buys === 'Yes').length > leftSamples.length / 2 ? 'Yes' : 'No'
            }
            rootNode.right = {
                id: 'right',
                samples: rightSamples,
                gini: calculateGini(rightSamples),
                entropy: calculateEntropy(rightSamples),
                value: rightSamples.filter(s => s.buys === 'Yes').length > rightSamples.length / 2 ? 'Yes' : 'No'
            }
        }

        setTree(rootNode)
    }

    const makePrediction = () => {
        if (!tree) {
            buildTree()
            return
        }

        let currentNode = tree
        while (currentNode.left && currentNode.right) {
            if (currentNode.feature === 'age' && typeof currentNode.threshold === 'number') {
                currentNode = testAge <= currentNode.threshold ? currentNode.left : currentNode.right
            } else {
                break
            }
        }

        setPrediction(currentNode.value || 'Unknown')
    }

    const addDataPoint = () => {
        const newId = Math.max(...dataset.map(d => d.id), 0) + 1
        setDataset([...dataset, {
            id: newId,
            age: 30,
            income: 'Medium',
            student: false,
            buys: 'No'
        }])
        setTree(null)
    }

    const removeDataPoint = (id: number) => {
        setDataset(dataset.filter(d => d.id !== id))
        setTree(null)
    }

    const updateDataPoint = (id: number, field: keyof DataPoint, value: any) => {
        setDataset(dataset.map(d => d.id === id ? { ...d, [field]: value } : d))
        setTree(null)
    }

    const renderTreeNode = (node: TreeNode | undefined, depth: number = 0): JSX.Element | null => {
        if (!node) return null

        const yesCount = node.samples.filter(s => s.buys === 'Yes').length
        const noCount = node.samples.length - yesCount
        const isLeaf = !node.left && !node.right

        return (
            <div className="flex flex-col items-center">
                <div
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${selectedNode === node.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 bg-white hover:border-blue-300'
                        } ${isLeaf ? 'bg-green-50' : ''}`}
                    onClick={() => setSelectedNode(node.id)}
                >
                    {node.feature ? (
                        <div className="text-center">
                            <p className="font-semibold text-sm">{node.feature} ≤ {node.threshold}</p>
                            <p className="text-xs text-gray-600 mt-1">
                                Samples: {node.samples.length}
                            </p>
                            <p className="text-xs text-gray-600">
                                Gini: {node.gini?.toFixed(3)}
                            </p>
                        </div>
                    ) : (
                        <div className="text-center">
                            <p className="font-semibold text-lg">{node.value}</p>
                            <p className="text-xs text-gray-600 mt-1">
                                Yes: {yesCount}, No: {noCount}
                            </p>
                        </div>
                    )}
                </div>

                {node.left && node.right && (
                    <div className="flex gap-8 mt-4">
                        <div className="flex flex-col items-center">
                            <div className="text-xs text-gray-500 mb-2">≤ {node.threshold}</div>
                            {renderTreeNode(node.left, depth + 1)}
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="text-xs text-gray-500 mb-2">&gt; {node.threshold}</div>
                            {renderTreeNode(node.right, depth + 1)}
                        </div>
                    </div>
                )}
            </div>
        )
    }

    const challenges: Challenge[] = [
        {
            id: 'first-tree',
            title: 'Build Your First Tree',
            description: 'Add at least 6 data points and build a decision tree. Observe how the tree splits the data.',
            difficulty: 'easy',
            hints: [
                'Make sure you have a mix of Yes and No outcomes',
                'Click "Build Tree" to see the structure',
                'Look at the Gini impurity values at each node'
            ],
            successCriteria: 'Have at least 6 data points and build a tree',
            points: 10
        },
        {
            id: 'perfect-split',
            title: 'Create a Perfect Split',
            description: 'Design a dataset where the first split perfectly separates Yes and No outcomes (Gini = 0 for leaf nodes).',
            difficulty: 'medium',
            hints: [
                'All data points with age ≤ 30 should have the same outcome',
                'All data points with age > 30 should have the same outcome',
                'Check the Gini values in the leaf nodes'
            ],
            successCriteria: 'Build a tree where both leaf nodes have Gini = 0',
            points: 20
        },
        {
            id: 'test-predictions',
            title: 'Test Your Tree',
            description: 'Build a tree and make at least 3 different predictions with different test inputs.',
            difficulty: 'medium',
            hints: [
                'Try different age values',
                'Observe how the tree makes decisions',
                'Compare predictions with your training data'
            ],
            successCriteria: 'Make 3 successful predictions',
            points: 15
        }
    ]

    const checkChallengeSuccess = (challengeId: string) => {
        switch (challengeId) {
            case 'first-tree':
                return dataset.length >= 6 && tree !== null
            case 'perfect-split':
                if (!tree || !tree.left || !tree.right) return false
                return (tree.left.gini === 0 && tree.right.gini === 0)
            case 'test-predictions':
                return prediction !== null && tree !== null
            default:
                return false
        }
    }

    const handleChallengeComplete = (challengeId: string) => {
        if (!completedChallenges.includes(challengeId)) {
            setCompletedChallenges([...completedChallenges, challengeId])
        }
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Zap className="w-6 h-6 text-yellow-500" />
                        Interactive Decision Tree Builder - Learn by Doing!
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="explore" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="explore">🔍 Explore</TabsTrigger>
                            <TabsTrigger value="learn">📚 Learn</TabsTrigger>
                            <TabsTrigger value="challenge">🏆 Challenges</TabsTrigger>
                        </TabsList>

                        <TabsContent value="explore" className="space-y-4">
                            <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                <div className="text-sm text-blue-800">
                                    <p className="font-semibold mb-1">Free Exploration Mode</p>
                                    <p>Create your own dataset, build a decision tree, and see how it makes predictions!</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Dataset Editor */}
                                <div className="space-y-4">
                                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                                        <h4 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
                                            <GitBranch className="w-5 h-5" />
                                            Training Dataset
                                        </h4>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-sm">
                                                <thead>
                                                    <tr className="border-b-2 border-purple-200">
                                                        <th className="text-left p-2">Age</th>
                                                        <th className="text-left p-2">Income</th>
                                                        <th className="text-left p-2">Student</th>
                                                        <th className="text-left p-2">Buys</th>
                                                        <th className="text-left p-2"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {dataset.map((row) => (
                                                        <tr key={row.id} className="border-b border-purple-100">
                                                            <td className="p-2">
                                                                <input
                                                                    type="number"
                                                                    value={row.age}
                                                                    onChange={(e) => updateDataPoint(row.id, 'age', parseInt(e.target.value))}
                                                                    className="w-16 px-2 py-1 border rounded text-sm"
                                                                />
                                                            </td>
                                                            <td className="p-2">
                                                                <select
                                                                    value={row.income}
                                                                    onChange={(e) => updateDataPoint(row.id, 'income', e.target.value)}
                                                                    className="px-2 py-1 border rounded text-sm"
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
                                                                    className="px-2 py-1 border rounded text-sm"
                                                                >
                                                                    <option>Yes</option>
                                                                    <option>No</option>
                                                                </select>
                                                            </td>
                                                            <td className="p-2">
                                                                <button
                                                                    onClick={() => removeDataPoint(row.id)}
                                                                    className="text-red-600 hover:text-red-800"
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="flex gap-2 mt-3">
                                            <Button onClick={addDataPoint} variant="outline" className="flex items-center gap-2 px-3 py-1.5 text-sm">
                                                <Plus className="w-4 h-4" />
                                                Add Row
                                            </Button>
                                            <Button onClick={buildTree} className="flex items-center gap-2 px-3 py-1.5 text-sm">
                                                <GitBranch className="w-4 h-4" />
                                                Build Tree
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Test Prediction */}
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                        <h4 className="font-semibold text-green-900 mb-3">Test Prediction</h4>
                                        <div className="grid grid-cols-3 gap-3 mb-3">
                                            <div>
                                                <label className="text-xs font-medium mb-1 block">Age</label>
                                                <input
                                                    type="number"
                                                    value={testAge}
                                                    onChange={(e) => setTestAge(parseInt(e.target.value))}
                                                    className="w-full px-2 py-1 border rounded text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-medium mb-1 block">Income</label>
                                                <select
                                                    value={testIncome}
                                                    onChange={(e) => setTestIncome(e.target.value)}
                                                    className="w-full px-2 py-1 border rounded text-sm"
                                                >
                                                    <option>Low</option>
                                                    <option>Medium</option>
                                                    <option>High</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="text-xs font-medium mb-1 block">Student</label>
                                                <input
                                                    type="checkbox"
                                                    checked={testStudent}
                                                    onChange={(e) => setTestStudent(e.target.checked)}
                                                    className="w-4 h-4 mt-2"
                                                />
                                            </div>
                                        </div>
                                        <Button onClick={makePrediction} className="w-full px-3 py-1.5 text-sm">
                                            <Play className="w-4 h-4 mr-2" />
                                            Predict
                                        </Button>

                                        {prediction && (
                                            <div className="mt-3 p-3 bg-white rounded-lg">
                                                <p className="text-sm font-semibold">
                                                    Prediction: <span className={prediction === 'Yes' ? 'text-green-600' : 'text-red-600'}>
                                                        {prediction}
                                                    </span>
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Tree Visualization */}
                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                    <h4 className="font-semibold text-gray-900 mb-4">Decision Tree</h4>
                                    {tree ? (
                                        <div className="overflow-x-auto">
                                            {renderTreeNode(tree)}
                                        </div>
                                    ) : (
                                        <div className="text-center py-12 text-gray-500">
                                            <GitBranch className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                            <p>Click "Build Tree" to visualize</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="learn" className="space-y-4">
                            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                                <h3 className="text-lg font-semibold mb-3">How Decision Trees Work</h3>

                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm font-semibold mb-2">1. Splitting Criteria</p>
                                        <p className="text-sm text-gray-700 mb-2">
                                            Decision trees choose the best feature to split on using impurity measures:
                                        </p>
                                        <div className="overflow-x-auto bg-white p-3 rounded mb-2">
                                            <p className="text-xs font-semibold mb-1">Gini Impurity:</p>
                                            <BlockMath math="Gini = 1 - \sum_{i=1}^{C} p_i^2" />
                                        </div>
                                        <div className="overflow-x-auto bg-white p-3 rounded">
                                            <p className="text-xs font-semibold mb-1">Entropy:</p>
                                            <BlockMath math="Entropy = -\sum_{i=1}^{C} p_i \log_2(p_i)" />
                                        </div>
                                        <p className="text-xs text-gray-600 mt-2">
                                            where <InlineMath math="p_i" /> is the proportion of class <InlineMath math="i" />
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold mb-2">2. Information Gain</p>
                                        <p className="text-sm text-gray-700 mb-2">
                                            The reduction in entropy after a split:
                                        </p>
                                        <div className="overflow-x-auto bg-white p-3 rounded">
                                            <BlockMath math="IG = H(parent) - \sum_{child} \frac{|child|}{|parent|} H(child)" />
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold mb-2">3. Tree Building Process</p>
                                        <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
                                            <li>Start with all data at the root</li>
                                            <li>Find the best feature and threshold to split</li>
                                            <li>Create child nodes with split data</li>
                                            <li>Repeat recursively until stopping criteria</li>
                                            <li>Assign class labels to leaf nodes</li>
                                        </ol>
                                    </div>

                                    <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                                        <p className="text-sm font-semibold text-yellow-900 mb-1">💡 Key Insight</p>
                                        <p className="text-sm text-yellow-800">
                                            Lower Gini/Entropy means purer nodes. A value of 0 means all samples belong to one class (perfect split)!
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                    <p className="text-sm font-semibold text-green-900 mb-2">✅ Advantages</p>
                                    <ul className="text-sm text-green-800 space-y-1 list-disc list-inside">
                                        <li>Easy to understand and interpret</li>
                                        <li>Handles both numerical and categorical data</li>
                                        <li>Requires little data preparation</li>
                                        <li>Can capture non-linear relationships</li>
                                    </ul>
                                </div>
                                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                                    <p className="text-sm font-semibold text-red-900 mb-2">⚠️ Limitations</p>
                                    <ul className="text-sm text-red-800 space-y-1 list-disc list-inside">
                                        <li>Can easily overfit the data</li>
                                        <li>Sensitive to small data changes</li>
                                        <li>Biased toward dominant classes</li>
                                        <li>May create overly complex trees</li>
                                    </ul>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="challenge" className="space-y-4">
                            <div className="flex items-start gap-2 p-3 bg-purple-50 rounded-lg border border-purple-200">
                                <Target className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                                <div className="text-sm text-purple-800">
                                    <p className="font-semibold mb-1">Challenge Mode</p>
                                    <p>Complete these challenges to master Decision Trees! Build trees and test your understanding.</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {challenges.map(challenge => (
                                    <ChallengeCard
                                        key={challenge.id}
                                        challenge={challenge}
                                        onComplete={handleChallengeComplete}
                                        checkSuccess={() => checkChallengeSuccess(challenge.id)}
                                        isCompleted={completedChallenges.includes(challenge.id)}
                                    />
                                ))}
                            </div>

                            {completedChallenges.length === challenges.length && (
                                <div className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border-2 border-yellow-400">
                                    <div className="text-center">
                                        <p className="text-2xl mb-2">🎉 Congratulations!</p>
                                        <p className="text-lg font-semibold text-gray-800 mb-2">
                                            You've completed all Decision Tree challenges!
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Total points earned: {challenges.reduce((sum, c) => sum + c.points, 0)}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}
