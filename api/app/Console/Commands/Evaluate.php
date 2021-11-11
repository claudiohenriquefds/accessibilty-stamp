<?php

namespace App\Console\Commands;

use App\Jobs\Evaluate as JobsEvaluate;
use App\Models\History;
use App\Models\Site;
use App\Models\Subsite;
use Illuminate\Console\Command;

class Evaluate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'evaluate:run {--list} {--sites} {--subsites} {--all}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Manage evaluations';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        if($this->option("sites")){
            collect(Site::all())->map(function($site) {
                JobsEvaluate::dispatch($site);
            });
            dump("Sites in queue.");
        }

        if($this->option("subsites")){
            collect(Subsite::all())->map(function($subsite) {
                JobsEvaluate::dispatch(null, $subsite);
            });
            dump("Subsite in queue.");
        }

        if($this->option("all")){
            collect(Site::all())->merge(Subsite::all())->map(function($site) {
                JobsEvaluate::dispatch($site);
            });
            dump("Sites and subsites in queue.");
        }

        if($this->option("list")){
            dump(1);
        }

        return Command::SUCCESS;
    }
}
