<?php

namespace App\Console\Commands;

use App\Models\History;
use App\Models\Site;
use Carbon\Carbon;
use Illuminate\Console\Command;

class FixAverage extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fix:average {--site= : The ID of site} {--type= : The type of site} {--date= : The date of corretion}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'This command is to fix average by site and date';

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
        try{
            if($this->option("site")){
                $site = Site::find($this->option("site"));

                $last_score_site = $site->last_score;
                $cont_average = $site->subsites()->where('last_score', '!=', 'NULL')->count() + 1;
                $sum = $site->subsites()->where('last_score', '!=', 'NULL')->sum('last_score') + $last_score_site;
                $average = $sum/$cont_average;

                $site->history()->whereDate('created_at', Carbon::create()->format('Y-m-d'))->update(['average' => $average]);
                dump("This site have a average of: ".$average);
            }

            if($this->option("type")){
                foreach(Site::where('type', $this->option('type'))->get() as $site){
                    $last_score_site = $site->last_score;
                    $cont_average = $site->subsites()->where('last_score', '!=', 'NULL')->count() + 1;
                    $sum = $site->subsites()->where('last_score', '!=', 'NULL')->sum('last_score') + $last_score_site;
                    $average = $sum/$cont_average;

                    $site->history()->whereDate('created_at', Carbon::create()->format('Y-m-d'))->update(['average' => $average]);
                    dump("This site ".$site->name." have a average of: ".$average);
                }
            }

            return Command::SUCCESS;
        }catch(\Exception $exception){
            dump($exception->getMessage());
            return Command::FAILURE;
        }
    }
}
