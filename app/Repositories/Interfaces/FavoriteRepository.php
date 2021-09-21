<?php

namespace App\Repositories\Interfaces;

use App\Models\Favorite;
use Illuminate\Database\Eloquent\Collection;

interface FavoriteRepository
{
    public function create(int $clientId, array $validatedData) : Favorite;

    public function remove(Favorite $favorite);

    public function pageFavorites(int $clientId, array $movies) : Collection;

    public function getByClientAndMovie(int $clientId, int $movieId) : ?Favorite;
}
