<?php

namespace Database\Factories;

use App\Models\Question;
use App\Models\Test;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserAnswer>
 */
class UserAnswerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $question = Question::factory()->create();
        $selectedAnswer = fake()->randomElement($question->answer_options);
        $isCorrect = $selectedAnswer === $question->correct_answer;
        
        return [
            'user_id' => User::factory(),
            'test_id' => Test::factory(),
            'question_id' => $question->id,
            'selected_answer' => $selectedAnswer,
            'is_correct' => $isCorrect,
        ];
    }

    /**
     * Indicate that the answer is correct.
     */
    public function correct(): static
    {
        return $this->state(function (array $attributes) {
            $question = Question::find($attributes['question_id']) ?? Question::factory()->create();
            return [
                'selected_answer' => $question->correct_answer,
                'is_correct' => true,
            ];
        });
    }

    /**
     * Indicate that the answer is incorrect.
     */
    public function incorrect(): static
    {
        return $this->state(function (array $attributes) {
            $question = Question::find($attributes['question_id']) ?? Question::factory()->create();
            $wrongAnswers = array_diff($question->answer_options, [$question->correct_answer]);
            
            return [
                'selected_answer' => fake()->randomElement($wrongAnswers),
                'is_correct' => false,
            ];
        });
    }
}