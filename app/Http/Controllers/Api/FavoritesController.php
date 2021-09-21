<?php

namespace App\Http\Controllers\Api;

use App\Models\Favorite;
use App\Services\FavoritesService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\FavoriteRequest;
use App\Http\Requests\FavoritePageMoviesRequest;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\FavoriteResource;
use \Exception;
use App\Exceptions\FavoriteExistsException;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Requests\FavoriteFindRequest;
use App\Http\Requests\FavoritesRequest;

class FavoritesController extends ApiController
{
    protected FavoritesService $service;

    public function __construct(FavoritesService $service, Request $request)
    {
        parent::__construct($request);

        $this->service = $service;
    }

    /**
     * Display a listing of the resource.
     *
     * @return JsonResource
     */
    public function index(FavoritesRequest $request) : JsonResource
    {
        return $this->service->list($request);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  FavoriteRequest  $request
     * @return JsonResponse
     */
    public function store(FavoriteRequest $request) : JsonResponse
    {
        DB::beginTransaction();
        try {
            $resource = $this->service->add($request);

            $this->apiResponse->setMessage("Movie '" . $resource['original_title'] . "' added to favorites!");
            $this->apiResponse->setData($resource->toArray($this->apiRequest));
        } catch (FavoriteExistsException $fee) {
            DB::rollBack();
            $this->apiResponse->setMessage($fee->getMessage());
            return $this->errorResponse($this->apiResponse, Response::HTTP_METHOD_NOT_ALLOWED);
        } catch (Exception $e) {
            DB::rollBack();
            $this->apiResponse->setMessage($e->getMessage());
            return $this->errorResponse($this->apiResponse, Response::HTTP_NOT_ACCEPTABLE);
        }
        DB::commit();

        return $this->successResponse($this->apiResponse);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Favorite  $favorite
     * @return JsonResource
     */
    public function show(Favorite $favorite) : JsonResource
    {
        return new FavoriteResource($favorite);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Favorite  $favorite
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Favorite $favorite)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Favorite  $favorite
     * @return JsonResponse
     */
    public function destroy(Favorite $favorite) : JsonResponse
    {
        try {
            $this->service->remove($favorite);
        } catch (Exception $e) {
            $this->apiResponse->setMessage($e->getMessage());
            return $this->errorResponse($this->apiResponse, Response::HTTP_NOT_ACCEPTABLE);
        }

        return $this->successResponse($this->apiResponse);
    }

    public function pageMovies(FavoritePageMoviesRequest $request) : JsonResponse
    {
        try {
            $movieIds = $this->service->getPageFavorites($request);

            $this->apiResponse->setData($movieIds);
        } catch (Exception $e) {
            $this->apiResponse->setMessage($e->getMessage());
            return $this->errorResponse($this->apiResponse, Response::HTTP_NOT_ACCEPTABLE);
        }

        return $this->successResponse($this->apiResponse);
    }

    public function find(FavoriteFindRequest $request) : JsonResource
    {
        return $this->service->findAsResource($request);
    }
}
