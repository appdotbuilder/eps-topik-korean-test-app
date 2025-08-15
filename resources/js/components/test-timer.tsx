import React, { useState, useEffect } from 'react';

interface TestTimerProps {
    remainingSeconds: number;
    onTimeUp: () => void;
}

export function TestTimer({ remainingSeconds: initialSeconds, onTimeUp }: TestTimerProps) {
    const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);

    useEffect(() => {
        setRemainingSeconds(initialSeconds);
    }, [initialSeconds]);

    useEffect(() => {
        if (remainingSeconds <= 0) {
            onTimeUp();
            return;
        }

        const timer = setInterval(() => {
            setRemainingSeconds((prev) => {
                if (prev <= 1) {
                    onTimeUp();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [remainingSeconds, onTimeUp]);

    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        if (hours > 0) {
            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const getTimerColor = () => {
        if (remainingSeconds <= 300) return 'text-red-600 bg-red-50 border-red-200'; // 5 minutes
        if (remainingSeconds <= 600) return 'text-orange-600 bg-orange-50 border-orange-200'; // 10 minutes
        return 'text-green-600 bg-green-50 border-green-200';
    };

    return (
        <div className={`inline-flex items-center px-4 py-2 rounded-lg border font-mono text-lg font-bold ${getTimerColor()}`}>
            <span className="mr-2">⏱️</span>
            <span>{formatTime(remainingSeconds)}</span>
        </div>
    );
}