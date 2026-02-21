'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Slider } from '@/components/ui/slider'
import { InlineMath, BlockMath } from 'react-katex'

export function KernelLab() {
    const [kernelType, setKernelType] = useState<'linear' | 'polynomial' | 'rbf'>('linear')
    const [C, setC] = useState(1.0)
    const [gamma, setGamma] = useState(0.1)
    const [degree, setDegree] = useState(3)

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Kernel & Hyperparameter Lab</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 mb-4">
                        Explore how different kernels and hyperparameters affect the decision boundary.
                    </p>

                    <div className="flex gap-3 mb-6">
                        <button
                            onClick={() => setKernelType('linear')}
                            className={`px-4 py-2 rounded-xl font-medium transition-all ${kernelType === 'linear'
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            Linear
                        </button>
                        <button
                            onClick={() => setKernelType('polynomial')}
                            className={`px-4 py-2 rounded-xl font-medium transition-all ${kernelType === 'polynomial'
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            Polynomial
                        </button>
                        <button
                            onClick={() => setKernelType('rbf')}
                            className={`px-4 py-2 rounded-xl font-medium transition-all ${kernelType === 'rbf'
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            RBF (Gaussian)
                        </button>
                    </div>

                    <Tabs defaultValue="formula">
                        <TabsList>
                            <TabsTrigger value="formula">Formula</TabsTrigger>
                            <TabsTrigger value="hyperparameters">Hyperparameters</TabsTrigger>
                            <TabsTrigger value="code">Python Code</TabsTrigger>
                        </TabsList>

                        <TabsContent value="formula">
                            <div className="space-y-6">
                                {kernelType === 'linear' && (
                                    <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                                        <h3 className="font-semibold text-purple-900 mb-3">Linear Kernel</h3>
                                        <div className="bg-white p-4 rounded-lg mb-3">
                                            <BlockMath math="K(x_i, x_j) = x_i^T x_j" />
                                        </div>
                                        <div className="space-y-2 text-sm text-gray-700">
                                            <p><strong>Interpretation:</strong> Simple dot product between two vectors.</p>
                                            <p><strong>Use case:</strong> When data is linearly separable.</p>
                                            <p><strong>Decision boundary:</strong> A straight line (2D) or hyperplane (higher dimensions).</p>
                                            <p><strong>Example:</strong> If x₁ = [1, 2] and x₂ = [3, 4], then K = 1×3 + 2×4 = 11</p>
                                        </div>
                                    </div>
                                )}

                                {kernelType === 'polynomial' && (
                                    <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                                        <h3 className="font-semibold text-purple-900 mb-3">Polynomial Kernel</h3>
                                        <div className="bg-white p-4 rounded-lg mb-3">
                                            <BlockMath math="K(x_i, x_j) = (\gamma \cdot x_i^T x_j + r)^d" />
                                        </div>
                                        <div className="space-y-2 text-sm text-gray-700">
                                            <p><InlineMath math="d" /> = Degree of polynomial (currently: {degree})</p>
                                            <p><InlineMath math="\gamma" /> = Kernel coefficient</p>
                                            <p><InlineMath math="r" /> = Independent term (usually 0)</p>
                                            <p><strong>Use case:</strong> When data has polynomial relationships.</p>
                                            <p><strong>Decision boundary:</strong> Curved, complexity increases with degree.</p>
                                        </div>
                                    </div>
                                )}

                                {kernelType === 'rbf' && (
                                    <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                                        <h3 className="font-semibold text-purple-900 mb-3">RBF (Radial Basis Function) Kernel</h3>
                                        <div className="bg-white p-4 rounded-lg mb-3">
                                            <BlockMath math="K(x_i, x_j) = \exp(-\gamma \|x_i - x_j\|^2)" />
                                        </div>
                                        <div className="space-y-2 text-sm text-gray-700">
                                            <p><InlineMath math="\gamma" /> = Kernel coefficient (currently: {gamma})</p>
                                            <p><InlineMath math="\|x_i - x_j\|^2" /> = Squared Euclidean distance</p>
                                            <p><strong>Interpretation:</strong> Measures similarity based on distance.</p>
                                            <p><strong>Use case:</strong> Most versatile, works for complex non-linear patterns.</p>
                                            <p><strong>Decision boundary:</strong> Highly flexible, can form circles, curves, islands.</p>
                                        </div>
                                    </div>
                                )}

                                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                                    <h3 className="font-semibold text-blue-900 mb-3">Margin Maximization</h3>
                                    <div className="bg-white p-4 rounded-lg mb-3">
                                        <BlockMath math="\text{Margin} = \frac{2}{\|w\|}" />
                                    </div>
                                    <p className="text-sm text-gray-700">
                                        SVM finds the hyperplane that maximizes the margin between classes.
                                        Support vectors are the data points closest to the decision boundary.
                                    </p>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="hyperparameters">
                            <div className="space-y-6 max-w-2xl">
                                <div className="bg-white border border-gray-200 rounded-xl p-4">
                                    <Slider
                                        label="C (Regularization Parameter)"
                                        value={C}
                                        onChange={setC}
                                        min={0.01}
                                        max={10}
                                        step={0.1}
                                        description="Controls trade-off between margin size and misclassification"
                                    />
                                    <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                                        <div className="bg-blue-50 p-3 rounded-lg">
                                            <p className="font-semibold text-blue-900">Low C (soft margin)</p>
                                            <p className="text-gray-600">Allows some misclassification</p>
                                            <p className="text-gray-600">Larger margin</p>
                                            <p className="text-gray-600">Better generalization</p>
                                        </div>
                                        <div className="bg-red-50 p-3 rounded-lg">
                                            <p className="font-semibold text-red-900">High C (hard margin)</p>
                                            <p className="text-gray-600">Fewer misclassifications</p>
                                            <p className="text-gray-600">Smaller margin</p>
                                            <p className="text-gray-600">Risk of overfitting</p>
                                        </div>
                                    </div>
                                </div>

                                {(kernelType === 'rbf' || kernelType === 'polynomial') && (
                                    <div className="bg-white border border-gray-200 rounded-xl p-4">
                                        <Slider
                                            label="Gamma (γ)"
                                            value={gamma}
                                            onChange={setGamma}
                                            min={0.01}
                                            max={1}
                                            step={0.01}
                                            description="Defines how far the influence of a single training example reaches"
                                        />
                                        <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                                            <div className="bg-green-50 p-3 rounded-lg">
                                                <p className="font-semibold text-green-900">Low γ</p>
                                                <p className="text-gray-600">Far reach</p>
                                                <p className="text-gray-600">Smoother boundary</p>
                                                <p className="text-gray-600">May underfit</p>
                                            </div>
                                            <div className="bg-orange-50 p-3 rounded-lg">
                                                <p className="font-semibold text-orange-900">High γ</p>
                                                <p className="text-gray-600">Close reach</p>
                                                <p className="text-gray-600">Complex boundary</p>
                                                <p className="text-gray-600">May overfit</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {kernelType === 'polynomial' && (
                                    <div className="bg-white border border-gray-200 rounded-xl p-4">
                                        <Slider
                                            label="Degree"
                                            value={degree}
                                            onChange={setDegree}
                                            min={2}
                                            max={5}
                                            step={1}
                                            description="Degree of the polynomial kernel"
                                        />
                                        <p className="mt-3 text-sm text-gray-600">
                                            Higher degree = more complex decision boundary, but slower training and risk of overfitting.
                                        </p>
                                    </div>
                                )}

                                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                                    <h4 className="font-semibold text-yellow-900 mb-2">Experiment</h4>
                                    <p className="text-sm text-gray-700">
                                        Try different combinations. Start with C=1.0 and gamma=0.1 for RBF kernel.
                                        Observe how changing these values affects the decision boundary.
                                    </p>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="code">
                            <div className="bg-gray-900 text-gray-100 p-4 rounded-xl font-mono text-sm overflow-x-auto">
                                <pre>{`from sklearn import svm
from sklearn.datasets import make_classification
import numpy as np

# Generate sample data
X, y = make_classification(n_samples=100, n_features=2, 
                          n_redundant=0, n_informative=2,
                          random_state=42)

# Create SVM classifier with ${kernelType} kernel
clf = svm.SVC(
    kernel='${kernelType}',
    C=${C.toFixed(2)},${kernelType === 'rbf' || kernelType === 'polynomial' ? `
    gamma=${gamma.toFixed(2)},` : ''}${kernelType === 'polynomial' ? `
    degree=${degree},` : ''}
    random_state=42
)

# Train the model
clf.fit(X, y)

# Get support vectors
support_vectors = clf.support_vectors_
print(f"Number of support vectors: {len(support_vectors)}")

# Make predictions
predictions = clf.predict(X)

# Decision function (distance from hyperplane)
decision_values = clf.decision_function(X)
print(f"Decision values range: [{decision_values.min():.2f}, {decision_values.max():.2f}]")`}</pre>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}
