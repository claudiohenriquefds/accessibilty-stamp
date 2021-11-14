<?php

namespace App\Jobs;

use App\Http\Services\Evaluators\AccessMonitorService;
use App\Models\Site;
use App\Models\Subsite;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class Evaluate implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $site;
    private $subsite;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Site $site = null, Subsite $subsite = null)
    {
        $this->site = $site;
        $this->subsite = $subsite;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        AccessMonitorService::doEvaluate($this->site, $this->subsite);
    }
}
