<?php

namespace App\Http\Services\Evaluators;

use App\Jobs\Calculate;
use App\Jobs\Evaluate;
use App\Models\History;
use App\Models\Log;
use App\Models\Site;
use App\Models\Subsite;
use Carbon\Carbon;
use DOMDocument;
use Exception;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;

class AccessMonitorService
{
    public static function doEvaluate(Site $site = null, Subsite $subsite = null)
    {
        dump("Evaluating: ".($site->url ?? $subsite->url));
        try {
            DB::beginTransaction();
            if (!is_null($site)) {
                $response = Http::timeout(120)->get('https://accessmonitor.acessibilidade.gov.pt/api/amp/eval/' . urlencode($site->url));
            }

            if (!is_null($subsite)) {
                $response = Http::timeout(120)->get('https://accessmonitor.acessibilidade.gov.pt/api/amp/eval/' . urlencode($subsite->url));
            }

            if (!$response->successful() && isset($response->json()['result']['pagecode'])) {
                throw new Exception(json_encode(["message" => "A error has occored during the avaliation.", "response" => json_encode($response->body())]));
            }

            if (!is_null($site) && $site->run_subsites) {
                $pagecode = $response->json()['result']['pagecode'];
                libxml_use_internal_errors(true);
                $domElement = new DOMDocument();
                $domElement->loadHTML("'" . $pagecode . "'");

                $hrefs = $domElement->getElementsByTagName("a");

                foreach ($hrefs as $href) {
                    if(!str_contains($href->getAttribute('href'), $site->url)){
                        if(str_contains($href->getAttribute('href'), 'http')){
                            $subsite_new = $href->getAttribute('href');
                        }else{
                            $subsite_new = $site->url . '/' . $href->getAttribute('href');
                        }
                    }else{
                        $subsite_new = $href->getAttribute('href');
                    }

                    if (
                        !str_contains($subsite_new, '#')
                        && !str_contains($subsite_new, 'mailto')
                        && $subsite_new != $site->url
                        && $subsite_new != $site->url . '/'
                        && !str_contains($subsite_new, 'facebook')
                        && !str_contains($subsite_new, 'twitter')
                        && !str_contains($subsite_new, 'youtube')
                        && !str_contains($subsite_new, 'instagram')
                        && !str_contains($subsite_new, 'linkedin')
                        && !str_contains($subsite_new, 'goo.')
                    ) {
                        $subsiteModel = $site->subsites()->firstOrCreate([
                            'url' => $subsite_new
                        ]);

                        Evaluate::dispatch(null, $subsiteModel);
                        dump("New page identified: ".$subsite_new);
                    }else{
                        dump("New page incompatible: ".$subsite_new);
                    }
                }
                Calculate::dispatch($site);
            }
            if(!is_null($site)){
                $last_score = (float) $response->json()['result']['data']['score'];
                $cont_average = $site->subsites()->whereDate('created_at', Carbon::now()->format('Y-m-d'))->where('last_score', '!=', 'NULL')->count() + 1;
                $sum = $site->subsites()->whereDate('created_at', Carbon::now()->format('Y-m-d'))->where('last_score', '!=', 'NULL')->sum('last_score') + $last_score;
                $average = $sum/$cont_average;

                $site->last_score = $last_score;
                $site->average = $average;
                $site->validations = $site->validations + 1;
                $site->save();

                $history = $site->history()->whereDate('created_at', Carbon::now()->format('Y-m-d'))->first();

                if(is_null($history)){
                    $site->history()->firstOrCreate([
                        'score' => (float) $response->json()['result']['data']['score'],
                        'status' => 2,
                        'average' => $average
                    ]);
                }else{
                    $history->update([
                        'score' => (float) $response->json()['result']['data']['score'],
                        'status' => 2,
                        'average' => $average
                    ]);
                }
            }

            if(!is_null($subsite)){
                $subsite->update([
                    'last_score' => (float) $response->json()['result']['data']['score']
                ]);
                Subsite::where('id', $subsite->id)->increment('validations', 1);

                $site_calculate = $subsite->site;

                $last_score_site = $site_calculate->last_score;
                $cont_average = $site_calculate->subsites()->whereDate('created_at', Carbon::now()->format('Y-m-d'))->where('last_score', '!=', 'NULL')->count() + 1;
                $sum = $site_calculate->subsites()->whereDate('created_at', Carbon::now()->format('Y-m-d'))->where('last_score', '!=', 'NULL')->sum('last_score') + $last_score_site;
                $average = $sum/$cont_average;

                $site_calculate->average = $average;
                $site_calculate->save();
            }
            if(!is_null($site)){
                $site->detail()->delete();
            }

            foreach($response->json()['result']['data']['nodes'] as $key => $nodes){
                foreach($nodes as $node){
                    $siteDetail = $site ?? $subsite->site;
                    $detail = $siteDetail->detail()->create([
                        'subsite' => !is_null($subsite) ? true : false,
                        'url' => !is_null($subsite) ? $subsite->url : $site->url,
                        'element' => $key,
                        'veredict' => $node['verdict'],
                        'description' => $node['description'],
                        'result_code' => $node['resultCode']
                    ]);

                    foreach($node['elements'] as $element){
                        $detail->detailElements()->create([
                            'pointer' => $element['pointer'],
                            'html_code' => $element['htmlCode']
                        ]);
                    }
                }
            }
            DB::commit();

            Log::create([
                'site_id' => !is_null($site) ? $site->id : $subsite->site_id,
                'score' => (float) $response->json()['result']['data']['score'],
                'is_subsite' => !is_null($site) ? false : true,
                'url' => !is_null($site) ? $site->url : $subsite->url,
                'status' => 3,
                'data' => json_encode($response->json())
            ]);

        } catch (\Exception $exception) {
            DB::rollback();
            Log::create([
                'site_id' => !is_null($site) ? $site->id : $subsite->site_id,
                'score' => 0,
                'is_subsite' => !is_null($site) ? false : true,
                'url' => !is_null($site) ? $site->url : $subsite->url,
                'status' => 3,
                'data' => json_encode([
                    'file' => $exception->getFile(),
                    'line' => $exception->getLine(),
                    'message' => json_decode($exception->getMessage())->message ?? $exception->getMessage(),
                    'trace' => $exception->getTraceAsString()
                ])
            ]);

            if (!is_null($site)) {
                $site->history()->create([
                    'score' => 0,
                    'average' => 0,
                    'status' => 3
                ]);
            }
        }
    }
}
