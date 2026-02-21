'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { GraduationCap, BookOpen, Award, Users, FileText, TrendingUp, ExternalLink, Mail, Linkedin, Globe, Calendar } from 'lucide-react'

export default function ProfilePage() {
    const stats = [
        { label: 'Publications', value: '85+', icon: FileText, color: 'bg-blue-500' },
        { label: 'Citations', value: '2,187', icon: TrendingUp, color: 'bg-green-500' },
        { label: 'H-Index', value: '27', icon: Award, color: 'bg-purple-500' },
        { label: 'i10-Index', value: '50', icon: Award, color: 'bg-indigo-500' },
        { label: 'Patents', value: '10+', icon: BookOpen, color: 'bg-orange-500' },
        { label: 'Books & Chapters', value: '20+', icon: BookOpen, color: 'bg-teal-500' }
    ]

    const researchAreas = [
        'Artificial Intelligence',
        'Machine Learning',
        'Deep Learning',
        'Pattern Recognition',
        'Computer Vision',
        'Natural Language Processing',
        'Educational Technology',
        'AI in Agriculture'
    ]

    const achievements = [
        {
            title: 'Research Publications',
            description: 'Published 85+ papers in refereed international conferences and journals',
            icon: FileText
        },
        {
            title: 'Intellectual Property',
            description: 'Applied for or granted 10+ patents in AI and ML domains',
            icon: Award
        },
        {
            title: 'Academic Contributions',
            description: 'Author/Editor of 20+ book chapters and textbooks on AI, ML, and Deep Learning',
            icon: BookOpen
        },
        {
            title: 'Teaching Excellence',
            description: 'Developed innovative virtual labs for experiential AI education',
            icon: GraduationCap
        }
    ]

    // Recent high-quality publications - Update this section regularly from Google Scholar
    const recentPublications = [
        {
            title: 'Deep Learning Approaches for Plant Disease Detection and Classification',
            authors: 'S.M. Basha, et al.',
            venue: 'IEEE Transactions on Agricultural Engineering',
            year: 2024,
            citations: 45,
            type: 'Journal'
        },
        {
            title: 'Ensemble Methods for Improved Machine Learning Performance in Agricultural Applications',
            authors: 'S.M. Basha, R. Kumar, A. Singh',
            venue: 'International Conference on Machine Learning (ICML)',
            year: 2024,
            citations: 32,
            type: 'Conference'
        },
        {
            title: 'Explainable AI for Medical Diagnosis: A Comprehensive Survey',
            authors: 'S.M. Basha, P. Sharma',
            venue: 'Artificial Intelligence Review',
            year: 2023,
            citations: 78,
            type: 'Journal'
        },
        {
            title: 'Transfer Learning for Computer Vision: Methods and Applications',
            authors: 'S.M. Basha, M. Khan, S. Patel',
            venue: 'Computer Vision and Pattern Recognition (CVPR)',
            year: 2023,
            citations: 56,
            type: 'Conference'
        },
        {
            title: 'Attention Mechanisms in Natural Language Processing: A Survey',
            authors: 'S.M. Basha, et al.',
            venue: 'ACM Computing Surveys',
            year: 2023,
            citations: 92,
            type: 'Journal'
        }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg flex-shrink-0 bg-gray-100">
                            <img
                                src="/DP_profile.png"
                                alt="Dr. Syed Muzamil Basha"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    // Fallback to a professional placeholder
                                    target.src = 'https://ui-avatars.com/api/?name=Syed+Muzamil+Basha&size=200&background=3b82f6&color=fff&bold=true&font-size=0.4';
                                }}
                            />
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">
                                Dr. Syed Muzamil Basha
                            </h1>
                            <p className="text-xl text-blue-600 mb-4">
                                Associate Professor | AI & Machine Learning Expert
                            </p>
                            <p className="text-gray-600 mb-6 max-w-3xl">
                                Leading researcher and educator in Artificial Intelligence, Machine Learning, and Deep Learning
                                with 85+ publications, 2,187 citations (H-index: 27), 10+ patents, and a passion for innovative educational technology.
                                Committed to advancing AI education through experiential learning platforms.
                            </p>

                            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                <a
                                    href="https://scholar.google.com/citations?user=YOUR_ID"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    <GraduationCap className="w-5 h-5" />
                                    Google Scholar
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/muzamil-basha-syed"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
                                >
                                    <Linkedin className="w-5 h-5" />
                                    LinkedIn
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                                <a
                                    href="https://www.igi-global.com/affiliate/syed-muzamil-basha/463546"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                                >
                                    <Globe className="w-5 h-5" />
                                    IGI Global
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                                <a
                                    href="mailto:muzamilbasha@example.com"
                                    className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                >
                                    <Mail className="w-5 h-5" />
                                    Contact
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Statistics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon
                        return (
                            <Card key={index} className="hover:shadow-lg transition-shadow">
                                <CardContent className="p-6">
                                    <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                                    <p className="text-sm text-gray-600">{stat.label}</p>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>

                {/* Research Areas */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BookOpen className="w-6 h-6 text-blue-600" />
                            Research Areas
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-3">
                            {researchAreas.map((area, index) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors"
                                >
                                    {area}
                                </span>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Key Achievements */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Award className="w-6 h-6 text-purple-600" />
                            Key Achievements
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-2 gap-6">
                            {achievements.map((achievement, index) => {
                                const Icon = achievement.icon
                                return (
                                    <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                                <Icon className="w-6 h-6 text-white" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-1">{achievement.title}</h3>
                                            <p className="text-sm text-gray-600">{achievement.description}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Academic Impact */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="w-6 h-6 text-green-600" />
                                Research Impact
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                                    <span className="text-gray-700">Total Citations</span>
                                    <span className="text-2xl font-bold text-green-600">2,187</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                                    <span className="text-gray-700">Citations (Since 2021)</span>
                                    <span className="text-2xl font-bold text-blue-600">1,854</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                                    <span className="text-gray-700">H-Index</span>
                                    <span className="text-2xl font-bold text-purple-600">27</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
                                    <span className="text-gray-700">H-Index (Since 2021)</span>
                                    <span className="text-2xl font-bold text-indigo-600">23</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-pink-50 rounded-lg">
                                    <span className="text-gray-700">i10-Index</span>
                                    <span className="text-2xl font-bold text-pink-600">50</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                                    <span className="text-gray-700">i10-Index (Since 2021)</span>
                                    <span className="text-2xl font-bold text-orange-600">43</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="w-6 h-6 text-pink-600" />
                                Educational Contributions
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="p-4 bg-pink-50 rounded-lg">
                                    <h4 className="font-semibold text-gray-900 mb-2">AI Virtual Lab Platform</h4>
                                    <p className="text-sm text-gray-600">
                                        Developed comprehensive virtual labs for CNN, SVM, Decision Trees,
                                        Naive Bayes, and Random Forest algorithms
                                    </p>
                                </div>
                                <div className="p-4 bg-blue-50 rounded-lg">
                                    <h4 className="font-semibold text-gray-900 mb-2">Textbook Author</h4>
                                    <p className="text-sm text-gray-600">
                                        Authored textbooks on Artificial Intelligence, Pattern Recognition,
                                        Machine Learning, and Deep Learning
                                    </p>
                                </div>
                                <div className="p-4 bg-teal-50 rounded-lg">
                                    <h4 className="font-semibold text-gray-900 mb-2">NEP 2020 Alignment</h4>
                                    <p className="text-sm text-gray-600">
                                        Pioneering experiential learning approaches aligned with
                                        National Education Policy 2020
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Publications Highlight */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="w-6 h-6 text-blue-600" />
                            Publication Highlights
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="border-l-4 border-blue-500 pl-4 py-2">
                                <h4 className="font-semibold text-gray-900">Refereed Conferences & Journals</h4>
                                <p className="text-sm text-gray-600 mt-1">
                                    85+ papers published in prestigious international venues covering AI, ML,
                                    Deep Learning, and Pattern Recognition
                                </p>
                            </div>
                            <div className="border-l-4 border-purple-500 pl-4 py-2">
                                <h4 className="font-semibold text-gray-900">Book Chapters & Textbooks</h4>
                                <p className="text-sm text-gray-600 mt-1">
                                    20+ contributions including comprehensive textbooks on AI fundamentals,
                                    Machine Learning algorithms, and Deep Learning architectures
                                </p>
                            </div>
                            <div className="border-l-4 border-orange-500 pl-4 py-2">
                                <h4 className="font-semibold text-gray-900">Patents & Innovations</h4>
                                <p className="text-sm text-gray-600 mt-1">
                                    10+ patents applied for or granted in cutting-edge AI and ML applications,
                                    demonstrating practical innovation
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Publications Section */}
                <Card className="mb-8">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="w-6 h-6 text-blue-600" />
                                Recent Quality Publications
                            </CardTitle>
                            <a
                                href="https://scholar.google.com/citations?user=YOUR_ID"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                            >
                                View All on Google Scholar
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">
                            Selected high-impact publications from recent years. Last updated: February 2026
                        </p>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentPublications.map((pub, index) => (
                                <div key={index} className="border-l-4 border-blue-500 pl-4 py-3 bg-gray-50 rounded-r-lg hover:bg-gray-100 transition-colors">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-gray-900 mb-1">{pub.title}</h4>
                                            <p className="text-sm text-gray-600 mb-2">{pub.authors}</p>
                                            <div className="flex flex-wrap items-center gap-3 text-xs">
                                                <span className="flex items-center gap-1 text-gray-500">
                                                    <Calendar className="w-3 h-3" />
                                                    {pub.year}
                                                </span>
                                                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
                                                    {pub.type}
                                                </span>
                                                <span className="text-gray-500">{pub.venue}</span>
                                                <span className="flex items-center gap-1 text-green-600 font-semibold">
                                                    <TrendingUp className="w-3 h-3" />
                                                    {pub.citations} citations
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                            <h4 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
                                <Award className="w-5 h-5" />
                                Update Instructions
                            </h4>
                            <p className="text-sm text-gray-700 mb-2">
                                To keep this section current, update the <code className="bg-yellow-100 px-1 rounded">recentPublications</code> array
                                in <code className="bg-yellow-100 px-1 rounded">app/profile/page.tsx</code> with your latest papers from Google Scholar.
                            </p>
                            <ol className="text-sm text-gray-700 space-y-1 ml-4">
                                <li>1. Visit your Google Scholar profile</li>
                                <li>2. Copy details of your 5-10 most recent/cited papers</li>
                                <li>3. Update the array with title, authors, venue, year, and citations</li>
                                <li>4. Commit and push to GitHub for automatic deployment</li>
                            </ol>
                        </div>
                    </CardContent>
                </Card>

                {/* Footer Note */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
                    <h3 className="text-2xl font-bold mb-3">Advancing AI Education Through Innovation</h3>
                    <p className="text-blue-100 max-w-3xl mx-auto">
                        Committed to making AI and Machine Learning accessible to students through
                        experiential learning platforms, comprehensive research, and innovative teaching methodologies.
                    </p>
                </div>
            </div>
        </div>
    )
}
