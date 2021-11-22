<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subsite extends Model
{
    use HasFactory;

    protected $fillable = [
        'url',
        'validations',
        'last_score'
    ];

    public function site(){
        return $this->belongsTo('App\Models\Site');
    }
}
