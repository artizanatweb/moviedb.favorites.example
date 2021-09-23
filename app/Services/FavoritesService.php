<?php

namespace App\Services;

use App\Http\Requests\FavoriteFindRequest;
use App\Http\Requests\FavoritePageMoviesRequest;
use \App\Http\Requests\FavoriteRequest;
use App\Http\Resources\ErrorResource;
use App\Http\Resources\FavoriteCollection;
use App\Http\Resources\FavoriteResource;
use App\Models\Favorite;
use App\Models\Client;
use \Exception;
use App\Repositories\Interfaces\FavoriteRepository;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Requests\FavoritesRequest;

class FavoritesService
{
    protected FavoriteRepository $repository;

    public function __construct(FavoriteRepository $repository)
    {
        $this->repository = $repository;
    }

    public function add(FavoriteRequest $request) : FavoriteResource
    {
        $validatedData = $request->validated();

        // check for client_id
        $clientId = $validatedData['client_id'];
        if (!($clientId > 0)) {
            $client = new Client();
            $clientSaved = $client->save();
            if (!$clientSaved) {
                throw new Exception("Can't create a client. Please check DB access!");
            }

            $clientId = $client->id;
        }

        $favoriteRow = $this->repository->create($clientId, $validatedData);
        return new FavoriteResource($favoriteRow);
    }

    public function remove(Favorite $favorite)
    {
        $this->repository->remove($favorite);
    }

    public function getPageFavorites(FavoritePageMoviesRequest $request) : array
    {
        $validatedData = $request->validated();

        if (!(count($validatedData['movies']) > 0)) {
            return [];
        }

        $rows = $this->repository->pageFavorites($validatedData['client_id'], $validatedData['movies']);
        $favorites = $rows->pluck('movie_id');

        return $favorites->all();
    }

    public function findAsResource(FavoriteFindRequest $request) : JsonResource
    {
        $validatedData = $request->validated();
        $clientId = $validatedData['client_id'];
        $movieId = $validatedData['movie_id'];

        $row = $this->repository->getByClientAndMovie($clientId, $movieId);
        if (!$row) {
            return new ErrorResource([]);
        }

        return new FavoriteResource($row);
    }

    public function list(FavoritesRequest $request) : JsonResource
    {
        $validatedData = $request->validated();
        $clientId = $validatedData['client_id'];
        $pageRows = (int) $validatedData['per_page'] ?? env('FAVORITES_DEFAULT_ROWS', 5);

        $query = Favorite::where('client_id', $clientId);

        if (isset($validatedData['query'])) {
            $search = "%" . str_replace(" ", "%", trim($validatedData['query'])) . "%";
            $query->where('original_title', 'like', $search);
        }

        $rows = $query->orderBy('created_at','desc')->paginate($pageRows);

        return new FavoriteCollection($rows);
    }
}
