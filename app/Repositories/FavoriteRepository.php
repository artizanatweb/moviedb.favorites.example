<?php

namespace App\Repositories;

use App\Models\Favorite;
use Illuminate\Database\Eloquent\Collection;
use \Exception;
use App\Exceptions\FavoriteExistsException;

class FavoriteRepository implements Interfaces\FavoriteRepository
{

    public function create(int $clientId, array $validatedData): Favorite
    {
        // check if pair clientId and movieId exists in DB
        $rowExists = Favorite::where('client_id', $clientId)->where('movie_id', $validatedData['movie_id'])->first();
        if ($rowExists) {
            throw new FavoriteExistsException("Movie is already added to favorites!");
        }

        $favorite = new Favorite();
        $favorite->client_id = $clientId;
        $this->fieldsToObject($favorite, $validatedData);
        $saved = $favorite->save();
        if (!$saved) {
            throw new Exception("Can't add movie to favorites!");
        }

        return $favorite;
    }

    public function remove(Favorite $favorite)
    {
        // TODO: Implement remove() method.
    }

    public function pageFavorites(int $clientId, array $movies): Collection
    {
        return Favorite::where('client_id', $clientId)->whereIn('movie_id', $movies)->get(['movie_id']);
    }

    private function fieldsToObject(Favorite $favorite, array $validatedData)
    {
        if (isset($validatedData['movie_id'])) {
            $favorite->movie_id = $validatedData['movie_id'];
        }

        if (isset($validatedData['original_title'])) {
            $favorite->original_title = $validatedData['original_title'];
        }

        if (isset($validatedData['overview'])) {
            $favorite->overview = $validatedData['overview'];
        }

        if (isset($validatedData['original_language'])) {
            $favorite->original_language = $validatedData['original_language'];
        }

        if (isset($validatedData['release_date'])) {
            $favorite->release_date = $validatedData['release_date'];
        }

//        if (isset($validatedData[''])) {
//            $favorite-> = $validatedData[''];
//        }
    }


    public function getByClientAndMovie(int $clientId, int $movieId): ?Favorite
    {
        return Favorite::where('client_id', $clientId)->where('movie_id', $movieId)->first();
    }
}
