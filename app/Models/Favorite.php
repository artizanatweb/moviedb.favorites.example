<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id',
        'movie_id',
        'original_title',
        'overview',
        'original_language',
        'release_date',
    ];

    public function client()
    {
        return $this->hasOne(Client::class, "id", "client_id");
    }
}
