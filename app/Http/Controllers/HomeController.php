<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Test;
use App\Models\Question;
use App\Models\Result;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the home page with Korean test overview.
     */
    public function index()
    {
        $stats = [
            'total_categories' => Category::active()->count(),
            'total_tests' => Test::active()->count(),
            'total_questions' => Question::active()->count(),
            'available_tests' => Test::available()->count(),
        ];

        // Get recent tests for participants
        $availableTests = Test::with('category')
            ->available()
            ->latest()
            ->limit(6)
            ->get();

        // Get recent results if user is authenticated
        $recentResults = [];
        if (auth()->check() && auth()->user()->isParticipant()) {
            $recentResults = Result::with('test')
                ->where('user_id', auth()->id())
                ->latest()
                ->limit(5)
                ->get();
        }

        return Inertia::render('welcome', [
            'stats' => $stats,
            'availableTests' => $availableTests,
            'recentResults' => $recentResults,
        ]);
    }
}