import React, { useState, useCallback } from 'react';
import { AppShell } from '@/components/app-shell';
import { Head, router } from '@inertiajs/react';
import { TestTimer } from '@/components/test-timer';
import { TestProgress } from '@/components/test-progress';
import { QuestionNavigation } from '@/components/question-navigation';

interface Question {
    id: number;
    question_text: string;
    question_image?: string;
    question_audio?: string;
    answer_options: string[];
}

interface Test {
    id: number;
    test_name: string;
    duration: number;
}

interface TestQuestionProps {
    test: Test;
    question: Question;
    questionNumber: number;
    totalQuestions: number;
    existingAnswer?: string;
    remainingSeconds: number;
    [key: string]: unknown;
}

export default function TestQuestion({ 
    test, 
    question, 
    questionNumber, 
    totalQuestions, 
    existingAnswer,
    remainingSeconds 
}: TestQuestionProps) {
    const [selectedAnswer, setSelectedAnswer] = useState(existingAnswer || '');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleTimeUp = useCallback(() => {
        router.put(route('tests.update', test.id));
    }, [test.id]);

    const saveAnswer = async (answer: string) => {
        if (isSubmitting) return;
        
        setIsSubmitting(true);
        try {
            await new Promise((resolve, reject) => {
                router.post(
                    route('tests.store', test.id),
                    { 
                        question_id: question.id,
                        selected_answer: answer 
                    },
                    {
                        preserveState: true,
                        preserveScroll: true,
                        onSuccess: () => resolve(true),
                        onError: () => reject(new Error('Failed to save answer')),
                        onFinish: () => setIsSubmitting(false)
                    }
                );
            });
        } catch (error) {
            console.error('Error saving answer:', error);
            setIsSubmitting(false);
        }
    };

    const handleAnswerChange = (answer: string) => {
        setSelectedAnswer(answer);
        saveAnswer(answer);
    };

    const navigateToQuestion = (direction: 'prev' | 'next') => {
        let targetQuestion;
        if (direction === 'prev' && questionNumber > 1) {
            targetQuestion = questionNumber - 1;
        } else if (direction === 'next' && questionNumber < totalQuestions) {
            targetQuestion = questionNumber + 1;
        }
        
        if (targetQuestion) {
            router.visit(route('tests.show', [test.id]) + `?question=${targetQuestion}`);
        }
    };

    const handleSubmitTest = () => {
        if (confirm('Are you sure you want to submit your test? This action cannot be undone.')) {
            router.put(route('tests.update', test.id));
        }
    };

    return (
        <AppShell>
            <Head title={`${test.test_name} - Question ${questionNumber}`} />
            
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                {/* Header with Timer */}
                <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            📝 {test.test_name}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300">
                            Question {questionNumber} of {totalQuestions}
                        </p>
                    </div>
                    <TestTimer 
                        remainingSeconds={remainingSeconds} 
                        onTimeUp={handleTimeUp} 
                    />
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                    <TestProgress 
                        currentQuestion={questionNumber} 
                        totalQuestions={totalQuestions} 
                    />
                </div>

                {/* Question Navigation */}
                <QuestionNavigation 
                    testId={test.id}
                    currentQuestion={questionNumber}
                    totalQuestions={totalQuestions}
                    answeredQuestions={existingAnswer ? [questionNumber] : []}
                />

                {/* Question Content */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                    <div className="mb-6">
                        <div className="flex items-start mb-4">
                            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 mr-3 mt-1">
                                Q{questionNumber}
                            </span>
                            <h2 className="text-lg font-medium text-gray-900 dark:text-white leading-relaxed">
                                {question.question_text}
                            </h2>
                        </div>

                        {/* Question Image */}
                        {question.question_image && (
                            <div className="mb-4">
                                <img 
                                    src={`/storage/${question.question_image}`}
                                    alt="Question"
                                    className="max-w-full h-auto rounded-lg shadow-sm"
                                />
                            </div>
                        )}

                        {/* Question Audio */}
                        {question.question_audio && (
                            <div className="mb-4">
                                <audio controls className="w-full">
                                    <source src={`/storage/${question.question_audio}`} type="audio/mpeg" />
                                    Your browser does not support the audio element.
                                </audio>
                            </div>
                        )}
                    </div>

                    {/* Answer Options */}
                    <div className="space-y-3">
                        {question.answer_options.map((option, index) => {
                            const optionLetter = String.fromCharCode(65 + index); // A, B, C, D
                            const isSelected = selectedAnswer === option;
                            
                            return (
                                <label
                                    key={index}
                                    className={`
                                        flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all
                                        ${isSelected 
                                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400' 
                                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-700'
                                        }
                                    `}
                                >
                                    <input
                                        type="radio"
                                        name="answer"
                                        value={option}
                                        checked={isSelected}
                                        onChange={(e) => handleAnswerChange(e.target.value)}
                                        className="sr-only"
                                    />
                                    <div className={`
                                        w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center text-sm font-bold
                                        ${isSelected 
                                            ? 'border-blue-500 bg-blue-500 text-white' 
                                            : 'border-gray-300 dark:border-gray-500'
                                        }
                                    `}>
                                        {optionLetter}
                                    </div>
                                    <span className={`text-gray-900 dark:text-white ${isSelected ? 'font-medium' : ''}`}>
                                        {option}
                                    </span>
                                </label>
                            );
                        })}
                    </div>

                    {/* Save Indicator */}
                    {isSubmitting && (
                        <div className="mt-4 text-center">
                            <span className="text-sm text-blue-600 dark:text-blue-400">
                                💾 Saving answer...
                            </span>
                        </div>
                    )}
                    
                    {selectedAnswer && !isSubmitting && (
                        <div className="mt-4 text-center">
                            <span className="text-sm text-green-600 dark:text-green-400">
                                ✅ Answer saved
                            </span>
                        </div>
                    )}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center">
                    <div>
                        {questionNumber > 1 && (
                            <button
                                onClick={() => navigateToQuestion('prev')}
                                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                ← Previous
                            </button>
                        )}
                    </div>

                    <div className="flex space-x-3">
                        {questionNumber < totalQuestions ? (
                            <button
                                onClick={() => navigateToQuestion('next')}
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Next →
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmitTest}
                                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                            >
                                🎯 Submit Test
                            </button>
                        )}
                    </div>
                </div>

                {/* Warning for last question */}
                {questionNumber === totalQuestions && (
                    <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4 dark:bg-yellow-900/20 dark:border-yellow-800">
                        <div className="flex">
                            <div className="text-yellow-400 mr-3">⚠️</div>
                            <div>
                                <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                                    Last Question
                                </h3>
                                <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                                    This is the last question. Click "Submit Test" when you're ready to finish.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}