import Link from 'next/link'
import { Brain, Network, TreeDeciduous, Calculator, Trees, User } from 'lucide-react'

export default function Home() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="max-w-6xl w-full">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">
                        AI Virtual Lab
                    </h1>
                    <p className="text-xl text-gray-600">
                        Learn by Doing - Experiential AI Education
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                        Aligned with NEP 2020 Principles
                    </p>
                    <div className="mt-6">
                        <Link href="/profile">
                            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl mx-auto">
                                <User className="w-5 h-5" />
                                About the Creator
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Link href="/cnn">
                        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer group">
                            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                                <Brain className="w-8 h-8 text-blue-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">
                                CNN Virtual Lab
                            </h2>
                            <p className="text-gray-600 mb-4">
                                Explore Convolutional Neural Networks step-by-step
                            </p>
                            <ul className="space-y-2 text-sm text-gray-500">
                                <li>✓ Layer-by-layer visualization</li>
                                <li>✓ Interactive convolution operations</li>
                                <li>✓ Mathematical explanations</li>
                                <li>✓ Synthetic image experiments</li>
                            </ul>
                        </div>
                    </Link>

                    <Link href="/svm">
                        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer group">
                            <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                                <Network className="w-8 h-8 text-purple-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">
                                SVM Virtual Lab
                            </h2>
                            <p className="text-gray-600 mb-4">
                                Master Support Vector Machines through experimentation
                            </p>
                            <ul className="space-y-2 text-sm text-gray-500">
                                <li>✓ Hyperplane visualization</li>
                                <li>✓ Kernel experiments</li>
                                <li>✓ Hyperparameter tuning</li>
                                <li>✓ Real-time decision boundaries</li>
                            </ul>
                        </div>
                    </Link>

                    <Link href="/decision-tree">
                        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer group">
                            <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                                <TreeDeciduous className="w-8 h-8 text-green-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">
                                Decision Tree Lab
                            </h2>
                            <p className="text-gray-600 mb-4">
                                Build and visualize decision trees interactively
                            </p>
                            <ul className="space-y-2 text-sm text-gray-500">
                                <li>✓ Tree growth animation</li>
                                <li>✓ Splitting criteria (Gini, Entropy)</li>
                                <li>✓ Pruning techniques</li>
                                <li>✓ Interactive tree builder</li>
                            </ul>
                        </div>
                    </Link>

                    <Link href="/naive-bayes">
                        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer group">
                            <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                                <Calculator className="w-8 h-8 text-purple-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">
                                Naive Bayes Lab
                            </h2>
                            <p className="text-gray-600 mb-4">
                                Understand probabilistic classification
                            </p>
                            <ul className="space-y-2 text-sm text-gray-500">
                                <li>✓ Bayes' theorem explained</li>
                                <li>✓ Probability calculator</li>
                                <li>✓ Text classification demo</li>
                                <li>✓ Conditional probability</li>
                            </ul>
                        </div>
                    </Link>

                    <Link href="/random-forest">
                        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer group">
                            <div className="flex items-center justify-center w-16 h-16 bg-teal-100 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                                <Trees className="w-8 h-8 text-teal-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">
                                Random Forest Lab
                            </h2>
                            <p className="text-gray-600 mb-4">
                                Explore ensemble learning with multiple trees
                            </p>
                            <ul className="space-y-2 text-sm text-gray-500">
                                <li>✓ Forest visualization</li>
                                <li>✓ Bootstrapping explained</li>
                                <li>✓ Voting mechanism</li>
                                <li>✓ Feature importance</li>
                            </ul>
                        </div>
                    </Link>
                </div>
            </div>
        </main>
    )
}
