<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Services\Util\PaginateService;
use App\Models\History;

class HistoryController extends Controller
{
    public function show($site_id){
        try{
            return response()->json([
                'success' => true,
                'error' => null,
                'data' => PaginateService::doPaginate(History::where('site_id', $site_id)
                    ->join('sites as s', 's.id', '=', 'histories.site_id')
                    ->select('s.name', 's.url', 'histories.score', 'histories.average', 'histories.created_at', 'histories.status')
                    ->get()->toArray(), 10)
            ], 200);
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
