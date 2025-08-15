<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateQuestionRequest extends FormRequest
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
            'category_id' => 'required|exists:categories,id',
            'question_text' => 'required|string',
            'question_image' => 'nullable|image|max:2048', // 2MB max
            'question_audio' => 'nullable|mimes:mp3,wav,ogg|max:10240', // 10MB max
            'answer_options' => 'required|array|min:2',
            'answer_options.*' => 'required|string',
            'correct_answer' => 'required|string',
            'difficulty_level' => 'required|in:easy,medium,hard',
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
            'category_id.required' => 'Please select a category.',
            'category_id.exists' => 'Selected category is invalid.',
            'question_text.required' => 'Question text is required.',
            'answer_options.required' => 'Answer options are required.',
            'answer_options.min' => 'At least 2 answer options are required.',
            'correct_answer.required' => 'Please specify the correct answer.',
            'difficulty_level.required' => 'Please select difficulty level.',
            'question_image.image' => 'Question image must be a valid image file.',
            'question_image.max' => 'Question image must not exceed 2MB.',
            'question_audio.mimes' => 'Audio file must be mp3, wav, or ogg format.',
            'question_audio.max' => 'Audio file must not exceed 10MB.',
        ];
    }
}