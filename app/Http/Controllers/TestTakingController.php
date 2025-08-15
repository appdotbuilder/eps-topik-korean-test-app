<?php

namespace App\Http\Controllers;

use App\Models\Test;
use App\Models\Question;
use App\Models\UserAnswer;
use App\Models\Result;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TestTakingController extends Controller
{
    /**
     * Display available tests for participants.
     */
    public function index()
    {
        $tests = Test::with('category')
            ->available()
            ->latest()
            ->paginate(12);

        return Inertia::render('tests/index', [
            'tests' => $tests,
        ]);
    }

    /**
     * Show test details before starting or display question during test.
     */
    public function show(Test $test, Request $request)
    {
        if (!$test->isAvailable()) {
            return redirect()->route('tests.index')
                ->with('error', 'This test is not currently available.');
        }

        // Check if user has already taken this test
        $existingResult = Result::where('user_id', auth()->id())
            ->where('test_id', $test->id)
            ->first();

        if ($existingResult) {
            return redirect()->route('tests.update', $test)
                ->with('info', 'You have already completed this test.');
        }

        // If no question number, show test details
        if (!$request->has('question')) {
            $test->load('category');
            return Inertia::render('tests/show', [
                'test' => $test,
            ]);
        }

        // Handle question display during test
        $questionNumber = (int) $request->get('question', 1);
        $questionIds = session('test_questions');
        
        if (!$questionIds || $questionNumber < 1 || $questionNumber > count($questionIds)) {
            return redirect()->route('tests.show', $test);
        }

        $questionId = $questionIds[$questionNumber - 1];
        $question = Question::findOrFail($questionId);

        // Get existing answer if any
        $existingAnswer = UserAnswer::where('user_id', auth()->id())
            ->where('test_id', $test->id)
            ->where('question_id', $question->id)
            ->first();

        // Calculate remaining time
        $startTime = session('test_start_time');
        $elapsedSeconds = now()->diffInSeconds($startTime);
        $totalTimeSeconds = $test->duration * 60;
        $remainingSeconds = max(0, $totalTimeSeconds - $elapsedSeconds);

        // Auto-submit if time is up
        if ($remainingSeconds <= 0) {
            return $this->update($request, $test);
        }

        return Inertia::render('tests/question', [
            'test' => $test,
            'question' => $question,
            'questionNumber' => $questionNumber,
            'totalQuestions' => count($questionIds),
            'existingAnswer' => $existingAnswer?->selected_answer,
            'remainingSeconds' => $remainingSeconds,
        ]);
    }

    /**
     * Start taking the test or save answer.
     */
    public function store(Request $request, Test $test)
    {
        if (!$test->isAvailable()) {
            return redirect()->route('tests.index')
                ->with('error', 'This test is not currently available.');
        }

        // Check if this is a start test request
        if ($request->has('action') && $request->input('action') === 'start') {
            // Check if user has already taken this test
            $existingResult = Result::where('user_id', auth()->id())
                ->where('test_id', $test->id)
                ->first();

            if ($existingResult) {
                return redirect()->route('tests.update', $test);
            }

            // Get questions for the test
            $query = Question::where('category_id', $test->category_id)
                ->where('is_active', true);

            if ($test->randomize_questions) {
                $query->inRandomOrder();
            }

            $questions = $query->limit($test->question_count)->get();

            if ($questions->count() < $test->question_count) {
                return redirect()->route('tests.show', $test)
                    ->with('error', 'Not enough questions available for this test.');
            }

            // Store test start time in session
            session([
                'test_start_time' => now(),
                'test_questions' => $questions->pluck('id')->toArray(),
                'current_question' => 0,
            ]);

            return redirect()->route('tests.show', [$test, 'question' => 1]);
        }

        // Handle answer saving
        $request->validate([
            'question_id' => 'required|exists:questions,id',
            'selected_answer' => 'required|string',
        ]);

        $question = Question::findOrFail($request->input('question_id'));
        $isCorrect = $question->isCorrectAnswer($request->input('selected_answer'));

        UserAnswer::updateOrCreate(
            [
                'user_id' => auth()->id(),
                'test_id' => $test->id,
                'question_id' => $question->id,
            ],
            [
                'selected_answer' => $request->input('selected_answer'),
                'is_correct' => $isCorrect,
            ]
        );

        return response()->json(['success' => true]);
    }

    /**
     * Submit the test and calculate results or show completed result.
     */
    public function update(Request $request, Test $test)
    {
        // Check if user is trying to view result
        if ($request->has('action') && $request->input('action') === 'result') {
            $result = Result::with('test.category')
                ->where('user_id', auth()->id())
                ->where('test_id', $test->id)
                ->firstOrFail();

            return Inertia::render('tests/result', [
                'result' => $result,
            ]);
        }

        // Handle test submission
        $startTime = session('test_start_time');
        $completedAt = now();
        $timeTaken = $completedAt->diffInSeconds($startTime);

        // Get all user answers for this test
        $userAnswers = UserAnswer::where('user_id', auth()->id())
            ->where('test_id', $test->id)
            ->get();

        $score = $userAnswers->where('is_correct', true)->count();
        $totalQuestions = session('test_questions') ? count(session('test_questions')) : $test->question_count;
        $percentage = $totalQuestions > 0 ? ($score / $totalQuestions) * 100 : 0;

        // Create or update result
        Result::updateOrCreate(
            [
                'user_id' => auth()->id(),
                'test_id' => $test->id,
            ],
            [
                'score' => $score,
                'total_questions' => $totalQuestions,
                'percentage' => $percentage,
                'started_at' => $startTime,
                'completed_at' => $completedAt,
                'time_taken' => $timeTaken,
            ]
        );

        // Clear session data
        session()->forget(['test_start_time', 'test_questions', 'current_question']);

        return redirect()->route('tests.update', [$test, 'action' => 'result'])
            ->with('success', 'Test completed successfully!');
    }
}