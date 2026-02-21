'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Brain, Network, TreeDeciduous, Calculator, Trees, User, TrendingUp, Users, Target, BarChart3, MessageSquare, Zap, GitBranch, Layers, Map, ChefHat, Sparkles } from 'lucide-react'

export default function Home() {
    const [viewMode, setViewMode] = useState<'mindmap' | 'grid'>('mindmap')

    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-6 sm:mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <ChefHat className="w-10 h-10 sm:w-12 sm:h-12 text-purple-600" />
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                            AI Kitchen Academy
                        </h1>
                        <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-500" />
                    </div>
                    <p className="text-lg sm:text-xl text-gray-700 px-4 mb-2">
                        🍳 From Apprentice to Master Chef: Your AI Learning Journey
                    </p>
                    <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto px-4">
                        Just like learning to cook, mastering AI starts with basic ingredients (data),
                        simple recipes (algorithms), and gradually builds to creating masterpieces!
                    </p>

                    <div className="flex items-center justify-center gap-4 mt-6">
                        <button
                            onClick={() => setViewMode('mindmap')}
                            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all shadow-lg ${viewMode === 'mindmap'
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            <Map className="w-4 h-4 sm:w-5 sm:h-5" />
                            Learning Journey
                        </button>
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all shadow-lg ${viewMode === 'grid'
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            <Brain className="w-4 h-4 sm:w-5 sm:h-5" />
                            All Labs
                        </button>
                        <Link href="/profile">
                            <button className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg">
                                <User className="w-4 h-4 sm:w-5 sm:h-5" />
                                Creator
                            </button>
                        </Link>
                    </div>
                </div>

                {viewMode === 'mindmap' ? <LearningJourneyMindMap /> : <AllLabsGrid />}
            </div>
        </main>
    )
}

function LearningJourneyMindMap() {
    const [expandedLevel, setExpandedLevel] = useState<number | null>(null)

    const levels = [
        {
            level: 0,
            title: "🧑‍🎓 Kitchen Prep: Before You Start",
            subtitle: "Setting up your kitchen and understanding basics",
            description: "Before cooking, every chef learns knife skills, measurements, and ingredient prep. These are your foundational skills!",
            color: "from-pink-400 to-rose-500",
            bgColor: "bg-pink-50",
            borderColor: "border-pink-300",
            labs: [
                {
                    name: "Math Basics",
                    icon: <Calculator className="w-6 h-6" />,
                    link: "/math-basics",
                    analogy: "🧮 Kitchen Math",
                    description: "Vectors, derivatives, probability - the math behind cooking!"
                },
                {
                    name: "Data Exploration",
                    icon: <Target className="w-6 h-6" />,
                    link: "/data-exploration",
                    analogy: "🔍 Inspect Ingredients",
                    description: "Look at your data: What do you have? What's it look like?"
                },
                {
                    name: "Data Preprocessing",
                    icon: <TreeDeciduous className="w-6 h-6" />,
                    link: "/data-preprocessing",
                    analogy: "🧹 Prep & Clean",
                    description: "Wash, chop, measure - get your data ready to cook!"
                },
                {
                    name: "Data Validation",
                    icon: <Calculator className="w-6 h-6" />,
                    link: "/data-validation",
                    analogy: "✅ Quality Check",
                    description: "Taste test! Make sure everything is fresh and correct"
                }
            ]
        },
        {
            level: 1,
            title: "🥚 Apprentice: Basic Ingredients",
            subtitle: "Understanding your raw materials",
            description: "Every chef starts by learning about ingredients. In AI, we start with understanding data and basic patterns.",
            color: "from-green-400 to-emerald-500",
            bgColor: "bg-green-50",
            borderColor: "border-green-300",
            labs: [
                {
                    name: "Multiple Regression",
                    icon: <BarChart3 className="w-6 h-6" />,
                    link: "/multiple-regression",
                    analogy: "📊 Measuring Ingredients",
                    description: "Like measuring flour, sugar, and butter to predict cake quality"
                },
                {
                    name: "Logistic Regression",
                    icon: <TrendingUp className="w-6 h-6" />,
                    link: "/logistic-regression",
                    analogy: "🎯 Is it Cooked?",
                    description: "Binary decisions: Is the steak rare or well-done?"
                }
            ]
        },
        {
            level: 2,
            title: "🍳 Line Cook: Basic Recipes",
            subtitle: "Learning fundamental cooking techniques",
            description: "Now you're following recipes! These are your first algorithms - simple, interpretable, and reliable.",
            color: "from-blue-400 to-cyan-500",
            bgColor: "bg-blue-50",
            borderColor: "border-blue-300",
            labs: [
                {
                    name: "K-Nearest Neighbors",
                    icon: <Users className="w-6 h-6" />,
                    link: "/knn",
                    analogy: "👥 Ask Your Neighbors",
                    description: "Like asking 5 nearby chefs: 'What dish did you make with these ingredients?'"
                },
                {
                    name: "Naive Bayes",
                    icon: <Calculator className="w-6 h-6" />,
                    link: "/naive-bayes",
                    analogy: "🎲 Recipe Probability",
                    description: "If it has tomatoes and cheese, it's probably Italian!"
                },
                {
                    name: "Decision Tree",
                    icon: <TreeDeciduous className="w-6 h-6" />,
                    link: "/decision-tree",
                    analogy: "🌳 Recipe Flowchart",
                    description: "If vegetarian? → If spicy? → If Asian? → Make Thai curry!"
                },
                {
                    name: "SVM",
                    icon: <Network className="w-6 h-6" />,
                    link: "/svm",
                    analogy: "✂️ Cutting Board Divider",
                    description: "Draw the perfect line to separate vegetables from meats"
                }
            ]
        },
        {
            level: 3,
            title: "👨‍🍳 Sous Chef: Pattern Recognition",
            subtitle: "Discovering hidden patterns in cuisine",
            description: "You're now recognizing patterns without recipes! Grouping similar dishes and finding what makes them special.",
            color: "from-purple-400 to-pink-500",
            bgColor: "bg-purple-50",
            borderColor: "border-purple-300",
            labs: [
                {
                    name: "K-Means Clustering",
                    icon: <Target className="w-6 h-6" />,
                    link: "/kmeans",
                    analogy: "🎨 Cuisine Categories",
                    description: "Group dishes by similarity: Italian, Asian, Mexican clusters"
                },
                {
                    name: "Random Forest",
                    icon: <Trees className="w-6 h-6" />,
                    link: "/random-forest",
                    analogy: "👥 Kitchen Team Vote",
                    description: "Ask 100 chefs and take the majority opinion!"
                }
            ]
        },
        {
            level: 4,
            title: "🧑‍🍳 Head Chef: Neural Networks",
            subtitle: "Building your own cooking intuition",
            description: "Like developing a chef's intuition through years of practice, neural networks learn complex patterns layer by layer.",
            color: "from-orange-400 to-red-500",
            bgColor: "bg-orange-50",
            borderColor: "border-orange-300",
            labs: [
                {
                    name: "Artificial Neural Networks",
                    icon: <Zap className="w-6 h-6" />,
                    link: "/ann",
                    analogy: "🧠 Taste Memory",
                    description: "Building flavor memory: sweet → savory → umami layers"
                },
                {
                    name: "Deep Neural Networks",
                    icon: <Layers className="w-6 h-6" />,
                    link: "/dnn",
                    analogy: "🏗️ Multi-Course Mastery",
                    description: "Appetizer → Main → Dessert: Deep layers of culinary expertise"
                }
            ]
        },
        {
            level: 5,
            title: "⭐ Master Chef: Specialized Techniques",
            subtitle: "Mastering advanced culinary arts",
            description: "You're now a master! Handling complex scenarios like time-based cooking, visual presentation, and understanding language of food.",
            color: "from-indigo-400 to-purple-600",
            bgColor: "bg-indigo-50",
            borderColor: "border-indigo-300",
            labs: [
                {
                    name: "Recurrent Neural Networks",
                    icon: <GitBranch className="w-6 h-6" />,
                    link: "/rnn",
                    analogy: "⏰ Timing is Everything",
                    description: "Remembering previous steps: marinate → sear → rest → serve"
                },
                {
                    name: "Convolutional Neural Networks",
                    icon: <Brain className="w-6 h-6" />,
                    link: "/cnn",
                    analogy: "📸 Plating Perfection",
                    description: "Recognizing visual patterns: Is this dish Instagram-worthy?"
                },
                {
                    name: "NLP & Language Models",
                    icon: <MessageSquare className="w-6 h-6" />,
                    link: "/nlp",
                    analogy: "📖 Reading Recipes",
                    description: "Understanding food language: 'al dente', 'julienne', 'sauté'"
                }
            ]
        }
    ]

    return (
        <div className="space-y-6">
            {/* Journey Path */}
            <div className="relative">
                {levels.map((level, idx) => (
                    <div key={level.level} className="relative">
                        {/* Connecting Line */}
                        {idx < levels.length - 1 && (
                            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-12 bg-gradient-to-b from-purple-300 to-purple-400 z-0"
                                style={{ top: '100%' }} />
                        )}

                        {/* Level Card */}
                        <div
                            className={`relative z-10 mb-12 cursor-pointer transition-all duration-300 ${expandedLevel === level.level ? 'scale-105' : ''
                                }`}
                            onClick={() => setExpandedLevel(expandedLevel === level.level ? null : level.level)}
                        >
                            {/* Level Header */}
                            <div className={`bg-gradient-to-r ${level.color} rounded-2xl p-6 shadow-xl text-white mb-4`}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-2xl sm:text-3xl font-bold mb-2">{level.title}</h2>
                                        <p className="text-lg opacity-90">{level.subtitle}</p>
                                    </div>
                                    <div className="text-4xl sm:text-5xl font-bold opacity-50">
                                        {level.level}
                                    </div>
                                </div>
                                <p className="mt-4 text-sm sm:text-base opacity-90">{level.description}</p>
                            </div>

                            {/* Labs Grid */}
                            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 transition-all duration-300 ${expandedLevel === level.level ? 'opacity-100 max-h-[2000px]' : 'opacity-70 max-h-[400px]'
                                }`}>
                                {level.labs.map((lab) => (
                                    <Link key={lab.name} href={lab.link}>
                                        <div className={`${level.bgColor} border-2 ${level.borderColor} rounded-xl p-6 hover:shadow-xl transition-all hover:scale-105 active:scale-95`}>
                                            <div className="flex items-start gap-4">
                                                <div className={`p-3 bg-white rounded-lg shadow-md`}>
                                                    {lab.icon}
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-gray-900 mb-1">{lab.name}</h3>
                                                    <p className="text-sm font-semibold text-purple-700 mb-2">{lab.analogy}</p>
                                                    <p className="text-xs text-gray-600">{lab.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Legend */}
            <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-purple-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-yellow-500" />
                    Your Learning Path
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-start gap-2">
                        <span className="text-2xl">🥚</span>
                        <div>
                            <p className="font-semibold text-gray-900">Start Simple</p>
                            <p className="text-gray-600">Learn basic data relationships</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-2">
                        <span className="text-2xl">🍳</span>
                        <div>
                            <p className="font-semibold text-gray-900">Build Foundation</p>
                            <p className="text-gray-600">Master core algorithms</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-2">
                        <span className="text-2xl">👨‍🍳</span>
                        <div>
                            <p className="font-semibold text-gray-900">Find Patterns</p>
                            <p className="text-gray-600">Discover hidden structures</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-2">
                        <span className="text-2xl">🧑‍🍳</span>
                        <div>
                            <p className="font-semibold text-gray-900">Go Deep</p>
                            <p className="text-gray-600">Build neural intuition</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-2">
                        <span className="text-2xl">⭐</span>
                        <div>
                            <p className="font-semibold text-gray-900">Specialize</p>
                            <p className="text-gray-600">Master advanced techniques</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-2">
                        <span className="text-2xl">🎓</span>
                        <div>
                            <p className="font-semibold text-gray-900">Keep Learning</p>
                            <p className="text-gray-600">AI is always evolving!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function AllLabsGrid() {
    const labs = [
        { name: "Multiple Regression", icon: <BarChart3 />, link: "/multiple-regression", color: "orange", level: "Beginner" },
        { name: "Logistic Regression", icon: <TrendingUp />, link: "/logistic-regression", color: "purple", level: "Beginner" },
        { name: "K-Nearest Neighbors", icon: <Users />, link: "/knn", color: "green", level: "Beginner" },
        { name: "Naive Bayes", icon: <Calculator />, link: "/naive-bayes", color: "purple", level: "Beginner" },
        { name: "Decision Tree", icon: <TreeDeciduous />, link: "/decision-tree", color: "green", level: "Intermediate" },
        { name: "SVM", icon: <Network />, link: "/svm", color: "purple", level: "Intermediate" },
        { name: "K-Means Clustering", icon: <Target />, link: "/kmeans", color: "cyan", level: "Intermediate" },
        { name: "Random Forest", icon: <Trees />, link: "/random-forest", color: "teal", level: "Intermediate" },
        { name: "Artificial Neural Networks", icon: <Zap />, link: "/ann", color: "blue", level: "Advanced" },
        { name: "Deep Neural Networks", icon: <Layers />, link: "/dnn", color: "emerald", level: "Advanced" },
        { name: "Recurrent Neural Networks", icon: <GitBranch />, link: "/rnn", color: "purple", level: "Advanced" },
        { name: "Convolutional Neural Networks", icon: <Brain />, link: "/cnn", color: "blue", level: "Advanced" },
        { name: "NLP & Language Models", icon: <MessageSquare />, link: "/nlp", color: "indigo", level: "Advanced" }
    ]

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {labs.map((lab) => (
                <Link key={lab.name} href={lab.link}>
                    <div className={`bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer group active:scale-98`}>
                        <div className={`flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-${lab.color}-100 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform`}>
                            <div className={`w-7 h-7 sm:w-8 sm:h-8 text-${lab.color}-600`}>
                                {lab.icon}
                            </div>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                                {lab.name}
                            </h2>
                            <span className={`text-xs px-2 py-1 rounded-full ${lab.level === 'Beginner' ? 'bg-green-100 text-green-700' :
                                lab.level === 'Intermediate' ? 'bg-blue-100 text-blue-700' :
                                    'bg-purple-100 text-purple-700'
                                }`}>
                                {lab.level}
                            </span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}
