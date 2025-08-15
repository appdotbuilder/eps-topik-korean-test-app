<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Result
 *
 * @property int $id
 * @property int $user_id
 * @property int $test_id
 * @property int $score
 * @property int $total_questions
 * @property float $percentage
 * @property \Illuminate\Support\Carbon $started_at
 * @property \Illuminate\Support\Carbon $completed_at
 * @property int $time_taken
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Test $test
 * @property-read \App\Models\User $user
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Result newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Result newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Result query()
 * @method static \Illuminate\Database\Eloquent\Builder|Result whereCompletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Result whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Result whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Result wherePercentage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Result whereScore($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Result whereStartedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Result whereTestId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Result whereTimeTaken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Result whereTotalQuestions($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Result whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Result whereUserId($value)
 * @method static \Database\Factories\ResultFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Result extends Model
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
        'score',
        'total_questions',
        'percentage',
        'started_at',
        'completed_at',
        'time_taken',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'started_at' => 'datetime',
        'completed_at' => 'datetime',
        'percentage' => 'decimal:2',
    ];

    /**
     * Get the user that owns the result.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the test that owns the result.
     */
    public function test(): BelongsTo
    {
        return $this->belongsTo(Test::class);
    }

    /**
     * Get formatted time taken.
     *
     * @return string
     */
    public function getFormattedTimeTaken(): string
    {
        $hours = floor($this->time_taken / 3600);
        $minutes = floor(($this->time_taken % 3600) / 60);
        $seconds = $this->time_taken % 60;

        if ($hours > 0) {
            return sprintf('%02d:%02d:%02d', $hours, $minutes, $seconds);
        }
        
        return sprintf('%02d:%02d', $minutes, $seconds);
    }

    /**
     * Get grade based on percentage.
     *
     * @return string
     */
    public function getGrade(): string
    {
        if ($this->percentage >= 90) return 'A+';
        if ($this->percentage >= 85) return 'A';
        if ($this->percentage >= 80) return 'B+';
        if ($this->percentage >= 75) return 'B';
        if ($this->percentage >= 70) return 'C+';
        if ($this->percentage >= 65) return 'C';
        if ($this->percentage >= 60) return 'D+';
        if ($this->percentage >= 55) return 'D';
        
        return 'F';
    }
}