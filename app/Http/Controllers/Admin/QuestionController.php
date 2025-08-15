<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreQuestionRequest;
use App\Http\Requests\UpdateQuestionRequest;
use App\Models\Category;
use App\Models\Question;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuestionController extends Controller
{
    /**
     * Display a listing of the questions.
     */
    public function index(Request $request)
    {
        $questions = Question::with('category')
            ->when($request->category_id, function ($query, $categoryId) {
                return $query->where('category_id', $categoryId);
            })
            ->when($request->difficulty, function ($query, $difficulty) {
                return $query->where('difficulty_level', $difficulty);
            })
            ->latest()
            ->paginate(10);

        $categories = Category::active()->get();

        return Inertia::render('admin/questions/index', [
            'questions' => $questions,
            'categories' => $categories,
            'filters' => $request->only(['category_id', 'difficulty']),
        ]);
    }

    /**
     * Show the form for creating a new question.
     */
    public function create()
    {
        $categories = Category::active()->get();

        return Inertia::render('admin/questions/create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created question in storage.
     */
    public function store(StoreQuestionRequest $request)
    {
        $data = $request->validated();

        // Handle file uploads
        if ($request->hasFile('question_image')) {
            $data['question_image'] = $request->file('question_image')
                ->store('questions/images', 'public');
        }

        if ($request->hasFile('question_audio')) {
            $data['question_audio'] = $request->file('question_audio')
                ->store('questions/audio', 'public');
        }

        Question::create($data);

        return redirect()->route('admin.questions.index')
            ->with('success', 'Question created successfully.');
    }

    /**
     * Display the specified question.
     */
    public function show(Question $question)
    {
        $question->load('category');

        return Inertia::render('admin/questions/show', [
            'question' => $question,
        ]);
    }

    /**
     * Show the form for editing the specified question.
     */
    public function edit(Question $question)
    {
        $question->load('category');
        $categories = Category::active()->get();

        return Inertia::render('admin/questions/edit', [
            'question' => $question,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified question in storage.
     */
    public function update(UpdateQuestionRequest $request, Question $question)
    {
        $data = $request->validated();

        // Handle file uploads
        if ($request->hasFile('question_image')) {
            $data['question_image'] = $request->file('question_image')
                ->store('questions/images', 'public');
        }

        if ($request->hasFile('question_audio')) {
            $data['question_audio'] = $request->file('question_audio')
                ->store('questions/audio', 'public');
        }

        $question->update($data);

        return redirect()->route('admin.questions.index')
            ->with('success', 'Question updated successfully.');
    }

    /**
     * Remove the specified question from storage.
     */
    public function destroy(Question $question)
    {
        $question->delete();

        return redirect()->route('admin.questions.index')
            ->with('success', 'Question deleted successfully.');
    }
}