'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react'

export default function DataValidationPage() {
    const [selectedCheck, setSelectedCheck] = useState('quality')

    const checks = [
        { id: 'quality', name: 'Quality Checks', icon: '✅' },
        { id: 'consistency', name: 'Consistency', icon: '🔄' },
        { id: 'completeness', name: 'Completeness', icon: '📋' },
        { id: 'accuracy', name: 'Accuracy', icon: '🎯' }
    ]

    const renderCheck = () => {
        switch (selectedCheck) {
            case 'quality':
                return <QualityChecks />
            case 'consistency':
                return <ConsistencyChecks />
            case 'completeness':
                return <CompletenessChecks />
            case 'accuracy':
                return <AccuracyChecks />
            default:
                return <QualityChecks />
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-6 sm:mb-8">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
                        ✅ Data Validation Lab
                    </h1>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                        Taste-test your ingredients! Make sure everything is fresh and ready.
                    </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
                    {checks.map((check) => (
                        <button
                            key={check.id}
                            onClick={() => setSelectedCheck(check.id)}
                            className={`p-4 rounded-xl border-2 transition-all ${selectedCheck === check.id
                                    ? 'border-yellow-500 bg-yellow-50 shadow-lg'
                                    : 'border-gray-200 bg-white hover:bg-gray-50'
                                }`}
                        >
                            <div className="text-3xl mb-2">{check.icon}</div>
                            <div className="text-sm font-semibold text-gray-900">{check.name}</div>
                        </button>
                    ))}
                </div>

                <div className="mt-6 sm:mt-8">
                    {renderCheck()}
                </div>
            </div>
        </div>
    )
}

function QualityChecks() {
    const qualityTests = [
        { test: 'Data Type Check', status: 'pass', message: 'All columns have correct data types' },
        { test: 'Range Check', status: 'pass', message: 'Age values between 0-120' },
        { test: 'Format Check', status: 'fail', message: '3 email addresses have invalid format' },
        { test: 'Duplicate Check', status: 'warning', message: '2 duplicate records found' }
    ]

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Quality Control: Ingredient Inspection</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 mb-6">
                        Like a chef checking if vegetables are fresh, we inspect data quality before using it!
                    </p>

                    <div className="space-y-3">
                        {qualityTests.map((test, idx) => (
                            <div
                                key={idx}
                                className={`p-4 rounded-lg border-2 flex items-start gap-4 ${test.status === 'pass'
                                        ? 'bg-green-50 border-green-300'
                                        : test.status === 'fail'
                                            ? 'bg-red-50 border-red-300'
                                            : 'bg-yellow-50 border-yellow-300'
                                    }`}
                            >
                                <div className="flex-shrink-0 mt-1">
                                    {test.status === 'pass' && <CheckCircle className="w-6 h-6 text-green-600" />}
                                    {test.status === 'fail' && <XCircle className="w-6 h-6 text-red-600" />}
                                    {test.status === 'warning' && <AlertCircle className="w-6 h-6 text-yellow-600" />}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900 mb-1">{test.test}</h4>
                                    <p className="text-sm text-gray-700">{test.message}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-green-50 rounded-lg text-center">
                            <div className="text-3xl font-bold text-green-600">2</div>
                            <div className="text-sm text-green-700">Tests Passed</div>
                        </div>
                        <div className="p-4 bg-red-50 rounded-lg text-center">
                            <div className="text-3xl font-bold text-red-600">1</div>
                            <div className="text-sm text-red-700">Tests Failed</div>
                        </div>
                        <div className="p-4 bg-yellow-50 rounded-lg text-center">
                            <div className="text-3xl font-bold text-yellow-600">1</div>
                            <div className="text-sm text-yellow-700">Warnings</div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Common Quality Checks</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <div className="text-2xl mb-2">🔢</div>
                            <h4 className="font-semibold text-blue-900 mb-2">Data Type Validation</h4>
                            <p className="text-xs text-blue-700">
                                Is age a number? Is email text? Like checking if you grabbed salt, not sugar!
                            </p>
                        </div>

                        <div className="p-4 bg-green-50 rounded-lg">
                            <div className="text-2xl mb-2">📏</div>
                            <h4 className="font-semibold text-green-900 mb-2">Range Validation</h4>
                            <p className="text-xs text-green-700">
                                Age can't be 200! Salary can't be negative! Like checking ingredient amounts make sense.
                            </p>
                        </div>

                        <div className="p-4 bg-purple-50 rounded-lg">
                            <div className="text-2xl mb-2">📧</div>
                            <h4 className="font-semibold text-purple-900 mb-2">Format Validation</h4>
                            <p className="text-xs text-purple-700">
                                Email must have @. Phone must be 10 digits. Like checking recipe format is correct!
                            </p>
                        </div>

                        <div className="p-4 bg-orange-50 rounded-lg">
                            <div className="text-2xl mb-2">🔄</div>
                            <h4 className="font-semibold text-orange-900 mb-2">Duplicate Detection</h4>
                            <p className="text-xs text-orange-700">
                                Same person twice? Like accidentally adding salt twice to your recipe!
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

function ConsistencyChecks() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Consistency: Everything Should Match</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-gray-600 mb-6">
                    Like making sure all your measurements use the same units (all cups, not mixing cups and liters)!
                </p>

                <div className="space-y-4">
                    <div className="p-4 bg-red-50 border-2 border-red-300 rounded-lg">
                        <h4 className="font-semibold text-red-900 mb-2">❌ Inconsistent Example</h4>
                        <div className="text-sm text-red-700 space-y-1">
                            <p>• Person 1: Country = "USA", State = "California"</p>
                            <p>• Person 2: Country = "USA", State = "Ontario" ❌ (Ontario is in Canada!)</p>
                        </div>
                    </div>

                    <div className="p-4 bg-green-50 border-2 border-green-300 rounded-lg">
                        <h4 className="font-semibold text-green-900 mb-2">✅ Consistent Example</h4>
                        <div className="text-sm text-green-700 space-y-1">
                            <p>• Person 1: Country = "USA", State = "California"</p>
                            <p>• Person 2: Country = "USA", State = "Texas" ✅</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl mb-2">🗓️</div>
                        <h4 className="font-semibold text-blue-900 mb-2">Date Consistency</h4>
                        <p className="text-xs text-blue-700">
                            Birth date should be before hire date. Start date before end date!
                        </p>
                    </div>

                    <div className="p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl mb-2">🔗</div>
                        <h4 className="font-semibold text-purple-900 mb-2">Referential Integrity</h4>
                        <p className="text-xs text-purple-700">
                            If order references customer ID 123, customer 123 must exist!
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

function CompletenessChecks() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Completeness: Got All Ingredients?</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-gray-600 mb-6">
                    Like checking you have all ingredients before starting to cook. Missing flour? Can't make bread!
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-semibold mb-3">Required Fields Check</h4>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 p-2 bg-green-50 rounded">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                                <span className="text-sm">Customer ID: Present</span>
                            </div>
                            <div className="flex items-center gap-2 p-2 bg-green-50 rounded">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                                <span className="text-sm">Email: Present</span>
                            </div>
                            <div className="flex items-center gap-2 p-2 bg-red-50 rounded">
                                <XCircle className="w-5 h-5 text-red-600" />
                                <span className="text-sm">Phone: Missing (15% of records)</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-3">Completeness Score</h4>
                        <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg text-center">
                            <div className="text-5xl font-bold text-blue-600 mb-2">85%</div>
                            <div className="text-sm text-gray-700">Overall Completeness</div>
                            <div className="mt-4 text-xs text-gray-600">
                                85 out of 100 required fields are filled
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <h4 className="font-semibold text-yellow-900 mb-2">💡 Completeness Tips</h4>
                    <ul className="text-xs text-yellow-700 space-y-1 list-disc list-inside">
                        <li>Define which fields are mandatory vs optional</li>
                        <li>Set minimum completeness thresholds (e.g., 95%)</li>
                        <li>Track completeness over time - is it improving?</li>
                        <li>Investigate why data is missing - system issue or user behavior?</li>
                    </ul>
                </div>
            </CardContent>
        </Card>
    )
}

function AccuracyChecks() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Accuracy: Is the Data Correct?</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-gray-600 mb-6">
                    Like tasting your dish - does it taste right? Is the seasoning correct?
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-blue-50 rounded-xl">
                        <div className="text-4xl mb-3">🎯</div>
                        <h3 className="text-lg font-bold text-blue-900 mb-3">Cross-Validation</h3>
                        <p className="text-sm text-blue-700 mb-4">
                            Compare data against known truth
                        </p>
                        <div className="space-y-2 text-xs text-blue-600">
                            <p>✓ Check addresses against postal database</p>
                            <p>✓ Verify phone numbers are real</p>
                            <p>✓ Confirm email domains exist</p>
                        </div>
                    </div>

                    <div className="p-6 bg-green-50 rounded-xl">
                        <div className="text-4xl mb-3">📊</div>
                        <h3 className="text-lg font-bold text-green-900 mb-3">Statistical Checks</h3>
                        <p className="text-sm text-green-700 mb-4">
                            Use statistics to spot errors
                        </p>
                        <div className="space-y-2 text-xs text-green-600">
                            <p>✓ Outlier detection (age = 200?)</p>
                            <p>✓ Distribution analysis</p>
                            <p>✓ Correlation checks</p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-3">Common Accuracy Issues</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="font-semibold text-purple-800 mb-1">Data Entry Errors</p>
                            <p className="text-xs text-purple-700">Typos, transposed digits, wrong selections</p>
                        </div>
                        <div>
                            <p className="font-semibold text-purple-800 mb-1">Measurement Errors</p>
                            <p className="text-xs text-purple-700">Wrong units, calibration issues, rounding</p>
                        </div>
                        <div>
                            <p className="font-semibold text-purple-800 mb-1">Outdated Data</p>
                            <p className="text-xs text-purple-700">Old addresses, expired info, stale records</p>
                        </div>
                        <div>
                            <p className="font-semibold text-purple-800 mb-1">System Errors</p>
                            <p className="text-xs text-purple-700">Integration bugs, data corruption, sync issues</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
