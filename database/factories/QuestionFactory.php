<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Question>
 */
class QuestionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $koreanQuestions = [
            [
                'question' => '다음 중 올바른 문장은 무엇입니까? (Which of the following is the correct sentence?)',
                'options' => ['저는 학생이에요.', '저는 학생이다.', '저는 학생입니다.', '저는 학생이야.'],
                'correct' => '저는 학생입니다.'
            ],
            [
                'question' => '"안녕하세요"의 적절한 응답은? (What is the appropriate response to "안녕하세요"?)',
                'options' => ['안녕하세요', '고맙습니다', '죄송합니다', '괜찮습니다'],
                'correct' => '안녕하세요'
            ],
            [
                'question' => '한국어에서 존댓말의 올바른 형태는? (What is the correct form of honorific speech in Korean?)',
                'options' => ['먹어', '먹습니다', '먹어요', '먹는다'],
                'correct' => '먹습니다'
            ],
            [
                'question' => '"학교에 가다"의 과거형은? (What is the past tense of "go to school"?)',
                'options' => ['학교에 갔다', '학교에 간다', '학교에 갈다', '학교에 가다'],
                'correct' => '학교에 갔다'
            ],
            [
                'question' => '다음 중 가족을 나타내는 단어가 아닌 것은? (Which of the following is NOT a family-related word?)',
                'options' => ['아버지', '어머니', '친구', '형'],
                'correct' => '친구'
            ],
        ];

        $question = fake()->randomElement($koreanQuestions);
        
        return [
            'category_id' => Category::factory(),
            'question_text' => $question['question'],
            'answer_options' => $question['options'],
            'correct_answer' => $question['correct'],
            'difficulty_level' => fake()->randomElement(['easy', 'medium', 'hard']),
            'is_active' => fake()->boolean(95), // 95% chance of being active
        ];
    }

    /**
     * Indicate that the question is for grammar category.
     */
    public function grammar(): static
    {
        return $this->state(fn (array $attributes) => [
            'question_text' => '다음 문장에서 올바른 조사를 선택하세요. (Choose the correct particle in the following sentence.)',
            'answer_options' => ['이/가', '을/를', '에/에서', '으로/로'],
            'correct_answer' => '이/가',
        ]);
    }

    /**
     * Indicate that the question is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => true,
        ]);
    }

    /**
     * Indicate that the question has an image.
     */
    public function withImage(): static
    {
        return $this->state(fn (array $attributes) => [
            'question_image' => 'questions/images/sample.jpg',
        ]);
    }

    /**
     * Indicate that the question has audio.
     */
    public function withAudio(): static
    {
        return $this->state(fn (array $attributes) => [
            'question_audio' => 'questions/audio/sample.mp3',
        ]);
    }
}