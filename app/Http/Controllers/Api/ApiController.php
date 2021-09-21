<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Traits\ApiResponder;
use App\Responses\ApiResponse;

class ApiController extends Controller
{
    use ApiResponder;

    protected ApiResponse $apiResponse;
    protected Request $apiRequest;

    public function __construct(Request $request)
    {
        $this->apiResponse = new ApiResponse();
        $this->apiRequest = $request;
    }
}
