<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Test
 *
 * @property int $id
 * @property string $test_name
 * @property string|null $description
 * @property \Illuminate\Support\Carbon $start_time
 * @property \Illuminate\Support\Carbon $end_time
 * @property int $duration
 * @property int $category_id
 * @property int $question_count
 * @property bool $randomize_questions
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Category $category
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Result> $results
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\UserAnswer> $userAnswers
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Test newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Test newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Test query()
 * @method static \Illuminate\Database\Eloquent\Builder|Test whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Test whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Test whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Test whereDuration($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Test whereEndTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Test whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Test whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Test whereQuestionCount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Test whereRandomizeQuestions($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Test whereStartTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Test whereTestName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Test whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Test active()
 * @method static \Illuminate\Database\Eloquent\Builder|Test available()
 * @method static \Database\Factories\TestFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Test extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'test_name',
        'description',
        'start_time',
        'end_time',
        'duration',
        'category_id',
        'question_count',
        'randomize_questions',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'start_time' => 'datetime',
        'end_time' => 'datetime',
        'randomize_questions' => 'boolean',
        'is_active' => 'boolean',
    ];

    /**
     * Scope a query to only include active tests.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to only include available tests (within time window).
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeAvailable($query)
    {
        $now = now();
        return $query->where('is_active', true)
                    ->where('start_time', '<=', $now)
                    ->where('end_time', '>=', $now);
    }

    /**
     * Get the category that owns the test.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get the results for the test.
     */
    public function results(): HasMany
    {
        return $this->hasMany(Result::class);
    }

    /**
     * Get the user answers for the test.
     */
    public function userAnswers(): HasMany
    {
        return $this->hasMany(UserAnswer::class);
    }

    /**
     * Check if test is currently available.
     *
     * @return bool
     */
    public function isAvailable(): bool
    {
        $now = now();
        return $this->is_active && 
               $this->start_time <= $now && 
               $this->end_time >= $now;
    }

    /**
     * Check if test has started.
     *
     * @return bool
     */
    public function hasStarted(): bool
    {
        return $this->start_time <= now();
    }

    /**
     * Check if test has ended.
     *
     * @return bool
     */
    public function hasEnded(): bool
    {
        return $this->end_time < now();
    }
}