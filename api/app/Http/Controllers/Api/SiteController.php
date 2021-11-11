<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Site\SiteAddRequest;
use App\Jobs\Evaluate;
use App\Models\Site;
use Illuminate\Support\Facades\Auth;

class SiteController extends Controller
{
    public function index(){
        try{
            return response()->json(['success' => true, 'error' => null, 'data' => Site::where('user_id', Auth::user()->id)->get()], 200);
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
}
