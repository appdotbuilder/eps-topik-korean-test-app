<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTestRequest;
use App\Http\Requests\UpdateTestRequest;
use App\Models\Category;
use App\Models\Test;
use Inertia\Inertia;

class TestController extends Controller
{
    /**
     * Display a listing of the tests.
     */
    public function index()
    {
        $tests = Test::with(['category', 'results'])
            ->withCount('results')
            ->latest()
            ->paginate(10);

        return Inertia::render('admin/tests/index', [
            'tests' => $tests,
        ]);
    }

    /**
     * Show the form for creating a new test.
     */
    public function create()
    {
        $categories = Category::active()->get();

        return Inertia::render('admin/tests/create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created test in storage.
     */
    public function store(StoreTestRequest $request)
    {
        Test::create($request->validated());

        return redirect()->route('admin.tests.index')
            ->with('success', 'Test created successfully.');
    }

    /**
     * Display the specified test.
     */
    public function show(Test $test)
    {
        $test->load(['category', 'results.user']);

        return Inertia::render('admin/tests/show', [
            'test' => $test,
        ]);
    }

    /**
     * Show the form for editing the specified test.
     */
    public function edit(Test $test)
    {
        $test->load('category');
        $categories = Category::active()->get();

        return Inertia::render('admin/tests/edit', [
            'test' => $test,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified test in storage.
     */
    public function update(UpdateTestRequest $request, Test $test)
    {
        $test->update($request->validated());

        return redirect()->route('admin.tests.index')
            ->with('success', 'Test updated successfully.');
    }

    /**
     * Remove the specified test from storage.
     */
    public function destroy(Test $test)
    {
        $test->delete();

        return redirect()->route('admin.tests.index')
            ->with('success', 'Test deleted successfully.');
    }
}