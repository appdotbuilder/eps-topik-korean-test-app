import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Head, Link } from '@inertiajs/react';

export default function AdminDashboard() {
    return (
        <AppShell>
            <Head title="Admin Dashboard" />
            
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        🏛️ Admin Dashboard
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                        Manage Korean language tests, questions, and categories
                    </p>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <Link
                        href={route('admin.categories.index')}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-blue-500"
                    >
                        <div className="flex items-center">
                            <div className="text-3xl mr-4">📚</div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Manage Categories
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    Create and organize test categories
                                </p>
                            </div>
                        </div>
                    </Link>

                    <Link
                        href={route('admin.questions.index')}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-green-500"
                    >
                        <div className="flex items-center">
                            <div className="text-3xl mr-4">❓</div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Manage Questions
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    Add, edit, and organize questions
                                </p>
                            </div>
                        </div>
                    </Link>

                    <Link
                        href={route('admin.tests.index')}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-purple-500"
                    >
                        <div className="flex items-center">
                            <div className="text-3xl mr-4">📝</div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Manage Tests
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    Configure and schedule tests
                                </p>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Admin Features Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            📊 System Overview
                        </h3>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-300">Total Categories</span>
                                <span className="font-semibold">Loading...</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-300">Total Questions</span>
                                <span className="font-semibold">Loading...</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-300">Active Tests</span>
                                <span className="font-semibold">Loading...</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-300">Total Results</span>
                                <span className="font-semibold">Loading...</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            🚀 Quick Actions
                        </h3>
                        <div className="space-y-3">
                            <Link
                                href={route('admin.categories.create')}
                                className="block w-full text-left px-4 py-2 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50"
                            >
                                ➕ Add New Category
                            </Link>
                            <Link
                                href={route('admin.questions.create')}
                                className="block w-full text-left px-4 py-2 bg-green-50 text-green-700 rounded hover:bg-green-100 transition-colors dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/50"
                            >
                                ➕ Create Question
                            </Link>
                            <Link
                                href={route('admin.tests.create')}
                                className="block w-full text-left px-4 py-2 bg-purple-50 text-purple-700 rounded hover:bg-purple-100 transition-colors dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-900/50"
                            >
                                ➕ Schedule Test
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Admin Tips */}
                <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                    <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
                        💡 Admin Tips
                    </h3>
                    <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                        <li>• Create categories first, then add questions to organize your content</li>
                        <li>• Use different difficulty levels to provide varied challenge levels</li>
                        <li>• Set appropriate test durations based on question count and difficulty</li>
                        <li>• Enable question randomization for better test security</li>
                        <li>• Regularly review test results to identify areas for improvement</li>
                    </ul>
                </div>
            </div>
        </AppShell>
    );
}