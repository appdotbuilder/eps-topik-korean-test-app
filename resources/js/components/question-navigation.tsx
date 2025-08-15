import React from 'react';
import { Link } from '@inertiajs/react';

interface QuestionNavigationProps {
    testId: number;
    currentQuestion: number;
    totalQuestions: number;
    answeredQuestions: number[];
}

export function QuestionNavigation({ 
    testId, 
    currentQuestion, 
    totalQuestions, 
    answeredQuestions 
}: QuestionNavigationProps) {
    const questions = Array.from({ length: totalQuestions }, (_, i) => i + 1);

    const getQuestionStatus = (questionNumber: number) => {
        if (questionNumber === currentQuestion) {
            return 'bg-blue-600 text-white border-blue-600';
        }
        if (answeredQuestions.includes(questionNumber)) {
            return 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900 dark:text-green-200';
        }
        return 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700';
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                📊 Question Navigation
            </h3>
            
            <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2 mb-4">
                {questions.map((questionNumber) => (
                    <Link
                        key={questionNumber}
                        href={route('tests.show', testId) + `?question=${questionNumber}`}
                        className={`
                            w-10 h-10 rounded-lg border-2 flex items-center justify-center text-sm font-medium
                            transition-colors duration-200 ${getQuestionStatus(questionNumber)}
                        `}
                    >
                        {questionNumber}
                    </Link>
                ))}
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                        <div className="w-4 h-4 bg-green-100 border border-green-300 rounded mr-2 dark:bg-green-900"></div>
                        <span>Answered ({answeredQuestions.length})</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-4 h-4 bg-white border border-gray-300 rounded mr-2 dark:bg-gray-800 dark:border-gray-600"></div>
                        <span>Not Answered ({totalQuestions - answeredQuestions.length})</span>
                    </div>
                </div>
                <div className="text-blue-600 font-medium">
                    Current: {currentQuestion}
                </div>
            </div>
        </div>
    );
}