import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Head, Link, router } from '@inertiajs/react';

interface Test {
    id: number;
    test_name: string;
    description: string;
    start_time: string;
    end_time: string;
    duration: number;
    question_count: number;
    randomize_questions: boolean;
    category: {
        id: number;
        category_name: string;
        description: string;
    };
}

interface TestShowProps {
    test: Test;
    [key: string]: unknown;
}

export default function TestShow({ test }: TestShowProps) {
    const handleStartTest = () => {
        router.post(route('tests.store', test.id), {
            action: 'start'
        });
    };

    const formatDateTime = (dateTimeString: string) => {
        return new Date(dateTimeString).toLocaleString();
    };

    return (
        <AppShell>
            <Head title={test.test_name} />
            
            <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <Link 
                        href={route('tests.index')}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                    >
                        ← Back to Tests
                    </Link>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-8 text-white">
                        <div className="flex items-center mb-4">
                            <span className="text-4xl mr-4">📝</span>
                            <div>
                                <h1 className="text-3xl font-bold">{test.test_name}</h1>
                                <p className="text-blue-100 mt-1">{test.category.category_name}</p>
                            </div>
                        </div>
                        
                        {test.description && (
                            <p className="text-blue-50 text-lg">{test.description}</p>
                        )}
                    </div>

                    {/* Test Details */}
                    <div className="p-6">
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    📊 Test Information
                                </h3>
                                
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-300">Duration:</span>
                                        <span className="font-medium">{test.duration} minutes</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-300">Questions:</span>
                                        <span className="font-medium">{test.question_count}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-300">Question Order:</span>
                                        <span className="font-medium">
                                            {test.randomize_questions ? 'Randomized' : 'Fixed'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-300">Available Until:</span>
                                        <span className="font-medium text-sm">
                                            {formatDateTime(test.end_time)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    📚 Category Details
                                </h3>
                                
                                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                                        {test.category.category_name}
                                    </h4>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                                        {test.category.description}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Instructions */}
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-8">
                            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">
                                📋 Test Instructions
                            </h3>
                            <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span>You will have <strong>{test.duration} minutes</strong> to complete {test.question_count} questions</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span>You can navigate between questions using the navigation panel or Previous/Next buttons</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span>Your answers are automatically saved as you select them</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span>The test will auto-submit when time runs out</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span>Make sure you have a stable internet connection</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span>You can only take this test once</span>
                                </li>
                            </ul>
                        </div>

                        {/* System Requirements */}
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-8">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                💻 System Requirements
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-300">
                                <div>
                                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Recommended:</h4>
                                    <ul className="space-y-1">
                                        <li>• Modern web browser (Chrome, Firefox, Safari, Edge)</li>
                                        <li>• Stable internet connection</li>
                                        <li>• Desktop or laptop computer</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Audio Tests:</h4>
                                    <ul className="space-y-1">
                                        <li>• Working speakers or headphones</li>
                                        <li>• Audio enabled in browser</li>
                                        <li>• Volume at comfortable level</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Start Test Button */}
                        <div className="text-center">
                            <button
                                onClick={handleStartTest}
                                className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors shadow-lg"
                            >
                                🚀 Start Test Now
                            </button>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mt-3">
                                Click the button above when you're ready to begin
                            </p>
                        </div>
                    </div>
                </div>

                {/* Warning */}
                <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 dark:bg-yellow-900/20 dark:border-yellow-800">
                    <div className="flex">
                        <div className="text-yellow-400 mr-3">⚠️</div>
                        <div>
                            <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                                Important Notice
                            </h3>
                            <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                                Once you start the test, the timer will begin immediately. Make sure you're ready and have enough time to complete the entire test.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}