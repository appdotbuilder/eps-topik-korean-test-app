<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\Question;
use App\Models\Test;
use App\Models\Result;
use App\Models\UserAnswer;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        $admin = User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@koreantest.com',
            'role' => 'admin',
        ]);

        // Create participant users
        $participants = User::factory(10)->create([
            'role' => 'participant',
        ]);

        // Create categories with Korean test categories
        $categories = [
            [
                'category_name' => 'Reading Comprehension',
                'description' => 'Test your Korean reading skills with various texts and passages',
                'is_active' => true,
            ],
            [
                'category_name' => 'Grammar',
                'description' => 'Korean grammar rules, sentence structures, and particles',
                'is_active' => true,
            ],
            [
                'category_name' => 'Vocabulary',
                'description' => 'Essential Korean words, expressions, and their meanings',
                'is_active' => true,
            ],
            [
                'category_name' => 'Listening',
                'description' => 'Audio-based Korean comprehension exercises',
                'is_active' => true,
            ],
            [
                'category_name' => 'Writing',
                'description' => 'Korean writing skills and composition',
                'is_active' => true,
            ],
            [
                'category_name' => 'Culture & Society',
                'description' => 'Korean culture, customs, and social aspects',
                'is_active' => true,
            ],
            [
                'category_name' => 'Business Korean',
                'description' => 'Professional Korean for workplace situations',
                'is_active' => true,
            ],
            [
                'category_name' => 'Daily Conversation',
                'description' => 'Everyday Korean expressions and dialogues',
                'is_active' => true,
            ],
        ];

        foreach ($categories as $categoryData) {
            Category::create($categoryData);
        }

        // Create questions for each category
        $createdCategories = Category::all();
        foreach ($createdCategories as $category) {
            // Create specific questions based on category
            $questions = $this->getQuestionsForCategory($category->category_name);
            
            foreach ($questions as $questionData) {
                Question::create(array_merge($questionData, [
                    'category_id' => $category->id,
                    'is_active' => true,
                ]));
            }
        }

        // Create tests
        foreach ($createdCategories as $category) {
            Test::factory(2)->create([
                'category_id' => $category->id,
                'start_time' => now()->subDay(),
                'end_time' => now()->addWeek(),
                'is_active' => true,
            ]);
        }

        // Create some test results with answers
        $tests = Test::all();
        foreach ($participants->take(5) as $participant) {
            foreach ($tests->take(3) as $test) {
                // Create result
                $result = Result::factory()->create([
                    'user_id' => $participant->id,
                    'test_id' => $test->id,
                ]);

                // Create answers for this result
                $questions = Question::where('category_id', $test->category_id)
                    ->limit($test->question_count)
                    ->get();

                foreach ($questions as $question) {
                    UserAnswer::factory()->create([
                        'user_id' => $participant->id,
                        'test_id' => $test->id,
                        'question_id' => $question->id,
                    ]);
                }
            }
        }
    }

    /**
     * Get questions specific to each category.
     *
     * @param  string  $categoryName
     * @return array
     */
    protected function getQuestionsForCategory(string $categoryName): array
    {
        switch ($categoryName) {
            case 'Reading Comprehension':
                return [
                    [
                        'question_text' => '다음 글을 읽고 물음에 답하세요. "한국의 겨울은 매우 춥습니다. 눈이 많이 옵니다." 이 글에서 한국의 겨울 날씨는?',
                        'answer_options' => ['덥고 습합니다', '춥고 눈이 옵니다', '따뜻하고 맑습니다', '시원하고 바람이 붑니다'],
                        'correct_answer' => '춥고 눈이 옵니다',
                        'difficulty_level' => 'easy',
                    ],
                    [
                        'question_text' => '다음 문장의 내용으로 옳은 것은? "김철수 씨는 매일 아침 7시에 집에서 나와서 지하철을 타고 회사에 갑니다."',
                        'answer_options' => ['김철수 씨는 버스를 타고 출근합니다', '김철수 씨는 오후에 출근합니다', '김철수 씨는 지하철로 출근합니다', '김철수 씨는 회사에서 삽니다'],
                        'correct_answer' => '김철수 씨는 지하철로 출근합니다',
                        'difficulty_level' => 'medium',
                    ],
                ];

            case 'Grammar':
                return [
                    [
                        'question_text' => '다음 중 올바른 존댓말은?',
                        'answer_options' => ['먹어', '먹습니다', '먹는다', '먹자'],
                        'correct_answer' => '먹습니다',
                        'difficulty_level' => 'easy',
                    ],
                    [
                        'question_text' => '"학교_____ 갑니다"에 들어갈 조사는?',
                        'answer_options' => ['이', '를', '에', '은'],
                        'correct_answer' => '에',
                        'difficulty_level' => 'medium',
                    ],
                ];

            case 'Vocabulary':
                return [
                    [
                        'question_text' => '"책"의 의미는?',
                        'answer_options' => ['Book', 'Pen', 'Paper', 'Desk'],
                        'correct_answer' => 'Book',
                        'difficulty_level' => 'easy',
                    ],
                    [
                        'question_text' => '"사과"는 무엇입니까?',
                        'answer_options' => ['과일', '채소', '고기', '음료'],
                        'correct_answer' => '과일',
                        'difficulty_level' => 'easy',
                    ],
                ];

            case 'Listening':
                return [
                    [
                        'question_text' => '다음 대화를 듣고 답하세요. A: "안녕하세요?" B: "안녕하세요. 처음 뵙겠습니다." B의 대답이 적절한 상황은?',
                        'answer_options' => ['친구와 만날 때', '처음 만나는 사람과 인사할 때', '가족과 인사할 때', '선생님께 인사할 때'],
                        'correct_answer' => '처음 만나는 사람과 인사할 때',
                        'difficulty_level' => 'medium',
                    ],
                ];

            case 'Culture & Society':
                return [
                    [
                        'question_text' => '한국의 전통 명절이 아닌 것은?',
                        'answer_options' => ['추석', '설날', '크리스마스', '단오'],
                        'correct_answer' => '크리스마스',
                        'difficulty_level' => 'easy',
                    ],
                ];

            case 'Business Korean':
                return [
                    [
                        'question_text' => '회사에서 상사에게 사용하는 적절한 표현은?',
                        'answer_options' => ['안녕!', '안녕하세요', '안녕하십니까', '어서와'],
                        'correct_answer' => '안녕하십니까',
                        'difficulty_level' => 'medium',
                    ],
                ];

            default:
                return [
                    [
                        'question_text' => '다음 중 올바른 한국어 인사말은?',
                        'answer_options' => ['안녕하세요', '곤니치와', '니하오', '헬로'],
                        'correct_answer' => '안녕하세요',
                        'difficulty_level' => 'easy',
                    ],
                ];
        }
    }
}