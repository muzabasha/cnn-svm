import Link from 'next/link'
import { Brain, Network, TreeDeciduous, Calculator, Trees, User, TrendingUp, Users, Target, BarChart3, MessageSquare, Zap, GitBranch, Layers } from 'lucide-react'

export default function Home() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="max-w-6xl w-full">
                <div className="text-center mb-8 sm:mb-12">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
                        AI Virtual Lab
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600 px-4">
                        Learn by Doing - Experiential AI Education
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-2">
                        Aligned with NEP 2020 Principles
                    </p>
                    <div className="mt-4 sm:mt-6">
                        <Link href="/profile">
                            <button className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm sm:text-base rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl mx-auto active:scale-95">
                                <User className="w-4 h-4 sm:w-5 sm:h-5" />
                                About the Creator
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    <Link href="/cnn">
                        <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer group active:scale-98">
                            <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-blue-100 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                                <Brain className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600" />
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                                CNN Virtual Lab
                            </h2>
                            <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                                Explore Convolutional Neural Networks step-by-step
                            </p>
                            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-500">
                                <li>✓ Layer-by-layer visualization</li>
                                <li>✓ Interactive convolution operations</li>
                                <li>✓ Mathematical explanations</li>
                                <li>✓ Synthetic image experiments</li>
                            </ul>
                        </div>
                    </Link>

                    <Link href="/svm">
                        <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer group active:scale-98">
                            <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-purple-100 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                                <Network className="w-7 h-7 sm:w-8 sm:h-8 text-purple-600" />
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                                SVM Virtual Lab
                            </h2>
                            <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                                Master Support Vector Machines through experimentation
                            </p>
                            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-500">
                                <li>✓ Hyperplane visualization</li>
                                <li>✓ Kernel experiments</li>
                                <li>✓ Hyperparameter tuning</li>
                                <li>✓ Real-time decision boundaries</li>
                            </ul>
                        </div>
                    </Link>

                    <Link href="/decision-tree">
                        <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer group active:scale-98">
                            <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                                <TreeDeciduous className="w-7 h-7 sm:w-8 sm:h-8 text-green-600" />
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                                Decision Tree Lab
                            </h2>
                            <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                                Build and visualize decision trees interactively
                            </p>
                            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-500">
                                <li>✓ Tree growth animation</li>
                                <li>✓ Splitting criteria (Gini, Entropy)</li>
                                <li>✓ Pruning techniques</li>
                                <li>✓ Interactive tree builder</li>
                            </ul>
                        </div>
                    </Link>

                    <Link href="/naive-bayes">
                        <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer group active:scale-98">
                            <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-purple-100 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                                <Calculator className="w-7 h-7 sm:w-8 sm:h-8 text-purple-600" />
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                                Naive Bayes Lab
                            </h2>
                            <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                                Understand probabilistic classification
                            </p>
                            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-500">
                                <li>✓ Bayes' theorem explained</li>
                                <li>✓ Probability calculator</li>
                                <li>✓ Text classification demo</li>
                                <li>✓ Conditional probability</li>
                            </ul>
                        </div>
                    </Link>

                    <Link href="/random-forest">
                        <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer group active:scale-98">
                            <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-teal-100 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                                <Trees className="w-7 h-7 sm:w-8 sm:h-8 text-teal-600" />
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                                Random Forest Lab
                            </h2>
                            <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                                Explore ensemble learning with multiple trees
                            </p>
                            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-500">
                                <li>✓ Forest visualization</li>
                                <li>✓ Bootstrapping explained</li>
                                <li>✓ Voting mechanism</li>
                                <li>✓ Feature importance</li>
                            </ul>
                        </div>
                    </Link>

                    <Link href="/logistic-regression">
                        <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer group active:scale-98">
                            <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-purple-100 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                                <TrendingUp className="w-7 h-7 sm:w-8 sm:h-8 text-purple-600" />
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                                Logistic Regression Lab
                            </h2>
                            <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                                Master binary and multiclass classification
                            </p>
                            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-500">
                                <li>✓ Sigmoid function visualization</li>
                                <li>✓ Decision boundary exploration</li>
                                <li>✓ Cost function optimization</li>
                                <li>✓ Multiclass classification</li>
                            </ul>
                        </div>
                    </Link>

                    <Link href="/knn">
                        <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer group active:scale-98">
                            <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                                <Users className="w-7 h-7 sm:w-8 sm:h-8 text-green-600" />
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                                K-Nearest Neighbors Lab
                            </h2>
                            <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                                Understand instance-based learning
                            </p>
                            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-500">
                                <li>✓ Distance metrics comparison</li>
                                <li>✓ K-value impact analysis</li>
                                <li>✓ Weighted voting mechanisms</li>
                                <li>✓ Interactive classifier</li>
                            </ul>
                        </div>
                    </Link>

                    <Link href="/kmeans">
                        <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer group active:scale-98">
                            <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-cyan-100 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                                <Target className="w-7 h-7 sm:w-8 sm:h-8 text-cyan-600" />
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                                K-Means Clustering Lab
                            </h2>
                            <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                                Explore unsupervised learning
                            </p>
                            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-500">
                                <li>✓ Clustering visualization</li>
                                <li>✓ Centroid evolution tracking</li>
                                <li>✓ Elbow method for optimal K</li>
                                <li>✓ Initialization strategies</li>
                            </ul>
                        </div>
                    </Link>

                    <Link href="/multiple-regression">
                        <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer group active:scale-98">
                            <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-orange-100 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                                <BarChart3 className="w-7 h-7 sm:w-8 sm:h-8 text-orange-600" />
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                                Multiple Regression Lab
                            </h2>
                            <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                                Master multivariate regression
                            </p>
                            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-500">
                                <li>✓ Multiple features modeling</li>
                                <li>✓ Feature scaling techniques</li>
                                <li>✓ Polynomial features</li>
                                <li>✓ Regularization (Ridge, Lasso)</li>
                            </ul>
                        </div>
                    </Link>

                    <Link href="/nlp">
                        <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer group active:scale-98">
                            <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-indigo-100 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                                <MessageSquare className="w-7 h-7 sm:w-8 sm:h-8 text-indigo-600" />
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                                NLP & Language Models Lab
                            </h2>
                            <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                                Explore modern natural language processing
                            </p>
                            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-500">
                                <li>✓ Word embeddings & semantic spaces</li>
                                <li>✓ Attention mechanisms</li>
                                <li>✓ Transformer architecture (BERT/GPT)</li>
                                <li>✓ Tokenization & sentiment analysis</li>
                            </ul>
                        </div>
                    </Link>

                    <Link href="/ann">
                        <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer group active:scale-98">
                            <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-blue-100 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                                <Zap className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600" />
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                                Artificial Neural Networks Lab
                            </h2>
                            <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                                Master the fundamentals of neural networks
                            </p>
                            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-500">
                                <li>✓ Neuron & perceptron basics</li>
                                <li>✓ Backpropagation visualization</li>
                                <li>✓ Network architecture design</li>
                                <li>✓ Activation functions comparison</li>
                            </ul>
                        </div>
                    </Link>

                    <Link href="/rnn">
                        <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer group active:scale-98">
                            <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-purple-100 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                                <GitBranch className="w-7 h-7 sm:w-8 sm:h-8 text-purple-600" />
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                                Recurrent Neural Networks Lab
                            </h2>
                            <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                                Explore sequential data processing
                            </p>
                            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-500">
                                <li>✓ Sequence processing with RNNs</li>
                                <li>✓ LSTM & GRU architectures</li>
                                <li>✓ Vanishing gradient problem</li>
                                <li>✓ Time series prediction</li>
                            </ul>
                        </div>
                    </Link>

                    <Link href="/dnn">
                        <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer group active:scale-98">
                            <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-emerald-100 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                                <Layers className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-600" />
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                                Deep Neural Networks Lab
                            </h2>
                            <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                                Build and experiment with deep architectures
                            </p>
                            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-500">
                                <li>✓ Interactive network builder</li>
                                <li>✓ Layer visualization & data flow</li>
                                <li>✓ Dropout & batch normalization</li>
                                <li>✓ Overfitting & regularization</li>
                            </ul>
                        </div>
                    </Link>
                </div>
            </div>
        </main>
    )
}
