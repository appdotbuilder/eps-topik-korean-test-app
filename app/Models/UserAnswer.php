<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\UserAnswer
 *
 * @property int $id
 * @property int $user_id
 * @property int $test_id
 * @property int $question_id
 * @property string $selected_answer
 * @property bool $is_correct
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Question $question
 * @property-read \App\Models\Test $test
 * @property-read \App\Models\User $user
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|UserAnswer newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UserAnswer newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UserAnswer query()
 * @method static \Illuminate\Database\Eloquent\Builder|UserAnswer whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserAnswer whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserAnswer whereIsCorrect($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserAnswer whereQuestionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserAnswer whereSelectedAnswer($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserAnswer whereTestId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserAnswer whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserAnswer whereUserId($value)
 * @method static \Database\Factories\UserAnswerFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class UserAnswer extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'test_id',
        'question_id',
        'selected_answer',
        'is_correct',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_correct' => 'boolean',
    ];

    /**
     * Get the user that owns the answer.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the test that owns the answer.
     */
    public function test(): BelongsTo
    {
        return $this->belongsTo(Test::class);
    }

    /**
     * Get the question that owns the answer.
     */
    public function question(): BelongsTo
    {
        return $this->belongsTo(Question::class);
    }
}