<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Site\SiteAddRequest;
use App\Http\Services\Util\PaginateService;
use App\Jobs\Evaluate;
use App\Models\Site;
use Illuminate\Support\Facades\Auth;

class SiteController extends Controller
{
    public function index(){
        try{
            $sites = Site::where('user_id', Auth::user()->id)->get();

            collect($sites)->map(function($site){
                $site['stamp'] = (new StampController())->show($site, request());
                $site['pages'] = $site->subsites()->count();
                return $site;
            });

            return response()->json([
                'success' => true,
                'error' => null,
                'data' => $sites ?? null
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

    public function show($id){
        try{
            $site = Site::find($id);

            return response()->json([
                'success' => true,
                'error' => null,
                'data' => $site ?? null
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

    public function store(SiteAddRequest $request){
        try{
            $site = Site::create([
                'name' => $request->get('name'),
                'url' => $request->get('url'),
                'user_id' => Auth::user()->id
            ]);
            Evaluate::dispatch($site);

            return response()->json(['success' => true, 'error' => null, 'data' => null], 200);
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

    public function getDetailed($id){
        try{
            $site = Site::find($id);
            if(!is_null($site)){
                $details = $site->detail;

                collect($details)->map(function($detail){
                    $detail['elements_detailed'] = $detail->detailElements;
                    return $detail;
                });
            }

            return response()->json([
                'success' => true,
                'error' => null,
                'data' => PaginateService::doPaginate(!is_null($site) ? $details : [], 10)
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
