import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Head, Link } from '@inertiajs/react';

interface Result {
    id: number;
    score: number;
    total_questions: number;
    percentage: number;
    started_at: string;
    completed_at: string;
    time_taken: number;
    test: {
        id: number;
        test_name: string;
        category: {
            id: number;
            category_name: string;
        };
    };
}

interface TestResultProps {
    result: Result;
    [key: string]: unknown;
}

export default function TestResult({ result }: TestResultProps) {
    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        if (hours > 0) {
            return `${hours}h ${minutes}m ${secs}s`;
        }
        return `${minutes}m ${secs}s`;
    };

    const formatDateTime = (dateTimeString: string) => {
        return new Date(dateTimeString).toLocaleString();
    };

    const getGrade = (percentage: number) => {
        if (percentage >= 90) return { grade: 'A+', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' };
        if (percentage >= 85) return { grade: 'A', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' };
        if (percentage >= 80) return { grade: 'B+', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' };
        if (percentage >= 75) return { grade: 'B', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' };
        if (percentage >= 70) return { grade: 'C+', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' };
        if (percentage >= 65) return { grade: 'C', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' };
        if (percentage >= 60) return { grade: 'D+', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' };
        if (percentage >= 55) return { grade: 'D', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' };
        return { grade: 'F', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' };
    };

    const gradeInfo = getGrade(result.percentage);

    const getPerformanceMessage = (percentage: number) => {
        if (percentage >= 90) return { emoji: '🎉', message: 'Outstanding! Excellent work!' };
        if (percentage >= 80) return { emoji: '👏', message: 'Great job! Well done!' };
        if (percentage >= 70) return { emoji: '👍', message: 'Good work! Keep it up!' };
        if (percentage >= 60) return { emoji: '📚', message: 'Keep studying and practicing!' };
        return { emoji: '💪', message: 'Don\'t give up! Practice makes perfect!' };
    };

    const performance = getPerformanceMessage(result.percentage);

    return (
        <AppShell>
            <Head title={`Test Results - ${result.test.test_name}`} />
            
            <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="text-6xl mb-4">{performance.emoji}</div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Test Completed!
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        {performance.message}
                    </p>
                </div>

                {/* Results Card */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-8">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-6 text-white">
                        <h2 className="text-2xl font-bold">{result.test.test_name}</h2>
                        <p className="text-blue-100">{result.test.category.category_name}</p>
                    </div>

                    <div className="p-6">
                        {/* Score Overview */}
                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                            <div className="text-center">
                                <div className="text-4xl font-bold text-blue-600 mb-2">
                                    {result.score}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-300">
                                    Correct Answers
                                </div>
                                <div className="text-xs text-gray-500">
                                    out of {result.total_questions}
                                </div>
                            </div>

                            <div className="text-center">
                                <div className="text-4xl font-bold text-green-600 mb-2">
                                    {result.percentage.toFixed(1)}%
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-300">
                                    Score Percentage
                                </div>
                                <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${gradeInfo.bg} ${gradeInfo.color} ${gradeInfo.border} border`}>
                                    Grade: {gradeInfo.grade}
                                </div>
                            </div>

                            <div className="text-center">
                                <div className="text-4xl font-bold text-purple-600 mb-2">
                                    {formatTime(result.time_taken)}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-300">
                                    Time Taken
                                </div>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-8">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Your Score
                                </span>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {result.percentage.toFixed(1)}%
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
                                <div 
                                    className="bg-gradient-to-r from-blue-500 to-green-500 h-4 rounded-full transition-all duration-1000 ease-out"
                                    style={{ width: `${result.percentage}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Detailed Information */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    📊 Test Statistics
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-300">Started:</span>
                                        <span className="font-medium text-sm">{formatDateTime(result.started_at)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-300">Completed:</span>
                                        <span className="font-medium text-sm">{formatDateTime(result.completed_at)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-300">Correct Answers:</span>
                                        <span className="font-medium text-green-600">{result.score}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-300">Incorrect Answers:</span>
                                        <span className="font-medium text-red-600">{result.total_questions - result.score}</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    🎯 Performance Analysis
                                </h3>
                                <div className="space-y-3">
                                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                        <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">Accuracy Rate</div>
                                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                            {result.percentage.toFixed(1)}%
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                        <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">Average Time per Question</div>
                                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                            {formatTime(Math.round(result.time_taken / result.total_questions))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button
                        disabled
                        className="bg-gray-300 text-gray-500 px-6 py-3 rounded-lg font-medium cursor-not-allowed text-center"
                    >
                        📖 Review Answers (Coming Soon)
                    </button>
                    
                    <Link
                        href={route('tests.index')}
                        className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors text-center"
                    >
                        🎯 Take Another Test
                    </Link>
                    
                    <Link
                        href={route('dashboard')}
                        className="bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors text-center"
                    >
                        🏠 Back to Dashboard
                    </Link>
                </div>

                {/* Improvement Tips */}
                {result.percentage < 80 && (
                    <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
                            💡 Tips for Improvement
                        </h3>
                        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                            <li>• Review the questions you got wrong to understand the correct answers</li>
                            <li>• Practice similar questions in the same category</li>
                            <li>• Focus on areas where you made the most mistakes</li>
                            <li>• Take your time to read questions carefully</li>
                            <li>• Consider studying Korean grammar and vocabulary more</li>
                        </ul>
                    </div>
                )}
            </div>
        </AppShell>
    );
}