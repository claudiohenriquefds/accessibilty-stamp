<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Services\Util\StampService;
use App\Models\Site;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StampController extends Controller
{
    public function show(Site $site = null, Request $request)
    {
        try {
            if (isset($request->id) || !is_null($site)) {
                $site = $site ?? Site::find($request->id);
            } else {
                $site = Site::where('url', 'like', '%' . $request->url . '%')->first();
            }

            if(is_null($site)){
                throw new Exception();
            }

            $detail['warning'] = $site->detail()->where('veredict', 'warning')->count();
            $detail['passed'] = $site->detail()->where('veredict', 'passed')->count();
            $detail['failed'] = $site->detail()->where('veredict', 'failed')->count();

            if (is_null($site)) {
                throw new \Exception('Site not found.');
            }
            return StampService::getStamp(['details' => $detail, 'site' => $site]);
        } catch (\Exception $exception) {
            return StampService::notFound();
        }
    }

    public function info($site_id)
    {
        try {
            $site = Site::find($site_id);

            $detail['warning'] = $site->detail()->where('veredict', 'warning')->count();
            $detail['passed'] = $site->detail()->where('veredict', 'passed')->count();
            $detail['failed'] = $site->detail()->where('veredict', 'failed')->count();

            return response()->json([
                'success' => true,
                'data' => [
                    'url' => $site->url,
                    'name' => $site->name,
                    'last_score' => $site->history()->orderBy('id', 'desc')->first()->score ?? 0,
                    'average' => $site->history()->orderBy('id', 'desc')->first()->average ?? 0,
                    'validations' => $site->validations,
                    'last_validate' => $site->history()->orderBy('id', 'desc')->first()->created_at ?? '-',
                    'quantity' => $site->subsites()->count() ?? 0,
                    'stamp' => StampService::getStamp(['details' => $detail, 'site' => $site])
                ],
                'error' => null
            ], 200);
        } catch (\Exception $exception) {
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
