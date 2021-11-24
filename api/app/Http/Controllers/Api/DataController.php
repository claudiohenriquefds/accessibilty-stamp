<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\History;
use App\Models\Site;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class DataController extends Controller
{
    public function show($id){
        try{
            $site = Site::find($id);

            return response()->json(!is_null($site) ? [
                'data' => [
                    'average' => $site->history()->orderBy('id', 'desc')->first()->average ?? 0,
                    'subpages_quantity' => $site->subsites()->count() ?? 0,
                    'validations' => $site->validations ?? 0,
                    'last_score' => $site->history()->orderBy('id', 'desc')->first()->score ?? 0,
                    'history_year' => $site->history()->whereYear('created_at',Carbon::now()->format('Y'))->groupBy(DB::raw('DATE_FORMAT(created_at, "%m")'))->orderBy('created_at', 'asc')->select('created_at as date', 'average')->get() ?? [],
                    'history_month' => $site->history()->whereMonth('created_at', Carbon::now()->format('m'))->select('created_at as date', 'average', 'score as last_score', 'status')->get() ?? [],
                    'warning' => $site->detail()->where('veredict', 'warning')->count() ?? 0,
                    'passed' => $site->detail()->where('veredict', 'passed')->count() ?? 0,
                    'failed' => $site->detail()->where('veredict', 'failed')->count() ?? 0,
                ],
                'success' => true
            ] : null, 200);
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

    public function followUp($category_id){
        try{
            $category = Category::find($category_id);
            if(!is_null($category)){
                $sites = $category->sites()->orderBy('average', 'desc')->get();

                collect($sites)->map(function($site){
                    $site->average = $site->history()->orderBy('id', 'desc')->first()->average ?? 0;
                    $site->last_score = $site->history()->orderBy('id', 'desc')->first()->score ?? 0;
                    $site->created_at = $site->history()->orderBy('id', 'desc')->first()->created_at ?? null;
                    $site->pages = $site->subsites()->count();
                    $site->stamp = (new StampController())->show($site, request());
                    $site->data = $site->history()->whereMonth('created_at', Carbon::now()->format('m'))->select('created_at as date', 'average', 'score as last_score', 'status')->get()->toArray() ?? [];
                    $site->dates = $site->history()->whereMonth('created_at', Carbon::now()->format('m'))->select('created_at as date')->get()->toArray() ?? [];
                });

                $sitesAverage = History::join('sites as s', 's.id', '=', 'histories.site_id')
                    ->select(DB::raw('round(avg(score), 2) as average'), 'histories.created_at')
                    ->where('s.category_id', $category_id)
                    ->groupBy(DB::raw('DATE_FORMAT(histories.created_at, "%Y-%m-%d")'))
                    ->orderBy('histories.created_at', 'DESC')
                    ->limit(30)
                    ->get();
            }

            return response()->json([
                'success' => true,
                'data' => [
                    'comparative' => isset($sites) && !empty($sites->toArray()) ? $sites : null,
                    'average' => isset($sitesAverage) && !empty($sitesAverage->toArray()) ? $sitesAverage : null
                ],
                'error' => null
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
