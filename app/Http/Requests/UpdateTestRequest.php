<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTestRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check() && auth()->user()->isAdmin();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'test_name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time',
            'duration' => 'required|integer|min:1|max:300', // 1-300 minutes
            'category_id' => 'required|exists:categories,id',
            'question_count' => 'required|integer|min:1|max:100',
            'randomize_questions' => 'boolean',
            'is_active' => 'boolean',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'test_name.required' => 'Test name is required.',
            'start_time.required' => 'Start time is required.',
            'end_time.required' => 'End time is required.',
            'end_time.after' => 'End time must be after start time.',
            'duration.required' => 'Test duration is required.',
            'duration.min' => 'Test duration must be at least 1 minute.',
            'duration.max' => 'Test duration cannot exceed 300 minutes (5 hours).',
            'category_id.required' => 'Please select a category.',
            'category_id.exists' => 'Selected category is invalid.',
            'question_count.required' => 'Number of questions is required.',
            'question_count.min' => 'Test must have at least 1 question.',
            'question_count.max' => 'Test cannot have more than 100 questions.',
        ];
    }
}