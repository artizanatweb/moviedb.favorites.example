<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Traits\ResourceResponder;
use Carbon\Carbon;

class FavoriteResource extends JsonResource
{
    use ResourceResponder;

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => (int) $this->id,
            'client_id' => (int) $this->client_id,
            'movie_id' => (int) $this->movie_id,
            'original_title' => $this->original_title,
            'overview' => $this->overview,
            'original_language' => $this->original_language,
            'release_date' => Carbon::createFromFormat('Y-m-d', $this->release_date)->format('d M Y'),
        ];
    }
}
