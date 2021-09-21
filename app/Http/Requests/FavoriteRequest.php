<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FavoriteRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'client_id' => ['bail', 'required', 'numeric', 'integer', 'min:0'],
            'movie_id' => ['bail', 'required', 'numeric', 'integer', 'min:1'],
            'original_title' => ['nullable', 'max:250'],
            'overview' => ['nullable', 'max:6000'],
            'original_language' => ['nullable', 'min:2', 'max:2'],
            'release_date' => ['nullable', 'date'],
        ];
    }
}
