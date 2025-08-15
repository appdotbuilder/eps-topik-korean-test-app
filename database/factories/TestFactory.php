<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Test>
 */
class TestFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startTime = fake()->dateTimeBetween('now', '+1 month');
        $endTime = fake()->dateTimeBetween($startTime, '+2 months');
        
        return [
            'test_name' => fake()->randomElement([
                'EPS-TOPIK Practice Test Level 1',
                'Korean Grammar Assessment',
                'Vocabulary Challenge Test',
                'Reading Comprehension Exam',
                'Listening Skills Test',
                'Business Korean Proficiency Test',
                'Daily Conversation Assessment',
                'Korean Culture Quiz',
            ]),
            'description' => fake()->paragraph(),
            'start_time' => $startTime,
            'end_time' => $endTime,
            'duration' => fake()->numberBetween(30, 120), // 30-120 minutes
            'category_id' => Category::factory(),
            'question_count' => fake()->numberBetween(10, 50),
            'randomize_questions' => fake()->boolean(80), // 80% chance to randomize
            'is_active' => fake()->boolean(90), // 90% chance of being active
        ];
    }

    /**
     * Indicate that the test is currently available.
     */
    public function available(): static
    {
        return $this->state(fn (array $attributes) => [
            'start_time' => now()->subHour(),
            'end_time' => now()->addWeek(),
            'is_active' => true,
        ]);
    }

    /**
     * Indicate that the test is upcoming.
     */
    public function upcoming(): static
    {
        return $this->state(fn (array $attributes) => [
            'start_time' => now()->addDay(),
            'end_time' => now()->addWeek(),
            'is_active' => true,
        ]);
    }

    /**
     * Indicate that the test has ended.
     */
    public function ended(): static
    {
        return $this->state(fn (array $attributes) => [
            'start_time' => now()->subWeek(),
            'end_time' => now()->subDay(),
            'is_active' => true,
        ]);
    }
}