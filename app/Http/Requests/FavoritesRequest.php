<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class FavoritesRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'client_id' => ['bail', 'required', 'numeric', Rule::exists('clients', 'id')],
            'page' => ['nullable', 'numeric', 'min:1'],
            'per_page' => ['nullable', 'numeric', 'min:1', 'max:100'],
            'query' => ['nullable', 'min:3', 'max:250'],
        ];
    }
}
