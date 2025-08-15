import React from 'react';

interface TestProgressProps {
    currentQuestion: number;
    totalQuestions: number;
}

export function TestProgress({ currentQuestion, totalQuestions }: TestProgressProps) {
    const progressPercentage = (currentQuestion / totalQuestions) * 100;

    return (
        <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
            <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progressPercentage}%` }}
            ></div>
            <div className="mt-2 flex justify-between text-sm text-gray-600 dark:text-gray-300">
                <span>Question {currentQuestion} of {totalQuestions}</span>
                <span>{Math.round(progressPercentage)}% Complete</span>
            </div>
        </div>
    );
}