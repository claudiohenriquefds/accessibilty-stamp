<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    use HasFactory;

    protected $fillable = [
        'site_id',
        'score',
        'is_subsite',
        'url',
        'status',
        'data'
    ];
}
