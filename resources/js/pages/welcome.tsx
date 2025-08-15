import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

interface WelcomePageProps {
    stats: {
        total_categories: number;
        total_tests: number;
        total_questions: number;
        available_tests: number;
    };
    availableTests: Array<{
        id: number;
        test_name: string;
        description: string;
        duration: number;
        category: {
            id: number;
            category_name: string;
        };
        start_time: string;
        end_time: string;
    }>;
    recentResults: Array<{
        id: number;
        score: number;
        total_questions: number;
        percentage: number;
        test: {
            id: number;
            test_name: string;
        };
        completed_at: string;
    }>;
    [key: string]: unknown;
}

export default function Welcome({ stats, availableTests, recentResults }: WelcomePageProps) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Korean Language Test System">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
                {/* Header */}
                <header className="bg-white/80 backdrop-blur-sm border-b shadow-sm dark:bg-gray-800/80 dark:border-gray-700">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center space-x-2">
                                <span className="text-2xl">🇰🇷</span>
                                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Korean Test System</h1>
                            </div>
                            <nav className="flex items-center space-x-4">
                                {auth.user ? (
                                    <div className="flex items-center space-x-4">
                                        <span className="text-sm text-gray-600 dark:text-gray-300">
                                            Welcome, {auth.user.name}
                                        </span>
                                        {auth.user.role === 'admin' ? (
                                            <Link
                                                href={route('admin.dashboard')}
                                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                            >
                                                Admin Panel
                                            </Link>
                                        ) : (
                                            <Link
                                                href={route('tests.index')}
                                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                                            >
                                                Take Tests
                                            </Link>
                                        )}
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-3">
                                        <Link
                                            href={route('login')}
                                            className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            Sign up
                                        </Link>
                                    </div>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto text-center">
                        <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
                            📚 Master Korean with EPS-TOPIK Style Tests
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                            Comprehensive online Korean language testing platform designed for EPS-TOPIK preparation. 
                            Practice grammar, vocabulary, reading, and listening with our extensive question bank.
                        </p>
                        
                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                                <div className="text-3xl font-bold text-blue-600">{stats.total_categories}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-300">Categories</div>
                            </div>
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                                <div className="text-3xl font-bold text-green-600">{stats.total_tests}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-300">Total Tests</div>
                            </div>
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                                <div className="text-3xl font-bold text-purple-600">{stats.total_questions}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-300">Questions</div>
                            </div>
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                                <div className="text-3xl font-bold text-orange-600">{stats.available_tests}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-300">Available Now</div>
                            </div>
                        </div>

                        {!auth.user && (
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href={route('register')}
                                    className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
                                >
                                    🚀 Start Learning Korean
                                </Link>
                                <Link
                                    href={route('login')}
                                    className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg dark:bg-gray-800 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-gray-700"
                                >
                                    Sign In
                                </Link>
                            </div>
                        )}
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-16 bg-white dark:bg-gray-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
                            ✨ Key Features
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="text-center p-6">
                                <div className="text-4xl mb-4">📝</div>
                                <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Comprehensive Testing</h4>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Practice reading, grammar, vocabulary, and listening with authentic EPS-TOPIK style questions
                                </p>
                            </div>
                            <div className="text-center p-6">
                                <div className="text-4xl mb-4">⏱️</div>
                                <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Real-time Timer</h4>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Experience actual test conditions with countdown timers and automatic submission
                                </p>
                            </div>
                            <div className="text-center p-6">
                                <div className="text-4xl mb-4">📊</div>
                                <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Detailed Results</h4>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Get comprehensive feedback with scores, percentages, and answer reviews
                                </p>
                            </div>
                            <div className="text-center p-6">
                                <div className="text-4xl mb-4">🔀</div>
                                <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Randomized Questions</h4>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Questions are shuffled for each attempt to ensure comprehensive practice
                                </p>
                            </div>
                            <div className="text-center p-6">
                                <div className="text-4xl mb-4">🎧</div>
                                <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Audio Support</h4>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Listening comprehension exercises with high-quality Korean audio files
                                </p>
                            </div>
                            <div className="text-center p-6">
                                <div className="text-4xl mb-4">📱</div>
                                <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Mobile Friendly</h4>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Take tests anywhere with our responsive design optimized for all devices
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Available Tests */}
                {availableTests.length > 0 && (
                    <section className="py-16">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
                                🎯 Available Tests
                            </h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {availableTests.map((test) => (
                                    <div key={test.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                                        <div className="flex justify-between items-start mb-4">
                                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{test.test_name}</h4>
                                            <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded dark:bg-blue-900 dark:text-blue-200">
                                                {test.duration} min
                                            </span>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm line-clamp-2">
                                            {test.description}
                                        </p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                {test.category.category_name}
                                            </span>
                                            {auth.user ? (
                                                <Link
                                                    href={route('tests.show', test.id)}
                                                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                                                >
                                                    Take Test
                                                </Link>
                                            ) : (
                                                <Link
                                                    href={route('register')}
                                                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                                                >
                                                    Sign up
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Recent Results for logged in participants */}
                {auth.user && auth.user.role === 'participant' && recentResults.length > 0 && (
                    <section className="py-16 bg-gray-50 dark:bg-gray-900">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
                                📈 Your Recent Results
                            </h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                                {recentResults.map((result) => (
                                    <div key={result.id} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
                                        <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-2">
                                            {result.test.test_name}
                                        </h4>
                                        <div className="flex justify-between items-center">
                                            <span className="text-2xl font-bold text-green-600">
                                                {result.percentage.toFixed(0)}%
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                {result.score}/{result.total_questions}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className="flex justify-center items-center space-x-2 mb-4">
                            <span className="text-2xl">🇰🇷</span>
                            <h3 className="text-xl font-bold">Korean Test System</h3>
                        </div>
                        <p className="text-gray-300 mb-6">
                            Master Korean with our comprehensive EPS-TOPIK style testing platform
                        </p>
                        <div className="text-sm text-gray-400">
                            Built with ❤️ for Korean language learners worldwide
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}