<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\TestTakingController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\QuestionController;
use App\Http\Controllers\Admin\TestController;
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Home page with Korean test overview
Route::get('/', [HomeController::class, 'index'])->name('home');

// Test taking routes for participants
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Tests for participants - using standard REST methods
    Route::prefix('tests')->name('tests.')->group(function () {
        Route::get('/', [TestTakingController::class, 'index'])->name('index');
        Route::get('/{test}', [TestTakingController::class, 'show'])->name('show');
        Route::post('/{test}', [TestTakingController::class, 'store'])->name('store');
        Route::put('/{test}', [TestTakingController::class, 'update'])->name('update');
    });
});

// Admin routes
Route::middleware(['auth', 'verified', \App\Http\Middleware\AdminMiddleware::class])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', function () {
        return Inertia::render('admin/dashboard');
    })->name('dashboard');

    // Categories management
    Route::resource('categories', CategoryController::class);
    
    // Questions management
    Route::resource('questions', QuestionController::class);
    
    // Tests management
    Route::resource('tests', TestController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';