<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\History;

class HistoryController extends Controller
{
    public function show($site_id){
        try{
            return response()->json(['success' => true, 'error' => null, 'data' => History::where('site_id', $site_id)->paginate(10)], 200);
        }catch(\Exception $exception){
            return response()->json([
                'success' => false,
                'error' => [
                    'file' => $exception->getFile(),
                    'line' => $exception->getLine(),
                    'message' => $exception->getMessage(),
                    'trace' => $exception->getTraceAsString()
                ],
                'data' => null
            ], 400);
        }
    }
}
