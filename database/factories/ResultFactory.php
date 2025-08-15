<?php

namespace Database\Factories;

use App\Models\Test;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Result>
 */
class ResultFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $totalQuestions = fake()->numberBetween(10, 50);
        $score = fake()->numberBetween(0, $totalQuestions);
        $percentage = ($score / $totalQuestions) * 100;
        
        $startedAt = fake()->dateTimeBetween('-1 month', 'now');
        $timeTaken = fake()->numberBetween(300, 7200); // 5 minutes to 2 hours in seconds
        $completedAt = (clone $startedAt)->modify("+{$timeTaken} seconds");
        
        return [
            'user_id' => User::factory(),
            'test_id' => Test::factory(),
            'score' => $score,
            'total_questions' => $totalQuestions,
            'percentage' => round($percentage, 2),
            'started_at' => $startedAt,
            'completed_at' => $completedAt,
            'time_taken' => $timeTaken,
        ];
    }

    /**
     * Indicate that the result is excellent (90%+).
     */
    public function excellent(): static
    {
        return $this->state(function (array $attributes) {
            $totalQuestions = $attributes['total_questions'];
            $score = fake()->numberBetween(
                (int) ceil($totalQuestions * 0.9),
                $totalQuestions
            );
            
            return [
                'score' => $score,
                'percentage' => round(($score / $totalQuestions) * 100, 2),
            ];
        });
    }

    /**
     * Indicate that the result is poor (below 60%).
     */
    public function poor(): static
    {
        return $this->state(function (array $attributes) {
            $totalQuestions = $attributes['total_questions'];
            $score = fake()->numberBetween(
                0,
                (int) floor($totalQuestions * 0.6)
            );
            
            return [
                'score' => $score,
                'percentage' => round(($score / $totalQuestions) * 100, 2),
            ];
        });
    }
}