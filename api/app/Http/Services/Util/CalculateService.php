<?php

namespace App\Http\Services\Util;

use Carbon\Carbon;

class CalculateService
{
    public static function averageToHistory($site){
        $site->history()->whereDate('created_at', Carbon::now()->format('Y-m-d'))->update(['average' => $site->average]);
    }
}
