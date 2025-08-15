<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $koreanCategories = [
            'Reading Comprehension' => 'Test your Korean reading skills with various texts',
            'Grammar' => 'Korean grammar rules and sentence structures',
            'Vocabulary' => 'Essential Korean words and expressions',
            'Listening' => 'Audio-based Korean comprehension exercises',
            'Writing' => 'Korean writing and composition skills',
            'Culture & Society' => 'Korean culture, customs, and social aspects',
            'Business Korean' => 'Professional Korean for workplace situations',
            'Daily Conversation' => 'Everyday Korean expressions and dialogues',
        ];

        $category = fake()->randomElement(array_keys($koreanCategories));
        
        return [
            'category_name' => $category,
            'description' => $koreanCategories[$category],
            'is_active' => fake()->boolean(90), // 90% chance of being active
        ];
    }

    /**
     * Indicate that the category is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => true,
        ]);
    }

    /**
     * Indicate that the category is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }
}