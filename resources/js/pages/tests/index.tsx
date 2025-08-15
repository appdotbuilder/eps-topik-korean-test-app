import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Head, Link } from '@inertiajs/react';

interface Test {
    id: number;
    test_name: string;
    description: string;
    start_time: string;
    end_time: string;
    duration: number;
    question_count: number;
    category: {
        id: number;
        category_name: string;
    };
    is_active: boolean;
}

interface TestsPageProps {
    tests: {
        data: Test[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    [key: string]: unknown;
}

export default function TestsIndex({ tests }: TestsPageProps) {
    const formatDateTime = (dateTimeString: string) => {
        return new Date(dateTimeString).toLocaleString();
    };

    const isTestAvailable = (test: Test) => {
        const now = new Date();
        const startTime = new Date(test.start_time);
        const endTime = new Date(test.end_time);
        
        return test.is_active && now >= startTime && now <= endTime;
    };

    const getTestStatus = (test: Test) => {
        const now = new Date();
        const startTime = new Date(test.start_time);
        const endTime = new Date(test.end_time);
        
        if (!test.is_active) return { text: 'Inactive', color: 'bg-gray-500' };
        if (now < startTime) return { text: 'Upcoming', color: 'bg-blue-500' };
        if (now > endTime) return { text: 'Ended', color: 'bg-red-500' };
        return { text: 'Available', color: 'bg-green-500' };
    };

    return (
        <AppShell>
            <Head title="Available Tests" />
            
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        📝 Available Korean Tests
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                        Choose from our collection of EPS-TOPIK style tests to improve your Korean skills
                    </p>
                </div>

                {tests.data.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">📭</div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            No tests available
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            There are currently no tests available. Please check back later.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tests.data.map((test) => {
                            const status = getTestStatus(test);
                            const available = isTestAvailable(test);
                            
                            return (
                                <div
                                    key={test.id}
                                    className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-shadow ${
                                        available ? 'hover:shadow-lg border-l-4 border-green-500' : 'border-l-4 border-gray-300'
                                    }`}
                                >
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                                                {test.test_name}
                                            </h3>
                                            <span className={`text-white text-xs px-2 py-1 rounded-full ${status.color}`}>
                                                {status.text}
                                            </span>
                                        </div>
                                        
                                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                                            {test.description || 'No description available'}
                                        </p>
                                        
                                        <div className="space-y-2 mb-4">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500 dark:text-gray-400">Category:</span>
                                                <span className="font-medium">{test.category.category_name}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500 dark:text-gray-400">Duration:</span>
                                                <span className="font-medium">{test.duration} minutes</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500 dark:text-gray-400">Questions:</span>
                                                <span className="font-medium">{test.question_count}</span>
                                            </div>
                                        </div>
                                        
                                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                                            <div>Start: {formatDateTime(test.start_time)}</div>
                                            <div>End: {formatDateTime(test.end_time)}</div>
                                        </div>
                                        
                                        <div className="flex justify-end">
                                            {available ? (
                                                <Link
                                                    href={route('tests.show', test.id)}
                                                    className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors shadow-sm"
                                                >
                                                    🚀 Take Test
                                                </Link>
                                            ) : (
                                                <button
                                                    disabled
                                                    className="bg-gray-300 text-gray-500 px-4 py-2 rounded-lg text-sm font-medium cursor-not-allowed"
                                                >
                                                    Not Available
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Pagination */}
                {tests.last_page > 1 && (
                    <div className="mt-8 flex justify-center">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow px-6 py-3">
                            <span className="text-sm text-gray-600 dark:text-gray-300">
                                Showing {((tests.current_page - 1) * tests.per_page) + 1} to{' '}
                                {Math.min(tests.current_page * tests.per_page, tests.total)} of {tests.total} tests
                            </span>
                        </div>
                    </div>
                )}

                {/* Tips Section */}
                <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                    <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
                        💡 Test Taking Tips
                    </h3>
                    <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                        <li>• Make sure you have a stable internet connection before starting</li>
                        <li>• Read all questions carefully before selecting your answer</li>
                        <li>• Use the navigation buttons to move between questions</li>
                        <li>• Keep an eye on the timer - tests will auto-submit when time runs out</li>
                        <li>• You can review and change answers before final submission</li>
                    </ul>
                </div>
            </div>
        </AppShell>
    );
}