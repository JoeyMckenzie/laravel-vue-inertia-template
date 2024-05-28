<?php

declare(strict_types=1);

namespace App\ValueObjects;

use App\Enums\TodoStatus;
use App\Models\Todo;

final readonly class TodoMetadata
{
    public int $completed;

    /**
     * @param  Todo[]  $todos
     */
    public function __construct(array $todos)
    {
        $collectedTodos = collect($todos);
        $this->completed = $collectedTodos->where('status', TodoStatus::DONE)->count();
    }
}
