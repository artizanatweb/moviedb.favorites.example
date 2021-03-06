<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    public function favorites()
    {
        return $this->hasMany(Favorite::class, "client_id", "id");
    }
}
